import { Instagram, MessageCircle, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = "https://wa.me/559595991610579";
  const instagramUrl = "https://www.instagram.com/costamelrr";

  return (
    <footer className="bg-brand-white border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-12">
        <div className="grid md:grid-cols-4 gap-12 pb-12">
          <div className="flex flex-col space-y-4">
            <h4 className="text-[10px] uppercase font-bold text-brand-wine tracking-[0.2em]">Diferenciais</h4>
            <p className="text-xs text-gray-500 italic max-w-xs leading-relaxed">
              Extração a frio preservando todos os nutrientes e o sabor real do mel.
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            <h4 className="text-[10px] uppercase font-bold text-brand-wine tracking-[0.2em]">Sustentabilidade</h4>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
              Cuidado regenerativo com as abelhas e polinização consciente para um futuro melhor.
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            <h4 className="text-[10px] uppercase font-bold text-brand-wine tracking-[0.2em]">Produtos</h4>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-brand-mel"></span>
                <span className="text-xs text-gray-500">Florada Silvestre</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
                <span className="text-xs text-gray-500">Mel em Favo</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:items-end space-y-1">
            <p className="text-xs font-semibold text-brand-dark">@costamelrr</p>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-loose">Boa Vista, Roraima</p>
            <div className="flex items-center space-x-4 mt-2">
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-brand-dark/40 hover:text-brand-mel transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-brand-dark/40 hover:text-brand-mel transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 uppercase tracking-widest font-medium">
          <p>© {currentYear} Apiário Costa - Todos os direitos reservados.</p>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <span className="text-brand-mel font-bold uppercase tracking-normal normal-case">Artesanal / Puro / Real</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
