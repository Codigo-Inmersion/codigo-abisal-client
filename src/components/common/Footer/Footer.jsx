import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-copy">
          <p>
            © {new Date().getFullYear()} Código Abisal | Proyecto realizado por Gema, Camila, Mariana, Olga y Rocío para el Bootcamp Fullstack (Femcoders – Factoría F5).</p>
          <p>Todos los contenidos tienen fines educativos y de divulgación.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
