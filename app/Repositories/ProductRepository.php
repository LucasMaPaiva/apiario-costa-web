<?php

namespace App\Repositories;

use App\Base\Repositories\BaseRepository;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Database\Eloquent\Collection;

class ProductRepository extends BaseRepository
{
    public function __construct(Product $model)
    {
        parent::__construct($model);
    }

    /**
     * @return Collection
     */
    public function getAllAdmin(): Collection
    {
        return $this->query()->with(['category', 'images'])->orderBy('id', 'desc')->get();
    }

    /**
     * @param int $perPage
     * @param array $filters
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function getPaginatedAdmin(int $perPage = 10, array $filters = []): \Illuminate\Contracts\Pagination\LengthAwarePaginator
    {
        $query = $this->query()->with(['category', 'images'])->orderBy('id', 'desc');

        if (!empty($filters['search'])) {
            $query->where('name', 'ilike', '%' . $filters['search'] . '%');
        }

        if (isset($filters['status']) && $filters['status'] !== '') {
            $query->where('is_active', $filters['status'] === 'true' || $filters['status'] === '1');
        }

        if (!empty($filters['category_id'])) {
            $query->where('category_id', $filters['category_id']);
        }

        return $query->paginate($perPage);
    }

    /**
     * @return Collection
     */
    public function getAllActive(): Collection
    {
        return $this->query()->with(['category', 'images'])->where('is_active', true)->get();
    }

    /**
     * @param string $slug
     * @return Product
     */
    public function findBySlug(string $slug): Product
    {
        return $this->query()->with(['category', 'images'])->where('slug', $slug)->firstOrFail();
    }

    /**
     * Métodos específicos para ProductImage (Outra Entidade)
     */
    public function createImage(array $data): ProductImage
    {
        return ProductImage::create($data);
    }

    public function findImage(int $id): ProductImage
    {
        return ProductImage::findOrFail($id);
    }

    public function deleteImage(ProductImage $image): ?bool
    {
        return $image->delete();
    }
}
