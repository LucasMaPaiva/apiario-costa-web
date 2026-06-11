<?php

namespace App\Http\Controllers;

use App\Base\Http\Controllers\BaseController;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SettingController extends BaseController
{
    /**
     * Get store address setting.
     *
     * @return JsonResponse
     */
    public function getStoreAddress(): JsonResponse
    {
        try {
            $setting = Setting::where('key', 'store_address')->first();
            $address = $setting ? json_decode($setting->value, true) : [
                'cep' => '',
                'street' => '',
                'number' => '',
                'complement' => '',
                'neighborhood' => '',
                'city' => '',
                'state' => '',
                'place_name' => ''
            ];

            return self::successResponse($address);
        } catch (\Exception $e) {
            return self::returnError($e);
        }
    }

    /**
     * Update store address setting.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function updateStoreAddress(Request $request): JsonResponse
    {
        try {
            $data = $request->validate([
                'cep' => 'required|string',
                'street' => 'required|string',
                'number' => 'required|string',
                'complement' => 'nullable|string',
                'neighborhood' => 'required|string',
                'city' => 'required|string',
                'state' => 'required|string|max:2',
                'place_name' => 'nullable|string',
            ]);

            Setting::updateOrCreate(
                ['key' => 'store_address'],
                ['value' => json_encode($data)]
            );

            return self::successResponse($data, 'Endereço da loja atualizado com sucesso.');
        } catch (\Exception $e) {
            return self::returnError($e);
        }
    }
}
