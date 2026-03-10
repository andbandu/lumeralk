import { ChevronLeft, Lock, CreditCard, Truck, MapPin } from "@/components/Icons";
import Navbar from "@/components/store/Navbar";
import Footer from "@/components/store/Footer";

export default function CheckoutPage() {
    return (
        <main className="min-h-screen bg-secondary/20">
            <Navbar />

            <section className="pt-32 pb-20">
                <div className="container mx-auto px-6 max-w-6xl">
                    <a href="/shop" className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold text-muted hover:text-primary transition-colors mb-12">
                        <ChevronLeft size={14} />
                        <span>Continue Shopping</span>
                    </a>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Checkout Form */}
                        <div className="space-y-12">
                            <div className="bg-white p-10 rounded-2xl shadow-premium border border-muted/10">
                                <h2 className="premium-serif text-3xl mb-8 flex items-center space-x-4">
                                    <Truck size={24} className="text-accent" />
                                    <span>Shipping Details</span>
                                </h2>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2 col-span-2 sm:col-span-1">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-muted">First Name</label>
                                        <input type="text" className="w-full p-4 bg-secondary/30 border-none outline-none focus:ring-1 focus:ring-accent transition-all" />
                                    </div>
                                    <div className="space-y-2 col-span-2 sm:col-span-1">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-muted">Last Name</label>
                                        <input type="text" className="w-full p-4 bg-secondary/30 border-none outline-none focus:ring-1 focus:ring-accent transition-all" />
                                    </div>
                                    <div className="space-y-2 col-span-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-muted">Address</label>
                                        <input type="text" className="w-full p-4 bg-secondary/30 border-none outline-none focus:ring-1 focus:ring-accent transition-all" />
                                    </div>
                                    <div className="space-y-2 col-span-2 sm:col-span-1">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-muted">City</label>
                                        <input type="text" className="w-full p-4 bg-secondary/30 border-none outline-none focus:ring-1 focus:ring-accent transition-all" />
                                    </div>
                                    <div className="space-y-2 col-span-2 sm:col-span-1">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-muted">Postal Code</label>
                                        <input type="text" className="w-full p-4 bg-secondary/30 border-none outline-none focus:ring-1 focus:ring-accent transition-all" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-10 rounded-2xl shadow-premium border border-muted/10">
                                <h2 className="premium-serif text-3xl mb-8 flex items-center space-x-4">
                                    <CreditCard size={24} className="text-accent" />
                                    <span>Payment Method</span>
                                </h2>
                                <div className="space-y-6">
                                    <div className="p-6 border border-accent bg-accent/5 flex items-center justify-between cursor-pointer">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-4 h-4 rounded-full border-4 border-accent" />
                                            <span className="text-sm font-bold uppercase tracking-widest">Credit / Debit Card</span>
                                        </div>
                                        <div className="flex space-x-2">
                                            <div className="w-8 h-5 bg-muted/20 rounded" />
                                            <div className="w-8 h-5 bg-muted/20 rounded" />
                                        </div>
                                    </div>
                                    <div className="p-6 border border-secondary flex items-center justify-between cursor-pointer opacity-50">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-4 h-4 rounded-full border border-muted" />
                                            <span className="text-sm font-bold uppercase tracking-widest">Cash on Delivery</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:sticky lg:top-40 h-fit space-y-8">
                            <div className="bg-primary text-white p-10 rounded-2xl shadow-premium relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                                <h2 className="premium-serif text-3xl mb-8">Order Summary</h2>
                                <div className="space-y-6 mb-10">
                                    <div className="flex justify-between items-center text-sm font-light">
                                        <span className="text-muted">Silk Evening Gown x 1</span>
                                        <span className="font-bold">$240.00</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-light text-muted">
                                        <span>Leather Tote Bag x 1</span>
                                        <span className="font-bold text-white">$180.00</span>
                                    </div>
                                </div>
                                <div className="border-t border-white/10 pt-6 space-y-4">
                                    <div className="flex justify-between text-xs uppercase tracking-widest font-bold text-muted">
                                        <span>Shipping</span>
                                        <span className="text-white">Complimentary</span>
                                    </div>
                                    <div className="flex justify-between text-2xl font-bold tracking-tight pt-4">
                                        <span>Total Due</span>
                                        <span className="text-accent">$420.00</span>
                                    </div>
                                </div>
                                <button className="w-full bg-accent text-white py-5 mt-10 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-primary transition-all duration-300 shadow-premium flex items-center justify-center space-x-4">
                                    <Lock size={16} />
                                    <span>Authorize Payment</span>
                                </button>
                                <p className="text-[9px] text-center text-muted uppercase tracking-[0.2em] font-bold mt-6 opacity-60">
                                    Encrypted & Secure Transaction
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
