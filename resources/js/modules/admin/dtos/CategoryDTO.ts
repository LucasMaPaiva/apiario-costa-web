export interface CategoryCreateDTO {
    name: string;
    slug: string;
}

/**
 * Prepara os dados para envio ao Backend
 */
export const transformCategoryToDTO = (data: { name: string; slug: string }): CategoryCreateDTO => {
    return {
        name: data.name,
        slug: data.slug,
    };
};
