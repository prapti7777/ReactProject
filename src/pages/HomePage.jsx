import React from "react";
import { Link } from "react-router-dom";
import Button from "../component/UI/Button";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <section className="min-h-screen bg-white text-gray-800">
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <motion.h1
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Welcome to <span className="text-green-600">RecipeNest 🍳</span>
        </motion.h1>

        <p className="text-lg mb-6">
          Discover mouth-watering recipes and connect with expert chefs from around the world.
        </p>

        <div className="flex justify-center flex-wrap gap-4 mb-10">
          <Link to="/chefs">
            <Button>Explore Chefs</Button>
          </Link>
          <Link to="/recipes">
            <Button variant="secondary">Browse Recipes</Button>
          </Link>
        </div>

        <div className="text-left max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-3">✨ What is RecipeNest?</h2>
          <p className="mb-4 text-gray-700">
            RecipeNest is your one-stop platform for cooking inspiration. Whether you're a foodie or a
            professional chef, you’ll find and share amazing recipes with ease.
          </p>

          <h3 className="text-xl font-semibold mb-3">Why You'll Love Us</h3>
          <ul className="space-y-3 text-gray-700">
            <li>
              <span className="font-bold">✔ Verified Chefs:</span> Connect with experts who know their craft.
            </li>
            <li>
              <span className="font-bold">✔ Diverse Recipes:</span> Browse a variety of cuisines and dietary options.
            </li>
            <li>
              <span className="font-bold">✔ User Friendly:</span> A clean, modern design that works on any device.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
