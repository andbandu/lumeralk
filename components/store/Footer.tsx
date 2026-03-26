import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Truck, CreditCard, Lock, ArrowRight } from "@/components/Icons";

export default function Footer() {
    const currentYear = new Date().getFullYear();



    return (
        <footer className="bg-primary text-white pt-24 pb-12 relative overflow-hidden border-t border-white/5">
            {/* Ambient Background Detail */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-gradient opacity-[0.03] blur-[140px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 pt-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 lg:gap-24 mb-24 items-start">
                    
                    {/* Brand Sentinel - Left Aligned */}
                    <div className="lg:col-span-2 space-y-8">
                        <Link href="/" className="inline-block group transition-transform hover:scale-105 duration-700">
                             <h2 className="premium-serif text-3xl md:text-5xl tracking-[0.4em] text-white">LUMERA</h2>
                        </Link>
                        <p className="text-white/30 text-[11px] md:text-[12px] uppercase tracking-[0.4em] leading-relaxed max-w-sm font-black opacity-60">
                            Curating premium Sri Lankan elegance for the global vanguard.
                        </p>
                        <div className="flex space-x-8 text-white/30 pt-4">
                            <Link href="#" className="hover:text-accent transition-all duration-500 hover:-translate-y-1"><Instagram size={16} /></Link>
                            <Link href="#" className="hover:text-accent transition-all duration-500 hover:-translate-y-1"><Facebook size={16} /></Link>
                            <Link href="#" className="hover:text-accent transition-all duration-500 hover:-translate-y-1"><Twitter size={16} /></Link>
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="space-y-8">
                        <h3 className="text-[9px] uppercase tracking-[0.6em] font-black text-white/20">The Edit</h3>
                        <ul className="space-y-4 text-[11px] uppercase tracking-[0.4em] font-black text-white/40">
                            <li><Link href="/shop" className="hover:text-accent transition-colors">New Arrivals</Link></li>
                            <li><Link href="/shop" className="hover:text-accent transition-colors">Clothing</Link></li>
                            <li><Link href="/collections" className="hover:text-accent transition-colors">Collections</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-8">
                        <h3 className="text-[9px] uppercase tracking-[0.6em] font-black text-white/20">Support</h3>
                        <ul className="space-y-4 text-[11px] uppercase tracking-[0.4em] font-black text-white/40">
                            <li><Link href="/shipping" className="hover:text-accent transition-colors">Shipping</Link></li>
                            <li><Link href="/returns" className="hover:text-accent transition-colors">Returns</Link></li>
                            <li><Link href="/faq" className="hover:text-accent transition-colors">FAQs</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-8">
                        <h3 className="text-[9px] uppercase tracking-[0.6em] font-black text-white/20">Reach</h3>
                        <ul className="space-y-4 text-[11px] uppercase tracking-[0.4em] font-black text-white/40">
                            <li><span className="block opacity-60">hello@lumera.lk</span></li>
                            <li><span className="block opacity-60">Colombo, SL</span></li>
                            <li><span className="block opacity-60">+94 11 123 4567</span></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar - Minimalist Finale */}
                <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-[10px] text-white/20 uppercase tracking-[0.5em] font-black">
                    <p>© {currentYear} Lumera. Dedicated to the island spirit.</p>
                    <div className="flex space-x-12">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
