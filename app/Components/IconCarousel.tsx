"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface IconCarouselProps {
  icons: { src: string; alt: string }[];
  speed?: number;      // in seconds, lower = faster
  size?: number;       // icon size in pixels
 
}

const IconCarousel: React.FC<IconCarouselProps> = ({
  icons,
  speed = 10,
  size = 168,
 
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="relative w-full h-[122px] overflow-hidden bg-black">
      {icons.map((icon, i) => (
        <div
          key={i}
          className="absolute left-full top-[145px] transform -translate-y-1/2 animate-moveIcon"
          style={{
            // start each icon (size + gap) * index px to the right
         
            animationDelay: `${(i * speed) / icons.length}s`,
            animationDuration: `${speed}s`,
          }}
        >
          <div
            className="flex items-center justify-center"
            style={{ width: size, height: size }}
          >
            <Image
              src={icon.src}
              alt={icon.alt}
              width={size}
              height={size}
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default IconCarousel;
