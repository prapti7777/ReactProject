import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChefProfileForm = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        alert("Only JPEG and PNG files are allowed.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Name validation
    if (!name.trim() || name.length < 3) {
      alert("Please enter a valid name (at least 3 characters).");
      return;
    }

    // Bio validation
    if (!bio.trim() || bio.length < 10) {
      alert("Bio must be at least 10 characters.");
      return;
    }

    // Optional image validation
    if (imageFile && !["image/jpeg", "image/png"].includes(imageFile.type)) {
      alert("Image must be JPEG or PNG.");
      return;
    }

    // ✅ All good
    alert("Profile updated successfully!");
    console.log("Submitted Data:", { name, bio, imageFile });

    // ⏩ Navigate to chef dashboard
    navigate("/chef-dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold text-green-700 mb-4">Update Profile</h2>

      <div>
        <label className="block font-medium mb-1">Name</label>
        <input
          type="text"
          className="w-full border px-4 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Bio</label>
        <textarea
          className="w-full border px-4 py-2 rounded"
          rows={4}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Profile Picture (optional)</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-32 h-32 object-cover rounded mt-3 shadow"
          />
        )}
      </div>

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded"
      >
        Save Profile
      </button>
    </form>
  );
};

export default ChefProfileForm;
