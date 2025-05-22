'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import useFetchProductsFromFireStore from '@/app/hooks/FetchProductFIreStore';
import ProductCard from '@/app/Components/ProductCards';
import { Product } from '@/app/types/Product';
import Breadcrumb from '@/app/Components/Breadcrumb';
import Spinner from '@/app/Components/Spinner';
import Filter from '@/app/Components/Filter';

const PRODUCTS_PER_PAGE = 6;

const Shop = () => {
  const { data, loading, error } = useFetchProductsFromFireStore();

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [hasAppliedFilters, setHasAppliedFilters] = useState(false);
  const [isFilterOpen, setisFilterOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(''); // State to manage sorting

  const allCategories = useMemo(
    () => Array.from(new Set(data.map((product: Product) => product.category))),
    [data]
  );

  const handleApplyFilters = ({
    categories,
    priceRange,
  }: {
    categories: string[];
    priceRange: { min: number; max: number };
  }) => {
    const filtered = data.filter((product: Product) => {
      const matchesCategory =
        categories.length === 0 || categories.includes(product.category);
      const matchesPrice =
        product.price >= priceRange.min && product.price <= priceRange.max;
      return matchesCategory && matchesPrice;
    });

    setFilteredProducts(filtered);
    setHasAppliedFilters(true);
    setCurrentPage(1); // Reset to page 1 when filters are applied
  };

  const productsToDisplay: Product[] = hasAppliedFilters ? filteredProducts : data;

  const sortedProducts = [...productsToDisplay].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'name-asc') return a.title.localeCompare(b.title);
    if (sortBy === 'name-desc') return b.title.localeCompare(a.title);
    return 0;
  });

  const totalPages = Math.ceil(productsToDisplay.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  if (loading) return <div className='h-screen  flex justify-center items-center'><Spinner /></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full h-auto md:pt-28 pt-20 pb-28 md:px-34 3xl:px-64 px-4 md:space-y-8">
      
<Breadcrumb />
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar filter */}
        <div className="w-full lg:w-1/4 ">
          <Filter options={allCategories} onApplyFilters={handleApplyFilters}  isFilterOpen={isFilterOpen} setIsFilterOpen={setisFilterOpen} />
        </div>

        {/* Product Grid + Sorting + Pagination */}
        <div className="w-full lg:w-3/4">
          {/* Sort Dropdown */}
          <div className="flex w-full items-center justify-between tablet:justify-end mb-2 px-2">
            <div  onClick={()=>setisFilterOpen(true)} 
              className='cursor-pointer tablet:hidden flex'
              >
              <Image src="/SVG/filterIcon.svg" alt="filter" 
            width={30}
            height={25}            
            />
            </div>
           <div className='text-xs'>
             <span>sort by</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="  font-semibold "
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A-Z</option>
              <option value="name-desc">Name: Z-A</option>
            </select>
           </div>
           
          </div>
          

          {/* Product Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-4 place-items-center  w-full ">
            {paginatedProducts.length === 0 ? (
              <div className="text-center text-xl font-semibold col-span-full">
                No Products Found
              </div>
            ) : (
              <ProductCard products={paginatedProducts} styled={true} />
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
  {totalPages <= 3 ? (
    // Show all pages if totalPages is 3 or less
    Array.from({ length: totalPages }, (_, index) => (
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
    ))
  ) : (
    <>
      {/* Show first three pages */}
      {[1, 2].map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-4 py-2 rounded ${
            currentPage === page
              ? 'bg-black text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Ellipsis */}
      <span className="px-2 py-2">...</span>

      {/* Last page button */}
      <button
        onClick={() => setCurrentPage(totalPages)}
        className={`px-4 py-2 rounded ${
          currentPage === totalPages
            ? 'bg-black text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        {totalPages}
      </button>
    </>
  )}
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
    </div>
  );
};

export default Shop;
