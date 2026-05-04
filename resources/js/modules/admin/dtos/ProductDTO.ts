export interface ProductFormState {
    name: string;
    slug: string;
    description: string;
    price: string;
    stock: string;
    category_id: string;
    is_active: boolean;
    remove_main_image?: boolean;
}

/**
 * Transforma o estado do formulário e arquivos em FormData para envio
 */
export const transformProductToFormData = (
    state: ProductFormState, 
    mainImage: File | null, 
    carouselImages: File[], 
    removedImages: number[] = []
): FormData => {
    const formData = new FormData();
    
    // Campos básicos
    Object.entries(state).forEach(([key, value]) => {
        if (value === undefined) return;
        if (typeof value === 'boolean') {
            formData.append(key, value ? '1' : '0');
        } else {
            formData.append(key, value.toString());
        }
    });

    // Imagem principal
    if (mainImage) {
        formData.append('main_image', mainImage);
    }

    // Carrossel
    carouselImages.forEach((img) => {
        formData.append('carousel_images[]', img);
    });

    // Imagens removidas (apenas no update)
    removedImages.forEach((id) => {
        formData.append('removed_images[]', id.toString());
    });

    return formData;
};
