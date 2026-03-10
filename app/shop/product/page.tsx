"use client";

import Image from "next/image";
import { useState } from "react";
import { Heart, ShoppingBag, ChevronRight, Star, Minus, Plus, Share2 } from "@/components/Icons";
import Navbar from "@/components/store/Navbar";
import Footer from "@/components/store/Footer";

export default function ProductDetailPage() {
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState("M");

    const product = {
        name: "Silk Evening Gown",
        price: "$240.00",
        rating: 4.8,
        reviews: 124,
        description: "Experience the ultimate in luxury with our Silk Evening Gown. Meticulously crafted from the finest mulberry silk, this dress features a timeless silhouette that gracefully skims the body. Perfect for gala events, weddings, or any occasion where you want to radiate sophistication.",
        details: [
            "100% Pure Mulberry Silk",
            "Hand-rolled hems",
            "Hidden side zipper",
            "Dry clean only",
        ],
        images: [
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1964&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1518767763737-1834226f7465?q=80&w=1974&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=2070&auto=format&fit=crop",
        ],
        sizes: ["XS", "S", "M", "L", "XL"],
    };

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Breadcrumbs */}
            <nav className="pt-32 pb-6 border-b border-secondary">
                <div className="container mx-auto px-6 flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold text-muted">
                    <a href="/" className="hover:text-primary transition-colors">Home</a>
                    <ChevronRight size={10} />
                    <a href="/shop" className="hover:text-primary transition-colors">Clothing</a>
                    <ChevronRight size={10} />
                    <span className="text-primary">{product.name}</span>
                </div>
            </nav>

            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        {/* Image Gallery */}
                        <div className="space-y-6">
                            <div className="relative h-[700px] overflow-hidden bg-secondary shadow-premium">
                                <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    fill
                                    className="object-cover animate-fade-in"
                                />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                {product.images.map((img, idx) => (
                                    <div key={idx} className="relative h-40 bg-secondary cursor-pointer hover:opacity-80 transition-opacity overflow-hidden group">
                                        <Image src={img} alt={`${product.name} ${idx}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Meta & Actions */}
                        <div className="flex flex-col">
                            <div className="border-b border-secondary pb-8 mb-8">
                                <h1 className="premium-serif text-4xl mb-4 tracking-wide">{product.name}</h1>
                                <div className="flex items-center space-x-6 mb-4">
                                    <div className="flex items-center space-x-1 text-accent">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} fill={i < 4 ? "currentColor" : "none"} />
                                        ))}
                                        <span className="text-xs text-muted font-bold ml-2">({product.reviews} Reviews)</span>
                                    </div>
                                    <span className="h-4 w-[1px] bg-muted/20" />
                                    <span className="text-xl font-bold tracking-widest">{product.price}</span>
                                </div>
                                <p className="text-muted leading-relaxed font-light">{product.description}</p>
                            </div>

                            {/* Size Selector */}
                            <div className="mb-10">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xs uppercase tracking-widest font-bold">Select Size</h3>
                                    <button className="text-[10px] uppercase tracking-widest font-bold text-accent underline underline-offset-4">Size Guide</button>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`w-14 h-14 flex items-center justify-center border text-xs font-bold transition-all duration-300 ${selectedSize === size
                                                ? "bg-primary text-white border-primary shadow-premium"
                                                : "border-secondary text-muted hover:border-primary hover:text-primary"
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity & Add to Cart */}
                            <div className="mb-10 space-y-6">
                                <div className="flex items-center space-x-10">
                                    <h3 className="text-xs uppercase tracking-widest font-bold">Quantity</h3>
                                    <div className="flex items-center border border-secondary p-2">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="p-1 hover:text-accent transition-colors"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="w-12 text-center font-bold text-sm tracking-widest">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="p-1 hover:text-accent transition-colors"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button className="flex-1 bg-primary text-white py-5 px-10 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-accent transition-all duration-300 shadow-premium flex items-center justify-center space-x-4">
                                        <ShoppingBag size={18} />
                                        <span>Add to Wardrobe</span>
                                    </button>
                                    <button className="p-5 border border-secondary text-muted hover:text-accent hover:border-accent transition-all duration-300">
                                        <Heart size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Additional Details */}
                            <div className="space-y-4 pt-8 border-t border-secondary">
                                <div className="flex items-center justify-between group cursor-pointer">
                                    <h3 className="text-xs uppercase tracking-widest font-bold">Shipping & Returns</h3>
                                    <ChevronRight size={16} className="text-muted group-hover:translate-x-1 transition-transform" />
                                </div>
                                <div className="flex items-center justify-between group cursor-pointer pt-4 border-t border-secondary/50">
                                    <h3 className="text-xs uppercase tracking-widest font-bold">Fabric & Care</h3>
                                    <ChevronRight size={16} className="text-muted group-hover:translate-x-1 transition-transform" />
                                </div>
                                <div className="pt-8 flex items-center space-x-6 text-muted">
                                    <button className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold hover:text-accent transition-colors">
                                        <Share2 size={14} />
                                        <span>Share Piece</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Suggested Products (Small Grid) */}
            <section className="py-32 bg-secondary/20">
                <div className="container mx-auto px-6">
                    <h2 className="premium-serif text-3xl mb-12 text-center">Complete the Look</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="text-center group cursor-pointer">
                                <div className="relative h-64 bg-white mb-4 overflow-hidden shadow-premium">
                                    <Image
                                        src={`https://images.unsplash.com/photo-${1515372039744 + i}-b8f02a3ae446?q=80&w=1976&auto=format&fit=crop`}
                                        alt="Suggested Piece"
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                                <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold">Essential Accessory</h4>
                                <p className="text-xs text-muted font-bold tracking-widest mt-1">$45.00</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
