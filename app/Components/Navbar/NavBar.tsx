"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/app/Context/cartquantityContext';

//remember to split the code into multiple files so that it is easier to read and maintain
const NavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { items } = useCart();

  const cartQuantities = items.reduce((acc: { [key: string]: number }, item) => {
    acc[item.id] = item.quantity;
    return acc;
  }, {});
  const totalItems = Object.values(cartQuantities).reduce((acc, quantity) => acc + quantity, 0);

  return (
    <nav className="flex justify-center fixed top-0 w-full  py-4 bg-white shadow-md  z-50">
      <div className="flex items-center gap-10 w-full relative  justify-between px-4 md:px-34 3xl:px-64">
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
                <Link href="/Shop" className="block px-4 py-2 hover:bg-gray-100">
                  All Products
                </Link>
                <a href={`/Shop/beauty`}className="block px-4 py-2 hover:bg-gray-100">
                  Beauty
                </a>
                <a href={`/Shop/fragrances`} className="block px-4 py-2 hover:bg-gray-100">
                  Fragrances
                </a>
                <a href={`/Shop/furniture`} className="block px-4 py-2 hover:bg-gray-100">
                  Furnitures
                </a>
                <a href={`/Shop/groceries`} className="block px-4 py-2 hover:bg-gray-100">
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
              {totalItems}
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