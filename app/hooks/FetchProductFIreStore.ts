"use client";
import { useEffect, useState } from "react";
import { db } from "../Firebase";
import { collection, getDocs } from "firebase/firestore";

interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    images: string[];
    category: {
      id: number;
      name: string;
      image: string;
      slug: string;
    };
    slug: string;
    createdAt: string;
    updatedAt: string;
  }

  const useFetchProductsFromFireStore = () => { 

    const [data, setData] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          setLoading(true);
          const querySnapshot = await getDocs(collection(db, "clothingProducts"));
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