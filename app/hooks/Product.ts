"use client";

import { useEffect, useState } from "react";
import { db } from "../Firebase";
import { collection, getDocs } from "firebase/firestore";
import { Product } from "../types/Product";

export const useProduct = (slug: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!slug) return;

    const fetchProductBySlug = async () => {
      try {
        setLoading(true);

        const querySnapshot = await getDocs(collection(db, "Products"));

        const matchedDoc = querySnapshot.docs.find(doc => {
          const data = doc.data() as Product;
          // Match by slug field (ensure your product docs contain a `slug`)
          return data.title.toLowerCase().replace(/\s+/g, "-") === slug;
        });

        if (matchedDoc) {
          const foundProduct = {
            id: matchedDoc.id,
            ...matchedDoc.data(),
          } as Product;
          setProduct(foundProduct);
        } else {
          setError("Product not found");
        }
      } catch (err: any) {
        console.error(err);
        setError("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchProductBySlug();
  }, [slug]);

  return { product, loading, error };
};
