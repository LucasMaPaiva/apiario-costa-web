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
            ['n' => '01', 'name' => 'Mel Apiário Costa 1,4kg', 'desc' => 'Mel puro e artesanal do Apiário Costa, garrafa pet de 1,4kg. Inspecionado e produzido em Roraima.', 'price' => 55.00, 'stock' => 40, 'cat' => 'meis', 'main_ext' => 'jpg'],
            ['n' => '02', 'name' => 'Mel Apiário Costa 300g', 'desc' => 'Versão compacta do nosso mel artesanal em garrafa pet de 300g, ideal para o dia a dia.', 'price' => 22.00, 'stock' => 80, 'cat' => 'meis', 'main_ext' => 'png'],
            ['n' => '03', 'name' => 'Mel Apiário Costa 450g', 'desc' => 'Mel artesanal do Apiário Costa em pet de 450g, sabor floral suave e textura encorpada.', 'price' => 32.00, 'stock' => 60, 'cat' => 'meis', 'main_ext' => 'png'],
            ['n' => '04', 'name' => 'Café Dom Alfredo Robusta Amazônico 250g', 'desc' => 'Café 100% robustas amazônicos, torra média, em grãos ou moído. Pacote de 250g.', 'price' => 28.00, 'stock' => 50, 'cat' => 'cafe', 'main_ext' => 'png'],
            ['n' => '05', 'name' => 'Mel Roraimel 700g', 'desc' => 'Mel puro inspecionado de Roraima, embalagem prática de 700g.', 'price' => 38.00, 'stock' => 35, 'cat' => 'meis', 'main_ext' => 'png'],
            ['n' => '06', 'name' => 'Mellkatess Spray Bucal 30ml', 'desc' => 'Composto aromatizante bucal com mel, menta, copaíba, própolis, gengibre e eucalipto. 30ml.', 'price' => 25.00, 'stock' => 100, 'cat' => 'compostos-sprays', 'main_ext' => 'png'],
            ['n' => '07', 'name' => 'Extrato de Própolis Verde Spray 30ml', 'desc' => 'Spray de extrato puro de própolis verde, ideal para o conforto da garganta. Frasco de 30ml.', 'price' => 30.00, 'stock' => 80, 'cat' => 'propolis', 'main_ext' => 'png'],
            ['n' => '08', 'name' => 'Frambomel Spray Bucal 30ml', 'desc' => 'Composto aromatizante bucal com mel, malva, agrião, framboesa, própolis e menta. 30ml.', 'price' => 25.00, 'stock' => 70, 'cat' => 'compostos-sprays', 'main_ext' => 'png'],
            ['n' => '09', 'name' => 'Itamax Spray Bucal Ita Brasil 30ml', 'desc' => 'Composto Ita Brasil com mel, extrato de própolis e ervas selecionadas para uso tópico. 30ml.', 'price' => 28.00, 'stock' => 70, 'cat' => 'compostos-sprays', 'main_ext' => 'png'],
            ['n' => '10', 'name' => 'Composto de Mel e Própolis Spray 30ml', 'desc' => 'Composto Ita Brasil de mel com extrato de própolis em spray bucal, uso tópico. 30ml.', 'price' => 25.00, 'stock' => 80, 'cat' => 'compostos-sprays', 'main_ext' => 'png'],
            ['n' => '11', 'name' => 'Composto Mel e Própolis Sabor Menta 30ml', 'desc' => 'Composto Ita Brasil de mel e extrato de própolis com sabor menta, spray bucal de uso tópico. 30ml.', 'price' => 25.00, 'stock' => 80, 'cat' => 'compostos-sprays', 'main_ext' => 'png'],
            ['n' => '12', 'name' => 'Composto Mel e Própolis Sabor Agrião 30ml', 'desc' => 'Composto Ita Brasil de mel e extrato de própolis com sabor agrião, spray bucal de uso tópico. 30ml.', 'price' => 25.00, 'stock' => 60, 'cat' => 'compostos-sprays', 'main_ext' => 'png'],
            ['n' => '13', 'name' => 'Mel Composto 200ml', 'desc' => 'Mel composto pronto para uso. Sugestões de uso: 1 colher para crianças, 2 para adultos. 200ml.', 'price' => 28.00, 'stock' => 50, 'cat' => 'compostos-sprays', 'main_ext' => 'png'],
            ['n' => '14', 'name' => 'Pote de Mel com Favo', 'desc' => 'Mel artesanal envasado com favo natural inteiro, experiência completa direto da colmeia.', 'price' => 65.00, 'stock' => 25, 'cat' => 'meis', 'main_ext' => 'png'],
            ['n' => '15', 'name' => 'Extrato de Própolis Verde em Gotas 30ml', 'desc' => 'Extrato de própolis verde em gotas para uso oral, 80% menos cera de abelha na fórmula. 30ml.', 'price' => 35.00, 'stock' => 70, 'cat' => 'propolis', 'main_ext' => 'png'],
            ['n' => '16', 'name' => 'Pólen Apícola', 'desc' => 'Pólen apícola natural, rico em proteínas, vitaminas e minerais. Embalagem prática.', 'price' => 28.00, 'stock' => 60, 'cat' => 'polen-geleia', 'main_ext' => 'png'],
            ['n' => '17', 'name' => 'Própolis em Pasta', 'desc' => 'Própolis pura em pasta, ideal para uso culinário ou consumo direto.', 'price' => 45.00, 'stock' => 30, 'cat' => 'propolis', 'main_ext' => 'png'],
            ['n' => '18', 'name' => 'Mel Apiário Costa Artesanal Sachê 200g', 'desc' => 'Mel artesanal Apiário Costa em sachê prático de 200g, perfeito para levar onde quiser.', 'price' => 18.00, 'stock' => 120, 'cat' => 'meis', 'main_ext' => 'png'],
            ['n' => '19', 'name' => 'Kit Molhos de Pimenta Amazônicos Daval', 'desc' => 'Kit com 3 molhos de pimenta Daval: Tradicional, Cuxá e Tucupi. Sabores autênticos da Amazônia.', 'price' => 55.00, 'stock' => 40, 'cat' => 'pimentas', 'main_ext' => 'png'],
            ['n' => '20', 'name' => 'Geleia Real Liofilizada BeeWays 60 cápsulas', 'desc' => 'Suplemento alimentar de geleia real liofilizada 150mg 10HDA, BeeWays. Frasco com 60 cápsulas.', 'price' => 78.00, 'stock' => 40, 'cat' => 'polen-geleia', 'main_ext' => 'png'],
            ['n' => '21', 'name' => 'Geleia Real ApisNutri 60 cápsulas', 'desc' => 'Suplemento alimentar de geleia real ApisNutri com vitaminas B2, B6, B12 e E. 60 cápsulas de 500mg.', 'price' => 72.00, 'stock' => 40, 'cat' => 'polen-geleia', 'main_ext' => 'png'],
            ['n' => '22', 'name' => 'Mel Roramel 1kg', 'desc' => 'Mel puro Roramel inspecionado, embalagem flexível de 1kg, produzido em Roraima.', 'price' => 48.00, 'stock' => 50, 'cat' => 'meis', 'main_ext' => 'png'],
            ['n' => '23', 'name' => 'Molho de Pimenta Tradicional Daval', 'desc' => 'Molho de pimenta artesanal tradicional Daval, sabor amazônico autêntico.', 'price' => 22.00, 'stock' => 80, 'cat' => 'pimentas', 'main_ext' => 'png'],
            ['n' => '24', 'name' => 'Molho de Pimenta Cuxá Daval', 'desc' => 'Molho de pimenta cremoso sabor cuxá, identidade da culinária amazônica. Daval.', 'price' => 22.00, 'stock' => 80, 'cat' => 'pimentas', 'main_ext' => 'png'],
            ['n' => '25', 'name' => 'Fumigador para Apicultura', 'desc' => 'Fumigador de aço inox com madeira para manejo seguro de abelhas no apiário.', 'price' => 220.00, 'stock' => 15, 'cat' => 'apicultura', 'main_ext' => 'png'],
            ['n' => '26', 'name' => 'Macacão Apicultor Profissional', 'desc' => 'Macacão profissional amarelo com véu protetor, para manejo seguro em apiários.', 'price' => 280.00, 'stock' => 20, 'cat' => 'apicultura', 'main_ext' => 'png'],
            ['n' => '27', 'name' => 'Cera de Abelha em Bloco', 'desc' => 'Bloco de cera de abelha pura, ideal para artesanato, velas e uso apícola.', 'price' => 75.00, 'stock' => 30, 'cat' => 'apicultura', 'main_ext' => 'png'],
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
