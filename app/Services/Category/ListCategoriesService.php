<?php

namespace App\Services\Category;

use App\Repositories\CategoryRepository;
use Illuminate\Database\Eloquent\Collection;

class ListCategoriesService
{
    public function __construct(
        protected CategoryRepository $repository
    ) {}

    public function execute(): Collection
    {
        return $this->repository->getAll();
    }
}
