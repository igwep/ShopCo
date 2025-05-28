"use client";

import { useEffect, useTransition } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { CartProvider } from "../Context/cartquantityContext";
import NavBar from "../Components/Navbar/NavBar";
import { Toaster } from "react-hot-toast";
import { Footer } from "../Components/Footer";
import { AuthProvider } from "../Context/authContext";
import { UserProvider } from "../Context/userContext";

export default function WithCartLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (isPending) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isPending]);

  // Trigger transition on pathname change
  useEffect(() => {
    startTransition(() => {
      // This effect triggers navigation rendering
      // No need to do anything here; just to mark start of transition
    });
  }, [pathname, startTransition]);

  return (
    <AuthProvider>
      <UserProvider>
        <CartProvider>
          <Toaster position="top-right" />
          <NavBar />
          {children}
          <Footer />
        </CartProvider>
      </UserProvider>
    </AuthProvider>
  );
}
