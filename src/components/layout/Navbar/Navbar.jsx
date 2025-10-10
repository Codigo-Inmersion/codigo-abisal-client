import { Outlet } from 'react-router-dom';
import NavBar from '../../common/NavBar/NavBar'

// Navbar de prueba - luego borrar
export default function Navbar() {
   return (
      <div className="Navbar.css">
        <NavBar/>
        
        {/* El <main> sigue siendo el contenedor principal para el contenido de la página */}
        <main className="user-layout-content">
          <Outlet />
        </main>
  
        
      </div>
    );
  }

  
  


