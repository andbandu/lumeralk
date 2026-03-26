"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type CartItem = {
  id: string; // usually a mix of productId + size
  productId: string;
  name: string;
  price: string;
  image: string;
  size: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "id">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  getCartTotal: () => number;
  cartCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [toastMessage, setToastMessage] = useState<{title: string, desc: string} | null>(null);

  // Read initial cart from local storage if available
  useEffect(() => {
    setIsClient(true);
    const storedCart = localStorage.getItem("lumera_cart");
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (e) {}
    }
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("lumera_cart", JSON.stringify(items));
    }
  }, [items, isClient]);

  const addToCart = (newItem: Omit<CartItem, "id">) => {
    setItems((prev) => {
      const generatedId = `${newItem.productId}-${newItem.size}`;
      const existingItem = prev.find((item) => item.id === generatedId);

      if (existingItem) {
        return prev.map((item) =>
          item.id === generatedId
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }

      return [...prev, { ...newItem, id: generatedId }];
    });

    // Show beautiful toast instead of JS alert
    setToastMessage({
      title: "Added to Bag",
      desc: `${newItem.name} (${newItem.size}) is in your cart.`
    });
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) => prev.map((item) => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => {
      const priceVal = parseInt(item.price.replace(/[^\d]/g, ""));
      return total + (priceVal * item.quantity);
    }, 0);
  };

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, getCartTotal, cartCount }}>
      {children}
      
      {/* Global Toast Notification System */}
      <div 
        className={`fixed bottom-8 right-8 z-[200] transition-all duration-500 transform ${
          toastMessage ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        {toastMessage && (
          <div className="bg-primary text-white p-5 md:p-6 shadow-2xl flex items-start space-x-4 max-w-sm border border-white/10">
            <div className="w-10 h-10 rounded-full bg-brand-gradient flex items-center justify-center flex-shrink-0">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div>
              <h4 className="text-[11px] uppercase tracking-widest font-black mb-1">{toastMessage.title}</h4>
              <p className="text-white/70 text-sm font-medium">{toastMessage.desc}</p>
            </div>
          </div>
        )}
      </div>

    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
