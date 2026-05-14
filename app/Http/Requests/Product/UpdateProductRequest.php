<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $productId = $this->route('id');

        return [
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:products,slug,' . $productId,
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'is_active' => 'boolean',
            'main_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'carousel_images' => 'nullable|array',
            'carousel_images.*' => 'image|mimes:jpeg,png,jpg,webp|max:2048',
            'removed_images' => 'nullable|array',
            'removed_images.*' => 'integer|exists:product_images,id',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'O nome do produto é obrigatório.',
            'slug.required' => 'O slug é obrigatório.',
            'slug.unique' => 'Já existe um produto com este slug.',
            'category_id.required' => 'A categoria é obrigatória.',
            'category_id.exists' => 'A categoria selecionada não é válida.',
            'price.required' => 'O preço é obrigatório.',
            'stock.required' => 'O estoque é obrigatório.',
        ];
    }
}
