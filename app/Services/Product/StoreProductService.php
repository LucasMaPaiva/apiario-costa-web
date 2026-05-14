<?php

namespace App\Services\Product;

use App\Models\Product;
use App\Repositories\ProductRepository;
use Illuminate\Support\Facades\DB;

class StoreProductService
{
    public function __construct(
        protected ProductRepository $repository
    ) {}

    public function execute(array $data, ?object $main_image = null, array $carousel_images = []): Product
    {
        return DB::transaction(function () use ($data, $main_image, $carousel_images) {
            if ($main_image) {
                $path = $main_image->store('products', 'public');
                $data['image_path'] = '/storage/' . $path;
            }

            $product = $this->repository->create($data);

            foreach ($carousel_images as $index => $image) {
                $path = $image->store('products', 'public');
                $this->repository->createImage([
                    'product_id' => $product->id,
                    'path' => '/storage/' . $path,
                    'is_main' => false,
                    'order' => $index
                ]);
            }

            return $product->load(['category', 'images']);
        });
    }
}
