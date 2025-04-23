import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-gray-950 text-gray-300 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">

      {/* Logo & Description */}
      <div className="flex flex-col gap-4">
        <Link to="/" className="text-2xl font-bold text-green-500 hover:text-green-400 transition-colors">
          RecipeNest
        </Link>
        <p className="text-sm text-gray-400 max-w-sm">
          Your go-to platform for discovering, sharing, and enjoying amazing recipes from talented chefs.
        </p>
      </div>

      {/* Links and About */}
      <div className="flex flex-col md:flex-row justify-between gap-12">

        {/* Site Links */}
        <div>
          <h3 className="text-lg font-semibold text-green-500 mb-3">Site Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-green-400 transition">Home</Link></li>
            <li><Link to="/chefs" className="hover:text-green-400 transition">Chefs</Link></li>
            <li><Link to="/recipes" className="hover:text-green-400 transition">Recipes</Link></li>
            <li><Link to="/contact" className="hover:text-green-400 transition">Contact</Link></li>
          </ul>
        </div>

        {/* About Us */}
        <div>
          <h3 className="text-lg font-semibold text-green-500 mb-3">About Us</h3>
          <p className="text-sm text-gray-400 max-w-xs">
            At RecipeNest, we believe that food connects people. Join our community to explore, cook, and share.
          </p>
        </div>

      </div>

      {/* Social & Contact */}
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-lg font-semibold text-green-500 mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-sm">
            <a href="#" className="hover:text-green-400 transition">Facebook</a>
            <a href="#" className="hover:text-green-400 transition">Instagram</a>
            <a href="#" className="hover:text-green-400 transition">Twitter</a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-green-500 mb-3">Contact Info</h3>
          <p className="text-sm text-gray-400">Email: info@recipenest.com</p>
          <p className="text-sm text-gray-400">Phone: +1 (555) 123‑4567</p>
        </div>
      </div>

    </div>
  </footer>
);

export default Footer;
