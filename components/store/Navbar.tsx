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

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
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
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled
                ? "bg-white py-4 md:py-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border-b border-black/5"
                : "bg-transparent py-10 md:py-14"
                }`}
        >
            {/* Scrolled Underline Accent */}
            <div className={`hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-primary/10 transition-all duration-700 ${isScrolled ? "w-4/5" : "w-0"}`} />

            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Mobile Menu Toggle */}
                <button
                    className={`lg:hidden p-2 transition-colors duration-500 ${isScrolled ? "text-primary" : "text-white"}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center space-x-14">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-[9px] uppercase tracking-[0.5em] font-black transition-all duration-500 ${isScrolled ? "text-primary hover:text-accent" : "text-white/60 hover:text-white"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Logo Container */}
                <div className={`absolute left-1/2 -translate-x-1/2 transition-all duration-700 flex justify-center items-center ${
                    isScrolled 
                        ? "top-1/2 md:top-0 -translate-y-1/2 md:translate-y-0 bg-transparent md:bg-white md:rounded-b-full md:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.1)] md:border-b md:border-x md:border-black/5 px-0 md:px-8 pt-0 md:pt-2 pb-0 md:pb-5" 
                        : "top-1/2 -translate-y-1/2 bg-transparent"
                }`}>
                    <Link href="/" className="group transition-transform duration-700 hover:scale-105">
                        <img
                            src="/lumera.png"
                            alt="LUMERA"
                            className={`w-auto object-contain transition-all duration-700 ${
                                isScrolled ? "h-16 md:h-28" : "h-20 md:h-40"
                            }`}
                        />
                    </Link>
                </div>

                {/* Icons */}
                <div className={`flex items-center space-x-6 md:space-x-8 transition-colors duration-500 ${isScrolled ? "text-primary" : "text-white"}`}>
                    <button className="hover:text-accent transition-colors">
                        <Search size={18} strokeWidth={2.5} />
                    </button>
                    <button className="hover:text-accent transition-colors hidden sm:block">
                        <User size={18} strokeWidth={2.5} />
                    </button>
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="hover:text-accent transition-colors relative"
                    >
                        <ShoppingBag size={18} strokeWidth={2.5} />
                        {cartCount > 0 && (
                            <span className={`absolute -top-1.5 -right-1.5 bg-brand-gradient text-[7px] text-white w-3.5 h-3.5 rounded-full flex items-center justify-center font-black shadow-lg transition-transform duration-500 ${isScrolled ? "scale-90" : "scale-100"}`}>
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-secondary py-6 px-6 animate-fade-in">
                    <div className="flex flex-col space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-lg font-medium tracking-wide border-b border-secondary pb-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link href="/account" className="text-lg font-medium tracking-wide">
                            My Account
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
