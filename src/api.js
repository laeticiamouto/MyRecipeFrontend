import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "https://myrecipeback.onrender.com/api"; 

export const signup = (username, password) => {
  return axios.post(`${API_URL}/user/signup`, { username, password });
};

export const login = (username, password) => {
  return axios.post(`${API_URL}/user/login`, { username, password });
};

export const getRecipes = (token) => {
  return axios.get(`${API_URL}/recipe/`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getRecipeById = (token, recipeId) => {
  return axios.get(`${API_URL}/recipe/${recipeId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const addRecipe = (token, recipe) => {
  return axios.post(`${API_URL}/recipe`, recipe, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const deleteRecipe = (token, recipeId) => {
  return axios.delete(`${API_URL}/recipe/${recipeId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const updateRecipe = (token, recipeId, recipe) => {
  return axios.put(`${API_URL}/recipe/${recipeId}`, recipe, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
