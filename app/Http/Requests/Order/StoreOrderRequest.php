<?php

namespace App\Http\Requests\Order;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'items' => ['required', 'array', 'min:1'],
            'items.*.product_id' => ['required', 'exists:products,id'],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
            'delivery_method' => ['nullable', 'in:delivery,pickup'],
            'cep' => ['required_if:delivery_method,delivery', 'nullable', 'string'],
            'street' => ['required_if:delivery_method,delivery', 'nullable', 'string'],
            'number' => ['required_if:delivery_method,delivery', 'nullable', 'string'],
            'complement' => ['nullable', 'string'],
            'neighborhood' => ['required_if:delivery_method,delivery', 'nullable', 'string'],
            'city' => ['required_if:delivery_method,delivery', 'nullable', 'string'],
            'state' => ['required_if:delivery_method,delivery', 'nullable', 'string'],
            'shipping_method' => ['nullable', 'string'],
            'shipping_cost' => ['nullable', 'numeric'],
        ];
    }
}
