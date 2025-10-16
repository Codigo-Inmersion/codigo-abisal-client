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
    setupFiles: './src/setupTests.js', // Archivo de configuración que crearemos a continuación
    css: true, // Habilita el procesamiento de CSS si tus componentes lo importan
  },
});