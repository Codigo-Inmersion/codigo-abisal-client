import { Navigate } from 'react-router-dom';
import useAuthStore from '../stores/authStore';

/**
 * 🎓 EXPLICACIÓN: Componente ProtectedRoute
 * 
 * Este componente es como un "guardia de seguridad" que verifica:
 * 1. ¿El usuario está autenticado? (tiene token)
 * 2. ¿Tiene el rol necesario? (si se especifica)
 * 
 * Si no cumple las condiciones, lo redirige a otra página.
 * 
 * USO:
 * <ProtectedRoute requireRole="admin">
 *   <MiComponenteProtegido />
 * </ProtectedRoute>
 */

function ProtectedRoute({ children, requireRole = null }) {
  // Obtenemos los datos del store de Zustand
  const { token, user } = useAuthStore();

  // 🔒 VERIFICACIÓN 1: ¿Está autenticado?
  // Si no hay token, redirige al login
  if (!token) {
    console.log('❌ No hay token, redirigiendo a /login');
    return <Navigate to="/login" replace />;
  }

  // 🔒 VERIFICACIÓN 2: ¿Tiene el rol requerido?
  // Solo si se especificó un rol requerido
  if (requireRole && user?.role !== requireRole) {
    console.log(`❌ Rol requerido: ${requireRole}, Rol del usuario: ${user?.role}`);
    console.log('Redirigiendo a /403');
    return <Navigate to="/403" replace />;
  }

  // ✅ TODO OK: Muestra el componente hijo
  console.log('✅ Acceso permitido');
  return children;
}

export default ProtectedRoute;