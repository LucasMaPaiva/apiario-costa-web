import { motion } from "motion/react";
import { Package, Truck, Sparkles, MessageSquare, BadgeCheck } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Produto Artesanal",
      desc: "Produção em pequena escala com máximo aproveitamento nutritivo."
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: "Embalagem Cuidadosa",
      desc: "Design premium que protege e valoriza o produto para presente."
    },
    {
      icon: <BadgeCheck className="w-6 h-6" />,
      title: "Extrema Pureza",
      desc: "Livre de misturas, mel testado e aprovado por especialistas."
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Atendimento Humano",
      desc: "Contato direto com quem produz, tirando todas as suas dúvidas."
    }
  ];

  return (
    <section id="diferenciais" className="py-24 bg-brand-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              <img
                src="/honey-5.jpg"
                alt="Mel puro e artesanal Apiário Costa"
                className="rounded-2xl shadow-2xl relative z-10"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-0 right-0 w-60 h-60 opacity-5 honeycomb-pattern pointer-events-none -mr-32 -mt-10"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <span className="text-brand-wine uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Diferenciais Costa</span>
            <h2 className="text-4xl md:text-5xl font-bold italic mb-10 leading-tight">
              O que nos torna uma escolha especial para você.
            </h2>
            
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-12">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-start bg-brand-bg p-6 rounded-[4px] border border-gray-100 shadow-sm hover:shadow-md transition-all">
                  <div className="mb-4 text-brand-wine">
                    {feature.icon}
                  </div>
                  <h3 className="text-[10px] uppercase font-bold text-brand-wine tracking-widest mb-2">{feature.title}</h3>
                  <p className="text-xs text-gray-500 italic leading-relaxed font-medium">{feature.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
