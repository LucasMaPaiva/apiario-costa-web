import './bootstrap';
import '../css/app.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import AppRouter from './app/router';
import { ThemeProvider } from './common/context/ThemeContext';
import { CartProvider } from './modules/cart/context/CartContext';
import { AuthProvider } from './modules/auth/context/AuthContext';

const rootElement = document.getElementById('app');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <ThemeProvider>
                <CartProvider>
                    <AuthProvider>
                        <AppRouter />
                    </AuthProvider>
                </CartProvider>
            </ThemeProvider>
        </React.StrictMode>
    );
}
