import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Truck, CreditCard, Lock, ArrowRight } from "@/components/Icons";

export default function Footer() {
    const currentYear = new Date().getFullYear();



    return (
        <footer className="bg-primary text-white pt-32 pb-12 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
                    {/* Brand Section */}
                    <div className="space-y-8">
                        <Link href="/" className="inline-block transition-transform hover:scale-105 duration-500">
                            <img 
                                src="/lumera.png" 
                                alt="LUMERA" 
                                className="h-24 md:h-32 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-white/40 text-[13px] leading-relaxed max-w-xs font-light">
                            Curating premium women's clothing and accessories for the modern,
                            sophisticated woman who values quality and timeless elegance.
                        </p>
                        <div className="flex space-x-6">
                            <Link href="#" className="text-white/40 hover:text-accent transition-all duration-300 hover:-translate-y-1"><Facebook size={18} /></Link>
                            <Link href="#" className="text-white/40 hover:text-accent transition-all duration-300 hover:-translate-y-1"><Instagram size={18} /></Link>
                            <Link href="#" className="text-white/40 hover:text-accent transition-all duration-300 hover:-translate-y-1"><Twitter size={18} /></Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-8">
                        <h3 className="text-[10px] uppercase tracking-[0.5em] font-black text-white/50">Quick Links</h3>
                        <ul className="space-y-4 text-[11px] uppercase tracking-[0.3em] font-black text-white/30">
                            <li><Link href="/shop/new" className="hover:text-white transition-colors">New Arrivals</Link></li>
                            <li><Link href="/shop/clothing" className="hover:text-white transition-colors">Clothing</Link></li>
                            <li><Link href="/shop/accessories" className="hover:text-white transition-colors">Accessories</Link></li>
                            <li><Link href="/collections" className="hover:text-white transition-colors">Collections</Link></li>
                            <li><Link href="/sale" className="hover:text-accent transition-colors">Sale</Link></li>
                        </ul>
                    </div>

                    {/* Customer Care */}
                    <div className="space-y-8">
                        <h3 className="text-[10px] uppercase tracking-[0.5em] font-black text-white/50">Customer Care</h3>
                        <ul className="space-y-4 text-[11px] uppercase tracking-[0.3em] font-black text-white/30">
                            <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping Info</Link></li>
                            <li><Link href="/returns" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
                            <li><Link href="/size-guide" className="hover:text-white transition-colors">Size Guide</Link></li>
                            <li><Link href="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact & Newsletter */}
                    <div className="space-y-8">
                        <h3 className="text-[10px] uppercase tracking-[0.5em] font-black text-white/50">Stay Connected</h3>
                        <div className="space-y-4 text-[11px] font-bold text-white/40">
                            <div className="flex items-center space-x-4">
                                <Mail size={16} className="text-accent" />
                                <span className="tracking-widest capitalize">hello@lumera.lk</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Phone size={16} className="text-accent" />
                                <span className="tracking-widest">+94 11 123 4567</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <MapPin size={16} className="text-accent" />
                                <span className="tracking-widest capitalize">Colombo, Sri Lanka</span>
                            </div>
                        </div>
                        <div className="pt-6">
                            <div className="flex border-b border-white/10 pb-3 group">
                                <input
                                    type="email"
                                    placeholder="Newsletter Signup"
                                    className="bg-transparent border-none outline-none text-[10px] uppercase tracking-[0.3em] w-full placeholder:text-white/20 text-white"
                                />
                                <button className="text-[9px] uppercase tracking-[0.5em] font-black hover:text-accent transition-colors">
                                    Join
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-[9px] text-white/20 uppercase tracking-[0.4em] font-black">
                    <p>© {currentYear} Lumera.lk. All Rights Reserved.</p>
                    <div className="flex space-x-10">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
