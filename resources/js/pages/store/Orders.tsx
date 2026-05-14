import React, { useEffect, useState } from 'react';
import { ShoppingBag, Package, Clock, ChevronRight, ExternalLink } from 'lucide-react';
import { fetchUserOrders } from '../../modules/orders/services/orderService';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { formatBRL } from '../../common/utils/formatBRL';

export default function MyOrders() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const loadOrders = async () => {
        try {
            const data = await fetchUserOrders();
            setOrders(data);
        } catch (error) {
            console.error('Failed to load orders:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const getStatusColor = (status: string) => {
        const colors: any = {
            'pending': 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
            'processing': 'bg-blue-500/10 text-blue-600 border-blue-500/20',
            'shipped': 'bg-brand-mel/10 text-brand-mel border-brand-mel/20',
            'delivered': 'bg-green-500/10 text-green-600 border-green-500/20',
            'cancelled': 'bg-red-500/10 text-red-600 border-red-500/20',
        };
        return colors[status] || 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    };

    const getStatusLabel = (status: string) => {
        const labels: any = {
            'pending': 'Pendente',
            'processing': 'Preparando',
            'shipped': 'Enviado',
            'delivered': 'Entregue',
            'cancelled': 'Cancelado',
        };
        return labels[status] || status;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-bg-main pt-32 pb-20 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-brand-mel border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-xs font-black uppercase tracking-widest text-text-secondary">Carregando seus pedidos...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bg-main pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="mb-12">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-12 bg-brand-dark text-brand-mel rounded-2xl flex items-center justify-center shadow-lg">
                            <ShoppingBag size={24} />
                        </div>
                        <h1 className="text-4xl font-black italic text-text-primary tracking-tighter">Meus Pedidos</h1>
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-text-secondary font-bold">Acompanhe suas compras e entregas</p>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-surface p-16 rounded-[2.5rem] border border-border text-center shadow-sm">
                        <div className="w-20 h-20 bg-bg-main rounded-full flex items-center justify-center mx-auto mb-6 text-text-secondary opacity-30">
                            <Package size={40} />
                        </div>
                        <h2 className="text-2xl font-black italic text-text-primary mb-4 tracking-tight">Nenhum pedido ainda</h2>
                        <p className="text-text-secondary mb-10 italic max-w-xs mx-auto">Você ainda não realizou nenhuma compra em nossa loja.</p>
                        <Link 
                            to="/loja" 
                            className="inline-block py-4 px-10 bg-brand-mel text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-brand-gold transition-all shadow-xl shadow-brand-mel/20"
                        >
                            Ir para a Loja
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={order.id} 
                                className="bg-surface rounded-[2rem] border border-border overflow-hidden shadow-sm hover:shadow-xl hover:shadow-brand-mel/5 transition-all group"
                            >
                                <div className="p-8">
                                    <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-bg-main rounded-xl flex items-center justify-center text-text-secondary group-hover:text-brand-mel transition-colors">
                                                <Clock size={20} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Pedido #{order.id}</p>
                                                <p className="text-sm font-bold text-text-primary italic">{new Date(order.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                                            </div>
                                        </div>

                                        <div className={`px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${getStatusColor(order.status)}`}>
                                            {getStatusLabel(order.status)}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-end justify-between gap-6 border-t border-border pt-8">
                                        <div className="flex -space-x-3">
                                            {order.items.slice(0, 3).map((item: any, idx: number) => (
                                                <div key={idx} className="w-12 h-12 rounded-xl bg-bg-main border-2 border-surface overflow-hidden shadow-sm">
                                                    <img 
                                                        src={item.product.image_url || '/placeholder.jpg'} 
                                                        alt={item.product.name} 
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ))}
                                            {order.items.length > 3 && (
                                                <div className="w-12 h-12 rounded-xl bg-brand-dark text-brand-mel flex items-center justify-center text-xs font-black border-2 border-surface shadow-sm">
                                                    +{order.items.length - 3}
                                                </div>
                                            )}
                                        </div>

                                        <div className="text-right">
                                            <div className="space-y-1 mb-4 opacity-60">
                                                <p className="text-[9px] font-bold uppercase tracking-widest">Produtos: {formatBRL(order.items.reduce((acc: number, item: any) => acc + (item.quantity * parseFloat(item.price)), 0))}</p>
                                                <p className="text-[9px] font-bold uppercase tracking-widest">Frete: {formatBRL(order.shipping_cost || 0)}</p>
                                            </div>
                                            <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-1">Total do Pedido</p>
                                            <p className="text-3xl font-black italic text-brand-mel tracking-tighter">{formatBRL(order.total_amount)}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-bg-main px-8 py-4 flex justify-between items-center border-t border-border">
                                    <div className="flex items-center gap-2">
                                        {order.tracking_code && (
                                            <a 
                                                href={`https://melhorenvio.com.br/rastreio/${order.tracking_code}`} 
                                                target="_blank" 
                                                className="flex items-center gap-2 text-[10px] font-black text-brand-wine hover:text-brand-mel uppercase tracking-widest transition-colors"
                                            >
                                                <ExternalLink size={14} /> Rastrear Entrega
                                            </a>
                                        )}
                                    </div>
                                    <Link 
                                        to={`/meus-pedidos/${order.id}`}
                                        className="flex items-center gap-2 text-[10px] font-black text-text-secondary hover:text-brand-mel uppercase tracking-widest transition-colors"
                                    >
                                        Ver Detalhes <ChevronRight size={14} />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
