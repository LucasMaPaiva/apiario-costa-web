<?php

namespace App\Services\Product;

use App\Models\Product;
use App\Repositories\ProductRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class UpdateProductService
{
    public function __construct(
        protected ProductRepository $repository
    ) {}

    public function execute(int $id, array $data, ?object $main_image = null, array $carousel_images = [], array $removed_images = []): Product
    {
        return DB::transaction(function () use ($id, $data, $main_image, $carousel_images, $removed_images) {
            $product = $this->repository->find($id);

            if ($main_image) {
                if ($product->image_path) {
                    $old_path = str_replace('/storage/', '', $product->image_path);
                    Storage::disk('public')->delete($old_path);
                }
                $path = $main_image->store('products', 'public');
                $data['image_path'] = '/storage/' . $path;
            }

            $this->repository->update($product, $data);

            if (!empty($removed_images)) {
                foreach ($removed_images as $image_id) {
                    $image = $this->repository->findImage($image_id);
                    if ($image->product_id === $product->id) {
                        $old_path = str_replace('/storage/', '', $image->path);
                        Storage::disk('public')->delete($old_path);
                        $this->repository->deleteImage($image);
                    }
                }
            }

            if (!empty($carousel_images)) {
                $max_order = $product->images()->max('order') ?? 0;
                foreach ($carousel_images as $index => $image) {
                    $path = $image->store('products', 'public');
                    $this->repository->createImage([
                        'product_id' => $product->id,
                        'path' => '/storage/' . $path,
                        'is_main' => false,
                        'order' => $max_order + $index + 1
                    ]);
                }
            }

            return $product->load(['category', 'images']);
        });
    }
}
