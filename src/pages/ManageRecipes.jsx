// src/pages/ManageRecipes.jsx
import React, { useState, useEffect } from "react";
import Input from "@/component/UI/Input";
import Button from "@/component/UI/Button";
import Card from "@/component/UI/Card";
import {
  createRecipe,
  getAllRecipes,
  updateRecipe,
  deleteRecipe,
} from "@/services/recipeService";

const ManageRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [sortBy, setSortBy] = useState("newest");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchRecipes = async () => {
    try {
      const res = await getAllRecipes();
      setRecipes(res.data || []);
    } catch (err) {
      console.error("Error fetching recipes:", err);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setFormData({ title: "", description: "" });
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description } = formData;
    if (!title || !description || (!imageFile && !editingId)) {
      alert("All fields are required!");
      return;
    }
    setIsSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("description", description);
      if (imageFile) fd.append("image", imageFile);

      if (editingId) {
        await updateRecipe(editingId, fd);
      } else {
        await createRecipe(fd);
      }
      resetForm();
      fetchRecipes();
    } catch (err) {
      console.error("Error saving recipe:", err);
      alert("Failed to save recipe.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (r) => {
    setFormData({ title: r.title, description: r.description });
    setImagePreview(r.imageUrl);
    setImageFile(null);
    setEditingId(r.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;
    try {
      await deleteRecipe(id);
      fetchRecipes();
    } catch (err) {
      console.error("Error deleting recipe:", err);
    }
  };

  const sortRecipes = (list) => {
    switch (sortBy) {
      case "title-asc":  return [...list].sort((a,b)=>a.title.localeCompare(b.title));
      case "title-desc": return [...list].sort((a,b)=>b.title.localeCompare(a.title));
      case "oldest":     return [...list].sort((a,b)=>new Date(a.createdAt) - new Date(b.createdAt));
      case "newest":
      default:           return [...list].sort((a,b)=>new Date(b.createdAt) - new Date(a.createdAt));
    }
  };

  return (
    <div className="space-y-8">
      {/* Form */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">
          {editingId ? "Edit Recipe" : "Add New Recipe"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="title"
            label="Title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded p-2"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm text-gray-600"
              required={!editingId}
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded"
                />
              </div>
            )}
          </div>
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? (editingId ? "Updating…" : "Adding…")
              : (editingId ? "Update Recipe" : "Add Recipe")}
          </Button>
        </form>
      </Card>

      {/* Sort Control */}
      <div className="flex justify-end">
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="border px-3 py-2 rounded-md"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="title-asc">Title A–Z</option>
          <option value="title-desc">Title Z–A</option>
        </select>
      </div>

      {/* Recipe List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No recipes found. Add your first recipe!
          </p>
        ) : (
          sortRecipes(recipes).map(r => (
            <Card key={r.id} className="p-4 space-y-3">
              <h3 className="text-lg font-semibold">{r.title}</h3>
              <p className="text-gray-600">{r.description}</p>
              {r.imageUrl && (
                <img
                  src={r.imageUrl}
                  alt={r.title}
                  className="w-full h-40 object-cover rounded"
                />
              )}
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {new Date(r.createdAt).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleEdit(r)}>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(r.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageRecipes;
