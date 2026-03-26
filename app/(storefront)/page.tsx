"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Heart, Star, ChevronLeft, ChevronRight } from "@/components/Icons";
import { useEffect, useState, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const revealRefs = useRef<(HTMLElement | null)[]>([]);
  const { products, categories } = useProducts();
  const { addToCart } = useCart();

  // Derived dynamic lists
  const favoritePieces = products.slice(0, 6).map(p => ({ ...p, rating: 5, tag: "Dynamic" }));
  const trendingProducts = products.slice(0, 4);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

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

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const collections = categories.slice(0, 5).map((cat, idx) => {
    const spanClasses = [
      "md:col-span-2 lg:col-span-2 md:row-span-2 lg:row-span-2",
      "md:col-span-1 lg:col-span-1 md:row-span-1 lg:row-span-1",
      "md:col-span-1 lg:col-span-1 md:row-span-1 lg:row-span-1",
      "md:col-span-1 lg:col-span-1 md:row-span-1 lg:row-span-1",
      "md:col-span-1 lg:col-span-2 md:row-span-1 lg:row-span-1"
    ];
    return {
      name: cat.name,
      image: cat.image,
      desc: cat.description,
      link: `/shop?category=${cat.slug}`,
      spanClasses: spanClasses[idx]
    };
  });

  const addToRevealRefs = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <main className="min-h-screen">
      {/* Vanguard Full-Bleed Split Hero - Immersive imagery with 1200px text pinning */}
      <section className="relative min-h-[100svh] lg:min-h-screen bg-primary overflow-hidden">
        <div className="w-full h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[100svh] lg:min-h-screen items-stretch">

            {/* Left Column: Branding & CTA - Pinned to 1200px vertical axis */}
            <div className="flex flex-col justify-center px-8 sm:px-12 md:px-20 lg:pl-[max(5rem,calc((100vw-1200px)/2))] lg:pr-20 py-32 lg:py-20 relative z-10 order-2 lg:order-1 bg-primary lg:bg-transparent">
              {/* Subtle ambient glow behind text */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-gradient opacity-[0.08] blur-[140px] pointer-events-none" />

              <div className="relative space-y-8 lg:space-y-10 animate-slide-up max-w-xl">
                <div className="space-y-8">
                  <div className="flex items-center space-x-6 text-accent font-bold tracking-[0.8em] text-[10px] uppercase opacity-80">
                    <div className="w-12 h-px bg-accent/30" />
                    <span>Collection 2026</span>
                  </div>

                  <h1 className="premium-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-white tracking-tighter">
                    LUMERA <br />
                    <span className="font-light opacity-60">Collections</span>
                  </h1>

                  <p className="max-w-md text-white/40 text-sm md:text-base font-medium leading-relaxed tracking-wide">
                    Redefining Sri Lankan luxury through artisanal craftsmanship and modern minimalist silhouettes.
                  </p>
                </div>

                <div className="flex flex-col items-start mt-12 lg:mt-16">
                  <Link
                    href="/collections"
                    className="group relative px-16 py-6 bg-white text-primary text-[11px] uppercase tracking-[0.6em] font-black transition-all duration-700 hover:scale-105 hover:bg-brand-gradient hover:text-white overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)]"
                  >
                    <span className="relative z-10 transition-colors duration-500">
                      Explore Full Boutique
                    </span>
                    <div className="absolute inset-0 bg-brand-gradient translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
                  </Link>

                  <div className="mt-20 flex items-center space-x-8 opacity-30 group cursor-pointer hover:opacity-100 transition-opacity">
                    <p className="text-[9px] uppercase tracking-[0.8em] text-white font-bold">Scroll</p>
                    <div className="w-24 h-px bg-gradient-to-r from-white to-transparent" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Full-Bleed Immersive Exterior Image */}
            <div className="relative h-[60vh] sm:h-[70vh] lg:h-auto overflow-hidden order-1 lg:order-2 animate-scale-in">
              <Image
                src="/hero.webp"
                alt="Lumera Hero Editorial"
                fill
                className="object-cover opacity-95 transition-transform duration-[8s] hover:scale-110"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-transparent hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent lg:hidden" />

              {/* Floating Badge (Refined) */}
              <div className="absolute bottom-12 left-12 md:bottom-20 md:left-20 z-20">
                <div className="bg-primary/40 backdrop-blur-3xl border border-white/10 px-8 py-4 rounded-full">
                  <span className="text-white text-[9px] uppercase tracking-[0.6em] font-bold">Shishi’s Exclusive Picks</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust Ticker - Smoother & Faster */}
      <div className="bg-primary text-white py-4 md:py-6 overflow-hidden border-y border-white/5 relative z-20">
        <div className="flex whitespace-nowrap animate-infinite-scroll">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center space-x-8 md:space-x-16 px-8 md:px-16">
              <span className="text-[10px] uppercase tracking-[0.4em] font-black text-white/50 hover:text-white transition-colors cursor-default">Island-wide Delivery in Sri Lanka</span>
              <div className="w-2 h-2 rounded-full bg-white/20" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-black text-white/50 hover:text-white transition-colors cursor-default">Authentic Local Craftsmanship</span>
              <div className="w-2 h-2 rounded-full bg-white/20" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-black text-white/50 hover:text-white transition-colors cursor-default">Supporting Local Artisans</span>
              <div className="w-2 h-2 rounded-full bg-white/20" />
            </div>
          ))}
        </div>
      </div>

      {/* Centered Boutique Collections Header */}
      <section className="py-16 md:py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 mb-12 lg:mb-16">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-4 animate-fade-in" data-reveal ref={addToRevealRefs}>
            <div className="flex flex-col items-center space-y-6">
              <div className="w-px h-16 bg-gradient-to-t from-accent to-transparent" />
              <div className="flex items-center space-x-6 text-accent font-bold tracking-[0.5em] text-[10px] uppercase opacity-80">
                <span>The 2026 Edit</span>
              </div>
            </div>

            <h2 className="premium-serif text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tighter text-primary text-balance mx-auto">
              The <br />
              <span className="italic font-light opacity-60">Collections.</span>
            </h2>

            <p className="max-w-xl text-muted text-sm md:text-base font-light opacity-40 leading-relaxed tracking-wide">
              Thoughtfully assembled capsules spanning elegant frocks, rugged denim, and artisanal accessories — each piece designed for the modern Sri Lankan spirit.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {collections.slice(0, 4).map((col, idx) => (
              <Link
                href={col.link}
                key={col.name}
                ref={addToRevealRefs}
                data-reveal
                style={{ transitionDelay: `${idx * 0.1}s` }}
                className="group relative aspect-[3/4.5] overflow-hidden rounded-sm border border-black/[0.03] transition-all duration-700 hover:shadow-[0_40px_100px_-30px_rgba(0,0,0,0.15)] flex flex-col justify-end p-10 cursor-pointer"
              >
                <Image
                  src={col.image}
                  alt={col.name}
                  fill
                  className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                />

                {/* Minimal Overlay - only shows on hover */}
                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-60 transition-opacity duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-700" />

                <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                  <h3 className="premium-serif text-2xl text-white mb-6 leading-none tracking-tight">{col.name}</h3>

                  <div className="flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 transform translate-y-2 group-hover:translate-y-0">
                    <span className="text-[9px] uppercase tracking-[0.4em] font-black text-white py-1 border-b border-white/20 hover:border-accent">Explore Edit</span>
                    <ArrowRight size={14} className="text-white" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Centered Most Popular Header */}
      <section className="py-16 md:py-20 lg:py-28 bg-slate-50/50 relative overflow-hidden">
        <div className="container mx-auto px-6 mb-12 lg:mb-16">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4 animate-fade-in" data-reveal ref={addToRevealRefs}>
            <div className="flex flex-col items-center space-y-6">
              <div className="w-px h-16 bg-gradient-to-t from-accent to-transparent" />
              <div className="flex items-center space-x-6 text-accent font-bold tracking-[0.5em] text-[10px] uppercase opacity-80">
                <span>Trending Pieces</span>
              </div>
            </div>

            <h2 className="premium-serif text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tighter text-primary text-balance mx-auto">
              Most <br />
              <span className="italic font-light opacity-60">Popular.</span>
            </h2>

            <Link href="/shop" className="group flex items-center space-x-4 text-[11px] uppercase tracking-[0.4em] font-black text-primary/40 hover:text-primary transition-all pb-1 border-b border-primary/5 hover:border-accent">
              <span>Explore the full selection</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="flex overflow-x-auto pb-10 md:pb-0 snap-x snap-mandatory md:grid md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {favoritePieces.slice(0, 8).map((p, idx) => (
              <div
                key={p.id}
                ref={addToRevealRefs}
                data-reveal
                style={{ transitionDelay: `${idx * 0.1}s` }}
                className="group relative flex-none w-[80vw] sm:w-[50vw] md:w-auto snap-center"
              >
                <Link href={`/product/${p.slug}`} className="block relative aspect-[3/4] overflow-hidden rounded-sm bg-white shadow-sm border border-black/[0.03] mb-8 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] group-hover:-translate-y-2 transition-all duration-700">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                  />

                  {/* Floating Identity Badge - Tag (Top-Right) */}
                  <div className="absolute top-6 right-6 z-30 pointer-events-none">
                    <span className="bg-primary/40 backdrop-blur-xl text-white text-[8px] uppercase tracking-[0.4em] font-black px-4 py-2 border border-white/10">
                      {p.tag}
                    </span>
                  </div>

                  {/* Floating Action Badge - Heart (Below Tag) */}
                  <div className="absolute top-20 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30">
                    <button className="w-12 h-12 bg-white/90 backdrop-blur-xl rounded-full flex items-center justify-center text-primary shadow-xl hover:bg-brand-gradient hover:text-white transition-all cursor-pointer">
                      <Heart size={18} />
                    </button>
                  </div>

                  {/* Minimalist Quick Add Line */}
                  <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out bg-white/95 backdrop-blur-md z-30">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart({
                          productId: p.id,
                          name: p.name,
                          price: p.price,
                          image: p.image,
                          size: "M",
                          quantity: 1
                        });
                      }}
                      className="w-full py-4 text-[9px] uppercase tracking-[0.4em] font-black text-primary hover:text-accent transition-colors cursor-pointer"
                    >
                      Quick Add To Bag
                    </button>
                  </div>
                </Link>

                <div className="space-y-3 px-2">
                  <h3 className="premium-serif text-xl md:text-2xl text-primary tracking-tight leading-none">{p.name}</h3>
                  <div className="flex justify-between items-center opacity-40 group-hover:opacity-100 transition-opacity">
                    <p className="font-bold tracking-[0.3em] text-[10px] uppercase">{p.price}</p>
                    <div className="flex space-x-1">
                      {[...Array(p.rating)].map((_, i) => <Star key={i} size={8} fill="currentColor" className="text-accent" />)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Redesigned Brand Ethos - Finality & Power */}
      <section className="py-24 md:py-32 lg:py-40 bg-primary text-white text-center relative overflow-hidden text-balance">
        {/* Sync Ambient Glow with previous dark states */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-gradient opacity-[0.08] blur-[160px] pointer-events-none" />

        <div className="container mx-auto px-6 max-w-5xl relative z-10" data-reveal ref={addToRevealRefs}>
          <div className="flex flex-col items-center space-y-10 animate-fade-in">
            {/* Sync Visual Lead from above */}
            <div className="flex flex-col items-center space-y-6">
              <div className="w-px h-16 bg-gradient-to-t from-accent to-transparent" />
              <div className="flex items-center space-x-6 text-accent font-bold tracking-[0.5em] text-[10px] uppercase opacity-80">
                <span>Our Philosophy</span>
              </div>
            </div>

            <h2 className="premium-serif text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tighter text-white text-balance mx-auto">
              Designed for the woman <br />
              <span className="italic font-light opacity-60">who makes her own rules.</span>
            </h2>

            <div className="w-full max-w-2xl space-y-6 mb-12 lg:mb-16">
              <p className="text-sm md:text-lg text-white/40 font-light leading-relaxed italic text-left md:text-center mx-auto tracking-wide">
                "Lumera is not just a brand; it's a celebration of purely Sri Lankan elegance. We curate style that honors local artistry and empowers the island spirit."
              </p>
            </div>

            <Link
              href="/about"
              className="group relative px-16 py-6 lg:px-20 lg:py-7 bg-white text-primary text-[11px] uppercase tracking-[0.6em] font-black transition-all duration-700 hover:scale-105 hover:bg-brand-gradient hover:text-white overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]"
            >
              <span className="relative z-10 transition-colors duration-500">
                Discover Our Heritage
              </span>
              <div className="absolute inset-0 bg-brand-gradient translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
