"use client";

import { useState } from "react";
import { Plus, Search, Trash2, X, Save, Filter } from "@/components/Icons";
import { useProducts, Category } from "@/context/ProductContext";
import Image from "next/image";

export default function AdminCategories() {
    const { categories, addCategory, deleteCategory, uploadImage } = useProducts();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const [formData, setFormData] = useState<Category>({
        name: "",
        slug: "",
        image: "",
        description: ""
    });

    const filteredCategories = categories.filter(cat => 
        cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const publicUrl = await uploadImage(file, 'categories');
            setFormData(prev => ({ ...prev, image: publicUrl }));
        } catch (err) {
            console.error("Upload failed");
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const slug = formData.name.toLowerCase().replace(/\s+/g, '-');
        await addCategory({ ...formData, slug });
        setFormData({ name: "", slug: "", image: "", description: "" });
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-10 font-sans">
            {/* Professional Command Toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0 relative z-10">
                <div className="relative w-full md:w-96 group">
                    <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 focus:outline-none focus:border-primary/30 text-xs font-bold uppercase tracking-wider transition-all"
                    />
                </div>
                
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex-1 md:flex-none group h-14 px-8 bg-primary text-white text-[11px] uppercase tracking-widest font-black transition-all hover:bg-slate-800 flex items-center justify-center shadow-md cursor-pointer"
                >
                    <Plus size={16} className="mr-2" />
                    <span>Create Category</span>
                </button>
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCategories.map((category) => (
                    <div key={category.slug} className="bg-white border border-slate-200 overflow-hidden group hover:border-primary transition-all shadow-sm">
                        <div className="h-40 relative bg-slate-100 border-b border-slate-200">
                            <Image src={category.image} alt={category.name} fill className="object-cover" />
                        </div>
                        <div className="p-8 flex justify-between items-center">
                            <div>
                                <h3 className="text-base font-bold text-primary tracking-tight">{category.name}</h3>
                                <p className="text-[10px] uppercase font-bold text-slate-400 mt-1">/{category.slug}</p>
                            </div>
                            <button 
                                onClick={() => deleteCategory(category.slug)}
                                className="h-10 w-10 rounded bg-slate-50 text-slate-400 hover:text-red-500 transition-all border border-slate-200 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State if no categories found */}
            {filteredCategories.length === 0 && (
                <div className="py-20 text-center bg-slate-50 border border-dashed border-slate-200">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No matching categories found in the matrix.</p>
                </div>
            )}

            {/* Create Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-[200] flex items-center justify-center p-6">
                    <div className="bg-white w-full max-w-2xl shadow-2xl animate-fade-in overflow-hidden">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <div>
                                <h2 className="text-xl font-bold text-primary tracking-tight">Create Category</h2>
                                <p className="text-[10px] uppercase font-bold text-slate-400 mt-1">Taxonomy Structural Control</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-primary transition-colors cursor-pointer">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-slate-400">Category Identity</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        placeholder="e.g. Traditional Wear"
                                        className="w-full p-4 bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary text-sm font-bold text-primary" 
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] uppercase font-black tracking-widest text-slate-400">Department Visual</label>
                                    <div className="flex flex-col space-y-4">
                                        {formData.image && (
                                            <div className="relative h-32 w-40 border border-slate-200 overflow-hidden">
                                                <Image src={formData.image} alt="Preview" fill className="object-cover" />
                                            </div>
                                        )}
                                        <div className="relative group overflow-hidden">
                                            <input 
                                                type="file" 
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                                            />
                                            <div className="w-full p-4 bg-slate-50 border border-dashed border-slate-300 group-hover:border-primary transition-colors text-center">
                                                <span className="text-[10px] uppercase tracking-widest font-black text-slate-400 group-hover:text-primary">
                                                    {isUploading ? "Uploading to Cloud..." : "Select Master Asset"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-black tracking-widest text-slate-400">Strategic Narrative</label>
                                <textarea 
                                    rows={3}
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    placeholder="Describe the department's market positioning..."
                                    className="w-full p-4 bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary text-sm font-bold text-primary resize-none"
                                />
                            </div>

                            <div className="pt-6 border-t border-slate-100 flex justify-end space-x-4">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-8 py-4 border border-slate-200 text-[11px] uppercase tracking-widest font-bold hover:bg-slate-50 transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="px-8 py-4 bg-primary text-white text-[11px] uppercase tracking-widest font-black shadow-lg hover:bg-slate-800 transition-all cursor-pointer flex items-center space-x-2"
                                >
                                    <Save size={14} />
                                    <span>Commit Category</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
