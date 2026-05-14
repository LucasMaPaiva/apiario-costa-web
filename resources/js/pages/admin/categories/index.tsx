import React, { useState } from 'react';
import { Plus, Trash2, Tag, LayoutGrid, Info, ListTree, PackageOpen } from 'lucide-react';
import { useAdminCategories } from '../../../modules/admin/hooks/useAdminCategories';

export default function AdminCategoriesList() {
    const { categories, loading, handleCreateCategory, handleDeleteCategory } = useAdminCategories();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategorySlug, setNewCategorySlug] = useState('');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        setNewCategoryName(name);
        setNewCategorySlug(slug);
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategoryName || !newCategorySlug) return;
        
        setIsSubmitting(true);
        try {
            await handleCreateCategory(newCategoryName, newCategorySlug);
            setNewCategoryName('');
            setNewCategorySlug('');
        } catch (error: any) {
            let errorMessage = 'Erro ao criar categoria.';
            if (error.response?.data?.errors) {
                errorMessage = Object.values(error.response.data.errors).flat().join('\n');
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            alert(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const onDelete = async (id: number) => {
        if (!confirm('Tem certeza que deseja excluir esta categoria?')) return;
        try {
            await handleDeleteCategory(id);
        } catch (error: any) {
            let errorMessage = 'Erro ao excluir categoria.';
            if (error.response?.data?.errors) {
                errorMessage = Object.values(error.response.data.errors).flat().join('\n');
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }
            alert(errorMessage);
        }
    };

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-5xl font-black italic text-text-primary tracking-tight mb-2">Categorias</h1>
                <p className="text-sm text-text-secondary">Estruture seu catálogo organizando os produtos em grupos lógicos.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-1">
                    <form onSubmit={handleCreate} className="bg-surface p-10 rounded-[2.5rem] shadow-2xl border border-border sticky top-10">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-12 h-12 bg-brand-mel/10 text-brand-mel rounded-2xl flex items-center justify-center shadow-inner">
                                <Plus size={24} />
                            </div>
                            <h2 className="text-sm font-black uppercase tracking-[0.25em] text-brand-mel">Nova Categoria</h2>
                        </div>

                        <div className="space-y-8 mb-10">
                            <div className="space-y-3">
                                <label className="block text-[10px] uppercase font-black text-text-secondary tracking-[0.2em] ml-2">Nome da Categoria *</label>
                                <input
                                    type="text"
                                    required
                                    value={newCategoryName}
                                    onChange={handleNameChange}
                                    className="w-full px-6 py-5 bg-bg-main border border-border rounded-2xl focus:outline-none focus:border-brand-mel focus:ring-8 focus:ring-brand-mel/5 transition-all font-bold text-sm text-text-primary"
                                    placeholder="Ex: Mel Silvestre"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="block text-[10px] uppercase font-black text-text-secondary tracking-[0.2em] ml-2">URL amigável (Slug) *</label>
                                <input
                                    type="text"
                                    required
                                    value={newCategorySlug}
                                    onChange={(e) => setNewCategorySlug(e.target.value)}
                                    className="w-full px-6 py-5 bg-bg-main/50 border border-border rounded-2xl focus:outline-none focus:border-brand-mel transition-all font-bold text-sm text-text-secondary italic"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex justify-center items-center gap-4 bg-brand-mel text-white px-8 py-5 rounded-2xl text-xs uppercase tracking-[0.2em] font-black hover:bg-brand-gold transition-all shadow-2xl shadow-brand-mel/30 disabled:opacity-50 active:scale-95 group"
                        >
                            {isSubmitting ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <><Plus size={20} className="group-hover:rotate-90 transition-transform duration-500" /> Criar Categoria</>
                            )}
                        </button>
                    </form>
                </div>

                <div className="lg:col-span-2">
                    <div className="bg-surface rounded-[2.5rem] shadow-2xl border border-border overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-bg-main/50 border-b border-border text-[10px] uppercase tracking-[0.3em] text-text-secondary font-black">
                                    <th className="p-8">Identificação</th>
                                    <th className="p-8">Slug / URL</th>
                                    <th className="p-8 text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {loading ? (
                                    <tr>
                                        <td colSpan={3} className="p-32 text-center text-text-secondary">
                                            <div className="flex flex-col items-center gap-6">
                                                <div className="w-12 h-12 border-[6px] border-brand-mel border-t-transparent rounded-full animate-spin"></div>
                                                <span className="font-black uppercase tracking-widest text-xs">Carregando Categorias...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : categories.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="p-32 text-center text-text-secondary">
                                            <div className="flex flex-col items-center gap-4 opacity-20">
                                                <ListTree size={64} />
                                                <span className="font-bold">Nenhuma categoria cadastrada.</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    categories.map((category) => (
                                        <tr key={category.id} className="hover:bg-bg-main/30 transition-all duration-300 group">
                                            <td className="p-8">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-14 h-14 bg-brand-mel/5 text-brand-mel rounded-2xl flex items-center justify-center border border-brand-mel/10 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                                        <Tag size={22} />
                                                    </div>
                                                    <span className="font-black text-text-primary text-xl tracking-tight">{category.name}</span>
                                                </div>
                                            </td>
                                            <td className="p-8">
                                                <span className="text-xs text-text-secondary font-mono bg-bg-main px-4 py-2 rounded-xl border border-border shadow-sm">
                                                    /{category.slug}
                                                </span>
                                            </td>
                                            <td className="p-8 text-right">
                                                <button
                                                    onClick={() => onDelete(category.id)}
                                                    className="p-4 text-text-secondary hover:text-red-500 border border-border hover:border-red-500 hover:bg-red-500/5 rounded-2xl transition-all duration-500 shadow-sm hover:shadow-red-500/10"
                                                    title="Excluir"
                                                >
                                                    <Trash2 size={22} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
