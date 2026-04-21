import { motion } from "motion/react";

export default function VisualShowcase() {
  const images = [
    {
      url: "/honey-1.jpg",
      title: "Identidade"
    },
    {
      url: "/honey-2.jpg",
      title: "Origem"
    },
    {
      url: "/honey-3.jpg",
      title: "Textura"
    },
    {
      url: "/honey-4.jpg",
      title: "Pureza"
    }
  ];

  return (
    <section className="py-24 bg-brand-bg border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-wine uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Essência em Detalhes</span>
            <h2 className="text-4xl md:text-5xl font-bold italic mb-4">Expressão Visual</h2>
            <p className="text-brand-dark/50 font-medium">
              Valorizamos a apresentação tanto quanto o sabor. Nossa identidade reflete o cuidado da produção artesanal.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-auto md:h-[600px]">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-[4px] group ${
                index % 2 === 0 ? "md:mt-12 md:mb-0" : "md:mb-12 md:mt-0"
              }`}
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-wine/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-brand-white italic text-3xl font-bold">{img.title}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
