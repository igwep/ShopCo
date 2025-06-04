"use client";

import { useState } from 'react'; 
import { useParams } from 'next/navigation'; 
import { useProduct } from '@/app/hooks/Product';
import useFetchProductsFromFireStore from '@/app/hooks/FetchProductFIreStore';
import { useCart } from '@/app/Context/cartquantityContext';
import Image from 'next/image';
import Spinner from '@/app/Components/Spinner';
import { Product } from '@/app/types/Product';
import ProductCard from '../ProductCards';
import ViewAllBtn from '../buttons/ViewAllBtn';
import Breadcrumb from '../Breadcrumb';


/* type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
}; */

/* type SingleProduct = {
  id: string;
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
  reviews?: Review[];
}; */

const ProductSection = () => {
  const { slug } = useParams() as { slug: string };
  const { category } = useParams() as { category: string };
  const { data  } = useFetchProductsFromFireStore();
  const {/*  items, */ setItems, addItem } = useCart();

  const handleIncrement = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id: string) => {
    setItems((prevItems) => {
      const itemToUpdate = prevItems.find((item) => item.id === id);
      if (!itemToUpdate) return prevItems;

      if (itemToUpdate.quantity > 1) {
        return prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevItems.filter((item) => item.id !== id);
      }
    });
  };
  
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

  const { product, loading, error } = useProduct(slug) as {
    product: Product | null;
    loading: boolean;
    error: string | null;
  };
    const similarProducts = product
      ? data?.filter((SimilarProduct: Product) => SimilarProduct.id !== product.id && SimilarProduct.category === category)
      : [];

      const threeSimilarProducts = similarProducts.slice(0, 3);

 //  const { addItem } = useCart();
    const { items, /* setItems */ } = useCart();
    const cartQuantities = items.reduce((acc: { [key: string]: number }, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {});
      const quantity = product ? cartQuantities[product.id] || 0 : 0;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("Medium");
  const [selectedTab, setSelectedTab] = useState<"info" | "reviews">("info");

  if (loading) 
    return <div className="h-screen flex justify-center items-center"><Spinner /></div>;
  if (error || !product) 
    return <div className="p-10 text-red-500">{error || "Product not found"}</div>;

  return (
    <div className="max-w-7xl mx-auto my-28 px-4 md:px-10">
      <Breadcrumb />
      {/* Top grid */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Image gallery */}
        <div className="md:w-1/2 flex flex-row-reverse gap-4">
          <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.images[selectedImageIndex]}
              alt={product.title}
              width={600}
              height={600}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImageIndex(i)}
                className={`w-20 h-20 rounded-md border-2 overflow-hidden ${
                  selectedImageIndex === i ? "border-black" : "border-gray-300"
                }`}
              >
                <Image src={img} alt={`thumb-${i}`} width={80} height={80} className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Main info */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-3xl md:text-4xl font-black uppercase">{product.title}</h1>

          <div className="flex items-center gap-4 text-lg font-semibold">
            <span>${product.price}</span>
            {product.discountPercentage && (
              <>
                <span className="line-through text-gray-400">
                  ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                </span>
                <span className="text-red-600">-{product.discountPercentage}%</span>
              </>
            )}
          </div>

          {product.rating && (
            <div className="flex items-center gap-1 text-yellow-500">
              <span>★</span>
              <span className="text-black">{product.rating.toFixed(1)} / 5</span>
            </div>
          )}

          <p className="text-gray-700">{product.description}</p>

          {/* Size selector */}
          {/* <div className="space-y-2">
            <p className="font-medium">Choose Size:</p>
            <div className="flex gap-3">
              {["Small","Medium","Large","X-Large"].map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`px-4 py-2 rounded-full border ${
                    selectedSize === sz ? "bg-black text-white" : "bg-white text-black"
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div> */}

          {/* Add to Cart */}
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
     onClick={()=> handleAddToCart(product)}
     className="bg-black text-white w-full py-4 rounded-full font-semibold hover:opacity-90 transition">
            Add to Cart
          </button>
    )}
          {/* <button className="bg-black text-white w-full py-4 rounded-full font-semibold hover:opacity-90 transition">
            Add to Cart
          </button> */}
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12 border-b">
        <div className="flex space-x-8">
          <button
            onClick={() => setSelectedTab("info")}
            className={`pb-2 font-semibold ${
              selectedTab === "info" ? "border-b-2 border-black" : "text-gray-500"
            }`}
          >
            Product Details
          </button>
          <button
            onClick={() => setSelectedTab("reviews")}
            className={`pb-2 font-semibold ${
              selectedTab === "reviews" ? "border-b-2 border-black" : "text-gray-500"
            }`}
          >
            Rating & Reviews
          </button>
        </div>
      </div>

      {/* Tab content */}
      <div className="mt-8">
        {selectedTab === "info" ? (
          <div className="space-y-2 text-gray-700">
            {product.brand && <p><strong>Brand:</strong> {product.brand}</p>}
            {product.stock !== undefined && <p><strong>Stock:</strong> {product.stock}</p>}
            {product.sku && <p><strong>SKU:</strong> {product.sku}</p>}
            {product.shippingInformation && (
              <p><strong>Shipping:</strong> {product.shippingInformation}</p>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((rev, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-gray-300 shadow-md space-y-3">
  <div className="flex items-center justify-between mb-1">
    <div className="flex items-center flex-col-reverse gap-2 font-semibold text-lg">
      <span className='flex items-center gap-4'>{rev.reviewerName} <span> <Image src="/SVG/check.svg" alt="verified" width={20} height={20} /></span></span>
      <div className="flex">
      {[...Array(5)].map((_, j) => (
        <span
          key={j}
          className={`text-xl ${
            j < rev.rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </div>
      {/* Optional: verified badge */}
      {/* <Image src="/SVG/check.svg" alt="verified" width={20} height={20} /> */}
    </div>
    
  </div>

  <p className="text-gray-700 italic">&quot;{rev.comment}&quot;</p>
  <p className="text-sm text-gray-400">{rev.date}</p>
</div>

              ))
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>
        )}
      </div>
      {/* similar product section */}
      <div className="mt-12">
        <h1 className="text-5xl font-black mb-4 text-center uppercase">Similar Products</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-2 place-items-center my-4  w-full md:px-34 3xl:px-64 px-4">
          <ProductCard products={threeSimilarProducts} />
          

      </div>
      <div className='flex justify-center'>
        <ViewAllBtn to={`/Shop/${category}`} />
      </div>
    </div>
    </div>
  );
};

export default ProductSection;
