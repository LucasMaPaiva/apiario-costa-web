import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { loginService } from '../services/authService';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const location = useLocation();
    const from: string = (location.state as any)?.from || '/loja';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await loginService({ email, password });
            localStorage.setItem('auth_token', response.data.access_token);

            const isAdmin = response.data.user.roles?.some((r: any) => r.name === 'admin') || false;

            if (isAdmin) {
                window.location.assign('/admin');
            } else {
                window.location.assign(from);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erro de conexão ou servidor.');
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
                <img src="/logo.jpg" alt="Logo" className="h-20 mx-auto mb-6 grayscale hover:grayscale-0 transition-all duration-500" />
                <h2 className="text-2xl font-bold italic text-brand-dark">Entre na sua conta</h2>
                <p className="text-xs text-gray-400 uppercase tracking-widest mt-2">Apiário Costa</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-[10px] uppercase font-bold text-brand-wine tracking-widest mb-2">E-mail</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-bg-main border border-gray-100 rounded-[4px] focus:outline-none focus:border-brand-mel transition-colors font-medium text-sm"
                        placeholder="seu@email.com"
                        required
                    />
                </div>

                <div>
                    <label className="block text-[10px] uppercase font-bold text-brand-wine tracking-widest mb-2">Senha</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-bg-main border border-gray-100 rounded-[4px] focus:outline-none focus:border-brand-mel transition-colors font-medium text-sm"
                        placeholder="••••••••"
                        required
                    />
                </div>

                {error && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs text-red-500 font-bold text-center italic"
                    >
                        {error}
                    </motion.p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-artistic py-4 bg-brand-mel text-brand-white text-xs hover:scale-[1.02] disabled:opacity-50 disabled:scale-100"
                >
                    {loading ? 'AUTENTICANDO...' : 'ENTRAR NO SISTEMA'}
                </button>
            </form>

            <p className="text-center text-xs text-gray-500 mt-8">
                Não tem uma conta?{' '}
                <Link to="/cadastro" className="font-bold text-brand-wine hover:text-brand-mel transition-colors">
                    Cadastre-se
                </Link>
            </p>
        </motion.div>
    );
}
