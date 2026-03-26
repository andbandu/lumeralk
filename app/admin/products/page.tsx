"use client";

import { useState } from "react";
import { Plus, Search, Filter, Edit, Trash2, ExternalLink, X, Save } from "@/components/Icons";
import Image from "next/image";
import Link from "next/link";
import { useProducts, Product } from "@/context/ProductContext";

export default function AdminProducts() {
    const { products, categories, addProduct, updateProduct, deleteProduct, uploadImage } = useProducts();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const [formData, setFormData] = useState<Partial<Product>>({
        name: "",
        code: "",
        slug: "",
        category: "Clothing",
        price: "LKR 0",
        stock: 0,
        image: "",
        gallery: ["", "", ""], // 3 additional images
        description: ""
    });

    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleOpenModal = (product?: Product) => {
        if (product) {
            setEditingProduct(product);
            setFormData(product);
        } else {
            setEditingProduct(null);
            setFormData({
                name: "",
                code: `LMR-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
                slug: "",
                category: categories[0]?.name || "General",
                price: "LKR 0",
                stock: 0,
                image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1964&auto=format&fit=crop",
                description: ""
            });
        }
        setIsModalOpen(true);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const publicUrl = await uploadImage(file, 'products');
            if (index === 0) {
                setFormData(prev => ({ ...prev, image: publicUrl }));
            } else {
                const newGallery = [...(formData.gallery || ["", "", ""])];
                newGallery[index - 1] = publicUrl;
                setFormData(prev => ({ ...prev, gallery: newGallery }));
            }
        } catch (err) {
            console.error("Upload failed");
        } finally {
            setIsUploading(false);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const slug = formData.name?.toLowerCase().replace(/\s+/g, '-') || "";
        
        if (editingProduct) {
            await updateProduct({
                ...formData,
                id: editingProduct.id,
                slug
            } as Product);
        } else {
            // New products let Supabase generate the ID
            const { id: _, ...newProductData } = formData as any;
            await addProduct({
                ...newProductData,
                slug
            });
        }
        handleCloseModal();
    };

    return (
        <div className="space-y-10 font-sans">
            {/* Professional Command Toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0 relative z-10">
                <div className="relative w-full md:w-96 group">
                    <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Search inventory..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 focus:outline-none focus:border-primary/30 text-xs font-bold uppercase tracking-wider transition-all"
                    />
                </div>
                
                <div className="flex items-center space-x-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center space-x-2 bg-white px-6 py-4 border border-slate-200 hover:bg-slate-50 transition-all text-[11px] uppercase tracking-wider font-bold cursor-pointer">
                        <Filter size={14} strokeWidth={2} />
                        <span>Filter Matrix</span>
                    </button>
                    
                    <button 
                        onClick={() => handleOpenModal()}
                        className="flex-1 md:flex-none group h-14 px-8 bg-primary text-white text-[11px] uppercase tracking-widest font-black transition-all hover:bg-slate-800 flex items-center justify-center shadow-md cursor-pointer"
                    >
                        <Plus size={16} className="mr-2" />
                        <span>Add Product</span>
                    </button>
                </div>
            </div>

            {/* Inventory Ledger View */}
            <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] uppercase tracking-widest font-bold text-slate-400 bg-slate-50 border-b border-slate-200">
                                <th className="px-8 py-5">Article Identity</th>
                                <th className="px-8 py-5">Ref Code</th>
                                <th className="px-8 py-5">Statement Price</th>
                                <th className="px-8 py-5">Availability</th>
                                <th className="px-8 py-5 text-right">Action Commands</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="group hover:bg-slate-50/30 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center space-x-5">
                                            <div className="relative h-16 w-14 bg-slate-100 overflow-hidden border border-slate-200 flex-shrink-0">
                                                <Image src={product.image} alt={product.name} fill className="object-cover" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-primary mb-1">{product.name}</h3>
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-[10px] font-bold text-slate-400 continental uppercase tracking-wide">{product.category}</span>
                                                    {product.is_new && <span className="bg-primary text-white text-[7px] px-2 py-0.5 font-bold uppercase tracking-wider">New</span>}
                                                    {product.tag && <span className="bg-accent text-white text-[7px] px-2 py-0.5 font-bold uppercase tracking-wider">{product.tag}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col space-y-1">
                                            <span className="text-xs font-bold text-slate-600 tracking-wider">{product.code}</span>
                                            <span className="text-[10px] text-slate-400">/{product.slug}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-base font-bold text-primary">{product.price}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col space-y-2">
                                            <span className={`text-[11px] font-bold ${product.stock < 10 ? 'text-red-600' : 'text-slate-600'}`}>
                                                {product.stock} Units
                                            </span>
                                            <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div className={`h-full ${product.stock < 10 ? 'bg-red-500 w-1/3' : 'bg-green-500 w-full'}`} style={{ width: `${Math.min((product.stock / 20) * 100, 100)}%` }} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end space-x-2">
                                            <Link href={`/product/${product.slug}`} className="h-9 w-9 rounded bg-slate-50 text-slate-400 hover:text-primary transition-all border border-slate-200 flex items-center justify-center">
                                                <ExternalLink size={14} />
                                            </Link>
                                            <button 
                                                onClick={() => handleOpenModal(product)}
                                                className="h-9 w-9 rounded bg-slate-50 text-slate-400 hover:text-primary transition-all border border-slate-200 flex items-center justify-center cursor-pointer"
                                            >
                                                <Edit size={14} />
                                            </button>
                                            <button 
                                                onClick={() => deleteProduct(product.id)}
                                                className="h-9 w-9 rounded bg-slate-50 text-slate-400 hover:text-red-600 transition-all border border-slate-200 flex items-center justify-center cursor-pointer"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-[200] flex items-center justify-center p-6">
                    <div className="bg-white w-full max-w-2xl shadow-2xl animate-fade-in overflow-hidden">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <div>
                                <h2 className="text-xl font-bold text-primary tracking-tight">{editingProduct ? "Edit Product" : "Add New Product"}</h2>
                                <p className="text-[10px] uppercase font-bold text-slate-400 mt-1">Inventory Management Cluster</p>
                            </div>
                            <button onClick={handleCloseModal} className="text-slate-400 hover:text-primary transition-colors cursor-pointer">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-slate-400">Article Name</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="w-full p-4 bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary text-sm font-bold text-primary" 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-slate-400">Reference Code</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={formData.code}
                                        onChange={(e) => setFormData({...formData, code: e.target.value})}
                                        className="w-full p-4 bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary text-sm font-bold text-primary" 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-slate-400">Category Context</label>
                                    <select 
                                        value={formData.category}
                                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                                        className="w-full p-4 bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary text-sm font-bold text-primary"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat.slug} value={cat.name}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-slate-400">Statement Price</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={formData.price}
                                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                                        placeholder="LKR 0"
                                        className="w-full p-4 bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary text-sm font-bold text-primary" 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-slate-400">Inventory Level (Stock)</label>
                                    <input 
                                        type="number" 
                                        required
                                        value={formData.stock}
                                        onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value)})}
                                        className="w-full p-4 bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary text-sm font-bold text-primary" 
                                    />
                                </div>
                                <div className="col-span-1 md:col-span-2 space-y-4">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-slate-400">Atmospheric Imagery (4 Master Assets)</label>
                                    <div className="grid grid-cols-4 gap-4">
                                        {/* Main Featured Image Slot */}
                                        <div className="col-span-4 md:col-span-1 space-y-4">
                                            <div className="relative aspect-[3/4] bg-slate-50 border border-dashed border-slate-300 group overflow-hidden">
                                                {formData.image ? (
                                                    <Image src={formData.image} alt="Main" fill className="object-cover" />
                                                ) : (
                                                    <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                                                        <Plus size={24} />
                                                    </div>
                                                )}
                                                <input 
                                                    type="file" 
                                                    onChange={(e) => handleImageUpload(e, 0)}
                                                    className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                                                />
                                                <div className="absolute inset-x-0 bottom-0 bg-primary/80 text-white text-[7px] uppercase font-bold py-2 text-center transform translate-y-full group-hover:translate-y-0 transition-transform">
                                                    Primary Image
                                                </div>
                                            </div>
                                        </div>

                                        {/* Gallery Slots */}
                                        {[1, 2, 3].map((idx) => (
                                            <div key={idx} className="relative aspect-[3/4] bg-slate-50 border border-dashed border-slate-300 group overflow-hidden">
                                                {formData.gallery?.[idx - 1] ? (
                                                    <Image src={formData.gallery[idx - 1]} alt={`Gallery ${idx}`} fill className="object-cover" />
                                                ) : (
                                                    <div className="absolute inset-0 flex items-center justify-center text-slate-300 text-xs">
                                                        <Plus size={16} />
                                                    </div>
                                                )}
                                                <input 
                                                    type="file" 
                                                    onChange={(e) => handleImageUpload(e, idx)}
                                                    className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-[9px] text-slate-400 uppercase tracking-widest italic">Slot 1 is the primary storefront thumbnail. Re-uploading replaces the signature asset.</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-slate-400">Badge Tag</label>
                                    <input 
                                        type="text" 
                                        value={formData.tag || ""}
                                        onChange={(e) => setFormData({...formData, tag: e.target.value})}
                                        placeholder="e.g. Best Seller"
                                        className="w-full p-4 bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary text-xs font-bold text-primary" 
                                    />
                                </div>
                                <div className="flex items-center space-x-4 p-4 bg-slate-50 border border-slate-200">
                                    <input 
                                        type="checkbox" 
                                        id="is_new"
                                        checked={formData.is_new || false}
                                        onChange={(e) => setFormData({...formData, is_new: e.target.checked})}
                                        className="w-5 h-5 accent-primary cursor-pointer" 
                                    />
                                    <label htmlFor="is_new" className="text-[10px] uppercase font-black tracking-widest text-primary cursor-pointer select-none">Mark as New Collection</label>
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-black tracking-widest text-slate-400">Narrative Description</label>
                                <textarea 
                                    rows={4} 
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    className="w-full p-4 bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary text-sm font-bold text-primary resize-none"
                                />
                            </div>

                            <div className="pt-6 border-t border-slate-100 flex justify-end space-x-4">
                                <button 
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-8 py-4 border border-slate-200 text-[11px] uppercase tracking-widest font-bold hover:bg-slate-50 transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    disabled={isUploading}
                                    className={`px-10 py-4 ${isUploading ? 'bg-slate-400' : 'bg-primary'} text-white text-[11px] uppercase tracking-widest font-black shadow-lg hover:bg-slate-800 transition-all cursor-pointer flex items-center space-x-2`}
                                >
                                    {isUploading ? (
                                        <span>Uploading...</span>
                                    ) : (
                                        <>
                                            <Save size={14} />
                                            <span>{editingProduct ? "Synchronize Changes" : "Commit Product"}</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
