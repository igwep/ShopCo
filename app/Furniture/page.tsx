"use client";

import { useState } from 'react';
import Image from 'next/image';
import useFetchProductsFromFireStore from '../hooks/FetchProductFIreStore'
import ProductCard from '../Components/ProductCards';
import { Product } from '../types/Product';
import Breadcrumb from '../Components/Breadcrumb';
import Spinner from '../Components/Spinner';


const PRODUCTS_PER_PAGE = 6;

const FurnitureSection = () => {
    const { data, loading, error } = useFetchProductsFromFireStore();
    const [sortBy, setSortBy] = useState(''); // State to manage sorting
     const [currentPage, setCurrentPage] = useState(1);
    
    if (error) return <div>Error: {error}</div>;

    const FurnitureProducts = data.filter((product: Product) => product.category === "furniture");
   // console.log(groceryProducts, "FragranceProducts")
 

  const sortedProducts = [...FurnitureProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'name-asc') return a.title.localeCompare(b.title);
    if (sortBy === 'name-desc') return b.title.localeCompare(a.title);
    return 0;
  });

  const totalPages = Math.ceil(FurnitureProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );
  if (loading) return <div className='h-screen  flex justify-center items-center'><Spinner /></div>;
  return (
    <div className='w-full h-auto flex justify-center space-y-12 pt-12 pb-28 md:px-34 3xl:px-64 px-4 '>
     
       
        {/* Product Grid + Sorting + Pagination */}
        <div className="w-full lg:w-3/4">
          {/* Sort Dropdown */}
          <div className="flex w-full items-center justify-between ">
             <Breadcrumb />

           <div> <span>sort by</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="  font-semibold "
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A-Z</option>
              <option value="name-desc">Name: Z-A</option>
            </select></div>
          </div>

          {/* Product Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {paginatedProducts.length === 0 ? (
              <div className="text-center text-xl font-semibold col-span-full">
                No Products Found
              </div>
            ) : (
              <ProductCard products={paginatedProducts} />
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between w-full mt-8 space-x-2">
              {/* Prev Button */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 flex items-center gap-2 rounded ${
                  currentPage === 1
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Image
                  src="/SVG/previous.svg"
                  alt="Arrow Left"
                  width={20}
                  height={20}
                  className="w-4 h-4 ml-2"
                />
                <span>Prev</span>
              </button>

              {/* Page Numbers */}
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-4 py-2 rounded ${
                      currentPage === index + 1
                        ? 'bg-black text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 flex items-center gap-2 rounded ${
                  currentPage === totalPages
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <span>Next</span>
                <Image
                  src="/SVG/forward.svg"
                  alt="Arrow Right"
                  width={20}
                  height={20}
                  className="w-4 h-4 ml-2"
                />
              </button>
            </div>
          )}
        </div>

    </div>
  )
}


export default FurnitureSection;