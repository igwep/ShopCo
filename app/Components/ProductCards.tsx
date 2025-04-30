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
  }

interface ProductCardsProps {
  products: Product[];
}

const ProductCards: React.FC<ProductCardsProps> = ({ products }) => {
  return (
    <div className="flex gap-4 flex-wrap">
      {products.map((product) => (
        <div
          key={product.id}
          className="max-w-[200px] rounded-xl overflow-hidden shadow-md bg-white p-4 text-center"
        >
          <div className="w-full h-40 relative mb-3">
            <Image
              src={product.category.image || "/placeholder.png"}
              alt={product.title}
              fill
              sizes="(max-width: 200px) 100vw"
              className="object-cover rounded-md"
            />
          </div>
          <h3 className="text-sm font-medium mb-1">{product.title}</h3>
          <div className="flex items-center justify-center text-yellow-500 mb-1">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <span key={i}>★</span>
              ))}
            <span className="text-gray-400 ml-1">4.6/5</span>
          </div>
          <p className="text-lg font-semibold text-black">${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductCards;
