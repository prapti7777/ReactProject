// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://localhost:7052/api",
});

// Remove any default Content-Type so axios auto-sets multipart/form-data for FormData:
delete api.defaults.headers.put["Content-Type"];
delete api.defaults.headers.post["Content-Type"];

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default api;
