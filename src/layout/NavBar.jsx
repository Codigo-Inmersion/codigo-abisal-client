import React from "react";
import "../styles/navbar.css"; // Importamos los estilos

const NavBar = () => {
  const linkHover = (e, color) => {
    e.target.style.color = color;
  };

  return (
    <nav className="navbar">
      <div className="logo">MiApp</div>
      <ul className="nav-links">
        <li>
          <a
            href="#home"
            className="nav-link"
            onMouseOver={(e) => linkHover(e, "#c3c7ff")}
            onMouseOut={(e) => linkHover(e, "#fff")}
          >
            Inicio
          </a>
        </li>
        <li>
          <a
            href="#about"
            className="nav-link"
            onMouseOver={(e) => linkHover(e, "#c3c7ff")}
            onMouseOut={(e) => linkHover(e, "#fff")}
          >
            Sobre Nosotros
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className="nav-link"
            onMouseOver={(e) => linkHover(e, "#c3c7ff")}
            onMouseOut={(e) => linkHover(e, "#fff")}
          >
            Contacto
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
