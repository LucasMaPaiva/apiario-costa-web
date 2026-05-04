<?php

namespace App\Http\Controllers;

use App\Base\Http\Controllers\BaseController;
use App\Http\Requests\Category\StoreCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Services\Category\DeleteCategoryService;
use App\Services\Category\ListCategoriesService;
use App\Services\Category\StoreCategoryService;
use Illuminate\Http\JsonResponse;

class CategoryController extends BaseController
{
    /**
     * @param ListCategoriesService $service
     * @return JsonResponse
     */
    public function index(ListCategoriesService $service): JsonResponse
    {
        try {
            return self::successResponse(CategoryResource::collection($service->execute()));
        } catch (\Exception $e) {
            return self::returnError($e);
        }
    }

    /**
     * @param StoreCategoryRequest $request
     * @param StoreCategoryService $service
     * @return JsonResponse
     */
    public function store(StoreCategoryRequest $request, StoreCategoryService $service): JsonResponse
    {
        try {
            $category = $service->execute($request->validated());
            return self::successResponse(
                new CategoryResource($category),
                'Categoria criada com sucesso.',
                201
            );
        } catch (\Exception $e) {
            return self::returnError($e);
        }
    }

    /**
     * @param int $id
     * @param DeleteCategoryService $service
     * @return JsonResponse
     */
    public function destroy(int $id, DeleteCategoryService $service): JsonResponse
    {
        try {
            $service->execute($id);
            return self::successResponse(null, 'Categoria excluída com sucesso.');
        } catch (\Exception $e) {
            if ($e->getCode() === 400) {
                return response()->json([
                    'success' => false,
                    'message' => $e->getMessage()
                ], 400);
            }
            return self::returnError($e);
        }
    }
}
