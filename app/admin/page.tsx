import {
    TrendingUp,
    ShoppingBag,
    Users,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    ChevronRight
} from "@/components/Icons";

export default function AdminDashboard() {
    const stats = [
        { label: "Total Revenue", value: "LKR 1,280,430", change: "+12.5%", trend: "up", icon: DollarSign },
        { label: "Total Orders", value: "1,240", change: "+8.2%", trend: "up", icon: ShoppingBag },
        { label: "New Customers", value: "342", change: "-2.4%", trend: "down", icon: Users },
        { label: "Conversion Rate", value: "3.2%", change: "+0.5%", trend: "up", icon: TrendingUp },
    ];

    const recentOrders = [
        { id: "#ORD-7421", customer: "Amara Perera", date: "Mar 08, 2024", total: "LKR 18,500", status: "Delivered" },
        { id: "#ORD-7420", customer: "Kasun Silva", date: "Mar 08, 2024", total: "LKR 8,550", status: "Processing" },
        { id: "#ORD-7419", customer: "Dilani Fernando", date: "Mar 07, 2024", total: "LKR 21,200", status: "Shipped" },
        { id: "#ORD-7418", customer: "Nimmi Jayasuriya", date: "Mar 07, 2024", total: "LKR 4,500", status: "Pending" },
    ];

    return (
        <div className="space-y-12 font-sans">
            {/* Professional Analytics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.label} 
                             className="bg-white p-8 border border-slate-200 shadow-sm transition-all duration-300 hover:border-slate-300"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="text-slate-400">
                                    <Icon size={20} strokeWidth={2.5} />
                                </div>
                                <div className={`flex items-center space-x-1.5 text-[11px] font-bold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                                    <span>{stat.change}</span>
                                    {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                </div>
                            </div>
                            
                            <p className="text-slate-400 text-[10px] uppercase tracking-wider font-bold mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-bold tracking-tight text-primary">{stat.value}</h3>
                        </div>
                    );
                })}
            </div>

            {/* Professional Ledger View */}
            <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 bg-slate-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-primary tracking-tight">Recent Orders</h2>
                        <p className="text-[10px] uppercase font-bold text-slate-400 mt-1">Order management stream</p>
                    </div>
                    <button className="text-xs font-bold text-primary hover:underline transition-all cursor-pointer flex items-center group">
                        Live Ledger 
                        <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] uppercase tracking-widest font-bold text-slate-400 bg-white border-b border-slate-200">
                                <th className="px-8 py-5">Reference</th>
                                <th className="px-8 py-5">Customer</th>
                                <th className="px-8 py-5">Timestamp</th>
                                <th className="px-8 py-5">Statement Total</th>
                                <th className="px-8 py-5">Status</th>
                                <th className="px-8 py-5 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {recentOrders.map((order) => (
                                <tr key={order.id} className="group hover:bg-slate-50/30 transition-colors">
                                    <td className="px-8 py-6 text-xs font-bold text-slate-500">{order.id}</td>
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-bold text-primary">{order.customer}</p>
                                    </td>
                                    <td className="px-8 py-6 text-[11px] font-medium text-slate-400 uppercase">{order.date}</td>
                                    <td className="px-8 py-6">
                                        <span className="text-base font-bold text-primary">{order.total}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded ${
                                            order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                                            order.status === 'Processing' ? 'bg-amber-100 text-amber-700' :
                                            'bg-slate-100 text-slate-600'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="h-8 w-8 rounded bg-slate-50 text-slate-400 hover:text-primary hover:bg-slate-100 transition-all cursor-pointer inline-flex items-center justify-center">
                                            <ChevronRight size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
