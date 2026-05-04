<?php

namespace App\Services\Category;

use App\Repositories\CategoryRepository;
use Exception;

class DeleteCategoryService
{
    public function __construct(
        protected CategoryRepository $repository
    ) {}

    public function execute(int $id): bool
    {
        $category = $this->repository->find($id);

        if ($category->products()->count() > 0) {
            throw new Exception('Não é possível excluir esta categoria pois ela possui produtos vinculados.', 400);
        }

        return $this->repository->delete($category);
    }
}
