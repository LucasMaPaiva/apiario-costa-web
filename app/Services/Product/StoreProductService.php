<?php

namespace App\Services\Product;

use App\Models\Product;
use App\Repositories\ProductRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class StoreProductService
{
    public function __construct(
        protected ProductRepository $repository
    ) {}

    public function execute(array $data, ?object $main_image = null, array $carousel_images = []): Product
    {
        return DB::transaction(function () use ($data, $main_image, $carousel_images) {
            if ($main_image) {
                $data['image_path'] = $this->storeImage($main_image);
            }

            $product = $this->repository->create($data);

            foreach ($carousel_images as $index => $image) {
                $this->repository->createImage([
                    'product_id' => $product->id,
                    'path' => $this->storeImage($image),
                    'is_main' => false,
                    'order' => $index
                ]);
            }

            return $product->load(['category', 'images']);
        });
    }

    private function storeImage(object $image): string
    {
        $filename = Str::uuid() . '.' . $image->getClientOriginalExtension();
        $image->move(public_path('products'), $filename);
        return 'products/' . $filename;
    }
}
