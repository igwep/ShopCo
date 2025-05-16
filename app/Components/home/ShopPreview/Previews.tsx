"use client";
import React from 'react'
//import useFetchProducts from '@/app/hooks/FetchProducts'
import useFetchProductsFromFireStore from '@/app/hooks/FetchProductFIreStore';
import ProductCard from '../../ProductCards';
import ViewAllBtn from '../../buttons/ViewAllBtn';
import { Product } from '@/app/types/Product';
import Spinner from '../../Spinner';
//import { uploadFakeProducts } from '../../../hooks/GenerateData'// Assuming this is the correct path to your function
///import { useEffect } from 'react';

export const NewArrivals = () => {
   /*  const { data, loading, error } = useFetchProducts("https://dummyjson.com/products")
     if (loading) return <div>Loading...</div>   
    if (error) return <div>Error: {error}</div>
    if (!data) return <div>No data found</div>
    console.log('data', data)  */
    /*  useEffect(() => {
      uploadFakeProducts(10); // generates and uploads 10 products
    }, []);  */

     const { data, loading, error } = useFetchProductsFromFireStore(); 

    if (loading) return <div className='h-[50vh] justify-center flex items-center'><Spinner /></div>;
    if (error) return <div>Error: {error}</div>;
   // console.log(data);  
    const topFourProducts = data.slice(0, 4);
    const topSellingProducts = data
  .filter((product): product is Product & { rating: number } => typeof product.rating === 'number')
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 4);

  return (
    <section className=' w-full h-auto space-y-12 py-12 md:px-34 3xl:px-64 px-4'>
        <h1 className='md:text-5xl text-3xl text-center w-full font-black '>
            Explore Our Products
        </h1>
        <div className='flex flex-col space-y-6 justify-center   items-center w-full '>
        <div className="overflow-x-auto scrollbar-none w-full">
  <div className="flex gap-4 flex-nowrap justify-center w-max px-4">
    <ProductCard products={topFourProducts} />
  </div>
</div>
        <ViewAllBtn to='/Shop' />
        </div>
        <div className='border border-gray-200'>
        </div>
        <div className='flex flex-col space-y-6 justify-center items-center w-full '>
          <h2 className='md:text-5xl text-3xl text-center w-full font-black mt-12'>Top Selling</h2>
          <div className="overflow-x-auto scrollbar-none w-full">
  <div className="flex gap-4 flex-nowrap justify-center w-max px-4">
    <ProductCard products={topSellingProducts} />
  </div>
</div>
          <ViewAllBtn to='/' />
        </div>
    </section>
 )
}
