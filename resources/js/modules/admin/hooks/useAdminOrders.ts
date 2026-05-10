import { useState, useEffect } from 'react';
import { fetchAdminOrders, updateOrderStatus } from '../services/adminOrderService';

export const useAdminOrders = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState<any>(null);

    const loadOrders = async (page: number = 1) => {
        setLoading(true);
        try {
            const response = await fetchAdminOrders({ page });
            setOrders(response.data.data);
            setPagination({
                current_page: response.data.current_page,
                last_page: response.data.last_page,
                total: response.data.total
            });
        } catch (error) {
            console.error('Failed to load orders', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const handleUpdateStatus = async (id: number, status: string, payment_status?: string) => {
        await updateOrderStatus(id, status, payment_status);
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status, payment_status: payment_status || o.payment_status } : o));
    };

    return {
        orders,
        loading,
        pagination,
        loadOrders,
        handleUpdateStatus
    };
};
