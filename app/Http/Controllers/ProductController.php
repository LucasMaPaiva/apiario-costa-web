<?php

namespace App\Http\Controllers;

use App\Base\Http\Controllers\BaseController;
use App\Http\Requests\Product\StoreProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Repositories\ProductRepository;
use App\Services\Product\AdminListProductsService;
use App\Services\Product\DeleteProductService;
use App\Services\Product\ListProductsService;
use App\Services\Product\StoreProductService;
use App\Services\Product\ToggleProductActiveService;
use App\Services\Product\UpdateProductService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends BaseController
{
    /**
     * @param ListProductsService $service
     * @return JsonResponse
     */
    public function index(ListProductsService $service): JsonResponse
    {
        try {
            return self::successResponse(ProductResource::collection($service->execute()));
        } catch (\Exception $e) {
            return self::returnError($e);
        }
    }

    /**
     * @param string $slug
     * @param ProductRepository $repository
     * @return JsonResponse
     */
    public function show(string $slug, ProductRepository $repository): JsonResponse
    {
        try {
            return self::successResponse(new ProductResource($repository->findBySlug($slug)));
        } catch (\Exception $e) {
            return self::returnError($e);
        }
    }

    /**
     * @param Request $request
     * @param AdminListProductsService $service
     * @return JsonResponse
     */
    public function adminIndex(Request $request, AdminListProductsService $service): JsonResponse
    {
        try {
            $filters = $request->only(['search', 'status', 'category_id']);
            $perPage = (int) $request->get('per_page', 10);
            
            $paginatedData = $service->execute($perPage, $filters);
            
            return response()->json([
                'success' => true,
                'data' => ProductResource::collection($paginatedData)->response()->getData(true)
            ]);
        } catch (\Exception $e) {
            return self::returnError($e);
        }
    }

    /**
     * @param StoreProductRequest $request
     * @param StoreProductService $service
     * @return JsonResponse
     */
    public function store(StoreProductRequest $request, StoreProductService $service): JsonResponse
    {
        try {
            $product = $service->execute(
                $request->validated(),
                $request->file('main_image'),
                $request->file('carousel_images', [])
            );

            return self::successResponse(
                new ProductResource($product),
                'Produto criado com sucesso.',
                201
            );
        } catch (\Exception $e) {
            return self::returnError($e);
        }
    }

    /**
     * @param UpdateProductRequest $request
     * @param int $id
     * @param UpdateProductService $service
     * @return JsonResponse
     */
    public function update(UpdateProductRequest $request, int $id, UpdateProductService $service): JsonResponse
    {
        try {
            $product = $service->execute(
                $id,
                $request->validated(),
                $request->file('main_image'),
                $request->file('carousel_images', []),
                $request->input('removed_images', [])
            );

            return self::successResponse(
                new ProductResource($product),
                'Produto atualizado com sucesso.'
            );
        } catch (\Exception $e) {
            return self::returnError($e);
        }
    }

    /**
     * @param int $id
     * @param DeleteProductService $service
     * @return JsonResponse
     */
    public function destroy(int $id, DeleteProductService $service): JsonResponse
    {
        try {
            $service->execute($id);
            return self::successResponse(null, 'Produto excluído com sucesso.');
        } catch (\Exception $e) {
            return self::returnError($e);
        }
    }

    /**
     * @param int $id
     * @param ToggleProductActiveService $service
     * @return JsonResponse
     */
    public function toggleActive(int $id, ToggleProductActiveService $service): JsonResponse
    {
        try {
            return self::successResponse(
                new ProductResource($service->execute($id)),
                'Status do produto atualizado com sucesso.'
            );
        } catch (\Exception $e) {
            return self::returnError($e);
        }
    }
}
