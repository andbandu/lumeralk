import { 
    Users, 
    Search, 
    Filter, 
    ChevronRight, 
    MoreVertical, 
    Mail,
    Phone,
    MapPin,
    Star,
    Calendar
} from "@/components/Icons";

export default function AdminCustomers() {
    const customers = [
        { id: "CST-001", name: "Amara Perera", email: "amara@example.com", phone: "+94 77 123 4567", orders: 12, spent: "LKR 145,200", joined: "Jan 12, 2024", location: "Colombo 07" },
        { id: "CST-002", name: "Kasun Silva", email: "kasun@example.com", phone: "+94 77 987 6543", orders: 3, spent: "LKR 28,550", joined: "Feb 08, 2024", location: "Kandy" },
        { id: "CST-003", name: "Dilani Fernando", email: "dilani@gmail.com", phone: "+94 76 555 4444", orders: 24, spent: "LKR 420,200", joined: "Dec 07, 2023", location: "Colombo 03" },
        { id: "CST-004", name: "Nimmi Jayasuriya", email: "nimmi.j@outlook.com", phone: "+94 71 222 3333", orders: 1, spent: "LKR 4,500", joined: "Mar 07, 2024", location: "Galle" },
        { id: "CST-005", name: "Rohan Gunawardena", email: "rohan@company.com", phone: "+94 77 888 9999", orders: 7, spent: "LKR 88,100", joined: "Jan 22, 2024", location: "Battaramulla" },
    ];

    return (
        <div className="space-y-10 font-sans">
            {/* Professional Customers Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0 relative z-10">
                <div className="relative w-full md:w-96 group">
                    <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Search client index..."
                        className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 focus:outline-none focus:border-primary/30 text-xs font-bold uppercase tracking-wider transition-all"
                    />
                </div>
                
                <div className="flex items-center space-x-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center space-x-2 bg-white px-6 py-4 border border-slate-200 hover:bg-slate-50 transition-all text-[11px] uppercase tracking-wider font-bold cursor-pointer">
                        <Filter size={14} strokeWidth={2} />
                        <span>Filter Client Segments</span>
                    </button>
                    
                    <button className="flex-1 md:flex-none flex items-center justify-center space-x-2 bg-primary text-white px-8 py-4 border border-transparent hover:bg-slate-800 transition-all text-[11px] uppercase tracking-widest font-black shadow-md cursor-pointer">
                        <Users size={14} />
                        <span>Add New Client</span>
                    </button>
                </div>
            </div>

            {/* Client Relationship Index */}
            <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] uppercase tracking-widest font-bold text-slate-400 bg-slate-50 border-b border-slate-200">
                                <th className="px-8 py-5">Client Identity</th>
                                <th className="px-8 py-5">Contact Matrix</th>
                                <th className="px-8 py-5">Activity Statement</th>
                                <th className="px-8 py-5">Relationship Total</th>
                                <th className="px-8 py-5">Location Axis</th>
                                <th className="px-8 py-5 text-right">Commands</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {customers.map((customer) => (
                                <tr key={customer.id} className="group hover:bg-slate-50/30 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center space-x-4">
                                            <div className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                                                {customer.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-primary mb-0.5">{customer.name}</h3>
                                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">{customer.id}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col space-y-1.5">
                                            <div className="flex items-center text-xs text-slate-600 space-x-2">
                                                <Mail size={12} className="text-slate-400" />
                                                <span>{customer.email}</span>
                                            </div>
                                            <div className="flex items-center text-[11px] text-slate-400 space-x-2">
                                                <Phone size={12} className="text-slate-400" />
                                                <span>{customer.phone}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center space-x-3">
                                            <div className={`px-2 py-0.5 rounded text-[10px] font-bold border ${customer.orders > 10 ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-slate-50 text-slate-500 border-slate-100'}`}>
                                                {customer.orders > 10 ? 'VIP CLIENT' : 'STANDARD'}
                                            </div>
                                            <span className="text-xs font-bold text-slate-600">{customer.orders} Orders</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col space-y-1">
                                            <span className="text-base font-bold text-primary">{customer.spent}</span>
                                            <div className="flex items-center text-[9px] text-slate-400 uppercase font-black tracking-widest">
                                                <Calendar size={10} className="mr-1.5" />
                                                Joined {customer.joined}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                            <MapPin size={12} className="mr-2 text-slate-300" />
                                            {customer.location}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end space-x-2">
                                            <button className="h-9 w-9 rounded bg-slate-100 text-slate-400 hover:text-primary transition-all flex items-center justify-center cursor-pointer border border-transparent hover:border-slate-200">
                                                <Mail size={14} />
                                            </button>
                                            <button className="h-9 w-9 rounded bg-slate-900 text-white hover:bg-slate-800 transition-all flex items-center justify-center cursor-pointer shadow-md">
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

            {/* Performance Bar */}
            <div className="bg-primary p-8 shadow-xl text-white flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="flex items-center space-x-6 relative z-10">
                    <div className="h-14 w-14 rounded-full bg-white/10 flex items-center justify-center border border-white/5">
                        <Users size={28} className="text-white/40" />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold tracking-tight">Total Client Network</h4>
                        <p className="text-xs text-white/40 uppercase tracking-[0.2em] font-black">2,482 Active Accounts</p>
                    </div>
                </div>

                <div className="flex space-x-12 relative z-10">
                    <div className="text-center">
                        <p className="text-[10px] uppercase font-bold text-white/30 tracking-widest mb-1">VIP Retention</p>
                        <p className="text-2xl font-bold">18.5%</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] uppercase font-bold text-white/30 tracking-widest mb-1">New Sign Ups</p>
                        <p className="text-2xl font-bold">42 <span className="text-xs text-green-400">+12%</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
