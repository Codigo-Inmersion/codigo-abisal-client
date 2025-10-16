import React from "react";
import { SquarePower, House, LayoutDashboard } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../../../stores/authStore";
import "./NavBar.css";

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

  const isAdminPanel = location.pathname.startsWith("/admin");

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img
            className="navBar-logo"
            src="/logo2.png"
            alt="Código Abisal Logo"
          />
        </div>
        <ul className="navbar-links">
          {!isAuthenticated && (
            <>
              <li>
                <Link to="/login" className="btn-nav">
                  Iniciar sesión
                </Link>
              </li>
              <li>
                <Link to="/register" className="btn-nav">
                  Registrarse
                </Link>
              </li>
            </>
          )}

          {isAuthenticated && (
            <>
              {role === "admin" && (
                <li>
                  {isAdminPanel ? (
                    <Link to="/" title="Ir al inicio">
                      <House />
                    </Link>
                  ) : (
                    <Link to="/admin/dashboard" title="Ir al Dashboard">
                      <LayoutDashboard />
                    </Link>
                  )}
                </li>
              )}
              <li>
                <SquarePower
                  onClick={handleLogout}
                  cursor="pointer"
                  title="Cerrar sesión"
                />
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
