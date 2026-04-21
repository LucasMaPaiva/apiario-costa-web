import React, { useEffect, useState } from 'react';
import { fetchProducts, fetchCategories, Product, Category } from '../../modules/products/services/productService';
import ProductCard from '../../modules/products/components/ProductCard';
import { LayoutGrid, Loader2, Filter, ChevronRight } from 'lucide-react';

export default function StorePage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const [productsData, categoriesData] = await Promise.all([
                    fetchProducts(),
                    fetchCategories()
                ]);
                setProducts(productsData);
                setFilteredProducts(productsData);
                setCategories(categoriesData);
            } catch (error) {
                console.error('Failed to load store data:', error);
            } finally {
                setLoading(false);
            }
        };
        loadInitialData();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            setFilteredProducts(products.filter(p => p.category?.slug === selectedCategory));
        } else {
            setFilteredProducts(products);
        }
    }, [selectedCategory, products]);

    return (
        <div className="min-h-screen bg-brand-bg pt-32 pb-20">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h1 className="text-6xl font-black italic text-brand-dark tracking-tighter leading-none mb-4">
                            Nossa <span className="text-brand-wine">Loja</span>
                        </h1>
                        <p className="text-gray-400 uppercase tracking-[0.3em] text-[10px] font-black">
                            Produtos 100% Naturais Direto da Colmeia
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-4 bg-brand-white p-2 rounded-xl shadow-sm border border-gray-100">
                        <div className="w-10 h-10 bg-brand-mel rounded-lg flex items-center justify-center text-brand-white">
                            <LayoutGrid size={20} />
                        </div>
                        <div className="px-4 pr-8">
                            <span className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold">Exibindo</span>
                            <span className="block text-brand-dark font-black tracking-tighter">{filteredProducts.length} Produtos</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-64 flex-shrink-0">
                        <div className="sticky top-32">
                            <div className="flex items-center gap-2 mb-8">
                                <Filter size={16} className="text-brand-wine" />
                                <h2 className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-dark">Filtrar por</h2>
                            </div>

                            <div className="space-y-2">
                                <button
                                    onClick={() => setSelectedCategory(null)}
                                    className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                                        selectedCategory === null 
                                        ? 'bg-brand-white shadow-md border-l-4 border-brand-mel' 
                                        : 'hover:bg-brand-white/50 text-gray-400'
                                    }`}
                                >
                                    <span className={`text-xs font-bold ${selectedCategory === null ? 'text-brand-dark' : ''}`}>
                                        Todos os Produtos
                                    </span>
                                    {selectedCategory === null && <ChevronRight size={14} className="text-brand-mel" />}
                                </button>

                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.slug)}
                                        className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                                            selectedCategory === category.slug 
                                            ? 'bg-brand-white shadow-md border-l-4 border-brand-mel' 
                                            : 'hover:bg-brand-white/50 text-gray-400'
                                        }`}
                                    >
                                        <span className={`text-xs font-bold ${selectedCategory === category.slug ? 'text-brand-dark' : ''}`}>
                                            {category.name}
                                        </span>
                                        {selectedCategory === category.slug && <ChevronRight size={14} className="text-brand-mel" />}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-12 p-6 bg-brand-wine/5 rounded-2xl border border-brand-wine/10">
                                <p className="text-[9px] text-brand-wine uppercase tracking-widest font-black mb-2">Qualidade Garantida</p>
                                <p className="text-xs text-brand-wine/60 leading-relaxed italic">
                                    Todos os nossos produtos passam por um rigoroso processo de seleção artística e técnica.
                                </p>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <main className="flex-grow">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-40 gap-4">
                                <Loader2 className="animate-spin text-brand-mel" size={40} />
                                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-black">Carregando catálogo...</span>
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="py-40 text-center bg-brand-white rounded-3xl border border-dashed border-gray-200">
                                <p className="text-gray-400 italic">Nenhum produto encontrado nesta categoria.</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
