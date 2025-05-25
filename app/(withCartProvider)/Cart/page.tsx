"use client";
import React from "react";
import { useCart } from "@/app/Context/cartquantityContext";
import Image from "next/image";
import { toast } from "react-hot-toast";
import Breadcrumb from "@/app/Components/Breadcrumb";
import Link from "next/link";

const Cartpage = () => {
  const { items, setItems } = useCart();

  const subtotal = items.reduce<number>((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const totalDiscount = items.reduce((acc, item) => {
    if (item.discountPercentage) {
      return acc + (item.price * item.discountPercentage) / 100;
    }
    return acc;
  }, 0);

  const totalDiscountRounded = parseFloat(totalDiscount.toFixed(2));
  const totalDiscountPercentage = subtotal
    ? parseFloat(((totalDiscount / subtotal) * 100).toFixed(2))
    : 0;

  const lastItemIndex = items.length - 1;

  const handleIncrement = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id: string) => {
    setItems((prevItems) => {
      const itemToUpdate = prevItems.find((item) => item.id === id);
      if (!itemToUpdate) return prevItems;

      if (itemToUpdate.quantity > 1) {
        return prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevItems.filter((item) => item.id !== id);
      }
    });
  };

  const handleRemoveItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    toast.error("Item removed from cart");
  };

  const handlePrice = (
    price: number,
    quantity: number,
    discountPercentage?: number
  ) => {
    let total: number;
    if (discountPercentage) {
      total = price * (1 - discountPercentage / 100) * quantity;
    } else {
      total = price * quantity;
    }
    return parseFloat(total.toFixed(2));
  };

  return (
    <>
      {items.length === 0 ? (
        <div className="text-center h-screen font-fancyFont flex flex-col items-center justify-center">
          <div className="md:px-34 3xl:px-64 px-4">
            <Breadcrumb />
          </div>
          <h2 className="text-2xl font-semibold">Your cart is empty</h2>
          <p className="mt-4 text-gray-600">
            Browse our{" "}
            <Link href="/Shop" className="underline">
              products
            </Link>{" "}
            and add some to your cart!
          </p>
        </div>
      ) : (
        <div className="mt-24 font-fancyFont">
          <div className="md:px-34 3xl:px-64 px-4">
            <Breadcrumb />
          </div>
          <h1 className="text-4xl font-black uppercase md:px-34 3xl:px-64 px-4">
            Your Cart
          </h1>

          <div className="flex flex-col md:flex-row w-full gap-2 justify-center items-start md:px-34 3xl:px-64 px-4 py-8 pb-28">
            {/* Left - Cart Items */}
            <div className="w-full md:w-[60%]">
              <div className="flex flex-col gap-4 border border-gray-300 p-4 rounded-lg">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex justify-between items-center ${
                      index === lastItemIndex
                        ? ""
                        : "border-b border-gray-300"
                    } py-4`}
                  >
                    <div className="flex gap-4 items-start w-full">
                      <div className="relative bg-[#F0F0F0] w-22 h-22 flex-shrink-0">
                        <Image
                          src={item.thumbnail || item.images[0]}
                          alt={item.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>

                      <div className="flex flex-col w-full gap-4">
                        <div className="flex justify-between items-center w-full">
                          <h2 className="font-semibold">{item.title}</h2>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-600 hover:underline text-sm"
                          >
                            <Image
                              src="/SVG/trashIcon.svg"
                              width={20}
                              height={20}
                              alt=""
                            />
                          </button>
                        </div>

                        <div className="flex justify-between items-center w-full">
                          <p className="text-lg font-semibold">
                            ${handlePrice(item.price, item.quantity, item.discountPercentage)}
                          </p>

                          <div className="flex items-center space-x-4 bg-gray-100 rounded-full px-4 py-1 shadow-inner">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleDecrement(item.id);
                              }}
                              className="text-black text-xl focus:outline-none"
                            >
                              −
                            </button>
                            <span className="text-base font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleIncrement(item.id);
                              }}
                              className="text-black text-xl focus:outline-none"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Summary */}
            <div className="w-full md:w-[40%] border border-gray-300 rounded-lg">
              <h1 className="px-4 text-lg py-2 font-semibold">Order Summary</h1>

              <div className="flex flex-col gap-4 p-4">
                <span className="flex justify-between w-full">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-semibold">{subtotal.toFixed(2)}</span>
                </span>

                <span className="flex justify-between w-full">
                  <span className="text-gray-500">
                    Discount (-{totalDiscountPercentage}%)
                  </span>
                  <span className="text-red-600 font-semibold">
                    -${totalDiscountRounded}
                  </span>
                </span>

                <span className="flex justify-between w-full">
                  <span className="text-gray-500">Delivery Fee</span>
                  <span className="font-semibold">$15</span>
                </span>

                <div className="border-t border-gray-300"></div>
              </div>

              {/* Total & Coupon */}
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <span>Total</span>
                  <span className="text-xl font-semibold">
                    ${(subtotal + 15 - totalDiscountRounded).toFixed(2)}
                  </span>
                </div>

                <div className="flex gap-2 justify-between items-center mb-4">
                  <div className="relative w-full">
                    <input
                      type="text"
                      placeholder="Add Promo code"
                      className="rounded-full bg-[#F0F0F0] px-10 py-3 w-full"
                    />
                    <Image
                      src="/SVG/coupon.svg"
                      alt="Coupon Icon"
                      width={20}
                      height={20}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2"
                    />
                  </div>
                  <button className="bg-black text-white px-6 py-3 rounded-full">
                    Apply
                  </button>
                </div>

                <button className="bg-black flex items-center justify-center gap-4 text-white px-6 py-4 text-lg rounded-full w-full">
                  Go to Checkout
                  <Image
                    src="/SVG/whiteForward.svg"
                    alt="Arrow Icon"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cartpage;
