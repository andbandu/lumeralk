"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ArrowRight } from "@/components/Icons";
import { useCart } from "@/context/CartContext";
import { useEffect } from "react";

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const { items, cartCount, removeFromCart, addToCart } = useCart();

    // Body scroll lock
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    // Helper to calculate numeric LKR value securely
    const calculateSubtotal = () => {
        return items.reduce((total, item) => {
            const numericPrice = parseInt(item.price.replace(/\D/g, '')) || 0;
            return total + (numericPrice * item.quantity);
        }, 0);
    };

    const formatCurrency = (amount: number) => {
        return `LKR ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    return (
        <div className="fixed inset-0 z-[999] flex justify-end antialiased pointer-events-auto">
            <div className="absolute inset-0 bg-primary/20 backdrop-blur-md transition-opacity duration-700 pointer-events-auto" onClick={onClose} />
            <div className="relative h-full w-full max-w-md bg-white shadow-[0_0_100px_rgba(0,0,0,0.1)] flex flex-col animate-slide-up z-10">
                {/* Header - Refined Boutique Style */}
                <div className="p-8 md:p-10 border-b border-primary/5 flex flex-col items-center text-center space-y-4 shrink-0 relative">
                    <button onClick={onClose} className="absolute top-8 right-8 text-primary/40 hover:text-accent transition-all duration-500 hover:rotate-90 cursor-pointer">
                        <X size={24} strokeWidth={1} />
                    </button>
                    
                    <div className="space-y-3">
                        <h2 className="text-3xl md:text-4xl premium-serif tracking-tight text-primary">Your Bag.</h2>
                        <div className="flex items-center justify-center space-x-3 text-accent/60">
                            <span className="text-[9px] uppercase tracking-[0.5em] font-black">
                                {cartCount} curated pieces
                            </span>
                        </div>
                    </div>
                </div>

                {/* Content - Optimized Scrollable List */}
                <div className="flex-1 overflow-y-auto p-8 space-y-12 min-h-0 overscroll-contain touch-pan-y">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center space-y-8 text-primary/30">
                            <div className="w-px h-16 bg-primary/10" />
                            <p className="text-[10px] uppercase tracking-[0.5em] font-black">Your bag is empty</p>
                            <button onClick={onClose} className="px-10 py-4 border border-primary/10 text-[9px] uppercase tracking-[0.4em] font-black hover:bg-primary hover:text-white transition-all duration-700">
                                Continue Exploring
                            </button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex space-x-8 group relative">
                                <Link href={`/product/${item.productId}`} onClick={onClose} className="relative h-40 w-28 bg-secondary/20 overflow-hidden flex-shrink-0 border border-black/[0.03]">
                                    <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                                </Link>
                                
                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-start">
                                            <h3 className="premium-serif text-lg md:text-xl text-primary tracking-tight leading-none pr-6">{item.name}</h3>
                                            <button onClick={() => removeFromCart(item.id)} className="text-primary/10 hover:text-accent transition-colors cursor-pointer">
                                                <X size={14} />
                                            </button>
                                        </div>
                                        <div className="flex space-x-6 text-[9px] uppercase tracking-[0.3em] font-black text-primary/30">
                                            <span>Size: <span className="text-primary/60">{item.size}</span></span>
                                            <span>Qty: <span className="text-primary/60">{item.quantity}</span></span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-between items-end">
                                        <div className="flex items-center space-x-4 border border-primary/5 p-1 px-2 rounded-sm bg-slate-50/50">
                                            <button 
                                                onClick={() => {
                                                    if (item.quantity > 1) {
                                                        removeFromCart(item.id);
                                                        addToCart({ ...item, quantity: item.quantity - 1, size: item.size });
                                                    } else {
                                                        removeFromCart(item.id);
                                                    }
                                                }} 
                                                className="p-1 text-primary/40 hover:text-primary transition-colors cursor-pointer"
                                            >
                                                <Minus size={12} />
                                            </button>
                                            <span className="w-4 text-center text-xs font-bold text-primary/60">{item.quantity}</span>
                                            <button 
                                                onClick={() => {
                                                    removeFromCart(item.id);
                                                    addToCart({ ...item, quantity: item.quantity + 1, size: item.size });
                                                }}
                                                className="p-1 text-primary/40 hover:text-primary transition-colors cursor-pointer"
                                            >
                                                <Plus size={12} />
                                            </button>
                                        </div>
                                        <span className="premium-serif text-lg text-primary tracking-tight">{item.price}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer - Final High-Contrast Action */}
                {items.length > 0 && (
                    <div className="p-10 border-t border-primary/5 space-y-10 bg-white shrink-0 relative">
                        <div className="space-y-4">
                            <div className="flex justify-between text-[10px] uppercase tracking-[0.4em] font-black text-primary/30">
                                <span>Subtotal</span>
                                <span className="text-primary/60">{formatCurrency(calculateSubtotal())}</span>
                            </div>
                            <div className="pt-6 border-t border-primary/5 flex justify-between items-end">
                                <span className="text-primary/20 text-[10px] uppercase tracking-[0.4em] font-black mb-1">Total Due</span>
                                <span className="premium-serif text-3xl text-primary">{formatCurrency(calculateSubtotal())}</span>
                            </div>
                        </div>

                        <button className="group relative w-full h-16 lg:h-20 bg-primary text-white text-[11px] uppercase tracking-[0.6em] font-black transition-all duration-700 hover:bg-brand-gradient flex items-center justify-center overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] cursor-pointer">
                            <span className="relative z-10">Secure Checkout</span>
                            <div className="absolute inset-0 bg-brand-gradient translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
                        </button>
                        
                        <p className="text-[10px] text-center text-primary/20 uppercase tracking-[0.3em] font-black italic">
                            Dedicated to the island spirit.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
