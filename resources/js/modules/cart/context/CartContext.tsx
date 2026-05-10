import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../../products/services/productService';

interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product, quantity: number) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    cart_total: number;
    cart_count: number;
    is_cart_open: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [is_cart_open, setIsCartOpen] = useState(false);

    // Carregar do LocalStorage
    useEffect(() => {
        const saved_cart = localStorage.getItem('apiario_cart');
        if (saved_cart) {
            try {
                setCart(JSON.parse(saved_cart));
            } catch (e) {
                console.error('Failed to parse cart from storage');
            }
        }
    }, []);

    // Salvar no LocalStorage
    useEffect(() => {
        localStorage.setItem('apiario_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: Product, quantity: number) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item => 
                    item.id === product.id 
                        ? { ...item, quantity: item.quantity + quantity } 
                        : item
                );
            }
            return [...prevCart, { ...product, quantity }];
        });
        setIsCartOpen(true); // Abre o carrinho ao adicionar item
    };

    const removeFromCart = (productId: number) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCart(prevCart => 
            prevCart.map(item => 
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const cart_total = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cart_count = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{ 
            cart, 
            addToCart, 
            removeFromCart, 
            updateQuantity, 
            clearCart, 
            cart_total, 
            cart_count,
            is_cart_open,
            setIsCartOpen
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
