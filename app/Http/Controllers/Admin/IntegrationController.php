<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Integration;
use App\Services\Logistics\MelhorEnvioService;
use Illuminate\Http\Request;
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
        if (!$request->has('code')) {
            return response()->json(['message' => 'Código de autorização não fornecido.'], 400);
        }

        try {
            $tokens = $this->melhorEnvio->getTokenFromCode($request->code);

            Integration::updateOrCreate(
                ['provider' => 'melhor-envio'],
                [
                    'access_token' => $tokens['access_token'],
                    'refresh_token' => $tokens['refresh_token'],
                    'expires_at' => Carbon::now()->addSeconds($tokens['expires_in']),
                    'environment' => config('services.melhor_envio.environment'),
                    'data' => [] // Pode salvar dados do usuário aqui futuramente
                ]
            );

            // Redireciona de volta para o painel administrativo
            return redirect('/admin/logistica?success=true');

        } catch (\Exception $e) {
            return redirect('/admin/logistica?error=' . urlencode($e->getMessage()));
        }
    }
}
