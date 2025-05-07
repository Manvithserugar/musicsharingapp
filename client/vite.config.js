import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Proxy requests starting with '/api' to the backend
      "/api": {
        target: "http://localhost:3000", // Your backend server address
        changeOrigin: true, // Changes the origin of the host header to the target URL
        secure: false, // Set to false if your backend uses HTTP (not HTTPS)
        // rewrite: (path) => path.replace(/^\/api/, ""), // Optional: Remove '/api' prefix if needed
      },
    },
  },
});
