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
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser');

  // `worker.start()` devuelve una Promise que se resuelve cuando el worker está listo.
  return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
});