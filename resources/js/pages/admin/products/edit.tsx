import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminProducts } from '../../../modules/admin/hooks/useAdminProducts';
import { useAdminCategories } from '../../../modules/admin/hooks/useAdminCategories';
import httpClient from '../../../common/services/httpClient';
import { Save, ArrowLeft, Image as ImageIcon, Plus, Info, LayoutGrid, DollarSign, Database, FileText } from 'lucide-react';
import { adaptProduct } from '../../../modules/admin/models/ProductModel';

export default function AdminProductEdit() {
    const { id } = useParams(); // ID na verdade é o SLUG vindo da rota
    const navigate = useNavigate();
    const { handleUpdateProduct, handleToggleActive } = useAdminProducts();
    const { categories } = useAdminCategories();
    
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [productId, setProductId] = useState<number>(0);
    
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        price: '',
        stock: '0',
        category_id: '',
        is_active: true,
        remove_main_image: false
    });
    
    const [mainImage, setMainImage] = useState<File | null>(null);
    const [mainImagePreview, setMainImagePreview] = useState<string>('');
    const [existingCarouselImages, setExistingCarouselImages] = useState<any[]>([]);
    const [removedImages, setRemovedImages] = useState<number[]>([]);
    const [newCarouselImages, setNewCarouselImages] = useState<File[]>([]);
    const [newCarouselPreviews, setNewCarouselPreviews] = useState<string[]>([]);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const response = await httpClient.get(`/api/products/${id}`);
                const prod = adaptProduct(response.data.data);
                
                setProductId(prod.id);
                setFormData({
                    name: prod.name,
                    slug: prod.slug,
                    description: prod.description || '',
                    price: prod.price.toString(),
                    stock: prod.stock.toString(),
                    category_id: prod.categoryId.toString(),
                    is_active: prod.isActive,
                    remove_main_image: false
                });

                if (prod.imagePath) setMainImagePreview(prod.imagePath);
                if (prod.images) setExistingCarouselImages(prod.images);
            } catch (error) {
                alert('Erro ao carregar produto.');
                navigate('/admin');
            } finally {
                setFetching(false);
            }
        };
        loadProduct();
    }, [id, navigate]);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        setFormData({ ...formData, name, slug });
    };

    const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const file = e.target.files[0];
            setMainImage(file);
            setMainImagePreview(URL.createObjectURL(file));
            setFormData(prev => ({ ...prev, remove_main_image: false }));
        }
    };

    const handleNewCarouselImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setNewCarouselImages([...newCarouselImages, ...files]);
            const previews = files.map(file => URL.createObjectURL(file));
            setNewCarouselPreviews([...newCarouselPreviews, ...previews]);
        }
    };

    const removeExistingImage = (imageId: number) => {
        setExistingCarouselImages(prev => prev.filter(img => img.id !== imageId));
        setRemovedImages(prev => [...prev, imageId]);
    };

    const removeNewImage = (index: number) => {
        setNewCarouselImages(prev => prev.filter((_, i) => i !== index));
        setNewCarouselPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await handleUpdateProduct(productId, formData, mainImage, newCarouselImages, removedImages);
            navigate('/admin');
        } catch (error: any) {
            let errorMessage = 'Erro ao atualizar produto.';
            if (error.response?.data?.errors) {
                errorMessage = Object.values(error.response.data.errors).flat().join('\n');
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const removeMainImage = () => {
        setMainImage(null);
        setMainImagePreview('');
        setFormData(prev => ({ ...prev, remove_main_image: true }));
        const fileInput = document.getElementById('mainImage') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
    };

    if (fetching) return <div className="p-20 text-center"><div className="w-10 h-10 border-4 border-brand-mel border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><span className="text-text-secondary font-medium">Buscando informações...</span></div>;

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="flex items-center gap-4 mb-10">
                <button 
                    onClick={() => navigate('/admin')} 
                    className="p-3 bg-surface border border-border rounded-xl hover:bg-bg-main text-text-secondary hover:text-brand-mel transition-all shadow-sm"
                >
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-3xl font-bold italic text-text-primary mb-1">Editar Produto</h1>
                    <p className="text-sm text-text-secondary">Atualizando: <span className="font-bold text-brand-mel">{formData.name}</span></p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
                <div className="bg-surface p-12 rounded-[2.5rem] shadow-2xl border border-border">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-8 bg-brand-mel/10 text-brand-mel rounded-lg flex items-center justify-center">
                            <Info size={18} />
                        </div>
                        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-brand-mel">Informações Básicas</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div className="space-y-2">
                            <label className="block text-[10px] uppercase font-black text-text-secondary tracking-[0.15em] ml-1">Nome do Produto *</label>
                            <input 
                                type="text" 
                                required 
                                value={formData.name} 
                                onChange={handleNameChange} 
                                className="w-full px-5 py-4 bg-bg-main border border-border rounded-xl focus:outline-none focus:border-brand-mel focus:ring-4 focus:ring-brand-mel/10 transition-all font-medium text-sm text-text-primary" 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-[10px] uppercase font-black text-text-secondary tracking-[0.15em] ml-1">URL amigável (Slug) *</label>
                            <input 
                                type="text" 
                                required 
                                value={formData.slug} 
                                onChange={(e) => setFormData({...formData, slug: e.target.value})} 
                                className="w-full px-5 py-4 bg-bg-main/50 border border-border rounded-xl focus:outline-none focus:border-brand-mel transition-all font-medium text-sm text-text-secondary italic" 
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        <div className="space-y-2">
                            <label className="block text-[10px] uppercase font-black text-text-secondary tracking-[0.15em] ml-1 flex items-center gap-2">
                                <LayoutGrid size={12} /> Categoria *
                            </label>
                            <div className="relative">
                                <select 
                                    required 
                                    value={formData.category_id} 
                                    onChange={(e) => setFormData({...formData, category_id: e.target.value})} 
                                    className="w-full pl-6 pr-12 py-5 bg-bg-main border border-border rounded-2xl focus:outline-none focus:border-brand-mel focus:ring-8 focus:ring-brand-mel/5 transition-all font-bold text-sm text-text-primary appearance-none cursor-pointer"
                                >
                                    <option value="">Selecione...</option>
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary">
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-[10px] uppercase font-black text-text-secondary tracking-[0.15em] ml-1 flex items-center gap-2">
                                <DollarSign size={12} /> Preço (R$) *
                            </label>
                            <input 
                                type="number" 
                                step="0.01" 
                                required 
                                value={formData.price} 
                                onChange={(e) => setFormData({...formData, price: e.target.value})} 
                                onBlur={(e) => {
                                    if (e.target.value) {
                                        setFormData({...formData, price: Number(e.target.value).toFixed(2)});
                                    }
                                }}
                                className="w-full px-5 py-4 bg-bg-main border border-border rounded-xl focus:outline-none focus:border-brand-mel transition-all font-medium text-sm text-text-primary" 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-[10px] uppercase font-black text-text-secondary tracking-[0.15em] ml-1 flex items-center gap-2">
                                <Database size={12} /> Estoque Atual *
                            </label>
                            <input 
                                type="number" 
                                required 
                                value={formData.stock} 
                                onChange={(e) => setFormData({...formData, stock: e.target.value})} 
                                className="w-full px-5 py-4 bg-bg-main border border-border rounded-xl focus:outline-none focus:border-brand-mel transition-all font-medium text-sm text-text-primary" 
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-[10px] uppercase font-black text-text-secondary tracking-[0.15em] ml-1 flex items-center gap-2">
                            <FileText size={12} /> Descrição Detalhada
                        </label>
                        <textarea 
                            rows={5} 
                            value={formData.description} 
                            onChange={(e) => setFormData({...formData, description: e.target.value})} 
                            className="w-full px-5 py-4 bg-bg-main border border-border rounded-xl focus:outline-none focus:border-brand-mel transition-all font-medium text-sm text-text-primary resize-none"
                        ></textarea>
                    </div>
                </div>

                <div className="bg-surface p-12 rounded-[2.5rem] shadow-2xl border border-border">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-8 bg-brand-mel/10 text-brand-mel rounded-lg flex items-center justify-center">
                            <ImageIcon size={18} />
                        </div>
                        <h2 className="text-sm font-black uppercase tracking-[0.2em] text-brand-mel">Galeria de Imagens</h2>
                    </div>

                    <div className="mb-10">
                        <label className="block text-[10px] uppercase font-black text-text-secondary tracking-[0.15em] mb-4 ml-1">Imagem de Capa (Principal)</label>
                        <div className="flex flex-col md:flex-row items-center gap-8 p-6 bg-bg-main/50 rounded-2xl border-2 border-dashed border-border group hover:border-brand-mel/50 transition-colors">
                            <div className="w-40 h-40 bg-bg-main rounded-xl flex items-center justify-center overflow-hidden shadow-inner border border-border group-hover:scale-105 transition-transform duration-500">
                                {mainImagePreview ? <img src={mainImagePreview} className="w-full h-full object-contain p-2" /> : <ImageIcon className="text-text-secondary/20" size={48} />}
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <p className="text-sm font-bold text-text-primary mb-1">Altere a imagem principal do produto</p>
                                <p className="text-xs text-text-secondary mb-4">PNG, JPG ou WEBP de até 2MB</p>
                                <input type="file" id="mainImage" accept="image/*" className="hidden" onChange={handleMainImageChange} />
                                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                    <label htmlFor="mainImage" className="cursor-pointer px-6 py-2.5 bg-brand-mel text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-brand-gold transition-all shadow-md shadow-brand-mel/10">Alterar Imagem</label>
                                    {mainImagePreview && (
                                        <button type="button" onClick={removeMainImage} className="px-6 py-2.5 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-red-500 hover:text-white transition-all">Remover</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] uppercase font-black text-text-secondary tracking-[0.15em] mb-4 ml-1">Imagens do Carrossel</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {existingCarouselImages.map(img => (
                                <div key={`old-${img.id}`} className="relative aspect-square bg-bg-main rounded-xl overflow-hidden group border border-border">
                                    <img src={img.path} className="w-full h-full object-contain p-1 transition-transform duration-500 group-hover:scale-110" />
                                    <button 
                                        type="button" 
                                        onClick={() => removeExistingImage(img.id)} 
                                        className="absolute inset-0 bg-red-500/90 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 font-black text-[10px] uppercase tracking-tighter"
                                    >
                                        <Plus className="rotate-45 mb-1" size={24} />
                                        Remover
                                    </button>
                                </div>
                            ))}
                            {newCarouselPreviews.map((preview, index) => (
                                <div key={`new-${index}`} className="relative aspect-square bg-bg-main rounded-xl overflow-hidden group border-2 border-brand-mel shadow-lg shadow-brand-mel/10">
                                    <img src={preview} className="w-full h-full object-contain p-1 transition-transform duration-500 group-hover:scale-110" />
                                    <button 
                                        type="button" 
                                        onClick={() => removeNewImage(index)} 
                                        className="absolute inset-0 bg-red-500/90 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 font-black text-[10px] uppercase tracking-tighter"
                                    >
                                        <Plus className="rotate-45 mb-1" size={24} />
                                        Remover
                                    </button>
                                </div>
                            ))}
                            <label className="aspect-square bg-bg-main border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-brand-mel hover:bg-brand-mel/5 hover:text-brand-mel transition-all text-text-secondary group">
                                <Plus size={32} className="mb-2 group-hover:scale-125 transition-transform" />
                                <span className="text-[10px] uppercase font-black tracking-widest">Adicionar</span>
                                <input type="file" multiple accept="image/*" className="hidden" onChange={handleNewCarouselImagesChange} />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between bg-surface p-8 rounded-2xl shadow-xl border border-border sticky bottom-8 z-10">
                    <div className="hidden md:block">
                        <p className="text-xs font-bold text-text-secondary">As alterações entram em vigor imediatamente após salvar.</p>
                    </div>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <button 
                            type="button" 
                            onClick={() => navigate('/admin')}
                            className="flex-1 md:flex-none px-8 py-4 border border-border text-text-secondary rounded-xl text-xs uppercase tracking-widest font-black hover:bg-bg-main transition-all"
                        >
                            Voltar
                        </button>
                        <button 
                            type="submit" 
                            disabled={loading} 
                            className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-brand-mel text-white px-10 py-4 rounded-xl text-xs uppercase tracking-widest font-black hover:bg-brand-gold disabled:opacity-50 transition-all shadow-lg shadow-brand-mel/20 active:scale-95"
                        >
                            <Save size={18} /> {loading ? 'Salvando...' : 'Salvar Alterações'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
