import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ManageProfile from "./ManageProfile";
import ManageRecipes from "./ManageRecipes";
import { User, UtensilsCrossed, BarChart2, LogOut } from "lucide-react";
import Card from "@/component/UI/Card";
import Button from "@/component/UI/Button";
import { getAllRecipes } from "@/services/recipeService";

const ChefDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [recipesCount, setRecipesCount] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await getAllRecipes();
        const recipes = res.data || [];

        setRecipesCount(recipes.length);

        const allReviews = recipes.flatMap(recipe => recipe.reviews || []);
        setReviewsCount(allReviews.length);

        const totalReviewScore = allReviews.reduce(
          (sum, review) => sum + (review.rating || 0),
          0
        );
        const avg = allReviews.length ? (totalReviewScore / allReviews.length).toFixed(1) : 0;
        setAverageRating(avg);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const confirmLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart2 },
    { id: "profile", label: "Profile", icon: User },
    { id: "recipes", label: "Recipes", icon: UtensilsCrossed },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 text-center">
          <h2 className="text-xl font-bold text-green-600">RecipeNest</h2>
        </div>
        <nav className="flex flex-col">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-6 py-3 transition-colors hover:bg-green-50 ${
                activeTab === tab.id
                  ? "bg-green-100 text-green-700"
                  : "text-gray-700"
              }`}
            >
              <tab.icon size={18} /> {tab.label}
            </button>
          ))}
        </nav>
        <div className="mt-auto p-6">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center gap-2 text-red-500 hover:text-red-600"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 capitalize">
          {activeTab}
        </h1>

        {activeTab === "overview" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-4 bg-white rounded-2xl shadow">
              <h3 className="text-gray-500">Total Recipes</h3>
              <p className="text-2xl font-bold text-green-600">{recipesCount}</p>
            </Card>
            <Card className="p-4 bg-white rounded-2xl shadow">
              <h3 className="text-gray-500">Total Reviews</h3>
              <p className="text-2xl font-bold text-green-600">{reviewsCount}</p>
            </Card>
            <Card className="p-4 bg-white rounded-2xl shadow">
              <h3 className="text-gray-500">Average Rating</h3>
              <p className="text-2xl font-bold text-green-600">{averageRating} ⭐</p>
            </Card>
            <Card className="p-4 bg-white rounded-2xl shadow">
              <h3 className="text-gray-500">Profile Completeness</h3>
              <p className="text-2xl font-bold text-green-600">80%</p>
            </Card>
          </div>
        )}

        {activeTab === "profile" && <ManageProfile />}
        {activeTab === "recipes" && <ManageRecipes />}
      </main>

      {/* Logout Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm text-center">
            <p className="text-lg font-semibold mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-center gap-4">
              <Button variant="danger" onClick={confirmLogout}>
                Yes
              </Button>
              <Button onClick={() => setShowLogoutConfirm(false)}>
                No
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChefDashboard;
