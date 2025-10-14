// src/components/layout/Layout_Admin/Layout_Admin.jsx

import { Outlet } from 'react-router-dom';
import Background from '../Background/Background';
import './Layout_Admin.css'; // <-- Importa el nuevo CSS
import NavBar from "../../common/NavBar/NavBar";
import Footer from '../../common/Footer/Footer';

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
      
      <footer>
        <Footer/>
      </footer>
    </div>
  );
}