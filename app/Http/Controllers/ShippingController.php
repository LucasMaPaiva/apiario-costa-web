<?php

namespace App\Http\Controllers;

use App\Services\Logistics\MelhorEnvioService;
use Illuminate\Http\Request;

class ShippingController extends Controller
{
    protected MelhorEnvioService $melhorEnvio;

    public function __construct(MelhorEnvioService $melhorEnvio)
    {
        $this->melhorEnvio = $melhorEnvio;
    }

    /**
     * Calcula o frete baseado no CEP e nos itens do carrinho
     */
    public function calculate(Request $request)
    {
        $request->validate([
            'cep' => 'required|string',
            'items' => 'required|array',
            'items.*.id' => 'required|integer',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        // Carregar dimensões reais dos produtos do banco para segurança
        $items = collect($request->items)->map(function ($item) {
            $product = \App\Models\Product::find($item['id']);
            if ($product) {
                return [
                    'id' => $product->id,
                    'width' => $product->width,
                    'height' => $product->height,
                    'length' => $product->length,
                    'weight' => $product->weight,
                    'price' => $product->price,
                    'quantity' => $item['quantity'],
                ];
            }
            return null;
        })->filter()->toArray();

        if (empty($items)) {
            return response()->json(['message' => 'Nenhum produto válido para cálculo.'], 400);
        }

        try {
            $quotes = $this->melhorEnvio->calculate($request->cep, $items);
            
            // Filtrar apenas opções que não retornaram erro
            $options = collect($quotes)->filter(function ($quote) {
                return !isset($quote['error']);
            })->map(function ($quote) {
                return [
                    'id' => $quote['id'],
                    'name' => $quote['name'],
                    'price' => (float) $quote['price'],
                    'delivery_time' => $quote['delivery_time'],
                    'company' => $quote['company']['name'],
                    'company_logo' => $quote['company']['picture'],
                ];
            })->values();

            return response()->json(['data' => $options]);

        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
