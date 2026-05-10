import React, { useEffect, useState } from 'react';
import { MapPin, Plus, Trash2, Home, Briefcase, Star, Loader2, ArrowLeft, Save, X } from 'lucide-react';
import httpClient from '../../common/services/httpClient';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Addresses() {
    const [addresses, setAddresses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [is_modal_open, set_is_modal_open] = useState(false);
    const [editing_address, set_editing_address] = useState<any>(null);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        label: '',
        cep: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        is_main: false
    });

    const loadAddresses = async () => {
        try {
            const response = await httpClient.get('/api/addresses');
            setAddresses(response.data.data);
        } catch (error) {
            console.error('Failed to load addresses:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAddresses();
    }, []);

    const handleOpenModal = (address: any = null) => {
        if (address) {
            set_editing_address(address);
            setForm({
                label: address.label || '',
                cep: address.cep,
                street: address.street,
                number: address.number,
                complement: address.complement || '',
                neighborhood: address.neighborhood,
                city: address.city,
                state: address.state,
                is_main: address.is_main
            });
        } else {
            set_editing_address(null);
            setForm({
                label: '',
                cep: '',
                street: '',
                number: '',
                complement: '',
                neighborhood: '',
                city: '',
                state: '',
                is_main: addresses.length === 0
            });
        }
        set_is_modal_open(true);
    };

    const handleCloseModal = () => {
        set_is_modal_open(false);
        set_editing_address(null);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (editing_address) {
                await httpClient.put(`/api/addresses/${editing_address.id}`, form);
            } else {
                await httpClient.post('/api/addresses', form);
            }
            await loadAddresses();
            handleCloseModal();
        } catch (error) {
            console.error('Failed to save address:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Deseja realmente remover este endereço?')) return;
        try {
            await httpClient.delete(`/api/addresses/${id}`);
            await loadAddresses();
        } catch (error) {
            console.error('Failed to delete address:', error);
        }
    };

    const handleSetMain = async (id: number) => {
        try {
            await httpClient.patch(`/api/addresses/${id}/set-main`);
            await loadAddresses();
        } catch (error) {
            console.error('Failed to set main address:', error);
        }
    };

    const handleCepChange = async (cep: string) => {
        const value = cep.replace(/\D/g, '');
        setForm(prev => ({ ...prev, cep: value }));
        
        if (value.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${value}/json/`);
                const data = await response.json();
                if (!data.erro) {
                    setForm(prev => ({
                        ...prev,
                        street: data.logradouro,
                        neighborhood: data.bairro,
                        city: data.localidade,
                        state: data.uf
                    }));
                }
            } catch (error) {
                console.error('Failed to fetch CEP:', error);
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-bg-main pt-32 flex justify-center">
                <Loader2 className="animate-spin text-brand-mel" size={40} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bg-main pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <Link to="/perfil" className="inline-flex items-center gap-2 text-text-secondary hover:text-brand-mel mb-4 transition-colors text-xs font-bold uppercase tracking-widest">
                            <ArrowLeft size={14} /> Voltar para Perfil
                        </Link>
                        <h1 className="text-4xl font-black italic text-text-primary tracking-tighter">Meus Endereços</h1>
                        <p className="text-[10px] uppercase tracking-widest text-text-secondary font-bold mt-2">Apiário Costa • Gestão de Entrega</p>
                    </div>
                    <button 
                        onClick={() => handleOpenModal()}
                        className="bg-brand-mel text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-gold transition-all shadow-xl shadow-brand-mel/20 flex items-center gap-2"
                    >
                        <Plus size={16} /> Novo Endereço
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {addresses.map((address) => (
                        <motion.div 
                            layout
                            key={address.id} 
                            className={`bg-surface p-8 rounded-[2rem] border-2 transition-all group ${address.is_main ? 'border-brand-mel shadow-lg shadow-brand-mel/5' : 'border-border hover:border-brand-mel/30'}`}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${address.is_main ? 'bg-brand-mel text-white' : 'bg-bg-main text-text-secondary'}`}>
                                        {address.label?.toLowerCase().includes('casa') ? <Home size={20} /> : address.label?.toLowerCase().includes('trabalho') ? <Briefcase size={20} /> : <MapPin size={20} />}
                                    </div>
                                    <div>
                                        <h3 className="font-black italic text-text-primary tracking-tight">{address.label || 'Endereço'}</h3>
                                        {address.is_main && <span className="text-[10px] font-black text-brand-mel uppercase tracking-widest flex items-center gap-1"><Star size={10} fill="currentColor" /> Principal</span>}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => handleOpenModal(address)} className="p-2 text-text-secondary hover:text-brand-mel transition-colors"><Plus size={16} className="rotate-45" /></button>
                                    <button onClick={() => handleDelete(address.id)} className="p-2 text-text-secondary hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                </div>
                            </div>

                            <div className="text-sm text-text-secondary italic leading-relaxed mb-8">
                                <p>{address.street}, {address.number}</p>
                                {address.complement && <p>{address.complement}</p>}
                                <p>{address.neighborhood}</p>
                                <p>{address.city} - {address.state}</p>
                                <p className="font-bold text-text-primary not-italic mt-2">CEP: {address.cep}</p>
                            </div>

                            {!address.is_main && (
                                <button 
                                    onClick={() => handleSetMain(address.id)}
                                    className="w-full py-3 bg-bg-main text-[10px] font-black uppercase tracking-widest text-text-secondary hover:bg-brand-mel hover:text-white rounded-xl transition-all border border-border"
                                >
                                    Definir como Principal
                                </button>
                            )}
                        </motion.div>
                    ))}

                    {addresses.length === 0 && (
                        <div className="md:col-span-2 bg-surface p-20 rounded-[2.5rem] border-2 border-dashed border-border text-center">
                            <MapPin size={48} className="mx-auto mb-6 text-text-secondary opacity-20" />
                            <p className="text-text-secondary italic mb-8">Você ainda não tem endereços cadastrados.</p>
                            <button 
                                onClick={() => handleOpenModal()}
                                className="bg-brand-mel/10 text-brand-mel px-10 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-mel hover:text-white transition-all"
                            >
                                Cadastrar Primeiro Endereço
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {is_modal_open && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleCloseModal}
                            className="absolute inset-0 bg-brand-dark/80 backdrop-blur-md"
                        />
                        <motion.div 
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 50, scale: 0.95 }}
                            className="relative w-full max-w-xl bg-surface rounded-[2.5rem] shadow-2xl border border-border overflow-hidden"
                        >
                            <div className="p-10">
                                <div className="flex items-center justify-between mb-10">
                                    <h2 className="text-2xl font-black italic text-text-primary tracking-tight">
                                        {editing_address ? 'Editar Endereço' : 'Novo Endereço'}
                                    </h2>
                                    <button onClick={handleCloseModal} className="text-text-secondary hover:text-brand-mel"><X size={24} /></button>
                                </div>

                                <form onSubmit={handleSave} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="col-span-2">
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-brand-mel mb-2">Apelido (Ex: Casa, Trabalho)</label>
                                            <input 
                                                value={form.label}
                                                onChange={e => setForm(prev => ({ ...prev, label: e.target.value }))}
                                                className="w-full bg-bg-main border border-border rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-brand-mel"
                                                placeholder="Meu Apiário"
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-brand-mel mb-2">CEP</label>
                                            <input 
                                                required
                                                value={form.cep}
                                                onChange={e => handleCepChange(e.target.value)}
                                                className="w-full bg-bg-main border border-border rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-brand-mel"
                                                placeholder="00000-000"
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-brand-mel mb-2">Rua / Logradouro</label>
                                            <input 
                                                required
                                                value={form.street}
                                                readOnly={form.cep.length === 8 && !!form.street}
                                                onChange={e => setForm(prev => ({ ...prev, street: e.target.value }))}
                                                className="w-full bg-bg-main border border-border rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-brand-mel disabled:opacity-50"
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-brand-mel mb-2">Número</label>
                                            <input 
                                                required
                                                value={form.number}
                                                onChange={e => setForm(prev => ({ ...prev, number: e.target.value }))}
                                                className="w-full bg-bg-main border border-border rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-brand-mel"
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-brand-mel mb-2">Complemento</label>
                                            <input 
                                                value={form.complement}
                                                onChange={e => setForm(prev => ({ ...prev, complement: e.target.value }))}
                                                className="w-full bg-bg-main border border-border rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-brand-mel"
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-brand-mel mb-2">Bairro</label>
                                            <input 
                                                required
                                                value={form.neighborhood}
                                                readOnly={form.cep.length === 8 && !!form.neighborhood}
                                                onChange={e => setForm(prev => ({ ...prev, neighborhood: e.target.value }))}
                                                className="w-full bg-bg-main border border-border rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-brand-mel disabled:opacity-50"
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-brand-mel mb-2">Cidade</label>
                                            <input 
                                                required
                                                value={form.city}
                                                readOnly={form.cep.length === 8 && !!form.city}
                                                onChange={e => setForm(prev => ({ ...prev, city: e.target.value }))}
                                                className="w-full bg-bg-main border border-border rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-brand-mel disabled:opacity-50"
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-brand-mel mb-2">UF</label>
                                            <input 
                                                required
                                                maxLength={2}
                                                value={form.state}
                                                readOnly={form.cep.length === 8 && !!form.state}
                                                onChange={e => setForm(prev => ({ ...prev, state: e.target.value.toUpperCase() }))}
                                                className="w-full bg-bg-main border border-border rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-brand-mel disabled:opacity-50"
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-4 flex items-center gap-3">
                                        <input 
                                            type="checkbox"
                                            id="is_main"
                                            checked={form.is_main}
                                            onChange={e => setForm(prev => ({ ...prev, is_main: e.target.checked }))}
                                            className="w-5 h-5 accent-brand-mel"
                                        />
                                        <label htmlFor="is_main" className="text-xs font-bold text-text-secondary uppercase tracking-widest cursor-pointer">Definir como endereço principal</label>
                                    </div>

                                    <button 
                                        type="submit"
                                        disabled={saving}
                                        className="w-full bg-brand-mel text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-brand-gold transition-all shadow-xl shadow-brand-mel/20 flex items-center justify-center gap-2"
                                    >
                                        {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                                        Salvar Endereço
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
