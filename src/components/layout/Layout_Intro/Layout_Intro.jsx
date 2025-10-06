import { Outlet } from 'react-router-dom';
import Background from '../Background/Background';
import './Layout_Intro.css';

/*
 Layout Intro - Layout minimalista para autenticación
 
 USADO EN: Login, Register
 
 CARACTERÍSTICAS:
 - Sin Navbar 
 - Sin Footer (interfaz limpia y centrada)
 - Solo Background + Contenido centrado
 */


export default function layoutIntro() {
  return (
    <div className="intro-layout">
      <Background />
      <div className="intro-content">
        <Outlet />
      </div>
      
      {/* Opcional: Link pequeño para volver */}
      <div className="intro-footer">
        <a href="/" className="back-link">
          ← Volver al inicio
        </a>
      </div>
    </div>
  );
}

