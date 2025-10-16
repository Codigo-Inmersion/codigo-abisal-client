import React, { useState, useEffect } from "react";
import { SquarePower, House, LayoutDashboard, Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../../../stores/authStore";
import Button from "../../common/Button/Button";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, user, logout } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const isAuthenticated = !!token;
  const role = user?.role?.toLowerCase();
  const isAdminPanel = location.pathname.startsWith("/admin");

  // Detectar cambios en el tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // Cerrar menú al cambiar a desktop
      if (!mobile) setMenuOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  // Determinar si necesitamos mostrar el menú hamburguesa
  const shouldShowHamburger = () => {
    if (!isMobile) return false;
    
    // SOLO mostrar hamburguesa cuando hay BOTONES (usuario no autenticado)
    // NUNCA cuando solo hay iconos (usuarios autenticados, sean admin o no)
    return !isAuthenticated;
  };

  // Determinar si aplicar clase mobile
  const getNavLinksClass = () => {
    // Si no debe mostrar hamburguesa, nunca aplicar la clase "active"
    if (!shouldShowHamburger()) return "navbar-links";
    return `navbar-links ${menuOpen ? "active" : ""}`;
  };

  // Manejar clicks solo si hay hamburguesa
  const handleToggleMenu = () => {
    if (shouldShowHamburger()) {
      setMenuOpen(!menuOpen);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" onClick={handleLinkClick}>
            <img
              className="navBar-logo"
              src="/logo2.png"
              alt="Código Abisal Logo"
            />
          </Link>
        </div>

        {/* Mostrar hamburguesa solo cuando sea necesario */}
        {shouldShowHamburger() && (
          <div className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </div>
        )}

        <ul className={getNavLinksClass()}>
          {!isAuthenticated && (
            <>
              <li>
                <Link to="/login" onClick={handleLinkClick}>
                  <Button variant="secondary">Iniciar sesión</Button>
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={handleLinkClick}>
                  <Button variant="primary">Registrarse</Button>
                </Link>
              </li>
            </>
          )}

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