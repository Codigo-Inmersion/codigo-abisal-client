
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from "../../../stores/authStore"; 
import './Navbar.css';

const NavBar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, role, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          
        </div>

        <ul className="navbar-links">
          
          

          {/* Si NO está autenticado */}
          {!isAuthenticated && (
            <li>
              <Link to="/login" className="btn-nav">
                Iniciar sesión
              </Link>
            </li>
          )}

          {/* Si está autenticado y es usuario normal */}
          {isAuthenticated && role === "user" && (
            <li>
              <button onClick={handleLogout} className="btn-nav">
                Cerrar sesión
              </button>
            </li>
          )}

          {/* Si está autenticado y es admin */}
          {isAuthenticated && role === "admin" && (
            <>
              <li>
                <button onClick={handleLogout} className="btn-nav">
                  Cerrar sesión
                </button>
              </li>
              <li>
                <Link to="/admin-panel" className="btn-nav">
                  Panel de control
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
