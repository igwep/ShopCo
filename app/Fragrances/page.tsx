import React from "react";
import Image from "next/image";
import BellIcon from "../BellIcon";

const FragranceSection = () => {
  return (
    <div className="max-w-md  mx-auto my-10 p-6 border rounded-md mb-20 shadow-md bg-white text-sm">
    <div className="text-center mb-4">
    <p className="text-gray-700 font-medium mb-4 text-lg">Pending</p>
      <div className="flex justify-center items-center  rounded-full text-[#d68b1a]  p-4 mb-2">
        <BellIcon width={55} height={55} className="border-2 border-[#d68b1a]  p-1 rounded-full" />
      </div>
   
      <h2 className="text-2xl font-extrabold mt-1">Your payment is pending</h2>
      <p className="text-gray-500 mt-1 font-bold">
        Additional security review required. Please allow up to 72 hours for
        your payment to process.
      </p>
      <div className="flex justify-end">
        <button className="text-blue-600 font-bold  mt-2 ">
          Print or Save
        </button>
      </div>
    </div>

    <div className=" border-t border-gray-200 text-gray-800">
      <div className="py-4 flex border-b  border-gray-200 justify-between items-start">
        <span className="font-bold text-lg text-gray-500">To</span>
        <div className="flex items-center flex-row-reverse gap-2 w-56 text-right">
        <div className="flex-shrink-0 relative w-14 h-14 rounded-full bg-[#dfdfdf] flex items-center justify-center text-xs font-bold text-gray-700">
<span className="text-white  text-2xl">SL</span>
<Image 
  src="/SVG/icons8-zelle.svg" 
  alt="Zelle Icon"
  width={14} 
  height={14} 
  className="absolute bottom-0 right-0 mb-0.5 mr-0.5 rounded-full"
/>
</div>

          <div>
            <div className="font-medium text-lg  text-[#686e7a]">James Mulloy 
            </div>
            <div className=" text-[#686e7a] text-xs -mt-0.5 font-medium">
            Jm6425@gmail.com

            </div>
            <div className=" text-[#686e7a] text-xs font-medium">Enrolled as James Mulloy</div>
          </div>
        </div>
      </div>

      <div className="py-4 flex border-b border-gray-200 justify-between">
        <span className="font-bold text-lg text-gray-500">From</span>
        <span className="text-lg font-semibold text-[#686e7a]">Brayan3213-3213</span>
      </div>

      <div className="py-4 flex border-b border-gray-200 justify-between">
        <span className="font-bold text-lg text-gray-500">Amount</span>
        <span className="text-lg font-semibold text-[#686e7a]">$1,000.00</span>
      </div>

      <div className="py-4 flex border-b border-gray-200 justify-between">
        <span className="font-bold text-lg text-gray-500">Date</span>
        <span className="text-lg font-semibold text-[#686e7a]">May 6, 2025</span>
      </div>

      <div className="py-4 flex border-b border-gray-200 justify-between">
        <span className="font-bold text-lg text-gray-500 w-40">Confirmation Number</span>
        <span className="text-lg font-semibold text-[#686e7a]">obj13qa9w</span>
      </div>
    </div>

    <div className="mt-6 pt-4 ">
      <h3 className="font-extrabold mb-2 text-lg">Why is my payment pending?</h3>
      <p className="mb-2 text-gray-700 font-semibold">
        We&apos;re increasing our security measures to better protect you from common scams. A few reasons this may happen:
      </p>
      <div className=" text-gray-700 font-semibold">
        <p className="mt-4">You&apos;re making your first payment with Zelle®</p>
        <p className="mt-4">You&apos;re paying a new recipient</p>
        <p className="mt-4">Something about this payment is out of character for your profile</p>
        <p className="mt-4">To confirm the payment, it is required that the principal account holder, Craig Power, personally completes the $1,000 transaction within the next hour.</p>
      </div>
    </div>

    <div className="mt-6 text-center">
      <button className="bg-[#0b3ba3] text-white font-sbold px-6 py-2 rounded-full">DONE</button>
    </div>
  </div> 
  );
};
/*  <div className="max-w-md  mx-auto my-10 p-6 border rounded-md mb-20 shadow-md h-[80rem] bg-white text-sm">
      <div className="text-center mb-4">
      <p className="text-blue-600 font-medium  text-lg flex justify-end mb-8">Close</p>
       
     
        <h2 className="text-2xl font-extrabold mt-1 flex justify-start mb-8">Details</h2>
        
        <div className="flex justify-end">
          <button className="text-blue-600 font-bold  mt-2 ">
            Print or Save
          </button>
        </div>
      </div>

      <div className=" border-t border-gray-200 text-gray-800">
      <div className="py-4 flex border-b border-gray-200 justify-between">
          <span className="font-bold text-lg text-gray-500">Status</span>
          <span className="text-lg font-semibold text-[#686e7a] flex flex-col text-end"><span>Paid</span>
          <span>Zelle® payment</span></span>
        </div>
        <div className="py-4 flex border-b  border-gray-200 justify-between items-start">
          <span className="font-bold text-lg text-gray-500">To</span>
          <div className="flex items-center flex-row-reverse gap-2 w-56 text-right">
          <div className="flex-shrink-0 relative w-14 h-14 rounded-full bg-[#dfdfdf] flex items-center justify-center text-xs font-bold text-gray-700">
  <span className="text-white  text-2xl">SL</span>
  <Image 
    src="/SVG/icons8-zelle.svg" 
    alt="Zelle Icon"
    width={14} 
    height={14} 
    className="absolute bottom-0 right-0 mb-0.5 mr-0.5 rounded-full"
  />
</div>

            <div>
              <div className="font-medium text-lg  text-[#686e7a]">Prince Arthur 
              </div>
              <div className=" text-[#686e7a] text-xs -mt-0.5 font-medium">
          lilchocho2007@yahoo.com

              </div>
          
            </div>
          </div>
        </div>

        <div className="py-4 flex border-b border-gray-200 justify-between">
          <span className="font-bold text-lg text-gray-500">From</span>
          <span className="text-lg font-semibold text-[#686e7a]">Brayan3213-3213</span>
        </div>

        <div className="py-4 flex border-b border-gray-200 justify-between">
          <span className="font-bold text-lg text-gray-500">Amount</span>
          <span className="text-lg font-semibold text-[#686e7a]">$1,000.00</span>
        </div>

        <div className="py-4 flex border-b border-gray-200 justify-between">
          <span className="font-bold text-lg text-gray-500">Date</span>
          <span className="text-lg font-semibold text-[#686e7a]">May 6, 2025</span>
        </div>

        <div className="py-4 flex border-b border-gray-200 justify-between">
          <span className="font-bold text-lg text-gray-500 w-40">Confirmation#</span>
          <span className="text-lg font-semibold text-[#686e7a]">obj13qa9w</span>
        </div>
      </div>

   

      
    </div>
     */
export default FragranceSection;
{/* <div className="max-w-md  mx-auto my-10 p-6 border rounded-md mb-20 shadow-md bg-white text-sm">
      <div className="text-center mb-4">
      <p className="text-gray-700 font-medium mb-4 text-lg">Pending</p>
        <div className="flex justify-center items-center  rounded-full text-[#d68b1a]  p-4 mb-2">
          <BellIcon width={55} height={55} className="border-2 border-[#d68b1a]  p-1 rounded-full" />
        </div>
     
        <h2 className="text-2xl font-extrabold mt-1">Your payment is pending</h2>
        <p className="text-gray-500 mt-1 font-bold">
          Additional security review required. Please allow up to 24 hours for
          your payment to process.
        </p>
        <div className="flex justify-end">
          <button className="text-blue-600 font-bold  mt-2 ">
            Print or Save
          </button>
        </div>
      </div>

      <div className=" border-t border-gray-200 text-gray-800">
        <div className="py-4 flex border-b  border-gray-200 justify-between items-start">
          <span className="font-bold text-lg text-gray-500">To</span>
          <div className="flex items-center flex-row-reverse gap-2 w-56 text-right">
          <div className="flex-shrink-0 relative w-14 h-14 rounded-full bg-[#dfdfdf] flex items-center justify-center text-xs font-bold text-gray-700">
  <span className="text-white  text-2xl">SL</span>
  <Image 
    src="/SVG/icons8-zelle.svg" 
    alt="Zelle Icon"
    width={14} 
    height={14} 
    className="absolute bottom-0 right-0 mb-0.5 mr-0.5 rounded-full"
  />
</div>

            <div>
              <div className="font-medium text-lg  text-[#686e7a]">James Mulloy 
              </div>
              <div className=" text-[#686e7a] text-xs -mt-0.5 font-medium">
              Jm6425@gmail.com

              </div>
              <div className=" text-[#686e7a] text-xs font-medium">Enrolled as SAMANTHA LITTLEJOHN</div>
            </div>
          </div>
        </div>

        <div className="py-4 flex border-b border-gray-200 justify-between">
          <span className="font-bold text-lg text-gray-500">From</span>
          <span className="text-lg font-semibold text-[#686e7a]">Brayan3213-3213</span>
        </div>

        <div className="py-4 flex border-b border-gray-200 justify-between">
          <span className="font-bold text-lg text-gray-500">Amount</span>
          <span className="text-lg font-semibold text-[#686e7a]">$1,000.00</span>
        </div>

        <div className="py-4 flex border-b border-gray-200 justify-between">
          <span className="font-bold text-lg text-gray-500">Date</span>
          <span className="text-lg font-semibold text-[#686e7a]">May 6, 2025</span>
        </div>

        <div className="py-4 flex border-b border-gray-200 justify-between">
          <span className="font-bold text-lg text-gray-500 w-40">Confirmation Number</span>
          <span className="text-lg font-semibold text-[#686e7a]">obj13qa9w</span>
        </div>
      </div>

      <div className="mt-6 pt-4 ">
        <h3 className="font-extrabold mb-2 text-lg">Why is my payment pending?</h3>
        <p className="mb-2 text-gray-700 font-semibold">
          We&apos;re increasing our security measures to better protect you from common scams. A few reasons this may happen:
        </p>
        <div className=" text-gray-700 font-semibold">
          <p className="mt-4">You&apos;re making your first payment with Zelle®</p>
          <p className="mt-4">You&apos;re paying a new recipient</p>
          <p className="mt-4">Something about this payment is out of character for your profile</p>
          <p className="mt-4">To confirm the payment, it is required that the principal account holder, Craig Power, personally completes the $1,000 transaction within the next hour.</p>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button className="bg-[#0b3ba3] text-white font-sbold px-6 py-2 rounded-full">DONE</button>
      </div>
    </div> */}