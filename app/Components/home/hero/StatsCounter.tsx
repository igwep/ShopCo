'use client';

import CountUp from 'react-countup';
import { useEffect, useState } from 'react';

const StatsCounter = () => {
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    setStartCount(true);
  }, []);

  return (
    <div className="">
      <div className="grid grid-cols-2 md:grid-cols-3   gap-8 md:gap-4">
        {/* 1st Stat */}
        <div className="md:border-r md:border-[#c2bfc0] text-center  p-4  md:p-6">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-2">
            {startCount && <CountUp end={200} duration={2} />}+
          </h2>
          <p className="text-gray-600 text-sm md:text-base uppercase tracking-wide">
            International Brands
          </p>
        </div>

        {/* 2nd Stat */}
        <div className="md:border-r md:border-[#c2bfc0] text-center p-4 md:p-6">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-2">
            {startCount && <CountUp end={2000} duration={2.5} />}+
          </h2>
          <p className="text-gray-600 text-sm md:text-base uppercase tracking-wide">
            High-Quality Products
          </p>
        </div>

        {/* 3rd Stat - Centers on mobile and aligns left on desktop */}
        <div className="col-span-2 md:col-span-1 text-center md:text-left p-4 md:p-6">
          <div className="md:pl-4">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-2">
              {startCount && <CountUp end={30000} duration={3} />}+
            </h2>
            <p className="text-gray-600 text-sm md:text-base uppercase tracking-wide">
              Happy Customers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCounter;