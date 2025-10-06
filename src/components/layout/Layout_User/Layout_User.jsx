import { Outlet } from 'react-router-dom';
import Background from '../Background/Background';
import './Layout_User.css';



export default function layoutUser() {
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