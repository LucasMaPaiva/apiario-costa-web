<?php

namespace App\Http\Controllers;

use App\Base\Http\Controllers\BaseController;
use App\Models\Product;
use Illuminate\Http\JsonResponse;

class ProductController extends BaseController
{
    /**
     * Display a listing of the active products.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $products = Product::with('category')->where('is_active', true)->get();
            return self::successResponse($products);
        } catch (\Exception $e) {
            return self::returnError($e);
        }
    }

    /**
     * Display the specified product by slug.
     *
     * @param string $slug
     * @return JsonResponse
     */
    public function show(string $slug): JsonResponse
    {
        try {
            $product = Product::with('category')->where('slug', $slug)->firstOrFail();
            return self::successResponse($product);
        } catch (\Exception $e) {
            return self::returnError($e);
        }
    }
}
