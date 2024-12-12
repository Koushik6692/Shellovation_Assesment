import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaSearch,
  FaTimes,
  FaBars,
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaGift,
  FaPhone,
} from "react-icons/fa";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleProfileMenu = () => setIsProfileMenuOpen((prev) => !prev);
  const toggleSearch = () => setIsSearchOpen((prev) => !prev);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
      }
    };

    const fetchUserName = async () => {
      const userId = sessionStorage.getItem("userId");
      if (userId) {
        try {
          const response = await fetch(
            `https://ecommercebackend-8gx8.onrender.com/auth/user/${userId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          const data = await response.json();
          setUserName(data.name);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserName();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("userId");
    window.location.reload();
  };

  const userId = sessionStorage.getItem("userId");

  return (
    <nav className="bg-white text-black">
      {/* Promotional Banner */}
      <div className="bg-white text-pink-500 py-2 text-center text-sm border-b">
        <span className="inline-flex items-center">
          <FaGift className="mr-2" />
          USE CODE OFF10 TO GET FLAT 10% OFF ON ORDERS ABOVE RS.499 | FREE
          SHIPPING | COD AVAILABLE
        </span>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-0">
          <div className="h-[60px] flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden text-black"
              aria-expanded={isMenuOpen}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>

            {/* Logo */}
            <Link to="/" className="text-2xl flex items-center">
              <span className="font-['Bodoni_MT'] font-bold text-xl">
                MERA Bestie
              </span>
            </Link>

            {/* Search Bar */}
            <div className={`hidden md:block max-w-xl w-full mx-8`}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Gifts for your loved ones...."
                  className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <FaSearch className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-6">
              <button
                aria-label="Search"
                className="md:hidden hover:text-gray-500"
                onClick={toggleSearch}
                aria-expanded={isSearchOpen}
              >
                <FaSearch className="w-4 h-4" />
              </button>
              <Link
                to="/cart"
                className="hover:text-gray-500 flex items-center"
              >
                <FaShoppingCart className="w-4 h-4" />
                <span className="ml-2 hidden md:inline">Cart</span>
              </Link>
              <button
                aria-label="Wishlist"
                className="hover:text-gray-500 hidden md:block"
              >
                <FaHeart className="w-4 h-4" />
              </button>
              <div className="relative">
                <button
                  aria-label="Profile"
                  onClick={toggleProfileMenu}
                  className="hover:text-gray-500 flex items-center"
                  aria-expanded={isProfileMenuOpen}
                >
                  <FaUser className="w-4 h-4" />
                  <span className="ml-2 hidden md:inline">
                    {userId ? `Hi, ${userName}` : "Hi, Profile"}
                  </span>
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-[120px] bg-white border rounded shadow-lg z-20">
                    {userId ? (
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Login
                        </Link>
                        <Link
                          to="/Signup"
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Signup
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Hamburger) */}
      <div
        className={`lg:hidden bg-white p-4 ${isMenuOpen ? "block" : "hidden"}`}
      >
        <div className="flex flex-col space-y-4 text-sm font-normal">
          <Link to="/" className="hover:text-gray-900">
            HOME
          </Link>
          <Link to="/shop" className="hover:text-gray-900">
            SHOP
          </Link>
          <Link to="/contact" className="hover:text-gray-900">
            CONTACT
          </Link>
          <Link to="/occasions" className="hover:text-gray-900">
            OCCASIONS
          </Link>
          <Link to="/about" className="hover:text-gray-900">
            ABOUT
          </Link>
        </div>
      </div>

      {/* Navigation Menu (Desktop) */}
      <div className="bg-pink-600 text-white hidden lg:block">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-0">
          <div className="h-12 flex items-center justify-between">
            <div className="flex items-center space-x-8 text-sm font-normal">
              <Link
                to="/"
                className={`hover:text-gray-200 ${
                  isActive("/") ? "text-gray-900" : ""
                }`}
              >
                HOME
              </Link>
              <Link
                to="/shop"
                className={`hover:text-gray-200 ${
                  isActive("/shop") ? "text-gray-900" : ""
                }`}
              >
                SHOP
              </Link>
              <Link
                to="/contact"
                className={`hover:text-gray-200 ${
                  isActive("/contact") ? "text-gray-900" : ""
                }`}
              >
                CONTACT
              </Link>
              <Link
                to="/occasions"
                className={`hover:text-gray-200 ${
                  isActive("/occasions") ? "text-gray-900" : ""
                }`}
              >
                OCCASIONS
              </Link>
              <Link
                to="/about"
                className={`hover:text-gray-200 ${
                  isActive("/about") ? "text-gray-900" : ""
                }`}
              >
                ABOUT
              </Link>
            </div>
            <div className="hidden lg:flex items-center text-sm font-normal">
              <FaPhone className="w-4 h-4 mr-2" />
              <span>(219) 555-0114</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
