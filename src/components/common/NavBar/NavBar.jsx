// NavBar.jsx - con el cambio mínimo necesario

import React, { useState } from "react"; // Se necesita useState para el menú responsive
import { SquarePower, House, LayoutDashboard, Menu, X } from "lucide-react"; // Se necesitan Menu y X para el responsive
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../../../stores/authStore";
import Button from "../../common/Button/Button"; // 1. IMPORTAMOS TU BOTÓN
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, user, logout } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false); // Lógica responsive se mantiene

  const isAuthenticated = !!token;
  const role = user?.role?.toLowerCase();

  const handleLogout = () => {
    logout();
    setMenuOpen(false); // Se mantiene
    navigate("/");
  };
  
  const handleLinkClick = () => {
    setMenuOpen(false); // Se mantiene
  }

  const isAdminPanel = location.pathname.startsWith("/admin");

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
           {/* Se envuelve en Link para que también cierre el menú al hacer clic en el logo */}
          <Link to="/" onClick={handleLinkClick}>
            <img
              className="navBar-logo"
              src="/logo2.png"
              alt="Código Abisal Logo"
            />
          </Link>
        </div>
        
        {/* Lógica del menú hamburguesa, sin cambios */}
        <div className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>

        <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
          {!isAuthenticated && (
            <>
              {/* 2. AQUÍ ESTÁ EL CAMBIO */}
              <li>
                <Link to="/login" onClick={handleLinkClick}>
                  {/* Usamos el botón con variant="secondary" como en su CSS */}
                  <Button variant="secondary">Iniciar sesión</Button>
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={handleLinkClick}>
                  {/* Usamos el botón con variant="primary" */}
                  <Button variant="primary">Registrarse</Button>
                </Link>
              </li>
            </>
          )}

          {/* ESTA PARTE SE QUEDA EXACTAMENTE IGUAL, CON LOS ICONOS ORIGINALES */}
          {isAuthenticated && (
            <>
              {role === "admin" && (
                <li>
                  {isAdminPanel ? (
                    <Link to="/" title="Ir al inicio" onClick={handleLinkClick}>
                      <House />
                    </Link>
                  ) : (
                    <Link to="/admin/dashboard" title="Ir al Dashboard" onClick={handleLinkClick}>
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