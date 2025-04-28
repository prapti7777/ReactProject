// src/services/recipeService.js
import api from "./api";

export const createRecipe = (data) =>
  api.post("/Recipe", data);

export const getAllRecipes = () =>
  api.get("/Recipe");

export const getRecipeById = (id) =>
  api.get(`/Recipe/${id}`);

export const updateRecipe = (id, data) =>
  api.put(`/Recipe/${id}`, data);

export const deleteRecipe = (id) =>
  api.delete(`/Recipe/${id}`);
