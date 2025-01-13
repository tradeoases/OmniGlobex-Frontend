import path from "path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  plugins: [react(), svgr()],
  build: {
    assetsDir: "assets",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  //server proxy configuration
  server: {
    proxy: {
      '/api': {
        target: 'https://ipapi.co', // Target API for locale detection
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
