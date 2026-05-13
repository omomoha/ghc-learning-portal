/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  // Firebase v11 ships malformed sourcemaps that esbuild logs noisily during
  // dependency optimization. Disabling sourcemap loading at the prebundle step
  // suppresses the warning without losing anything important.
  optimizeDeps: {
    esbuildOptions: {
      sourcemap: false,
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          firebase: ["firebase/app", "firebase/auth", "firebase/firestore", "firebase/storage"],
          charts: ["recharts"],
        },
      },
    },
  },
  server: {
    port: 5173,
    open: false,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test-setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules", "dist", "legacy", "tmp", "functions"],
  },
});
