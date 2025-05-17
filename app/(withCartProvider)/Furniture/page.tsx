"use client";

import useFetchProductsFromFireStore from '@/app/hooks/FetchProductFIreStore';
import Spinner from '@/app/Components/Spinner';
import ShopSection from '@/app/Components/shopSectionPage';
import { useFurnitureProducts } from '@/app/hooks/CategoryHook';


const FurnitureSection = () => {
    const {  loading, error } = useFetchProductsFromFireStore();
    const FurnitureProducts = useFurnitureProducts()
  
    if (error) return <div>Error: {error}</div>;
  if (loading) return <div className='h-screen  flex justify-center items-center'><Spinner /></div>;

  return (
    <ShopSection Products={FurnitureProducts} />
  )
}


export default FurnitureSection;