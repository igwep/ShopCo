"use client";
import React from 'react'
import useFetchProductsFromFireStore from '../hooks/FetchProductFIreStore'
import ProductCards from '../Components/ProductCards';
import { Product } from '../types/Product';

const FragranceSection = () => {
    const { data, loading, error } = useFetchProductsFromFireStore();
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const FragranceProducts = data.filter((product: Product) => product.category === "fragrances");
   // console.log(FragranceProducts, "FragranceProducts")

  return (
    <div>
        <ProductCards products={FragranceProducts}  />

    </div>
  )
}


export default FragranceSection