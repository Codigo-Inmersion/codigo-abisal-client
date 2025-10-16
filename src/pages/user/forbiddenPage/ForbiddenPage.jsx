import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import Button from '../../../components/common/Button/Button';
import './ForbiddenPage.css';

/**
 * 🎓 EXPLICACIÓN: Página 403 Forbidden
 * 
 * Esta página se muestra cuando un usuario intenta acceder 
 * a una ruta para la que no tiene permisos.
 * 
 * ✨ Actualizada para seguir el estilo visual de la aplicación
 */

function ForbiddenPage() {
  const navigate = useNavigate();

  return (
    <div className="forbidden-container">
      <div className="forbidden-card">
        {/* Ícono de alerta */}
        <div className="forbidden-icon">
          <ShieldAlert size={80} strokeWidth={1.5} />
        </div>

        {/* Código de error */}
        <h1 className="error-code">403</h1>
        
        {/* Mensaje principal */}
        <h2 className="error-title">Acceso Denegado</h2>
        
        {/* Descripción */}
        <p className="error-description">
          No tienes los permisos necesarios para acceder a esta página. 
          Si crees que esto es un error, contacta con el administrador.
        </p>
        
        {/* Botones de acción */}
        <div className="error-actions">
          <Button 
            variant="secondary"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} />
            Volver atrás
          </Button>
          
          <Button 
            variant="primary"
            onClick={() => navigate('/')}
          >
            <Home size={18} />
            Ir al inicio
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ForbiddenPage;
