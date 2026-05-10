<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    /**
     * Retorna as configurações de endereço da loja
     */
    public function getStoreAddress()
    {
        $keys = ['store_cep', 'store_street', 'store_number', 'store_complement', 'store_neighborhood', 'store_city', 'store_state'];
        $settings = Setting::whereIn('key', $keys)->pluck('value', 'key');

        return response()->json([
            'data' => [
                'cep' => $settings['store_cep'] ?? '',
                'street' => $settings['store_street'] ?? '',
                'number' => $settings['store_number'] ?? '',
                'complement' => $settings['store_complement'] ?? '',
                'neighborhood' => $settings['store_neighborhood'] ?? '',
                'city' => $settings['store_city'] ?? '',
                'state' => $settings['store_state'] ?? '',
            ]
        ]);
    }

    /**
     * Atualiza as configurações de endereço da loja
     */
    public function updateStoreAddress(Request $request)
    {
        $data = $request->validate([
            'cep' => 'required|string',
            'street' => 'required|string',
            'number' => 'required|string',
            'complement' => 'nullable|string',
            'neighborhood' => 'required|string',
            'city' => 'required|string',
            'state' => 'required|string|size:2',
        ]);

        foreach ($data as $key => $value) {
            Setting::updateOrCreate(
                ['key' => "store_{$key}"],
                ['value' => $value]
            );
        }

        return response()->json(['message' => 'Endereço da loja atualizado com sucesso!']);
    }
}
