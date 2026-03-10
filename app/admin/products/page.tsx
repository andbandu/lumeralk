import { Plus, Search, Filter, MoreVertical, Edit, Trash2 } from "@/components/Icons";
import Image from "next/image";

export default function AdminProducts() {
    const products = [
        { id: 1, name: "Silk Evening Gown", category: "Clothing", price: "$240.00", stock: 12, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1964&auto=format&fit=crop" },
        { id: 2, name: "Leather Tote Bag", category: "Accessories", price: "$180.00", stock: 25, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1935&auto=format&fit=crop" },
        { id: 3, name: "Cashmere Sweater", category: "Clothing", price: "$120.00", stock: 8, image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop" },
        { id: 4, name: "Gold Hoop Earrings", category: "Accessories", price: "$45.00", stock: 45, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1974&auto=format&fit=crop" },
    ];

    return (
        <div className="space-y-8">
            {/* Search and Filter Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="relative w-full md:w-96">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-muted/10 focus:outline-none focus:border-accent shadow-premium text-sm"
                    />
                </div>
                <div className="flex items-center space-x-4 w-full md:w-auto">
                    <button className="flex items-center space-x-2 bg-white px-5 py-3 rounded-xl border border-muted/10 hover-glow text-sm font-bold uppercase tracking-widest transition-all">
                        <Filter size={16} />
                        <span>Filter</span>
                    </button>
                    <button className="flex-1 md:flex-none flex items-center justify-center space-x-2 bg-primary text-white px-6 py-3 rounded-xl hover:bg-accent transition-all shadow-premium text-sm font-bold uppercase tracking-widest group">
                        <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                        <span>Add Product</span>
                    </button>
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="bg-white rounded-2xl shadow-premium border border-muted/10 overflow-hidden group">
                        <div className="relative h-64 overflow-hidden">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                            <div className="absolute top-4 right-4 flex flex-col space-y-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
                                <button className="p-2 bg-white rounded-full shadow-premium text-primary hover:text-accent transition-colors">
                                    <Edit size={16} />
                                </button>
                                <button className="p-2 bg-white rounded-full shadow-premium text-primary hover:text-red-500 transition-colors">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            <div className="absolute bottom-4 left-4">
                                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-widest shadow-premium">
                                    {product.category}
                                </span>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                            <div className="flex justify-between items-center text-sm font-medium">
                                <span className="text-accent">{product.price}</span>
                                <span className={`${product.stock < 10 ? 'text-red-500' : 'text-muted'}`}>
                                    {product.stock} in stock
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
