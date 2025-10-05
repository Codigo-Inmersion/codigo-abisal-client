import React, { useState } from "react";
import "../styles/NavBar2.css";
import { Menu, X } from "lucide-react"; // npm install lucide-react

const NavBar2 = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  return (
    <div className="navbar2-container">
      <div className={`navbar2 ${open ? "open" : ""}`}>
        <button className="toggle-btn" onClick={toggleMenu}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className="menu">
          <ul>
            <li><a href="#tabla" onClick={closeMenu}>Volver a la Tabla</a></li>
            <li><a href="#como-soy" onClick={closeMenu}>Cómo Soy</a></li>
            <li><a href="#donde-estoy" onClick={closeMenu}>Dónde Estoy</a></li>
            <li><a href="#historia" onClick={closeMenu}>Historia</a></li>
            <li><a href="#juego" onClick={closeMenu}>Juego</a></li>
            <li><a href="#creadores" onClick={closeMenu}>Creadores</a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavBar2;




