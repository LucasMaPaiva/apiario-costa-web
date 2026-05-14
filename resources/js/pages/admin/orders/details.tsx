import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Package, Truck, CreditCard, MapPin, ArrowLeft, ExternalLink, Calendar, Hash, ShoppingBag, User, Save, Loader2, CheckCircle2 } from 'lucide-react';
import httpClient from '../../../common/services/httpClient';
import { motion } from 'motion/react';
import { formatBRL } from '../../../common/utils/formatBRL';

export default function AdminOrderDetails() {
    const { id } = useParams();
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState('');
    const [payment_status, setPaymentStatus] = useState('');
    const [tracking_code, setTrackingCode] = useState('');

    const loadOrder = async () => {
        try {
            const response = await httpClient.get(`/api/admin/orders/${id}`);
            const data = response.data.data;
            setOrder(data);
            setStatus(data.status);
            setPaymentStatus(data.payment_status);
            setTrackingCode(data.tracking_code || '');
        } catch (error) {
            console.error('Failed to load order:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await httpClient.patch(`/api/admin/orders/${id}/status`, {
                status,
                payment_status,
                tracking_code
            });
            await loadOrder();
            alert('Pedido atualizado com sucesso!');
        } catch (error) {
            console.error('Failed to update order:', error);
            alert('Erro ao atualizar pedido.');
        } finally {
            setSaving(false);
        }
    };

    useEffect(() => {
        loadOrder();
    }, [id]);

    if (loading) {
        return (
            <div className="p-20 text-center">
                <Loader2 className="animate-spin mx-auto text-brand-mel" size={40} />
            </div>
        );
    }

    if (!order) return <div className="p-20 text-center">Pedido não encontrado.</div>;

    return (
        <div className="max-w-6xl mx-auto pb-20">
            <Link to="/admin/pedidos" className="inline-flex items-center gap-2 text-text-secondary hover:text-brand-mel mb-8 transition-colors text-xs font-bold uppercase tracking-widest">
                <ArrowLeft size={16} /> Voltar para Pedidos
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-8">
                    {/* Status & Actions Card */}
                    <div className="bg-surface rounded-[2.5rem] border border-border p-10 shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-6 mb-10">
                            <div>
                                <h1 className="text-3xl font-black italic text-text-primary tracking-tighter mb-2">Pedido #{order.id}</h1>
                                <p className="text-xs font-bold text-text-secondary uppercase tracking-widest flex items-center gap-2">
                                    <User size={14} /> Cliente: {order.user.name} ({order.user.email})
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Data: {new Date(order.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-brand-mel mb-3">Status do Pedido</label>
                                <select 
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full bg-bg-main border border-border rounded-xl px-4 py-3 text-sm font-bold text-text-primary focus:outline-none focus:border-brand-mel"
                                >
                                    <option value="pending">Pendente</option>
                                    <option value="paid">Pago (Aguardando Envio)</option>
                                    <option value="shipped">Enviado</option>
                                    <option value="delivered">Entregue</option>
                                    <option value="cancelled">Cancelado</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-brand-mel mb-3">Status do Pagamento</label>
                                <select 
                                    value={payment_status}
                                    onChange={(e) => setPaymentStatus(e.target.value)}
                                    className="w-full bg-bg-main border border-border rounded-xl px-4 py-3 text-sm font-bold text-text-primary focus:outline-none focus:border-brand-mel"
                                >
                                    <option value="pending">Pendente</option>
                                    <option value="paid">Pago</option>
                                    <option value="failed">Falhou</option>
                                    <option value="refunded">Reembolsado</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-10">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-brand-mel mb-3">Código de Rastreio (Melhor Envio)</label>
                            <div className="flex gap-4">
                                <input 
                                    type="text"
                                    value={tracking_code}
                                    onChange={(e) => setTrackingCode(e.target.value)}
                                    placeholder="Ex: BR123456789"
                                    className="flex-1 bg-bg-main border border-border rounded-xl px-4 py-3 text-sm font-bold text-text-primary focus:outline-none focus:border-brand-mel"
                                />
                                <button 
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="bg-brand-mel text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-brand-gold transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
                                >
                                    {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                                    Salvar Alterações
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Items Card */}
                    <div className="bg-surface rounded-[2.5rem] border border-border p-10 shadow-sm">
                        <h2 className="text-xl font-black italic text-text-primary mb-8 tracking-tight flex items-center gap-3">
                            <Package size={20} className="text-brand-mel" /> Itens do Pedido
                        </h2>
                        <div className="space-y-6">
                            {order.items.map((item: any) => (
                                <div key={item.id} className="flex items-center gap-6 p-4 rounded-2xl bg-bg-main/50 border border-border/50">
                                    <div className="w-16 h-16 bg-bg-main rounded-xl border border-border overflow-hidden">
                                        <img src={item.product.image_url || '/placeholder.jpg'} alt={item.product.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-text-primary text-sm italic">{item.product.name}</h3>
                                        <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">{item.quantity}x • {formatBRL(item.price)}</p>
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
                    <div className="bg-brand-dark rounded-[2.5rem] p-10 text-brand-white shadow-2xl">
                        <h2 className="text-xl font-black italic mb-8 tracking-tight flex items-center gap-3">
                            <ShoppingBag size={20} className="text-brand-mel" /> Resumo Financeiro
                        </h2>
                        <div className="space-y-4 text-[10px] font-black uppercase tracking-[0.2em] opacity-70">
                            <div className="flex justify-between">
                                <span>Itens</span>
                                <span>{formatBRL(order.items.reduce((acc: number, item: any) => acc + (item.quantity * parseFloat(item.price)), 0))}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Frete</span>
                                <span>{formatBRL(order.shipping_cost || 0)}</span>
                            </div>
                            <div className="border-t border-white/10 pt-6 flex justify-between items-end opacity-100">
                                <span className="text-brand-mel">Total Geral</span>
                                <span className="text-4xl font-black italic text-brand-mel tracking-tighter">{formatBRL(order.total_amount)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="bg-surface rounded-[2.5rem] border border-border p-10 shadow-sm">
                        <h2 className="text-xl font-black italic text-text-primary mb-6 tracking-tight flex items-center gap-3">
                            <MapPin size={20} className="text-brand-mel" /> Endereço de Entrega
                        </h2>
                        <div className="text-sm font-medium text-text-secondary leading-relaxed italic space-y-1">
                            <p className="font-bold text-text-primary not-italic uppercase text-[10px] tracking-widest mb-2 bg-brand-mel/10 inline-block px-3 py-1 rounded-lg">{order.shipping_method || 'Transportadora'}</p>
                            <p>{order.street}, {order.number}</p>
                            {order.complement && <p>{order.complement}</p>}
                            <p>{order.neighborhood}</p>
                            <p>{order.city} - {order.state}</p>
                            <p className="font-bold text-text-primary not-italic mt-2">CEP: {order.cep}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
