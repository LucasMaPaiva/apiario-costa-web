import { motion } from "motion/react";
import { ShoppingCart, ExternalLink, Loader2, ImageOff } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, Product } from "../../products/services/productService";
import { formatBRL } from "../../../common/utils/formatBRL";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        const latest = [...data].sort((a, b) => b.id - a.id).slice(0, 4);
        setProducts(latest);
      })
      .catch((err) => console.error("Failed to load products:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="produtos" className="py-24 bg-bg-main border-t border-border relative transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-wine uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Nossa Seleção</span>
            <h2 className="text-4xl md:text-5xl font-bold italic mb-4 text-text-primary">Produtos de Origem</h2>
            <p className="text-text-secondary font-medium">
              Escolha entre nossas variedades de mel e derivados, produzidos com a essência dourada da natureza.
            </p>
          </motion.div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-brand-mel" size={32} />
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-text-secondary py-12">Nenhum produto disponível no momento.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-surface rounded-2xl overflow-hidden border border-border hover:shadow-2xl hover:border-brand-mel/30 transition-all group flex flex-col h-full"
              >
                <div className="relative h-64 overflow-hidden bg-bg-main flex items-center justify-center">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-300">
                      <ImageOff size={32} />
                      <span className="text-[10px] uppercase tracking-widest font-bold">Sem imagem</span>
                    </div>
                  )}
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <span className="text-[10px] font-bold text-brand-mel uppercase tracking-[0.2em] mb-3">
                    {product.category?.name ?? "Produto"}
                  </span>
                  <h3 className="text-2xl font-bold italic text-text-primary mb-4 leading-tight group-hover:text-brand-wine transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-text-secondary mb-4 flex-grow leading-relaxed font-medium line-clamp-3">
                    {product.description}
                  </p>
                  <p className="text-lg font-bold text-brand-wine mb-6">
                    {formatBRL(product.price)}
                  </p>
                  <Link
                    to={`/produto/${product.slug}`}
                    className="btn-artistic inline-flex items-center justify-center w-full py-4 text-brand-wine border border-brand-wine text-[10px] sm:text-xs hover:bg-brand-wine hover:text-white transition-all"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Ver na Loja
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <Link
            to="/loja"
            className="inline-flex items-center text-brand-wine font-bold hover:text-brand-mel transition-colors uppercase tracking-widest text-xs"
          >
            Confira nosso catálogo completo
            <ExternalLink className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
