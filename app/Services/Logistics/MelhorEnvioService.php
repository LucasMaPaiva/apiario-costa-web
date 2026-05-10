<?php

namespace App\Services\Logistics;

use App\Models\Integration;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class MelhorEnvioService
{
    protected string $baseUrl;
    protected string $clientId;
    protected string $clientSecret;
    protected string $redirectUri;

    public function __construct()
    {
        $this->clientId = config('services.melhor_envio.client_id');
        $this->clientSecret = config('services.melhor_envio.client_secret');
        $this->redirectUri = config('services.melhor_envio.redirect_uri');
        
        $environment = config('services.melhor_envio.environment', 'sandbox');
        $this->baseUrl = $environment === 'production' 
            ? 'https://melhorenvio.com.br' 
            : 'https://sandbox.melhorenvio.com.br';
    }

    /**
     * Retorna a URL de autorização para o lojista
     */
    public function getAuthorizationUrl(): string
    {
        $scopes = 'shipping-calculate cart-read cart-write shipping-checkout shipping-generate shipping-print shipping-tracking shipping-cancel shipping-companies users-read';
        
        return "{$this->baseUrl}/oauth/authorize?" . http_build_query([
            'client_id' => $this->clientId,
            'redirect_uri' => $this->redirectUri,
            'response_type' => 'code',
            'scope' => $scopes,
        ]);
    }

    /**
     * Troca o código pelo Access Token e Refresh Token
     */
    public function getTokenFromCode(string $code): array
    {
        $response = Http::asForm()->post("{$this->baseUrl}/oauth/token", [
            'grant_type' => 'authorization_code',
            'client_id' => $this->clientId,
            'client_secret' => $this->clientSecret,
            'redirect_uri' => $this->redirectUri,
            'code' => $code,
        ]);

        if ($response->failed()) {
            Log::error('Melhor Envio OAuth Error: ' . $response->body());
            throw new \Exception('Falha ao obter token do Melhor Envio.');
        }

        return $response->json();
    }

    /**
     * Atualiza o token usando o refresh_token
     */
    public function refreshToken(string $refreshToken): array
    {
        $response = Http::asForm()->post("{$this->baseUrl}/oauth/token", [
            'grant_type' => 'refresh_token',
            'client_id' => $this->clientId,
            'client_secret' => $this->clientSecret,
            'refresh_token' => $refreshToken,
        ]);

        if ($response->failed()) {
            Log::error('Melhor Envio Refresh Token Error: ' . $response->body());
            throw new \Exception('Falha ao renovar token do Melhor Envio.');
        }

        return $response->json();
    }

    /**
     * Busca dados do usuário (Lojista) para confirmar conexão
     */
    public function getUserData(string $token): array
    {
        $response = Http::withToken($token)
            ->withHeaders(['User-Agent' => config('app.name') . ' (contato@dominio.com)'])
            ->get("{$this->baseUrl}/api/v2/me");

        return $response->json();
    }
}
