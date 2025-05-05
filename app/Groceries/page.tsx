"use client";
import React from 'react'
import useFetchProductsFromFireStore from '../hooks/FetchProductFIreStore'
import ProductCard from '../Components/ProductCards';
import { Product } from '../types/Product';

const GroceriesSection = () => {
    const { data, loading, error } = useFetchProductsFromFireStore();
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const groceryProducts = data.filter((product: Product) => product.category === "groceries");
    console.log(groceryProducts, "FragranceProducts")

  return (
    <div className='w-full h-auto space-y-12 py-12 md:px-34 3xl:px-64 px-4 '>
       <div className='grid  w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
       <ProductCard products={groceryProducts}  />
       </div>
    </div>
  )
}


export default GroceriesSection