"use client";

import Navbar from "@/components/store/Navbar";
import Footer from "@/components/store/Footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Heart, Star, ChevronLeft, ChevronRight } from "@/components/Icons";
import { useEffect, useState, useRef } from "react";
import { useCart } from "@/context/CartContext";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const revealRefs = useRef<(HTMLElement | null)[]>([]);
  const { addToCart } = useCart();

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

  const collections = [
    { name: "Signature Frocks", image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1976&auto=format&fit=crop", spanClasses: "md:col-span-2 lg:col-span-2 md:row-span-2 lg:row-span-2", desc: "Effortless tropical silhouettes.", link: "/shop?category=frocks" },
    { name: "Designer Handbags", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1935&auto=format&fit=crop", spanClasses: "md:col-span-1 lg:col-span-1 md:row-span-1 lg:row-span-1", desc: "Artisanal woven mastery.", link: "/shop?category=handbags" },
    { name: "Premium Denim", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1974&auto=format&fit=crop", spanClasses: "md:col-span-1 lg:col-span-1 md:row-span-1 lg:row-span-1", desc: "Rugged yet refined.", link: "/shop?category=denim" },
    { name: "Footwear", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2000&auto=format&fit=crop", spanClasses: "md:col-span-1 lg:col-span-1 md:row-span-1 lg:row-span-1", desc: "Step with island soul.", link: "/shop?category=shoes" },
    { name: "Eco Hydration", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1974&auto=format&fit=crop", spanClasses: "md:col-span-1 lg:col-span-2 md:row-span-1 lg:row-span-1", desc: "Sustainable everyday style.", link: "/shop?category=waterbottle" },
  ];

  const favoritePieces = [
    { id: 1, name: "Ivory Handloom Saree", price: "LKR 18,500", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1964&auto=format&fit=crop", rating: 5, tag: "Best Seller" },
    { id: 2, name: "Midnight Batik Kurtha", price: "LKR 9,200", image: "https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=1978&auto=format&fit=crop", rating: 5, tag: "Exclusive" },
    { id: 3, name: "Tapered Linen Pant", price: "LKR 6,500", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1974&auto=format&fit=crop", rating: 4, tag: "New Arrival" },
    { id: 4, name: "Beeralu Lace Blouse", price: "LKR 7,800", image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=1974&auto=format&fit=crop", rating: 5, tag: "Trending" },
  ];

  const trendingProducts = [
    { id: 5, name: "Leather Tote Bag", price: "LKR 16,500", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1935&auto=format&fit=crop" },
    { id: 6, name: "Minimalist Watch", price: "LKR 28,000", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop" },
    { id: 7, name: "Linen Summer Dress", price: "LKR 12,500", image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1976&auto=format&fit=crop" },
    { id: 8, name: "Gold Hoop Earrings", price: "LKR 4,500", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1974&auto=format&fit=crop" },
  ];

  const addToRevealRefs = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Vanguard Full-Bleed Split Hero */}
      <section className="relative min-h-[100svh] lg:min-h-screen bg-primary overflow-hidden">
        <div className="w-full h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[100svh] lg:min-h-screen items-stretch">
            
            {/* Left Column: Branding & CTA (Pinned within virtual container) */}
            <div className="flex flex-col justify-center px-8 sm:px-12 md:px-20 lg:pl-[max(5rem,calc((100vw-1200px)/2))] lg:pr-20 py-32 lg:py-20 relative z-10 order-2 lg:order-1 bg-primary lg:bg-transparent">
              {/* Subtle ambient glow behind text */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-gradient opacity-[0.08] blur-[140px] pointer-events-none" />
              
              <div className="relative space-y-12 lg:space-y-16 animate-slide-up max-w-xl">
                <div className="space-y-8">
                  <div className="flex items-center space-x-6 text-accent font-bold tracking-[0.8em] text-[10px] uppercase opacity-80">
                    <div className="w-12 h-px bg-accent/30" />
                    <span>Collection 2026</span>
                  </div>
                  
                  <h1 className="premium-serif text-6xl sm:text-8xl lg:text-[100px] leading-[0.95] text-white tracking-tighter">
                    LUMERA <br />
                    <span className="italic font-light opacity-60">Vanguard</span>
                  </h1>

                  <p className="max-w-md text-white/50 text-lg md:text-xl font-light leading-relaxed tracking-wide">
                    Redefining Sri Lankan luxury through artisanal craftsmanship and modern minimalist silhouettes.
                  </p>
                </div>

                <div className="flex flex-col items-start">
                  <Link
                    href="/collections"
                    className="group relative px-16 py-6 bg-white text-primary text-[11px] uppercase tracking-[0.6em] font-black transition-all duration-700 hover:scale-105 hover:bg-brand-gradient hover:text-white overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)]"
                  >
                    <span className="relative z-10 transition-colors duration-500">
                      Go To Collection
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
                  <span className="text-white text-[9px] uppercase tracking-[0.6em] font-bold">Handcrafted in Sri Lanka</span>
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
              <div className="w-2 h-2 rounded-full bg-brand-gradient shadow-[0_0_10px_rgba(226,74,150,0.5)]" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-black text-white/50 hover:text-white transition-colors cursor-default">Authentic Local Craftsmanship</span>
              <div className="w-2 h-2 rounded-full bg-brand-gradient shadow-[0_0_10px_rgba(226,74,150,0.5)]" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-black text-white/50 hover:text-white transition-colors cursor-default">Supporting Local Artisans</span>
              <div className="w-2 h-2 rounded-full bg-brand-gradient shadow-[0_0_10px_rgba(226,74,150,0.5)]" />
            </div>
          ))}
        </div>
      </div>

      {/* Our Collections - Bento Grid */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16 md:mb-24" data-reveal ref={addToRevealRefs}>
            <span className="text-accent text-xs uppercase tracking-[0.6em] font-black block mb-6">Curated Edits</span>
            <h2 className="premium-serif text-6xl md:text-8xl mb-8 md:mb-10 leading-[0.9] tracking-tighter">Our Collections.</h2>
            <p className="text-muted text-xl font-light leading-relaxed max-w-2xl">
              Explore thoughtfully assembled pieces spanning elegant frocks to rugged denim and artisanal accessories, all designed for the modern Sri Lankan lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-[400px] md:auto-rows-[350px]">
            {collections.map((col, idx) => (
              <Link
                href={col.link}
                key={col.name}
                ref={addToRevealRefs}
                data-reveal
                style={{ transitionDelay: `${idx * 0.1}s` }}
                className={`group relative overflow-hidden w-full h-full flex flex-col justify-end p-8 md:p-12 transition-all duration-700 hover:shadow-2xl ${col.spanClasses} rounded-sm cursor-pointer`}
              >
                <Image
                  src={col.image}
                  alt={col.name}
                  fill
                  className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-700" />
                
                <div className="relative z-10 text-white transform translate-y-8 group-hover:translate-y-0 transition-all duration-700 ease-out">
                  <p className="text-[9px] uppercase tracking-[0.4em] mb-4 md:mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 font-bold text-accent">{col.desc}</p>
                  <h3 className="premium-serif text-4xl lg:text-5xl mb-6 md:mb-8 leading-none tracking-tight">{col.name}</h3>
                  <div className="group/btn inline-flex items-center space-x-6 mb-2 md:mb-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-primary transition-all duration-500 hover:scale-110">
                      <ArrowRight size={18} />
                    </div>
                    <span className="text-[9px] uppercase tracking-[0.4em] font-black group-hover:translate-x-2 transition-transform">Explore</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Most Popular Section - Sleek Carousel on Mobile / Grid on Desktop */}
      <section className="section-padding bg-slate-50 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8 md:gap-12" data-reveal ref={addToRevealRefs}>
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.6em] text-accent font-black">Trending Now</span>
              <h2 className="premium-serif text-6xl md:text-8xl leading-[0.9] tracking-tighter">Most Popular.</h2>
              <p className="text-muted tracking-[0.3em] text-[10px] font-black uppercase">The most sought-after local styles.</p>
            </div>
            <Link href="/shop" className="group flex items-center space-x-6 text-[10px] uppercase tracking-[0.5em] font-black">
              <span>View All Collection</span>
              <div className="w-20 h-[2px] bg-primary group-hover:w-32 group-hover:bg-accent transition-all duration-500" />
            </Link>
          </div>

          {/* Horizontal scroll on mobile, grid on md+ */}
          <div className="flex overflow-x-auto pb-10 md:pb-0 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 -mx-6 px-6 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {favoritePieces.map((p, idx) => (
              <Link
                href={`/product/${p.id}`}
                key={p.id}
                ref={addToRevealRefs}
                data-reveal
                style={{ transitionDelay: `${idx * 0.15}s` }}
                className="group relative flex-none w-[80vw] sm:w-[50vw] md:w-auto snap-center overflow-hidden cursor-pointer premium-card-dark block"
              >
                {/* Image Section */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                  />
                  
                  {/* Glass Badges */}
                  <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
                    <span className="bg-primary/40 backdrop-blur-xl text-white text-[9px] uppercase tracking-[0.4em] font-black px-5 py-2.5 border border-white/10">
                      {p.tag}
                    </span>
                    <button className="w-12 h-12 bg-primary/40 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-white hover:text-accent border border-white/10 transition-all duration-500 hover:rotate-12">
                      <Heart size={18} />
                    </button>
                  </div>

                  {/* Centered Quick Add Overlay on Image */}
                  <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20">
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
                       className="bg-white text-primary px-10 py-5 text-[10px] uppercase tracking-[0.5em] font-black hover:bg-brand-gradient hover:text-white transition-all duration-500 shadow-2xl transform translate-y-4 group-hover:translate-y-0"
                     >
                       Quick Add
                     </button>
                  </div>
                </div>

                {/* Solid Content Section */}
                <div className="p-8 md:p-10 bg-primary relative z-30 border-t border-white/5 group-hover:bg-[#121212] transition-colors duration-500 flex flex-col justify-between">
                  <div className="space-y-4 md:space-y-6">
                    <div className="flex space-x-1.5 text-accent">
                      {[...Array(p.rating)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                    </div>
                    <div>
                      <h3 className="text-white text-3xl md:text-4xl font-light tracking-tight premium-serif leading-none mb-3">{p.name}</h3>
                      <p className="font-bold tracking-[0.4em] text-white/40 text-[10px] uppercase">{p.price}</p>
                    </div>
                    
                    {/* Add to Bag (Mobile Only) */}
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
                      className="w-full mt-6 md:hidden py-5 border border-white/10 text-white text-[10px] uppercase tracking-[0.5em] font-black hover:bg-brand-gradient hover:border-transparent transition-all duration-500 relative z-40"
                    >
                      Add To Bag
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>



      {/* Brand Ethos - Powerful Finality */}
      <section className="section-padding bg-primary text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-gradient opacity-10 blur-[150px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-brand-gradient opacity-10 blur-[150px] translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-6 max-w-5xl relative z-10" data-reveal ref={addToRevealRefs}>
          <div className="inline-block p-4 bg-white/5 rounded-full backdrop-blur-xl mb-12 md:mb-16">
            <span className="text-accent text-[10px] uppercase tracking-[0.8em] font-black px-8 md:px-12">Our Philosophy</span>
          </div>
          <h2 className="premium-serif text-5xl md:text-[100px] mb-12 md:mb-20 leading-[0.85] tracking-tighter">
            Designed for the <br /> Woman who makes <br /> her own rules.
          </h2>
          <div className="flex flex-col items-center space-y-12 md:space-y-16 px-2 md:px-6">
            <div className="w-px h-24 md:h-32 bg-gradient-to-b from-transparent via-accent to-transparent" />
            <p className="text-xl md:text-3xl text-white/80 font-light leading-relaxed max-w-3xl italic">
              "Lumera is not just a brand; it's a celebration of purely Sri Lankan elegance.
              We curate style that honors local artistry and empowers the island spirit."
            </p>
            <Link href="/about" className="relative px-12 py-6 lg:px-16 lg:py-8 bg-white text-primary text-[10px] uppercase tracking-[0.5em] font-black transition-all duration-500 shadow-2xl hover:bg-brand-gradient hover:text-white hover:scale-105 overflow-hidden group">
              <span className="relative z-10">Discover Our Heritage</span>
              <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
