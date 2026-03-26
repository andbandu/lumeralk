import Sidebar from "@/components/admin/Sidebar";
import { User, Bell } from "@/components/Icons";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row antialiased selection:bg-primary selection:text-white font-sans">
            <Sidebar />
            <main className="flex-1 lg:ml-64 p-6 md:p-10 lg:p-12 transition-all duration-700">
                {/* Professional Header - System Context */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 space-y-6 md:space-y-0 relative z-20">
                    <div className="flex items-center space-x-6">
                        <div className="w-1 h-12 bg-primary hidden md:block" />
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">Command <span className="font-light opacity-40">Center</span></h1>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-primary/30 mt-1">lumera.lk governance interface</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-8 md:space-x-12">
                        <button className="relative text-primary/40 hover:text-primary transition-all duration-300 cursor-pointer">
                            <Bell size={20} strokeWidth={2} />
                            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white shadow-sm" />
                        </button>

                        <div className="flex items-center space-x-5 border-l border-primary/10 pl-8 md:pl-12">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-bold text-primary uppercase tracking-wide">Administrator</p>
                                <p className="text-[10px] text-primary/40 uppercase tracking-wider font-medium">System Operator</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shadow-md cursor-pointer hover:bg-slate-800 transition-colors">
                                A
                            </div>
                        </div>
                    </div>
                </header>

                <div className="min-h-full transition-opacity duration-500">
                    {children}
                </div>
            </main>
        </div>
    );
}
