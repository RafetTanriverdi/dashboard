/* eslint-disable no-undef */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

function resolveSrc(_path) {
  return path.resolve(__dirname, "./src", _path);
}

export default defineConfig({
  resolve: {
    alias: {
      "@ca": resolveSrc(""),
      
    },
  },

  plugins: [
    react(),
 
  ],
  define: {
    global: {},
  },
});