// context/cartContext.tsx
"use client";
import {
  createContext,
  useEffect,
  useContext,
  useState,
  useMemo,
  ReactNode,
} from "react";
import { toast } from "react-hot-toast";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/Firebase";
import { useUser } from "./userContext";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  images: string[];
  category: string;
  rating?: number;
  shippingInformation?: string;
  thumbnail?: string;
  description: string;
  discountPercentage?: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  totalItems: number;
  totalPrice: number;
  loading: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();


  useEffect(() => {
    const loadCart = async () => {
      const raw = localStorage.getItem("cartItems");
      const guestCart: CartItem[] = raw ? JSON.parse(raw) : [];
      const alreadyMerged = sessionStorage.getItem("cartMerged");

      if (user?.uid) {
        const cartRef = doc(db, "users", user.uid);
        const snap = await getDoc(cartRef);
        const serverCart: CartItem[] = snap.exists() ? snap.data().items || [] : [];

        let merged = serverCart;

        // only merge once per session
        if (guestCart.length > 0 && !alreadyMerged) {
          merged = [...serverCart, ...guestCart].reduce((acc: CartItem[], item) => {
            const ex = acc.find((i) => i.id === item.id);
            if (ex) ex.quantity += item.quantity;
            else acc.push(item);
            return acc;
          }, []);
          await setDoc(cartRef, { items: merged }, { merge: true });
          localStorage.removeItem("cartItems");
          sessionStorage.setItem("cartMerged", "true");
        }

        setItems(merged);
      } else {
        // guest: just use localStorage
        setItems(guestCart);
      }
    };

    loadCart();
  }, [user]);

  //  Persist Guest Cart to localStorage
  useEffect(() => {
    if (!user?.uid) {
      localStorage.setItem("cartItems", JSON.stringify(items));
    }
  }, [items, user]);

   
  const addItem = async (item: CartItem) => {
  setLoading(true);

  try {
    
    const updatedItems = (() => {
      const ex = items.find((i) => i.id === item.id);
      if (ex) {
        return items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...items, item];
    })();

    // 2️ Update React state immediately
    setItems(updatedItems);

    // 3️ Persist the change
    if (user?.uid) {
      // Logged-in: update Firestore
      const cartRef = doc(db, "users", user.uid);
      await updateDoc(cartRef, { items: updatedItems });
    } else {
      // Guest: update localStorage
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    }

    toast.success(`${item.title} added to cart`);
  } catch (err) {
    console.error("Failed to add item to cart:", err);
    toast.error("Could not add item. Please try again.");
  } finally {
    setLoading(false);
  }
};

  const removeItem = async (id: string) => {
  setLoading(true);

  try {
    // 1️ Compute the new items array
    const updatedItems = items.filter((i) => i.id !== id);

    // 2️ Update React state immediately
    setItems(updatedItems);

    // 3️ Persist the change
    if (user?.uid) {
      // Logged-in: update Firestore
      const cartRef = doc(db, "users", user.uid);
      await updateDoc(cartRef, { items: updatedItems });
    } else {
      // Guest: update localStorage
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    }

    toast.success("Item removed from cart");
  } catch (err) {
    console.error("Failed to remove item:", err);
    toast.error("Could not remove item. Please try again.");
  } finally {
    setLoading(false);
  }
};


  const clearCart = () => {
    setItems([]);
    if (user?.uid) {
      const cartRef = doc(db, "users", user.uid);
      updateDoc(cartRef, { items: [] }).catch(() => toast.error("Failed to clear server cart"));
    } else {
      localStorage.removeItem("cartItems");
    }
  };

  const totalItems = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const totalPrice = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items]);

  return (
    <CartContext.Provider value={{ items, setItems, addItem, removeItem, clearCart, totalItems, totalPrice, loading }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
