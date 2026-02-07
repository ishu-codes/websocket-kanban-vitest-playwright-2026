import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
    strictPort: true,
    open: true,
  },
  preview: {
    port: 3000,
    strictPort: true,
    open: true,
  },
  test: {
    mockReset: true,
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    exclude: ["node_modules", "src/tests/e2e"],
  },

  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
