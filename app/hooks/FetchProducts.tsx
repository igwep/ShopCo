"use client";
 import { useEffect, useState} from "react";
 const useFetchProducts = (url: string) => {  
    const [data, setData] = useState<null | unknown[]>([]);
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
                const result = await response.json();
                setData(result);
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