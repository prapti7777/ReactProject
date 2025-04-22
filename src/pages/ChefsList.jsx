// ChefsList.jsx (Updated)
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "@/component/UI/Spinner";
import Card from "@/component/UI/Card";

const ChefsList = () => {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setChefs([
        { id: 1, name: "Chef A", description: "Italian Cuisine Expert" },
        { id: 2, name: "Chef B", description: "Vegan Specialist" },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Chefs</h2>
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {chefs.map((chef) => (
            <Card key={chef.id} className="hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">{chef.name}</h3>
              <p className="text-gray-600 mb-4">{chef.description}</p>
              <Link
                to={`/chefs/${chef.id}`}
                className="text-indigo-600 hover:underline"
              >
                View Profile →
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChefsList;
