// src/components/common/ProtectedRoute/ProtectedRoute.jsx

/**
 * COMPONENTE PROTECTEDROUTE - CON ZUSTAND
 * 
 * Versión adaptada para usar Zustand en lugar de Context API
 * 
 * USO:
 * <ProtectedRoute>
 *   <MiComponenteProtegido />
 * </ProtectedRoute>
 * 
 * CON ROL ESPECÍFICO:
 * <ProtectedRoute requiredRole="admin">
 *   <PanelAdmin />
 * </ProtectedRoute>
 */

import { Navigate } from 'react-router-dom';
import useAuthStore from '../../../stores/authStore';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, hasRole, isLoading } = useAuthStore();

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        color: '#fff'
      }}>
        <p>Verificando permisos...</p>
      </div>
    );
  }

  // Si no está autenticado, redirigir a login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si requiere un rol específico y no lo tiene
  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/403" replace />;
  }

  // Si todo está bien, renderizar el contenido
  return children;
};

export default ProtectedRoute;