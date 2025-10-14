import React from 'react';
import { SquarePower, House, LayoutDashboard } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from "../../../stores/authStore"; 
import './Navbar.css';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, user, logout } = useAuthStore();

  const isAuthenticated = !!token;
  const role = user?.role?.toLowerCase();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // 👇 Nueva lógica clara y separada
  const isDashboard = location.pathname === "/admin";
  const isAdminPanel = location.pathname.startsWith("/admin");

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="navbar-links">
          {!isAuthenticated && (
            <>
              <li><Link to="/login" className="btn-nav">Iniciar sesión</Link></li>
              <li><Link to="/register" className="btn-nav">Registrarse</Link></li>
            </>
          )}

          {isAuthenticated && (
            <>
              {role === "admin" && (
                <>
                  {isDashboard && (
                    <li>
                      <Link to="/admin/dashboard" ><LayoutDashboard /></Link>
                    </li>
                  )}
                  {isAdminPanel && (
                    <li>
                      <Link to="/admin" ><House /></Link>
                    </li>
                  )}
                </>
              )}
              <li>
               <SquarePower  onClick={handleLogout} />
                
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;

