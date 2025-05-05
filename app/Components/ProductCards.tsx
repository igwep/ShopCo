 import Image from "next/image";
import { Product } from "../types/Product";


/* interface ProductCardsProps {
  products: Product[];
}

const ProductCard: React.FC<ProductCardsProps> = ({ products }) => {
  return (
    <>
      {products.map((product) => {
        const fullStars = Math.floor(product.rating || 0);
        const hasHalfStar = (product.rating || 0) % 1 >= 0.5;

        return (
          <div key={product.id} className="w-full rounded-xl text-center">
            <div className="relative w-full h-[200px] md:h-[298px] bg-[#F0EEED] mb-3 rounded-xl">
              <Image
                src={product.thumbnail || "/placeholder.png"}
                alt={product.title}
                fill
                className="object-cover p-4 rounded-md"
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw"
              />
            </div>
            <h3 className="text-start font-bold mb-1 h-12 line-clamp-2">{product.title}</h3>
            <div className="flex items-center justify-start text-yellow-500 mb-1">
              {[...Array(fullStars)].map((_, i) => <span key={i}>★</span>)}
              {hasHalfStar && <span>☆</span>}
              <span className="text-gray-400 ml-1">{(product.rating || 0).toFixed(1)}/5</span>
            </div>
            <p className="text-lg text-start font-semibold text-black">${product.price}</p>
          </div>
        );
      })}
    </>
  );
};
export default ProductCard; */

 interface ProductCardsProps {
  products: Product[];
}

const ProductCard: React.FC<ProductCardsProps> = ({ products }) => {
  return (
    <>
      {products.map((product) => {
        const fullStars = Math.floor(product.rating || 0);
        const hasHalfStar = (product.rating || 0) % 1 >= 0.5;
  
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
            <h3 className="text-start font-bold mb-1 h-12 line-clamp-2">{product.title}</h3>
            <div className="flex items-center justify-start text-yellow-500 mb-1">
              {[...Array(fullStars)].map((_, i) => (
                <span key={i}>★</span>
              ))}
              {hasHalfStar && <span>☆</span>}
              <span className="text-gray-400 ml-1">
                {(product.rating || 0).toFixed(1)}/5
              </span>
            </div>
            <p className="text-lg text-start font-semibold text-black">${product.price}</p>
          </div>
        );
      })}
    </>
  );
}

export default ProductCard;
