"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Filter, ChevronDown, Check } from "@/components/Icons";
import { useCart } from "@/context/CartContext";
import { useState, useEffect, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useProducts } from "@/context/ProductContext";

function ProductListingContent() {
    const { products, categories: dynamicCategories } = useProducts();
    const categories = ["All Products", ...dynamicCategories.map(c => c.name)];
    const searchParams = useSearchParams();
    const urlCategory = searchParams.get("category");
    
    const [activeFilter, setActiveFilter] = useState("All Products");
    const { addToCart } = useCart();

    const revealRefs = useRef<(HTMLDivElement | null)[]>([]);
    const addToRevealRefs = (el: HTMLDivElement | null) => {
        if (el && !revealRefs.current.includes(el)) {
            revealRefs.current.push(el);
        }
    };

    const filteredProducts = activeFilter === "All Products" 
        ? products 
        : products.filter(p => p.category.toLowerCase() === activeFilter.toLowerCase());

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealRefs.current.forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, [filteredProducts]);

    useEffect(() => {
        if (urlCategory) {
            const matched = categories.find(c => c.toLowerCase() === urlCategory.toLowerCase());
            if (matched) setActiveFilter(matched);
        }
    }, [urlCategory, categories]);

    return (
        <main className="min-h-screen">
            {/* Editorial Header Spacer - Constant site-wide hierarchy */}
            <div className="h-40 md:h-44 lg:h-44 bg-primary w-full shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-gradient opacity-[0.03] blur-[100px] pointer-events-none" />
            </div>

            <div className="pb-24">
                {/* Refined Filter & Sort Mechanism */}
                <section className="sticky top-[80px] md:top-[112px] z-40 bg-white/90 backdrop-blur-md border-b border-primary/5 py-6">
                    <div className="container mx-auto px-6 max-w-[1200px] flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-[10px] uppercase tracking-[0.4em] font-black">
                        <div className="flex items-center space-x-10 overflow-x-auto w-full md:w-auto no-scrollbar pb-1 md:pb-0 justify-center md:justify-start">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveFilter(cat)}
                                    className={`whitespace-nowrap transition-all duration-700 ${activeFilter === cat ? 'text-primary' : 'text-primary/20 hover:text-primary'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center space-x-10 text-primary/30 hidden md:flex">
                            <button className="flex items-center space-x-3 hover:text-primary transition-colors">
                                <Filter size={14} />
                                <span>Filter By</span>
                            </button>
                            <button className="flex items-center space-x-3 hover:text-primary transition-colors">
                                <span>Sort: Latest</span>
                            </button>
                        </div>
                    </div>
                </section>

                <section className="py-16 md:py-24 lg:py-32">
                    <div className="container mx-auto px-6 max-w-[1200px]">
                        {/* Collection Meta Summary */}
                        <div className="mb-16 flex justify-between items-end border-b border-primary/5 pb-6">
                            <span className="text-[10px] uppercase tracking-[0.5em] font-black text-primary/10">Cataloging {filteredProducts.length} unique articles</span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-16">
                            {filteredProducts.map((product, idx) => (
                                <div 
                                    key={product.id} 
                                    ref={addToRevealRefs}
                                    data-reveal
                                    className="group relative flex flex-col space-y-6" 
                                    style={{ transitionDelay: `${idx * 0.05}s` }}
                                >
                                    
                                    {/* Architectural Visual Container */}
                                    <div className="relative aspect-[3/4] overflow-hidden bg-secondary transition-all duration-700 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] group-hover:-translate-y-2 border border-primary/[0.03]">
                                        <Link href={`/product/${product.slug}`} className="block h-full w-full">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-cover transition-transform duration-[3s] ease-out group-hover:scale-105"
                                            />
                                        </Link>

                                        {/* Status Meta Tag */}
                                        {product.is_new && (
                                            <div className="absolute top-4 right-4 z-10 pointer-events-none">
                                                <span className="bg-white/90 backdrop-blur-xl text-primary text-[7px] uppercase tracking-[0.4em] font-black px-4 py-2 border border-black/5 shadow-xl">
                                                    Best Seller
                                                </span>
                                            </div>
                                        )}

                                        {/* Interaction Bubble - Floating Style Sync */}
                                        <div className="absolute bottom-6 right-6 flex flex-col space-y-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 z-20">
                                            <button className="w-10 h-10 bg-white shadow-xl flex items-center justify-center text-primary hover:bg-brand-gradient hover:text-white transition-all transform hover:scale-110 active:scale-95 cursor-pointer">
                                                <Heart size={14} strokeWidth={2} />
                                            </button>
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
                                                className="w-10 h-10 bg-primary shadow-xl flex items-center justify-center text-white hover:bg-brand-gradient transition-all transform hover:scale-110 active:scale-95 cursor-pointer"
                                            >
                                                <ShoppingBag size={14} strokeWidth={2} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Product Identity Footer - Condensed High-end Style */}
                                    <div className="flex flex-col space-y-2">
                                        <Link href={`/product/${product.slug}`} className="block group/title">
                                            <h3 className="premium-serif text-lg leading-tight tracking-tight text-primary hover:text-accent transition-colors">
                                                {product.name}
                                            </h3>
                                        </Link>
                                        <div className="flex items-center space-x-4">
                                            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-primary/30">{product.price}</span>
                                            <div className="w-px h-3 bg-primary/10" />
                                            <span className="text-[9px] uppercase tracking-[0.3em] font-black text-accent/40">{product.category}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Empty Selection Feedback */}
                        {filteredProducts.length === 0 && (
                            <div className="py-40 flex flex-col items-center justify-center space-y-12 text-center animate-fade-in">
                                <div className="w-px h-24 bg-primary/10" />
                                <div>
                                    <h3 className="premium-serif text-4xl text-primary/20 mb-4 tracking-tighter">No Articles Found</h3>
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-primary/20 font-black">We are currently curating new releases.</p>
                                </div>
                                <button onClick={() => setActiveFilter("All Products")} className="h-16 px-12 border border-primary/10 text-[10px] uppercase tracking-[0.5em] font-black text-primary/40 hover:bg-primary hover:text-white transition-all duration-700">
                                    Refresh Catalog
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            </div>
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
