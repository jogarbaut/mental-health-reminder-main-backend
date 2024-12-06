const axios = require("axios")

// Axios instance for the profile microservice
const API = axios.create({
  baseURL: "http://localhost:3001", // Replace with your profile microservice URL
})

// Add JWT token to the headers for authenticated requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Register a new user
const register = async (userData) => {
  return API.post("/auth/register", userData)
}

// Login a user and get a token
const login = async (credentials) => {
  return API.post("/auth/login", credentials)
}

// Verify the current user's token
const verifyToken = async (token) => {
  return API.get("/profile", {
    headers: { Authorization: `Bearer ${token}` },
  })
}

// Fetch the authenticated user's profile
const getProfile = async () => {
  return API.get("/profile")
}

// Update the authenticated user's profile
const updateProfile = async (profileData) => {
  return API.put("/profile", profileData)
}

// Delete the authenticated user's profile
const deleteProfile = async () => {
  return API.delete("/profile")
}

// Export the functions
module.exports = {
  register,
  login,
  verifyToken,
  getProfile,
  updateProfile,
  deleteProfile,
}
