"use client";
import React from 'react'
//import useFetchProducts from '@/app/hooks/FetchProducts'
import useFetchProductsFromFireStore from '@/app/hooks/FetchProductFIreStore';
import ProductCards from '../../ProductCards';

export const NewArrivals = () => {
   // const { data, loading, error } = useFetchProducts("https://api.escuelajs.co/api/v1/products")
   /*  if (loading) return <div>Loading...</div>   
    if (error) return <div>Error: {error}</div>
    if (!data) return <div>No data found</div>
    console.log(data) */
    const { data, loading, error } = useFetchProductsFromFireStore();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    console.log(data); 
    const topThreeProducts = data.slice(0, 3);
  return (
    <section className='flex w-full h-[100vh] '>
        <h1 className='text-5xl text-center w-full font-black mt-8'>
            New Arrivals
        </h1>
        <div>
        <ProductCards products={topThreeProducts} />
        </div>
    </section>
 )
}
