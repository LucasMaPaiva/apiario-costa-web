import { useState, useEffect } from 'react';
import { 
    fetchAdminProducts, 
    createProduct, 
    updateProduct, 
    deleteProduct, 
    toggleProductActive 
} from '../services/adminProductService';
import { adaptProduct, Product } from '../models/ProductModel';
import { transformProductToFormData, ProductFormState } from '../dtos/ProductDTO';

export interface PaginationMeta {
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
}

export const useAdminProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState<PaginationMeta | null>(null);
    const [filters, setFilters] = useState({
        search: '',
        category_id: '',
        status: ''
    });

    const loadProducts = async (page: number = 1, currentFilters = filters) => {
        setLoading(true);
        try {
            const data = await fetchAdminProducts({ page, ...currentFilters });
            setProducts(data.data.map(adaptProduct));
            setPagination(data.meta);
        } catch (err) {
            setError('Erro ao carregar produtos.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const updateFilters = (newFilters: Partial<typeof filters>) => {
        const merged = { ...filters, ...newFilters };
        setFilters(merged);
        loadProducts(1, merged);
    };

    const goToPage = (page: number) => {
        if (pagination && page >= 1 && page <= pagination.last_page) {
            loadProducts(page);
        }
    };

    const handleCreateProduct = async (state: ProductFormState, mainImage: File | null, carouselImages: File[]) => {
        const formData = transformProductToFormData(state, mainImage, carouselImages);
        const response = await createProduct(formData);
        return adaptProduct(response.data);
    };

    const handleUpdateProduct = async (id: number, state: ProductFormState, mainImage: File | null, carouselImages: File[], removedImages: number[]) => {
        const formData = transformProductToFormData(state, mainImage, carouselImages, removedImages);
        const response = await updateProduct(id, formData);
        return adaptProduct(response.data);
    };

    const handleDeleteProduct = async (id: number) => {
        await deleteProduct(id);
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    const handleToggleActive = async (id: number) => {
        await toggleProductActive(id);
        setProducts(prev => prev.map(p => 
            p.id === id ? { ...p, isActive: !p.isActive } : p
        ));
    };

    return {
        products,
        loading,
        error,
        pagination,
        filters,
        updateFilters,
        goToPage,
        handleCreateProduct,
        handleUpdateProduct,
        handleDeleteProduct,
        handleToggleActive,
        reload: loadProducts
    };
};
