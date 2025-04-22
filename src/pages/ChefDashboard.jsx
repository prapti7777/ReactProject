import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for routing
import ManageProfile from "./ManageProfile";
import ManageRecipes from "./ManageRecipes";

const ChefDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate(); // Initialize useNavigate

  // Navigate to the "Chef Profile" page
  const handleManageProfile = () => {
    navigate("/chef-dashboard/profile");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
        Chef Dashboard
      </h1>

      <div className="flex justify-center mb-6 gap-4">
        {/* Manage Profile Button */}
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-4 py-2 rounded ${
            activeTab === "profile"
              ? "bg-green-600 text-white"
              : "bg-white border border-green-600 text-green-600"
          }`}
        >
          Manage Profile
        </button>

        {/* Manage Recipes Button */}
        <button
          onClick={() => setActiveTab("recipes")}
          className={`px-4 py-2 rounded ${
            activeTab === "recipes"
              ? "bg-green-600 text-white"
              : "bg-white border border-green-600 text-green-600"
          }`}
        >
          Manage Recipes
        </button>
      </div>

      {/* Displaying the content based on the active tab */}
      <div className="bg-white p-6 rounded-lg shadow">
        {activeTab === "profile" ? (
          <ManageProfile />
        ) : (
          <ManageRecipes />
        )}
      </div>

      {/* Button to go to Profile Creation Form */}
      <div className="mt-6 text-center">
        <button
          onClick={handleManageProfile}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Create/Update Profile
        </button>
      </div>
    </div>
  );
};

export default ChefDashboard;
