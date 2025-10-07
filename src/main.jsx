import abisalRouter from './router/AbisalRoutes.jsx'
import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import './App.css'

import { RouterProvider } from 'react-router-dom'
import useAuthStore from './stores/authStore.js'

export function AppWrapper() {
  const initAuth = useAuthStore(state => state.initAuth);

  useEffect(() => {
    // Inicializar autenticación al montar la app
    initAuth();
  }, [initAuth]);

  return <RouterProvider router={abisalRouter} />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
)
