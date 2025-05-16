


import { CartProvider } from "../Context/cartquantityContext";
import NavBar from "../Components/Navbar/NavBar";
import { Toaster } from "react-hot-toast";
export default function WithCartLayout({ children }: { children: React.ReactNode }) {
  return <CartProvider>
       <Toaster position="top-right" />
    <NavBar />  {children}
    </CartProvider>;
}
