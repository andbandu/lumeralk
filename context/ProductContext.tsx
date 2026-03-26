"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Product {
    id: string;
    name: string;
    code: string; // Ref Code
    slug: string;
    category: string;
    price: string;
    stock: number;
    image: string;
    description?: string;
    isNew?: boolean;
    rating?: number;
    tag?: string;
}

export interface Category {
    name: string;
    slug: string;
    image: string;
    description: string;
}

interface ProductContextType {
    products: Product[];
    categories: Category[];
    addProduct: (product: Product) => void;
    updateProduct: (product: Product) => void;
    deleteProduct: (id: string) => void;
    getProductBySlug: (slug: string) => Product | undefined;
    
    // Category Management
    addCategory: (category: Category) => void;
    deleteCategory: (slug: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const INITIAL_PRODUCTS: Product[] = [
    { id: "1", name: "Ivory Handloom Saree", code: "LMR-SR01", slug: "ivory-handloom-saree", category: "Handloom", price: "LKR 45,000", stock: 12, image: "/product1.webp", description: "A timeless handloom saree in pure ivory silk, featuring traditional Sri Lankan weave patterns and a gold-dipped border.", isNew: true, rating: 5, tag: "Best Seller" },
    { id: "2", name: "Crimson Silk Kaftan", code: "LMR-KF02", slug: "crimson-silk-kaftan", category: "Resort", price: "LKR 28,500", stock: 8, image: "/product2.webp", description: "Fluid crimson silk kaftan with hand-rolled hems and architectural side slits. Perfect for high-end resort evenings.", isNew: false, rating: 5, tag: "Exclusive" },
    { id: "3", name: "Onyx Evening Gown", code: "LMR-GN03", slug: "onyx-evening-gown", category: "Evening", price: "LKR 120,000", stock: 3, image: "/product3.webp", description: "Sculptural onyx evening gown in Italian crepe, featuring a dramatic back-split and hand-applied crystal accents.", isNew: true, rating: 5, tag: "Trending" },
    { id: "4", name: "Linen Studio Shirt", code: "LMR-SH04", slug: "linen-studio-shirt", category: "Studio", price: "LKR 18,000", stock: 25, image: "/product4.webp", description: "Minimalist studio shirt in organic off-white linen. Features a refined mandarin collar and mother-of-pearl buttons.", isNew: false, rating: 4, tag: "Essential" },
];

const INITIAL_CATEGORIES: Category[] = [
    { name: "Handloom", slug: "handloom", image: "/product1.webp", description: "Traditional Sri Lankan artisanal weaves." },
    { name: "Resort", slug: "resort", image: "/product2.webp", description: "Fluid silhouettes for tropical escapes." },
    { name: "Evening", slug: "evening", image: "/product3.webp", description: "Ethereal silk and twilight elegance." },
    { name: "Studio", slug: "studio", image: "/product4.webp", description: "Minimalist essentials for modern living." },
    { name: "Handbags", slug: "handbags", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1935&auto=format&fit=crop", description: "Artisanal woven mastery." },
    { name: "Accessories", slug: "accessories", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop", description: "Refined accents of luxury." },
];

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
    const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);

    useEffect(() => {
        const savedProducts = localStorage.getItem("lumera_products");
        const savedCategories = localStorage.getItem("lumera_categories");
        
        if (savedProducts) setProducts(JSON.parse(savedProducts));
        if (savedCategories) setCategories(JSON.parse(savedCategories));
    }, []);

    const saveAndSetProducts = (newProducts: Product[]) => {
        setProducts(newProducts);
        localStorage.setItem("lumera_products", JSON.stringify(newProducts));
    };

    const saveAndSetCategories = (newCategories: Category[]) => {
        setCategories(newCategories);
        localStorage.setItem("lumera_categories", JSON.stringify(newCategories));
    };

    const addProduct = (product: Product) => {
        saveAndSetProducts([...products, product]);
    };

    const updateProduct = (updatedProduct: Product) => {
        saveAndSetProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    };

    const deleteProduct = (id: string) => {
        saveAndSetProducts(products.filter(p => p.id !== id));
    };

    const getProductBySlug = (slug: string) => {
        return products.find(p => p.slug === slug);
    };

    // Category Logic
    const addCategory = (category: Category) => {
        if (!categories.find(c => c.slug === category.slug)) {
            saveAndSetCategories([...categories, category]);
        }
    };

    const deleteCategory = (slug: string) => {
        saveAndSetCategories(categories.filter(c => c.slug !== slug));
    };

    return (
        <ProductContext.Provider value={{ 
            products, 
            categories, 
            addProduct, 
            updateProduct, 
            deleteProduct, 
            getProductBySlug,
            addCategory,
            deleteCategory
        }}>
            {children}
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
