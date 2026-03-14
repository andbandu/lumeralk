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

      {/* Cinematic Vanguard Hero */}
      <section className="relative min-h-[100svh] lg:min-h-screen flex items-center bg-primary overflow-hidden pt-36 pb-20 lg:pt-28 lg:pb-16">
        <div className="absolute top-0 right-0 w-full lg:w-2/3 h-full bg-brand-gradient opacity-20 lg:opacity-10 blur-[130px] -rotate-12 translate-x-1/4 lg:translate-x-1/2 z-0" />

        <div className="container mx-auto px-6 relative z-10 w-full">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-12 lg:items-center">
            
            {/* Text Content */}
            <div className="lg:col-span-7 space-y-6 lg:space-y-10 animate-slide-up order-1">
              <div className="space-y-4 lg:space-y-6">
                <div className="flex items-center space-x-4 text-accent font-bold tracking-[0.4em] lg:tracking-[0.5em] text-[8px] lg:text-[10px] uppercase">
                  <span>Premium Experience</span>
                  <div className="w-12 lg:w-16 h-px bg-brand-gradient" />
                </div>
                <h1 className="premium-serif text-[75px] sm:text-[100px] md:text-[140px] lg:text-[180px] leading-[0.85] lg:leading-[0.8] text-white tracking-tighter">
                  Bold <br />
                  <span className="text-gradient drop-shadow-2xl">Beauty.</span>
                </h1>
              </div>

              <div className="max-w-md space-y-8 lg:space-y-12">
                <p className="text-white/80 lg:text-white/60 text-sm md:text-xl font-light leading-relaxed border-l-2 border-accent pl-5 lg:pl-8">
                  Redefine your style with Lumera. A fusion of Sri Lankan heritage and modern luxury for the sophisticated woman.
                </p>

                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
                  <Link
                    href="/shop"
                    className="group relative w-full sm:w-auto px-10 py-5 lg:px-14 lg:py-7 bg-brand-gradient text-white text-[10px] uppercase tracking-[0.4em] font-black hover:scale-105 transition-all duration-500 shadow-[0_15px_40px_-10px_rgba(226,74,150,0.5)] lg:shadow-[0_20px_60px_-15px_rgba(226,74,150,0.5)] overflow-hidden text-center"
                  >
                    <span className="relative z-10">Shop The Edit</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </Link>
                  <Link href="/collections" className="flex items-center justify-center space-x-4 lg:space-x-6 text-white hover:text-accent transition-all group w-full sm:w-auto">
                    <span className="text-[10px] uppercase tracking-widest font-bold border-b border-white/20 pb-1 group-hover:border-accent">Lookbook</span>
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                      <ArrowRight size={14} className="lg:w-4 lg:h-4" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Glowing Image Card */}
            <div className="lg:col-span-5 relative animate-scale-in order-2 mt-4 lg:mt-0 mx-auto lg:mx-0 w-full max-w-[260px] sm:max-w-[320px] lg:max-w-none self-center">
              <div className="relative group">
                <div className="relative z-10 aspect-[3/4] overflow-hidden border-[1px] border-white/10 p-3 lg:p-5 bg-white/5 backdrop-blur-xl rounded-sm">
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

                <div className="absolute -bottom-8 -left-8 lg:-bottom-16 lg:-left-16 z-30 group/badge hidden sm:block">
                  <div className="relative w-36 h-36 lg:w-56 lg:h-56 flex items-center justify-center">
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
                      <div className="w-20 h-20 lg:w-28 lg:h-28 bg-white rounded-full flex flex-col items-center justify-center shadow-2xl transform group-hover/badge:scale-110 group-hover/badge:bg-brand-gradient transition-all duration-700">
                        <span className="text-primary group-hover/badge:text-white font-black text-2xl lg:text-4xl leading-none transition-colors duration-500">20%</span>
                        <span className="text-[8px] lg:text-[10px] uppercase tracking-[0.4em] font-black text-accent group-hover/badge:text-white/80 mt-1 transition-colors duration-500">OFF</span>
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

        <div className="absolute bottom-4 lg:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 lg:space-y-4 z-20 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
          <p className="text-[8px] lg:text-[9px] uppercase tracking-[0.6em] lg:tracking-[0.8em] text-white font-bold">Scroll</p>
          <div className="w-px h-8 lg:h-16 bg-gradient-to-t from-accent to-transparent animate-bounce" />
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
      <section className="py-20 md:py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16 md:mb-24" data-reveal ref={addToRevealRefs}>
            <span className="text-accent text-xs uppercase tracking-[0.5em] font-bold block mb-4">Curated Edits</span>
            <h2 className="premium-serif text-5xl md:text-7xl mb-8 md:mb-10 leading-tight">Our Collections.</h2>
            <p className="text-muted text-xl font-light leading-relaxed">
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
      <section className="py-20 md:py-32 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8 md:gap-12" data-reveal ref={addToRevealRefs}>
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.6em] text-accent font-black">Trending Now</span>
              <h2 className="premium-serif text-5xl md:text-7xl">Most Popular.</h2>
              <p className="text-muted tracking-[0.2em] text-xs font-bold uppercase">The most sought-after local styles.</p>
            </div>
            <Link href="/shop" className="group flex items-center space-x-4 text-[10px] uppercase tracking-[0.4em] font-black">
              <span>View All Collection</span>
              <div className="w-16 h-[2px] bg-primary group-hover:w-24 group-hover:bg-accent transition-all duration-500" />
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
                className="group relative flex-none w-[80vw] sm:w-[50vw] md:w-auto snap-center rounded-sm overflow-hidden cursor-pointer bg-primary shadow-xl border border-black/5 md:border-transparent block"
              >
                {/* Image Section */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                  />
                  
                  {/* Glass Badges */}
                  <div className="absolute top-5 left-5 right-5 flex justify-between items-center z-10">
                    <span className="bg-primary/60 backdrop-blur-md text-white text-[8px] uppercase tracking-[0.3em] font-black px-4 py-2 border border-white/10">
                      {p.tag}
                    </span>
                    <button className="w-10 h-10 bg-primary/60 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-accent border border-white/10 transition-all duration-500 hover:rotate-12">
                      <Heart size={16} />
                    </button>
                  </div>

                  {/* Centered Quick Add Overlay on Image */}
                  <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20">
                     <button 
                       onClick={(e) => {
                         e.preventDefault(); // Stop routing to the product page
                         addToCart({
                           productId: p.id,
                           name: p.name,
                           price: p.price,
                           image: p.image,
                           size: "M", // Default quick size
                           quantity: 1
                         });
                       }}
                       className="bg-white text-primary px-8 py-4 text-[9px] uppercase tracking-[0.4em] font-black hover:bg-brand-gradient hover:text-white transition-all duration-500 shadow-xl transform translate-y-4 group-hover:translate-y-0"
                     >
                       Quick Add
                     </button>
                  </div>
                </div>

                {/* Solid Content Section (Guaranteed Readability on all Browsers) */}
                <div className="p-6 md:p-8 bg-primary relative z-30 border-t border-white/5 group-hover:bg-[#121212] transition-colors duration-500 flex flex-col justify-between">
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex space-x-1 text-accent">
                      {[...Array(p.rating)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                    </div>
                    <div>
                      <h3 className="text-white text-2xl md:text-3xl font-light tracking-tight premium-serif leading-snug mb-2">{p.name}</h3>
                      <p className="font-bold tracking-[0.2em] md:tracking-[0.3em] text-white/50 text-xs">{p.price}</p>
                    </div>
                    
                    {/* Add to Bag (Mobile Only) */}
                    <button 
                      onClick={(e) => {
                         e.preventDefault(); // Stop routing to the product page
                         addToCart({
                           productId: p.id,
                           name: p.name,
                           price: p.price,
                           image: p.image,
                           size: "M", 
                           quantity: 1
                         });
                      }}
                      className="w-full mt-4 md:hidden py-4 border border-white/20 text-white text-[9px] uppercase tracking-[0.4em] font-black hover:bg-brand-gradient hover:border-transparent transition-colors duration-300 relative z-40"
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
      <section className="py-24 md:py-48 bg-primary text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-gradient opacity-10 blur-[150px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-brand-gradient opacity-10 blur-[150px] translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-6 max-w-4xl relative z-10" data-reveal ref={addToRevealRefs}>
          <div className="inline-block p-4 bg-white/5 rounded-full backdrop-blur-xl mb-8 md:mb-12">
            <span className="text-accent text-xs uppercase tracking-[0.6em] font-black px-6 md:px-8">Our Philosophy</span>
          </div>
          <h2 className="premium-serif text-4xl md:text-8xl mb-10 md:mb-16 leading-[1.1] md:leading-[0.9] tracking-tight md:tracking-tighter">
            Designed for the <br /> Woman who makes <br /> her own rules.
          </h2>
          <div className="flex flex-col items-center space-y-8 md:space-y-12 px-2 md:px-6">
            <div className="w-px h-16 md:h-24 bg-gradient-to-b from-transparent via-accent to-transparent" />
            <p className="text-lg md:text-2xl text-white/80 font-light leading-relaxed max-w-2xl italic">
              "Lumera is not just a brand; it's a celebration of purely Sri Lankan elegance.
              We curate style that honors local artistry and empowers the island spirit."
            </p>
            <Link href="/about" className="group flex items-center space-x-6 bg-white text-primary px-10 py-5 md:px-16 md:py-8 text-[10px] uppercase tracking-[0.5em] font-black hover:bg-brand-gradient hover:text-white transition-all duration-700 shadow-2xl overflow-hidden relative">
              <span className="relative z-10">Discover Our Heritage</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
