<?php

namespace App\Http\Controllers;

use App\Models\ShippingRule;
use App\Services\Logistics\MelhorEnvioService;
use App\Services\Logistics\MotoboyShippingService;
use App\Services\Logistics\ShippingRuleResolver;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ShippingController extends Controller
{
    public function __construct(
        protected MelhorEnvioService $melhorEnvio,
        protected ShippingRuleResolver $ruleResolver,
        protected MotoboyShippingService $motoboyService,
    ) {}

    /**
     * Calcula o frete baseado no CEP e nos itens do carrinho.
     * Primeiro tenta uma regra local (bairro específico); depois, se for
     * Boa Vista (RR), calcula o frete por motoboy via distância; senão tenta
     * uma regra local genérica; se nenhuma casar, cai para o Melhor Envio.
     */
    public function calculate(Request $request)
    {
        $request->validate([
            'cep' => 'required|string',
            'items' => 'required|array',
            'items.*.id' => 'required|integer',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        Log::info('Shipping: cálculo solicitado.', ['cep' => $request->cep, 'items' => count($request->items)]);

        $rule = $this->ruleResolver->resolve($request->cep);

        // Bairros com regra específica (ex.: fora do perímetro urbano de Boa Vista) têm prioridade.
        if ($rule && $rule->neighborhood) {
            Log::info('Shipping: regra local aplicada.', ['rule_id' => $rule->id, 'name' => $rule->name, 'price' => $rule->flat_price]);
            return response()->json(['data' => [$this->ruleToOption($rule)]]);
        }

        // Boa Vista (RR) sem regra de bairro específica: frete por motoboy calculado pela distância.
        $location = $this->ruleResolver->lookupCep($request->cep);
        if ($location && strtoupper($location['uf'] ?? '') === 'RR' && $this->isBoaVista($location['city'] ?? null)) {
            $motoboy = $this->motoboyService->calculate($location);
            if ($motoboy) {
                Log::info('Shipping: frete motoboy aplicado.', ['price' => $motoboy['price']]);
                return response()->json(['data' => [$motoboy]]);
            }
        }

        if ($rule) {
            Log::info('Shipping: regra local aplicada.', ['rule_id' => $rule->id, 'name' => $rule->name, 'price' => $rule->flat_price]);
            return response()->json(['data' => [$this->ruleToOption($rule)]]);
        }

        $items = collect($request->items)->map(function ($item) {
            $product = \App\Models\Product::find($item['id']);
            if (!$product) return null;
            return [
                'id' => $product->id,
                'width' => $product->width,
                'height' => $product->height,
                'length' => $product->length,
                'weight' => $product->weight,
                'price' => $product->price,
                'quantity' => $item['quantity'],
            ];
        })->filter()->toArray();

        if (empty($items)) {
            Log::warning('Shipping: nenhum produto válido no carrinho.');
            return response()->json(['message' => 'Nenhum produto válido para cálculo.'], 400);
        }

        Log::info('Shipping: sem regra local — caindo para Melhor Envio.');

        try {
            $quotes = $this->melhorEnvio->calculate($request->cep, $items);

            $options = collect($quotes)->filter(fn($q) => !isset($q['error']))->map(fn($q) => [
                'id' => $q['id'],
                'name' => $q['name'],
                'price' => (float) $q['price'],
                'delivery_time' => $q['delivery_time'],
                'company' => $q['company']['name'],
                'company_logo' => $q['company']['picture'],
            ])->values();

            Log::info('Shipping: opções de frete retornadas.', ['count' => $options->count()]);
            return response()->json(['data' => $options]);
        } catch (\Exception $e) {
            Log::error('Shipping: falha no cálculo via Melhor Envio.', ['message' => $e->getMessage()]);
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    private function isBoaVista(?string $city): bool
    {
        if (!$city) return false;

        $normalized = strtr(strtolower($city), [
            'á' => 'a', 'à' => 'a', 'ã' => 'a', 'â' => 'a',
            'é' => 'e', 'ê' => 'e',
            'í' => 'i',
            'ó' => 'o', 'ô' => 'o', 'õ' => 'o',
            'ú' => 'u', 'ç' => 'c',
        ]);

        return $normalized === 'boa vista';
    }

    private function ruleToOption(ShippingRule $rule): array
    {
        return [
            'id' => 'local-' . $rule->id,
            'name' => $rule->name,
            'price' => (float) $rule->flat_price,
            'delivery_time' => $rule->delivery_days,
            'company' => 'Apiário Costa',
            'company_logo' => '/logo.jpg',
        ];
    }
}
