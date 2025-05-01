"use client";
 import { useEffect, useState} from "react";
 //import { setDoc, doc, getDoc } from "firebase/firestore";
 //import {db} from "../Firebase";
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
  availabilityStatus?: string;
  brand?: string;
  dimensions?: {
    depth: number;
    height: number;
    width: number;
  };
  discountPercentage?: number;
  rating?: number;
  returnPolicy?: string;
  reviews?: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  shippingInformation?: string;
  sku?: string;
  stock?: number;
  tags?: string[];
  thumbnail?: string;
  warrantyInformation?: string;
  weight?: number;
}
interface FetchResponse {
  limit: number;
  products: Product[];
}

  /* const determineClothingType = (product: Product): Product["type"] => {
    const text = `${product.title} ${product.description}`.toLowerCase();
  
    if (text.includes("jogger") || text.includes("tracksuit") || text.includes("gym") || text.includes("sweat")) {
      return "gym";
    } else if (text.includes("gown") || text.includes("party") || text.includes("dress") || text.includes("evening")) {
      return "party";
    } else if (text.includes("blazer") || text.includes("suit") || text.includes("formal") || text.includes("office")) {
      return "formal";
    } else if (text.includes("t-shirt") || text.includes("jeans") || text.includes("casual") || text.includes("shorts")) {
      return "casual";
    } else {
      return "uncategorized";
    }
  }; */

 const useFetchProducts = (url: string) => {  
    const [data, setData] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => { 
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const result: FetchResponse = await response.json();
                console.log('result', result.products)
               /*  const filtered = result
                .filter((product) => product.category?.name?.toLowerCase() === "clothes")
                .map((product) => ({
                  ...product,
                  type: determineClothingType(product),
                }));
              */
                setData(result.products);
               /*  await Promise.all(
                    filtered.map(async (product) => {
                      const docRef = doc(db, "clothingProducts", product.id.toString());
                      await setDoc(docRef, product); // Overwrites if exists
                    })
                  ); */
                 /*  for (const product of data) {
                    try {
                      if (product.id) {
                        const docRef = doc(db, "Products", product.id.toString());
                        const docSnap = await getDoc(docRef);
                        if (!docSnap.exists()) {
                          await setDoc(docRef, product);
                          console.log(`Uploaded product ${product.id}`);
                        } else {
                          console.log(`Product ${product.id} already exists, skipping...`);
                        }
                      }
                    } catch (uploadErr) {
                      console.error("Upload error for product", product.id, uploadErr);
                    }
                  } */
            } catch (error:any) {
                setError(error.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    },[url]);


    return { data, loading, error };

 };
 export default useFetchProducts;

 