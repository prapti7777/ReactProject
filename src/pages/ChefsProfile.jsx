import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Star } from "lucide-react";

const ChefProfile = () => {
  const { id } = useParams();
  const [chef, setChef] = useState(null);
  const [review, setReview] = useState({ stars: 0, comment: "" });
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Simulated fetch
    const chefsData = JSON.parse(localStorage.getItem("chefsData")) || [];
    const chefFound = chefsData.find((c) => c.id === parseInt(id));
    setChef(chefFound);
    setReviews(chefFound?.reviews || []);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (review.stars === 0) return;
    const newReviews = [...reviews, { ...review, name: "You" }];
    setReviews(newReviews);
    setReview({ stars: 0, comment: "" });

    // Update localStorage
    const chefsData = JSON.parse(localStorage.getItem("chefsData")) || [];
    const updatedData = chefsData.map((c) =>
      c.id === chef.id ? { ...c, reviews: newReviews } : c
    );
    localStorage.setItem("chefsData", JSON.stringify(updatedData));
  };

  const renderStars = (count, interactive = false) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={20}
          fill={i <= count ? "#facc15" : "none"}
          stroke="#facc15"
          className={interactive ? "cursor-pointer" : ""}
          onClick={() => interactive && setReview({ ...review, stars: i })}
        />
      ))}
    </div>
  );

  if (!chef) {
    return <div className="p-6 text-center text-red-600">Chef not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="flex flex-col items-center text-center mb-8">
        <img
          src={chef.image}
          alt={chef.name}
          className="w-36 h-36 rounded-full object-cover shadow mb-4"
        />
        <h1 className="text-3xl font-bold text-gray-800">{chef.name}</h1>
        <p className="text-gray-500">{chef.description}</p>
        <div className="mt-2">{renderStars(Math.round(chef.rating))}</div>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl shadow mb-10">
        <h2 className="text-xl font-semibold mb-4">Rate This Chef</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">{renderStars(review.stars, true)}</div>
          <textarea
            className="w-full border rounded p-2 text-sm"
            placeholder="Leave a comment (optional)"
            value={review.comment}
            onChange={(e) => setReview({ ...review, comment: e.target.value })}
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-500 transition"
          >
            Submit Rating
          </button>
        </form>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Reviews</h3>
        <ul className="space-y-4">
          {reviews.map((r, index) => (
            <li
              key={index}
              className="bg-white p-4 border rounded shadow-sm text-sm"
            >
              <div className="flex justify-between mb-1">
                <strong>{r.name}</strong>
                <div>{renderStars(r.stars)}</div>
              </div>
              <p className="text-gray-600">{r.comment}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChefProfile;
