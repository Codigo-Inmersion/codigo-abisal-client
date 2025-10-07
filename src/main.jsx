import abisalRouter from './router/AbisalRoutes.jsx'
import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import './App.css'

import { RouterProvider } from 'react-router-dom'
import useAuthStore from './stores/authStore.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={abisalRouter} />
  </StrictMode>,
)
