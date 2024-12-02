import axios from "axios";

const API_URL = "https://job-board-be-vk4x.onrender.com/api";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const login = async (credentials) => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/login`, credentials);
    return data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

export const signup = async (details) => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/signup`, details);
    return data;
  } catch (error) {
    throw error.response?.data || { message: "Signup failed" };
  }
};
