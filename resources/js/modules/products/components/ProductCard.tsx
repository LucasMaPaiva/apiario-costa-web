import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../services/productService';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="bg-brand-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
            <div className="aspect-square bg-gray-50 flex items-center justify-center p-8">
                {product.image_path ? (
                    <img src={product.image_path} alt={product.name} className="max-h-full object-contain" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-brand-light/20 rounded-xl">
                        <span className="text-brand-dark/20 font-bold italic tracking-tighter text-2xl">Apiário Costa</span>
                    </div>
                )}
            </div>
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] uppercase tracking-widest text-brand-mel font-black">
                        {product.category?.name || 'Geral'}
                    </span>
                    <span className="text-brand-dark font-bold">
                        R$ {Number(product.price).toFixed(2)}
                    </span>
                </div>
                <h3 className="text-xl font-bold italic text-brand-dark mb-3 group-hover:text-brand-wine transition-colors">
                    {product.name}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-6 line-clamp-2">
                    {product.description}
                </p>
                <button className="w-full py-4 border border-brand-wine text-brand-wine text-[10px] uppercase tracking-[0.2em] font-black flex items-center justify-center gap-2 hover:bg-brand-wine hover:text-white transition-all">
                    <ShoppingCart size={14} />
                    Tenho Interesse
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
