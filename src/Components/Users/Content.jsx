import React, { useState, useEffect } from "react";
import axios from "axios";
import Catagory from "./Catagory";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Content() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");

  // fetch data via axios.get() using useEffect hooks
  useEffect(() => {
    axios.get(`http://localhost:8001/products`).then((response) => {
      setData(response.data);
    });
  }, []);

  const filteredData =
    selectedCategory === "All"
      ? data
      : data.filter((item) => item.category === selectedCategory);

  return (
    <>
      <div className="bg-blue-600 text-white p-4 sm:p-6 lg:p-8 shadow-2xl w-320 rounded-3xl mt-10 mx-auto overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight animate-pulse">
              Get Your FREE Walmart Samples Today!
            </h2>
            <p className="mt-1 text-base sm:text-lg opacity-90">
              Discover new products from your favorite brands, on us.
            </p>
          </div>
          <div className="flex-shrink-0">
            <a
              href="#"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-bold rounded-full shadow-lg text-blue-600 bg-white hover:bg-gray-100 transition duration-300 transform hover:scale-105 animate-bounce"
            >
              Claim Samples Now
              <svg
                className="ml-2 -mr-1 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* products grid */}
      <div className="container mx-auto flex gap-6 mt-6 overflow-hidden">
        {/* Category Sidebar */}
        <div className="w-1/4">
          <Catagory setSelectedCategory={setSelectedCategory} />
        </div>

        {/* Product Grid */}
        <div className="w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center transition-transform hover:scale-105"
            >
              <img
                src={item.image}
                alt={item.productname}
                className="w-32 h-32 object-contain mb-4"
              />
              <p className="text-lg font-semibold text-gray-800">
                Rs. {item.newprice}{" "}
                <span className="text-sm text-gray-500 line-through">
                  {item.oldprice}
                </span>
              </p>
              <p className="text-center text-gray-600 mt-2">
                {item.productname}
              </p>
              <button
                type="button"
                onClick={() => navigate(`/product-details/${item.id}`)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2"
              >
                More Details <FaPlus />
              </button>
            </div>
          ))}
        </div>
      </div>

      <section className="text-gray-600 body-font relative bg-gray-50">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-4xl text-3xl font-extrabold title-font mb-4 text-gray-900">
              Contact Your Walmart Center
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-700">
              We are here to help you with your shopping experience. Reach out
              to us for store information, hours, or any other inquiries.
            </p>
          </div>
          <div className="flex flex-wrap -m-2">
            <div className="lg:w-1/2 md:w-full w-full p-2">
              <div className="bg-white p-8 rounded-lg shadow-xl h-full flex flex-col">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Store Information
                  </h2>
                  <p className="text-lg text-gray-700 mb-2 flex items-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      className="w-6 h-6 text-blue-500 mr-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                    <span className="font-medium">Address:</span> 1234 Walmart
                    Shopping Plaza, Retail City, ST 98765
                  </p>
                  <p className="text-lg text-gray-700 mb-2 flex items-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      className="w-6 h-6 text-blue-500 mr-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <path d="M22 6l-10 7L2 6" />
                    </svg>
                    <span className="font-medium">Email:</span>{" "}
                    <a
                      href="mailto:store.support@walmartcenter.com"
                      className="hover:text-blue-600 transition-colors"
                    >
                      store.support@walmartcenter.com
                    </a>
                  </p>
                  <p className="text-lg text-gray-700 flex items-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      className="w-6 h-6 text-blue-500 mr-3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="font-medium">Phone:</span>{" "}
                    <a
                      href="tel:+15551234567"
                      className="hover:text-blue-600 transition-colors"
                    >
                      (555) 123-4567
                    </a>
                  </p>
                </div>
                <hr className="border-gray-200 my-6" />
                <form>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Send us a Message
                  </h2>
                  <div className="relative mb-4">
                    <label
                      htmlFor="name"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                  <div className="relative mb-4">
                    <label
                      htmlFor="email"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                  <div className="relative mb-4">
                    <label
                      htmlFor="message"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                      defaultValue={""}
                    />
                  </div>
                  <button className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg transition-colors duration-300">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
            <div className="lg:w-1/2 md:w-full w-full p-2">
              <div className="bg-gray-300 rounded-lg overflow-hidden h-full min-h-[400px] lg:min-h-full">
                <iframe
                  width="50%"
                  height="100%"
                  title="map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.67890!2d-74.0060!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259837a7b8893%3A0xc0021669c6f228b3!2sWalmart%20Supercenter!5e0!3m2!1sen!2sus!4v1633027200000!5m2!1sen!2sus"
                  style={{ filter: "grayscale(0.5) contrast(1) opacity(0.8)" }}
                  className="inset-0 w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
