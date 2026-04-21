import { motion } from "motion/react";
import { ShoppingCart, ExternalLink } from "lucide-react";

export default function Products() {
  const products = [
    {
      name: "Mel Silvestre Premium",
      desc: "Colheita artesanal com notas florais suaves e textura cristalina.",
      price: "Pote 500g",
      image: "/honey-2.jpg"
    },
    {
      name: "Favo de Mel Nativo",
      desc: "Experiência completa da colmeia para sua mesa, 100% in natura.",
      price: "Unidade 300g",
      image: "/honey-3.jpg"
    },
    {
      name: "Mel de Eucalipto",
      desc: "Sabor intenso e propriedades revigorantes, ideal para o dia a dia.",
      price: "Pote 1kg",
      image: "/honey-4.jpg"
    },
    {
      name: "Própolis Verde",
      desc: "Extrato puro para reforçar sua imunidade com força da natureza.",
      price: "Frasco 30ml",
      image: "/honey-5.jpg"
    }
  ];

  const whatsappUrl = "https://wa.me/559595991610579";

  return (
    <section id="produtos" className="py-24 bg-brand-bg border-t border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-wine uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Nossa Seleção</span>
            <h2 className="text-4xl md:text-5xl font-bold italic mb-4">Produtos de Origem</h2>
            <p className="text-brand-dark/50 font-medium">
              Escolha entre nossas variedades de mel e derivados, produzidos com a essência dourada da natureza.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-brand-white rounded-[4px] overflow-hidden border border-brand-gold/20 hover:shadow-xl transition-all group flex flex-col h-full"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <span className="text-[10px] font-bold text-brand-mel uppercase tracking-[0.2em] mb-3">{product.price}</span>
                <h3 className="text-2xl font-bold italic text-brand-dark mb-4 leading-tight">{product.name}</h3>
                <p className="text-xs text-brand-dark/60 mb-8 flex-grow leading-relaxed font-medium">{product.desc}</p>
                <a
                  href={`${whatsappUrl}?text=Olá! Tenho interesse no ${product.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-artistic inline-flex items-center justify-center w-full py-4 text-brand-wine border border-brand-wine text-[10px] sm:text-xs hover:bg-brand-wine hover:text-brand-white"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Tenho Interesse
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-brand-wine font-bold hover:text-brand-mel transition-colors"
          >
            Ver catálogo completo no WhatsApp
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
}
