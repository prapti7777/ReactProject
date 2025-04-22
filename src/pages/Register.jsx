import React, { useState } from "react";
import Input from "@/component/UI/Input";
import Button from "@/component/UI/Button";
import Card from "@/component/UI/Card";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  // Initial form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Image states (not stored in backend yet)
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Validation errors and submit state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle text input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle profile image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate form data before submission
  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Full name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords do not match.";
    return newErrors;
  };

  // Handle form submission
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
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      if (profileImage) {
        formDataToSend.append("profileImage", profileImage);
      }
  
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        body: formDataToSend,
      });
  
      const text = await response.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch {
        result = { message: text || "Unknown error occurred." };
      }
  
      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }
  
      alert(result.message || "Registration successful! Please log in.");
      navigate("/login");
    } catch (error) {
      alert(error.message || "An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Chef Registration</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <Input
            label="Full Name"
            id="name"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />

          {/* Email */}
          <Input
            label="Email"
            id="email"
            type="email"
            placeholder="chef@recipenest.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          {/* Password */}
          <Input
            label="Password"
            id="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          {/* Confirm Password */}
          <Input
            label="Confirm Password"
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />

          {/* Profile Image Upload */}
          <div>
            <label className="block font-medium mb-1">Profile Image (not yet stored)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-700"
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className="w-24 h-24 object-cover rounded-full mx-auto border"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            variant="primary"
            className="w-full"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Register;
