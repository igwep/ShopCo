"use client";
import React from 'react'
import useFetchProductsFromFireStore from '../hooks/FetchProductFIreStore'
import ProductCard from '../Components/ProductCards';
import Breadcrumb from '../Components/Breadcrumb';

const Shop = () => {
    const { data, loading, error } = useFetchProductsFromFireStore();
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

  return (
    <div className='w-full h-auto space-y-12 pt-12 pb-28 md:px-34 3xl:px-64 px-4 '>
      <Breadcrumb />
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {data.length === 0 && <div className='text-center text-xl font-semibold'>No Products Found</div>}
      <ProductCard products={data}  />
      </div>
    </div>
  )
}

export default Shop