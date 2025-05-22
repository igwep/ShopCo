"use client";
import { useEffect, useState } from "react";
import { db } from "../Firebase";
import { collection, getDocs } from "firebase/firestore";
import { Product } from "../types/Product";


  const useFetchProductsFromFireStore = () => { 

    const [data, setData] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          setLoading(true);
          const querySnapshot = await getDocs(collection(db, "Products"));
          const products: Product[] = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as Product[];
  
          setData(products);
        } catch (err: any) {
          setError(err.message || "Something went wrong");
        } finally {
          setLoading(false);
        }
      };
  
      fetchProducts();
    }, []);
  
    return { data, loading, error };

  }
  export default useFetchProductsFromFireStore;

/*  "use client";
import { useQuery } from "@tanstack/react-query";
import { db } from "../Firebase";
import { collection, getDocs } from "firebase/firestore";
import { Product } from "../types/Product";

// Async function to fetch products
const fetchProducts = async (): Promise<Product[]> => {
  const querySnapshot = await getDocs(collection(db, "Products"));
  const products: Product[] = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];

  return products;
};

const useFetchProductsFromFireStore = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 10, // 10 minutes 
   // cacheTime: 1000 * 60 * 60, // 1 hour
  });
};

export default useFetchProductsFromFireStore; */