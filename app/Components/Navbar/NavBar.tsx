"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/app/Context/cartquantityContext';
import { useAuth } from '@/app/Context/authContext';
import { toast } from 'react-hot-toast';
import { auth } from '@/app/Firebase'; // Ensure you have the correct path to your Firebase config

//remember to split the code into multiple files so that it is easier to read and maintain
const NavBar = () => {
  const { user } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { items } = useCart();

  const cartQuantities = items.reduce((acc: { [key: string]: number }, item) => {
    acc[item.id] = item.quantity;
    return acc;
  }, {});
  const totalItems = Object.values(cartQuantities).reduce((acc, quantity) => acc + quantity, 0);

  const handleLogout = async () => {

      try {
        setIsProfileOpen(false);
        await auth.signOut()
      } catch (error) {
        console.error("Logout error:", error);
        toast.error("Failed to log out. Please try again.");
      }
      toast.success("Logged out successfully!");

    }

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
          <Link href="#" className="hover:text-black">On Sale</Link>
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
        <button className="relative md:hidden flex">
            <Image
              width={100}
              height={100}
              src="/SVG/blackSearch.svg"
              alt="profile icon"
              className="w-6 h-auto"
            />
          </button>
          <Link href="/Cart" className="relative">
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
          </Link>
          <button
             onMouseEnter={() => setIsProfileOpen(true)}
             onClick={()=> setIsProfileOpen(!isProfileOpen)}
          className="relative">
            <Image
              width={100}
              height={100}
              src="/SVG/profile.svg"
              alt="profile icon"
              className="w-7 h-auto"
            />
          </button>
     {isProfileOpen && (
  <div
    onMouseLeave={() => setIsProfileOpen(false)}
    className="absolute right-4 top-12 mt-2 border min-w-44 bg-white shadow-lg rounded-xl z-50"
  >
    {!user ? (
      // When user is NOT logged in
      <ul className="py-2 text-sm">
        <li>
          <Link
            href="/login"
            className="block px-4 py-2 font-bold hover:bg-gray-100 transition"
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            href="/signup"
            className="block px-4 py-2 font-bold hover:bg-gray-100 transition"
          >
            Sign Up
          </Link>
        </li>
      </ul>
    ) : (
      // When user IS logged in
      <ul className="py-2 text-sm">
        <li className="px-4 py-2 font-bold text-gray-700">
          👤 {user.displayName || user.email}
        </li>
        <li>
          <Link
            href="/profile"
            className="block px-4 py-2 font-bold hover:bg-gray-100 transition"
          >
            Profile
          </Link>
        </li>
        <li>
          <button
           onClick={handleLogout}
            type="button"
            className="w-full text-left px-4 py-2 font-bold hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </li>
      </ul>
    )}
  </div>
)}

        </div>
      </div>
    </nav>
  );
};

export default NavBar;