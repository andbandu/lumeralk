"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Trash2, ShoppingBag, ArrowRight, Shield, Truck, CreditCard } from "@/components/Icons";
import { useState } from "react";

export default function CheckoutPage() {
    const { items, removeFromCart, updateQuantity, getCartTotal } = useCart();
    const [step, setStep] = useState(1); // 1: Cart, 2: Info, 3: Payment

    const total = getCartTotal();
    const shipping = 500; // Flat LKR 500
    const grandTotal = total + (items.length > 0 ? shipping : 0);

    if (items.length === 0 && step === 1) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center space-y-8 animate-fade-in">
                <div className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center text-primary/20">
                    <ShoppingBag size={48} />
                </div>
                <div className="space-y-2">
                    <h1 className="premium-serif text-4xl text-primary tracking-tighter">Your bag is empty.</h1>
                    <p className="text-primary/40 text-[10px] uppercase tracking-[0.4em] font-black">Begin your journey in the boutique.</p>
                </div>
                <Link href="/shop" className="h-16 px-12 bg-primary text-white text-[11px] uppercase tracking-[0.6em] font-black flex items-center shadow-2xl hover:bg-brand-gradient transition-all">
                    Explore Edits
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen">
            {/* Header Spacer */}
            <div className="h-40 md:h-44 lg:h-44 bg-primary w-full shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-gradient opacity-[0.03] blur-[100px] pointer-events-none" />
            </div>

            <section className="py-20 lg:py-32">
                <div className="container mx-auto px-6 max-w-[1200px]">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                        
                        {/* Left Column: Checkout Workflow */}
                        <div className="lg:col-span-7 space-y-16">
                            
                            {/* Workflow Indicator */}
                            <div className="flex items-center space-x-8 md:space-x-12 pb-8 border-b border-primary/5">
                                {[
                                    { id: 1, label: "Your Bag" },
                                    { id: 2, label: "Shipping" },
                                    { id: 3, label: "Payment" }
                                ].map((s) => (
                                    <div key={s.id} className={`flex items-center space-x-4 ${step >= s.id ? 'text-primary' : 'text-primary/10'}`}>
                                        <span className={`text-[10px] font-black tracking-widest ${step === s.id ? 'opacity-100' : 'opacity-40'}`}>0{s.id}.</span>
                                        <span className={`text-[10px] uppercase tracking-[0.5em] font-black ${step === s.id ? 'opacity-100' : 'opacity-40'}`}>{s.label}</span>
                                    </div>
                                ))}
                            </div>

                            {step === 1 && (
                                <div className="space-y-10 animate-fade-in">
                                    <div className="space-y-8">
                                        {items.map((item) => (
                                            <div key={item.id} className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-8 group">
                                                <div className="relative w-32 aspect-[3/4] bg-secondary/10 overflow-hidden border border-primary/5">
                                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                                </div>
                                                <div className="flex-1 flex flex-col justify-between py-2">
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between items-start">
                                                            <h3 className="premium-serif text-2xl text-primary tracking-tight">{item.name}</h3>
                                                            <button 
                                                                onClick={() => removeFromCart(item.id)}
                                                                className="text-primary/20 hover:text-red-500 transition-colors cursor-pointer"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                        <p className="text-[10px] uppercase tracking-[0.3em] font-black text-primary/30">Size: {item.size}</p>
                                                    </div>
                                                    
                                                    <div className="flex justify-between items-center mt-6">
                                                        <div className="flex items-center border border-primary/5 p-1 bg-slate-50/50">
                                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-primary/20 hover:text-primary transition-colors">-</button>
                                                            <span className="w-10 text-center text-[11px] font-black text-primary/60">{item.quantity}</span>
                                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-primary/20 hover:text-primary transition-colors">+</button>
                                                        </div>
                                                        <span className="text-sm font-black text-primary tracking-wide">
                                                            LKR {(parseInt(item.price.replace(/[^\d]/g, "")) * item.quantity).toLocaleString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-10 border-t border-primary/5">
                                        <button 
                                            onClick={() => setStep(2)}
                                            className="group relative w-full h-20 bg-primary text-white text-[11px] uppercase tracking-[0.6em] font-black flex items-center justify-center shadow-2xl overflow-hidden"
                                        >
                                            <span className="relative z-10 flex items-center space-x-6">
                                                <span>Continue to Information</span>
                                                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
                                            </span>
                                            <div className="absolute inset-0 bg-brand-gradient translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-12 animate-fade-in">
                                    <div className="space-y-10">
                                        <div className="space-y-6">
                                            <h2 className="text-[10px] uppercase tracking-[0.6em] font-black text-primary/20">Contact Integrity</h2>
                                            <input type="email" placeholder="Email Address" className="w-full h-16 px-6 bg-slate-50 border border-primary/5 focus:outline-none focus:border-accent text-sm font-bold tracking-wide" />
                                        </div>
                                        <div className="space-y-6">
                                            <h2 className="text-[10px] uppercase tracking-[0.6em] font-black text-primary/20">Delivery Coordinates</h2>
                                            <div className="grid grid-cols-2 gap-6">
                                                <input type="text" placeholder="First Name" className="h-16 px-6 bg-slate-50 border border-primary/5 focus:outline-none focus:border-accent text-sm font-bold tracking-wide" />
                                                <input type="text" placeholder="Last Name" className="h-16 px-6 bg-slate-50 border border-primary/5 focus:outline-none focus:border-accent text-sm font-bold tracking-wide" />
                                            </div>
                                            <input type="text" placeholder="Address" className="w-full h-16 px-6 bg-slate-50 border border-primary/5 focus:outline-none focus:border-accent text-sm font-bold tracking-wide" />
                                            <div className="grid grid-cols-2 gap-6">
                                                <input type="text" placeholder="City" className="h-16 px-6 bg-slate-50 border border-primary/5 focus:outline-none focus:border-accent text-sm font-bold tracking-wide" />
                                                <input type="text" placeholder="Postal Code" className="h-16 px-6 bg-slate-50 border border-primary/5 focus:outline-none focus:border-accent text-sm font-bold tracking-wide" />
                                            </div>
                                            <input type="tel" placeholder="Phone Number" className="w-full h-16 px-6 bg-slate-50 border border-primary/5 focus:outline-none focus:border-accent text-sm font-bold tracking-wide" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:items-center justify-between pt-10 border-t border-primary/5">
                                        <button onClick={() => setStep(1)} className="text-[10px] uppercase tracking-[0.4em] font-black text-primary/30 hover:text-accent transition-colors">Return to Bag</button>
                                        <button 
                                            onClick={() => setStep(3)}
                                            className="group relative h-16 px-16 bg-primary text-white text-[11px] uppercase tracking-[0.6em] font-black flex items-center justify-center shadow-2xl overflow-hidden"
                                        >
                                            <span className="relative z-10">Proceed to Payment</span>
                                            <div className="absolute inset-0 bg-brand-gradient translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-12 animate-fade-in">
                                    <div className="space-y-8 bg-slate-50/50 p-10 border border-primary/5">
                                        <div className="flex items-center space-x-6 text-accent">
                                            <CreditCard size={20} />
                                            <h2 className="text-[10px] uppercase tracking-[0.6em] font-black">Secure Gateway</h2>
                                        </div>
                                        <p className="text-primary/60 text-sm font-medium leading-relaxed italic">Payment processing is currently in simulation mode for this editorial preview.</p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:items-center justify-between pt-10 border-t border-primary/5">
                                        <button onClick={() => setStep(2)} className="text-[10px] uppercase tracking-[0.4em] font-black text-primary/30 hover:text-accent transition-colors">Return to Info</button>
                                        <button 
                                            className="group relative h-20 px-20 bg-primary text-white text-[11px] uppercase tracking-[0.8em] font-black flex items-center justify-center shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] overflow-hidden"
                                        >
                                            <span className="relative z-10 italic">Complete Purchase</span>
                                            <div className="absolute inset-0 bg-brand-gradient translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column: Ledger Summary */}
                        <div className="lg:col-span-5">
                            <div className="sticky top-40 bg-slate-50/50 border border-primary/5 p-10 lg:p-12 space-y-12">
                                <h2 className="premium-serif text-3xl text-primary tracking-tighter">Order Summary</h2>
                                
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.3em] font-black text-primary/30">
                                        <span>Subtotal</span>
                                        <span>LKR {total.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.3em] font-black text-primary/30">
                                        <span>Shipping Transit</span>
                                        <span>LKR {shipping.toLocaleString()}</span>
                                    </div>
                                    <div className="pt-6 border-t border-primary/5 flex justify-between items-center">
                                        <span className="text-[11px] uppercase tracking-[0.5em] font-black text-primary">Total Ledger</span>
                                        <span className="text-2xl font-black text-primary tracking-tight">LKR {grandTotal.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="pt-10 space-y-6">
                                    <div className="flex items-center space-x-4 opacity-30">
                                        <Shield size={16} />
                                        <span className="text-[8px] uppercase tracking-[0.3em] font-black">Encrypted Transaction Authority</span>
                                    </div>
                                    <div className="flex items-center space-x-4 opacity-30">
                                        <Truck size={16} />
                                        <span className="text-[8px] uppercase tracking-[0.3em] font-black">Insured Island-wide Transit</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
}
