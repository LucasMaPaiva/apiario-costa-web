<?php

namespace App\Services\Payment;

use App\Mail\PaymentConfirmed;
use App\Mail\PaymentConfirmedAdmin;
use App\Models\Order;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use MercadoPago\Client\Payment\PaymentClient;
use MercadoPago\Client\Preference\PreferenceClient;
use MercadoPago\MercadoPagoConfig;

class MercadoPagoService
{
    private function boot(): void
    {
        $token = config('services.mercadopago.access_token');

        if (!$token) {
            throw new \RuntimeException('Mercado Pago não configurado. Defina MERCADOPAGO_ACCESS_TOKEN no .env.');
        }

        MercadoPagoConfig::setAccessToken($token);
    }

    public function createPreference(Order $order): array
    {
        $this->boot();
        $items = $order->items->map(fn ($item) => [
            'id'         => (string) $item->product_id,
            'title'      => $item->product->name,
            'quantity'   => (int) $item->quantity,
            'unit_price' => (float) $item->price,
            'currency_id' => 'BRL',
        ])->toArray();

        $client = new PreferenceClient();

        $preference = $client->create([
            'items'    => $items,
            'payer'    => [
                'name'  => $order->user->name,
                'email' => $order->user->email,
            ],
            'shipments' => [
                'cost' => (float) $order->shipping_cost,
                'mode' => 'not_specified',
            ],
            'back_urls' => [
                'success' => config('app.url') . '/meus-pedidos/' . $order->id . '?payment=success',
                'failure' => config('app.url') . '/meus-pedidos/' . $order->id . '?payment=failure',
                'pending' => config('app.url') . '/meus-pedidos/' . $order->id . '?payment=pending',
            ],
            'auto_return'        => 'approved',
            'external_reference' => (string) $order->id,
            'notification_url'   => config('app.url') . '/api/payments/webhook',
            'statement_descriptor' => 'Apiário Costa',
        ]);

        $order->update(['payment_method' => 'mercadopago']);

        return [
            'preference_id'      => $preference->id,
            'checkout_url'       => app()->isProduction()
                ? $preference->init_point
                : $preference->sandbox_init_point,
        ];
    }

    public function handleWebhook(array $data): void
    {
        $this->boot();

        $type = $data['type'] ?? $data['topic'] ?? null;

        if ($type !== 'payment') {
            return;
        }

        $payment_id = $data['data']['id'] ?? $data['id'] ?? null;
        if (!$payment_id) {
            return;
        }

        $client  = new PaymentClient();
        $payment = $client->get((int) $payment_id);

        $order_id = $payment->external_reference ?? null;
        if (!$order_id) {
            return;
        }

        $order = Order::find($order_id);
        if (!$order) {
            Log::warning("MP webhook: pedido #{$order_id} não encontrado");
            return;
        }

        $payment_status = match ($payment->status) {
            'approved'                  => 'paid',
            'rejected', 'cancelled'     => 'failed',
            'refunded', 'charged_back'  => 'refunded',
            default                     => 'pending',
        };

        $previous_payment_status = $order->payment_status;

        $order->update([
            'payment_status' => $payment_status,
            'transaction_id' => (string) $payment_id,
        ]);

        if ($payment_status === 'paid' && $order->status === 'pending') {
            $order->update(['status' => 'paid']);
        }

        if ($payment_status === 'paid' && $previous_payment_status !== 'paid') {
            $order->load('items.product', 'user');

            Mail::to($order->user->email)->send(new PaymentConfirmed($order));
            Mail::to(config('mail.admin_address'))->send(new PaymentConfirmedAdmin($order));
        }
    }

    public function verifySignature(string $signature, ?string $request_id, string $data_id, string $ts): bool
    {
        $secret = config('services.mercadopago.webhook_secret');

        if (!$secret) {
            return true;
        }

        $manifest = "id:{$data_id};request-id:{$request_id};ts:{$ts};";
        $expected = hash_hmac('sha256', $manifest, $secret);

        return hash_equals($expected, $signature);
    }
}
