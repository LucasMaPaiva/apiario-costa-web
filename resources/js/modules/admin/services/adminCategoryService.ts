import httpClient from '../../../common/services/httpClient';

export const fetchAdminCategories = async () => {
    const response = await httpClient.get('/api/admin/categories');
    return response.data.data;
};

export const createCategory = async (data: { name: string; slug: string }) => {
    const response = await httpClient.post('/api/admin/categories', data);
    return response.data;
};

export const deleteCategory = async (id: number) => {
    const response = await httpClient.delete(`/api/admin/categories/${id}`);
    return response.data;
};
