import api from "@/api/axios";

export const createRecipe = (data) => api.post("/Recipe", data);

export const getAllRecipes = () => api.get("/Recipe");

export const getRecipeById = (id) => api.get(`/Recipe/${id}`);

export const updateRecipe = (id, data) => {
  if (data instanceof FormData) {
    return api.put(`/Recipe/update-with-image/${id}`, data);
  } else {
    return api.put(`/Recipe/${id}`, data);
  }
};

export const deleteRecipe = (id) => api.delete(`/Recipe/${id}`);
