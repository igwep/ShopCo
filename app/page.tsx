 import NavBar from "./Components/Navbar/NavBar";
import HeroSection from "./Components/home/hero/Hero";
import IconCarousel from "./Components/IconCarousel";

const icons = [
  { src: "/SVG/kelvin.svg", alt: "Calvin" },
  { src: "/SVG/gucci.svg", alt: "gucci" },
  { src: "/SVG/zara.svg", alt: "zara" },
  { src: "/SVG/prada.svg", alt: "prada" },
];
//https://dummyjson.com/docs/products#products-category_list

export default function Home() {
  return (
 <div>
<NavBar />
<HeroSection />
<IconCarousel icons={icons}   />
<section className="h-[100dvh]">
  s
</section>

 </div>
  );
}
