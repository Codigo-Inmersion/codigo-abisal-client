import { Outlet } from 'react-router-dom';
import Background from '../Background/Background';
import './Layout_Intro.css';
import NavBar from "../../common/NavBar/NavBar";
import Footer from '../../common/Footer/Footer';
//import Footer from '../Footer/Footer';

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
      
      <div className="intro-content">
        <Background />
        
      </div>
      <Outlet />
     
      <footer>
        <Footer/>
      </footer>
    </div>
  );
}

