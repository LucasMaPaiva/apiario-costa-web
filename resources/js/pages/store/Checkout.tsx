import React, { useState } from 'react';
import { useCart } from '../../modules/cart/context/CartContext';
import { createOrder, OrderData } from '../../modules/orders/services/orderService';
import { ShoppingBag, ArrowLeft, CheckCircle2, Loader2, MapPin, Truck, CreditCard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Checkout() {
    const { cart, cart_total, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [calculating_shipping, set_calculating_shipping] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [shipping_options, set_shipping_options] = useState<any[]>([]);
    const [selected_shipping, set_selected_shipping] = useState<any>(null);

    const [address, setAddress] = useState({
        cep: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: ''
    });

    const handleCalculateShipping = async (cep: string) => {
        if (cep.replace(/\D/g, '').length < 8) return;
        
        set_calculating_shipping(true);
        setError('');
        try {
            const items = cart.map(item => ({ id: item.id, quantity: item.quantity }));
            const options = await import('../../modules/orders/services/orderService').then(m => m.calculateShipping(cep, items));
            set_shipping_options(options);
            if (options.length > 0) {
                set_selected_shipping(options[0]); // Seleciona o primeiro por padrão
            }
        } catch (err: any) {
            setError('Não foi possível calcular o frete para este CEP.');
            set_shipping_options([]);
        } finally {
            set_calculating_shipping(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAddress({ ...address, [name]: value });
        
        if (name === 'cep' && value.replace(/\D/g, '').length === 8) {
            handleCalculateShipping(value);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (cart.length === 0) return;
        if (!selected_shipping) {
            setError('Por favor, selecione uma modalidade de frete.');
            return;
        }
        
        setLoading(true);
        setError('');

        const order_data: OrderData = {
            items: cart.map(item => ({
                product_id: item.id,
                quantity: item.quantity
            })),
            ...address,
            shipping_method: selected_shipping.name,
            shipping_cost: selected_shipping.price
        };

        try {
            await createOrder(order_data);
            setSuccess(true);
            clearCart();
            setTimeout(() => navigate('/loja'), 5000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erro ao processar pedido. Verifique se você está logado.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-bg-main flex items-center justify-center p-6">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-white p-12 rounded-3xl shadow-2xl text-center border border-green-50"
                >
                    <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 size={48} />
                    </div>
                    <h2 className="text-3xl font-black italic text-brand-dark mb-4 tracking-tighter">Pedido Realizado!</h2>
                    <p className="text-gray-500 mb-8 italic leading-relaxed">
                        Recebemos seu pedido. Agora nossa equipe vai preparar seus produtos com todo carinho direto da colmeia.
                    </p>
                    <Link 
                        to="/loja" 
                        className="inline-block py-4 px-8 bg-brand-mel text-brand-white text-[10px] uppercase tracking-widest font-black rounded-xl hover:bg-brand-wine transition-all"
                    >
                        Voltar para a Loja
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bg-main pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-4xl font-black italic text-brand-dark tracking-tighter">Finalizar Compra</h1>
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-2">Apiário Costa • Etapa Final</p>
                    </div>
                    <Link to="/loja" className="text-gray-400 hover:text-brand-wine transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Formulário */}
                    <div className="lg:col-span-7">
                        <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
                            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 bg-bg-main rounded-xl flex items-center justify-center text-brand-mel">
                                        <MapPin size={20} />
                                    </div>
                                    <h2 className="text-xl font-black italic text-brand-dark tracking-tight">Endereço de Entrega</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-1">
                                        <label className="block text-[10px] uppercase font-bold text-brand-wine tracking-widest mb-2">CEP</label>
                                        <input
                                            name="cep"
                                            required
                                            value={address.cep}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-bg-main border border-gray-100 rounded-xl focus:outline-none focus:border-brand-mel transition-colors text-sm"
                                            placeholder="00000-000"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-[10px] uppercase font-bold text-brand-wine tracking-widest mb-2">Rua / Logradouro</label>
                                        <input
                                            name="street"
                                            required
                                            value={address.street}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-bg-main border border-gray-100 rounded-xl focus:outline-none focus:border-brand-mel transition-colors text-sm"
                                            placeholder="Ex: Av. das Abelhas"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase font-bold text-brand-wine tracking-widest mb-2">Número</label>
                                        <input
                                            name="number"
                                            required
                                            value={address.number}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-bg-main border border-gray-100 rounded-xl focus:outline-none focus:border-brand-mel transition-colors text-sm"
                                            placeholder="123"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase font-bold text-brand-wine tracking-widest mb-2">Complemento</label>
                                        <input
                                            name="complement"
                                            value={address.complement}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-bg-main border border-gray-100 rounded-xl focus:outline-none focus:border-brand-mel transition-colors text-sm"
                                            placeholder="Apto, Bloco..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase font-bold text-brand-wine tracking-widest mb-2">Bairro</label>
                                        <input
                                            name="neighborhood"
                                            required
                                            value={address.neighborhood}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-bg-main border border-gray-100 rounded-xl focus:outline-none focus:border-brand-mel transition-colors text-sm"
                                            placeholder="Nome do bairro"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] uppercase font-bold text-brand-wine tracking-widest mb-2">Cidade</label>
                                            <input
                                                name="city"
                                                required
                                                value={address.city}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-bg-main border border-gray-100 rounded-xl focus:outline-none focus:border-brand-mel transition-colors text-sm"
                                                placeholder="Cidade"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase font-bold text-brand-wine tracking-widest mb-2">UF</label>
                                            <input
                                                name="state"
                                                required
                                                maxLength={2}
                                                value={address.state}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-bg-main border border-gray-100 rounded-xl focus:outline-none focus:border-brand-mel transition-colors text-sm"
                                                placeholder="SP"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 bg-bg-main rounded-xl flex items-center justify-center text-brand-mel">
                                        <Truck size={20} />
                                    </div>
                                    <h2 className="text-xl font-black italic text-brand-dark tracking-tight">Opções de Entrega</h2>
                                </div>

                                {calculating_shipping ? (
                                    <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                                        <Loader2 size={32} className="animate-spin mb-4" />
                                        <p className="text-xs font-bold uppercase tracking-widest">Calculando frete...</p>
                                    </div>
                                ) : shipping_options.length > 0 ? (
                                    <div className="space-y-4">
                                        {shipping_options.map((option) => (
                                            <div 
                                                key={option.id}
                                                onClick={() => set_selected_shipping(option)}
                                                className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                                                    selected_shipping?.id === option.id 
                                                        ? 'border-brand-mel bg-brand-mel/5' 
                                                        : 'border-gray-50 hover:border-gray-200'
                                                }`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <img src={option.company_logo} alt={option.company} className="w-10 h-10 object-contain bg-white rounded-lg p-1 border border-gray-100" />
                                                    <div>
                                                        <p className="text-sm font-black text-brand-dark">{option.name}</p>
                                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{option.delivery_time} dias úteis • {option.company}</p>
                                                    </div>
                                                </div>
                                                <span className="text-sm font-black text-brand-wine">R$ {option.price.toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-8 text-center bg-bg-main rounded-2xl border border-dashed border-gray-200">
                                        <p className="text-xs text-gray-400 italic">Insira um CEP válido para ver as opções de entrega.</p>
                                    </div>
                                )}
                            </section>

                            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 opacity-60 pointer-events-none">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-bg-main rounded-xl flex items-center justify-center text-gray-400">
                                        <CreditCard size={20} />
                                    </div>
                                    <h2 className="text-xl font-black italic text-brand-dark tracking-tight">Pagamento</h2>
                                </div>
                                <p className="text-xs italic text-gray-400">Integração de pagamento pendente. O pedido será processado como pagamento na entrega ou manual.</p>
                            </section>
                        </form>
                    </div>

                    {/* Resumo */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-32 space-y-6">
                            <div className="bg-brand-dark p-8 rounded-3xl text-brand-white shadow-2xl">
                                <div className="flex items-center gap-3 mb-8">
                                    <ShoppingBag size={20} className="text-brand-mel" />
                                    <h2 className="text-xl font-black italic tracking-tighter">Resumo do Pedido</h2>
                                </div>

                                <div className="space-y-4 mb-8 max-h-60 overflow-y-auto pr-2 scrollbar-hide">
                                    {cart.map(item => (
                                        <div key={item.id} className="flex justify-between items-center text-sm">
                                            <span className="opacity-70">{item.quantity}x {item.name}</span>
                                            <span className="font-bold tracking-tighter">R$ {(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-brand-white/10 pt-6 space-y-3">
                                    <div className="flex justify-between text-xs opacity-60 uppercase tracking-widest font-bold">
                                        <span>Subtotal</span>
                                        <span>R$ {cart_total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-xs opacity-60 uppercase tracking-widest font-bold">
                                        <span>Frete</span>
                                        <span>{selected_shipping ? `R$ ${selected_shipping.price.toFixed(2)}` : 'A calcular'}</span>
                                    </div>
                                    <div className="flex justify-between items-end pt-4">
                                        <span className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-mel">Total</span>
                                        <span className="text-4xl font-black italic tracking-tighter text-brand-mel">
                                            R$ {(cart_total + (selected_shipping?.price || 0)).toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                {error && (
                                    <p className="mt-6 text-[10px] text-red-400 font-bold text-center italic uppercase tracking-wider bg-red-400/10 p-3 rounded-xl border border-red-400/20">
                                        {error}
                                    </p>
                                )}

                                <button 
                                    form="checkout-form"
                                    type="submit"
                                    disabled={loading || cart.length === 0}
                                    className="w-full mt-8 py-5 bg-brand-mel text-brand-white text-[10px] uppercase tracking-[0.3em] font-black rounded-2xl hover:bg-brand-wine hover:scale-[1.02] transition-all disabled:opacity-50 shadow-xl shadow-black/20"
                                >
                                    {loading ? 'PROCESSANDO...' : 'CONFIRMAR PEDIDO'}
                                </button>
                            </div>

                            <div className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-50 text-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Truck size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-black text-brand-dark uppercase tracking-tight">Entrega Segura</p>
                                    <p className="text-[10px] text-gray-400 italic">Produtos colhidos e embalados com rigor técnico.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
