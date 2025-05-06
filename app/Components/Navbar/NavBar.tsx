"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';


const NavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="flex justify-center py-4 bg-white shadow-md relative z-50">
      <div className="flex items-center gap-10 w-full  justify-between px-4 md:px-34 3xl:px-64">
        {/* Logo */}
        <div className="flex flex-row items-center gap-2">
          <Image 
           width={130}
           height={120}
           src="/SVG/burger.svg"
           alt="logo"
           className="w-6 md:hidden  h-auto"
          />
         <Link href="/">
         <Image
            width={130}
            height={120}
            src="/SVG/SHOP.CO.svg"
            alt="logo"
            className="w-36  h-auto"
          />
         </Link>
        </div>

        {/* Nav Links */}
        <div className="relative hidden  md:flex gap-6  font-medium text-gray-700">
          {/* Shop with Dropdown */}
          <div
            className="relative flex items-center gap-1 cursor-pointer hover:text-black"
            onMouseEnter={() => setShowDropdown(true)}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span>Shop</span>
            <Image
              width={100}
              height={100}
              src="/SVG/dropdownArrow.svg"
              alt="arrow down icon"
              className="w-2 h-auto mt-[2px]"
            />
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
          </div>
          <a href="#" className="hover:text-black">On Sale</a>
          <a href="#" className="hover:text-black">New Arrivals</a>
          <a href="#" className="hover:text-black">Brand</a>
        </div>
        {/* Search Bar */}
        <div className="md:flex hidden flex-1 max-w-2xl items-center rounded-full px-3 py-3 bg-gray-100">
          <Image
            width={100}
            height={100}
            src="/SVG/search.svg"
            alt="search icon"
            className="w-6 h-auto mr-4"
          />
          <input
            type="text"
            placeholder="Search for Products..."
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>
        {/* Cart and Profile */}
        <div className="flex items-center md:gap-6 gap-3">
        <button className="relative">
            <Image
              width={100}
              height={100}
              src="/SVG/blackSearch.svg"
              alt="profile icon"
              className="w-6 h-auto"
            />
          </button>
          <button className="relative">
            <Image
              width={100}
              height={100}
              src="/SVG/cart.svg"
              alt="cart icon"
              className="w-6 h-auto"
            />
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-1 rounded-full">
              3
            </span>
          </button>
          <button className="relative">
            <Image
              width={100}
              height={100}
              src="/SVG/profile.svg"
              alt="profile icon"
              className="w-7 h-auto"
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
