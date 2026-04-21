import React from 'react';

export default function AdminPage() {
    return (
        <div className="min-h-screen bg-brand-bg flex items-center justify-center">
            <div className="bg-brand-white p-20 rounded-2xl shadow-xl border border-gray-100 text-center">
                <h1 className="text-4xl font-bold italic text-brand-dark mb-4">Sistema Logado</h1>
                <p className="text-gray-400 uppercase tracking-widest text-sm">Painel Administrativo - Apiário Costa</p>
                <button 
                    onClick={() => window.location.href = '/laravel-admin'}
                    className="mt-10 text-xs font-bold text-brand-wine underline cursor-pointer"
                >
                    Voltar para Login
                </button>
            </div>
        </div>
    );
}
