<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Integration;
use App\Services\Logistics\MelhorEnvioService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class IntegrationController extends Controller
{
    protected MelhorEnvioService $melhorEnvio;

    public function __construct(MelhorEnvioService $melhorEnvio)
    {
        $this->melhorEnvio = $melhorEnvio;
    }

    /**
     * Retorna o status da integração atual
     */
    public function index()
    {
        $integration = Integration::where('provider', 'melhor-envio')->first();

        if (!$integration) {
            return response()->json(['data' => null]);
        }

        return response()->json([
            'data' => [
                'provider' => $integration->provider,
                'environment' => $integration->environment,
                'connected_at' => $integration->updated_at->toDateTimeString(),
            ]
        ]);
    }

    /**
     * Retorna a URL de redirecionamento para o frontend iniciar o OAuth
     */
    public function getRedirectUrl()
    {
        return response()->json([
            'success' => true,
            'data' => [
                'url' => $this->melhorEnvio->getAuthorizationUrl()
            ]
        ]);
    }

    /**
     * Redireciona para o Melhor Envio para autorização
     */
    public function redirect()
    {
        return redirect()->away($this->melhorEnvio->getAuthorizationUrl());
    }

    /**
     * Callback do OAuth2
     */
    public function callback(Request $request)
    {
        Log::info('Melhor Envio callback recebido.', ['has_code' => $request->has('code'), 'has_error' => $request->has('error')]);

        if ($request->has('error')) {
            Log::warning('Melhor Envio: callback retornou erro.', $request->only(['error', 'error_description']));
            return redirect('/admin/configuracoes?tab=logistics&error=' . urlencode($request->input('error_description', $request->input('error'))));
        }

        if (!$request->has('code')) {
            return response()->json(['message' => 'Código de autorização não fornecido.'], 400);
        }

        try {
            $tokens = $this->melhorEnvio->getTokenFromCode($request->code);
            Log::info('Melhor Envio: tokens obtidos com sucesso.', ['expires_in' => $tokens['expires_in'] ?? null]);

            Integration::updateOrCreate(
                ['provider' => 'melhor-envio'],
                [
                    'access_token' => $tokens['access_token'],
                    'refresh_token' => $tokens['refresh_token'],
                    'expires_at' => Carbon::now()->addSeconds($tokens['expires_in']),
                    'environment' => config('services.melhor_envio.environment'),
                    'data' => []
                ]
            );

            return redirect('/admin/configuracoes?tab=logistics&success=true');

        } catch (\Exception $e) {
            Log::error('Melhor Envio: falha ao concluir callback.', ['message' => $e->getMessage()]);
            return redirect('/admin/configuracoes?tab=logistics&error=' . urlencode($e->getMessage()));
        }
    }
}
