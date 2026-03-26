import { 
    Settings, 
    Save, 
    LinkIcon, 
    Globe, 
    Shield, 
    Bell, 
    Database, 
    CreditCard,
    ChevronRight,
    Search
} from "@/components/Icons";

export default function AdminSettings() {
    return (
        <div className="space-y-12 font-sans max-w-5xl">
            {/* System Config Overview */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-primary uppercase">System Governance</h2>
                    <p className="text-[10px] uppercase font-bold text-slate-400 mt-1">lumera.lk structural configuration</p>
                </div>
                <button className="flex items-center space-x-3 bg-primary text-white px-8 py-4 border border-transparent hover:bg-slate-800 transition-all text-[11px] uppercase tracking-widest font-black shadow-md cursor-pointer">
                    <Save size={14} />
                    <span>Synchronize Matrix</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left Panel: Navigation Context */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-white border border-slate-200 shadow-sm p-4 space-y-2">
                        <button className="w-full flex items-center justify-between p-4 bg-primary text-white rounded shadow-md group">
                            <div className="flex items-center space-x-4">
                                <Globe size={16} />
                                <span className="text-xs font-bold uppercase tracking-widest">Store Profile</span>
                            </div>
                            <ChevronRight size={14} />
                        </button>
                        <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 text-slate-400 hover:text-primary transition-all group">
                            <div className="flex items-center space-x-4">
                                <Shield size={16} />
                                <span className="text-xs font-bold uppercase tracking-widest">Security Matrix</span>
                            </div>
                            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                        <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 text-slate-400 hover:text-primary transition-all group">
                            <div className="flex items-center space-x-4">
                                <Bell size={16} />
                                <span className="text-xs font-bold uppercase tracking-widest">Notification Engine</span>
                            </div>
                            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                        <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 text-slate-400 hover:text-primary transition-all group">
                            <div className="flex items-center space-x-4">
                                <CreditCard size={16} />
                                <span className="text-xs font-bold uppercase tracking-widest">Payment Gateways</span>
                            </div>
                            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    </div>
                    
                    <div className="p-6 bg-slate-50 border border-slate-200">
                        <p className="text-[10px] uppercase font-bold text-slate-400 mb-4 tracking-widest">System Health</p>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-500 font-bold">Latency</span>
                                <span className="text-xs text-green-500 font-black">24ms</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-500 font-bold">Core Node</span>
                                <span className="text-xs text-primary font-black">AS-COL-01</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Active Configuration Form */}
                <div className="lg:col-span-2 space-y-10">
                    {/* General Section */}
                    <div className="bg-white border border-slate-200 shadow-sm p-10 space-y-8">
                        <h3 className="text-base font-bold text-primary flex items-center tracking-tight border-b border-slate-100 pb-6 uppercase">
                            Global Parameters
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-[10px] uppercase font-black tracking-widest text-slate-400">Store Domain Identity</label>
                                <input type="text" defaultValue="lumera.lk" className="w-full p-4 bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary text-sm font-bold text-primary" />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] uppercase font-black tracking-widest text-slate-400">Master Currency Context</label>
                                <select className="w-full p-4 bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary text-sm font-bold text-primary">
                                    <option>LKR - Sri Lankan Rupee</option>
                                    <option>USD - US Dollar</option>
                                    <option>EUR - Euro</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] uppercase font-black tracking-widest text-slate-400">Official Communication Point</label>
                            <input type="email" defaultValue="hello@lumera.lk" className="w-full p-4 bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary text-sm font-bold text-primary" />
                        </div>

                        <div className="space-y-3">
                            <textarea 
                                rows={3} 
                                defaultValue="42/A, Horton Place, Colombo 07, Sri Lanka"
                                className="w-full p-4 bg-slate-50 border border-slate-200 focus:outline-none focus:border-primary text-sm font-bold text-primary resize-none" 
                            />
                        </div>
                    </div>

                    {/* Operational Section */}
                    <div className="bg-white border border-slate-200 shadow-sm p-10 space-y-8">
                        <h3 className="text-base font-bold text-primary flex items-center tracking-tight border-b border-slate-100 pb-6 uppercase">
                            Operational Logic
                        </h3>
                        
                        <div className="flex items-center justify-between p-6 bg-slate-50 border border-slate-200 group hover:border-primary transition-all duration-300">
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-primary uppercase tracking-wide">Autonomous Inventory Sync</p>
                                <p className="text-[10px] text-slate-400 font-medium">Automatic stock synchronization across node clusters</p>
                            </div>
                            <div className="h-6 w-12 bg-primary rounded-full relative shadow-inner shadow-black/20 group-hover:bg-slate-900 transition-colors">
                                <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full shadow-md" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-6 bg-slate-50 border border-slate-200 group hover:border-primary transition-all duration-300">
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-primary uppercase tracking-wide">Developer Trace Mode</p>
                                <p className="text-[10px] text-slate-400 font-medium">Capture granular debugging data for system analysis</p>
                            </div>
                            <div className="h-6 w-12 bg-slate-200 rounded-full relative shadow-inner group-hover:border-slate-300 transition-colors border border-transparent">
                                <div className="absolute left-1 top-1 h-4 w-4 bg-white rounded-full shadow-md" />
                            </div>
                        </div>
                    </div>

                    {/* Threat Protection Context */}
                    <div className="p-10 border border-red-100 bg-red-50/30 space-y-6">
                        <div className="flex items-center space-x-4 text-red-600">
                            <Shield size={20} />
                            <p className="text-xs font-black uppercase tracking-widest">Critical Zone</p>
                        </div>
                        <p className="text-xs text-red-600/60 font-medium leading-relaxed">
                            Interacting with these parameters may cause total system disruption. Ensure you have a redundancy matrix backup before proceeding.
                        </p>
                        <button className="px-8 py-3 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-md">
                            Reset Production Node
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
