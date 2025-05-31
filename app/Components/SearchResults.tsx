import React from 'react';
import ProductCard from './ProductCards';
import { useSearch } from '../Context/searchContext';
import Spinner from './Spinner';

const SearchResults = () => {
  const { results, isLoading, error, query, setQuery } = useSearch();

  const handleClearSearch = () => {
    setQuery('');
    // setResults([]); // optional: clear results when query is cleared
  };

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (error || !results || results.length === 0) {
    return (
      <div className="p-10 text-center">
        <p className="text-red-500 mb-4">
          {error || `No results found for "${query}"`}
        </p>
        <button
          onClick={handleClearSearch}
          className="bg-black text-white px-4 py-2 rounded hover:opacity-90 transition"
        >
          Clear Search
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-32 3xl:px-64 py-24 w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Search Results</h2>
        <p className="text-gray-500 mb-4">
          Showing results for <span className="font-semibold">&quot;{query}&quot;</span>
        </p>
        <button
          onClick={handleClearSearch}
          className="bg-black text-white px-4 py-2 rounded hover:opacity-90 transition"
        >
          Clear Search
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-4 place-items-center">
        <ProductCard products={results} />
      </div>
    </div>
  );
};

export default SearchResults;
