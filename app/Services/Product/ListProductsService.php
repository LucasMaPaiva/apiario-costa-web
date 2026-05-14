<?php

namespace App\Services\Product;

use App\Repositories\ProductRepository;
use Illuminate\Database\Eloquent\Collection;

class ListProductsService
{
    public function __construct(
        protected ProductRepository $repository
    ) {}

    public function execute(): Collection
    {
        return $this->repository->getAllActive();
    }
}
