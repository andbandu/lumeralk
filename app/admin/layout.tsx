import Sidebar from "@/components/admin/Sidebar";
import { User, Bell } from "@/components/Icons";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-secondary/50 flex">
            <Sidebar />
            <main className="flex-1 ml-64 p-8">
                {/* Top Header */}
                <header className="flex justify-between items-center mb-10 bg-white p-6 rounded-2xl shadow-premium">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">System Overview</h1>
                        <p className="text-muted text-sm">Welcome back to Lumera.lk Admin.</p>
                    </div>
                    <div className="flex items-center space-x-6">
                        <button className="relative text-muted hover:text-primary transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-accent rounded-full border-2 border-white"></span>
                        </button>
                        <div className="flex items-center space-x-3 border-l border-muted/20 pl-6">
                            <div className="text-right">
                                <p className="text-sm font-bold uppercase tracking-wide">Admin User</p>
                                <p className="text-[10px] text-muted uppercase tracking-widest">Store Manager</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                                A
                            </div>
                        </div>
                    </div>
                </header>

                {children}
            </main>
        </div>
    );
}
