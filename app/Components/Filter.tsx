'use client';

import { useState } from 'react';

type FilterProps = {
  options: string[];
  onApplyFilters: (filters: { search: string; categories: string[] }) => void;
};

const Filter = ({ options, onApplyFilters }: FilterProps) => {
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleApply = () => {
    onApplyFilters({ search, categories: selectedCategories });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedCategories(selected);
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 bg-gray-100 p-4 rounded-xl shadow-sm w-full max-w-4xl mx-auto">
      <input
        type="text"
        placeholder="Search products..."
        className="px-4 py-2 border rounded-md w-full md:w-1/3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
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
