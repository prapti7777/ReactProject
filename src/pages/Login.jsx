// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Step 1: Import

import Input from "@/component/UI/Input";
import Button from "@/component/UI/Button";
import Card from "@/component/UI/Card";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // ✅ Step 2: Initialize navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ Save token and redirect
      localStorage.setItem("token", data.token);
      alert("Login successful!");
      navigate("/chef-dashboard"); // ✅ Redirect after success

    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Chef Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Email"
            id="email"
            type="email"
            placeholder="chef@recipenest.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <Input
            label="Password"
            id="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          <Button
            variant="primary"
            className="w-full"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
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
  );
};

export default Login;
