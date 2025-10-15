import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174, // ← Forzar puerto 5174 (como la configuración de cors del backend)
  },
 test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTest.js', // Archivo de configuración para las pruebas
  },
});