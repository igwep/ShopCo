"use client";
import React from 'react'
import useFetchProductsFromFireStore from '../hooks/FetchProductFIreStore'
import ProductCards from '../Components/ProductCards';
import { Product } from '../types/Product';

const FurnitureSection = () => {
    const { data, loading, error } = useFetchProductsFromFireStore();
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    const FurnitureProducts = data.filter((product: Product) => product.category === "furniture");
    console.log(FurnitureProducts, "FragranceProducts")

  return (
    <div>
        <ProductCards products={FurnitureProducts}  />
    </div>
  )
}


export default FurnitureSection