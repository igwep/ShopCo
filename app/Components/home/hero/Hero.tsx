import Image from "next/image";
import StatsCounter from "./StatsCounter";

const HeroSection = () => {
  return (
    <section className="bg-[#F2F0F1] mt-20 relative md:h-[100vh] h-auto min-h-[100vh] flex flex-col md:flex-row justify-between items-center overflow-hidden md:py-16  md:px-34 3xl:px-64">
      <div className="md:max-w-7xl w-full flex flex-col md:flex-row h-full ">
        {/* Text Content */}
        <div className="md:w-1/2 z-30 md:mt-4 3xl:mt-12 3xl:space-y-9 order-1 md:order-none md:py-0 pt-4 px-4 md:px-0 3xl:px-0">
          <h1 className="text-4xl md:text-6xl max-w-[35rem] font-montserrat font-black text-black mb-6">
          Lifestyle. Comfort. Convenience
          </h1>
          <p className="text-lg text-gray-600 font-montserrat mb-10">
          Embrace a lifestyle of comfort and convenience with every product, designed to enhance your daily living.
          </p>
          <a href="/Shop" className="bg-black  text-white w-full md:w-auto font-semibold py-4 px-16 rounded-full transition duration-300 hover:opacity-90">
            Shop Now
          </a>
          <StatsCounter />
        </div>
        {/* Image Container */}
        <div className=" relative  w-full h-full md:h-auto order-2 md:order-none  3xl:-bottom-[40%] md:absolute bottom-[80%] md:-bottom-[50%] md:right-32 md:w-[50%]">
          <div className="relative w-full h-full md:h-[120%]">
            <Image
              src="/images/HERO.svg"
              alt="Fashion showcase"
              width={900}
              height={900}
              className="md:object-contain object-none h-full w-full md:object-right"
              priority
            />
            {/* Stars */}
            <div className="absolute left-4 md:left-10 top-[30%] transform -translate-y-1/2">
              <Image
                src="/SVG/star.svg"
                alt="Star"
                width={40}
                height={40}
                className="w-8 h-8 md:w-12 md:h-12"
              />
            </div>
            <div className="absolute right-2 md:right-16 top-[20%] transform -translate-y-1/2">
              <Image
                src="/SVG/star.svg"
                alt="Star"
                width={80}
                height={80}
                className="w-12 h-12 md:w-18 md:h-18"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

