
"use client";
import useFetchProductsFromFireStore from '@/app/hooks/FetchProductFIreStore';
import Spinner from '@/app/Components/Spinner';
//import { useFragranceProducts } from '@/app/hooks/CategoryHook';
import ShopSection from '@/app/Components/shopSectionPage';
import { useParams } from 'next/navigation';
import { Product } from '@/app/types/Product';

const CategoryPage = () => {
    const { category } = useParams();  
    const {data , loading, error } = useFetchProductsFromFireStore();
     const Products = data?.filter(
        (product: Product) => product.category === category
      ) || [];
    if (error) return <div>Error: {error}</div>;
    if (loading) return <div className='h-screen  flex justify-center items-center'><Spinner /></div>;
 
  return (
    <ShopSection Products={Products} />
  )
}


export default CategoryPage;