// src/pages/ChefLogout.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/component/UI/Button";
import Card from "@/component/UI/Card";
import { LogOut } from "lucide-react";

const ChefLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-white px-4 py-12">
      <Card className="w-full max-w-md text-center p-8 shadow-xl rounded-2xl">
        <div className="flex flex-col items-center gap-4">
          <LogOut size={48} className="text-green-600" />
          <h2 className="text-3xl font-bold text-gray-800">Ready to Log Out?</h2>
          <p className="text-gray-600 text-sm max-w-sm">
            Thank you for managing your recipes with RecipeNest. Click below to log out securely.
          </p>
          <Button
            onClick={handleLogout}
            variant="primary"
            className="w-full mt-4"
          >
            Log Out
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ChefLogout;
