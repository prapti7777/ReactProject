import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import ManageProfile from "./ManageProfile";
import ManageRecipes from "./ManageRecipes";
import { User, UtensilsCrossed, BarChart2, LogOut } from "lucide-react";
import Card from "@/component/UI/Card";

const ChefDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [chefsCount, setChefsCount] = useState(0);
  const [recipesCount, setRecipesCount] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const chefsData = JSON.parse(localStorage.getItem("chefsData")) || [];
    setChefsCount(1);
    setRecipesCount(chefsData.reduce((sum, chef) => sum + (chef.recipes?.length || 0), 0));

    const allReviews = chefsData.flatMap(c => c.reviews || []);
    setReviewsCount(allReviews.length);

    const totalRating = chefsData.reduce((sum, chef) => sum + (chef.rating || 0), 0);
    setAverageRating(chefsData.length ? (totalRating / chefsData.length).toFixed(1) : 0);
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
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-6 py-3 transition-colors hover:bg-green-50 ${activeTab === tab.id ? 'bg-green-100 text-green-700' : 'text-gray-700'}`}
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
        <h1 className="text-3xl font-bold text-gray-800 mb-6 capitalize">{activeTab}</h1>

        {activeTab === 'overview' && (
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

        {activeTab === 'profile' && (
          <div className="mt-6 overflow-visible">
            <ManageProfile />
          </div>
        )}

        {activeTab === 'recipes' && (
          <div className="mt-6 overflow-visible">
            <ManageRecipes />
          </div>
        )}
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm text-center">
            <p className="text-lg font-semibold mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChefDashboard;
