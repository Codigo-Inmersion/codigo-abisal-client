import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute/ProtectedRoute";

// Layouts
import Layout_Intro from "../components/layout/Layout_Intro/Layout_Intro";
import Layout_User from "../components/layout/Layout_User/Layout_User";
import Layout_Admin from "../components/layout/Layout_Admin/Layout_Admin";

// Pages
import HomePage from "../pages/user/HomePage";
import RegisterPage from "../pages/user/RegisterPage";
import LoginPage from "../pages/user/LoginPage";
import DetailPage from "../pages/user/DetailPage";
import AboutPage from "../pages/user/AboutPage";
import DashboardPage from "../pages/admin/DashboardPage";
import CreateArticlePage from "../pages/admin/CreateArticlePage";
import EditArticlePage from "../pages/admin/EditArticlePage";
import ForbiddenPage from "../pages/errors/ForbiddenPage";

const abisalRouter = createBrowserRouter([
  // ========================================
  // RUTAS PÚBLICAS (Login & Register)
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
  // RUTAS DE USUARIO (Requieren autenticación)
  // ========================================
  {
    element: (
      <ProtectedRoute>
        <Layout_User />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/article/:id",
        element: <DetailPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
    ],
  },
  // ========================================
  // RUTAS DE ADMINISTRADOR (Requieren rol admin)
  // ========================================
  {
    path: '/admin',
    element: (
      <ProtectedRoute requiredRole="admin">
        <Layout_Admin />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />
      },
      {
        path: 'articles/create',
        element: <CreateArticlePage />
      },
      {
        path: 'articles/edit/:id',
        element: <EditArticlePage />
      }
    ]
  },
  // ========================================
  // PÁGINA DE ERROR 403
  // ========================================
  {
    path: "/403",
    element: <ForbiddenPage />
  }

]);

export default abisalRouter;

