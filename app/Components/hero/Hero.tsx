// components/HeroSection.tsx
import Image from "next/image";
import StatsCounter from "./StatsCounter";

const HeroSection = () => {
  return (
    <section className="bg-[#F2F0F1] relative h-auto md:h-[90vh] 3xl:h-[80vh]  flex flex-col md:flex-row justify-between items-center md:overflow-hidden py-16 px-8 md:px-34 3xl:px-64">
      <div className="md:max-w-7xl w-full  flex flex-col md:flex-row h-full">
        {/* Text Content */}
        <div className="md:w-1/2 z-30 md:mt-4 ">
          <h1 className="text-4xl md:text-6xl max-w-[35rem] font-monsterrat font-black text-black mb-6">
          FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className="text-lg text-gray-600 font-monsterrat mb-6 ">
            Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style
          </p>
          <button className="bg-black text-white w-full md:w-auto font-semibold py-4 px-16 rounded-full transition duration-300">
            Shop Now
          </button>
<StatsCounter />
        </div>
      </div>

      {/* Image at the bottom right */}
      <div className="absolute md:-bottom-[80%] -bottom-[50%] md:right-34 z-20   h-[60%]  md:h-[200%]">
        <Image
          src="/images/HERO.svg"
          alt="Delivery truck"
          width={700}
          height={600}
          className="object-contain"
          priority
        />

        {/* Star on the left of the image */}
        <div className="absolute left-10 top-[33%] transform -translate-y-1/2">
          <Image
            src="/SVG/star.svg"
            alt="Star"
            width={50}
            height={50}
            className="object-contain"
          />
        </div>

        {/* Star on the right of the image */}
        <div className="absolute right-3 top-[25%] transform -translate-y-1/2">
          <Image
            src="/SVG/star.svg"
            alt="Star"
            width={90}
            height={50}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
