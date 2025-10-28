import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

export default function Cart() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = () => {
    axios.get("http://localhost:8001/cart").then((response) => {
      setData(response.data);
    });
  };

  // --- Update Quantity (+/-) ---
  const updateQty = async (item, change) => {
    const newQty = (item.qty || 1) + change;
    if (newQty < 1) return; // stop going below 1

    await axios.put(`http://localhost:8001/cart/${item.id}`, {
      ...item,
      qty: newQty,
    });
    fetchCart(); // refresh
  };

  // --- Calculations ---
  const subtotal = data.reduce(
    (acc, item) => acc + Number(item.newprice) * (item.qty || 1),
    0
  );
  const shipping = subtotal > 0 ? 0 : 0;
  const tax = subtotal * 0.06;
  const total = subtotal + shipping + tax;

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-2">
          Your Shopping Cart ({data.length} Items)
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Cart Items */}
          <div className="md:w-3/4 space-y-6">
            {data.length === 0 ? (
              <p className="text-gray-600">Your cart is empty.</p>
            ) : (
              data.map((items) => (
                <div
                  key={items.id}
                  className="flex items-center border p-4 rounded-lg shadow-sm bg-white"
                >
                  {/* Image */}
                  <img
                    className="w-20 h-20 object-cover rounded-md mr-4"
                    src={items.image}
                    alt={items.productname}
                  />

                  {/* Details */}
                  <div className="flex-grow">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {items.productname}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Category: {items.categoryname}
                    </p>
                    <p className="text-sm text-gray-500 line-through">
                      Rs. {items.oldprice}
                    </p>
                    <p className="text-xl font-bold text-gray-900 mt-1">
                      Rs. {items.newprice}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2 mx-4">
                    <button
                      onClick={() => updateQty(items, -1)}
                      className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="w-10 text-center">{items.qty || 1}</span>
                    <button
                      onClick={() => updateQty(items, 1)}
                      className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() => navigate(`/delete-cart/${items.id}`)}
                    className="text-red-500 hover:text-red-700 transition duration-150"
                    aria-label="Remove item"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}

            {/* Continue Shopping */}
            <div className="text-right mt-6">
              <Link
                to="/"
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-end"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:w-1/4">
            <div className="bg-gray-50 border p-6 rounded-lg shadow-lg sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="flex justify-between text-base text-gray-700 mb-2">
                <span>Subtotal ({data.length} items)</span>
                <span className="font-medium">₹ {subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-base text-gray-700 mb-2">
                <span>Shipping Estimate</span>
                <span className="font-medium text-green-600">
                  {shipping === 0 ? "Free" : `₹ ${shipping}`}
                </span>
              </div>

              <div className="flex justify-between text-base text-gray-700 mb-4 border-b pb-4">
                <span>Tax Estimate</span>
                <span className="font-medium">₹ {tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-2xl font-bold text-gray-900 mb-6">
                <span>Order Total</span>
                <span>₹ {total.toFixed(2)}</span>
              </div>

              <Link to="/checkout">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-full transition duration-300 shadow-md">
                  Proceed to Checkout
                </button>
              </Link>

              <div className="mt-4 text-center text-gray-500 text-xs">
                Secure checkout guaranteed.
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
