import httpClient from '../../../common/services/httpClient';

export const fetchAdminProducts = async (params: any = {}) => {
    const response = await httpClient.get('/api/admin/products', { params });
    // Agora o backend retorna a estrutura paginada dentro de response.data.data
    return response.data.data;
};

export const createProduct = async (formData: FormData) => {
    const response = await httpClient.post('/api/admin/products', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const updateProduct = async (id: number, formData: FormData) => {
    // Laravel requires POST with _method=PUT to handle multipart/form-data properly
    formData.append('_method', 'PUT');
    const response = await httpClient.post(`/api/admin/products/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const deleteProduct = async (id: number) => {
    const response = await httpClient.delete(`/api/admin/products/${id}`);
    return response.data;
};

export const toggleProductActive = async (id: number) => {
    const response = await httpClient.patch(`/api/admin/products/${id}/toggle-active`);
    return response.data;
};
