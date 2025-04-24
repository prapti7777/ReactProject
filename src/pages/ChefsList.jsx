import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "@/component/UI/Card";
import { Star } from "lucide-react";

const ChefsList = () => {
  const [chefs, setChefs] = useState([]);

  useEffect(() => {
    const chefData = [
      {
        id: 1,
        name: "Chef A",
        description: "Italian Cuisine Expert",
        image: "/Images/chef1.jpeg",
        rating: 4.5,
        reviews: [
          { name: "Alice", comment: "Loved the pasta!", stars: 5 },
          { name: "Bob", comment: "Very skilled chef", stars: 4 },
        ],
      },
      {
        id: 2,
        name: "Chef B",
        description: "Vegan Specialist",
        image: "/Images/chef2.jpeg",
        rating: 4.2,
        reviews: [
          { name: "Emily", comment: "Delicious vegan dishes!", stars: 5 },
          { name: "David", comment: "Great creativity", stars: 3 },
        ],
      },
      {
        id: 3,
        name: "Chef C",
        description: "French Pastry Chef",
        image: "/Images/chef3.jpeg",
        rating: 4.7,
        reviews: [
          { name: "Sophie", comment: "Best cakes ever!", stars: 5 },
          { name: "Leo", comment: "Sweet and perfect", stars: 4 },
        ],
      },
      {
        id: 4,
        name: "Chef D",
        description: "Japanese Cuisine Master",
        image: "/Images/chef4.jpeg",
        rating: 4.8,
        reviews: [],
      },
      {
        id: 5,
        name: "Chef E",
        description: "BBQ & Grill Specialist",
        image: "/Images/chef5.jpeg",
        rating: 4.4,
        reviews: [],
      },
      {
        id: 6,
        name: "Chef F",
        description: "Seafood Connoisseur",
        image: "/Images/chef6.jpeg",
        rating: 4.6,
        reviews: [],
      },
    ];
    setChefs(chefData);
    localStorage.setItem("chefsData", JSON.stringify(chefData));
  }, []);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    return (
      <div className="flex items-center gap-1 text-yellow-400 text-sm">
        {Array.from({ length: fullStars }, (_, i) => (
          <Star key={i} size={16} fill="currentColor" stroke="none" />
        ))}
        {halfStar && <Star size={16} fill="currentColor" stroke="none" style={{ opacity: 0.5 }} />}
        <span className="text-gray-500 ml-2 text-sm">({rating.toFixed(1)})</span>
      </div>
    );
  };

  return (
    <section className="min-h-screen bg-white px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-green-600 mb-4">
          Meet Our Expert Chefs
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Explore our curated list of chefs from around the world who bring flavor and expertise to your table.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {chefs.map((chef) => (
            <Card
              key={chef.id}
              className="p-6 rounded-2xl bg-white shadow-md hover:shadow-lg transition duration-300 border border-gray-100"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <img
                  src={chef.image}
                  alt={chef.name}
                  className="w-28 h-28 rounded-full object-cover shadow"
                />
                <h3 className="text-2xl font-semibold text-gray-800">{chef.name}</h3>
                <p className="text-gray-600 text-sm">{chef.description}</p>
                {renderStars(chef.rating)}
                <Link
                  to={`/chefs/${chef.id}`}
                  className="mt-3 text-green-600 font-medium hover:underline"
                >
                  View Profile →
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChefsList;
