import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    target: "es2022",
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          if (id.includes("react-router")) return "router";
          if (id.includes("react-dom") || id.includes("/react/")) return "react";
          if (id.includes("lucide-react")) return "icons";
          return undefined;
        },
      },
    },
  },
  server: { port: 5180, host: true },
  preview: { port: 4180, host: true },
});
