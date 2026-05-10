import { AnimatePresence, motion } from "motion/react";
import { ShoppingCart, Menu, X, ShoppingBag, Sun, Moon, User, LogOut, ChevronDown, Shield, MapPin } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../../modules/cart/context/CartContext";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../../modules/auth/context/AuthContext";

export default function Navbar() {
  const [is_open, set_is_open] = useState(false);
  const [is_profile_open, set_is_profile_open] = useState(false);
  const { cart_count, setIsCartOpen } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const menu_items = [
    { name: "Início", href: "/#home" },
    { name: "Sobre", href: "/#sobre" },
    { name: "Produtos", href: "/#produtos" },
    { name: "Diferenciais", href: "/#diferenciais" },
    { name: "Contato", href: "/#contato" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-surface border-b border-border transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-12">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex-shrink-0 flex items-center">
            <img src="/logo.jpg" alt="Apiário Costa Logo" className="h-16 w-auto object-contain" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menu_items.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark hover:text-brand-mel transition-colors"
              >
                {item.name}
              </a>
            ))}
            
            <div className="flex items-center gap-2 border-l border-border pl-6">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-text-primary hover:text-brand-mel transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                {cart_count > 0 && (
                  <span className="absolute top-0 right-0 bg-brand-wine text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {cart_count}
                  </span>
                )}
              </button>

              <button
                onClick={toggleTheme}
                className="p-2 text-text-primary hover:text-brand-mel transition-all"
                title={theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* User Dropdown */}
              <div className="relative">
                {user ? (
                  <>
                    <button 
                      onClick={() => set_is_profile_open(!is_profile_open)}
                      className="w-10 h-10 bg-brand-mel/10 rounded-full flex items-center justify-center text-brand-mel border border-brand-mel/20 hover:bg-brand-mel hover:text-white transition-all ml-2"
                    >
                      <User size={18} />
                    </button>

                    <AnimatePresence>
                      {is_profile_open && (
                        <>
                          <div className="fixed inset-0" onClick={() => set_is_profile_open(false)}></div>
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-3 w-56 bg-surface border border-border rounded-2xl shadow-2xl p-4 overflow-hidden"
                          >
                            <div className="mb-4 pb-4 border-b border-border">
                              <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-1">Logado como</p>
                              <p className="text-sm font-black text-text-primary italic truncate">{user.name}</p>
                            </div>
                            <div className="space-y-2">
                              {user.is_admin && (
                                <Link 
                                  to="/admin" 
                                  onClick={() => set_is_profile_open(false)}
                                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black text-brand-wine bg-brand-wine/5 hover:bg-brand-wine hover:text-white transition-all mb-2"
                                >
                                  <Shield size={16} /> Painel Admin
                                </Link>
                              )}
                              <Link 
                                to="/meus-pedidos" 
                                className="flex items-center gap-3 w-full px-4 py-3 text-xs font-bold text-text-secondary hover:text-brand-mel hover:bg-brand-mel/5 transition-all"
                                onClick={() => set_is_profile_open(false)}
                              >
                                <ShoppingBag size={16} /> Meus Pedidos
                              </Link>
                              <Link 
                                to="/enderecos" 
                                className="flex items-center gap-3 w-full px-4 py-3 text-xs font-bold text-text-secondary hover:text-brand-mel hover:bg-brand-mel/5 transition-all"
                                onClick={() => set_is_profile_open(false)}
                              >
                                <MapPin size={16} /> Meus Endereços
                              </Link>
                              <Link 
                                to="/perfil" 
                                className="flex items-center gap-3 w-full px-4 py-3 text-xs font-bold text-text-secondary hover:text-brand-mel hover:bg-brand-mel/5 transition-all"
                                onClick={() => set_is_profile_open(false)}
                              >
                                <User size={16} /> Configurações
                              </Link>
                              <button 
                                onClick={() => { logout(); set_is_profile_open(false); }}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-brand-wine hover:bg-brand-wine/5 transition-all"
                              >
                                <LogOut size={16} /> Sair da Conta
                              </button>
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="ml-4 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark hover:text-brand-mel transition-colors"
                  >
                    Entrar
                  </Link>
                )}
              </div>

              <Link
                to="/loja"
                className="ml-6 inline-flex items-center px-6 py-2 rounded-full bg-brand-wine text-brand-white text-xs font-bold hover:bg-brand-dark transition-all gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                LOJA
              </Link>
            </div>
          </div>

          {/* Mobile buttons */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-text-primary"
            >
              <ShoppingBag className="w-6 h-6" />
              {cart_count > 0 && (
                <span className="absolute top-0 right-0 bg-brand-wine text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-brand-white">
                  {cart_count}
                </span>
              )}
            </button>
            <button
              onClick={() => set_is_open(!is_open)}
              className="text-text-primary p-2"
            >
              {is_open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {is_open && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-brand-white border-b border-brand-dark/5"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menu_items.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-brand-dark/70 hover:text-brand-wine hover:bg-brand-mel/5 rounded-md"
                onClick={() => set_is_open(false)}
              >
                {item.name}
              </a>
            ))}
            <Link
              to="/loja"
              className="flex items-center px-3 py-3 text-brand-wine font-bold text-base"
              onClick={() => set_is_open(false)}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              LOJA
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
