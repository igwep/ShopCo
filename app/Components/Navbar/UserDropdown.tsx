'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';


export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-200 transition"
      >
        {/* Replace with user image if available */}
       {/*  <UserIcon className="w-6 h-6 text-gray-700" /> */}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-xl z-50">
          <ul className="py-2 text-sm text-gray-700">
            <li>
              <Link
                href="/login"
                className="block px-4 py-2 hover:bg-gray-100 transition"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                className="block px-4 py-2 hover:bg-gray-100 transition"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
