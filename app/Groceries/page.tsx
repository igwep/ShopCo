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
       
       <ProductCard products={groceryProducts}  />

    </div>
  )
}


export default GroceriesSection