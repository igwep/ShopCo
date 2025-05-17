
"use client";
import useFetchProductsFromFireStore from '@/app/hooks/FetchProductFIreStore';
import Spinner from '@/app/Components/Spinner';
import { useFragranceProducts } from '@/app/hooks/CategoryHook';
import ShopSection from '@/app/Components/shopSectionPage';

const FragranceSection = () => {
    const {  loading, error } = useFetchProductsFromFireStore();
    const FragranceProducts = useFragranceProducts()
    if (error) return <div>Error: {error}</div>;
    if (loading) return <div className='h-screen  flex justify-center items-center'><Spinner /></div>;
 
  return (
    <ShopSection Products={FragranceProducts} />
  )
}


export default FragranceSection;