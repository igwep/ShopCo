"use client";
import Image from 'next/image';
import React, { useState, useEffect} from 'react';
import Link from 'next/link';
import { useCart } from '@/app/Context/cartquantityContext';
import { useAuth } from '@/app/Context/authContext';
import { toast } from 'react-hot-toast';
import { auth } from '@/app/Firebase'; 
import { motion, AnimatePresence } from 'framer-motion';
import { useSearch } from '@/app/Context/searchContext';

const NavBar = () => {
  const { user } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopExpanded, setIsShopExpanded] = useState(false);
  const { items } = useCart();
  const { query: searchQuery, setQuery: setSearchQuery } = useSearch();


  const cartQuantities = items.reduce((acc: { [key: string]: number }, item) => {
    acc[item.id] = item.quantity;
    return acc;
  }, {});
  const totalItems = Object.values(cartQuantities).reduce((acc, quantity) => acc + quantity, 0);

  const handleLogout = async () => {
    try {
      setIsProfileOpen(false);
      await auth.signOut();
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsShopExpanded(false);
  };
  useEffect(() => {
    console.log("Search query updated:", searchQuery);
  },[searchQuery])

  return (
    <nav className="flex justify-center fixed top-0 w-full py-4 bg-white shadow-md z-50">
      <div className="flex items-center gap-10 w-full relative justify-between px-4 md:px-34 3xl:px-64">
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden mr-2"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <Image
              width={20}
              height={20}
              src="/SVG/x.svg"
              alt="Close menu"
              className="w-6 h-auto"
            />
          ) : (
            <Image
              width={24}
              height={24}
              src="/SVG/burger.svg"
              alt="Open menu"
              className="w-6 h-auto"
            />
          )}
        </button>

        {/* Logo */}
        <div className="md:flex flex-row items-center gap-2">
          <Link href="/" className="flex items-center">
            <Image
              width={130}
              height={120}
              src="/SVG/SHOP.CO.svg"
              alt="logo"
              className="w-36 h-auto"
            />
          </Link>
        </div>

        {/* Nav Links - Desktop */}
        <div className="relative hidden md:flex gap-6 font-medium text-gray-700">
          {/* Shop with Dropdown */}
          <div
            className="relative flex items-center gap-1 cursor-pointer hover:text-black"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <span>Shop</span>
            <Image
              width={100}
              height={100}
              src="/SVG/dropdownArrow.svg"
              alt="arrow down icon"
              className="w-2 h-auto mt-[2px]"
            />

            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-48 bg-white border shadow-md rounded-md z-50"
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <Link
                    href="/Shop"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    All Products
                  </Link>
                  <Link
                    href="/Shop/beauty"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Beauty
                  </Link>
                  <Link
                    href="/Shop/fragrances"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Fragrances
                  </Link>
                  <Link
                    href="/Shop/furniture"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Furnitures
                  </Link>
                  <Link
                    href="/Shop/groceries"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Groceries
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Other Nav Items */}
          <Link href="#" className="hover:text-black">
            On Sale
          </Link>
          <a href="#" className="hover:text-black">
            New Arrivals
          </a>
          <a href="#" className="hover:text-black">
            Brand
          </a>
        </div>

        {/* Search Bar - Desktop */}
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for Products..."
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>

        {/* Cart and Profile */}
        <div className="flex items-center md:gap-6 gap-3">
         {/*  <button className="relative md:hidden flex">
            <Image
              width={100}
              height={100}
              src="/SVG/blackSearch.svg"
              alt="profile icon"
              className="w-6 h-auto"
            />
          </button> */}
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
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="relative"
          >
            <Image
              width={100}
              height={100}
              src="/SVG/profile.svg"
              alt="profile icon"
              className="w-7 h-auto"
            />
          </button>
          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                onMouseLeave={() => setIsProfileOpen(false)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="absolute right-4 top-12 mt-2 min-w-44 bg-white shadow-lg rounded-xl z-50"
              >
                {!user ? (
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden w-full bg-white shadow-lg absolute top-full left-0 z-40 overflow-hidden"
          >
            <div className="p-4 border-t border-gray-200">
              <div className="mb-4">
                <div
                  className="flex justify-between items-center py-2 cursor-pointer"
                  onClick={() => setIsShopExpanded(!isShopExpanded)}
                >
                  <span className="font-medium text-gray-700">Shop</span>
                  <motion.div
                    animate={{ rotate: isShopExpanded ? 180 : 0 }}
                  >
                    <Image
                      width={16}
                      height={16}
                      src="/SVG/dropdownArrow.svg"
                      alt="arrow down"
                      className="w-3 h-auto"
                    />
                  </motion.div>
                </div>
                
                <AnimatePresence>
                  {isShopExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 overflow-hidden"
                    >
                      <Link
                        href="/Shop"
                        onClick={closeMobileMenu}
                        className="block py-2 text-gray-600 hover:text-black"
                      >
                        All Products
                      </Link>
                      <Link
                        href="/Shop/beauty"
                        onClick={closeMobileMenu}
                        className="block py-2 text-gray-600 hover:text-black"
                      >
                        Beauty
                      </Link>
                      <Link
                        href="/Shop/fragrances"
                        onClick={closeMobileMenu}
                        className="block py-2 text-gray-600 hover:text-black"
                      >
                        Fragrances
                      </Link>
                      <Link
                        href="/Shop/furniture"
                        onClick={closeMobileMenu}
                        className="block py-2 text-gray-600 hover:text-black"
                      >
                        Furnitures
                      </Link>
                      <Link
                        href="/Shop/groceries"
                        onClick={closeMobileMenu}
                        className="block py-2 text-gray-600 hover:text-black"
                      >
                        Groceries
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="#"
                onClick={closeMobileMenu}
                className="block py-3 font-medium text-gray-700 border-t border-gray-100"
              >
                On Sale
              </Link>
              <Link
                href="#"
                onClick={closeMobileMenu}
                className="block py-3 font-medium text-gray-700 border-t border-gray-100"
              >
                New Arrivals
              </Link>
              <Link
                href="#"
                onClick={closeMobileMenu}
                className="block py-3 font-medium text-gray-700 border-t border-gray-100"
              >
                Brand
              </Link>

              <div className="mt-4 pt-3 border-t border-gray-200">
                <div className="flex items-center rounded-full px-3 py-3 bg-gray-100">
                  <Image
                    width={100}
                    height={100}
                    src="/SVG/search.svg"
                    alt="search icon"
                    className="w-6 h-auto mr-4"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for Products..."
                    className="flex-1 bg-transparent outline-none text-sm"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;