import React, { useState } from 'react';
const Dropdown = () => {
     const [showDropdown, setShowDropdown] = useState(false);
  return (
    <>
        {showDropdown && (
                      <div
                      onMouseLeave={() => setShowDropdown(false)}
                      className="absolute  top-full left-0 mt-2 w-48 bg-white border shadow-md rounded-md z-50">
                        <a href="/Shop" className="block px-4 py-2 hover:bg-gray-100">
                          All Products
                        </a>
                        <a href="/Beauty" className="block px-4 py-2 hover:bg-gray-100">
                          Beauty
                        </a>
                        <a href="/Fragrances" className="block px-4 py-2 hover:bg-gray-100">
                          Fragrances
                        </a>
                        <a href="/Furniture" className="block px-4 py-2 hover:bg-gray-100">
                          Furnitures
                        </a>
                        <a href="/Groceries" className="block px-4 py-2 hover:bg-gray-100">
                          Groceries
                        </a>
                      </div>
                    )}
    </>
  )
}

export default Dropdown