export interface Category {
    id: number;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
}

/**
 * Adapta a resposta da API (Snake Case) para o modelo do Frontend (Snake Case)
 */
export const adaptCategory = (data: any): Category => {
    return {
        id: data.id,
        name: data.name,
        slug: data.slug,
        created_at: data.created_at,
        updated_at: data.updated_at,
    };
};
