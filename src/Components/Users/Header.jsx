import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaStar, FaUser } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import app from "../../firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const auth = getAuth(app);

export default function Header() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  // Fetch cart items
  useEffect(() => {
    axios.get("http://localhost:8001/cart").then((res) => {
      setCart(res.data);
    });
  }, []);

  // Listen to auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      await signOut(auth);
      setUser(null);
      navigate("/");
    }
  };

  const linkClasses =
    "hover:text-yellow-300 transition-all duration-300 ease-in-out font-medium p-2 rounded-lg hover:bg-blue-700/50";

  return (
    <nav className="bg-blue-600 text-white p-4 sticky top-0 z-50 shadow-xl transition-shadow duration-300">
      <ul className="flex items-center justify-between mx-auto max-w-7xl">
        {/* Logo */}
        <li className="flex-shrink-0">
          <Link
            to="/"
            className="flex items-center space-x-1 transition-all duration-300 transform hover:scale-105"
          >
            <span className="text-3xl font-black hidden sm:inline">
              Walmart
            </span>
            <FaStar className="text-3xl text-yellow-400" />
          </Link>
        </li>

        {/* Search Bar */}
        <li className="flex-grow mx-4 hidden md:block">
          <div className="relative">
            <input
              type="search"
              placeholder="Search thousands of Walmart products..."
              className="rounded-full w-180 ms-25 p-2.5 pl-4 text-black bg-white transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-yellow-400/70 shadow-inner"
            />
          </div>
        </li>

        {/* Right Links */}
        <div className="flex items-center space-x-2 sm:space-x-6">
          {/* Account Section */}
          <li>
            {user ? (
              <div className="flex items-center space-x-1 relative group">
                <FaUser className="text-xl transition-transform duration-300 group-hover:rotate-12" />
                <span className={`hidden sm:inline ${linkClasses}`}>
                  Hello, {user.displayName}
                </span>
                <div className="absolute top-10 right-0 w-32 bg-white text-black rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-200 rounded-md"
                  >
                    Logout
                  </button>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-200 rounded-md"
                  >
                    Profile
                  </Link>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 font-medium hover:text-yellow-300 transition-all duration-300"
              >
                <FaUser className="text-xl" />
                <span className={`hidden sm:inline ${linkClasses}`}>
                  Account
                </span>
              </Link>
            )}
          </li>

          {/* Cart Section */}
          <li>
            <Link
              to="/cart"
              className="flex items-center space-x-1 font-medium"
            >
              <FaShoppingCart className="text-xl transition-transform duration-300 hover:scale-110" />
              <span className="relative">
                <span className={`hidden sm:inline ${linkClasses}`}>Cart</span>
                <span className="absolute -top-3 -right-4 inline-flex items-center justify-center h-5 w-5 bg-red-500 text-xs font-bold rounded-full transition-all duration-500 transform hover:scale-125 hover:bg-red-400">
                  {cart.length}
                </span>
              </span>
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
}
