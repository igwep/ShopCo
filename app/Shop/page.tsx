'use client';

import React, { useState, useMemo } from 'react';
import useFetchProductsFromFireStore from '../hooks/FetchProductFIreStore';
import ProductCard from '../Components/ProductCards';
import Breadcrumb from '../Components/Breadcrumb';
import Filter from '../Components/Filter';
import { Product } from '../types/Product';

const Shop = () => {
  const { data, loading, error } = useFetchProductsFromFireStore();

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const allCategories = useMemo(
    () => Array.from(new Set(data.map((product: Product) => product.category))),
    [data]
  );

  const handleApplyFilters = ({

    categories,
  }: {
    categories: string[];
  }) => {
    const filtered = data.filter((product: Product) => {
      

      const matchesCategory =
        categories.length === 0 || categories.includes(product.category);

      return   matchesCategory;
    });

    setFilteredProducts(filtered);
  };

  const productsToDisplay: Product[] = filteredProducts.length === 0 ? data : filteredProducts;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full h-auto pt-12 pb-28 md:px-34 3xl:px-64 px-4 space-y-8">
      <Breadcrumb />
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar filter */}
        <div className="w-full lg:w-1/4">
          <Filter options={allCategories} onApplyFilters={handleApplyFilters} />
        </div>

        {/* Product Grid */}
        <div className="w-full lg:w-3/4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {productsToDisplay.length === 0 ? (
              <div className="text-center text-xl font-semibold col-span-full">
                No Products Found
              </div>
            ) : (
              <ProductCard products={productsToDisplay} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
