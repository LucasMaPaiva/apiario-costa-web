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
     * Retorna um Access Token válido, renovando-o se necessário.
     */
    protected function getAccessToken(): string
    {
        $integration = Integration::where('provider', 'melhor-envio')->firstOrFail();

        if ($integration->expires_at->isPast()) {
            $tokens = $this->refreshToken($integration->refresh_token);
            
            $integration->update([
                'access_token' => $tokens['access_token'],
                'refresh_token' => $tokens['refresh_token'],
                'expires_at' => Carbon::now()->addSeconds($tokens['expires_in']),
            ]);
        }

        return $integration->access_token;
    }

    /**
     * Calcula o frete para um destino e lista de produtos.
     */
    public function calculate(string $toZipCode, array $products): array
    {
        $storeAddress = \App\Models\Setting::getValue('store_address');
        $fromZipCode = null;

        if ($storeAddress) {
            $addressData = json_decode($storeAddress, true);
            $fromZipCode = $addressData['cep'] ?? null;
        }

        if (!$fromZipCode) {
            throw new \Exception('CEP de origem não configurado nas configurações da loja.');
        }

        $token = $this->getAccessToken();

        $response = Http::withToken($token)
            ->withHeaders(['User-Agent' => config('app.name') . ' (contato@dominio.com)'])
            ->post("{$this->baseUrl}/api/v2/me/shipment/calculate", [
                'from' => ['postal_code' => $fromZipCode],
                'to' => ['postal_code' => $toZipCode],
                'products' => $this->mapProducts($products),
            ]);

        if ($response->failed()) {
            Log::error('Melhor Envio Calculate Error: ' . $response->body());
            return [];
        }

        return $response->json();
    }

    /**
     * Mapeia os produtos para o formato esperado pelo Melhor Envio.
     */
    protected function mapProducts(array $products): array
    {
        return array_map(function ($item) {
            return [
                'id' => $item['id'],
                'width' => $item['width'] ?? 10,
                'height' => $item['height'] ?? 10,
                'length' => $item['length'] ?? 10,
                'weight' => $item['weight'] ?? 0.5,
                'insurance_value' => $item['price'] ?? 0,
                'quantity' => $item['quantity'] ?? 1,
            ];
        }, $products);
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
