import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Ajustando para framer-motion que é o padrão comum, ou motion/react se for a nova versão
import { registerService } from '../services/authService';

export default function RegisterForm() {
    const [form_data, set_form_data] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        set_form_data({
            ...form_data,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await registerService(form_data);
            localStorage.setItem('auth_token', response.data.access_token);
            window.location.assign('/loja'); // Redireciona para a loja após cadastro
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erro ao realizar cadastro.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-brand-white p-10 rounded-xl shadow-2xl border border-gray-100"
        >
            <div className="text-center mb-10">
                <img src="/logo.jpg" alt="Logo" className="h-16 mx-auto mb-6 grayscale hover:grayscale-0 transition-all duration-500" />
                <h2 className="text-2xl font-bold italic text-brand-dark tracking-tight">Criar sua Conta</h2>
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mt-2 font-black">Apiário Costa</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-[10px] uppercase font-bold text-brand-wine tracking-widest mb-2">Nome Completo</label>
                    <input
                        name="name"
                        type="text"
                        value={form_data.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-bg-main border border-gray-100 rounded-[4px] focus:outline-none focus:border-brand-mel transition-colors font-medium text-sm"
                        placeholder="Como podemos te chamar?"
                        required
                    />
                </div>

                <div>
                    <label className="block text-[10px] uppercase font-bold text-brand-wine tracking-widest mb-2">E-mail</label>
                    <input
                        name="email"
                        type="email"
                        value={form_data.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-bg-main border border-gray-100 rounded-[4px] focus:outline-none focus:border-brand-mel transition-colors font-medium text-sm"
                        placeholder="seu@email.com"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[10px] uppercase font-bold text-brand-wine tracking-widest mb-2">Senha</label>
                        <input
                            name="password"
                            type="password"
                            value={form_data.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-bg-main border border-gray-100 rounded-[4px] focus:outline-none focus:border-brand-mel transition-colors font-medium text-sm"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] uppercase font-bold text-brand-wine tracking-widest mb-2">Confirmar</label>
                        <input
                            name="password_confirmation"
                            type="password"
                            value={form_data.password_confirmation}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-bg-main border border-gray-100 rounded-[4px] focus:outline-none focus:border-brand-mel transition-colors font-medium text-sm"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                </div>

                {error && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[10px] text-red-500 font-bold text-center italic uppercase tracking-wider"
                    >
                        {error}
                    </motion.p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-brand-dark text-brand-white text-[10px] uppercase tracking-[0.2em] font-black hover:bg-brand-wine transition-all hover:scale-[1.02] disabled:opacity-50"
                >
                    {loading ? 'PROCESSANDO...' : 'CRIAR MINHA CONTA'}
                </button>

                <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest pt-4">
                    Já tem conta? <a href="/login" className="text-brand-mel hover:text-brand-wine underline">Fazer Login</a>
                </p>
            </form>
        </motion.div>
    );
}
