import { Outlet } from 'react-router-dom';
import Background from '../Background/Background';
import './Layout_User.css';
import NavBar from "../../common/NavBar/NavBar";
import Footer from '../../common/Footer/Footer';
//import Footer from '../Footer/Footer';

export default function LayoutUser() {
  return (
    <div className="user-layout">  
    <NavBar/>
      
      {/* El <main> sigue siendo el contenedor principal para el contenido de la página */}
      <main className="user-layout-content">
        <Background />
       
      </main>
       <Outlet />
    
      

      {/* Restauramos el footer con el enlace para volver al inicio */}
      <footer>
        <Footer/>
      </footer>
    </div>
  );
}