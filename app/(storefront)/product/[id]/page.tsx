"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Star, Heart, ShoppingBag, Check } from "@/components/Icons";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";

export default function ProductDetail() {
  const { products, getProductBySlug } = useProducts();
  const params = useParams();
  const slug = params.id as string; 
  
  const product = getProductBySlug(slug) || products[0];
  const { addToCart } = useCart();

  const [activeImage, setActiveImage] = useState(product?.image || "");
  
  useEffect(() => {
    if (product) setActiveImage(product.image);
  }, [product]);

  if (!product) return null;

  // JSON-LD Structured Data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.image,
    "description": product.description,
    "sku": product.code,
    "offers": {
      "@type": "Offer",
      "url": `https://lumera.lk/product/${product.slug}`,
      "priceCurrency": "LKR",
      "price": product.price.replace(/[^\d]/g, ""),
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": (product.rating || 5).toString(),
      "reviewCount": "42"
    }
  };

  const gallery = [
    product.image,
    ...(product.gallery || [])
  ].filter(img => img !== "");
  const sizes = ["XS", "S", "M", "L", "XL"];
  const [selectedSize, setSelectedSize] = useState("M");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <div className="bg-white min-h-screen text-primary overflow-x-hidden selection:bg-accent selection:text-white">
      {/* Dynamic SEO Meta Tags */}
      <title>{`${product.name} | Lumera Luxury Boutique`}</title>
      <meta name="description" content={product.description} />
      
      {/* Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Editorial Header Spacer */}
      <div className="h-40 md:h-44 lg:h-44 bg-primary w-full shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-gradient opacity-[0.03] blur-[100px] pointer-events-none" />
      </div>

      <main>
        {/* Minimalist Breadcrumb Context */}
        <nav className="bg-white py-8 md:py-12 border-b border-primary/5">
          <div className="container mx-auto px-6 max-w-[1200px]">
             <div className="flex items-center space-x-4 text-[9px] md:text-[10px] uppercase tracking-[0.5em] font-black text-primary/20">
                <Link href="/" className="hover:text-accent transition-colors">Home</Link>
                <span>/</span>
                <Link href="/shop" className="hover:text-accent transition-colors">Edits</Link>
                <span>/</span>
                <span className="text-primary/60 truncate max-w-[120px] md:max-w-none">{product.name}</span>
             </div>
          </div>
        </nav>

        {/* Core Product Presentation Section */}
        <section className="py-12 md:py-20 lg:py-24">
          <div className="container mx-auto px-6 max-w-[1200px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
              
              {/* Product Gallery Showcase */}
              <div className="space-y-6 animate-fade-in">
                <div className="relative aspect-[4/5] bg-secondary/10 overflow-hidden border border-black/[0.03] group">
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
                          className="object-cover transition-transform duration-[2s] ease-out" 
                        />
                      </div>
                    ))}
                  </div>

                  <div className="absolute top-8 left-8 z-10">
                    <span className="bg-white/95 backdrop-blur-xl text-primary text-[8px] uppercase tracking-[0.4em] font-black px-5 py-3 border border-black/5">
                      {product.tag || "New Collection"}
                    </span>
                  </div>

                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 md:hidden z-10">
                    {gallery.map((img, i) => (
                      <div key={i} className={`h-1 transition-all duration-700 ${activeImage === img ? 'bg-primary w-8' : 'bg-primary/20 w-2'}`} />
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4">
                  {gallery.map((img, i) => (
                    <button 
                      key={i} 
                      onClick={() => {
                        setActiveImage(img);
                        document.getElementById(`gallery-image-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                      }}
                      className={`relative aspect-[3/4] bg-secondary/5 overflow-hidden transition-all duration-700 border ${
                          activeImage === img 
                          ? 'border-primary opacity-100' 
                          : 'border-transparent opacity-40 hover:opacity-100'
                      }`}
                    >
                      <Image src={img} alt={`Gallery alternative ${i}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              </div> 

              {/* Product Information */}
              <div className="flex flex-col pt-0 lg:pt-4">
                <div className="mb-12 space-y-8">
                  <div className="flex items-center space-x-1 text-accent/80">
                    {[...Array(product.rating || 5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                    <span className="text-[9px] uppercase tracking-[0.5em] font-black text-primary/20 ml-6">Verified reviews (42)</span>
                  </div>

                  <div className="space-y-4">
                    <span className="text-[10px] uppercase tracking-[0.6em] font-black text-primary/10 block mb-2">Item Ref: {product.code}</span>
                    <h1 className="premium-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-primary tracking-tighter">
                      {product.name}
                    </h1>
                    <p className="premium-serif text-2xl text-primary/40 tracking-tight">
                      {product.price}
                    </p>
                  </div>
                </div>

                <div className="mb-16 max-w-lg">
                  <p className="text-sm md:text-base text-primary/60 font-medium leading-relaxed tracking-wide">
                    {product.description || "Meticulously crafted from the finest locally sourced materials, this stunning piece captures the true essence of modern Sri Lankan elegance."}
                  </p>
                </div>

                {/* Sizing Interface */}
                <div className="mb-16 space-y-8">
                  <div className="flex justify-between items-end border-b border-primary/5 pb-4">
                    <span className="text-[10px] uppercase tracking-[0.6em] font-black text-primary/30">
                      Standard Sizing
                    </span>
                    <button className="text-[9px] uppercase tracking-[0.4em] font-black text-accent hover:text-primary transition-colors duration-500">
                      View Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {sizes.map(size => (
                      <button 
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-14 h-14 md:w-16 md:h-16 flex items-center justify-center text-[11px] font-black transition-all duration-700 border-2 ${
                            selectedSize === size 
                            ? 'border-primary bg-primary text-white scale-105 shadow-xl' 
                            : 'border-primary/5 text-primary/30 hover:border-accent hover:text-accent'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col space-y-6 mb-20">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center border border-primary/10 bg-slate-50/50 p-2">
                      <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center text-primary/40 hover:text-primary transition-colors font-black text-xl">-</button>
                      <div className="w-12 flex items-center justify-center font-black text-[13px] text-primary/60">{qty}</div>
                      <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center text-primary/40 hover:text-primary transition-colors font-black text-xl">+</button>
                    </div>

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
                      className="group relative flex-1 h-16 bg-primary text-white text-[11px] uppercase tracking-[0.6em] font-black transition-all duration-700 hover:bg-brand-gradient flex items-center justify-center overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]"
                    >
                      <span className="relative z-10">Add To Bag</span>
                      <div className="absolute inset-0 bg-brand-gradient translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
                    </button>

                    <button className="h-16 w-16 border border-primary/10 flex items-center justify-center text-primary/30 hover:text-accent hover:border-accent transition-all duration-700">
                      <Heart size={20} />
                    </button>
                  </div>
                  
                  <p className="text-[10px] text-primary/20 uppercase tracking-[0.4em] font-black text-center italic">
                    Free shipping on all premium curated orders.
                  </p>
                </div>
                
                <div className="border-t border-primary/5 pt-10 space-y-6">
                  <div className="flex items-center space-x-6 group">
                    <div className="w-px h-6 bg-accent/40 group-hover:h-10 transition-all duration-700" />
                    <div>
                      <h4 className="text-[9px] uppercase tracking-[0.5em] font-black text-primary/60 mb-1">Island Delivery</h4>
                      <p className="text-[11px] text-primary/30 uppercase tracking-[0.2em] font-black">Secure transit within 3-5 days</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 group">
                    <div className="w-px h-6 bg-accent/40 group-hover:h-10 transition-all duration-700" />
                    <div>
                      <h4 className="text-[9px] uppercase tracking-[0.5em] font-black text-primary/60 mb-1">Elite Craft</h4>
                      <p className="text-[11px] text-primary/30 uppercase tracking-[0.2em] font-black">Authentic Sri Lankan artisanal silk</p>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
