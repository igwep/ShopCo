import Image from "next/image";

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: {
    id: number;
    name: string;
    image: string;
    slug: string;
  };
  slug: string;
  createdAt: string;
  updatedAt: string;
  availabilityStatus?: string;
  brand?: string;
  dimensions?: {
    depth: number;
    height: number;
    width: number;
  };
  discountPercentage?: number;
  rating?: number;
  returnPolicy?: string;
  reviews?: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  shippingInformation?: string;
  sku?: string;
  stock?: number;
  tags?: string[];
  thumbnail?: string;
  warrantyInformation?: string;
  weight?: number;
}

interface ProductCardsProps {
  products: Product[];
}

const ProductCards: React.FC<ProductCardsProps> = ({ products }) => {
  return (
    <div className="flex justify-center w-full scrollbar-none overflow-x-auto md:overflow-visible">
      <div className="flex gap-4 flex-nowrap">
        {products.map((product) => {
          const fullStars = Math.floor(product.rating || 0);
          const hasHalfStar = (product.rating || 0) % 1 >= 0.5;

          return (
            <div key={product.id} className="w-[295px] rounded-xl text-center">
              <div className="relative md:w-[295px] w-full md:h-[298px] h-[200px] bg-[#F0EEED] mb-3 rounded-xl">
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
                <span className="text-gray-400 ml-1">{(product.rating || 0).toFixed(1)}/5</span>
              </div>
              <p className="text-lg text-start font-semibold text-black">${product.price}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductCards;
