import { motion } from "motion/react";
import { MessageCircle, ArrowRight } from "lucide-react";

export default function ContactCTA() {
  const whatsappUrl = "https://wa.me/559595991610579";

  return (
    <section id="contato" className="py-24 bg-brand-wine relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 honeycomb-pattern"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-12 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold italic text-brand-white mb-8 leading-tight">
            Pronto para sentir o sabor verdadeiro do mel artesanal?
          </h2>
          <p className="text-brand-white/80 text-xl mb-12 font-medium max-w-2xl mx-auto">
            Faça seu pedido diretamente pelo WhatsApp e receba em casa um produto premium com toda a dedicação da Apiário Costa.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-artistic inline-flex items-center justify-center px-12 py-5 bg-brand-mel text-brand-white text-lg hover:scale-105 shadow-2xl"
            >
              <MessageCircle className="w-6 h-6 mr-3" />
              Pedir agora via WhatsApp
            </a>
          </div>
          
          <p className="mt-8 text-brand-white/50 text-[10px] uppercase tracking-widest font-bold">
            Entregamos para toda a região • Consulte frete e disponibilidade
          </p>
        </motion.div>
      </div>
    </section>
  );
}
