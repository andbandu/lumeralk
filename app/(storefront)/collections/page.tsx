"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/Icons";
import { useEffect, useRef } from "react";
import { useProducts } from "@/context/ProductContext";

export default function CollectionsPage() {
  const { products, categories } = useProducts();
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Derived dynamic collections with item counts
  const dynamicCollections = categories.map(cat => {
    const itemCount = products.filter(p => p.category === cat.name).length;
    return {
      name: cat.name,
      image: cat.image,
      description: cat.description,
      items: `${itemCount.toString().padStart(2, '0')} Articles`,
      slug: cat.slug
    };
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    revealRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRevealRefs = (el: HTMLDivElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <div className="bg-white min-h-screen text-primary overflow-x-hidden selection:bg-accent selection:text-white">
      {/* Editorial Header Spacer - Constant site-wide hierarchy */}
      <div className="h-40 md:h-44 lg:h-44 bg-primary w-full shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute inset-0 bg-brand-gradient opacity-[0.03] blur-[100px] pointer-events-none" />
      </div>

      <main className="pb-24">
        {/* Minimalist Breadcrumb Context */}
        <nav className="bg-white py-8 md:py-12 border-b border-primary/5">
          <div className="container mx-auto px-6 max-w-[1200px]">
             <div className="flex items-center space-x-4 text-[9px] md:text-[10px] uppercase tracking-[0.5em] font-black text-primary/20">
                <Link href="/" className="hover:text-accent transition-colors">Home</Link>
                <span>/</span>
                <Link href="/shop" className="hover:text-accent transition-colors">Shop</Link>
                <span>/</span>
                <span className="text-primary/60">Collections</span>
             </div>
          </div>
        </nav>

        {/* Editorial Title Section */}
        <section className="py-20 lg:py-24">
          <div className="container mx-auto px-6 max-w-[1200px]">
             <div className="flex flex-col items-center text-center space-y-8 animate-fade-in">
                <h1 className="premium-serif text-5xl md:text-7xl lg:text-8xl leading-[1] text-primary tracking-tighter max-w-4xl mx-auto">
                   The <span className="italic font-light opacity-60">Collections.</span>
                </h1>
                <p className="max-w-xl text-primary/60 text-sm md:text-base font-medium leading-relaxed tracking-wide">
                   Seasonal archives of modern Sri Lankan artistry.
                </p>
             </div>
          </div>
        </section>

        {/* Collections Gallery - Systematic Split Grid */}
        <section className="pt-24 lg:pt-32">
          <div className="container mx-auto px-6 max-w-[1200px] space-y-40 md:space-y-64">
            {dynamicCollections.map((col, idx) => (
              <div 
                key={col.name} 
                className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-32 group ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                data-reveal
                ref={addToRevealRefs}
              >
                {/* Visual Anchor */}
                <div className="relative w-full lg:w-3/5 aspect-[4/5] bg-secondary/10 overflow-hidden border border-black/[0.03]">
                  <Image 
                    src={col.image} 
                    alt={col.name} 
                    fill 
                    className="object-cover transition-transform duration-[4s] ease-out group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-40 transition-opacity duration-1000" />
                </div>

                {/* Metadata & Description */}
                <div className="w-full lg:w-2/5 space-y-10 text-center lg:text-left">
                  <div className="space-y-4">
                    <span className="text-[9px] uppercase tracking-[0.5em] font-black text-accent/60">{col.items}</span>
                    <h2 className="premium-serif text-4xl md:text-5xl lg:text-6xl text-primary tracking-tighter leading-[1.1]">
                      {col.name}
                    </h2>
                  </div>

                  <p className="text-primary/60 text-sm md:text-base font-medium leading-relaxed tracking-wide max-w-sm mx-auto lg:mx-0">
                    {col.description}
                  </p>

                  <div className="pt-4">
                    <Link href={`/shop?category=${col.slug}`} className="group relative inline-flex items-center space-x-6 h-16 px-12 bg-primary text-white text-[11px] uppercase tracking-[0.5em] font-black transition-all duration-700 hover:bg-brand-gradient hover:-translate-y-1 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] overflow-hidden">
                       <span className="relative z-10">Explore the Edit</span>
                       <ArrowRight size={18} className="relative z-10 transition-transform duration-500 group-hover:translate-x-2" />
                       <div className="absolute inset-0 bg-brand-gradient translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
