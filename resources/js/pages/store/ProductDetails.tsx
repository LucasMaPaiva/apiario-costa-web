import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductBySlug, Product } from '../../modules/products/services/productService';
import { Loader2, ArrowLeft, ShoppingBag, ShieldCheck, Truck, RefreshCcw, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../../modules/cart/context/CartContext';

export default function ProductDetails() {
    const { slug } = useParams<{ slug: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [active_image, set_active_image] = useState<string | null>(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const loadProduct = async () => {
            if (!slug) return;
            try {
                const data = await fetchProductBySlug(slug);
                setProduct(data);
                set_active_image(data.image_path);
            } catch (error) {
                console.error('Failed to load product:', error);
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-bg-main flex flex-col items-center justify-center gap-4 transition-colors duration-500">
                <Loader2 className="animate-spin text-brand-mel" size={48} />
                <span className="text-[10px] uppercase tracking-[0.3em] text-text-secondary font-black">Carregando detalhes...</span>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-bg-main flex flex-col items-center justify-center gap-6 transition-colors duration-500">
                <p className="text-text-primary italic">Produto não encontrado.</p>
                <Link to="/loja" className="text-brand-wine uppercase text-[10px] tracking-widest font-black underline">
                    Voltar para a loja
                </Link>
            </div>
        );
    }

    const all_images = [
        product.image_path,
        ...(product.images?.map(img => img.image_path) || [])
    ].filter(Boolean) as string[];

    return (
        <div className="min-h-screen bg-bg-main pt-32 pb-20 transition-colors duration-500">
            <div className="container mx-auto px-4">
                {/* Voltar */}
                <Link 
                    to="/loja" 
                    className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-text-secondary hover:text-brand-wine transition-colors mb-12"
                >
                    <ArrowLeft size={14} />
                    Voltar para o catálogo
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Galeria */}
                    <div className="lg:col-span-7">
                        <div className="sticky top-32">
                            <div className="aspect-square bg-surface rounded-3xl p-6 shadow-xl border border-border flex items-center justify-center overflow-hidden mb-6 group">
                                {active_image ? (
                                    <motion.img 
                                        key={active_image}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        src={active_image} 
                                        alt={product.name} 
                                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 p-4"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center gap-4 text-brand-mel/20">
                                        <ShoppingBag size={120} />
                                        <span className="text-xl font-black italic uppercase tracking-tighter">Apiário Costa</span>
                                    </div>
                                )}
                            </div>

                            {all_images.length > 1 && (
                                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                    {all_images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => set_active_image(img)}
                                            className={`w-24 h-24 flex-shrink-0 bg-surface rounded-xl p-2 border-2 transition-all ${
                                                active_image === img 
                                                    ? 'border-brand-mel shadow-lg ring-4 ring-brand-mel/10' 
                                                    : 'border-border opacity-60 hover:opacity-100 hover:border-brand-mel/50'
                                            }`}
                                        >
                                            <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-contain" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Informações */}
                    <div className="lg:col-span-5">
                        <div className="flex flex-col h-full">
                            <span className="text-[10px] uppercase tracking-[0.4em] text-brand-mel font-black mb-4">
                                {product.category?.name || 'Natureza Pura'}
                            </span>
                            <h1 className="text-5xl font-black italic text-text-primary tracking-tighter leading-none mb-6">
                                {product.name}
                            </h1>
                            
                            <div className="flex items-baseline gap-4 mb-8">
                                <span className="text-4xl font-black text-brand-wine italic">
                                    R$ {Number(product.price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </span>
                                <span className="text-xs text-text-secondary font-bold uppercase tracking-widest">
                                    Preço por Unidade
                                </span>
                            </div>

                            <div className="prose prose-sm mb-12 max-w-none">
                                <p className="text-text-secondary leading-relaxed italic text-lg">
                                    {product.description}
                                </p>
                            </div>

                            {/* Ações */}
                            <div className="bg-surface p-8 rounded-3xl shadow-2xl border border-border mb-12">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-4 bg-bg-main p-2 rounded-xl border border-border">
                                        <button 
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-10 h-10 flex items-center justify-center text-text-primary hover:text-brand-mel transition-colors"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="text-base font-black w-8 text-center text-text-primary">{quantity}</span>
                                        <button 
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="w-10 h-10 flex items-center justify-center text-text-primary hover:text-brand-mel transition-colors"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-[9px] uppercase tracking-widest text-text-secondary font-bold mb-1">Total Estimado</span>
                                        <span className="text-2xl font-black text-text-primary">R$ {(product.price * quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => product && addToCart(product, quantity)}
                                    className="w-full py-5 bg-brand-mel text-white text-[11px] uppercase tracking-[0.4em] font-black rounded-2xl hover:bg-brand-wine hover:scale-[1.02] transition-all flex items-center justify-center gap-4 shadow-xl shadow-brand-mel/20 group/btn"
                                >
                                    <ShoppingBag size={22} className="transition-transform group-hover/btn:scale-110" />
                                    Adicionar ao Carrinho
                                </button>
                            </div>

                            {/* Benefícios */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <div className="flex flex-col items-center text-center p-4">
                                    <div className="w-12 h-12 bg-brand-mel/10 rounded-full flex items-center justify-center text-brand-mel mb-3">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <span className="text-[9px] uppercase tracking-widest font-black text-text-primary">100% Puro</span>
                                </div>
                                <div className="flex flex-col items-center text-center p-4">
                                    <div className="w-12 h-12 bg-brand-wine/10 rounded-full flex items-center justify-center text-brand-wine mb-3">
                                        <Truck size={20} />
                                    </div>
                                    <span className="text-[9px] uppercase tracking-widest font-black text-text-primary">Entrega Rápida</span>
                                </div>
                                <div className="flex flex-col items-center text-center p-4">
                                    <div className="w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold mb-3">
                                        <RefreshCcw size={20} />
                                    </div>
                                    <span className="text-[9px] uppercase tracking-widest font-black text-text-primary">Troca Grátis</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
