import React from 'react';
import { useAdminOrders } from '../../../modules/admin/hooks/useAdminOrders';
import { ShoppingBag, User, Calendar, MapPin, Eye, ExternalLink } from 'lucide-react';

const status_colors: any = {
    'pending': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    'paid': 'bg-green-500/10 text-green-500 border-green-500/20',
    'shipped': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    'delivered': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    'cancelled': 'bg-red-500/10 text-red-500 border-red-500/20',
};

const status_labels: any = {
    'pending': 'Pendente',
    'paid': 'Pago',
    'shipped': 'Enviado',
    'delivered': 'Entregue',
    'cancelled': 'Cancelado',
};

export default function AdminOrdersList() {
    const { orders, loading, pagination, handleUpdateStatus } = useAdminOrders();

    if (loading) return <div className="p-20 text-center text-text-secondary">Carregando pedidos...</div>;

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-12 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold italic text-text-primary mb-2 text-glow">Gestão de Pedidos</h1>
                    <p className="text-sm text-text-secondary">Acompanhe e processe as vendas da Apiário Costa.</p>
                </div>
            </div>

            <div className="bg-surface rounded-[2.5rem] shadow-2xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/[0.02] border-b border-border">
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-text-secondary">ID / Data</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-text-secondary">Cliente</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-text-secondary">Total</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-text-secondary">Status</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-text-secondary">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-white/[0.01] transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-brand-mel/10 text-brand-mel rounded-xl flex items-center justify-center font-bold text-xs">
                                                #{order.id}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                                                    <Calendar size={12} />
                                                    {new Date(order.created_at).toLocaleDateString('pt-BR')}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-text-primary">{order.user?.name}</span>
                                            <span className="text-[10px] text-text-secondary flex items-center gap-1">
                                                <MapPin size={10} /> {order.city} - {order.state}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-sm font-black text-brand-mel">
                                            R$ {Number(order.total_amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${status_colors[order.status] || 'bg-gray-500/10 text-gray-500'}`}>
                                            {status_labels[order.status] || order.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <button 
                                                title="Ver Detalhes"
                                                className="p-2.5 bg-bg-main border border-border rounded-lg text-text-secondary hover:text-brand-mel transition-all"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <select 
                                                value={order.status}
                                                onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                                                className="bg-bg-main border border-border rounded-lg px-2 py-2 text-[10px] font-bold text-text-primary focus:outline-none focus:border-brand-mel cursor-pointer"
                                            >
                                                {Object.entries(status_labels).map(([val, label]: any) => (
                                                    <option key={val} value={val}>{label}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {orders.length === 0 && (
                    <div className="p-20 text-center">
                        <ShoppingBag size={48} className="mx-auto mb-4 text-text-secondary/20" />
                        <p className="text-text-secondary font-medium">Nenhum pedido encontrado.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
