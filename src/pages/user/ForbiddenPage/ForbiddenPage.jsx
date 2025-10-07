/**
 * PÁGINA 403 - ACCESO PROHIBIDO
 * 
 * Se muestra cuando un usuario autenticado intenta acceder
 * a una ruta para la que no tiene permisos (rol incorrecto).
 */

import { useNavigate } from 'react-router-dom';
import './ForbiddenPage.css';

const ForbiddenPage = () => {
  const navigate = useNavigate();

  return (
    <div className="forbidden-container">
      <div className="forbidden-content">
        <h1 className="forbidden-code">403</h1>
        <h2 className="forbidden-title">Acceso Prohibido</h2>
        <p className="forbidden-message">
          No tienes permisos para acceder a esta página.
        </p>
        <div className="forbidden-actions">
          <button 
            onClick={() => navigate(-1)} 
            className="btn-back"
          >
            ← Volver atrás
          </button>
          <button 
            onClick={() => navigate('/')} 
            className="btn-home"
          >
            Ir al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForbiddenPage;