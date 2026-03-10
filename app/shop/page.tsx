import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Filter, ChevronDown } from "@/components/Icons";
import Navbar from "@/components/store/Navbar";
import Footer from "@/components/store/Footer";

export default function ProductListingPage() {
    const products = [
        { id: 1, name: "Silk Evening Gown", category: "Clothing", price: "$240.00", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1964&auto=format&fit=crop", isNew: true },
        { id: 2, name: "Leather Tote Bag", category: "Accessories", price: "$180.00", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1935&auto=format&fit=crop", isNew: false },
        { id: 3, name: "Cashmere Sweater", category: "Clothing", price: "$120.00", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop", isNew: true },
        { id: 4, name: "Gold Hoop Earrings", category: "Accessories", price: "$45.00", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1974&auto=format&fit=crop", isNew: false },
        { id: 5, name: "Minimalist Watch", category: "Accessories", price: "$320.00", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop", isNew: false },
        { id: 6, name: "Linen Summer Dress", category: "Clothing", price: "$145.00", image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1976&auto=format&fit=crop", isNew: true },
    ];

    const categories = ["All Products", "Clothing", "Accessories", "Jewelry", "Shoes"];

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Header */}
            <section className="pt-40 pb-20 bg-secondary/30">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="premium-serif text-5xl md:text-6xl mb-6">Our Collection</h1>
                    <p className="text-muted tracking-wide max-w-2xl mx-auto">
                        Explore our curated selection of premium women's apparel and accessories,
                        designed to elevate your everyday style with timeless elegance.
                    </p>
                </div>
            </section>

            {/* Filter & Sort Bar */}
            <section className="sticky top-[80px] z-40 bg-white border-b border-secondary py-6">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm uppercase tracking-widest font-bold">
                    <div className="flex items-center space-x-8 overflow-x-auto w-full md:w-auto no-scrollbar">
                        {categories.map((cat, idx) => (
                            <button
                                key={cat}
                                className={`whitespace-nowrap ${idx === 0 ? 'text-accent border-b-2 border-accent' : 'text-muted hover:text-primary'} transition-colors pb-1`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center space-x-6">
                        <button className="flex items-center space-x-2 text-muted hover:text-primary transition-colors">
                            <Filter size={16} />
                            <span>Filter</span>
                        </button>
                        <button className="flex items-center space-x-2 text-muted hover:text-primary transition-colors">
                            <span>Sort By</span>
                            <ChevronDown size={14} />
                        </button>
                    </div>
                </div>
            </section>

            {/* Products Listing */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-10">
                        {products.map((product) => (
                            <div key={product.id} className="group cursor-pointer">
                                <div className="relative h-[450px] overflow-hidden bg-secondary mb-6">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {product.isNew && (
                                        <span className="absolute top-4 left-4 bg-primary text-white text-[10px] px-3 py-1 uppercase tracking-widest font-bold">
                                            New
                                        </span>
                                    )}
                                    <div className="absolute top-4 right-4 flex flex-col space-y-3 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                                        <button className="p-3 bg-white rounded-full shadow-premium hover:bg-accent hover:text-white transition-colors">
                                            <Heart size={18} />
                                        </button>
                                        <button className="p-3 bg-white rounded-full shadow-premium hover:bg-accent hover:text-white transition-colors">
                                            <ShoppingBag size={18} />
                                        </button>
                                    </div>
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                                </div>
                                <div className="text-center group-hover:translate-y-[-5px] transition-transform duration-300">
                                    <p className="text-[10px] text-muted uppercase tracking-[0.2em] mb-2">{product.category}</p>
                                    <h3 className="text-lg font-medium mb-2 tracking-wide group-hover:text-accent transition-colors">{product.name}</h3>
                                    <p className="font-bold tracking-widest">{product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 text-center">
                        <button className="px-12 py-4 border border-primary text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-primary hover:text-white transition-all duration-300 shadow-premium">
                            Load More Pieces
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
