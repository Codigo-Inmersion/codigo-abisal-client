// src/router/AbisalRoutes.jsx

import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute/ProtectedRoute";

// Layouts
import Layout_Intro from "../components/layout/Layout_Intro/Layout_Intro";
import Layout_User from "../components/layout/Layout_User/Layout_User";
import Layout_Admin from "../components/layout/Layout_Admin/Layout_Admin";

// Páginas públicas
import LoginPage from "../pages/user/LoginPage";
import RegisterPage from "../pages/user/RegisterPage";
import HomePage from "../pages/user/homePage/HomePage";
import DetailPage from "../pages/user/DetailPage";
import ForbiddenPage from "../pages/user/forbiddenPage/ForbiddenPage";
import CategoryPage from '../pages/user/categoryPage/CategoryPage';

// Páginas de usuario registrado
import CreateArticlePage from "../pages/admin/CreateArticlePage";
import EditArticlePage from "../pages/admin/EditArticlePage";

// Páginas de admin
import DashboardPage from "../pages/admin/dashboardPage/DashboardPage.jsx";

/**
 * 🎓 NUEVO SISTEMA DE PERMISOS:
 *
 * PÚBLICAS (sin login):
 * - Home, Detail, Login, Register
 *
 * USUARIO REGISTRADO (con login):
 * - Crear artículos
 * - Editar SUS artículos (se valida en el componente)
 *
 * ADMIN (rol admin):
 * - Dashboard
 * - Editar CUALQUIER artículo
 * - Gestionar usuarios
 */

const router = createBrowserRouter([
  // ========================================
  // 🌍 RUTAS PÚBLICAS - Sin autenticación
  // ========================================
  {
    element: <Layout_Intro />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },

  // ========================================
  // 🌐 LAYOUT USER - Mixto (públicas y protegidas)
  // ========================================
  {
    element: <Layout_User />,
    children: [
      // 👉 PÚBLICAS (cualquiera puede ver)
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/article/:id",
        element: <DetailPage />,
      },

      {
        path: "/category/:categoryName",
        element: <CategoryPage />, 
      },
      // 👉 PROTEGIDAS (requieren login - user o admin)
      {
        path: "/article/create",
        element: (
          <ProtectedRoute>
            <CreateArticlePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/article/edit/:id",
        element: (
          <ProtectedRoute>
            <EditArticlePage />
          </ProtectedRoute>
        ),
      },

      // 👉 Página de error
      {
        path: "/403",
        element: <ForbiddenPage />,
      },
    ],
  },

  // ========================================
  // 🔐 LAYOUT ADMIN - Solo administradores
  // ========================================
  {
    path: "/admin",
    element: (
      <ProtectedRoute requireRole="admin">
        <Layout_Admin />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
    ],
  },
]);

export default router;
