<?php
 
namespace App\Models;
 
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
 
class Product extends Model
{
    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'description',
        'price',
        'image_path',
        'stock',
        'is_active',
        'weight',
        'width',
        'height',
        'length'
    ];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        if (!$this->image_path) return '/placeholder.jpg';
        if (str_starts_with($this->image_path, 'http')) return $this->image_path;
        
        $path = ltrim($this->image_path, '/');
        if (str_starts_with($path, 'storage/')) {
            return asset($path);
        }
        
        return asset('storage/' . $path);
    }
 
    /**
     * Get the category that owns the product.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
 
    /**
     * Get the images for the product.
     */
    public function images(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(ProductImage::class)->orderBy('order');
    }
}
