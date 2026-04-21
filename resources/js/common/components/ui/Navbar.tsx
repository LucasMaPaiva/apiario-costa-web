import { motion } from "motion/react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Início", href: "/#home" },
    { name: "Sobre", href: "/#sobre" },
    { name: "Produtos", href: "/#produtos" },
    { name: "Diferenciais", href: "/#diferenciais" },
    { name: "Contato", href: "/#contato" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-brand-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-12">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex-shrink-0 flex items-center">
            <img src="/logo.jpg" alt="Apiário Costa Logo" className="h-16 w-auto object-contain" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-brand-dark hover:text-brand-mel transition-colors"
              >
                {item.name}
              </a>
            ))}
            <Link
              to="/loja"
              className="inline-flex items-center px-6 py-2 rounded-full bg-brand-wine text-brand-white text-xs font-bold hover:bg-brand-dark transition-all gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              LOJA
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-dark p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-brand-white border-b border-brand-dark/5"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-brand-dark/70 hover:text-brand-wine hover:bg-brand-mel/5 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <Link
              to="/loja"
              className="flex items-center px-3 py-3 text-brand-wine font-bold text-base"
              onClick={() => setIsOpen(false)}
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
