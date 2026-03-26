"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    Users,
    Settings,
    LogOut,
    ChevronRight,
    Tag
} from "@/components/Icons";

export default function AdminSidebar() {
    const pathname = usePathname();

    const links = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Products", href: "/admin/products", icon: Package },
        { name: "Categories", href: "/admin/categories", icon: Tag },
        { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
        { name: "Customers", href: "/admin/customers", icon: Users },
        { name: "Settings", href: "/admin/settings", icon: Settings },
    ];

    return (
        <div className="w-64 bg-primary h-screen fixed left-0 top-0 text-white flex flex-col z-[100] shadow-xl transition-all duration-500 font-sans">
            <div className="p-8 border-b border-white/5 flex flex-col items-start">
                <Link href="/" className="group">
                    <h2 className="text-2xl font-black tracking-tighter text-white group-hover:opacity-80 transition-opacity">LUMERA<span className="text-slate-500">.</span></h2>
                </Link>
                <div className="mt-2 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-slate-500 rounded-full" />
                    <span className="text-[9px] text-white/40 uppercase tracking-widest font-bold">Admin Portal</span>
                </div>
            </div>

            <nav className="flex-1 py-10 px-4 space-y-1">
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    const Icon = link.icon;

                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`flex items-center justify-between p-3.5 rounded-lg transition-all duration-300 group relative ${isActive
                                ? "bg-white/10 text-white shadow-sm"
                                : "text-white/40 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <div className="flex items-center space-x-4 relative z-10">
                                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} className={isActive ? "text-white" : ""} />
                                <span className={`text-sm font-semibold tracking-wide`}>{link.name}</span>
                            </div>
                            
                            <ChevronRight
                                size={12}
                                className={`transition-all duration-300 ${isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-40 group-hover:translate-x-0"}`}
                            />
                        </Link>
                    );
                })}
            </nav>

            <div className="p-8 border-t border-white/5">
                <button className="group flex items-center space-x-4 text-white/30 hover:text-white transition-all duration-300 w-full p-2 cursor-pointer font-bold">
                    <LogOut size={18} strokeWidth={2} />
                    <span className="text-xs uppercase tracking-widest">Sign Out</span>
                </button>
            </div>
        </div>
    );
}
