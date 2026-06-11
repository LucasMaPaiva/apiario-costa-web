import React, { useState, useEffect } from 'react';
import httpClient from '../../common/services/httpClient';
import { useCart } from '../../modules/cart/context/CartContext';
import { createOrder, createPaymentPreference, OrderData } from '../../modules/orders/services/orderService';
import { ShoppingBag, ArrowLeft, CheckCircle2, Loader2, MapPin, Truck, CreditCard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { formatBRL } from '../../common/utils/formatBRL';

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

    const [saved_addresses, set_saved_addresses] = useState<any[]>([]);
    const [use_saved_address, set_use_saved_address] = useState(false);

    const loadSavedAddresses = async () => {
        try {
            const response = await httpClient.get('/api/addresses');
            const data = response.data.data;
            set_saved_addresses(data);
            if (data.length > 0) {
                const main = data.find((a: any) => a.is_main) || data[0];
                handleSelectSavedAddress(main);
                set_use_saved_address(true);
            }
        } catch (error) {
            console.error('Failed to load saved addresses');
        }
    };

    const handleSelectSavedAddress = (addr: any) => {
        setAddress({
            cep: addr.cep,
            street: addr.street,
            number: addr.number,
            complement: addr.complement || '',
            neighborhood: addr.neighborhood,
            city: addr.city,
            state: addr.state
        });
        handleCalculateShipping(addr.cep);
    };

    useEffect(() => {
        loadSavedAddresses();
    }, []);

    const handleCalculateShipping = async (cep: string) => {
        if (cep.replace(/\D/g, '').length < 8) return;
        
        set_calculating_shipping(true);
        setError('');
        try {
            const items = cart.map(item => ({ id: item.id, quantity: item.quantity }));
            const options = await import('../../modules/orders/services/orderService').then(m => m.calculateShipping(cep, items));
            set_shipping_options(options);
            if (options.length > 0) {
                set_selected_shipping(options[0]);
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
    };

    const handleCepChange = async (cep: string) => {
        const value = cep.replace(/\D/g, '');
        setAddress(prev => ({ ...prev, cep: value }));
        
        if (value.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${value}/json/`);
                const data = await response.json();
                if (!data.erro) {
                    setAddress(prev => ({
                        ...prev,
                        street: data.logradouro,
                        neighborhood: data.bairro,
                        city: data.localidade,
                        state: data.uf
                    }));
                    handleCalculateShipping(value);
                }
            } catch (error) {
                console.error('Failed to fetch CEP:', error);
            }
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
            const order = await createOrder(order_data);
            const { checkout_url } = await createPaymentPreference(order.id);
            clearCart();
            window.location.href = checkout_url;
        } catch (err: any) {
            const msg = err.response?.data?.message || 'Erro ao processar pedido. Tente novamente.';
            setError(msg);
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-bg-main flex items-center justify-center p-6">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-surface p-12 rounded-3xl shadow-2xl text-center border border-border"
                >
                    <div className="w-20 h-20 bg-brand-mel/10 text-brand-mel rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 size={48} />
                    </div>
                    <h2 className="text-3xl font-black italic text-text-primary mb-4 tracking-tighter">Pedido Realizado!</h2>
                    <p className="text-text-secondary mb-8 italic leading-relaxed">
                        Recebemos seu pedido. Agora nossa equipe vai preparar seus produtos com todo carinho direto da colmeia.
                    </p>
                    <Link 
                        to="/loja" 
                        className="inline-block py-4 px-8 bg-brand-mel text-brand-white text-[10px] uppercase tracking-widest font-black rounded-xl hover:bg-brand-gold transition-all"
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
                        <h1 className="text-4xl font-black italic text-text-primary tracking-tighter">Finalizar Compra</h1>
                        <p className="text-[10px] uppercase tracking-widest text-text-secondary font-bold mt-2">Apiário Costa • Etapa Final</p>
                    </div>
                    <Link to="/loja" className="text-text-secondary hover:text-brand-mel transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Formulário */}
                    <div className="lg:col-span-7">
                        <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
                            <section className="bg-surface p-8 rounded-3xl shadow-sm border border-border">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 bg-bg-main rounded-xl flex items-center justify-center text-brand-mel">
                                        <MapPin size={20} />
                                    </div>
                                    <h2 className="text-xl font-black italic text-text-primary tracking-tight">Endereço de Entrega</h2>
                                </div>

                                {saved_addresses.length > 0 && (
                                    <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {saved_addresses.map((addr) => (
                                            <div 
                                                key={addr.id}
                                                onClick={() => {
                                                    handleSelectSavedAddress(addr);
                                                    set_use_saved_address(true);
                                                }}
                                                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                                                    use_saved_address && address.cep === addr.cep && address.number === addr.number
                                                        ? 'border-brand-mel bg-brand-mel/5' 
                                                        : 'border-border hover:border-brand-mel/30'
                                                }`}
                                            >
                                                <div className="flex items-center gap-2 mb-2">
                                                    <MapPin size={14} className={use_saved_address && address.cep === addr.cep ? 'text-brand-mel' : 'text-text-secondary'} />
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-text-primary">{addr.label || 'Endereço'}</span>
                                                </div>
                                                <p className="text-[10px] text-text-secondary italic leading-tight">
                                                    {addr.street}, {addr.number}<br/>
                                                    {addr.city} - {addr.state}
                                                </p>
                                            </div>
                                        ))}
                                        <div 
                                            onClick={() => set_use_saved_address(false)}
                                            className={`p-4 rounded-2xl border-2 border-dashed transition-all cursor-pointer flex items-center justify-center ${
                                                !use_saved_address ? 'border-brand-mel bg-brand-mel/5 text-brand-mel' : 'border-border text-text-secondary hover:border-brand-mel/30'
                                            }`}
                                        >
                                            <span className="text-[10px] font-black uppercase tracking-widest">Outro Endereço</span>
                                        </div>
                                    </div>
                                )}

                                <div className={use_saved_address ? 'opacity-40 pointer-events-none' : ''}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-1">
                                        <label className="block text-[10px] uppercase font-bold text-brand-mel tracking-widest mb-2">CEP</label>
                                        <input
                                            name="cep"
                                            required
                                            maxLength={9}
                                            value={address.cep}
                                            onChange={(e) => handleCepChange(e.target.value)}
                                            className="w-full px-4 py-3 bg-bg-main border border-border rounded-xl focus:outline-none focus:border-brand-mel transition-colors text-sm text-text-primary"
                                            placeholder="00000-000"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-[10px] uppercase font-bold text-brand-mel tracking-widest mb-2">Rua / Logradouro</label>
                                        <input
                                            name="street"
                                            required
                                            value={address.street}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-bg-main border border-border rounded-xl focus:outline-none focus:border-brand-mel transition-colors text-sm text-text-primary"
                                            placeholder="Ex: Av. das Abelhas"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase font-bold text-brand-mel tracking-widest mb-2">Número</label>
                                        <input
                                            name="number"
                                            required
                                            value={address.number}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-bg-main border border-border rounded-xl focus:outline-none focus:border-brand-mel transition-colors text-sm text-text-primary"
                                            placeholder="123"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase font-bold text-brand-mel tracking-widest mb-2">Complemento</label>
                                        <input
                                            name="complement"
                                            value={address.complement}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-bg-main border border-border rounded-xl focus:outline-none focus:border-brand-mel transition-colors text-sm text-text-primary"
                                            placeholder="Apto, Bloco..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase font-bold text-brand-mel tracking-widest mb-2">Bairro</label>
                                        <input
                                            name="neighborhood"
                                            required
                                            value={address.neighborhood}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-bg-main border border-border rounded-xl focus:outline-none focus:border-brand-mel transition-colors text-sm text-text-primary"
                                            placeholder="Nome do bairro"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] uppercase font-bold text-brand-mel tracking-widest mb-2">Cidade</label>
                                            <input
                                                name="city"
                                                required
                                                value={address.city}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-bg-main border border-border rounded-xl focus:outline-none focus:border-brand-mel transition-colors text-sm text-text-primary"
                                                placeholder="Cidade"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase font-bold text-brand-mel tracking-widest mb-2">UF</label>
                                            <input
                                                name="state"
                                                required
                                                maxLength={2}
                                                value={address.state}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-bg-main border border-border rounded-xl focus:outline-none focus:border-brand-mel transition-colors text-sm text-text-primary"
                                                placeholder="SP"
                                            />
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-surface p-8 rounded-3xl shadow-sm border border-border">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 bg-bg-main rounded-xl flex items-center justify-center text-brand-mel">
                                        <Truck size={20} />
                                    </div>
                                    <h2 className="text-xl font-black italic text-text-primary tracking-tight">Opções de Entrega</h2>
                                </div>

                                {calculating_shipping ? (
                                    <div className="flex flex-col items-center justify-center py-10 text-text-secondary">
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
                                                        : 'border-border hover:border-brand-mel/30'
                                                }`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <img src={option.company_logo} alt={option.company} className="w-10 h-10 object-contain bg-white rounded-lg p-1 border border-border" />
                                                    <div>
                                                        <p className="text-sm font-black text-text-primary">{option.name}</p>
                                                        <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">{option.delivery_time} dias úteis • {option.company}</p>
                                                    </div>
                                                </div>
                                                <span className="text-sm font-black text-brand-mel">{formatBRL(option.price)}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-8 text-center bg-bg-main rounded-2xl border border-dashed border-border">
                                        <p className="text-xs text-text-secondary italic">Insira um CEP válido para ver as opções de entrega.</p>
                                    </div>
                                )}
                            </section>

                            <section className="bg-surface p-8 rounded-3xl shadow-sm border border-border">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-bg-main rounded-xl flex items-center justify-center text-brand-mel">
                                        <CreditCard size={20} />
                                    </div>
                                    <h2 className="text-xl font-black italic text-text-primary tracking-tight">Pagamento</h2>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-bg-main rounded-2xl border border-border">
                                    <img
                                        src="https://http2.mlstatic.com/frontend-assets/ui-navigation/5.19.5/mercadopago/logo__large@2x.png"
                                        alt="Mercado Pago"
                                        className="h-7 object-contain"
                                    />
                                    <p className="text-xs text-text-secondary italic leading-relaxed">
                                        Você será redirecionado para o Mercado Pago para concluir o pagamento com segurança — cartão, Pix, boleto e mais.
                                    </p>
                                </div>
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
                                            <span className="font-bold tracking-tighter">{formatBRL(item.price * item.quantity)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-brand-white/10 pt-6 space-y-3">
                                    <div className="flex justify-between text-xs opacity-60 uppercase tracking-widest font-bold">
                                        <span>Subtotal</span>
                                        <span>{formatBRL(cart_total)}</span>
                                    </div>
                                    <div className="flex justify-between text-xs opacity-60 uppercase tracking-widest font-bold">
                                        <span>Frete</span>
                                        <span>{selected_shipping ? formatBRL(selected_shipping.price) : 'A calcular'}</span>
                                    </div>
                                    <div className="flex justify-between items-end pt-4">
                                        <span className="text-[10px] uppercase tracking-[0.3em] font-black text-brand-mel">Total</span>
                                        <span className="text-4xl font-black italic tracking-tighter text-brand-mel">
                                            {formatBRL(cart_total + (selected_shipping?.price || 0))}
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
                                    className="w-full mt-8 py-5 bg-brand-mel text-brand-white text-[10px] uppercase tracking-[0.3em] font-black rounded-2xl hover:bg-brand-gold hover:scale-[1.02] transition-all disabled:opacity-50 shadow-xl shadow-black/20"
                                >
                                    {loading ? 'AGUARDE...' : 'CONFIRMAR E PAGAR'}
                                </button>
                            </div>

                            <div className="bg-surface p-6 rounded-3xl border border-border flex items-center gap-4">
                                <div className="w-12 h-12 bg-brand-mel/10 text-brand-mel rounded-full flex items-center justify-center flex-shrink-0">
                                    <Truck size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-black text-text-primary uppercase tracking-tight">Entrega Segura</p>
                                    <p className="text-[10px] text-text-secondary italic">Produtos colhidos e embalados com rigor técnico.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
