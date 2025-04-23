'use client';

import CountUp from 'react-countup';
import { useEffect, useState } from 'react';

const StatsCounter = () => {
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    setStartCount(true);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full md:w-auto md:px-0 px-8 py-8 ">
      {/* 1st Stat */}
      <div className="border-r border-[#c2bfc0]">
        <h2 className="md:text-5xl text-3xl font-semibold">
          {startCount && <CountUp end={200} duration={2} />}+
        </h2>
        <p className="text-gray-600">International Brands</p>
      </div>

      {/* 2nd Stat */}
      <div className="md:border-r md:border-[#c2bfc0] md:pl-0 pl-4">
        <h2 className="md:text-5xl text-3xl font-semibold">
          {startCount && <CountUp end={2000} duration={2.5} />}+
        </h2>
        <p className="text-gray-600 text-nowrap">High-Quality Products</p>
      </div>

      {/* 3rd Stat */}
      <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-start">
        <h2 className="md:text-5xl text-3xl font-semibold">
          {startCount && <CountUp end={30000} duration={3} />}+
        </h2>
        <p className="text-gray-600">Happy Customers</p>
      </div>
    </div>
  );
};

export default StatsCounter;
