import React, { useEffect, useState } from 'react';
import { fetchProducts, Product } from '../../modules/products/services/productService';
import ProductCard from '../../modules/products/components/ProductCard';
import { LayoutGrid, Loader2 } from 'lucide-react';

export default function StorePage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (error) {
                console.error('Failed to load products:', error);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    return (
        <div className="min-h-screen bg-brand-bg pt-32 pb-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
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
                            <span className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold">Total</span>
                            <span className="block text-brand-dark font-black tracking-tighter">{products.length} Produtos</span>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40 gap-4">
                        <Loader2 className="animate-spin text-brand-mel" size={40} />
                        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-black">Carregando catálogo...</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
