// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCart, User, Home, Boxes, Menu, X, Moon, Sun } from "lucide-react";
import { useSearch } from "../context/SearchContext";

export default function Navbar() {
  const { searchTerm, setSearchTerm } = useSearch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  // Toggle Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md px-6 py-4 transition-colors">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold text-indigo-800 dark:text-indigo-400">
          ShopSmart
        </NavLink>

        {/* Search Bar (Desktop Only) */}
        <div className="hidden md:flex flex-1 justify-center relative mx-6">
          <div className="w-full max-w-md relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search for products..."
              className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Dark Mode Toggle */}
        {/* <button
          onClick={() => setDarkMode(!darkMode)}
          className="mr-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition"
        >
          {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-800" />}
        </button> */}

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700 dark:text-gray-200"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-10 text-gray-700 dark:text-gray-200">
          <NavLink to="/" className={({ isActive }) =>
            `flex items-center gap-1 transition-colors duration-200 ${
              isActive ? "text-indigo-600 dark:text-indigo-400 font-semibold" : "hover:text-indigo-600 dark:hover:text-indigo-400"
            }`}>
            <Home size={22} />
            <span className="hidden md:inline">Home</span>
          </NavLink>

          <NavLink to="/products" className={({ isActive }) =>
            `flex items-center gap-1 transition-colors duration-200 ${
              isActive ? "text-indigo-600 dark:text-indigo-400 font-semibold" : "hover:text-indigo-600 dark:hover:text-indigo-400"
            }`}>
            <Boxes size={22} />
            <span className="hidden md:inline">Products</span>
          </NavLink>

          <NavLink to="/cart" className={({ isActive }) =>
            `flex items-center transition-colors duration-200 ${
              isActive ? "text-indigo-600 dark:text-indigo-400" : "hover:text-indigo-600 dark:hover:text-indigo-400"
            }`}>
            <ShoppingCart size={22} />
          </NavLink>

          {/* <NavLink to="/register" className={({ isActive }) =>
            `flex items-center transition-colors duration-200 ${
              isActive ? "text-indigo-600 dark:text-indigo-400" : "hover:text-indigo-600 dark:hover:text-indigo-400"
            }`}>
            <User size={22} />
          </NavLink> */}
        </div>
      </div>

      {/* Search Bar (Mobile Only) */}
      <div className="mt-3 md:hidden flex justify-center relative">
        <div className="w-full max-w-md relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search for products..."
            className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col space-y-3 p-4">
            <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
            <NavLink to="/products" onClick={() => setMenuOpen(false)}>Products</NavLink>
            <NavLink to="/cart" onClick={() => setMenuOpen(false)}>Cart</NavLink>
            <NavLink to="/register" onClick={() => setMenuOpen(false)}>Register</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}
