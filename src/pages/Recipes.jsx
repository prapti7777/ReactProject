import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Utensils, BookOpen, ChefHat } from "lucide-react";
import Button from "@/component/UI/Button";

const recipes = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    image: "/Images/spaghetticarbonara.jpeg",
    ingredients: "Spaghetti, eggs, pancetta, cheese",
    instructions: "Cook pasta, mix eggs and cheese, fry pancetta, combine.",
  },
  {
    id: 2,
    title: "Vegan Tacos",
    image: "/Images/vegantacos.jpeg",
    ingredients: "Tortilla, tofu, veggies, salsa",
    instructions: "Grill tofu and veggies, wrap in tortilla, add salsa.",
  },
  {
    id: 3,
    title: "Butter Chicken",
    image: "/Images/butterChicken.jpeg",
    ingredients: "Chicken, butter, cream, tomato puree, spices",
    instructions: "Marinate chicken, cook in butter sauce, simmer.",
  },
  {
    id: 4,
    title: "Mushroom Risotto",
    image: "/Images/mushroomrisotto.jpeg",
    ingredients: "Arborio rice, mushrooms, broth, Parmesan",
    instructions: "Slow cook rice with broth, stir in mushrooms and cheese.",
  },
  {
    id: 5,
    title: "Classic Cheeseburger",
    image: "/Images/cheeseburger.jpeg",
    ingredients: "Beef patty, cheese, bun, lettuce, tomato",
    instructions: "Grill patty, layer with toppings, assemble in bun.",
  },
  {
    id: 6,
    title: "Margherita Pizza",
    image: "/Images/pizza.jpeg",
    ingredients: "Dough, tomatoes, mozzarella, basil",
    instructions: "Bake crust with sauce, cheese, and fresh basil.",
  },
  {
    id: 7,
    title: "Chicken Biryani",
    image: "/Images/chickenbiryani.jpg",
    ingredients: "Basmati rice, chicken, spices, yogurt",
    instructions: "Layer marinated chicken with rice, cook on low heat.",
  },
  {
    id: 8,
    title: "Caesar Salad",
    image: "/Images/caesersalad.jpeg",
    ingredients: "Lettuce, croutons, Parmesan, Caesar dressing",
    instructions: "Toss ingredients and serve fresh.",
  },
  {
    id: 9,
    title: "Pad Thai",
    image: "/Images/padthai.jpeg",
    ingredients: "Rice noodles, shrimp, peanuts, tamarind sauce",
    instructions: "Stir-fry noodles with sauce, shrimp, and garnish.",
  },
  {
    id: 10,
    title: "French Toast",
    image: "/Images/frenchtoast.jpeg",
    ingredients: "Bread, eggs, milk, cinnamon, syrup",
    instructions: "Dip bread in egg mix, cook on skillet, add syrup.",
  },
  {
    id: 11,
    title: "Pancakes with Berries",
    image: "/Images/pancakes.jpg",
    ingredients: "Flour, eggs, milk, berries, syrup",
    instructions: "Make batter, cook on pan, top with berries and syrup.",
  },
  {
    id: 12,
    title: "Greek Salad",
    image: "/Images/Greeksalad.webp",
    ingredients: "Tomatoes, cucumber, olives, feta cheese",
    instructions: "Chop and mix all ingredients, drizzle olive oil.",
  },
];


const Recipes = () => {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-50 p-6">
      <h2 className="text-4xl font-bold mb-10 text-center text-green-800">
        <ChefHat className="inline-block w-8 h-8 mr-2" />
        Our Favorite Recipes
      </h2>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {recipes.map((recipe) => (
          <motion.div
            key={recipe.id}
            className="bg-white border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-2xl font-semibold text-green-700 flex items-center mb-2">
              <Utensils className="w-5 h-5 mr-2" />
              {recipe.title}
            </h3>

            <AnimatePresence>
              {expanded[recipe.id] ? (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <p className="text-gray-700 mb-2">
                    <strong>Ingredients:</strong> {recipe.ingredients}
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>Instructions:</strong> {recipe.instructions}
                  </p>
                </motion.div>
              ) : (
                <p className="text-gray-500 italic mb-4">
                  Click to view ingredients & instructions.
                </p>
              )}
            </AnimatePresence>

            <Button
              onClick={() => toggleExpand(recipe.id)}
              variant="secondary"
              className="text-sm"
            >
              <BookOpen className="inline-block w-4 h-4 mr-1" />
              {expanded[recipe.id] ? "Show Less" : "Read More"}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
