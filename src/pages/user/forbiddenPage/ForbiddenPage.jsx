import { useNavigate } from 'react-router-dom';
import './ForbiddenPage.css';

/**
 * 🎓 EXPLICACIÓN: Página 403 Forbidden
 * 
 * Esta página se muestra cuando un usuario intenta acceder 
 * a una ruta para la que no tiene permisos
 */

function ForbiddenPage() {
  const navigate = useNavigate();

  return (
    <div className="forbidden-container">
      <div className="forbidden-content">
        {/* Código de error */}
        <h1 className="error-code">403</h1>
        
        {/* Mensaje principal */}
        <h2 className="error-title">Acceso Denegado</h2>
        
        {/* Descripción */}
        <p className="error-description">
          No tienes permisos para acceder a esta página.
        </p>
        
        {/* Botones de acción */}
        <div className="error-actions">
          <button 
            onClick={() => navigate(-1)}
            className="btn-secondary"
          >
            ← Volver atrás
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Ir al inicio
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForbiddenPage;