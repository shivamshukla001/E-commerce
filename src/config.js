// src/config.js

// Detect if running in development or production
const isDev = import.meta.env.MODE === "development";

// API base URL
export const API_URL = isDev
  ? "http://localhost:5000" // Local backend
  : "https://shopsmart-backend-oumm.onrender.com"; // Render backend

// Example usage
// fetch(`${API_URL}/api/products`)
//   .then((res) => res.json())
//   .then((data) => console.log("Products:", data))
//   .catch((err) => console.error("API error:", err));
