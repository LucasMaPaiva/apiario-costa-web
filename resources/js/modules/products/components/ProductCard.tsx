import { ShoppingCart, ShoppingBag } from 'lucide-react';
import { Product } from '../services/productService';
import { Link } from 'react-router-dom';
import { useCart } from '../../cart/context/CartContext';
import { formatBRL } from '../../../common/utils/formatBRL';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className="bg-surface rounded-2xl shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow group">
            <Link to={`/produto/${product.slug}`} className="block relative">
                <div className="aspect-square bg-bg-main flex items-center justify-center p-8 overflow-hidden">
                    {product.image_url ? (
                        <img
                            src={product.image_url}
                            alt={product.name} 
                            className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110" 
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-brand-mel/5 rounded-xl border border-brand-mel/10 p-8">
                            <ShoppingBag size={48} className="text-brand-mel/20 mb-2" />
                            <span className="text-brand-mel/30 font-black italic tracking-tighter text-sm uppercase">Apiário Costa</span>
                        </div>
                    )}
                </div>
                <div className="absolute inset-0 bg-brand-wine/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-surface text-brand-wine text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        Ver Detalhes
                    </span>
                </div>
            </Link>
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] uppercase tracking-widest text-brand-mel font-black">
                        {product.category?.name || 'Geral'}
                    </span>
                    <span className="text-text-primary font-bold">
                        {formatBRL(product.price)}
                    </span>
                </div>
                <Link to={`/produto/${product.slug}`}>
                    <h3 className="text-xl font-bold italic text-text-primary mb-3 group-hover:text-brand-wine transition-colors">
                        {product.name}
                    </h3>
                </Link>
                <p className="text-text-secondary text-xs leading-relaxed mb-6 line-clamp-2">
                    {product.description}
                </p>
                <button 
                    onClick={() => addToCart(product, 1)}
                    className="w-full py-4 bg-bg-main border border-brand-mel/20 text-text-primary text-[11px] uppercase tracking-[0.25em] font-black rounded-xl flex items-center justify-center gap-3 hover:bg-brand-mel hover:text-white transition-all shadow-sm group/btn"
                >
                    <ShoppingBag size={20} className="transition-transform group-hover/btn:scale-110" />
                    Adicionar ao Carrinho
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
