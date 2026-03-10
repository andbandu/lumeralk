"use client";

import Navbar from "@/components/store/Navbar";
import Footer from "@/components/store/Footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Heart, Star, ChevronLeft, ChevronRight } from "@/components/Icons";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  const categories = [
    { name: "The Silk Edit", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop", size: "lg", desc: "Timeless elegance in every thread." },
    { name: "Essentials", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=2010&auto=format&fit=crop", size: "sm", desc: "Elevated basics for your wardrobe." },
    { name: "Gold Pieces", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1974&auto=format&fit=crop", size: "sm", desc: "Statement accessories to shine." },
  ];

  const favoritePieces = [
    { id: 1, name: "Ivory Silk Gown", price: "$240.00", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1964&auto=format&fit=crop", rating: 5, tag: "Best Seller" },
    { id: 2, name: "Midnight Blazer", price: "$180.00", image: "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=1978&auto=format&fit=crop", rating: 5, tag: "Exclusive" },
    { id: 3, name: "Tapered Linen Pant", price: "$125.00", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1974&auto=format&fit=crop", rating: 4, tag: "New Arrival" },
    { id: 4, name: "Soft Cashmere Scarf", price: "$85.00", image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=1974&auto=format&fit=crop", rating: 5, tag: "Trending" },
  ];

  const trendingProducts = [
    { id: 5, name: "Leather Tote Bag", price: "$180.00", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1935&auto=format&fit=crop" },
    { id: 6, name: "Minimalist Watch", price: "$320.00", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop" },
    { id: 7, name: "Linen Summer Dress", price: "$145.00", image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1976&auto=format&fit=crop" },
    { id: 8, name: "Gold Hoop Earrings", price: "$45.00", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1974&auto=format&fit=crop" },
  ];

  const addToRevealRefs = (el: HTMLDivElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Cinematic Vanguard Hero */}
      <section className="relative min-h-screen flex items-center bg-primary overflow-hidden pt-28 pb-16">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-brand-gradient opacity-10 blur-[130px] -rotate-12 translate-x-1/2" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-10 animate-slide-up">
              <div className="space-y-6">
                <div className="flex items-center space-x-4 text-accent font-bold tracking-[0.5em] text-[10px] uppercase">
                  <span>Premium Experience</span>
                  <div className="w-16 h-px bg-brand-gradient" />
                </div>
                <h1 className="premium-serif text-screen md:text-[140px] lg:text-[180px] leading-[0.8] text-white tracking-tighter">
                  Bold <br />
                  <span className="text-gradient drop-shadow-2xl">Beauty.</span>
                </h1>
              </div>

              <div className="max-w-md space-y-12">
                <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed border-l-2 border-accent pl-8">
                  Redefine your style with Lumera. A fusion of Sri Lankan heritage and modern luxury for the sophisticated woman.
                </p>

                <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-10">
                  <Link
                    href="/shop"
                    className="group relative w-full sm:w-auto px-14 py-7 bg-brand-gradient text-white text-[10px] uppercase tracking-[0.4em] font-black hover:scale-105 transition-all duration-500 shadow-[0_20px_60px_-15px_rgba(226,74,150,0.5)] overflow-hidden"
                  >
                    <span className="relative z-10">Shop The Edit</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </Link>
                  <Link href="/collections" className="flex items-center space-x-6 text-white hover:text-accent transition-all group">
                    <span className="text-[10px] uppercase tracking-widest font-bold border-b border-white/20 pb-1 group-hover:border-accent">View Lookbook</span>
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                      <ArrowRight size={16} />
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative animate-scale-in">
              <div className="relative group">
                <div className="relative z-10 aspect-[3/4] overflow-hidden border-[1px] border-white/10 p-5 bg-white/5 backdrop-blur-xl rounded-sm">
                  <div className="relative w-full h-full overflow-hidden shadow-2xl">
                    <Image
                      src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
                      alt="Lumera Editorial"
                      fill
                      className="object-cover transition-transform duration-[4s] group-hover:scale-110"
                      priority
                    />
                  </div>
                </div>

                <div className="absolute -bottom-16 -left-16 z-30 group/badge hidden md:block">
                  <div className="relative w-56 h-56 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow origin-center">
                      <defs>
                        <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                      </defs>
                      <text className="text-[7px] uppercase tracking-[0.3em] font-black fill-white opacity-30 group-hover/badge:opacity-100 transition-opacity duration-700">
                        <textPath xlinkHref="#circlePath">
                          LIMITED LAUNCH SELECTION • LIMITED LAUNCH SELECTION •
                        </textPath>
                      </text>
                    </svg>

                    <div className="absolute flex items-center justify-center">
                      <div className="w-28 h-28 bg-white rounded-full flex flex-col items-center justify-center shadow-2xl transform group-hover/badge:scale-110 group-hover/badge:bg-brand-gradient transition-all duration-700">
                        <span className="text-primary group-hover/badge:text-white font-black text-4xl leading-none transition-colors duration-500">20%</span>
                        <span className="text-[10px] uppercase tracking-[0.4em] font-black text-accent group-hover/badge:text-white/80 mt-1 transition-colors duration-500">OFF</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-20 top-1/2 -rotate-90 origin-right transition-all duration-1000 hidden xl:block opacity-10 translate-x-10 group-hover:translate-x-0 group-hover:opacity-30">
                <span className="text-white text-[120px] font-black tracking-tighter premium-serif italic select-none">LUMERA LUXE</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4 z-20 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
          <p className="text-[9px] uppercase tracking-[0.8em] text-white font-bold">Scroll Down</p>
          <div className="w-px h-16 bg-gradient-to-t from-accent to-transparent animate-bounce" />
        </div>
      </section>

      {/* Trust Ticker - Smoother & Faster */}
      <div className="bg-primary text-white py-6 overflow-hidden border-y border-white/5 relative z-20">
        <div className="flex whitespace-nowrap animate-infinite-scroll">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center space-x-16 px-16">
              <span className="text-[10px] uppercase tracking-[0.4em] font-black text-white/50 hover:text-white transition-colors cursor-default">Free Global Shipping on orders over $250</span>
              <div className="w-2 h-2 rounded-full bg-brand-gradient shadow-[0_0_10px_rgba(226,74,150,0.5)]" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-black text-white/50 hover:text-white transition-colors cursor-default">Ethically Sourced Materials</span>
              <div className="w-2 h-2 rounded-full bg-brand-gradient shadow-[0_0_10px_rgba(226,74,150,0.5)]" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-black text-white/50 hover:text-white transition-colors cursor-default">Luxury Experience Redefined</span>
              <div className="w-2 h-2 rounded-full bg-brand-gradient shadow-[0_0_10px_rgba(226,74,150,0.5)]" />
            </div>
          ))}
        </div>
      </div>

      {/* Categories Grid - Staggered Reveal */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-24" data-reveal ref={addToRevealRefs}>
            <span className="text-accent text-xs uppercase tracking-[0.5em] font-bold block mb-4">Curated dialogue</span>
            <h2 className="premium-serif text-5xl md:text-7xl mb-10 leading-tight">Elevate Your Presence.</h2>
            <p className="text-muted text-xl font-light leading-relaxed">
              Explore our quintessential collections, meticulously designed to empower the modern woman.
              Each piece tells a story of craftsmanship and uncompromising quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {categories.map((cat, idx) => (
              <div
                key={cat.name}
                ref={addToRevealRefs}
                data-reveal
                style={{ transitionDelay: `${idx * 0.2}s` }}
                className={`group relative overflow-hidden h-[650px] flex flex-col justify-end p-12 transition-all duration-700 hover:shadow-2xl ${cat.size === 'lg' ? 'lg:col-span-2' : ''}`}
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-700" />
                <div className="relative z-10 text-white transform translate-y-8 group-hover:translate-y-0 transition-all duration-700 ease-out">
                  <p className="text-[10px] uppercase tracking-[0.4em] mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 font-bold text-accent">{cat.desc}</p>
                  <h3 className="premium-serif text-5xl mb-8 leading-none tracking-tight">{cat.name}</h3>
                  <Link href="/shop" className="group/btn inline-flex items-center space-x-6">
                    <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-primary transition-all duration-500">
                      <ArrowRight size={20} />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.4em] font-black group-hover:translate-x-2 transition-transform">Explore Series</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Favorite Section - Bold Interaction */}
      <section className="section-padding bg-secondary/30 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12" data-reveal ref={addToRevealRefs}>
            <div className="space-y-4">
              <h2 className="premium-serif text-5xl md:text-7xl">Season Favorites.</h2>
              <p className="text-muted tracking-[0.2em] text-xs font-bold uppercase">Meticulously curated essentials for you.</p>
            </div>
            <Link href="/shop" className="group flex items-center space-x-4 text-[10px] uppercase tracking-[0.4em] font-black">
              <span>Shop All Pieces</span>
              <div className="w-16 h-[2px] bg-primary group-hover:w-24 group-hover:bg-accent transition-all duration-500" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {favoritePieces.map((p, idx) => (
              <div
                key={p.id}
                ref={addToRevealRefs}
                data-reveal
                style={{ transitionDelay: `${idx * 0.15}s` }}
                className="group luxury-card bg-white p-4 rounded-sm"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-secondary mb-8 shadow-sm group-hover:shadow-xl transition-all duration-700">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-primary/90 backdrop-blur-md text-white text-[8px] uppercase tracking-[0.3em] font-black px-4 py-2 rounded-full">
                      {p.tag}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
                    <button className="bg-white text-primary px-10 py-5 text-[10px] uppercase tracking-[0.4em] font-black translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-accent hover:text-white shadow-2xl">
                      Add To Bag
                    </button>
                  </div>
                  <button className="absolute bottom-6 right-6 p-4 bg-white/80 backdrop-blur-md rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-accent hover:text-white group-hover:rotate-12 translate-y-4 group-hover:translate-y-0">
                    <Heart size={20} />
                  </button>
                </div>
                <div className="space-y-5 px-3 pb-4">
                  <div className="flex justify-between items-center text-[10px] text-accent uppercase tracking-[0.2em] font-black">
                    <div className="flex space-x-1">
                      {[...Array(p.rating)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                    </div>
                    <span className="opacity-60 group-hover:opacity-100 transition-opacity">Best Choice</span>
                  </div>
                  <h3 className="text-2xl font-light tracking-tight group-hover:text-accent transition-colors premium-serif leading-snug">{p.name}</h3>
                  <p className="font-bold tracking-[0.4em] text-primary text-sm">{p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Story - Immersive Split */}
      <section className="section-padding bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="relative group" data-reveal ref={addToRevealRefs}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop"
                  alt="Editorial Look"
                  fill
                  className="object-cover transition-transform duration-[3s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-1000" />
              </div>
              <div className="absolute -bottom-16 -right-16 w-3/4 aspect-[4/5] overflow-hidden rounded-sm shadow-[0_50px_100px_rgba(0,0,0,0.2)] border-[15px] border-white hidden md:block">
                <Image
                  src="https://images.unsplash.com/photo-1539109132384-3615557de14a?q=80&w=1920&auto=format&fit=crop"
                  alt="Editorial Detail"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-12" data-reveal ref={addToRevealRefs}>
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-[0.6em] text-accent font-black">MUSE Editorial</span>
                <h2 className="premium-serif text-6xl md:text-8xl leading-tight text-primary">The Art of <br /> Minimal.</h2>
              </div>
              <p className="text-xl text-muted font-light leading-relaxed max-w-lg border-l-2 border-secondary pl-10 italic">
                "In a world of constant noise, elegance is the quietest statement you can make.
                Our designs are an ode to the woman who finds power in simplicity."
              </p>
              <div className="pt-10">
                <Link href="/shop" className="group/link inline-flex items-center space-x-8">
                  <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white group-hover/link:bg-brand-gradient shadow-2xl transition-all duration-500 group-hover/link:scale-110">
                    <ArrowRight size={28} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.5em] font-black block border-b-2 border-accent pb-1">Shop The Portrait Collection</span>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-muted mt-2 opacity-60">Spring / Summer Archive 2024</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Ethos - Powerful Finality */}
      <section className="py-32 md:py-48 bg-primary text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-gradient opacity-10 blur-[150px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-brand-gradient opacity-10 blur-[150px] translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-6 max-w-4xl relative z-10" data-reveal ref={addToRevealRefs}>
          <div className="inline-block p-4 bg-white/5 rounded-full backdrop-blur-xl mb-12">
            <span className="text-accent text-xs uppercase tracking-[0.6em] font-black px-8">Our Philosophy</span>
          </div>
          <h2 className="premium-serif text-5xl md:text-8xl mb-16 leading-[0.9] tracking-tighter">
            Designed for the <br /> Woman who makes <br /> her own rules.
          </h2>
          <div className="flex flex-col items-center space-y-12 px-6">
            <div className="w-px h-24 bg-gradient-to-b from-transparent via-accent to-transparent" />
            <p className="text-2xl text-white/80 font-light leading-relaxed max-w-2xl italic">
              "Lumera is not just a brand; it's a celebration of refined strength.
              We curate style that transcends seasons and empowers the self."
            </p>
            <Link href="/about" className="group flex items-center space-x-6 bg-white text-primary px-16 py-8 text-[10px] uppercase tracking-[0.5em] font-black hover:bg-brand-gradient hover:text-white transition-all duration-700 shadow-2xl overflow-hidden relative">
              <span className="relative z-10">Discover Our Heritage</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
