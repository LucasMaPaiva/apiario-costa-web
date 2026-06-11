<?php

namespace App\Http\Controllers;

use App\Models\ShippingRule;
use App\Services\Logistics\MotoboyShippingService;
use App\Services\Logistics\ShippingRuleResolver;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ShippingController extends Controller
{
    public function __construct(
        protected ShippingRuleResolver $ruleResolver,
        protected MotoboyShippingService $motoboyService,
    ) {}

    public function calculate(Request $request)
    {
        $request->validate([
            'cep'              => 'required|string',
            'items'            => 'required|array',
            'items.*.id'       => 'required|integer',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        Log::info('Shipping: cálculo solicitado.', ['cep' => $request->cep, 'items' => count($request->items)]);

        $location = $this->ruleResolver->lookupCep($request->cep);
        if (!$location) {
            return response()->json(['message' => 'CEP inválido ou não encontrado.'], 422);
        }

        if (strtoupper($location['uf']) !== 'RR') {
            return response()->json([
                'message' => 'No momento entregamos apenas para Roraima (RR).',
            ], 422);
        }

        $rule = $this->ruleResolver->resolve($request->cep);

        // Bairros com regra específica (ex.: fora do perímetro urbano de Boa Vista) têm prioridade.
        if ($rule && $rule->neighborhood) {
            Log::info('Shipping: regra local aplicada.', ['rule_id' => $rule->id, 'name' => $rule->name]);
            return response()->json(['data' => [$this->ruleToOption($rule)]]);
        }

        // Boa Vista sem regra de bairro específica: frete por motoboy calculado pela distância.
        if ($this->isBoaVista($location['city'])) {
            $motoboy = $this->motoboyService->calculate($location);
            if ($motoboy) {
                Log::info('Shipping: frete motoboy aplicado.', ['price' => $motoboy['price']]);
                return response()->json(['data' => [$motoboy]]);
            }
        }

        if ($rule) {
            Log::info('Shipping: regra local aplicada.', ['rule_id' => $rule->id, 'name' => $rule->name]);
            return response()->json(['data' => [$this->ruleToOption($rule)]]);
        }

        return response()->json([
            'message' => 'Frete não disponível para esta localidade no momento.',
        ], 422);
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
            'id'            => 'local-' . $rule->id,
            'name'          => $rule->name,
            'price'         => (float) $rule->flat_price,
            'delivery_time' => $rule->delivery_days,
            'company'       => 'Apiário Costa',
            'company_logo'  => '/logo.jpg',
        ];
    }
}
