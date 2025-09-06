// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/cartContext";
import "./index.css"; // 👈 make sure Tailwind CSS is imported here
import { SearchProvider } from "./context/SearchContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <SearchProvider>
        <App />
        </SearchProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
