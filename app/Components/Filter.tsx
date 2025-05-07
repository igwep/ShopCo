'use client';

import { useState } from 'react';

type FilterProps = {
  options: string[];
  onApplyFilters: (filters: {  categories: string[] }) => void;
};

const Filter = ({ options, onApplyFilters }: FilterProps) => {

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleApply = () => {
    onApplyFilters({  categories: selectedCategories });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedCategories(selected);
  };

  return (
    <div className="flex flex-col  items-center gap-4 border border-gray-200 p-4 rounded-xl  w-full max-w-4xl mx-auto">
      <div className="flex border-b border-gray-200 items-center justify-between w-full mb-4 pb-4">
      <h1 className='text-xl font-semibold'>Filters</h1>
      </div>
      <select
        multiple
        value={selectedCategories}
        onChange={handleCategoryChange}
        className="px-4 py-2 border rounded-md w-full md:w-1/3 h-32"
      >
        {options.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        onClick={handleApply}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filter;
