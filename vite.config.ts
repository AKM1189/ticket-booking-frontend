import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tailwindcss(), tsConfigPaths()],
  server: {
    open: true,
    port: 5178,
    cors: true,
    host: true,
    watch: {
      ignored: ["**/node_modules/**", "**/dist/**", "**/.git/**"],
    },
  },
  base: "/",
  resolve: {
    alias: {
      "@": "/src", // ✅ simpler alias
    },
  },
  optimizeDeps: {
    include: [
      // Core
      "react",
      "react-dom",
      "react-router-dom",

      // UI + Styling
      "@mantine/core",
      "@mantine/hooks",
      "@mantine/dates",
      "@mantine/modals",
      "@mantine/notifications",
      "@mantine/form",
      "@mantine/carousel",
      "@emotion/react",
      "@tabler/icons-react",

      // State & Data
      "zustand",
      "@tanstack/react-query",
      "axios",
      "zod",

      // Utilities
      "dayjs",

      // Charts / media
      "recharts",
      "react-youtube",
      "react-icons",
    ],
  },
  esbuild: {
    sourcemap: false, // ✅ disable dev sourcemaps
  },
});
