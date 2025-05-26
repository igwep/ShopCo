import { CartProvider } from "../Context/cartquantityContext";
import NavBar from "../Components/Navbar/NavBar";
import { Toaster } from "react-hot-toast";
import { Footer } from "../Components/Footer";
import { AuthProvider } from "../Context/authContext";
import { UserProvider } from "../Context/userContext";






export default function WithCartLayout({ children }: { children: React.ReactNode }) {
  return  <AuthProvider>
      <UserProvider>
        <CartProvider>
          <Toaster position="top-right" />
          <NavBar />
          {children}
          <Footer />
        </CartProvider>
      </UserProvider>
    </AuthProvider>
}
