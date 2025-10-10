import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/">
            <img src="/logo.png" alt="Logo" />
          </Link>
        </div>

        {/* Enlaces */}
        <ul className="navbar-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/about">Sobre nosotros</Link></li>
          <li><Link to="/services">Servicios</Link></li>
          <li><Link to="/contact">Contacto</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
