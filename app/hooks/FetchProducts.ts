"use client";
 import { useEffect, useState} from "react";
 import { setDoc, doc } from "firebase/firestore";
 import {db} from "../Firebase";
 interface Product {
    id: number;
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
    creationAt: string;
    updatedAt: string;
   // type?: 'casual' | 'formal' | 'party' | 'gym' | 'uncategorized'; 
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
                const result: Product[] = await response.json();
                console.log('result', result)
               /*  const filtered = result
                .filter((product) => product.category?.name?.toLowerCase() === "clothes")
                .map((product) => ({
                  ...product,
                  type: determineClothingType(product),
                }));
              */
                setData(result);
               /*  await Promise.all(
                    filtered.map(async (product) => {
                      const docRef = doc(db, "clothingProducts", product.id.toString());
                      await setDoc(docRef, product); // Overwrites if exists
                    })
                  ); */
                  for (const product of result) {
                    try {
                      if (product.id) {
                        const docRef = doc(db, "clothingProducts", product.id.toString());
                        await setDoc(docRef, product); // Overwrites if exists
                        console.log(`Uploaded product ${product.id}`);
                      }
                    } catch (uploadErr) {
                      console.error("Upload error for product", product.id, uploadErr);
                    }
                  }
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

 