import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

// Layouts
import Layout_Intro from "../components/layout/Layout_Intro/Layout_Intro";
import Layout_User from "../components/layout/Layout_User/Layout_User";
import Layout_Admin from "../components/layout/Layout_Admin/Layout_Admin";

// Pages
import HomePage from "../pages/user/homePage/HomePage";
import RegisterPage from "../pages/user/RegisterPage";
import LoginPage from "../pages/user/LoginPage";
import DetailPage from "../pages/user/DetailPage";
import AboutPage from "../pages/user/AboutPage";
import DashboardPage from "../pages/admin/DashboardPage";
import CreateArticlePage from "../pages/admin/CreateArticlePage";
import EditArticlePage from "../pages/admin/EditArticlePage";

//poner aquí resto de páginas

const abisalRouter = createBrowserRouter([
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

  {
    element: <Layout_User />,
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
  {
    path: "/admin",
    element: <Layout_Admin />,
    //    loader: checkAdminLoader, // Protección de rutas
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "articles/create",
        element: <CreateArticlePage />,
      },
      {
        path: "article/edit/:id",
        element: <EditArticlePage />,
      },
    ],
  },
]);

export default abisalRouter;
