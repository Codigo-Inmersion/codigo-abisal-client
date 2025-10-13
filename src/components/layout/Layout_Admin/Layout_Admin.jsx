// src/components/layout/Layout_Admin/Layout_Admin.jsx

import { Outlet } from 'react-router-dom';
import Background from '../Background/Background';
import './Layout_Admin.css'; // <-- Importa el nuevo CSS
import NavBar from "../../common/NavBar/NavBar";

//import Footer from '../Footer/Footer';

export default function LayoutAdmin() {
  return (
    // Usa las nuevas clases de CSS
    <div className="admin-layout"> 
    <NavBar/>
    
      <main className="admin-content">  
        <Background />
       
      </main> 
      <Outlet />
      
      
      <div className="intro-footer">
        <a href="/" className="back-link">
          ← Volver al inicio
        </a>
      </div>
    </div>
  );
}