'use client';

import React, { useState, useMemo } from 'react';
import useFetchProductsFromFireStore from '../hooks/FetchProductFIreStore';
import ProductCard from '../Components/ProductCards';
import Breadcrumb from '../Components/Breadcrumb';
import Filter from '../Components/Filter';
import { Product } from '../types/Product';

const Shop = () => {
  const { data, loading, error } = useFetchProductsFromFireStore(); // Should return Product[]

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const allCategories = useMemo(
    () => Array.from(new Set(data.map((product: Product) => product.category))),
    [data]
  );

  const handleApplyFilters = ({
    search,
    categories,
  }: {
    search: string;
    categories: string[];
  }) => {
    const filtered = data.filter((product: Product) => {
      const matchesSearch = search
        ? product.title?.toLowerCase().includes(search.toLowerCase())
        : true;

      const matchesCategory =
        categories.length === 0 || categories.includes(product.category);

      return matchesSearch && matchesCategory;
    });

    setFilteredProducts(filtered);
  };

  const productsToDisplay: Product[] = filteredProducts.length === 0 ? data : filteredProducts;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full h-auto space-y-12 pt-12 pb-28 md:px-34 3xl:px-64 px-4">
      <Breadcrumb />
      <Filter options={allCategories} onApplyFilters={handleApplyFilters} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productsToDisplay.length === 0 ? (
          <div className="text-center text-xl font-semibold col-span-full">
            No Products Found
          </div>
        ) : (
          <ProductCard products={productsToDisplay} />
        )}
      </div>
    </div>
  );
};

export default Shop;
