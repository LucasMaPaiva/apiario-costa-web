import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, EyeOff, Search, ChevronLeft, ChevronRight, PackageOpen, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useAdminProducts } from '../../modules/admin/hooks/useAdminProducts';
import { useAdminCategories } from '../../modules/admin/hooks/useAdminCategories';

export default function AdminProductsList() {
    const { products, loading, pagination, filters, updateFilters, goToPage, handleToggleActive, handleDeleteProduct } = useAdminProducts();
    const { categories } = useAdminCategories();

    const onDelete = async (id: number) => {
        if (!confirm('Tem certeza que deseja excluir este produto?')) return;
        try {
            await handleDeleteProduct(id);
        } catch (error) {
            alert('Erro ao excluir produto.');
        }
    };

    // Cálculo simples de ativos para o card de estatística
    const activeProductsCount = products.filter(p => p.isActive).length;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <div className="flex items-center gap-2 text-brand-mel mb-2">
                        <TrendingUp size={16} />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Painel de Controle</span>
                    </div>
                    <h1 className="text-5xl font-black italic text-text-primary tracking-tight">Produtos</h1>
                </div>
                <Link
                    to="/admin/produtos/novo"
                    className="flex items-center gap-3 bg-brand-mel text-white px-8 py-4 rounded-2xl text-xs uppercase tracking-[0.2em] font-black hover:bg-brand-gold transition-all duration-300 shadow-xl shadow-brand-mel/20 active:scale-95 group"
                >
                    <Plus size={20} className="group-hover:rotate-90 transition-transform duration-500" />
                    Novo Produto
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-surface p-6 rounded-[2rem] border border-border shadow-sm">
                    <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-1">Total no Catálogo</p>
                    <p className="text-3xl font-black text-text-primary">{pagination?.total || 0}</p>
                </div>
                <div className="bg-surface p-6 rounded-[2rem] border border-border shadow-sm">
                    <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-1">Categorias</p>
                    <p className="text-3xl font-black text-text-primary">{categories.length}</p>
                </div>
                <div className="bg-surface p-6 rounded-[2rem] border border-border shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest mb-1">Produtos Ativos</p>
                        <p className="text-3xl font-black text-emerald-500">{activeProductsCount}</p>
                    </div>
                    <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center">
                        <CheckCircle2 size={24} />
                    </div>
                </div>
            </div>

            {/* Filtros Melhores */}
            <div className="bg-surface p-4 rounded-[2rem] border border-border shadow-sm flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-brand-mel transition-colors" size={20} />
                    <input 
                        type="text" 
                        placeholder="Pesquisar por nome do produto..." 
                        value={filters.search}
                        onChange={(e) => updateFilters({ search: e.target.value })}
                        className="w-full pl-14 pr-6 py-4 bg-bg-main/50 border border-border rounded-xl focus:outline-none focus:border-brand-mel focus:ring-4 focus:ring-brand-mel/5 transition-all text-sm text-text-primary font-bold placeholder:text-text-secondary/50"
                    />
                </div>
                <div className="w-full md:w-64 relative">
                    <select 
                        value={filters.category_id}
                        onChange={(e) => updateFilters({ category_id: e.target.value })}
                        className="w-full pl-6 pr-12 py-4 bg-bg-main/50 border border-border rounded-xl focus:outline-none focus:border-brand-mel focus:ring-4 focus:ring-brand-mel/5 transition-all text-sm text-text-primary font-bold appearance-none cursor-pointer"
                    >
                        <option value="">Todas as Categorias</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                    </div>
                </div>
                <div className="w-full md:w-48 relative">
                    <select 
                        value={filters.status}
                        onChange={(e) => updateFilters({ status: e.target.value })}
                        className="w-full pl-6 pr-12 py-4 bg-bg-main/50 border border-border rounded-xl focus:outline-none focus:border-brand-mel focus:ring-4 focus:ring-brand-mel/5 transition-all text-sm text-text-primary font-bold appearance-none cursor-pointer"
                    >
                        <option value="">Todos Status</option>
                        <option value="true">Ativos</option>
                        <option value="false">Inativos</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                    </div>
                </div>
            </div>

            <div className="bg-surface rounded-[2.5rem] shadow-2xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-bg-main/30 border-b border-border text-[10px] uppercase tracking-[0.3em] text-text-secondary font-black">
                                <th className="p-8">Produto</th>
                                <th className="p-8">Categoria</th>
                                <th className="p-8 text-center">Preço</th>
                                <th className="p-8 text-center">Estoque</th>
                                <th className="p-8 text-center">Status</th>
                                <th className="p-8 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {loading ? (
                                <tr><td colSpan={6} className="p-32 text-center text-text-secondary"><div className="flex flex-col items-center gap-6"><div className="w-12 h-12 border-[6px] border-brand-mel border-t-transparent rounded-full animate-spin"></div><span className="font-black uppercase tracking-widest text-xs">Sincronizando Dados...</span></div></td></tr>
                            ) : products.length === 0 ? (
                                <tr><td colSpan={6} className="p-32 text-center text-text-secondary"><div className="flex flex-col items-center gap-4 opacity-20"><PackageOpen size={64} /><span className="font-bold">Nenhum produto encontrado.</span></div></td></tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product.id} className="hover:bg-bg-main/30 transition-all duration-300 group">
                                        <td className="p-8">
                                            <div className="flex items-center gap-6">
                                                <div className="w-20 h-20 rounded-2xl bg-bg-main border border-border flex items-center justify-center overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-500">
                                                    {product.imagePath ? (
                                                        <img src={product.imagePath} alt={product.name} className="w-full h-full object-contain p-1" />
                                                    ) : (
                                                        <PackageOpen className="text-text-secondary/20" size={32} />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-black text-text-primary text-lg mb-1">{product.name}</p>
                                                    <p className="text-[10px] text-text-secondary uppercase tracking-[0.2em] font-black italic">Ref: #{product.id.toString().padStart(4, '0')}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-8">
                                            <span className="inline-block px-4 py-2 bg-brand-mel/5 text-brand-mel border border-brand-mel/10 rounded-xl text-[10px] font-black uppercase tracking-widest">
                                                {product.category?.name || 'Sem categoria'}
                                            </span>
                                        </td>
                                        <td className="p-8 text-center">
                                            <span className="font-black text-text-primary text-lg">R$ {Number(product.price).toFixed(2).replace('.', ',')}</span>
                                        </td>
                                        <td className="p-8 text-center">
                                            <div className={`inline-flex items-center justify-center min-w-[3rem] h-12 px-4 rounded-2xl text-sm font-black ${
                                                product.stock > 10 
                                                ? 'bg-emerald-500/10 text-emerald-500' 
                                                : product.stock > 0 
                                                ? 'bg-brand-mel/10 text-brand-mel' 
                                                : 'bg-red-500/10 text-red-500'
                                            }`}>
                                                {product.stock}
                                            </div>
                                        </td>
                                        <td className="p-8 text-center">
                                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.15em] ${
                                                product.isActive 
                                                ? 'bg-emerald-500/10 text-emerald-500' 
                                                : 'bg-slate-500/10 text-slate-500'
                                            }`}>
                                                <div className={`w-2 h-2 rounded-full ${product.isActive ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-500'}`} />
                                                {product.isActive ? 'Ativo' : 'Inativo'}
                                            </div>
                                        </td>
                                        <td className="p-8 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <button
                                                    onClick={() => handleToggleActive(product.id)}
                                                    className={`p-3 rounded-xl border transition-all duration-300 ${
                                                        product.isActive 
                                                        ? 'text-slate-400 border-border hover:text-slate-600 hover:bg-slate-50 dark:hover:bg-white/5' 
                                                        : 'text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/10'
                                                    }`}
                                                    title={product.isActive ? 'Desativar' : 'Ativar'}
                                                >
                                                    {product.isActive ? <EyeOff size={20} /> : <Eye size={20} />}
                                                </button>
                                                <Link
                                                    to={`/admin/produtos/${product.slug}/editar`}
                                                    className="p-3 text-text-secondary hover:text-brand-mel border border-border hover:border-brand-mel hover:bg-brand-mel/5 rounded-xl transition-all duration-300"
                                                    title="Editar"
                                                >
                                                    <Edit size={20} />
                                                </Link>
                                                <button
                                                    onClick={() => onDelete(product.id)}
                                                    className="p-3 text-text-secondary hover:text-red-500 border border-border hover:border-red-500 hover:bg-red-500/5 rounded-xl transition-all duration-300"
                                                    title="Excluir"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                
                {pagination && pagination.last_page > 1 && (
                    <div className="p-8 bg-bg-main/20 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-3 text-[10px] text-text-secondary font-black uppercase tracking-widest">
                            <span className="bg-surface px-4 py-2 rounded-xl border border-border shadow-sm">
                                Exibindo <span className="text-brand-mel">{(pagination.current_page - 1) * pagination.per_page + 1}</span> 
                                - <span className="text-brand-mel">{Math.min(pagination.current_page * pagination.per_page, pagination.total)}</span> 
                                de <span className="text-text-primary">{pagination.total}</span> itens
                            </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => goToPage(pagination.current_page - 1)}
                                disabled={pagination.current_page === 1}
                                className="w-12 h-12 flex items-center justify-center border border-border rounded-xl hover:bg-surface disabled:opacity-20 disabled:cursor-not-allowed transition-all hover:text-brand-mel group shadow-sm"
                                title="Anterior"
                            >
                                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            </button>
                            
                            <div className="flex items-center gap-1">
                                {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map(page => {
                                    // Lógica simples para não mostrar páginas demais se houver muitas
                                    if (
                                        page === 1 || 
                                        page === pagination.last_page || 
                                        (page >= pagination.current_page - 1 && page <= pagination.current_page + 1)
                                    ) {
                                        return (
                                            <button
                                                key={page}
                                                onClick={() => goToPage(page)}
                                                className={`w-12 h-12 rounded-xl border font-black text-[10px] transition-all duration-300 ${
                                                    pagination.current_page === page
                                                    ? 'bg-brand-mel border-brand-mel text-white shadow-lg shadow-brand-mel/20 scale-110'
                                                    : 'border-border bg-surface text-text-secondary hover:border-brand-mel hover:text-brand-mel'
                                                }`}
                                            >
                                                {page}
                                            </button>
                                        );
                                    }
                                    
                                    if (
                                        page === pagination.current_page - 2 || 
                                        page === pagination.current_page + 2
                                    ) {
                                        return <span key={page} className="px-2 text-text-secondary opacity-50">...</span>;
                                    }
                                    
                                    return null;
                                })}
                            </div>

                            <button 
                                onClick={() => goToPage(pagination.current_page + 1)}
                                disabled={pagination.current_page === pagination.last_page}
                                className="w-12 h-12 flex items-center justify-center border border-border rounded-xl hover:bg-surface disabled:opacity-20 disabled:cursor-not-allowed transition-all hover:text-brand-mel group shadow-sm"
                                title="Próxima"
                            >
                                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
