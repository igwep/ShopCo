


import { CartProvider } from "../Context/cartquantityContext";
import NavBar from "../Components/Navbar/NavBar";
import { Toaster } from "react-hot-toast";
import { Footer } from "../Components/Footer";
import { AuthProvider } from "../Context/authContext";
export default function WithCartLayout({ children }: { children: React.ReactNode }) {
  return <CartProvider>
       <Toaster position="top-right" />
      <AuthProvider>
        <NavBar />
   {children}
        <Footer />
      </AuthProvider>
    </CartProvider>;
}
