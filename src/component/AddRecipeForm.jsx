import React, { useState } from "react";
import { createRecipe } from "@/services/recipeService";
import Button from "@/component/UI/Button";
import Input from "@/component/UI/Input";

function AddRecipeForm({ onRecipeAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);

    // generate preview
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !imageFile) {
      alert("Please fill in all fields and upload an image.");
      return;
    }

    setIsSubmitting(true);
    try {
      // build multipart form data
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", imageFile);

      await createRecipe(formData);

      alert("✅ Recipe added successfully!");
      // reset form
      setTitle("");
      setDescription("");
      setImageFile(null);
      setImagePreview(null);
      onRecipeAdded();
    } catch (error) {
      console.error("❌ Error adding recipe:", error);
      alert("Failed to add recipe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">Add New Recipe</h2>

      <Input
        label="Title"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter recipe title"
        required
      />

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter recipe description"
          required
          rows={4}
          className="w-full border rounded p-2 text-sm"
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
          Image
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          required
          className="w-full text-sm text-gray-600"
        />
        {imagePreview && (
          <div className="mt-2">
            <img src={imagePreview} alt="Preview" className="max-w-full h-auto rounded-md" />
          </div>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Adding…" : "Add Recipe"}
      </Button>
    </form>
  );
}

export default AddRecipeForm;
