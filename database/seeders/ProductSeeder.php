<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $category = Category::create([
            'name' => 'Mel e Derivados',
            'slug' => 'mel-e-derivados',
        ]);

        $products = [
            [
                'name' => 'Mel Silvestre Premium',
                'description' => 'Colheita artesanal com notas florais suaves e textura cristalina. Pote 500g.',
                'price' => 35.00,
                'stock' => 50,
            ],
            [
                'name' => 'Favo de Mel Nativo',
                'description' => 'Experiência completa da colmeia para sua mesa, 100% in natura. Unidade 300g.',
                'price' => 45.00,
                'stock' => 20,
            ],
            [
                'name' => 'Mel de Eucalipto',
                'description' => 'Sabor intenso e propriedades revigorantes, ideal para o dia a dia. Pote 1kg.',
                'price' => 60.00,
                'stock' => 30,
            ],
            [
                'name' => 'Própolis Verde',
                'description' => 'Extrato puro para reforçar sua imunidade com força da natureza. Frasco 30ml.',
                'price' => 25.00,
                'stock' => 100,
            ],
        ];

        foreach ($products as $product) {
            $category->products()->create([
                'name' => $product['name'],
                'slug' => Str::slug($product['name']),
                'description' => $product['description'],
                'price' => $product['price'],
                'stock' => $product['stock'],
                'image_path' => null, // We'll handle images later
                'is_active' => true,
            ]);
        }
    }
}
