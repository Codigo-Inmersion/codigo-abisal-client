import { Outlet } from 'react-router-dom';
import Background from '../Background/Background';
import './Layout_User.css';
import Navbar from '../Navbar/Navbar';

export default function LayoutUser() {
  return (
    <div className="user-layout">
      <Background />
      
      {/* El <main> sigue siendo el contenedor principal para el contenido de la página */}
      <main className="user-layout-content">
        <Outlet />
      </main>
      <Navbar/>
      

      {/* Restauramos el footer con el enlace para volver al inicio */}
      <div className="user-layout-footer">
        <a href="/" className="back-link">
          ← Volver al inicio
        </a>
      </div>
    </div>
  );
}