import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
    const { 
        cart, 
        is_cart_open, 
        setIsCartOpen, 
        updateQuantity, 
        removeFromCart, 
        cart_total 
    } = useCart();

    return (
        <AnimatePresence>
            {is_cart_open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-screen w-full max-w-md bg-brand-white shadow-2xl z-[101] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-bg-main/50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-brand-mel rounded-xl flex items-center justify-center text-brand-white shadow-lg shadow-brand-mel/20">
                                    <ShoppingBag size={20} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black italic text-brand-dark tracking-tighter">Seu Carrinho</h2>
                                    <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Apiário Costa</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-brand-wine"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-hide">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-40 py-20">
                                    <ShoppingBag size={64} className="mb-4 text-gray-300" />
                                    <p className="italic text-gray-500">Seu carrinho está vazio.</p>
                                    <button 
                                        onClick={() => setIsCartOpen(false)}
                                        className="mt-4 text-brand-mel font-bold uppercase text-[10px] tracking-widest hover:underline"
                                    >
                                        Continuar Comprando
                                    </button>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div key={item.id} className="flex gap-4 group">
                                        <div className="w-24 h-24 bg-bg-main rounded-2xl p-4 flex-shrink-0 border border-gray-50 overflow-hidden">
                                            <img 
                                                src={item.image_path || ''} 
                                                alt={item.name} 
                                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="text-sm font-bold text-brand-dark line-clamp-1 italic">{item.name}</h3>
                                                <button 
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-gray-300 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                            <p className="text-[10px] text-brand-mel font-black uppercase tracking-widest mb-3">
                                                R$ {item.price.toFixed(2)}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3 bg-bg-main p-1 rounded-lg border border-gray-100">
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-brand-mel transition-colors"
                                                    >
                                                        <Minus size={12} />
                                                    </button>
                                                    <span className="text-[10px] font-black w-4 text-center">{item.quantity}</span>
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-brand-mel transition-colors"
                                                    >
                                                        <Plus size={12} />
                                                    </button>
                                                </div>
                                                <span className="text-xs font-black text-brand-dark tracking-tighter">
                                                    R$ {(item.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="p-8 bg-brand-white border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
                                <div className="flex justify-between items-end mb-8">
                                    <div>
                                        <span className="block text-[9px] uppercase tracking-[0.3em] text-gray-400 font-bold mb-1">Subtotal</span>
                                        <span className="text-3xl font-black text-brand-dark italic tracking-tighter">
                                            R$ {cart_total.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] text-brand-mel font-bold italic">Frete grátis em breve</span>
                                    </div>
                                </div>
                                
                                <Link 
                                    to="/checkout"
                                    onClick={() => setIsCartOpen(false)}
                                    className="w-full py-5 bg-brand-mel text-brand-white text-[10px] uppercase tracking-[0.3em] font-black rounded-2xl hover:bg-brand-wine hover:scale-[1.02] transition-all flex items-center justify-center gap-3 shadow-xl shadow-brand-mel/20"
                                >
                                    Finalizar Pedido
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
