<?php

namespace App\Services\Logistics;

use App\Models\Integration;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class MelhorEnvioService
{
    protected string $apiUrl;
    protected string $webUrl;
    protected string $clientId;
    protected string $clientSecret;
    protected string $redirectUri;

    public function __construct()
    {
        $this->clientId = config('services.melhor_envio.client_id');
        $this->clientSecret = config('services.melhor_envio.client_secret');
        $this->redirectUri = config('services.melhor_envio.redirect_uri');

        $environment = config('services.melhor_envio.environment', 'sandbox');
        if ($environment === 'production') {
            $this->apiUrl = 'https://melhorenvio.com.br';
            $this->webUrl = 'https://app.melhorenvio.com.br';
        } else {
            $this->apiUrl = 'https://sandbox.melhorenvio.com.br';
            $this->webUrl = 'https://app-sandbox.melhorenvio.com.br';
        }
    }

    /**
     * Retorna a URL de autorização para o lojista
     */
    public function getAuthorizationUrl(): string
    {
        $scopes = 'shipping-calculate cart-read cart-write shipping-checkout shipping-generate shipping-print shipping-tracking shipping-cancel shipping-companies users-read';
        
        return "{$this->webUrl}/oauth/authorize?" . http_build_query([
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
        $response = Http::acceptJson()->asForm()->post("{$this->apiUrl}/oauth/token", [
            'grant_type' => 'authorization_code',
            'client_id' => $this->clientId,
            'client_secret' => $this->clientSecret,
            'redirect_uri' => $this->redirectUri,
            'code' => $code,
        ]);

        $data = $response->json();

        if ($response->failed() || !is_array($data) || empty($data['access_token'])) {
            Log::error('Melhor Envio OAuth Error', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
            throw new \Exception('Falha ao obter token do Melhor Envio: ' . $response->body());
        }

        return $data;
    }

    /**
     * Atualiza o token usando o refresh_token
     */
    public function refreshToken(string $refreshToken): array
    {
        $response = Http::acceptJson()->asForm()->post("{$this->apiUrl}/oauth/token", [
            'grant_type' => 'refresh_token',
            'client_id' => $this->clientId,
            'client_secret' => $this->clientSecret,
            'refresh_token' => $refreshToken,
        ]);

        $data = $response->json();

        if ($response->failed() || !is_array($data) || empty($data['access_token'])) {
            Log::error('Melhor Envio Refresh Token Error', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
            throw new \Exception('Falha ao renovar token do Melhor Envio.');
        }

        return $data;
    }

    /**
     * Retorna um Access Token válido, renovando-o se necessário.
     */
    protected function getAccessToken(): string
    {
        $integration = Integration::where('provider', 'melhor-envio')->first();

        if (!$integration) {
            Log::warning('Melhor Envio: integração não configurada — fluxo OAuth não foi concluído.');
            throw new \Exception('Integração com Melhor Envio não configurada. Conecte em /admin/configuracoes.');
        }

        if ($integration->expires_at->isPast()) {
            Log::info('Melhor Envio: token expirado, renovando.', ['expires_at' => $integration->expires_at->toDateTimeString()]);
            $tokens = $this->refreshToken($integration->refresh_token);

            $integration->update([
                'access_token' => $tokens['access_token'],
                'refresh_token' => $tokens['refresh_token'],
                'expires_at' => Carbon::now()->addSeconds($tokens['expires_in']),
            ]);
            Log::info('Melhor Envio: token renovado com sucesso.');
        }

        return $integration->access_token;
    }

    /**
     * Calcula o frete para um destino e lista de produtos.
     */
    public function calculate(string $toZipCode, array $products): array
    {
        Log::info('Melhor Envio: iniciando cálculo de frete.', ['to' => $toZipCode, 'items' => count($products)]);

        $storeAddress = \App\Models\Setting::getValue('store_address');
        $fromZipCode = null;

        if ($storeAddress) {
            $addressData = json_decode($storeAddress, true);
            $fromZipCode = $addressData['cep'] ?? null;
        }

        if (!$fromZipCode) {
            Log::warning('Melhor Envio: CEP de origem não configurado.');
            throw new \Exception('CEP de origem não configurado nas configurações da loja.');
        }

        $token = $this->getAccessToken();

        $payload = [
            'from' => ['postal_code' => $fromZipCode],
            'to' => ['postal_code' => $toZipCode],
            'products' => $this->mapProducts($products),
        ];
        Log::debug('Melhor Envio: payload do cálculo.', $payload);

        $response = Http::withToken($token)
            ->acceptJson()
            ->withHeaders(['User-Agent' => config('app.name') . ' (contato@dominio.com)'])
            ->post("{$this->apiUrl}/api/v2/me/shipment/calculate", $payload);

        if ($response->failed()) {
            Log::error('Melhor Envio: erro no cálculo de frete.', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
            return [];
        }

        $quotes = $response->json();
        Log::info('Melhor Envio: cotações recebidas.', ['count' => is_array($quotes) ? count($quotes) : 0]);
        return $quotes ?? [];
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
            ->get("{$this->apiUrl}/api/v2/me");

        return $response->json();
    }
}
