"use client";
import React from 'react'
import useFetchProductsFromFireStore from '../hooks/FetchProductFIreStore'
import ProductCards from '../Components/ProductCards';
import { Product } from '../types/Product';




const BeautySection = () => {
    const { data, loading, error } = useFetchProductsFromFireStore();
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const beautyProducts = data.filter((product: Product) => product.category === "beauty");
    //console.log(beautyProducts, "beautyProducts")

  return (
    <div>
        <ProductCards products={beautyProducts}  />

    </div>
  )
}

export default BeautySection;