import httpClient from '../../../common/services/httpClient';

export interface OrderData {
    items: Array<{
        product_id: number;
        quantity: number;
    }>;
    delivery_method: 'delivery' | 'pickup';
    cep?: string;
    street?: string;
    number?: string;
    complement?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    shipping_method?: string;
    shipping_cost?: number;
}

export const createOrder = async (order_data: OrderData) => {
    const response = await httpClient.post('/api/orders', order_data);
    return response.data.data;
};

export const fetchUserOrders = async () => {
    const response = await httpClient.get('/api/orders');
    return response.data.data;
};

export const calculateShipping = async (cep: string, items: any[]) => {
    const response = await httpClient.post('/api/shipping/calculate', { cep, items });
    return response.data.data;
};

export const fetchStoreAddress = async () => {
    const response = await httpClient.get('/api/store-address');
    return response.data.data;
};

export const createPaymentPreference = async (order_id: number): Promise<{ preference_id: string; checkout_url: string }> => {
    const response = await httpClient.post('/api/payments/preference', { order_id });
    return response.data.data;
};
