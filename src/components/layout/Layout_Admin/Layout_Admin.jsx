// src/components/layout/Layout_Admin/Layout_Admin.jsx

import { Outlet } from 'react-router-dom';
import Background from '../Background/Background';
import NavBar from '../../common/NavBar/NavBar';
import Footer from '../../common/Footer/Footer';
import './Layout_Admin.css'; // <-- Importa el nuevo CSS

export default function LayoutAdmin() {
  return (
    // Usa las nuevas clases de CSS
    <div className="admin-layout">
      <Background />
      <NavBar />
      <main className="admin-content">
        <Outlet />
      </main>
      
      <div className="intro-footer">
      <Footer />

      </div>
    </div>
  );
}