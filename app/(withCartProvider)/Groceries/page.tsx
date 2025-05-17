"use client";
import useFetchProductsFromFireStore from '@/app/hooks/FetchProductFIreStore';
import Spinner from '@/app/Components/Spinner';
import { useGroceriesProducts } from '@/app/hooks/CategoryHook';
import ShopSection from '@/app/Components/shopSectionPage';

const GroceriesSection = () => {
    const { loading, error } = useFetchProductsFromFireStore();
    const groceryProducts = useGroceriesProducts();

    if (loading) return <div className='h-screen  flex justify-center items-center'><Spinner /></div>;
    if (error) return <div>Error: {error}</div>;
   
  return (
<ShopSection Products={groceryProducts} />

  )
}

export default GroceriesSection