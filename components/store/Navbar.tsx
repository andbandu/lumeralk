"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingBag, Search, Menu, X, User } from "@/components/Icons";
import CartDrawer from "./CartDrawer";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
    const { cartCount } = useCart();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [showAnnouncement, setShowAnnouncement] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "New Arrivals", href: "/shop/new" },
        { name: "Clothing", href: "/shop/clothing" },
        { name: "Accessories", href: "/shop/accessories" },
        { name: "Collections", href: "/collections" },
    ];

    return (
        <header className="fixed top-0 w-full z-50 transition-all duration-700 pointer-events-none">
            <nav
                className={`container mx-auto px-6 transition-all duration-1000 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] pointer-events-auto mt-6 md:mt-10 ${isScrolled
                    ? "max-w-5xl translate-y-[-1.5rem]"
                    : "max-w-full translate-y-0"
                    }`}
            >
                <div
                    className={`relative w-full flex items-center justify-between px-8 md:px-16 py-4 transition-all duration-1000 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] ${isScrolled
                        ? "bg-white/95 backdrop-blur-3xl rounded-full shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-black/5 min-h-[64px]"
                        : "bg-transparent py-6"
                        }`}
                >
                    <div className="flex-1 flex items-center h-full">
                        <div className="flex items-center h-full gap-6 md:gap-8">
                            {/* Scrolled Logo Text - Animated width and opacity */}
                            <div className={`transition-all duration-1000 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] flex items-center overflow-hidden border-primary/10 ${isScrolled ? "max-w-[200px] opacity-100 pr-5 border-r mr-2" : "max-w-0 opacity-0 pr-0 border-r-0 mr-0"}`}>
                                <Link href="/" className="flex items-center hover:scale-[1.03] transition-transform whitespace-nowrap">
                                    <span className="premium-serif text-xl tracking-[0.3em] text-primary font-bold">
                                        LUMERA
                                    </span>
                                </Link>
                            </div>
                            
                            {/* Desktop Nav Links */}
                            <div className="hidden lg:flex items-center space-x-10 transition-all duration-1000 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`text-[9px] uppercase tracking-[0.5em] font-black leading-none transition-all duration-700 hover:text-accent transform hover:translate-y-[-1px] ${isScrolled ? "text-primary/60" : "text-white/60"
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>

                            {/* Mobile Menu Toggle Indicator */}
                            <button
                                className={`lg:hidden flex items-center justify-center p-2 -ml-2 transition-all duration-1000 ${isScrolled ? "text-primary" : "text-white"}`}
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
                            </button>
                        </div>
                    </div>

                    {/* Center: Image Mark (Cross-fades out on scroll) */}
                    <div className={`flex shrink-0 items-center justify-center absolute left-1/2 -translate-x-1/2 transition-all duration-1000 [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] ${isScrolled ? "opacity-0 scale-90 blur-sm pointer-events-none" : "opacity-100 scale-100 blur-0"}`}>
                        <Link href="/" className="flex items-center justify-center hover:scale-[1.02] transition-transform">
                            <img
                                src="/lumera.png"
                                alt="LUMERA"
                                className="h-24 md:h-48 w-auto object-contain"
                            />
                        </Link>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex-none flex items-center justify-end h-full">
                        <div className={`flex items-center space-x-3 md:space-x-5 transition-colors duration-1000 ${isScrolled ? "text-primary" : "text-white"}`}>
                            <button className="hover:text-accent transition-all duration-300 hover:scale-110 p-2">
                                <Search size={22} strokeWidth={2} />
                            </button>
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="relative group p-2 transition-all duration-300 hover:scale-110"
                            >
                                <ShoppingBag size={22} strokeWidth={2} className="group-hover:text-accent transition-colors" />
                                {cartCount > 0 && (
                                    <span className="absolute top-0 right-0 bg-brand-gradient text-[7px] text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-black shadow-lg">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden fixed inset-0 z-[60] bg-primary flex flex-col p-10 animate-fade-in">
                        <div className="flex justify-between items-center mb-20">
                            <img src="/lumera.png" alt="LUMERA" className="h-10 w-auto" />
                            <button onClick={() => setIsMobileMenuOpen(false)} className="text-white p-2">
                                <X size={32} strokeWidth={1} />
                            </button>
                        </div>
                        <div className="flex flex-col space-y-12">
                            {navLinks.map((link, idx) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-5xl font-light tracking-tighter text-white premium-serif border-b border-white/5 pb-8 animate-slide-up"
                                    style={{ animationDelay: `${idx * 0.1}s` }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                        <div className="mt-auto pt-10 border-t border-white/5 flex justify-between items-center">
                            <Link href="/account" className="text-[10px] uppercase tracking-[0.5em] font-black text-white/40">My Account</Link>
                            <div className="flex space-x-6 text-white/40">
                                <Search size={20} />
                                <ShoppingBag size={20} />
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </header>
    );
}
