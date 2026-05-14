<?php

namespace App\Services\Product;

use App\Models\Product;
use App\Repositories\ProductRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

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
                $this->deleteImage($product->image_path);
                $data['image_path'] = $this->storeImage($main_image);
            }

            $this->repository->update($product, $data);

            if (!empty($removed_images)) {
                foreach ($removed_images as $image_id) {
                    $image = $this->repository->findImage($image_id);
                    if ($image->product_id === $product->id) {
                        $this->deleteImage($image->path);
                        $this->repository->deleteImage($image);
                    }
                }
            }

            if (!empty($carousel_images)) {
                $max_order = $product->images()->max('order') ?? 0;
                foreach ($carousel_images as $index => $image) {
                    $this->repository->createImage([
                        'product_id' => $product->id,
                        'path' => $this->storeImage($image),
                        'is_main' => false,
                        'order' => $max_order + $index + 1
                    ]);
                }
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

    private function deleteImage(?string $path): void
    {
        if (!$path) return;
        $relative = ltrim(str_replace('/storage/', '', $path), '/');
        $full = public_path($relative);
        if (is_file($full)) @unlink($full);
    }
}
