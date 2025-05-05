import React from 'react'
import Image from 'next/image'

export const Footer = () => {
  return (
    <footer className="bg-[#F0F0F0] pt-40 pb-8 relative w-full">
      {/* Newsletter Banner */}
      <div className="md:max-w-7xl  mx-4 md:mx-auto -mt-60 bg-black rounded-3xl p-10 flex flex-col lg:flex-row justify-between items-center gap-6">
        <h1 className="text-white text-3xl lg:text-5xl font-black max-w-2xl md:text-center text-start lg:text-left">
          STAY UPTO DATE ABOUT OUR LATEST OFFERS
        </h1>

        <div className="flex flex-col items-center gap-4 w-full max-w-sm">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Enter your email address"
              className="bg-white w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Image
              src="/SVG/mail.svg"
              alt="icon"
              width={20}
              height={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
            />
          </div>

          <button className="bg-white text-black font-semibold py-3 px-6 rounded-full transition duration-300 hover:opacity-90 w-full">
            Subscribe to our newsletter
          </button>
        </div>
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 mt-16 px-4">
        {/* Logo and Description */}
        <div className="col-span-1 space-y-4">
         <Image
                     width={140}
                     height={120}
                     src="/SVG/SHOP.CO.svg"
                     alt="logo"
                     className="w-36  h-auto"
                   />
          <p className="text-sm text-gray-600 leading-6">
            We have clothes that suit your style and which you&apos;re proud to wear. From women to men.
          </p>
          <div className="flex space-x-3 text-gray-600">
            {/* Uncomment and add your social icons here if needed */}
            {/* <FaTwitter className="hover:text-black cursor-pointer" />
            <FaFacebookF className="hover:text-black cursor-pointer" />
            <FaInstagram className="hover:text-black cursor-pointer" />
            <FaGithub className="hover:text-black cursor-pointer" /> */}
          </div>
        </div>

        {/* Links Sections */}
        <div>
          <h3 className="font-semibold mb-4 tracking-wider">Company</h3>
          <ul className="space-y-4 text-sm text-gray-700">
            <li>About</li>
            <li>Features</li>
            <li>Works</li>
            <li>Career</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4 tracking-wider">Help</h3>
          <ul className="space-y-4 text-sm text-gray-700">
            <li>Customer Support</li>
            <li>Delivery Details</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4 tracking-wider">FAQ</h3>
          <ul className="space-y-4 text-sm text-gray-700">
            <li>Account</li>
            <li>Manage Deliveries</li>
            <li>Orders</li>
            <li>Payments</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4 tracking-wider">Resources</h3>
          <ul className="space-y-4 text-sm text-gray-700">
            <li>Free eBooks</li>
            <li>Development Tutorial</li>
            <li>How to - Blog</li>
            <li>Youtube Playlist</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-300 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 max-w-7xl mx-auto px-4">
        <p>Shop.co © 2000–2025, All Rights Reserved</p>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Image src="/SVG/visa.svg" alt="Visa" width={45} height={24} />
          <Image src="/SVG/master.svg" alt="MasterCard" width={45} height={24} />
          <Image src="/SVG/paypal.svg" alt="PayPal" width={45} height={24} />
          <Image src="/SVG/apple.svg" alt="Apple Pay" width={45} height={24} />
          <Image src="/SVG/googlepay.svg" alt="Google Pay" width={45} height={24} />
        </div>
      </div>
    </footer>
  )
}
