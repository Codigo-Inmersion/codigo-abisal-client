
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

// Layout components
import Background from '../components/layout/Background/Background';
import Navbar from '../components/layout/Navbar/Navbar';
import Footer from '../components/layout/Footer/Footer';

// Pages
import RegisterPage from '../pages/user/RegisterPage';


//RootLayout - Componente que envuelve todas las páginas

function RootLayout() {
  return (
    <>
      <Background />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}


//Router Configuration - Más adelante resto de rutas

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: 'register',
        element: <RegisterPage />
      }
    ]
  }
]);



export default function AbisalRoutes() {
  return <RouterProvider router={router} />;
}
