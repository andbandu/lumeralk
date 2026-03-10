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
    ChevronRight
} from "@/components/Icons";

export default function AdminSidebar() {
    const pathname = usePathname();

    const links = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Products", href: "/admin/products", icon: Package },
        { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
        { name: "Customers", href: "/admin/customers", icon: Users },
        { name: "Settings", href: "/admin/settings", icon: Settings },
    ];

    return (
        <div className="w-64 bg-primary h-screen fixed left-0 top-0 text-white flex flex-col">
            <div className="p-8 border-b border-muted/20">
                <h2 className="premium-serif text-2xl font-bold italic tracking-tighter text-gradient">LUMERA</h2>
                <p className="text-[10px] text-muted uppercase tracking-[0.2em] mt-1">Admin Portal</p>
            </div>

            <nav className="flex-1 py-10 px-4 space-y-2">
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    const Icon = link.icon;

                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 group ${isActive
                                ? "bg-accent text-white"
                                : "text-muted hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <div className="flex items-center space-x-3">
                                <Icon size={20} />
                                <span className="text-sm font-medium tracking-wide">{link.name}</span>
                            </div>
                            <ChevronRight
                                size={14}
                                className={`transition-transform duration-200 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"}`}
                            />
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6 border-t border-muted/20">
                <button className="flex items-center space-x-3 text-muted hover:text-white transition-colors w-full p-3">
                    <LogOut size={20} />
                    <span className="text-sm font-medium">Log Out</span>
                </button>
            </div>
        </div>
    );
}
