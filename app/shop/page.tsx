"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Filter, ChevronDown, Check } from "@/components/Icons";
import Navbar from "@/components/store/Navbar";
import Footer from "@/components/store/Footer";
import { useCart } from "@/context/CartContext";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const allProducts = [
    { id: 1, name: "Ivory Handloom Saree", category: "clothing", price: "LKR 18,500", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1964&auto=format&fit=crop", isNew: true },
    { id: 2, name: "Midnight Batik Kurtha", category: "clothing", price: "LKR 9,200", image: "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=1978&auto=format&fit=crop", isNew: false },
    { id: 3, name: "Tapered Linen Pant", category: "denim", price: "LKR 6,500", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1974&auto=format&fit=crop", isNew: true },
    { id: 4, name: "Beeralu Lace Blouse", category: "clothing", price: "LKR 7,800", image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=1974&auto=format&fit=crop", isNew: false },
    { id: 5, name: "Leather Tote Bag", category: "handbags", price: "LKR 16,500", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1935&auto=format&fit=crop", isNew: false },
    { id: 6, name: "Minimalist Watch", category: "accessories", price: "LKR 28,000", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop", isNew: true },
    { id: 7, name: "Linen Summer Dress", category: "frocks", price: "LKR 12,500", image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1976&auto=format&fit=crop", isNew: true },
    { id: 8, name: "Gold Hoop Earrings", category: "jewelry", price: "LKR 4,500", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1974&auto=format&fit=crop", isNew: false },
    { id: 9, name: "Woven Platform Sandals", category: "shoes", price: "LKR 8,900", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2000&auto=format&fit=crop", isNew: false },
    { id: 10, name: "Bamboo Flask", category: "waterbottle", price: "LKR 3,200", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1974&auto=format&fit=crop", isNew: true }
];

const categories = ["All Products", "Frocks", "Handbags", "Denim", "Shoes", "Waterbottle", "Accessories"];

function ProductListingContent() {
    const searchParams = useSearchParams();
    const urlCategory = searchParams.get("category");
    
    const [activeFilter, setActiveFilter] = useState("All Products");
    const { addToCart } = useCart();

    useEffect(() => {
        if (urlCategory) {
            const matched = categories.find(c => c.toLowerCase() === urlCategory.toLowerCase());
            if (matched) setActiveFilter(matched);
        }
    }, [urlCategory]);

    const filteredProducts = activeFilter === "All Products" 
        ? allProducts 
        : allProducts.filter(p => p.category.toLowerCase() === activeFilter.toLowerCase());

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Premium Hero Header */}
            <section className="pt-40 pb-20 bg-primary relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-gradient opacity-10 blur-[150px] mix-blend-screen" />
                <div className="container mx-auto px-6 text-center relative z-10">
                    <span className="text-accent text-[10px] uppercase tracking-[0.5em] font-black block mb-4">Curated Edits</span>
                    <h1 className="premium-serif text-5xl md:text-7xl mb-6 text-white tracking-tight">Our Collection.</h1>
                    <p className="tracking-[0.2em] text-white/50 text-xs md:text-sm font-bold uppercase max-w-2xl mx-auto">
                        Elevate your everyday style with timeless elegance.
                    </p>
                </div>
            </section>

            {/* Filter & Sort Bar */}
            <section className="sticky top-[80px] md:top-[112px] z-40 bg-white/90 backdrop-blur-md border-b border-primary/10 py-5">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[10px] uppercase tracking-[0.2em] font-bold">
                    <div className="flex items-center space-x-8 overflow-x-auto w-full md:w-auto no-scrollbar pb-2 md:pb-0">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                className={`whitespace-nowrap transition-all duration-300 ${activeFilter === cat ? 'text-primary border-b-2 border-accent pb-1' : 'text-primary/40 hover:text-primary pb-1'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center space-x-6 text-primary/60 hidden md:flex">
                        <button className="flex items-center space-x-2 hover:text-primary transition-colors">
                            <Filter size={14} />
                            <span>Filter</span>
                        </button>
                        <button className="flex items-center space-x-2 hover:text-primary transition-colors">
                            <span>Sort By</span>
                            <ChevronDown size={14} />
                        </button>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6">
                    {/* Collection Metadata */}
                    <div className="mb-12 flex justify-between items-center">
                        <span className="text-[10px] uppercase tracking-[0.3em] font-black text-primary/40">Showing {filteredProducts.length} pieces</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="group relative flex flex-col animate-fade-in">
                                
                                {/* Image Container (Links to Product) */}
                                <Link href={`/product/${product.id}`} className="relative aspect-[4/5] overflow-hidden bg-secondary mb-6 block border border-black/5">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                                    />
                                    {product.isNew && (
                                        <span className="absolute top-4 left-4 bg-white/90 text-primary text-[9px] uppercase tracking-[0.4em] font-black px-4 py-2 shadow-xl backdrop-blur-md z-10">
                                            New
                                        </span>
                                    )}
                                    <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20 hidden md:flex">
                                        <button 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                addToCart({
                                                    productId: product.id,
                                                    name: product.name,
                                                    price: product.price,
                                                    image: product.image,
                                                    size: "M",
                                                    quantity: 1
                                                });
                                            }}
                                            className="bg-white text-primary px-8 py-4 text-[9px] uppercase tracking-[0.4em] font-black hover:bg-brand-gradient hover:text-white transition-all duration-500 shadow-xl transform translate-y-4 group-hover:translate-y-0"
                                        >
                                            Quick Add
                                        </button>
                                    </div>
                                </Link>

                                {/* Product Info */}
                                <div className="flex flex-col flex-1 justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <Link href={`/product/${product.id}`} className="block">
                                                <h3 className="premium-serif text-2xl lg:text-3xl text-primary leading-tight tracking-tight hover:text-accent transition-colors">{product.name}</h3>
                                            </Link>
                                            <button className="text-primary/30 hover:text-accent transition-colors mt-1">
                                                <Heart size={18} />
                                            </button>
                                        </div>
                                        <p className="font-bold tracking-[0.2em] text-primary/70 text-xs mb-4">{product.price}</p>
                                    </div>
                                    
                                    <button 
                                        onClick={() => {
                                            addToCart({
                                                productId: product.id,
                                                name: product.name,
                                                price: product.price,
                                                image: product.image,
                                                size: "M",
                                                quantity: 1
                                            });
                                        }}
                                        className="w-full mt-4 md:hidden py-4 border border-primary/20 text-primary text-[9px] uppercase tracking-[0.4em] font-black hover:bg-brand-gradient hover:border-transparent hover:text-white transition-all duration-300 relative z-40 bg-white shadow-sm"
                                    >
                                        Add To Bag
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="py-24 flex flex-col items-center justify-center space-y-6 text-center">
                            <ShoppingBag size={48} className="text-primary/20" strokeWidth={1}/>
                            <div>
                                <h3 className="premium-serif text-3xl text-primary mb-2">No pieces found</h3>
                                <p className="text-xs uppercase tracking-[0.2em] text-primary/50 font-bold">We are releasing new drops soon.</p>
                            </div>
                            <button onClick={() => setActiveFilter("All Products")} className="border-b-2 border-accent text-primary text-[10px] uppercase tracking-[0.3em] font-black pb-1 hover:text-accent transition-colors">
                                View Full Collection
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}

export default function ProductListingPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center text-primary text-[10px] uppercase tracking-[0.4em] font-black">Loading...</div>}>
            <ProductListingContent />
        </Suspense>
    );
}
