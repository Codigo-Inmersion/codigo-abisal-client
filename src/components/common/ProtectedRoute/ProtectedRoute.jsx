import { Navigate } from 'react-router-dom';
import useAuthStore from '../../../stores/authStore';

/**
 * 🎓 EXPLICACIÓN: Componente ProtectedRoute
 * 
 * Este componente actúa como un "guardia de seguridad" que verifica:
 * 1. ¿El usuario está autenticado? (tiene token)
 * 2. ¿Tiene el rol necesario? (si se especifica con requireRole)
 * 
 * CÓMO FUNCIONA:
 * - Si no hay token → redirige a /login
 * - Si hay token pero no tiene el rol correcto → redirige a /403
 * - Si todo está bien → muestra el contenido (children)
 * 
 * USO EN EL ROUTER:
 * <ProtectedRoute requireRole="admin">
 *   <Layout_Admin />
 * </ProtectedRoute>
 */

function ProtectedRoute({ children, requireRole = null }) {
  // Obtenemos los datos del store de Zustand
  const { token, user } = useAuthStore();

  // 🔒 VERIFICACIÓN 1: ¿Está autenticado?
  // Si no hay token, redirige al login
  if (!token) {
    console.log('❌ No hay token, redirigiendo a /login');
    console.log('→ Redirigiendo a /login');
    return <Navigate to="/login" replace />;
  }

  // 🔒 VERIFICACIÓN 2: ¿Tiene el rol requerido?
  // Solo si se especificó un rol requerido
  if (requireRole && user?.role !== requireRole) {
    console.log(`❌ Rol requerido: ${requireRole}, Rol del usuario: ${user?.role}`);
    console.log('Redirigiendo a /403');
    return <Navigate to="/403" replace />;
  }

  /*
  Código más simple/desglosado para la verificación2
   if (requireRole) {
    console.log(`🔍 ProtectedRoute: Verificando rol`);
    console.log(`   - Rol requerido: ${requireRole}`);
    console.log(`   - Rol del usuario: ${user?.role}`);
    
    if (user?.role !== requireRole) {
      console.log('❌ ProtectedRoute: Rol incorrecto');
      console.log('→ Redirigiendo a /403');
      return <Navigate to="/403" replace />;
    }
  */

  // ✅ TODO OK: Muestra el componente hijo
  console.log('✅ Acceso permitido');
  return children;
}

export default ProtectedRoute;