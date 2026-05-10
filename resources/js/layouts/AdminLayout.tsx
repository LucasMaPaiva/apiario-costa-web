import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { LogOut, Package, ListTree, ShoppingBag, Sun, Moon, Truck } from 'lucide-react';
import { logoutService } from '../modules/auth/services/authService';
import { useTheme } from '../common/context/ThemeContext';

export default function AdminLayout() {
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
    const token = localStorage.getItem('auth_token');
    const [is_logging_out, set_is_logging_out] = useState(false);

    if (!token) {
        return <Navigate to="/laravel-admin" replace />;
    }

    const handleLogout = async () => {
        try {
            set_is_logging_out(true);
            await logoutService();
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            localStorage.removeItem('auth_token');
            window.location.href = '/laravel-admin';
        }
    };

    const isActive = (path: string) => location.pathname === path || (path !== '/admin' && location.pathname.startsWith(path));

    return (
        <div className="h-screen bg-bg-main p-4 flex gap-4 transition-colors duration-500 overflow-hidden">
            {/* Sidebar Card */}
            <aside className="w-72 bg-sidebar-bg rounded-[2rem] flex flex-col shadow-2xl border border-sidebar-border overflow-hidden transition-all duration-300">
                <div className="p-8 text-center border-b border-sidebar-border bg-white/[0.02]">
                    <div className="relative inline-block mb-4">
                        <div className="absolute -inset-2 bg-brand-mel/20 blur-xl rounded-full animate-pulse" />
                        <img src="/logo.jpg" alt="Logo" className="h-16 w-16 mx-auto rounded-2xl relative z-10 brightness-110" />
                    </div>
                    <h2 className="text-sm font-black uppercase tracking-[0.3em] text-text-primary">Apiário Costa</h2>
                    <p className="text-[10px] text-brand-mel mt-1 uppercase font-black tracking-widest">Premium Honey</p>
                </div>

                <nav className="flex-1 p-6 space-y-3 overflow-y-auto custom-scrollbar">
                    <Link
                        to="/admin"
                        className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 group ${
                            isActive('/admin') || location.pathname.startsWith('/admin/produtos')
                                ? 'bg-brand-mel text-white shadow-xl shadow-brand-mel/20 translate-x-1'
                                : 'text-sidebar-text hover:bg-brand-mel/10 hover:text-brand-mel'
                        }`}
                    >
                        <Package size={20} className={isActive('/admin') ? 'animate-bounce' : 'group-hover:scale-110 transition-transform'} />
                        Produtos
                    </Link>

                    <Link
                        to="/admin/categorias"
                        className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 group ${
                            isActive('/admin/categorias')
                                ? 'bg-brand-mel text-white shadow-xl shadow-brand-mel/20 translate-x-1'
                                : 'text-sidebar-text hover:bg-brand-mel/10 hover:text-brand-mel'
                        }`}
                    >
                        <ListTree size={20} className={isActive('/admin/categorias') ? 'animate-bounce' : 'group-hover:scale-110 transition-transform'} />
                        Categorias
                    </Link>
                    <Link
                        to="/admin/logistica"
                        className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 group ${
                            isActive('/admin/logistica')
                                ? 'bg-brand-mel text-white shadow-xl shadow-brand-mel/20 translate-x-1'
                                : 'text-sidebar-text hover:bg-brand-mel/10 hover:text-brand-mel'
                        }`}
                    >
                        <Truck size={20} className={isActive('/admin/logistica') ? 'animate-bounce' : 'group-hover:scale-110 transition-transform'} />
                        Logística
                    </Link>
                    <div className="pt-6 pb-2 px-5">
                        <span className="text-[10px] font-black text-text-secondary uppercase tracking-[0.25em] opacity-50">Gestão de Vendas</span>
                    </div>

                    <Link
                        to="/admin/pedidos"
                        className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 group ${
                            isActive('/admin/pedidos')
                                ? 'bg-brand-mel text-white shadow-xl shadow-brand-mel/20 translate-x-1'
                                : 'text-sidebar-text hover:bg-brand-mel/10 hover:text-brand-mel'
                        }`}
                    >
                        <ShoppingBag size={20} className={isActive('/admin/pedidos') ? 'animate-bounce' : 'group-hover:scale-110 transition-transform'} />
                        Pedidos
                    </Link>
                </nav>

                <div className="p-6 space-y-3 bg-white/[0.02] border-t border-sidebar-border">
                    <button
                        onClick={toggleTheme}
                        className="w-full flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-bold text-sidebar-text hover:bg-brand-mel/10 hover:text-brand-mel transition-all duration-300 group"
                    >
                        <div className="flex items-center gap-4">
                            {theme === 'light' ? <Moon size={18} className="group-hover:rotate-12 transition-transform" /> : <Sun size={18} className="group-hover:rotate-90 transition-transform duration-500" />}
                            <span>{theme === 'light' ? 'Modo Noturno' : 'Modo Claro'}</span>
                        </div>
                        <div className={`w-10 h-5 rounded-full relative transition-all duration-500 ${theme === 'dark' ? 'bg-brand-mel' : 'bg-slate-200'}`}>
                            <div className={`absolute top-1 w-3 h-3 rounded-full bg-white shadow-sm transition-all duration-500 ${theme === 'dark' ? 'left-6' : 'left-1'}`} />
                        </div>
                    </button>

                    <button
                        onClick={handleLogout}
                        disabled={is_logging_out}
                        className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold text-red-500/60 hover:bg-red-500/10 hover:text-red-500 transition-all duration-300"
                    >
                        <LogOut size={20} />
                        {is_logging_out ? 'Saindo...' : 'Sair'}
                    </button>
                </div>
            </aside>

            {/* Main Content Card */}
            <main className="flex-1 bg-surface rounded-[2rem] shadow-2xl border border-border overflow-hidden flex flex-col transition-colors duration-500">
                <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
                    <div className="max-w-6xl mx-auto animate-in fade-in zoom-in-95 duration-700">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
}
