import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute/ProtectedRoute';

// Layouts
import Layout_Intro from '../components/layout/Layout_Intro/Layout_Intro';
import Layout_User from '../components/layout/Layout_User/Layout_User';
import Layout_Admin from '../components/layout/Layout_Admin/Layout_Admin';

// Páginas públicas
import LoginPage from '../pages/user/LoginPage';
import RegisterPage from '../pages/user/RegisterPage';

// Páginas de usuario (protegidas)
import HomePage from '../pages/user/homePage/HomePage';
import AboutPage from '../pages/user/AboutPage';
import DetailPage from '../pages/user/DetailPage';
import ForbiddenPage from '../pages/user/ForbiddenPage/ForbiddenPage';

// Páginas de admin (protegidas - solo admin)
import DashboardPage from '../pages/admin/dashboardPage/DashboardPage';
import CreateArticlePage from '../pages/admin/CreateArticlePage';
import EditArticlePage from '../pages/admin/EditArticlePage';

/**
 * 🎓 EXPLICACIÓN: Router - Opción B (Aplicación Interna)
 * 
 * ESTRUCTURA:
 * - Layout_Intro: Login y Register (PÚBLICAS)
 * - Layout_User: Home, artículos, about (PROTEGIDAS - cualquier usuario autenticado)
 * - Layout_Admin: Panel admin (PROTEGIDAS - solo rol "admin")
 * 
 * COMPORTAMIENTO:
 * - Si no estás autenticado → redirige a /login
 * - Si estás autenticado como "user" → puedes ver Layout_User pero NO Layout_Admin
 * - Si estás autenticado como "admin" → puedes ver TODO
 */

const router = createBrowserRouter([
  // ========================================
  // 🌍 LAYOUT INTRO - Rutas públicas (NO protegidas)
  // ========================================
  {
    element: <Layout_Intro />,
    children: [
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/register',
        element: <RegisterPage />
      }
    ]
  },

  // ========================================
  // 🔒 LAYOUT USER - Rutas protegidas (requiere autenticación)
  // ========================================
  // Pueden acceder usuarios con rol "user" o "admin"
  {
    element: (
      <ProtectedRoute>
        <Layout_User />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/article/:id',
        element: <DetailPage />
      },
      {
        path: '/about',
        element: <AboutPage />
      },
      {
        path: '/403',
        element: <ForbiddenPage />
      }
    ]
  },

  // ========================================
  // 🔐 LAYOUT ADMIN - Solo administradores
  // ========================================
  // Requiere rol "admin" específicamente
  {
    path: '/admin',
    element: (
      <ProtectedRoute requireRole="admin">
        <Layout_Admin />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />
      },
      {
        path: 'article/create',
        element: <CreateArticlePage />
      },
      {
        path: 'article/edit/:id',
        element: <EditArticlePage />
      }
    ]
  }
]);

export default router;
