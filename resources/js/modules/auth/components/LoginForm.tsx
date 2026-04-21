import React, { useState } from 'react';
import { motion } from 'motion/react';
import { loginService } from '../services/authService';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submission started');
        setLoading(true);
        setError('');

        try {
            console.log('Fetching CSRF cookie...');
            const data = await loginService({ email, password });
            console.log('Login successful, data:', data);
            
            localStorage.setItem('auth_token', data.access_token);
            window.location.assign('/admin'); 
        } catch (err: any) {
            console.error('Submission error:', err);
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
                <h2 className="text-2xl font-bold italic text-brand-dark">Acesso Administrativo</h2>
                <p className="text-xs text-gray-400 uppercase tracking-widest mt-2">Apiário Costa</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-[10px] uppercase font-bold text-brand-wine tracking-widest mb-2">E-mail</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-brand-bg border border-gray-100 rounded-[4px] focus:outline-none focus:border-brand-mel transition-colors font-medium text-sm"
                        placeholder="seu@email.com"
                        required
                    />
                </div>

                <div>
                    <label className="block text-[10px] uppercase font-bold text-brand-wine tracking-widest mb-2">Cadastro</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-brand-bg border border-gray-100 rounded-[4px] focus:outline-none focus:border-brand-mel transition-colors font-medium text-sm"
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
        </motion.div>
    );
}
