<?php

namespace App\Services\Category;

use App\Models\Category;
use App\Repositories\CategoryRepository;

class StoreCategoryService
{
    public function __construct(
        protected CategoryRepository $repository
    ) {}

    public function execute(array $data): Category
    {
        return $this->repository->create($data);
    }
}
