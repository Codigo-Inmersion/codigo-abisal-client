import abisalRouter from './router/AbisalRoutes.jsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import './App.css'

import { RouterProvider } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={abisalRouter} />
  </StrictMode>,
)
