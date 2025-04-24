// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "@/component/UI/Input";
import Button from "@/component/UI/Button";
import Card from "@/component/UI/Card";

const Register = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Image preview state
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Validation & submit state
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Text input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
    setGeneralError("");
  };

  // Image file change & preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Validate before submit
  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Full name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords do not match.";
    return newErrors;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fieldErrors = validate();
    if (Object.keys(fieldErrors).length) {
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setGeneralError("");
    setIsSubmitting(true);

    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("password", formData.password);
      if (profileImage) {
        payload.append("profileImage", profileImage);
      }

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          method: "POST",
          body: payload,
        }
      );

      const text = await res.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch {
        result = { message: text || "Unknown error occurred." };
      }

      if (!res.ok) {
        throw new Error(result.message || "Registration failed");
      }

      // Success!
      navigate("/login");
    } catch (err) {
      setGeneralError(err.message || "Network error. Please try again.");
      console.error("Registration error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white px-4 sm:px-6 py-20">
      <div className="w-full max-w-md">
        <Card className="p-10 rounded-2xl shadow-lg border border-gray-200 bg-white">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center text-green-700 mb-2">
            Chef Registration
          </h2>
          <p className="text-center text-gray-500 mb-8 text-sm">
            Create your chef account to share and explore recipes.
          </p>

          {generalError && (
            <div className="mb-4 text-sm text-red-600 text-center">
              {generalError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Full Name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              error={errors.name}
              required
            />
            <Input
              label="Email"
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="chef@recipenest.com"
              error={errors.email}
              required
            />
            <Input
              label="Password"
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              error={errors.password}
              required
            />
            <Input
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              error={errors.confirmPassword}
              required
            />

            <div>
              <label className="block font-medium mb-1">
                Profile Image (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-700"
              />
              {imagePreview && (
                <div className="mt-2 text-center">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-full mx-auto border"
                  />
                </div>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <span
              className="text-green-700 font-medium cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Login here
            </span>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Register;
