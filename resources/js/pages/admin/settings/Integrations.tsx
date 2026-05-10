import React, { useEffect, useState } from 'react';
import { Truck, ExternalLink, CheckCircle2, AlertCircle, RefreshCcw } from 'lucide-react';
import httpClient from '../../../common/services/httpClient';

export default function AdminIntegrations() {
    const [loading, setLoading] = useState(true);
    const [integration, setIntegration] = useState<any>(null);

    const loadIntegration = async () => {
        setLoading(true);
        try {
            const response = await httpClient.get('/api/admin/integrations/melhor-envio');
            setIntegration(response.data.data);
        } catch (error) {
            setIntegration(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadIntegration();
    }, []);

    const handleConnect = () => {
        // Redireciona para a rota do Laravel que inicia o OAuth
        window.location.href = '/api/admin/integrations/melhor-envio/redirect';
    };

    if (loading) return <div className="p-20 text-center text-text-secondary">Carregando configurações...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-12">
                <h1 className="text-3xl font-bold italic text-text-primary mb-2 text-glow">Configurações de Logística</h1>
                <p className="text-sm text-text-secondary">Gerencie suas integrações com transportadoras e meios de envio.</p>
            </div>

            <div className="bg-surface rounded-[2.5rem] shadow-2xl border border-border overflow-hidden">
                <div className="p-12">
                    <div className="flex flex-col md:flex-row items-center gap-10">
                        <div className="w-48 h-24 bg-white rounded-3xl p-4 shadow-xl border border-border flex items-center justify-center overflow-hidden">
                            <img src="https://lp.melhorenvio.com.br/wp-content/uploads/2024/09/MelhorEnvio_Bicolor_Positivo-1536x768.png" alt="Melhor Envio" className="w-full h-auto object-contain" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                                <h2 className="text-xl font-bold text-text-primary italic">Melhor Envio</h2>
                                {integration ? (
                                    <span className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-green-500/20">
                                        <CheckCircle2 size={12} /> Conectado
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-1.5 px-3 py-1 bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-red-500/20">
                                        <AlertCircle size={12} /> Desconectado
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-text-secondary leading-relaxed mb-6">
                                Centralize suas cotações e gere etiquetas de frete dos Correios, Jadlog e outras transportadoras com descontos exclusivos.
                            </p>
                            
                            <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                {integration ? (
                                    <>
                                        <button 
                                            onClick={handleConnect}
                                            className="flex items-center gap-2 px-8 py-4 bg-surface border border-border text-text-primary rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-mel hover:text-white hover:border-brand-mel transition-all shadow-sm"
                                        >
                                            <RefreshCcw size={14} /> Reautenticar Conta
                                        </button>
                                        <div className="w-full mt-4 p-4 bg-bg-main/50 rounded-xl border border-border flex items-center justify-between">
                                            <div>
                                                <p className="text-[10px] uppercase font-black text-text-secondary tracking-widest mb-0.5">Ambiente</p>
                                                <p className="text-sm font-bold text-brand-mel uppercase tracking-widest">{integration.environment}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] uppercase font-black text-text-secondary tracking-widest mb-0.5">Última Sincronização</p>
                                                <p className="text-xs font-medium text-text-primary">{new Date(integration.connected_at).toLocaleDateString('pt-BR')}</p>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <button 
                                        onClick={handleConnect}
                                        className="flex items-center gap-3 bg-brand-mel text-white px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-brand-gold transition-all shadow-xl shadow-brand-mel/20 group"
                                    >
                                        Conectar Conta <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="bg-bg-main/30 p-8 border-t border-border flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-mel/10 text-brand-mel rounded-xl flex items-center justify-center shrink-0">
                        <Truck size={20} />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-text-primary mb-1 italic">Como funciona?</h4>
                        <p className="text-xs text-text-secondary leading-relaxed">
                            Ao conectar sua conta, o sistema poderá calcular o frete automaticamente no carrinho dos clientes e você poderá gerar etiquetas de envio diretamente pelo painel administrativo. Certifique-se de ter saldo na sua carteira do Melhor Envio.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
