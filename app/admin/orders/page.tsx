import { 
    ShoppingBag, 
    Search, 
    Filter, 
    ChevronRight, 
    MoreVertical, 
    Download,
    Truck,
    Package,
    CheckCircle2,
    Clock
} from "@/components/Icons";

export default function AdminOrders() {
    const orders = [
        { id: "ORD-9421", customer: "Amara Perera", items: 2, total: "LKR 18,500", date: "Mar 08, 2024", status: "Delivered", method: "Standard" },
        { id: "ORD-9420", customer: "Kasun Silva", items: 1, total: "LKR 8,550", date: "Mar 08, 2024", status: "Processing", method: "Express" },
        { id: "ORD-9419", customer: "Dilani Fernando", items: 4, total: "LKR 42,200", date: "Mar 07, 2024", status: "Shipped", method: "Cargo" },
        { id: "ORD-9418", customer: "Nimmi Jayasuriya", items: 1, total: "LKR 4,500", date: "Mar 07, 2024", status: "Cancelled", method: "Pickup" },
        { id: "ORD-9417", customer: "Rohan Gunawardena", items: 3, total: "LKR 28,100", date: "Mar 06, 2024", status: "Delivered", method: "Standard" },
        { id: "ORD-9416", customer: "Iromi Fonseka", items: 1, total: "LKR 12,000", date: "Mar 06, 2024", status: "Processing", method: "Standard" },
    ];

    return (
        <div className="space-y-10 font-sans">
            {/* Professional Orders Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0 relative z-10">
                <div className="relative w-full md:w-96 group">
                    <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Search order reference or customer..."
                        className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 focus:outline-none focus:border-primary/30 text-xs font-bold uppercase tracking-wider transition-all"
                    />
                </div>
                
                <div className="flex items-center space-x-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center space-x-2 bg-white px-6 py-4 border border-slate-200 hover:bg-slate-50 transition-all text-[11px] uppercase tracking-wider font-bold cursor-pointer">
                        <Filter size={14} strokeWidth={2} />
                        <span>Filter Matrix</span>
                    </button>
                    
                    <button className="flex-1 md:flex-none flex items-center justify-center space-x-2 bg-primary text-white px-8 py-4 border border-transparent hover:bg-slate-800 transition-all text-[11px] uppercase tracking-widest font-black shadow-md cursor-pointer">
                        <Download size={14} />
                        <span>Export Statement</span>
                    </button>
                </div>
            </div>

            {/* Fufillment Ledger */}
            <div className="bg-white border border-slate-200 shadow-sm overflow-hidden min-h-[600px]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] uppercase tracking-widest font-bold text-slate-400 bg-slate-50 border-b border-slate-200">
                                <th className="px-8 py-5">Order Reference</th>
                                <th className="px-8 py-5">Customer Profile</th>
                                <th className="px-8 py-5">Fulfillment Status</th>
                                <th className="px-8 py-5">Statement Total</th>
                                <th className="px-8 py-5">Method</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {orders.map((order) => (
                                <tr key={order.id} className="group hover:bg-slate-50/30 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col space-y-1">
                                            <span className="text-xs font-bold text-slate-600 tracking-wider transition-colors group-hover:text-primary">{order.id}</span>
                                            <span className="text-[10px] text-slate-400 font-medium">{order.date}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center space-x-3">
                                            <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-[10px] border border-slate-200 uppercase">
                                                {order.customer.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <p className="text-sm font-bold text-primary">{order.customer}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center space-x-3">
                                            {order.status === 'Delivered' && <CheckCircle2 size={14} className="text-green-500" />}
                                            {order.status === 'Processing' && <Clock size={14} className="text-amber-500" />}
                                            {order.status === 'Shipped' && <Truck size={14} className="text-blue-500" />}
                                            {order.status === 'Cancelled' && <div className="w-1.5 h-1.5 rounded-full bg-red-500" />}
                                            
                                            <span className={`text-[10px] font-bold uppercase tracking-wider ${
                                                order.status === 'Delivered' ? 'text-green-700' :
                                                order.status === 'Shipped' ? 'text-blue-700' :
                                                order.status === 'Processing' ? 'text-amber-700' :
                                                'text-slate-500'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col space-y-1">
                                            <span className="text-base font-bold text-primary">{order.total}</span>
                                            <span className="text-[10px] text-slate-400 font-bold uppercase">{order.items} Articles</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[9px] font-bold uppercase tracking-widest rounded-full border border-slate-200">
                                            {order.method}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="h-9 w-9 rounded bg-slate-50 text-slate-400 hover:text-primary transition-all border border-slate-200 flex items-center justify-center cursor-pointer">
                                                <MoreVertical size={14} />
                                            </button>
                                            <button className="h-9 w-9 rounded bg-primary text-white hover:bg-slate-800 transition-all flex items-center justify-center cursor-pointer">
                                                <ChevronRight size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Order Metrics Summary Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 border border-slate-200 flex items-center space-x-6 shadow-sm">
                    <div className="h-12 w-12 bg-green-50 text-green-600 rounded flex items-center justify-center">
                        <CheckCircle2 size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400">Total Fulfillments</p>
                        <h4 className="text-2xl font-bold text-primary tracking-tight">842</h4>
                    </div>
                </div>
                <div className="bg-white p-6 border border-slate-200 flex items-center space-x-6 shadow-sm">
                    <div className="h-12 w-12 bg-amber-50 text-amber-600 rounded flex items-center justify-center">
                        <Package size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400">Awaiting Pickup</p>
                        <h4 className="text-2xl font-bold text-primary tracking-tight">12</h4>
                    </div>
                </div>
                <div className="bg-white p-6 border border-slate-200 flex items-center space-x-6 shadow-sm">
                    <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded flex items-center justify-center">
                        <Truck size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400">In-Transit Statement</p>
                        <h4 className="text-2xl font-bold text-primary tracking-tight">45</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}
