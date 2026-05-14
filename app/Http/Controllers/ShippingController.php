<?php

namespace App\Http\Controllers;

use App\Services\Logistics\MelhorEnvioService;
use App\Services\Logistics\ShippingRuleResolver;
use Illuminate\Http\Request;

class ShippingController extends Controller
{
    public function __construct(
        protected MelhorEnvioService $melhorEnvio,
        protected ShippingRuleResolver $ruleResolver,
    ) {}

    /**
     * Calcula o frete baseado no CEP e nos itens do carrinho.
     * Primeiro tenta uma regra local; se nenhuma casar, cai para o Melhor Envio.
     */
    public function calculate(Request $request)
    {
        $request->validate([
            'cep' => 'required|string',
            'items' => 'required|array',
            'items.*.id' => 'required|integer',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        $rule = $this->ruleResolver->resolve($request->cep);
        if ($rule) {
            return response()->json(['data' => [[
                'id' => 'local-' . $rule->id,
                'name' => $rule->name,
                'price' => (float) $rule->flat_price,
                'delivery_time' => $rule->delivery_days,
                'company' => 'Apiário Costa',
                'company_logo' => '/logo.jpg',
            ]]]);
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
            return response()->json(['message' => 'Nenhum produto válido para cálculo.'], 400);
        }

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

            return response()->json(['data' => $options]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
