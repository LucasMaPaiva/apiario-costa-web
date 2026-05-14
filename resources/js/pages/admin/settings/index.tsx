import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Truck, MapPin, Settings as SettingsIcon } from 'lucide-react';
import AdminIntegrations from './Integrations';
import StoreAddress from './StoreAddress';

type Tab = 'logistics' | 'address';

export default function Settings() {
    const [search_params] = useSearchParams();
    const initial_tab: Tab = search_params.get('tab') === 'logistics' ? 'logistics' : 'address';
    const [active_tab, set_active_tab] = useState<Tab>(initial_tab);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-12">
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-10 bg-brand-dark text-brand-mel rounded-xl flex items-center justify-center shadow-lg">
                        <SettingsIcon size={20} />
                    </div>
                    <h1 className="text-3xl font-bold italic text-text-primary text-glow">Configurações do Sistema</h1>
                </div>
                <p className="text-sm text-text-secondary">Gerencie as preferências e integrações da sua loja.</p>
            </div>

            {/* Tabs Navigation */}
            <div className="flex gap-2 mb-8 p-1.5 bg-bg-main rounded-[1.5rem] border border-border w-fit">
                <button
                    onClick={() => set_active_tab('address')}
                    className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        active_tab === 'address'
                            ? 'bg-brand-mel text-white shadow-lg shadow-brand-mel/20'
                            : 'text-text-secondary hover:bg-brand-mel/5 hover:text-brand-mel'
                    }`}
                >
                    <MapPin size={14} /> Endereço da Loja
                </button>
                <button
                    onClick={() => set_active_tab('logistics')}
                    className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        active_tab === 'logistics'
                            ? 'bg-brand-mel text-white shadow-lg shadow-brand-mel/20'
                            : 'text-text-secondary hover:bg-brand-mel/5 hover:text-brand-mel'
                    }`}
                >
                    <Truck size={14} /> Integração Logística
                </button>
            </div>

            {/* Tab Content */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {active_tab === 'address' ? <StoreAddress /> : <AdminIntegrations />}
            </div>
        </div>
    );
}
