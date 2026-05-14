import httpClient from '../../../common/services/httpClient';

export const fetchAdminOrders = async (params: any = {}) => {
    const response = await httpClient.get('/api/admin/orders', { params });
    return response.data;
};

export const updateOrderStatus = async (id: number, status: string, payment_status?: string) => {
    const response = await httpClient.patch(`/api/admin/orders/${id}/status`, { 
        status, 
        payment_status: payment_status 
    });
    return response.data;
};
