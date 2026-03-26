"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export interface Product {
    id: string;
    name: string;
    code: string; 
    slug: string;
    category: string;
    price: string;
    stock: number;
    image: string; // Primary image
    gallery?: string[]; // Additional 3 images
    description?: string;
    is_new?: boolean;
    rating?: number;
    tag?: string;
    created_at?: string;
}

export interface Category {
    id?: string;
    name: string;
    slug: string;
    image: string;
    description: string;
    created_at?: string;
}

interface ProductContextType {
    products: Product[];
    categories: Category[];
    loading: boolean;
    addProduct: (product: Omit<Product, "id">) => Promise<void>;
    updateProduct: (product: Product) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    getProductBySlug: (slug: string) => Product | undefined;
    
    // Category Management
    addCategory: (category: Omit<Category, "id">) => Promise<void>;
    deleteCategory: (slug: string) => Promise<void>;

    // Storage Management
    uploadImage: (file: File, bucket: 'products' | 'categories') => Promise<string>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    // Initial Fetch from Supabase
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data: pData, error: pError } = await supabase.from('products').select('*').order('created_at', { ascending: false });
                const { data: cData, error: cError } = await supabase.from('categories').select('*').order('created_at', { ascending: false });

                if (pError) throw pError;
                if (cError) throw cError;

                setProducts(pData || []);
                setCategories(cData || []);
            } catch (err: any) {
                console.error("Fetch error:", err.message);
                showToast("Failed to connect to the inventory matrix.", 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3500);
    };

    const uploadImage = async (file: File, bucket: 'products' | 'categories'): Promise<string> => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${fileName}`;

        try {
            const { error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage
                .from(bucket)
                .getPublicUrl(filePath);

            return data.publicUrl;
        } catch (error: any) {
            showToast(`Asset upload failed: ${error.message}`, 'error');
            throw error;
        }
    };

    const addProduct = async (product: Omit<Product, "id">) => {
        try {
            const { data, error } = await supabase.from('products').insert([product]).select();
            if (error) throw error;
            setProducts([data[0], ...products]);
            showToast(`Article "${product.name}" successfully committed to database.`);
        } catch (err: any) {
            showToast(`Operation failed: ${err.message}`, 'error');
        }
    };

    const updateProduct = async (updatedProduct: Product) => {
        try {
            const { error } = await supabase.from('products').update(updatedProduct).eq('id', updatedProduct.id);
            if (error) throw error;
            setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
            showToast(`Database synchronized for "${updatedProduct.name}".`);
        } catch (err: any) {
            showToast(`Synchronization failed: ${err.message}`, 'error');
        }
    };

    const deleteProduct = async (id: string) => {
        try {
            const { error } = await supabase.from('products').delete().eq('id', id);
            if (error) throw error;
            setProducts(products.filter(p => p.id !== id));
            showToast(`Article purged from database.`, 'success');
        } catch (err: any) {
            showToast(`Deletional failure: ${err.message}`, 'error');
        }
    };

    const getProductBySlug = (slug: string) => {
        return products.find(p => p.slug === slug);
    };

    // Category Logic
    const addCategory = async (category: Omit<Category, "id">) => {
        try {
            const { data, error } = await supabase.from('categories').insert([category]).select();
            if (error) throw error;
            setCategories([data[0], ...categories]);
            showToast(`Strategic department "${category.name}" created.`);
        } catch (err: any) {
            showToast(`Category creation failed: ${err.message}`, 'error');
        }
    };

    const deleteCategory = async (slug: string) => {
        try {
            const { error } = await supabase.from('categories').delete().eq('slug', slug);
            if (error) throw error;
            setCategories(categories.filter(c => c.slug !== slug));
            showToast(`Department offline.`);
        } catch (err: any) {
            showToast(`Removal failed: ${err.message}`, 'error');
        }
    };

    return (
        <ProductContext.Provider value={{ 
            products, 
            categories, 
            loading,
            addProduct, 
            updateProduct, 
            deleteProduct, 
            getProductBySlug,
            addCategory,
            deleteCategory,
            uploadImage
        }}>
            {children}

            {/* Admin Success/Error Toast UI */}
            {toast && (
                <div className="fixed top-24 right-8 z-[200] animate-slide-up">
                    <div className={`px-8 py-5 flex items-center space-x-6 shadow-2xl border ${
                        toast.type === 'success' 
                        ? 'bg-primary text-white border-white/10' 
                        : 'bg-red-950 text-white border-red-500/30'
                    }`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                             toast.type === 'success' ? 'bg-brand-gradient' : 'bg-red-500'
                        }`}>
                            {toast.type === 'success' ? (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            )}
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.4em] font-black opacity-40 mb-1">{toast.type.toUpperCase()}</p>
                            <p className="text-sm font-bold tracking-wide">{toast.message}</p>
                        </div>
                    </div>
                </div>
            )}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProducts must be used within a ProductProvider");
    }
    return context;
};
