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
import { SearchProvider, useSearch } from "../Context/searchContext";
import SearchResults from "../Components/SearchResults";

import useFetchProductsFromFireStore from "../hooks/FetchProductFIreStore";
import Spinner from "../Components/Spinner"; // Your custom full-page spinner

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { query } = useSearch();
  return (
    <>
      <Toaster position="top-right" />
      <NavBar />
      {query.trim() !== "" ? <SearchResults /> : children}
      <Footer />
    </>
  );
}

export default function WithCartLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const { loading, error } = useFetchProductsFromFireStore();

   useEffect(() => {
    if (isPending) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isPending]);

  useEffect(() => {
    startTransition(() => {});
  }, [pathname, startTransition]);

  // Show full-screen loading until products are ready
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500 bg-white">
        Failed to load products: {error}
      </div>
    );
  }

 

  return (
    <AuthProvider>
      <UserProvider>
        <CartProvider>
          <SearchProvider>
            <LayoutContent>{children}</LayoutContent>
          </SearchProvider>
        </CartProvider>
      </UserProvider>
    </AuthProvider>
  );
}
