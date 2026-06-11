import React from 'react';
import { MapPin, Settings as SettingsIcon } from 'lucide-react';
import StoreAddress from './StoreAddress';

export default function Settings() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-12">
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-10 bg-brand-dark text-brand-mel rounded-xl flex items-center justify-center shadow-lg">
                        <SettingsIcon size={20} />
                    </div>
                    <h1 className="text-3xl font-bold italic text-text-primary text-glow">Configurações do Sistema</h1>
                </div>
                <p className="text-sm text-text-secondary">Gerencie as preferências da sua loja.</p>
            </div>

            {/* Tabs Navigation */}
            <div className="flex gap-2 mb-8 p-1.5 bg-bg-main rounded-[1.5rem] border border-border w-fit">
                <button
                    className="flex items-center gap-3 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all bg-brand-mel text-white shadow-lg shadow-brand-mel/20"
                >
                    <MapPin size={14} /> Endereço da Loja
                </button>
            </div>

            {/* Tab Content */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <StoreAddress />
            </div>
        </div>
    );
}
