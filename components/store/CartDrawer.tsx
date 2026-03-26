"use client";

import Image from "next/image";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "@/components/Icons";
import { useCart } from "@/context/CartContext";

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const { items, cartCount, removeFromCart, addToCart } = useCart();

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
        <div 
            className="fixed inset-0 z-[100] flex justify-end overflow-hidden" 
            style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }}
        >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            <div className="relative h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-fade-in shadow-[-20px_0_60px_rgba(0,0,0,0.1)]">
                {/* Header */}
                <div className="p-8 md:p-10 border-b border-primary/5 flex justify-between items-end text-primary shrink-0 bg-slate-50">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3 text-accent animate-fade-in">
                            <ShoppingBag size={20} />
                            <span className="text-[10px] uppercase tracking-[0.5em] font-black">Shopping Bag</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-light tracking-tight premium-serif">Your Bag.</h2>
                        {cartCount > 0 && (
                            <div className="inline-block bg-primary px-4 py-1.5 shadow-xl">
                                <span className="text-[10px] text-white uppercase tracking-[0.3em] font-black">
                                    {cartCount} Item{cartCount !== 1 ? 's' : ''}
                                </span>
                            </div>
                        )}
                    </div>
                    <button onClick={onClose} className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:rotate-90 hover:text-accent transition-all duration-500 border border-primary/5">
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-5 md:p-8 space-y-6 min-h-0">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center space-y-6 text-primary/50">
                            <ShoppingBag size={48} strokeWidth={1} />
                            <p className="text-sm uppercase tracking-widest font-black">Your bag is empty</p>
                            <button onClick={onClose} className="mt-4 border-b-2 border-accent text-primary text-xs uppercase tracking-widest font-black pb-1 hover:text-accent transition-colors">
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex space-x-6 group">
                                <div className="relative h-32 w-24 bg-secondary overflow-hidden flex-shrink-0 border border-black/5">
                                    <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between py-1 text-primary">
                                    <div>
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-bold text-sm md:text-md tracking-tight leading-tight pr-4">{item.name}</h3>
                                            <button onClick={() => removeFromCart(item.id)} className="text-black/30 hover:text-accent transition-colors">
                                                <X size={16} />
                                            </button>
                                        </div>
                                        <p className="text-[9px] text-muted uppercase tracking-[0.2em] font-black mt-2">Size: <span className="text-primary">{item.size}</span></p>
                                    </div>
                                    <div className="flex justify-between items-end mt-4">
                                        <div className="flex items-center border border-[rgba(15,23,42,0.2)] p-1 bg-white">
                                            <button 
                                                onClick={() => {
                                                    if (item.quantity > 1) {
                                                        removeFromCart(item.id);
                                                        addToCart({ ...item, quantity: item.quantity - 1, size: item.size });
                                                    } else {
                                                        removeFromCart(item.id);
                                                    }
                                                }} 
                                                className="p-1 hover:bg-secondary/30 transition-colors"
                                            >
                                                <Minus size={12} />
                                            </button>
                                            <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                                            <button 
                                                onClick={() => {
                                                    removeFromCart(item.id);
                                                    addToCart({ ...item, quantity: item.quantity + 1, size: item.size });
                                                }}
                                                className="p-1 hover:bg-secondary/30 transition-colors"
                                            >
                                                <Plus size={12} />
                                            </button>
                                        </div>
                                        <span className="font-bold tracking-widest text-sm">{item.price}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="p-8 md:p-10 border-t border-primary/5 space-y-8 bg-slate-50 text-primary shrink-0 pb-[calc(2rem+env(safe-area-inset-bottom))]">
                        <div className="space-y-5">
                            <div className="flex justify-between text-[11px] uppercase tracking-[0.4em] font-black text-primary/30">
                                <span>Subtotal</span>
                                <span className="text-primary">{formatCurrency(calculateSubtotal())}</span>
                            </div>
                            <div className="flex justify-between text-[11px] uppercase tracking-[0.4em] font-black text-primary/30">
                                <span>Est. Shipping</span>
                                <span className="text-accent text-[9px]">Calculated Next Step</span>
                            </div>
                            <div className="pt-6 border-t border-primary/10 flex justify-between text-3xl font-light tracking-tight premium-serif items-end">
                                <span className="text-primary/40 text-sm uppercase tracking-[0.2em] font-black mb-1">Total Due</span>
                                <span className="text-primary border-b-2 border-accent pb-1">{formatCurrency(calculateSubtotal())}</span>
                            </div>
                        </div>
                        <button className="w-full bg-primary text-white py-6 flex items-center justify-center space-x-6 text-[10px] uppercase tracking-[0.5em] font-black hover:bg-brand-gradient hover:-translate-y-1 transition-all duration-500 shadow-2xl group relative overflow-hidden">
                            <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-2">Secure Checkout</span>
                            <ArrowRight size={20} className="relative z-10 group-hover:translate-x-4 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </button>
                        <p className="text-[9px] text-center text-primary/30 uppercase tracking-[0.3em] font-black italic">
                            Free shipping on all premium collections.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
