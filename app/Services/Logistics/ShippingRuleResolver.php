<?php

namespace App\Services\Logistics;

use App\Models\ShippingRule;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ShippingRuleResolver
{
    public function resolve(string $cep): ?ShippingRule
    {
        $location = $this->lookupCep($cep);
        if (!$location) {
            Log::info('ShippingRule: ViaCEP não retornou localização.', ['cep' => $cep]);
            return null;
        }

        Log::info('ShippingRule: localização resolvida.', $location);

        // Prioridade: estado+município+bairro > estado+município > estado
        $rule = ShippingRule::query()
            ->where('state', $location['uf'])
            ->where(function ($q) use ($location) {
                $q->where('city', $location['city'])->orWhereNull('city');
            })
            ->where(function ($q) use ($location) {
                $q->whereRaw('LOWER(neighborhood) = LOWER(?)', [$location['neighborhood'] ?? ''])
                    ->orWhereNull('neighborhood');
            })
            ->orderByRaw("
                CASE
                    WHEN city IS NOT NULL AND neighborhood IS NOT NULL THEN 0
                    WHEN city IS NOT NULL AND neighborhood IS NULL THEN 1
                    ELSE 2
                END
            ")
            ->first();

        if (!$rule) {
            Log::info('ShippingRule: nenhuma regra local casou.', ['uf' => $location['uf'], 'city' => $location['city']]);
        }

        return $rule;
    }

    public function lookupCep(string $cep): ?array
    {
        $cep = preg_replace('/\D/', '', $cep);
        if (strlen($cep) !== 8) return null;

        try {
            $response = Http::timeout(5)->get("https://viacep.com.br/ws/{$cep}/json/");
            if ($response->failed()) return null;
            $data = $response->json();
            if (isset($data['erro'])) return null;

            return [
                'uf'           => $data['uf'] ?? null,
                'city'         => $data['localidade'] ?? null,
                'neighborhood' => $data['bairro'] ?? null,
                'street'       => $data['logradouro'] ?? null,
            ];
        } catch (\Throwable $e) {
            return null;
        }
    }
}
