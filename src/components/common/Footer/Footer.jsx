import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-copy">
          <p>
            © {new Date().getFullYear()} Código Abisal | Proyecto hecho en{" "}
            <span className="footer-highlight">Factoría F5</span>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
