import { motion } from "motion/react";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col md:flex-row overflow-hidden pt-20 transition-colors duration-500">
      {/* Left Content Column */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center relative bg-bg-main">
        <div className="absolute left-6 md:left-12 top-24 artistic-line"></div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <span className="text-sm uppercase tracking-[0.3em] text-brand-wine font-semibold mb-6 block">
            Artesanal & Puro
          </span>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-8 italic text-text-primary">
            Mel artesanal com qualidade, cuidado e sabor de origem.
          </h1>
          <p className="text-text-secondary text-lg mb-12 max-w-md font-medium">
            Oferecemos mel com identidade autoral, cuidado rigoroso na produção e uma apresentação sofisticada para os paladares mais exigentes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/loja"
              className="btn-artistic inline-flex items-center justify-center px-10 py-4 bg-brand-mel text-white text-sm hover:scale-105 transition-all shadow-lg shadow-brand-mel/20"
            >
              Nossa Loja
            </a>
            <a
              href="#produtos"
              className="btn-artistic inline-flex items-center justify-center px-10 py-4 border border-brand-wine text-brand-wine text-sm hover:bg-brand-wine hover:text-white transition-all"
            >
              Conhecer Produtos
            </a>
          </div>
        </motion.div>
      </div>

      {/* Right Visual Column */}
      <div className="w-full md:w-1/2 relative bg-surface min-h-[400px] md:min-h-screen flex items-center justify-center p-8 md:p-12 lg:p-24 transition-colors duration-500">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="w-full aspect-square rounded-2xl shadow-2xl overflow-hidden relative"
        >
          <img
            src="/honey-1.jpg"
            alt="Mel puro Apiário Costa"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark/40 via-transparent to-transparent"></div>
        </motion.div>

        {/* Decorative Badge */}
        <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 w-32 md:w-40 h-32 md:h-40 bg-surface p-4 rounded-xl shadow-xl border border-border flex flex-col items-center justify-center text-center z-20 transition-colors duration-500">
          <div className="text-brand-mel mb-2">
            <ArrowRight className="w-8 h-8 -rotate-45" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-tighter text-text-primary">100% Orgânico</span>
          <span className="text-[9px] text-text-secondary">Certificado de Origem</span>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-80 h-80 opacity-5 honeycomb-pattern pointer-events-none -mr-40 -mt-20"></div>
    </section>
  );
}
