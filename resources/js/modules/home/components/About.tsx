import { motion } from "motion/react";
import { Leaf, Award, Heart, ShieldCheck } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "Qualidade",
      desc: "Processos rigorosos para garantir o melhor produto final."
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Conexão",
      desc: "Respeito profundo ao ecossistema e às abelhas."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Delicadeza",
      desc: "Cuidado em cada detalhe, da colmeia à sua mesa."
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Autenticidade",
      desc: "Mel 100% puro e natural, sem aditivos ou conservantes."
    }
  ];

  return (
    <section id="sobre" className="py-24 bg-surface relative overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-brand-wine uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Nossa História</span>
            <h2 className="text-4xl md:text-5xl font-bold italic mb-8 leading-tight text-text-primary">
              Uma marca que une tradição, cuidado e identidade única.
            </h2>
            <div className="space-y-6 text-text-secondary text-lg leading-relaxed font-medium">
              <p>
                A Apiário Costa nasceu do desejo de levar o verdadeiro sabor do mel puro e natural para as famílias, mantendo viva a essência da natureza em cada colheita.
              </p>
              <p>
                Acreditamos que o mel não é apenas um alimento, mas um presente da terra que merece ser tratado com o máximo respeito e sofisticação.
              </p>
            </div>
            
            <div className="mt-12 flex flex-col sm:flex-row space-y-8 sm:space-y-0 sm:space-x-12">
              <div>
                <span className="block text-4xl sm:text-5xl font-serif text-brand-mel font-bold mb-1 italic text-glow">100%</span>
                <span className="text-[10px] uppercase tracking-widest text-text-secondary font-bold">Natural & Puro</span>
              </div>
              <div>
                <span className="block text-4xl sm:text-5xl font-serif text-brand-mel font-bold mb-1 italic text-glow">+Qualidade</span>
                <span className="text-[10px] uppercase tracking-widest text-text-secondary font-bold">Especialidade</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-bg-main border border-border p-8 rounded-2xl shadow-sm hover:shadow-xl hover:border-brand-mel/30 transition-all group"
              >
                <div className="w-12 h-12 border border-brand-wine text-brand-wine flex items-center justify-center rounded-full mb-6 group-hover:bg-brand-wine group-hover:text-white transition-colors">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 uppercase tracking-wide text-text-primary">{value.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed font-medium">{value.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
