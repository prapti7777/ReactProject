import React, { useState } from "react";
import Button from "@/component/UI/Button";

const ManageProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    specialty: "",
    experience: "",
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage") {
      setFormData({ ...formData, profileImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile submitted:", formData);
    alert("Profile saved (static for now)");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Chef Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block font-medium mb-1">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* Specialty */}
        <div>
          <label className="block font-medium mb-1">Specialty</label>
          <input
            type="text"
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Experience */}
        <div>
          <label className="block font-medium mb-1">Experience (years)</label>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Profile Image */}
        <div>
          <label className="block font-medium mb-1">Profile Image</label>
          <input
            type="file"
            name="profileImage"
            onChange={handleChange}
            accept="image/*"
            className="w-full"
          />
        </div>

        {/* Submit */}
        <Button type="submit" className="w-full">
          Save Profile
        </Button>
      </form>
    </div>
  );
};

export default ManageProfile;
