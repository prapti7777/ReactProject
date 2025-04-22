import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/chefs', label: 'Chefs' },
    { path: '/recipes', label: 'Recipes' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <nav className="flex items-center justify-between px-6 lg:px-20 py-4 relative">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-600">
          RecipeNest
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 font-medium text-gray-700">
          {navLinks.map(({ path, label }) => (
            <li key={path}>
              <Link
                to={path}
                className={`hover:text-green-600 transition ${
                  isActive(path) ? 'text-green-600 font-semibold' : ''
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Login Button */}
        <Link
          to="/login"
          className="hidden md:inline-block ml-4 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300"
        >
          Login
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu with Animation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full bg-white shadow-md md:hidden flex flex-col items-center gap-4 py-6 z-40"
            >
              {navLinks.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={closeMenu}
                  className={`text-gray-700 font-medium hover:text-green-600 ${
                    isActive(path) ? 'text-green-600 font-semibold' : ''
                  }`}
                >
                  {label}
                </Link>
              ))}

              <Link
                to="/login"
                onClick={closeMenu}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
              >
                Login
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
