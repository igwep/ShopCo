'use client';

import { useState } from 'react';
import Image from 'next/image';

type FilterProps = {
  options: string[];
  onApplyFilters: (filters: {  categories: string[] }) => void;
};

const Filter = ({ options,  onApplyFilters  }: FilterProps) => {

  //const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  /* const handleApply = () => {
    onApplyFilters({  categories: selectedCategories });
  }; */

 /*  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedCategories(selected);
  }; */
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };
  const handleApply = () => { 
    onApplyFilters({ categories: selectedCategories });
  };

  return (
    <div className="flex flex-col  items-center gap-4 border border-gray-200 p-4 rounded-xl  w-full max-w-4xl mx-auto">
      <div className="flex border-b border-gray-200 items-center justify-between w-full mb-4 pb-4">
      <h1 className='text-xl font-semibold'>Filters</h1>
      </div>
      <div
       /*  multiple
        value={selectedCategories}*/
       
        className="px-4 py-2  rounded-md w-full  h-auto"
      >
        {options.map((category, index) => (
          <span onClick={()=>handleCategoryChange(category) } key={index} className={`hover:bg-gray-200 w-full ${selectedCategories.includes(category) ? 'bg-gray-200' : ''} flex rounded-lg justify-between p-2`} ><span>{category}</span>
          <Image
            src="/SVG/breadcrumbArrow.svg"
            alt="Checkbox"
            width={20}
            height={20}
            className="ml-2 cursor-pointer "
          
          /></span>
        ))}
      </div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        onClick={handleApply}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filter;
