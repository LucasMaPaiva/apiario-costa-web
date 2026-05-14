<?php

namespace App\Services\Product;

use App\Repositories\ProductRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class AdminListProductsService
{
    public function __construct(
        protected ProductRepository $repository
    ) {}

    public function execute(int $perPage = 10, array $filters = []): LengthAwarePaginator
    {
        return $this->repository->getPaginatedAdmin($perPage, $filters);
    }
}
