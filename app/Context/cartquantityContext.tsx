/* "use client";
import { createContext, useState, ReactNode } from "react";

interface GlobalContextType { 
    user: string | null;
    setUser: (user:string | null ) => void
}


 export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<string | null>(null);

    return (
        <GlobalContext.Provider value={{ user, setUser }}>
            {children}
        </GlobalContext.Provider>
    );
};
/* export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
}; */ // context/CartContext.tsx\

"use client";
import { createContext, useContext, useState, useMemo, ReactNode } from 'react';

type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  rating?: number;
  images: string[];
  category: string;
  shippingInformation?: string;
  description: string;
  discountPercentage?: number;
};

type CartContextType = {
  items: CartItem[];
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
  console.log("Adding item:", item);

  setItems(prev => {
    console.log("Previous items:", prev);

    const existing = prev.find(i => i.id === item.id);
    if (existing) {
      console.log("Item exists, updating quantity");
      return prev.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
      );
    } else {
      console.log("Item doesn't exist, adding new");
      return [...prev, item];
    }
  });
};


  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setItems([]);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{ items, setItems, addItem, removeItem, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
