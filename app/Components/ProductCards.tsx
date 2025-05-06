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
  return (
    <>
      {products.map((product) => {
        const { discountedPrice, originalPrice, discount, isDiscounted } = formatPrices(product.price, product.discountPercentage);
        const { fullStars, hasHalfStar } = getStarRating(product.rating);

        return (
          <div
            key={product.id}
            className="min-w-[295px] max-w-[295px] rounded-xl text-center flex-shrink-0"
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
            <div className="text-start mb-1">
              {isDiscounted ? (
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-black">${discountedPrice}</span>
                  <span className="line-through text-gray-500">${originalPrice}</span>
                  <span className="text-xs p-1 rounded-full text-[#FF3333] bg-[#f3d4d4] font-medium">-{discount}%</span>
                </div>
              ) : (
                <span className="text-lg font-semibold text-black">${originalPrice}</span>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductCard;
