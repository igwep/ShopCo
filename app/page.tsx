 import NavBar from "./Components/Navbar/NavBar";
import HeroSection from "./Components/home/hero/Hero";
import IconCarousel from "./Components/IconCarousel";
import { NewArrivals } from "./Components/home/ShopPreview/NewArrivals";

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
<NavBar />
<HeroSection />
<IconCarousel icons={icons}   />
<NewArrivals />

 </div>
  );
}
