<?php

namespace App\Http\Controllers;

use App\Base\Http\Controllers\BaseController;
use App\Models\Address;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AddressController extends BaseController
{
    /**
     * List user addresses.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $user = \App\Models\User::find(Auth::id());
            $addresses = $user->addresses()->orderBy('is_main', 'desc')->orderBy('id', 'desc')->get();
            return self::successResponse($addresses);
        } catch (\Exception $e) {
            return self::returnError($e);
        }
    }

    /**
     * Store a new address.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $data = $request->validate([
                'label' => 'nullable|string|max:255',
                'cep' => 'required|string',
                'street' => 'required|string',
                'number' => 'required|string',
                'complement' => 'nullable|string',
                'neighborhood' => 'required|string',
                'city' => 'required|string',
                'state' => 'required|string|size:2',
                'is_main' => 'boolean',
            ]);

            if ($data['is_main'] ?? false) {
                Address::where('user_id', Auth::id())->update(['is_main' => false]);
            }

            $address = Address::create(array_merge($data, ['user_id' => Auth::id()]));
            return self::successResponse($address, 'Endereço cadastrado com sucesso.', 201);
        } catch (\Exception $e) {
            return self::returnError($e);
        }
    }

    /**
     * Update an address.
     *
     * @param int $id
     * @param Request $request
     * @return JsonResponse
     */
    public function update(int $id, Request $request): JsonResponse
    {
        try {
            $address = Address::where('user_id', Auth::id())->findOrFail($id);
            $data = $request->validate([
                'label' => 'nullable|string|max:255',
                'cep' => 'required|string',
                'street' => 'required|string',
                'number' => 'required|string',
                'complement' => 'nullable|string',
                'neighborhood' => 'required|string',
                'city' => 'required|string',
                'state' => 'required|string|size:2',
                'is_main' => 'boolean',
            ]);

            if ($data['is_main'] ?? false) {
                Address::where('user_id', Auth::id())->where('id', '!=', $id)->update(['is_main' => false]);
            }

            $address->update($data);
            return self::successResponse($address, 'Endereço atualizado com sucesso.');
        } catch (\Exception $e) {
            return self::returnError($e);
        }
    }

    /**
     * Delete an address.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $address = Address::where('user_id', Auth::id())->findOrFail($id);
            $address->delete();
            return self::successResponse(null, 'Endereço removido com sucesso.');
        } catch (\Exception $e) {
            return self::returnError($e);
        }
    }

    /**
     * Set address as main.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function setMain(int $id): JsonResponse
    {
        try {
            Address::where('user_id', Auth::id())->update(['is_main' => false]);
            $address = Address::where('user_id', Auth::id())->findOrFail($id);
            $address->update(['is_main' => true]);
            return self::successResponse($address, 'Endereço principal atualizado.');
        } catch (\Exception $e) {
            return self::returnError($e);
        }
    }
}
