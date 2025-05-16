import HeroSection from "../Components/home/hero/Hero";
import IconCarousel from "../Components/IconCarousel";
import { NewArrivals } from "../Components/home/ShopPreview/Previews";
import CategorySection from "../Components/home/CategorySection";
import ReviewCarousel from "../Components/home/Reviews";

const icons = [
  { src: "/SVG/kelvin.svg", alt: "Calvin" },
  { src: "/SVG/gucci.svg", alt: "gucci" },
  { src: "/SVG/zara.svg", alt: "zara" },
  { src: "/SVG/prada.svg", alt: "prada" },
];
//https://dummyjson.com/docs/products#products-category_list

export default function Home() {
  return (
 <div className="font-monsterrat">
<HeroSection />
<IconCarousel icons={icons}   />
<NewArrivals />
<CategorySection />
<ReviewCarousel />
 </div>
  );
}
