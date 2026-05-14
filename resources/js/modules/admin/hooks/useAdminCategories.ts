import { useState, useEffect } from 'react';
import { fetchAdminCategories, createCategory, deleteCategory } from '../services/adminCategoryService';
import { adaptCategory, Category } from '../models/CategoryModel';
import { transformCategoryToDTO } from '../dtos/CategoryDTO';

export const useAdminCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadCategories = async () => {
        setLoading(true);
        try {
            const data = await fetchAdminCategories();
            setCategories(data.map(adaptCategory));
        } catch (err) {
            setError('Erro ao carregar categorias.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const handleCreateCategory = async (name: string, slug: string) => {
        const dto = transformCategoryToDTO({ name, slug });
        const response = await createCategory(dto);
        const newCategory = adaptCategory(response.data);
        setCategories(prev => [...prev, newCategory]);
        return newCategory;
    };

    const handleDeleteCategory = async (id: number) => {
        await deleteCategory(id);
        setCategories(prev => prev.filter(c => c.id !== id));
    };

    return {
        categories,
        loading,
        error,
        handleCreateCategory,
        handleDeleteCategory,
        reload: loadCategories
    };
};
