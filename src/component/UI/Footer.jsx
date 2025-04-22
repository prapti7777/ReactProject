import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 py-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6"> {/* Reduced gap between columns */}
      
      {/* Logo */}
      <div className="flex justify-start mb-2 md:mb-0"> {/* Adjusted margin for Logo */}
        <Link to="/" className="text-2xl font-bold text-white">
          RecipeNest
        </Link>
      </div>
      
      {/* Site Links & About Us side by side */}
      <div className="flex flex-col md:flex-row justify-between gap-8">
          
        {/* Site Links */}
        <div className="flex flex-col mb-4 md:mb-0">
          <h3 className="text-lg font-semibold text-white mb-2">Site Links</h3>
          <ul className="space-y-1">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/chefs" className="hover:underline">Chefs</Link></li>
            <li><Link to="/recipes" className="hover:underline">Recipes</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* About Us */}
        <div className="flex flex-col mb-4 md:mb-15">
          <h3 className="text-lg font-semibold text-white mb-2">About Us</h3>
          <p className="text-gray-400 text-sm max-w-xs">
            RecipeNest is a platform where chefs can share their recipes and connect with food lovers.
          </p>
        </div>

      </div>
      
      {/* Follow Us & Contact Info */}
      <div className="flex flex-col mb-12 md:mb-0">
        <h3 className="text-lg font-semibold text-white mb-2">Follow Us</h3>
        <div className="flex space-x-4 mb-4">
          <a href="#" className="hover:text-white">Facebook</a>
          <a href="#" className="hover:text-white">Instagram</a>
          <a href="#" className="hover:text-white">Twitter</a>
        </div>
        
        <h3 className="text-lg font-semibold text-white mb-2">Contact Info</h3>
        <p className="text-gray-400 text-sm">Email: info@recipenest.com</p>
        <p className="text-gray-400 text-sm">Phone: +1 (555) 123‑4567</p>
      </div>
    </div>
  </footer>
);

export default Footer;
