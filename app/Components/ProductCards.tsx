"use client";
import { useState } from "react";
import Image from "next/image";
import { Product } from "../types/Product";

interface ProductCardsProps {
  products: Product[];
}

const formatPrices = (price: number, discountPercentage?: number) => {
  const discount = discountPercentage || 0;
  const discountedPrice = discount > 0
    ? +(price - (price * discount) / 100).toFixed(2)
    : price;

  return {
    originalPrice: price.toFixed(2),
    discountedPrice: discountedPrice.toFixed(2),
    discount,
    isDiscounted: discount > 0,
  };
};

const getStarRating = (rating = 0) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  return { fullStars, hasHalfStar };
};

const ProductCard: React.FC<ProductCardsProps> = ({ products }) => {
  const [cartQuantities, setCartQuantities] = useState<{ [id: string]: number }>({});

  const handleAddToCart = (id: string) => {
    setCartQuantities((prev) => ({ ...prev, [id]: 1 }));
  };

  const handleIncrement = (id: string) => {
    setCartQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleDecrement = (id: string) => {
    setCartQuantities((prev) => {
      const currentQty = prev[id] || 0;
      if (currentQty <= 1) {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }
      return { ...prev, [id]: currentQty - 1 };
    });
  };

  return (
    <>
      {products.map((product) => {
        const { discountedPrice, originalPrice, discount, isDiscounted } = formatPrices(product.price, product.discountPercentage);
        const { fullStars, hasHalfStar } = getStarRating(product.rating);
        const quantity = cartQuantities[product.id] || 0;

        return (
          <div
            key={product.id}
            className="min-w-[300px] max-w-[300px] rounded-xl text-center flex-shrink-0"
          >
            <div className="relative w-full h-[200px] md:h-[298px] bg-[#F0EEED] mb-3 rounded-xl">
              <Image
                src={product.thumbnail || "/placeholder.png"}
                alt={product.title}
                fill
                className="object-cover p-4 rounded-md"
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw"
              />
            </div>
            <h3 className="text-start font-bold mb-1 h-10 line-clamp-2">
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
                  <span className="text-xs p-1 rounded-full text-[#FF3333] bg-[#f3d4d4] font-medium">-{discount}%</span>
                </div>
              ) : (
                <span className="text-lg font-semibold text-black">${originalPrice}</span>
              )}

              {quantity > 0 ? (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDecrement(product.id)}
                    className="bg-black text-white px-3 py-1 rounded-full hover:bg-gray-800 transition duration-300"
                  >
                    −
                  </button>
                  <span className="px-2 text-sm font-medium">{quantity}</span>
                  <button
                    onClick={() => handleIncrement(product.id)}
                    className="bg-black text-white px-3 py-1 rounded-full hover:bg-gray-800 transition duration-300"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 text-nowrap transition duration-300"
                >
                  Add to cart
                </button>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductCard;
