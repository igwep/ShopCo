// app/Context/searchContext.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "../types/Product";
import useFetchProductsFromFireStore from "../hooks/FetchProductFIreStore"; // adjust the path

type SearchContextType = {
  query: string;
  setQuery: (val: string) => void;
  results: Product[];
  isLoading: boolean;
  error: string | null;
  setRults?: (products: Product[]) => void; // Optional setter for results
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: allProducts = [], loading: isLoading, error } = useFetchProductsFromFireStore();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (query.trim() === "") {
      setResults(allProducts);
    } else {
      const filtered = allProducts.filter((product: { title: string; }) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    }
  }, [query, allProducts]);

  return (
    <SearchContext.Provider value={{ query, setQuery, results, isLoading, error, setRults: setResults }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useSearch must be used inside SearchProvider");
  return context;
};
