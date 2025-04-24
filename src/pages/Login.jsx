// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "@/component/UI/Input";
import Button from "@/component/UI/Button";
import Card from "@/component/UI/Card";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
    setGeneralError("");
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fieldErrors = validate();
    if (Object.keys(fieldErrors).length) {
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/Auth/login`,
        formData
      );

      // Save token and user info if needed
      if (response.status === 200 && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("chefId", response.data.user.id); // Save user id as chefId
        navigate("/chef-dashboard");
      } else {
        setGeneralError("Invalid email or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setGeneralError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white px-4 sm:px-6 py-20">
      <div className="w-full max-w-md">
        <Card className="p-10 rounded-2xl shadow-lg border border-gray-200 bg-white">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center text-green-700 mb-2">
            Chef Login
          </h2>
          <p className="text-center text-gray-500 mb-8 text-sm">
            Sign in to manage your recipes and profile.
          </p>

          {generalError && (
            <div className="mb-4 text-sm text-red-600 text-center">
              {generalError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              id="email"
              type="email"
              placeholder="chef@recipenest.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />
            <Input
              label="Password"
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />

            <div className="flex justify-between items-center text-sm">
              <span
                className="text-green-600 cursor-pointer hover:underline"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </span>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            New User?{" "}
            <span
              className="italic text-green-600 cursor-pointer hover:underline"
              onClick={() => navigate("/register")}
            >
              Register as chef
            </span>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Login;
