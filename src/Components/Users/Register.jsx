import React, { useState } from "react";
import app from "../../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
// import Header from "./Header";
// import Footer from "./Footer";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const auth = getAuth(app);

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "", // new

    email: "",
    password: "",
  });

  // Handle input changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Common validation logic
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password } = formData;

    // 1. Empty field check
    if (!username || !email || !password) {
      await Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill in all fields!",
      });
      return;
    }

    // 2. Email validation
    const emailPattern = /^\S+@\S+\.\S+$/;
    if (!emailPattern.test(email)) {
      await Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address!",
      });
      return;
    }

    // 3. Password validation (min 6 chars, letters + numbers + special char)
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordPattern.test(password)) {
      await Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must be at least 6 characters and contain letters, numbers & special characters.",
      });
      return;
    }

    // 4. Registration
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Set display name
      await updateProfile(user, { displayName: username });

      await Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You have been registered successfully!",
      });
    } catch (error) {
      console.error(error);
      await Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message,
      });
    }
    navigate("/login");

    setFormData({ username: "", email: "", password: "" });
  };

  return (
    <>
      <div className="max-w-md mt-5 w-full mx-auto">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-96">
          <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
            Create Account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 cursor-pointer text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Register
            </button>

            <p className="text-center text-gray-600 mt-3">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
