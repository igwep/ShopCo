"use client";

import useFetchProductsFromFireStore from '@/app/hooks/FetchProductFIreStore';
import Spinner from '@/app/Components/Spinner';
import { useFurnitureProducts } from '@/app/hooks/CategoryHook';
import ShopSection from '@/app/Components/shopSectionPage';

const FurnitureSection = () => {
    const {  loading, error } = useFetchProductsFromFireStore();
    const furnitureProducts = useFurnitureProducts()
    if (error) return <div>Error: {error}</div>;
  if (loading) return <div className='h-screen  flex justify-center items-center'><Spinner /></div>;
  
  return (
   
<ShopSection Products={furnitureProducts} />
  )
}


export default FurnitureSection;