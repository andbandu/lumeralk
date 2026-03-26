"use client";

import Navbar from "@/components/store/Navbar";
import Footer from "@/components/store/Footer";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Star, Heart, ShoppingBag, Check } from "@/components/Icons";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

// Mock data to match what was on the homepage
const favoritePieces = [
    { id: 1, name: "Ivory Handloom Saree", price: "LKR 18,500", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1964&auto=format&fit=crop", rating: 5, tag: "Best Seller" },
    { id: 2, name: "Midnight Batik Kurtha", price: "LKR 9,200", image: "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=1978&auto=format&fit=crop", rating: 5, tag: "Exclusive" },
    { id: 3, name: "Tapered Linen Pant", price: "LKR 6,500", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1974&auto=format&fit=crop", rating: 4, tag: "New Arrival" },
    { id: 4, name: "Beeralu Lace Blouse", price: "LKR 7,800", image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=1974&auto=format&fit=crop", rating: 5, tag: "Trending" },
];

export default function ProductDetail() {
  const params = useParams();
  const id = Number(params.id) || 1;
  const product = favoritePieces.find(p => p.id === id) || favoritePieces[0];
  const { addToCart } = useCart();

  const [activeImage, setActiveImage] = useState(product.image);
  
  // Dummy gallery with alternative luxury shots
  const gallery = [
    product.image,
    "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?q=80&w=1964&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=1974&auto=format&fit=crop"
  ];
  const sizes = ["XS", "S", "M", "L", "XL"];
  const [selectedSize, setSelectedSize] = useState("M");
  const [qty, setQty] = useState(1);

  // Force scroll jump to top when navigating into this page quickly
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen text-primary overflow-x-hidden selection:bg-accent selection:text-white">
      <Navbar />
      
      {/* Spacer to push content down properly below the fixed Navbar */}
      <div className="h-32 md:h-56 bg-primary w-full shadow-2xl"></div>

      <main>
        {/* Breadcrumb Context */}
        <div className="bg-slate-50 border-b border-primary/5 py-8">
          <div className="container mx-auto px-6">
            <div className="flex items-center space-x-3 text-[10px] uppercase tracking-[0.4em] font-black text-white/30">
              <Link href="/" className="text-primary hover:text-accent transition-colors">Home</Link>
              <span className="text-primary/10">/</span>
              <Link href="/shop" className="text-primary hover:text-accent transition-colors">Curated Edits</Link>
              <span className="text-primary/10">/</span>
              <span className="text-primary/40 truncate max-w-[150px] md:max-w-none">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Core Product Presentation Section */}
        <section className="py-12 md:py-24">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
              
              {/* Product Gallery Showcase */}
              <div className="space-y-4 md:space-y-6 animate-fade-in">
                <div className="relative aspect-[4/5] bg-secondary/20 overflow-hidden shadow-2xl border border-black/5 group">
                  {/* Swipeable Container */}
                  <div 
                    className="flex overflow-x-auto snap-x snap-mandatory w-full h-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
                    onScroll={(e) => {
                      const container = e.currentTarget;
                      const index = Math.round(container.scrollLeft / container.offsetWidth);
                      if (gallery[index] && gallery[index] !== activeImage) {
                        setActiveImage(gallery[index]);
                      }
                    }}
                  >
                    {gallery.map((img, i) => (
                      <div key={i} id={`gallery-image-${i}`} className="relative w-full h-full flex-none snap-center">
                        <Image 
                          src={img} 
                          alt={`${product.name} - view ${i + 1}`} 
                          fill 
                          className="object-cover transition-transform duration-[2s]" 
                        />
                      </div>
                    ))}
                  </div>

                  {/* Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  <div className="absolute top-6 left-6 z-10 pointer-events-none">
                    <span className="bg-white/90 text-primary text-[9px] uppercase tracking-[0.4em] font-black px-5 py-3 shadow-xl backdrop-blur-md">
                      {product.tag}
                    </span>
                  </div>

                  {/* Mobile Pagination Dots */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 md:hidden z-10">
                    {gallery.map((img, i) => (
                      <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${activeImage === img ? 'bg-white w-5' : 'bg-white/50 w-1.5'}`} />
                    ))}
                  </div>
                </div>
                
                {/* Visual Thumbnails */}
                <div className="grid grid-cols-4 gap-3 md:gap-4">
                  {gallery.map((img, i) => (
                    <button 
                      key={i} 
                      onClick={() => {
                        setActiveImage(img);
                        document.getElementById(`gallery-image-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                      }}
                      className={`relative aspect-[3/4] bg-secondary/20 overflow-hidden border transition-all duration-300 ${
                          activeImage === img 
                          ? 'border-primary opacity-100 shadow-xl scale-100' 
                          : 'border-transparent opacity-50 hover:opacity-100 hover:scale-[1.02]'
                      }`}
                    >
                      <Image src={img} alt={`Gallery alternative ${i}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Information & Interactivity */}
              <div className="flex flex-col py-0 md:py-6">
                <div className="mb-12">
                  <div className="flex items-center space-x-2 text-accent mb-8">
                    {[...Array(product.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                    <span className="text-[10px] uppercase tracking-[0.4em] font-black text-primary/30 ml-4">(42 Reviews)</span>
                  </div>
                  <h1 className="premium-serif text-4xl md:text-6xl leading-[1.1] text-primary mb-8 tracking-tighter">
                    {product.name}
                  </h1>
                  <p className="text-3xl md:text-4xl tracking-[0.4em] font-black text-primary/20 uppercase">
                    {product.price}
                  </p>
                </div>

                <div className="mb-12 text-lg text-muted font-light leading-relaxed">
                  <p>
                    Meticulously crafted from the finest locally sourced materials, this stunning piece captures the true essence of modern Sri Lankan elegance. Perfect for any occasion, it features delicate artisanal detailing and an effortless silhouette that bridges tradition with a highly contemporary luxury aesthetic.
                  </p>
                </div>

                {/* Sizing Engine */}
                <div className="mb-12">
                  <div className="flex justify-between items-end mb-6">
                    <span className="text-[10px] uppercase tracking-[0.4em] font-black text-primary border-b-2 border-accent pb-1">
                      Select Size
                    </span>
                    <button className="text-[9px] uppercase tracking-[0.3em] font-bold text-muted hover:text-primary transition-colors duration-300 pb-1">
                      Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {sizes.map(size => (
                      <button 
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-14 h-14 md:w-16 md:h-16 flex items-center justify-center text-xs font-black transition-all duration-300 border ${
                            selectedSize === size 
                            ? 'border-primary bg-primary text-white shadow-xl scale-105' 
                            : 'border-primary/20 text-primary hover:border-primary/60 hover:bg-secondary/10'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* eCommerce Action Stack */}
                <div className="flex flex-col sm:flex-row gap-6 mb-20">
                  {/* Quantity Incrementer */}
                  <div className="flex border border-primary/10 bg-white shadow-sm overflow-hidden">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-8 py-5 text-primary hover:bg-slate-50 transition-colors font-black text-lg">-</button>
                    <div className="w-16 flex items-center justify-center font-black text-base border-x border-primary/5">{qty}</div>
                    <button onClick={() => setQty(qty + 1)} className="px-8 py-5 text-primary hover:bg-slate-50 transition-colors font-black text-lg">+</button>
                  </div>
                  
                  {/* Primary Add to Bag Workflow */}
                  <button 
                    onClick={() => {
                      addToCart({
                        productId: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        size: selectedSize,
                        quantity: qty
                      });
                    }}
                    className="flex-1 bg-brand-gradient text-white py-6 md:py-0 text-[10px] uppercase tracking-[0.5em] font-black hover:scale-105 transition-all duration-500 shadow-[0_20px_60px_-15px_rgba(226,74,150,0.5)] flex items-center justify-center group/addbtn relative overflow-hidden"
                  >
                    <span className="relative z-10 transition-transform duration-500 group-hover/addbtn:-translate-x-3">Add To Bag</span>
                    <ShoppingBag size={20} className="absolute right-1/2 translate-x-14 opacity-0 group-hover/addbtn:translate-x-28 group-hover/addbtn:opacity-100 transition-all duration-500 z-10" />
                  </button>
                  
                  {/* Favorite / Wishlist */}
                  <button className="w-full sm:w-auto h-[72px] sm:px-8 shadow-sm border border-primary/10 flex items-center justify-center text-primary group hover:bg-accent hover:border-accent hover:text-white transition-all duration-500">
                    <Heart size={24} className="group-hover:scale-125 transition-transform duration-500" />
                  </button>
                </div>
                
                {/* Trust Accordion Info */}
                <div className="border-t border-primary/10 pt-8 space-y-5">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 rounded-full bg-secondary/30 flex items-center justify-center">
                        <Check size={14} className="text-accent"/>
                    </div>
                    <span className="text-xs uppercase tracking-[0.2em] font-bold text-primary/80">Island-wide Delivery in 3-5 days</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 rounded-full bg-secondary/30 flex items-center justify-center">
                        <Check size={14} className="text-accent"/>
                    </div>
                    <span className="text-xs uppercase tracking-[0.2em] font-bold text-primary/80">Authentic Local Craftsmanship</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 rounded-full bg-secondary/30 flex items-center justify-center">
                        <Check size={14} className="text-accent"/>
                    </div>
                    <span className="text-xs uppercase tracking-[0.2em] font-bold text-primary/80">14-Day Return Policy</span>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
