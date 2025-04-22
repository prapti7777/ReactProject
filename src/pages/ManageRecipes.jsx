import React, { useState } from "react";
import Input from "@/component/UI/Input";
import Button from "@/component/UI/Button";
import Card from "@/component/UI/Card";
import { v4 as uuidv4 } from "uuid";

const ManageRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [previewUrl, setPreviewUrl] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [sortBy, setSortBy] = useState("newest");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: file });
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, image } = formData;

    if (!title.trim() || !description.trim() || !image) {
      alert("All fields are required!");
      return;
    }

    const newRecipe = {
      id: editingId || uuidv4(),
      title,
      description,
      imageUrl: previewUrl,
      createdAt: editingId
        ? recipes.find((r) => r.id === editingId).createdAt
        : new Date().toISOString(),
    };

    if (editingId) {
      setRecipes((prev) =>
        prev.map((recipe) => (recipe.id === editingId ? newRecipe : recipe))
      );
      setEditingId(null);
    } else {
      setRecipes([...recipes, newRecipe]);
    }

    setFormData({ title: "", description: "", image: "" });
    setPreviewUrl("");
  };

  const handleEdit = (id) => {
    const recipe = recipes.find((r) => r.id === id);
    if (!recipe) return;

    setFormData({
      title: recipe.title,
      description: recipe.description,
      image: recipe.imageUrl,
    });
    setPreviewUrl(recipe.imageUrl);
    setEditingId(id);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
    if (!confirmDelete) return;

    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  const sortRecipes = (recipes) => {
    switch (sortBy) {
      case "title-asc":
        return [...recipes].sort((a, b) => a.title.localeCompare(b.title));
      case "title-desc":
        return [...recipes].sort((a, b) => b.title.localeCompare(a.title));
      case "oldest":
        return [...recipes].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case "newest":
      default:
        return [...recipes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  };

  return (
    <div className="space-y-8">
      {/* Form Card */}
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
          />
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2"
              rows="3"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Image</label>
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
          <Button type="submit" variant="primary">
            {editingId ? "Update Recipe" : "Add Recipe"}
          </Button>
        </form>
      </Card>

      {/* Sort Dropdown */}
      <div className="flex justify-end">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border px-3 py-2 rounded-md"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="title-asc">Title A–Z</option>
          <option value="title-desc">Title Z–A</option>
        </select>
      </div>

      {/* Recipe List */}
      <div className="grid md:grid-cols-2 gap-4">
        {sortRecipes(recipes).map((recipe) => (
          <Card key={recipe.id} className="p-4 space-y-2">
            <h3 className="text-lg font-semibold">{recipe.title}</h3>
            <p>{recipe.description}</p>
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="w-full h-40 object-cover rounded"
            />
            <p className="text-sm text-gray-500">
              Created: {new Date(recipe.createdAt).toLocaleString()}
            </p>
            <div className="flex gap-2 pt-2">
              <Button onClick={() => handleEdit(recipe.id)}>Edit</Button>
              <Button
                onClick={() => handleDelete(recipe.id)}
                variant="destructive"
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManageRecipes;
