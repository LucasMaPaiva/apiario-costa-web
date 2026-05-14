import React, { useEffect, useState } from 'react';
import { MapPin, Save, Loader2, CheckCircle2 } from 'lucide-react';
import httpClient from '../../../common/services/httpClient';

export default function StoreAddress() {
    const [loading, set_loading] = useState(true);
    const [saving, set_saving] = useState(false);
    const [success, set_success] = useState(false);
    const [address, set_address] = useState({
        cep: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: ''
    });

    const load_address = async () => {
        set_loading(true);
        try {
            const response = await httpClient.get('/api/admin/settings/store-address');
            set_address(response.data.data);
        } catch (error) {
            console.error('Failed to load address:', error);
        } finally {
            set_loading(false);
        }
    };

    useEffect(() => {
        load_address();
    }, []);

    const handle_change = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_address({ ...address, [e.target.name]: e.target.value });
    };

    const handle_submit = async (e: React.FormEvent) => {
        e.preventDefault();
        set_saving(true);
        set_success(false);
        try {
            await httpClient.post('/api/admin/settings/store-address', address);
            set_success(true);
            setTimeout(() => set_success(false), 3000);
        } catch (error) {
            console.error('Failed to save address:', error);
        } finally {
            set_saving(false);
        }
    };

    if (loading) return <div className="p-20 text-center text-text-secondary">Carregando endereço...</div>;

    return (
        <div className="bg-surface rounded-[2.5rem] shadow-2xl border border-border overflow-hidden">
            <form onSubmit={handle_submit} className="p-12">
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 bg-brand-mel/10 text-brand-mel rounded-2xl flex items-center justify-center">
                        <MapPin size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-text-primary italic">Endereço da Loja</h2>
                        <p className="text-xs text-text-secondary">Este endereço será usado como remetente para o cálculo de frete.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:col-span-1">
                        <label className="block text-[10px] uppercase font-black text-brand-mel tracking-widest mb-3">CEP</label>
                        <input
                            name="cep"
                            required
                            value={address.cep}
                            onChange={handle_change}
                            className="w-full px-6 py-4 bg-bg-main border border-border rounded-2xl focus:outline-none focus:border-brand-mel transition-all text-sm font-medium"
                            placeholder="00000-000"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-[10px] uppercase font-black text-brand-mel tracking-widest mb-3">Rua / Logradouro</label>
                        <input
                            name="street"
                            required
                            value={address.street}
                            onChange={handle_change}
                            className="w-full px-6 py-4 bg-bg-main border border-border rounded-2xl focus:outline-none focus:border-brand-mel transition-all text-sm font-medium"
                            placeholder="Ex: Av. das Abelhas"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] uppercase font-black text-brand-mel tracking-widest mb-3">Número</label>
                        <input
                            name="number"
                            required
                            value={address.number}
                            onChange={handle_change}
                            className="w-full px-6 py-4 bg-bg-main border border-border rounded-2xl focus:outline-none focus:border-brand-mel transition-all text-sm font-medium"
                            placeholder="123"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] uppercase font-black text-brand-mel tracking-widest mb-3">Complemento</label>
                        <input
                            name="complement"
                            value={address.complement}
                            onChange={handle_change}
                            className="w-full px-6 py-4 bg-bg-main border border-border rounded-2xl focus:outline-none focus:border-brand-mel transition-all text-sm font-medium"
                            placeholder="Apto, Bloco..."
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] uppercase font-black text-brand-mel tracking-widest mb-3">Bairro</label>
                        <input
                            name="neighborhood"
                            required
                            value={address.neighborhood}
                            onChange={handle_change}
                            className="w-full px-6 py-4 bg-bg-main border border-border rounded-2xl focus:outline-none focus:border-brand-mel transition-all text-sm font-medium"
                            placeholder="Nome do bairro"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] uppercase font-black text-brand-mel tracking-widest mb-3">Cidade</label>
                            <input
                                name="city"
                                required
                                value={address.city}
                                onChange={handle_change}
                                className="w-full px-6 py-4 bg-bg-main border border-border rounded-2xl focus:outline-none focus:border-brand-mel transition-all text-sm font-medium"
                                placeholder="Cidade"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] uppercase font-black text-brand-mel tracking-widest mb-3">UF</label>
                            <input
                                name="state"
                                required
                                maxLength={2}
                                value={address.state}
                                onChange={handle_change}
                                className="w-full px-6 py-4 bg-bg-main border border-border rounded-2xl focus:outline-none focus:border-brand-mel transition-all text-sm font-medium"
                                placeholder="SP"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex items-center gap-6">
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-3 bg-brand-mel text-white px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-brand-gold transition-all shadow-xl shadow-brand-mel/20 disabled:opacity-50"
                    >
                        {saving ? (
                            <>
                                <Loader2 size={16} className="animate-spin" /> Salvando...
                            </>
                        ) : (
                            <>
                                <Save size={16} /> Salvar Alterações
                            </>
                        )}
                    </button>

                    {success && (
                        <div className="flex items-center gap-2 text-green-500 font-bold text-xs animate-in fade-in slide-in-from-left-4">
                            <CheckCircle2 size={16} /> Configurações salvas com sucesso!
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}
