'use client';

import { useState } from 'react';
import * as Slider from '@radix-ui/react-slider';
import Image from 'next/image';

type FilterProps = {
  options: string[];
  onApplyFilters: (filters: {
    categories: string[];
    priceRange: { min: number; max: number };
  }) => void;
};

const MIN = 0;
const MAX = 4000;

const Filter = ({ options, onApplyFilters }: FilterProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ 
    min: MIN, 
    max: MAX 
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const handleApply = () => {
    onApplyFilters({
      categories: selectedCategories,
      priceRange: {
        min: priceRange.min,
        max: priceRange.max
      },
    });
  };

  const handleSliderChange = (values: number[]) => {
    setPriceRange({
      min: values[0],
      max: values[1]
    });
  };

  return (
    <div className="flex flex-col items-center gap-4 border border-gray-200  rounded-xl py-4 w-full max-w-4xl mx-auto">
      <div className="flex p-3 border-b border-gray-200 items-center justify-between w-full ">
        <h1 className='text-xl font-semibold '>Filters</h1>
      </div>

      <div className=" py-2 rounded-md w-full px-2  h-auto">
        {options.map((category, index) => (
          <span 
            key={index} 
            onClick={() => handleCategoryChange(category)} 
            className={`hover:bg-gray-200 w-full ${
              selectedCategories.includes(category) ? 'bg-gray-200' : ''
            } flex rounded-lg justify-between p-2 cursor-pointer`}
          >
            <span>{category}</span>
            <Image
              src="/SVG/breadcrumbArrow.svg"
              alt="Checkbox"
              width={20}
              height={20}
              className="ml-2"
            />
          </span>
        ))}
      </div>
      <div className="w-full  border-t border-gray-200 p-3 pt-4">
        <h2 className="text-lg font-medium mb-4">Price</h2>
        <Slider.Root
          className="relative flex items-center select-none touch-none h-5 w-full"
          value={[priceRange.min, priceRange.max]}
          min={MIN}
          max={MAX}
          step={10}
          onValueChange={handleSliderChange}
        >
          <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
            <Slider.Range className="absolute bg-black rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb 
            className="block w-4 h-4 bg-black rounded-full shadow cursor-grab focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label="Minimum price"
          />
          <Slider.Thumb 
            className="block w-4 h-4 bg-black rounded-full shadow cursor-grab focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label="Maximum price"
          />
        </Slider.Root>

        <div className="flex justify-between mt-2 text-sm font-medium">
          <span>${priceRange.min}</span>
          <span>${priceRange.max}</span>
        </div>
      </div>

      <button
        className="bg-black text-white px-20 py-2 rounded-full hover:bg-gray-800 transition duration-200"
        onClick={handleApply}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filter;