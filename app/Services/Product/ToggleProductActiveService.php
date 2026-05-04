<?php

namespace App\Services\Product;

use App\Models\Product;
use App\Repositories\ProductRepository;

class ToggleProductActiveService
{
    public function __construct(
        protected ProductRepository $repository
    ) {}

    public function execute(int $id): Product
    {
        /** @var Product $product */
        $product = $this->repository->find($id);
        
        $this->repository->update($product, [
            'is_active' => !$product->is_active
        ]);

        return $product;
    }
}
