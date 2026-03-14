import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Truck, CreditCard, Lock, ArrowRight } from "@/components/Icons";

export default function Footer() {
    const currentYear = new Date().getFullYear();



    return (
        <footer className="bg-primary text-white pt-24 pb-8">
            <div className="container mx-auto px-6">


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link href="/" className="inline-block">
                            <img 
                                src="/lumera.png" 
                                alt="LUMERA" 
                                className="h-20 md:h-28 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-muted text-sm leading-relaxed max-w-xs">
                            Curating premium women's clothing and accessories for the modern,
                            sophisticated woman who values quality and timeless elegance.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="hover:text-accent transition-colors"><Facebook size={20} /></Link>
                            <Link href="#" className="hover:text-accent transition-colors"><Instagram size={20} /></Link>
                            <Link href="#" className="hover:text-accent transition-colors"><Twitter size={20} /></Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h3 className="text-sm uppercase tracking-widest font-bold">Quick Links</h3>
                        <ul className="space-y-3 text-sm text-muted">
                            <li><Link href="/shop/new" className="hover:text-white transition-colors">New Arrivals</Link></li>
                            <li><Link href="/shop/clothing" className="hover:text-white transition-colors">Clothing</Link></li>
                            <li><Link href="/shop/accessories" className="hover:text-white transition-colors">Accessories</Link></li>
                            <li><Link href="/collections" className="hover:text-white transition-colors">Collections</Link></li>
                            <li><Link href="/sale" className="hover:text-accent transition-colors">Sale</Link></li>
                        </ul>
                    </div>

                    {/* Customer Care */}
                    <div className="space-y-6">
                        <h3 className="text-sm uppercase tracking-widest font-bold">Customer Care</h3>
                        <ul className="space-y-3 text-sm text-muted">
                            <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping Info</Link></li>
                            <li><Link href="/returns" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
                            <li><Link href="/size-guide" className="hover:text-white transition-colors">Size Guide</Link></li>
                            <li><Link href="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact & Newsletter */}
                    <div className="space-y-6">
                        <h3 className="text-sm uppercase tracking-widest font-bold">Stay Connected</h3>
                        <div className="space-y-3 text-sm text-muted">
                            <div className="flex items-center space-x-3">
                                <Mail size={16} />
                                <span>hello@lumera.lk</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone size={16} />
                                <span>+94 11 123 4567</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <MapPin size={16} />
                                <span>Colombo, Sri Lanka</span>
                            </div>
                        </div>
                        <div className="pt-4">
                            <div className="flex border-b border-muted/30 pb-2">
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted/50"
                                />
                                <button className="text-xs uppercase tracking-widest font-bold hover:text-accent transition-colors">
                                    Join
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-muted/20 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[10px] text-muted uppercase tracking-[0.2em]">
                    <p>© {currentYear} Lumera.lk. All Rights Reserved.</p>
                    <div className="flex space-x-6">
                        <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
