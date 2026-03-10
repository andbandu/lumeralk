"use client";

import Image from "next/image";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "@/components/Icons";

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    if (!isOpen) return null;

    const cartItems = [
        { id: 1, name: "Silk Evening Gown", price: "$240.00", size: "M", quantity: 1, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1964&auto=format&fit=crop" },
        { id: 2, name: "Leather Tote Bag", price: "$180.00", size: "One Size", quantity: 1, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1935&auto=format&fit=crop" },
    ];

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-fade-in">
                {/* Header */}
                <div className="p-8 border-b border-secondary flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <ShoppingBag size={20} />
                        <h2 className="text-xl font-bold tracking-tight">Your Wardrobe</h2>
                        <span className="text-[10px] bg-secondary px-2 py-1 rounded-full font-bold">2 Items</span>
                    </div>
                    <button onClick={onClose} className="hover:rotate-90 transition-transform duration-300">
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex space-x-6 group">
                            <div className="relative h-28 w-24 bg-secondary overflow-hidden flex-shrink-0">
                                <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="flex-1 flex flex-col justify-between py-1">
                                <div>
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-bold text-sm tracking-wide">{item.name}</h3>
                                        <button className="text-muted hover:text-red-500 transition-colors">
                                            <X size={14} />
                                        </button>
                                    </div>
                                    <p className="text-[10px] text-muted uppercase tracking-widest font-bold">Size: {item.size}</p>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div className="flex items-center border border-secondary p-1">
                                        <button className="p-1 hover:text-accent transition-colors"><Minus size={12} /></button>
                                        <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                                        <button className="p-1 hover:text-accent transition-colors"><Plus size={12} /></button>
                                    </div>
                                    <span className="font-bold text-sm tracking-widest">{item.price}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="p-8 border-t border-secondary space-y-6 bg-secondary/10">
                    <div className="space-y-4">
                        <div className="flex justify-between text-xs uppercase tracking-widest font-bold">
                            <span className="text-muted">Subtotal</span>
                            <span>$420.00</span>
                        </div>
                        <div className="flex justify-between text-xs uppercase tracking-widest font-bold">
                            <span className="text-muted">Shipping</span>
                            <span>Calculated at checkout</span>
                        </div>
                        <div className="pt-4 border-t border-secondary/50 flex justify-between text-lg font-bold tracking-tight">
                            <span>Total</span>
                            <span className="text-accent underline underline-offset-8">$420.00</span>
                        </div>
                    </div>
                    <a
                        href="/checkout"
                        className="w-full bg-primary text-white py-5 flex items-center justify-center space-x-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-accent transition-all duration-300 shadow-premium group"
                    >
                        <span>Secure Checkout</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    <p className="text-[9px] text-center text-muted uppercase tracking-widest font-bold italic">
                        Free shipping on all premium collections.
                    </p>
                </div>
            </div>
        </div>
    );
}
