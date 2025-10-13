import { Outlet } from 'react-router-dom';
import Background from '../Background/Background';
import './Layout_Intro.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

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
      <Navbar/>
      
    </div>
  );
}

