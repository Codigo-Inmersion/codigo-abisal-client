import React from "react";
import "../styles/Footer.css"; // Importamos los estilos

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} MiApp. Todos los derechos reservados. |{" "}
        <a href="#privacidad">Política de privacidad</a> |{" "}
        <a href="#terminos">Términos de uso</a>
      </p>
    </footer>
  );
};

export default Footer;

