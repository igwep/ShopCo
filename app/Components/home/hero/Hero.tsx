import Image from "next/image";
import StatsCounter from "./StatsCounter";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="bg-[#F2F0F1] w-full min-h-screen md:py-16 md:px-32 3xl:px-64 flex items-center">
      <div className="flex flex-col md:flex-row justify-between items-center w-full h-full">
        {/* Text Content */}
        <div className="w-full md:w-1/2 px-4 md:px-0 space-y-6 md:space-y-8 mt-20">
          <h1 className="text-4xl md:text-6xl max-w-[35rem] font-montserrat font-black text-black">
            Lifestyle. Comfort. Convenience
          </h1>
          <p className="text-lg text-gray-600 font-montserrat">
            Embrace a lifestyle of comfort and convenience with every product, designed to enhance your daily living.
          </p>
          <Link
            href="/Shop"
            className="bg-black w-full md:w-auto text-center inline-block text-white font-semibold py-4 px-16 rounded-full transition duration-300 hover:opacity-90"
          >
            Shop Now
          </Link>
          <StatsCounter />
        </div>

        {/* Image Content */}
        <div className="w-full md:w-1/2 mt-12 md:mt-0 relative">
          <div className="relative w-full h-[250px] md:h-[350px] lg:h-[450px]">
            <Image
              src="/images/carryout-bag-156777.svg"
              alt="Fashion showcase"
              fill
              className="object-contain"
              priority
            />

            {/* Stars */}
            <Image
              src="/SVG/star.svg"
              alt="Star"
              width={40}
              height={40}
              className="absolute left-4 md:left-12 top-[30%] transform -translate-y-1/2 w-8 h-8 md:w-12 md:h-12"
            />
            <Image
              src="/SVG/star.svg"
              alt="Star"
              width={80}
              height={80}
              className="absolute right-2 md:right-4 top-[20%] transform -translate-y-1/2 w-12 h-12 md:w-20 md:h-20"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
