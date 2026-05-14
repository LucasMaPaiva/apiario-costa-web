<?php

namespace App\Services\Product;

use App\Repositories\ProductRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class DeleteProductService
{
    public function __construct(
        protected ProductRepository $repository
    ) {}

    public function execute(int $id): bool
    {
        return DB::transaction(function () use ($id) {
            $product = $this->repository->find($id);

            if ($product->image_path) {
                $oldPath = str_replace('/storage/', '', $product->image_path);
                Storage::disk('public')->delete($oldPath);
            }

            foreach ($product->images as $image) {
                $oldPath = str_replace('/storage/', '', $image->path);
                Storage::disk('public')->delete($oldPath);
            }

            return $this->repository->delete($product);
        });
    }
}
