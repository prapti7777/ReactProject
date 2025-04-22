import React, { useState } from "react";

const recipes = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    ingredients: "Spaghetti, eggs, pancetta, cheese",
    instructions: "Cook pasta, mix eggs and cheese, fry pancetta, combine.",
  },
  {
    id: 2,
    title: "Vegan Tacos",
    ingredients: "Tortilla, tofu, veggies, salsa",
    instructions: "Grill tofu and veggies, wrap in tortilla, add salsa.",
  },
];

const Recipes = () => {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Recipes</h2>
      <div className="space-y-4">
        {recipes.slice(0, showAll ? recipes.length : 1).map((recipe) => (
          <div
            key={recipe.id}
            className="border p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold">{recipe.title}</h3>
            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
            <p><strong>Instructions:</strong> {recipe.instructions}</p>
            <button
              className="text-blue-500 mt-2 hover:underline"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? "Show Less" : "Read More"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;