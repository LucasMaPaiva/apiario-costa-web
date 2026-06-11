import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Package, Truck, CreditCard, MapPin, ArrowLeft, ExternalLink, Calendar, Hash, ShoppingBag, CheckCircle2, XCircle, Clock } from 'lucide-react';
import httpClient from '../../common/services/httpClient';
import { motion } from 'motion/react';
import { formatBRL } from '../../common/utils/formatBRL';

export default function OrderDetails() {
    const { id } = useParams();
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const loadOrder = async () => {
        try {
            const response = await httpClient.get(`/api/orders/${id}`);
            setOrder(response.data.data);
        } catch (error) {
            console.error('Failed to load order:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrder();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-bg-main pt-32 pb-20 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-brand-mel border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen bg-bg-main pt-32 pb-20 text-center">
                <h2 className="text-2xl font-bold">Pedido não encontrado.</h2>
                <Link to="/meus-pedidos" className="text-brand-mel mt-4 inline-block">Voltar para meus pedidos</Link>
            </div>
        );
    }

    const getStatusInfo = (status: string) => {
        const info: any = {
            'pending': { label: 'Pendente', color: 'text-yellow-600', bg: 'bg-yellow-500/10', icon: <Clock size={20} /> },
            'processing': { label: 'Em Preparação', color: 'text-blue-600', bg: 'bg-blue-500/10', icon: <Package size={20} /> },
            'shipped': { label: 'Enviado', color: 'text-brand-mel', bg: 'bg-brand-mel/10', icon: <Truck size={20} /> },
            'delivered': { label: 'Entregue', color: 'text-green-600', bg: 'bg-green-500/10', icon: <CheckCircle2 size={20} /> },
            'cancelled': { label: 'Cancelado', color: 'text-red-600', bg: 'bg-red-500/10', icon: <XCircle size={20} /> },
        };
        return info[status] || { label: status, color: 'text-gray-600', bg: 'bg-gray-500/10', icon: <Hash size={20} /> };
    };

    return (
        <div className="min-h-screen bg-bg-main pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-5xl">
                <Link to="/meus-pedidos" className="inline-flex items-center gap-2 text-text-secondary hover:text-brand-mel mb-8 transition-colors text-xs font-bold uppercase tracking-widest">
                    <ArrowLeft size={16} /> Voltar para Meus Pedidos
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Status Card */}
                        <div className="bg-surface rounded-[2rem] border border-border p-10 shadow-sm">
                            <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
                                <div>
                                    <h1 className="text-3xl font-black italic text-text-primary tracking-tighter mb-2">Pedido #{order.id}</h1>
                                    <div className="flex items-center gap-4 text-xs font-bold text-text-secondary uppercase tracking-widest">
                                        <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(order.created_at).toLocaleDateString()}</span>
                                        <span className="flex items-center gap-1"><Hash size={14} /> ID: {order.id}</span>
                                    </div>
                                </div>
                                <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl border ${getStatusInfo(order.status).bg} ${getStatusInfo(order.status).color} border-current/20 font-black text-xs uppercase tracking-widest`}>
                                    {getStatusInfo(order.status).label}
                                </div>
                            </div>

                            {order.tracking_code && (
                                <div className="bg-bg-main p-6 rounded-2xl border border-border flex items-center gap-4">
                                    <div className="w-10 h-10 bg-brand-mel/10 text-brand-mel rounded-xl flex items-center justify-center">
                                        <Truck size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Código de Rastreio</p>
                                        <p className="text-sm font-bold text-text-primary">{order.tracking_code}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Items Card */}
                        <div className="bg-surface rounded-[2rem] border border-border p-10 shadow-sm">
                            <h2 className="text-xl font-black italic text-text-primary mb-8 tracking-tight flex items-center gap-3">
                                <Package size={20} className="text-brand-mel" /> Itens do Pedido
                            </h2>
                            <div className="space-y-6">
                                {order.items.map((item: any) => (
                                    <div key={item.id} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-bg-main transition-colors group">
                                        <div className="w-20 h-20 bg-bg-main rounded-xl border border-border overflow-hidden">
                                            <img src={item.product.image_url || '/placeholder.jpg'} alt={item.product.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-text-primary italic group-hover:text-brand-mel transition-colors">{item.product.name}</h3>
                                            <p className="text-xs text-text-secondary font-bold uppercase tracking-widest">{item.quantity}x • {formatBRL(item.price)}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-black italic text-brand-mel">{formatBRL(item.quantity * parseFloat(item.price))}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {/* Summary Card */}
                        <div className="bg-brand-dark rounded-[2rem] p-10 text-brand-white shadow-2xl">
                            <h2 className="text-xl font-black italic mb-8 tracking-tight flex items-center gap-3">
                                <ShoppingBag size={20} className="text-brand-mel" /> Resumo
                            </h2>
                            <div className="space-y-4 text-sm font-bold uppercase tracking-widest opacity-70">
                                <div className="flex justify-between">
                                    <span>Itens</span>
                                    <span>{formatBRL(order.items.reduce((acc: number, item: any) => acc + (item.quantity * parseFloat(item.price)), 0))}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Frete</span>
                                    <span>{formatBRL(order.shipping_cost || 0)}</span>
                                </div>
                                <div className="border-t border-white/10 pt-4 flex justify-between items-end opacity-100">
                                    <span className="text-brand-mel text-[10px]">Total Geral</span>
                                    <span className="text-3xl font-black italic text-brand-mel tracking-tighter">{formatBRL(order.total_amount)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Address Card */}
                        <div className="bg-surface rounded-[2rem] border border-border p-10 shadow-sm">
                            <h2 className="text-xl font-black italic text-text-primary mb-6 tracking-tight flex items-center gap-3">
                                <MapPin size={20} className="text-brand-mel" /> Entrega
                            </h2>
                            <div className="text-sm font-medium text-text-secondary leading-relaxed italic">
                                <p className="font-bold text-text-primary not-italic uppercase text-[10px] tracking-widest mb-2">{order.shipping_method}</p>
                                <p>{order.street}, {order.number}</p>
                                {order.complement && <p>{order.complement}</p>}
                                <p>{order.neighborhood}</p>
                                <p>{order.city} - {order.state}</p>
                                <p>CEP: {order.cep}</p>
                            </div>
                        </div>

                        {/* Payment Card */}
                        <div className="bg-surface rounded-[2rem] border border-border p-10 shadow-sm">
                            <h2 className="text-xl font-black italic text-text-primary mb-6 tracking-tight flex items-center gap-3">
                                <CreditCard size={20} className="text-brand-mel" /> Pagamento
                            </h2>
                            <div className="text-sm font-bold text-text-secondary uppercase tracking-widest">
                                <p className="mb-2">Status: <span className={order.payment_status === 'paid' ? 'text-green-500' : 'text-yellow-600'}>{order.payment_status === 'paid' ? 'Pago' : 'Pendente'}</span></p>
                                <p className="text-[10px] opacity-60">Método: Manual / Cobrança Direta</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

