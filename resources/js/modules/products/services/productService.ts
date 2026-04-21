import httpClient from '../../../common/services/httpClient';

export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    image_path: string | null;
    stock: number;
    category?: {
        name: string;
        slug: string;
    };
}

export const fetchProducts = async (): Promise<Product[]> => {
    const response = await httpClient.get('/api/products');
    return response.data.data;
};

export const fetchProductBySlug = async (slug: string): Promise<Product> => {
    const response = await httpClient.get(`/api/products/${slug}`);
    return response.data.data;
};
