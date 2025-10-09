import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute/ProtectedRoute';

// Layouts
import Layout_Intro from '../components/layout/Layout_Intro/Layout_Intro';
import Layout_User from '../components/layout/Layout_User/Layout_User';
import Layout_Admin from '../components/layout/Layout_Admin/Layout_Admin';

// Páginas públicas
import HomePage from '../pages/user/homePage/HomePage';
import LoginPage from '../pages/user/LoginPage';
import RegisterPage from '../pages/user/RegisterPage';
import AboutPage from '../pages/user/AboutPage';
import DetailPage from '../pages/user/DetailPage';

// Páginas de error
import ForbiddenPage from '../pages/user/forbiddenPage/ForbiddenPage';

// Páginas de admin (protegidas)
import DashboardPage from '../pages/admin/DashboardPage';
import CreateArticlePage from '../pages/admin/CreateArticlePage';
import EditArticlePage from '../pages/admin/EditArticlePage';

/**
 * 🎓 EXPLICACIÓN: Configuración de Rutas con Protección
 * 
 * Estructura de rutas:
 * - Layout_Intro: Para login y register (sin navbar/footer)
 * - Layout_User: Para páginas de usuarios normales
 * - Layout_Admin: Para páginas de administración (protegidas)
 */

const router = createBrowserRouter([
  // 🌍 LAYOUT INTRO - Páginas de autenticación (públicas)
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

  // 🌍 LAYOUT USER - Páginas protegidas para user con navbar
  {
    element: <Layout_User />,
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

  // 🔐 LAYOUT ADMIN - Páginas protegidas solo para admins
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
        path: 'articles/create',
        element: <CreateArticlePage />
      },
      {
        path: 'articles/edit/:id',
        element: <EditArticlePage />
      }
    ]
  }
]);

export default router;