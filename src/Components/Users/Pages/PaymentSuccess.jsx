import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function PaymentSuccess() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8001/cart").then((res) => {
      setCartItems(res.data);
    });
  }, []);

  // --- Calculations (same as checkout) ---
  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.newprice) * (item.qty || 1),
    0
  );
  const shipping = 0; // free shipping
  const tax = subtotal * 0.06; // 6% tax example
  const total = subtotal + shipping + tax;

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full bg-white p-8 sm:p-10 rounded-xl shadow-2xl border border-green-100 text-center space-y-8">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative w-24 h-24">
            <div className="w-full h-full rounded-full bg-green-100 animate-pulse-once" />
            <svg
              className="absolute inset-0 w-2/3 h-2/3 m-auto text-green-600 animate-pop-in"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-green-600 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-700 text-lg">
          Thank you, your order has been confirmed.
        </p>
        <p className="text-sm text-gray-500 mt-1">
          A confirmation email has been sent to your inbox.
        </p>

        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-left space-y-3">
          <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-3">
            Order Details
          </h3>
          <div className="flex justify-between text-gray-600">
            <span>Total Items</span>
            <span className="font-medium">{cartItems.length}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Items Subtotal</span>
            <span className="font-medium">₹ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span className="font-medium text-green-600">
              {shipping === 0 ? "Free" : `₹ ${shipping}`}
            </span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Tax</span>
            <span className="font-medium">₹ {tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-3">
            <span>Total Paid</span>
            <span>₹ {total.toFixed(2)}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            onClick={() => window.print()}
            className="flex-1 flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 font-semibold py-3 px-6 rounded-full transition duration-300 shadow-md text-base"
          >
            Print Invoice
          </button>
          <Link
            to="/"
            className="flex-1 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300 shadow-md text-base"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
