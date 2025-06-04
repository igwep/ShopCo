"use client";
//import React, { useEffect } from "react";
//import { useState } from "react";
import Image from "next/image";
import { Product } from "../types/Product";
import { useCart } from "../Context/cartquantityContext";
import { formatPrices, getStarRating  } from "../utils/Format"
import Link from "next/link";

interface ProductCardsProps {
  products: Product[];
  styled?:boolean
}

const ProductCard: React.FC<ProductCardsProps> = ({ products, styled }) => {
    const { addItem } = useCart();
    const { items, setItems } = useCart();
    const cartQuantities = items.reduce((acc: { [key: string]: number }, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {});


  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price * (1 - (product.discountPercentage ?? 0) / 100),
      images: product.images,
      category: product.category,
      shippingInformation: product.shippingInformation,
      description: product.description,
      discountPercentage: product.discountPercentage,
      quantity: 1,
      rating: product.rating,
    });

  }


 const handleIncrement = (id: string) => {
  setItems(prevItems =>
    prevItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
  );
};

const handleDecrement = (id: string) => {
  setItems(prevItems => {
    const itemToUpdate = prevItems.find(item => item.id === id);
    if (!itemToUpdate) return prevItems;

    if (itemToUpdate.quantity > 1) {
      return prevItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      );
    } else {
      return prevItems.filter(item => item.id !== id);
    }
  });
};

  return (
    <>
      {products.map((product) => {
        const { discountedPrice, originalPrice, discount, isDiscounted } = formatPrices(product.price, product.discountPercentage);
        const { fullStars, hasHalfStar } = getStarRating(product.rating);
        const quantity = cartQuantities[product.id] || 0;
        const slug = product.title.toLowerCase().replace(/\s+/g, '-');

        return (
          <Link href={`/Shop/${product.category}/${slug}`}
  key={product.id}
  className={`${
    styled
      ? 'w-full md:w-[48%] lg:w-[100%]' // 3 cards per row on large screens
      : 'w-full max-w-[300px]'
  } rounded-xl text-center mb-4 mx-1.5 relative group hover:shadow-lg transition-all duration-300`}
>
  <div className="relative w-full h-[200px] md:h-[298px] bg-[#F0EEED] mb-3 rounded-xl overflow-hidden">
    {isDiscounted && (
      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded z-10">
        Save {discount}%
      </div>
    )}
    <Image
      src={product.thumbnail || "/placeholder.png"}
      alt={product.title}
      fill
      className="object-cover p-4 rounded-md"
      sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw"
    />
  </div>
  <h3 className="text-start font-bold mb-1 h-14 line-clamp-2">
    {product.title}
  </h3>
  <div className="flex items-center justify-start text-yellow-500 mb-1">
    {[...Array(fullStars)].map((_, i) => <span key={i}>★</span>)}
    {hasHalfStar && <span>☆</span>}
    <span className="text-gray-400 ml-1">{(product.rating || 0).toFixed(1)}/5</span>
  </div>
  <div className="text-start mb-1 flex flex-col gap-1">
    {isDiscounted ? (
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold text-black">${discountedPrice}</span>
        <span className="line-through text-gray-500">${originalPrice}</span>
      </div>
    ) : (
      <span className="text-lg font-semibold text-black">${originalPrice}</span>
    )}

    {quantity > 0 ? (
      <div className="flex items-center space-x-2">
        <button
          onClick={(e) => {   e.preventDefault();  handleDecrement(product.id)}}
          className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition duration-300"
        >
          −
        </button>
        <span className="px-2 text-sm font-medium">{quantity}</span>
        <button
          onClick={(e) => {  e.preventDefault();  handleIncrement(product.id)}}
          className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition duration-300"
        >
          +
        </button>
      </div>
    ) : (
      <button
        onClick={(e) =>{  e.preventDefault();  handleAddToCart(product)}}
        className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 text-nowrap transition duration-300"
      >
        Add to cart
      </button>
    )}
  </div>
</Link>

        );
      })}
    </>
  );
};

export default ProductCard;
