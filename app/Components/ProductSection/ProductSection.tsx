"use client";

import { useState } from 'react'; 
import { useParams } from 'next/navigation'; 
import { useProduct } from '@/app/hooks/Product';
import Image from 'next/image';
import Spinner from '@/app/Components/Spinner';

type Product = {
  images: string[];
  title: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  description: string;
  brand?: string;
  stock?: number;
  sku?: string;
  shippingInformation?: string;
};

const ProductSection = () => {
    const { slug } = useParams() as { slug: string };
    const { product, loading, error } = useProduct(slug) as { product: Product | null, loading: boolean, error: string | null };
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState("Medium");
  if (loading) return <div className='h-screen  flex justify-center items-center'><Spinner /></div>;
  if (error || !product) return <div className="p-10 text-red-500">{error || "Product not found"}</div>;

  return (
    <div>
       <div className="max-w-7xl my-20 mx-auto px-4 py-10 flex flex-col md:flex-row gap-10">
      {/* Image Gallery */}
      <div className="md:w-1/2 space-y-4 flex flex-row-reverse gap-2">
        <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
          <Image
            src={product.images[selectedImageIndex]}
            alt={product.title}
            width={500}
            height={500}
            className="object-contain"
          />
        </div>
        <div className="flex gap-3 flex-col">
          {product.images.map((img: string, index: number) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`w-20 h-20 rounded-md border-2 ${selectedImageIndex === index ? "border-black" : "border-gray-300"}`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                width={80}
                height={80}
                className="object-cover rounded-md"
              />
            </button>
          ))}
        </div>
      </div>
      {/* Product Info */}
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold">{product.title}</h1>
        <div className="flex items-center gap-4 text-lg font-semibold">
          <span>${product.price}</span>
          {product.discountPercentage && (
            <>
              <span className="line-through text-gray-400">${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}</span>
              <span className="text-red-600">-{product.discountPercentage}%</span>
            </>
          )}
        </div>
        {product.rating && (
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span>{product.rating.toFixed(1)} / 5</span>
          </div>
        )}

        <p className="text-gray-700">{product.description}</p>

        {/* Size Selector */}
        <div className="space-y-2">
          <p className="font-medium">Choose Size:</p>
          <div className="flex gap-3">
            {["Small", "Medium", "Large", "X-Large"].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-full border ${
                  selectedSize === size ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button className="bg-black text-white w-full py-4 rounded-full font-semibold hover:opacity-90 transition">
          Add to Cart
        </button>

        {/* Extra Info */}
        <div className="text-sm text-gray-600 space-y-1">
          {product.brand && <p><strong>Brand:</strong> {product.brand}</p>}
          {product.stock !== undefined && <p><strong>Stock:</strong> {product.stock}</p>}
          {product.sku && <p><strong>SKU:</strong> {product.sku}</p>}
          {product.shippingInformation && <p><strong>Shipping:</strong> {product.shippingInformation}</p>}
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProductSection;
