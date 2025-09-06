import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
darkMode: 'class',
  plugins: [react(),
    
    tailwindcss()
  ],
})

// src/config.js
export const API_URL = "https://shopsmart-backend-oumm.onrender.com";

