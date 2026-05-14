import { Category, adaptCategory } from './CategoryModel';

export interface ProductImage {
    id: number;
    path: string;
    isMain: boolean;
    order: number;
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    price: number;
    stock: number;
    imagePath: string | null;
    isActive: boolean;
    categoryId: number;
    category?: Category;
    images?: ProductImage[];
    createdAt: string;
    updatedAt: string;
}

export const adaptProduct = (data: any): Product => {
    return {
        id: data.id,
        name: data.name,
        slug: data.slug,
        description: data.description,
        price: data.price,
        stock: data.stock,
        imagePath: data.image_path,
        isActive: data.is_active,
        categoryId: data.category_id,
        category: data.category ? adaptCategory(data.category) : undefined,
        images: data.images?.map((img: any) => ({
            id: img.id,
            path: img.path,
            isMain: img.is_main,
            order: img.order
        })),
        createdAt: data.created_at,
        updatedAt: data.updated_at,
    };
};
