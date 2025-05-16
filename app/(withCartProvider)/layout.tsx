// app/(with-cart)/layout.tsx
"use client"; // required because it wraps a Client Provider

import { CartProvider } from "../Context/cartquantityContext";
import NavBar from "../Components/Navbar/NavBar";

export default function WithCartLayout({ children }: { children: React.ReactNode }) {
  return <CartProvider>
    <NavBar />  {children}
    </CartProvider>;
}
