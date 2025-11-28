import axios from "axios";

const api = axios.create({
  baseURL: "https://task-backend-1x3p.vercel.app/api", // Backend deployed URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
