import React, { useState } from "react";
import {
  FaGoogle,
  FaFacebook,
  FaTwitter,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/user/navbar/navbar";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion"; // Import motion for animations

const Login = () => {
  const { login } = useAuth();
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(emailOrMobile, password);
      if (response === "Login successful") {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | Mera Bestie</title>
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300 py-12 px-4 sm:px-6 lg:px-8 flex flex-col animate-fade-in">
        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar />
        </div>
        <div className="flex-grow flex items-center justify-center mt-16">
          <motion.div
            className="w-full max-w-md bg-white shadow-md rounded-lg p-8"
            whileHover={{ scale: 1.05 }} // Scale effect on hover
            transition={{ duration: 0.3 }} // Smooth transition
          >
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 animate-text-focus-in">
              Login
            </h2>
            <form onSubmit={handleSubmit}>
              {/* Email or Mobile Input */}
              <motion.div
                className="mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <label className="block text-lg text-gray-700">
                  Email or Mobile
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={emailOrMobile}
                  onChange={(e) => setEmailOrMobile(e.target.value)}
                />
              </motion.div>

              {/* Password Input */}
              <motion.div
                className="mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <label className="block text-lg text-gray-700">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-2 text-gray-700 hover:text-pink-500 transition-all"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition-all duration-300 transform hover:scale-105 animate-bounce-on-hover text-lg"
              >
                Login
              </motion.button>
            </form>

            {/* Social Media Icons */}
            <div className="mt-6 flex justify-center space-x-4">
              <motion.button
                className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-transform duration-300 transform hover:rotate-12 animate-float"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <FaFacebook />
              </motion.button>
              <motion.button
                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-transform duration-300 transform hover:rotate-12 animate-float"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <FaGoogle />
              </motion.button>
              <motion.button
                className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500 transition-transform duration-300 transform hover:rotate-12 animate-float"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <FaTwitter />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Login;
