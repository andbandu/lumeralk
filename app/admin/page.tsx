import {
    TrendingUp,
    ShoppingBag,
    Users,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight
} from "@/components/Icons";

export default function AdminDashboard() {
    const stats = [
        { label: "Total Revenue", value: "$128,430", change: "+12.5%", trend: "up", icon: DollarSign },
        { label: "Total Orders", value: "1,240", change: "+8.2%", trend: "up", icon: ShoppingBag },
        { label: "New Customers", value: "342", change: "-2.4%", trend: "down", icon: Users },
        { label: "Conversion Rate", value: "3.2%", change: "+0.5%", trend: "up", icon: TrendingUp },
    ];

    const recentOrders = [
        { id: "#ORD-7421", customer: "Amara Perera", date: "Mar 08, 2024", total: "$120.00", status: "Delivered" },
        { id: "#ORD-7420", customer: "Kasun Silva", date: "Mar 08, 2024", total: "$85.50", status: "Processing" },
        { id: "#ORD-7419", customer: "Dilani Fernando", date: "Mar 07, 2024", total: "$210.00", status: "Shipped" },
        { id: "#ORD-7418", customer: "Nimmi Jayasuriya", date: "Mar 07, 2024", total: "$45.00", status: "Pending" },
    ];

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-premium border border-muted/10 hover-glow">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-secondary rounded-xl text-primary">
                                    <Icon size={24} />
                                </div>
                                <div className={`flex items-center space-x-1 text-xs font-bold ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                                    <span>{stat.change}</span>
                                    {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                </div>
                            </div>
                            <p className="text-muted text-[10px] uppercase tracking-widest font-bold mb-1">{stat.label}</p>
                            <h3 className="text-2xl font-bold tracking-tight">{stat.value}</h3>
                        </div>
                    );
                })}
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white rounded-2xl shadow-premium border border-muted/10 overflow-hidden">
                <div className="p-6 border-b border-muted/10 flex justify-between items-center">
                    <h2 className="text-lg font-bold tracking-tight">Recent Orders</h2>
                    <button className="text-xs uppercase tracking-widest font-bold text-accent hover:text-primary transition-colors">
                        View All Orders
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] uppercase tracking-widest font-bold text-muted bg-secondary/30">
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-muted/10 text-sm">
                            {recentOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-secondary/20 transition-colors">
                                    <td className="px-6 py-4 font-bold">{order.id}</td>
                                    <td className="px-6 py-4">{order.customer}</td>
                                    <td className="px-6 py-4 text-muted">{order.date}</td>
                                    <td className="px-6 py-4 font-bold">{order.total}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                                                    order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-gray-100 text-gray-700'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-accent underline hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest">
                                            Details
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
