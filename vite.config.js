import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // --- AÑADE ESTA SECCIÓN ---
  server: {
    proxy: {
      // Cualquier petición que empiece con /auth o /article...
      '/auth': {
        target: 'http://localhost:8000', // ...redirígela a tu backend
        changeOrigin: true,
      },
      '/article': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      }
    }
  }
  // -------------------------
})