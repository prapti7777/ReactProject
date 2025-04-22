import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    if (
      !imageFile ||
      !["image/jpeg", "image/png", "image/jpg"].includes(imageFile.type)
    ) {
      alert("Please upload a valid image file (JPEG or PNG).");
      return;
    }

    // ✅ All validation passed
    alert("Recipe submitted successfully!");
    console.log("Submitted Data:", {
      title,
      description,
      imageFile,
    });

    navigate("/chef-dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold text-gray-800">Add New Recipe</h2>

      {/* Title */}
      <div>
        <label className="block font-medium mb-1">Title</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-4 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block font-medium mb-1">Description</label>
        <textarea
          className="w-full border border-gray-300 rounded px-4 py-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block font-medium mb-1">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block"
        />
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-32 h-32 mt-3 object-cover rounded shadow"
          />
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default RecipeForm;
