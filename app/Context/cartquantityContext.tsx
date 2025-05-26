
"use client";
import { 
   createContext,
   useEffect, 
   useContext, 
   useState, 
   useMemo, 
   ReactNode
   } from 'react';
import { toast } from 'react-hot-toast';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/app/Firebase'; // Ensure you have the correct path to your Firebase config
import { useUser } from './userContext';

type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  rating?: number;
  images: string[];
  category: string;
  shippingInformation?: string;
  thumbnail?: string;
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
  const { user } = useUser();

  // Load initial cart items from localStorage
  // and optionally from Firestore if user is logged in

  useEffect(() => {
  const loadCart = async () => {
    const storedCart = localStorage.getItem("cartItems");
    const parsedCart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

    if (user?.uid) {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        const userCart: CartItem[] = userData.items || [];

        // Merge localStorage + Firestore cart
        const mergedCart = [...userCart, ...parsedCart].reduce((acc: CartItem[], item: CartItem) => {
          const existing = acc.find(i => i.id === item.id);
          if (existing) {
            existing.quantity += item.quantity;
          } else {
            acc.push(item);
          }
          return acc;
        }, []);

        setItems(mergedCart);

        //  Save merged cart back to Firestore
        await updateDoc(docRef, { items: mergedCart });
      } else {
        // If user doc doesn't exist, initialize it with local cart
        await setDoc(docRef, { items: parsedCart });
        setItems(parsedCart);
      }
    } else {
      // Not logged in: use local storage
      setItems(parsedCart);
    }
  };

  loadCart();
}, [user]);

   /* useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setItems(JSON.parse(storedCart));
    }
  }, []); */

  //  Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);

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
  toast.success(`${item.title} added to cart`)
  
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
