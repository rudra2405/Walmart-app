import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items dynamically
  useEffect(() => {
    axios.get("http://localhost:8001/cart").then((res) => {
      setCartItems(res.data);
    });
  }, []);

  // Calculations
  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.newprice) * (item.qty || 1),
    0
  );
  const shipping = subtotal > 0 ? 0 : 0; // Free shipping
  const tax = subtotal * 0.06; // 6% tax example
  const total = subtotal + shipping + tax;

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-2">
          Secure Checkout
        </h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Shipping & Payment Form */}
          <div className="md:w-3/5 space-y-10">
            <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                Shipping Address
              </h2>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Address Line 1"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Address Line 2 (Optional)"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="State / Province"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="ZIP / Postal"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </form>
            </section>

            <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                Payment Method
              </h2>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Card Number"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Name on Card"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <input
                    id="creditCard"
                    type="radio"
                    name="radio"
                    defaultChecked
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="creditCard">Credit / Debit Card</label>
                  <input
                    id="paypal"
                    type="radio"
                    name="radio"
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="paypal">PayPal</label>
                </div>
              </form>
            </section>
          </div>

          {/* Order Summary */}
          <div className="md:w-2/5">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 sticky md:top-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm text-gray-600 mb-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between border-b pb-1"
                  >
                    <span>
                      {item.productname} x {item.qty || 1}
                    </span>
                    <span>
                      ₹ {(Number(item.newprice) * (item.qty || 1)).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-base text-gray-700 mb-2">
                <span>Subtotal ({cartItems.length} items)</span>
                <span className="font-medium">₹ {subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-base text-gray-700 mb-2">
                <span>Shipping &amp; Handling</span>
                <span className="font-medium text-green-600">
                  {shipping === 0 ? "Free" : `₹ ${shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between text-base text-gray-700 mb-4">
                <span>Taxes (Estimated)</span>
                <span className="font-medium">₹ {tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-2xl font-bold text-gray-900 mb-6 border-t pt-4">
                <span>Order Total</span>
                <span>₹ {total.toFixed(2)}</span>
              </div>

              <div className="mt-6">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Terms of Service
                  </a>
                </label>
              </div>

              <Link to="/payment-success">
                <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-extrabold py-3 rounded-full transition duration-300 shadow-xl text-lg uppercase tracking-wider">
                  Place Your Order
                </button>
              </Link>

              <p className="mt-4 text-center text-xs text-gray-500 flex items-center justify-center">
                Secure payment processed by Stripe.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
