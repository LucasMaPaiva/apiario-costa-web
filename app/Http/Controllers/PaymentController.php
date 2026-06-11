<?php

namespace App\Http\Controllers;

use App\Base\Http\Controllers\BaseController;
use App\Models\Order;
use App\Services\Payment\MercadoPagoService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class PaymentController extends BaseController
{
    /**
     * Cria uma preferência de pagamento no Mercado Pago.
     * O valor é buscado do banco — nunca aceito do frontend.
     */
    public function createPreference(Request $request, MercadoPagoService $service): JsonResponse
    {
        $request->validate(['order_id' => ['required', 'integer']]);

        $order = Order::with(['items.product', 'user'])
            ->where('user_id', Auth::id())
            ->findOrFail($request->integer('order_id'));

        if ($order->payment_status === 'paid') {
            return response()->json([
                'success' => false,
                'message' => 'Este pedido já foi pago.',
            ], 422);
        }

        try {
            $preference = $service->createPreference($order);
            return self::successResponse($preference, 'Preferência criada com sucesso.');
        } catch (\Exception $e) {
            Log::error('MP createPreference: ' . $e->getMessage());
            return self::returnError($e);
        }
    }

    /**
     * Recebe notificações IPN/webhook do Mercado Pago.
     * Rota pública (sem autenticação), mas com verificação de assinatura.
     */
    public function webhook(Request $request, MercadoPagoService $service): JsonResponse
    {
        $signature  = $request->header('x-signature', '');
        $request_id = $request->header('x-request-id', '');

        if ($signature) {
            $parts = [];
            foreach (explode(',', $signature) as $part) {
                if (str_contains($part, '=')) {
                    [$key, $value] = explode('=', $part, 2);
                    $parts[trim($key)] = trim($value);
                }
            }

            $ts      = $parts['ts'] ?? '';
            $v1      = $parts['v1'] ?? '';
            $data_id = $request->query('data.id', $request->input('data.id', ''));

            if ($v1 && !$service->verifySignature($v1, $request_id, $data_id, $ts)) {
                Log::warning('MP webhook: assinatura inválida', ['ip' => $request->ip()]);
                return response()->json(['ok' => false], 400);
            }
        }

        try {
            $service->handleWebhook($request->all());
            return response()->json(['ok' => true]);
        } catch (\Exception $e) {
            Log::error('MP webhook error: ' . $e->getMessage());
            return response()->json(['ok' => false], 500);
        }
    }
}
