<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'meis' => Category::updateOrCreate(['slug' => 'meis'], ['name' => 'Méis']),
            'compostos-sprays' => Category::updateOrCreate(['slug' => 'compostos-sprays'], ['name' => 'Compostos & Sprays']),
            'propolis' => Category::updateOrCreate(['slug' => 'propolis'], ['name' => 'Própolis']),
            'polen-geleia' => Category::updateOrCreate(['slug' => 'polen-geleia'], ['name' => 'Pólen e Geleia Real']),
            'cafe' => Category::updateOrCreate(['slug' => 'cafe'], ['name' => 'Café']),
            'pimentas' => Category::updateOrCreate(['slug' => 'pimentas'], ['name' => 'Pimentas Amazônicas']),
            'apicultura' => Category::updateOrCreate(['slug' => 'apicultura'], ['name' => 'Equipamentos de Apicultura']),
        ];

        $products = [
            ['n' => '02', 'name' => 'Mel Apiário Costa 300g',                  'desc' => 'Mel puro e artesanal do Apiário Costa em embalagem de 300g, ideal para o dia a dia.',                                    'price' => 13.00,  'stock' => 80,  'cat' => 'meis',             'main_ext' => 'png'],
            ['n' => '03', 'name' => 'Mel Apiário Costa 450g',                  'desc' => 'Mel artesanal do Apiário Costa em embalagem de 450g, sabor floral suave e textura encorpada.',                            'price' => 15.00,  'stock' => 60,  'cat' => 'meis',             'main_ext' => 'png'],
            ['n' => '05', 'name' => 'Mel Apiário Costa 700g',                  'desc' => 'Mel puro e inspecionado do Apiário Costa, embalagem prática de 700g.',                                                     'price' => 20.00,  'stock' => 35,  'cat' => 'meis',             'main_ext' => 'png'],
            ['n' => '01', 'name' => 'Mel Apiário Costa 1,4kg',                 'desc' => 'Mel puro e artesanal do Apiário Costa, garrafa pet de 1,4kg. Inspecionado e produzido em Roraima.',                       'price' => 40.00,  'stock' => 40,  'cat' => 'meis',             'main_ext' => 'jpg'],
            ['n' => '18', 'name' => 'Mel Apiário Costa Sachê 200g',            'desc' => 'Mel artesanal Apiário Costa em sachê prático de 200g, perfeito para levar onde quiser.',                                  'price' => 10.00,  'stock' => 120, 'cat' => 'meis',             'main_ext' => 'png'],
            ['n' => '22', 'name' => 'Mel Apiário Costa Sachê 1kg',             'desc' => 'Mel puro Apiário Costa em embalagem flexível de 1kg, produzido em Roraima.',                                              'price' => 40.00,  'stock' => 50,  'cat' => 'meis',             'main_ext' => 'png'],
            ['n' => '14', 'name' => 'Mel com Favos 250g',                      'desc' => 'Mel artesanal envasado com favo natural, experiência completa direto da colmeia. Embalagem de 250g.',                     'price' => 20.00,  'stock' => 25,  'cat' => 'meis',             'main_ext' => 'png'],
            ['n' => '28', 'name' => 'Mel com Favos 500g',                      'desc' => 'Mel artesanal envasado com favo natural, experiência completa direto da colmeia. Embalagem de 500g.',                     'price' => 35.00,  'stock' => 20,  'cat' => 'meis',             'main_ext' => 'png'],
            ['n' => '13', 'name' => 'Mel Composto 200g',                       'desc' => 'Mel composto pronto para uso. Sugestão: 1 colher para crianças, 2 para adultos.',                                         'price' => 20.00,  'stock' => 50,  'cat' => 'compostos-sprays', 'main_ext' => 'png'],
            ['n' => '15', 'name' => 'Própolis Verde Gotas 30ml',               'desc' => 'Extrato de própolis verde em gotas para uso oral, 80% menos cera de abelha na fórmula. Frasco de 30ml.',                 'price' => 20.00,  'stock' => 70,  'cat' => 'propolis',         'main_ext' => 'png'],
            ['n' => '07', 'name' => 'Própolis Verde Spray 30ml',               'desc' => 'Spray de extrato puro de própolis verde, ideal para o conforto da garganta. Frasco de 30ml.',                            'price' => 20.00,  'stock' => 80,  'cat' => 'propolis',         'main_ext' => 'png'],
            ['n' => '17', 'name' => 'Própolis em Cápsulas',                    'desc' => 'Suplemento de própolis puro em cápsulas, praticidade e benefícios do própolis no dia a dia.',                            'price' => 39.00,  'stock' => 30,  'cat' => 'propolis',         'main_ext' => 'png'],
            ['n' => '11', 'name' => 'Própolis Menta 30ml',                     'desc' => 'Composto de mel e extrato de própolis com sabor menta, spray bucal de uso tópico. 30ml.',                                'price' => 20.00,  'stock' => 80,  'cat' => 'compostos-sprays', 'main_ext' => 'png'],
            ['n' => '12', 'name' => 'Própolis Agrião 30ml',                    'desc' => 'Composto de mel e extrato de própolis com sabor agrião, spray bucal de uso tópico. 30ml.',                               'price' => 20.00,  'stock' => 60,  'cat' => 'compostos-sprays', 'main_ext' => 'png'],
            ['n' => '08', 'name' => 'Própolis Framboesas 30ml',                'desc' => 'Composto de mel e extrato de própolis com sabor framboesa, spray bucal de uso tópico. 30ml.',                           'price' => 20.00,  'stock' => 70,  'cat' => 'compostos-sprays', 'main_ext' => 'png'],
            ['n' => '16', 'name' => 'Pólen Apícola',                           'desc' => 'Pólen apícola natural, rico em proteínas, vitaminas e minerais. Embalagem prática.',                                     'price' => 25.00,  'stock' => 60,  'cat' => 'polen-geleia',     'main_ext' => 'png'],
            ['n' => '20', 'name' => 'Geleia Real 60 Cápsulas',                 'desc' => 'Suplemento alimentar de geleia real liofilizada. Frasco com 60 cápsulas.',                                               'price' => 78.00,  'stock' => 40,  'cat' => 'polen-geleia',     'main_ext' => 'png'],
            ['n' => '04', 'name' => 'Café Dom Alfredo Robusta Amazônico 250g', 'desc' => 'Café 100% robustas amazônicos, torra média, em grãos ou moído. Pacote de 250g.',                                         'price' => 30.00,  'stock' => 50,  'cat' => 'cafe',             'main_ext' => 'png'],
            ['n' => '29', 'name' => 'Café Dom Alfredo Robusta Amazônico 350g', 'desc' => 'Café 100% robustas amazônicos, torra média, em grãos ou moído. Pacote de 350g.',                                         'price' => 37.00,  'stock' => 50,  'cat' => 'cafe',             'main_ext' => 'png'],
            ['n' => '23', 'name' => 'Molho de Pimenta Amazônico',              'desc' => 'Molho de pimenta artesanal com sabores autênticos da Amazônia.',                                                          'price' => 20.00,  'stock' => 80,  'cat' => 'pimentas',         'main_ext' => 'png'],
            ['n' => '19', 'name' => 'Kit Pimenta Amazônica',                   'desc' => 'Kit com molhos de pimenta Daval: sabores autênticos da Amazônia.',                                                        'price' => 45.00,  'stock' => 40,  'cat' => 'pimentas',         'main_ext' => 'png'],
            ['n' => '25', 'name' => 'Fumigador para Apicultura',               'desc' => 'Fumigador de aço inox com madeira para manejo seguro de abelhas no apiário.',                                             'price' => 650.00, 'stock' => 15,  'cat' => 'apicultura',       'main_ext' => 'png'],
            ['n' => '26', 'name' => 'Macacão Apicultor Profissional',          'desc' => 'Macacão profissional amarelo com véu protetor, para manejo seguro em apiários.',                                         'price' => 690.00, 'stock' => 20,  'cat' => 'apicultura',       'main_ext' => 'png'],
        ];

        $public_dir = public_path('products');

        foreach ($products as $data) {
            $main_path = $this->resolvePath($public_dir, "{$data['n']}.{$data['main_ext']}");
            $secondary_path = $this->resolvePath($public_dir, "{$data['n']}.1.png");

            $product = Product::updateOrCreate(
                ['slug' => Str::slug($data['name'])],
                [
                    'category_id' => $categories[$data['cat']]->id,
                    'name' => $data['name'],
                    'description' => $data['desc'],
                    'price' => $data['price'],
                    'stock' => $data['stock'],
                    'image_path' => $main_path,
                    'is_active' => true,
                ]
            );

            $product->images()->delete();

            if ($main_path) {
                ProductImage::create([
                    'product_id' => $product->id,
                    'path' => $main_path,
                    'is_main' => true,
                    'order' => 0,
                ]);
            }

            if ($secondary_path) {
                ProductImage::create([
                    'product_id' => $product->id,
                    'path' => $secondary_path,
                    'is_main' => false,
                    'order' => 1,
                ]);
            }
        }

        $valid_slugs = array_map(fn($p) => Str::slug($p['name']), $products);
        Product::whereNotIn('slug', $valid_slugs)->delete();
    }

    private function resolvePath(string $public_dir, string $filename): ?string
    {
        return File::exists("{$public_dir}/{$filename}") ? "products/{$filename}" : null;
    }
}
