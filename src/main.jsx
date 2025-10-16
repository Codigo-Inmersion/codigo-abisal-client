import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router/AbisalRoutes.jsx';
import './styles/index.css';
import './App.css'

/**
 * 🎓 EXPLICACIÓN: Punto de entrada de la aplicación
 * 
 * Aquí se inicia React y se conecta el router.
 * RouterProvider es el que hace funcionar todas las rutas.
 */

async function enableMocking() {
  // Solo activamos los mocks si la variable de entorno está explícitamente en 'true'
  if (import.meta.env.VITE_ENABLE_MOCKS !== 'true') {
    return;
  }

  const { worker } = await import('./mocks/browser');
  
  // Mensaje para saber que los mocks están activos
  console.log("✅ Mock Service Worker está activado.");
  return worker.start();
}

// Arrancamos la app después de que la configuración de mocks termine
enableMocking().then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
});