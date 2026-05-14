<?php

namespace App\Services\Product;

use App\Repositories\ProductRepository;
use Illuminate\Support\Facades\DB;

class DeleteProductService
{
    public function __construct(
        protected ProductRepository $repository
    ) {}

    public function execute(int $id): bool
    {
        return DB::transaction(function () use ($id) {
            $product = $this->repository->find($id);

            $this->deleteImage($product->image_path);
            foreach ($product->images as $image) {
                $this->deleteImage($image->path);
            }

            return $this->repository->delete($product);
        });
    }

    private function deleteImage(?string $path): void
    {
        if (!$path) return;
        $relative = ltrim(str_replace('/storage/', '', $path), '/');
        $full = public_path($relative);
        if (is_file($full)) @unlink($full);
    }
}
