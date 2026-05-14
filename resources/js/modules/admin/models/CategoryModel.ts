export interface Category {
    id: number;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * Adapta a resposta da API (Snake Case) para o modelo do Frontend (Camel Case)
 */
export const adaptCategory = (data: any): Category => {
    return {
        id: data.id,
        name: data.name,
        slug: data.slug,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
    };
};
