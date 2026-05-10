import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, Save, Loader2, CheckCircle2, Shield, Lock, X, KeyRound } from 'lucide-react';
import { useAuth } from '../../modules/auth/context/AuthContext';
import httpClient from '../../common/services/httpClient';
import { motion, AnimatePresence } from 'motion/react';

export default function Profile() {
    const { user, refreshUser } = useAuth();
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [is_password_modal_open, set_is_password_modal_open] = useState(false);
    const [password_form, set_password_form] = useState({
        current_password: '',
        password: '',
        password_confirmation: ''
    });
    const [password_loading, set_password_loading] = useState(false);
    const [password_error, set_password_error] = useState('');

    const [form, setForm] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || ''
    });

    useEffect(() => {
        if (user) {
            setForm({
                name: user.name,
                email: user.email,
                phone: user.phone || ''
            });
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setSuccess(false);
        try {
            await httpClient.put('/api/user/profile', form);
            await refreshUser();
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (error) {
            console.error('Failed to update profile:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        set_password_loading(true);
        set_password_error('');
        try {
            await httpClient.put('/api/user/password', password_form);
            set_is_password_modal_open(false);
            set_password_form({ current_password: '', password: '', password_confirmation: '' });
            alert('Senha alterada com sucesso!');
        } catch (error: any) {
            set_password_error(error.response?.data?.message || 'Erro ao alterar senha.');
        } finally {
            set_password_loading(false);
        }
    };

    return (
        <div className="min-h-screen bg-bg-main pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-2xl">
                <div className="mb-12">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-12 bg-brand-dark text-brand-mel rounded-2xl flex items-center justify-center shadow-lg">
                            <User size={24} />
                        </div>
                        <h1 className="text-4xl font-black italic text-text-primary tracking-tighter">Minha Conta</h1>
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-text-secondary font-bold">Gerencie seus dados pessoais e segurança</p>
                </div>

                <div className="bg-surface rounded-[2.5rem] border border-border shadow-sm overflow-hidden">
                    <div className="p-10">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-10 h-10 bg-brand-mel/10 text-brand-mel rounded-xl flex items-center justify-center">
                                <Shield size={20} />
                            </div>
                            <div>
                                <h2 className="text-xl font-black italic text-text-primary tracking-tight">Dados Pessoais</h2>
                                <p className="text-xs text-text-secondary italic">Mantenha suas informações atualizadas.</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block text-[10px] uppercase font-black text-brand-mel tracking-widest mb-3 flex items-center gap-2">
                                        <User size={12} /> Nome Completo
                                    </label>
                                    <input
                                        required
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className="w-full px-6 py-4 bg-bg-main border border-border rounded-2xl focus:outline-none focus:border-brand-mel transition-all text-sm font-medium text-text-primary"
                                        placeholder="Seu nome"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] uppercase font-black text-brand-mel tracking-widest mb-3 flex items-center gap-2">
                                        <Mail size={12} /> E-mail
                                    </label>
                                    <input
                                        disabled
                                        value={form.email}
                                        className="w-full px-6 py-4 bg-bg-main border border-border rounded-2xl opacity-60 cursor-not-allowed text-sm font-medium text-text-primary"
                                    />
                                    <p className="mt-2 text-[9px] text-text-secondary italic">O e-mail não pode ser alterado por questões de segurança.</p>
                                </div>

                                <div>
                                    <label className="block text-[10px] uppercase font-black text-brand-mel tracking-widest mb-3 flex items-center gap-2">
                                        <Phone size={12} /> Telefone / WhatsApp
                                    </label>
                                    <input
                                        value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        className="w-full px-6 py-4 bg-bg-main border border-border rounded-2xl focus:outline-none focus:border-brand-mel transition-all text-sm font-medium text-text-primary"
                                        placeholder="(00) 00000-0000"
                                    />
                                </div>
                            </div>

                            <div className="pt-6 flex items-center gap-6">
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
                                        <CheckCircle2 size={16} /> Perfil atualizado!
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                    
                    <div className="bg-bg-main p-10 border-t border-border">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-black text-text-primary uppercase tracking-widest mb-2">Endereços de Entrega</h3>
                                <p className="text-xs text-text-secondary italic">Gerencie seus locais de entrega e endereço principal.</p>
                            </div>
                            <Link to="/enderecos" className="bg-surface border border-border text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-brand-mel hover:text-white transition-all shadow-sm text-text-primary hover:text-white">
                                Gerenciar
                            </Link>
                        </div>
                    </div>

                    <div className="bg-bg-main p-10 border-t border-border">
                        <h3 className="text-sm font-black text-text-primary uppercase tracking-widest mb-4">Segurança</h3>
                        <p className="text-xs text-text-secondary italic mb-6">Deseja alterar sua senha ou gerenciar sessões ativas?</p>
                        <button 
                            onClick={() => set_is_password_modal_open(true)}
                            className="text-[10px] font-black text-brand-wine hover:text-brand-mel uppercase tracking-widest transition-colors"
                        >
                            Alterar Senha
                        </button>
                    </div>
                </div>
            </div>

            {/* Password Modal */}
            <AnimatePresence>
                {is_password_modal_open && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => set_is_password_modal_open(false)}
                            className="absolute inset-0 bg-brand-dark/80 backdrop-blur-md"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-md bg-surface rounded-[2rem] shadow-2xl border border-border overflow-hidden"
                        >
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-xl font-black italic text-text-primary flex items-center gap-2">
                                        <Lock size={20} className="text-brand-mel" /> Alterar Senha
                                    </h2>
                                    <button onClick={() => set_is_password_modal_open(false)} className="text-text-secondary hover:text-brand-mel"><X size={20} /></button>
                                </div>

                                <form onSubmit={handleUpdatePassword} className="space-y-6">
                                    {password_error && (
                                        <div className="p-4 bg-red-500/10 text-red-500 text-xs font-bold rounded-xl border border-red-500/20">
                                            {password_error}
                                        </div>
                                    )}

                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-brand-mel mb-2">Senha Atual</label>
                                        <input 
                                            type="password"
                                            required
                                            value={password_form.current_password}
                                            onChange={e => set_password_form({ ...password_form, current_password: e.target.value })}
                                            className="w-full bg-bg-main border border-border rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-brand-mel text-text-primary"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-brand-mel mb-2">Nova Senha</label>
                                        <input 
                                            type="password"
                                            required
                                            value={password_form.password}
                                            onChange={e => set_password_form({ ...password_form, password: e.target.value })}
                                            className="w-full bg-bg-main border border-border rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-brand-mel text-text-primary"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-brand-mel mb-2">Confirmar Nova Senha</label>
                                        <input 
                                            type="password"
                                            required
                                            value={password_form.password_confirmation}
                                            onChange={e => set_password_form({ ...password_form, password_confirmation: e.target.value })}
                                            className="w-full bg-bg-main border border-border rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-brand-mel text-text-primary"
                                        />
                                    </div>

                                    <button 
                                        type="submit"
                                        disabled={password_loading}
                                        className="w-full bg-brand-mel text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-gold transition-all flex items-center justify-center gap-2"
                                    >
                                        {password_loading ? <Loader2 size={16} className="animate-spin" /> : <KeyRound size={16} />}
                                        Atualizar Senha
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
