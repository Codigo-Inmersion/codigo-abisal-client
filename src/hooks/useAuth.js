import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/authStore';
import AuthServices from '../services/AuthServices';

/**
 * 🎓 EXPLICACIÓN: Hook personalizado useAuth
 * 
 * Este hook encapsula toda la lógica de autenticación:
 * - login: Iniciar sesión
 * - logout: Cerrar sesión
 * - register: Registrar usuario
 * - Estados: loading, error
 * 
 * VENTAJAS:
 * - Reutilizable en cualquier componente
 * - Separa la lógica del UI
 * - Maneja estados de carga y errores
 */

export const useAuth = () => {
  const navigate = useNavigate();
  
  // Estados del hook
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Acciones del store de Zustand
  const loginStore = useAuthStore((state) => state.login);
  const logoutStore = useAuthStore((state) => state.logout);
  
  // Usuario y token del store (para acceder desde componentes)
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  /**
   * 🔐 LOGIN - Iniciar sesión
   * 
   * @param {Object} credentials - Credenciales del usuario
   * @param {string} credentials.email - Email
   * @param {string} credentials.password - Contraseña
   */
  const login = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      console.log('🔑 useAuth.login: Iniciando proceso de login');

      // Llamar al servicio de autenticación
      const response = await AuthServices.login(
        credentials.email,
        credentials.password
      );

      // response = { message, token }
      console.log('✅ Login exitoso:', response.message);

      // Guardar token en el store (se decodifica automáticamente)
      loginStore(response.token);

      // Obtener el usuario actualizado del store
      const currentUser = useAuthStore.getState().user;

      // Redirigir según el rol
      if (currentUser?.role === 'admin') {
        console.log('→ Redirigiendo a panel de admin');
        navigate('/admin/dashboard');
      } else {
        console.log('→ Redirigiendo a home');
        navigate('/');
      }

    } catch (err) {
      console.error('❌ Error en login:', err);
      setError(err.message || 'Error al iniciar sesión. Verifica tus credenciales.');
      throw err; // Re-lanzar para que el componente pueda manejarlo si quiere
    } finally {
      setLoading(false);
    }
  };

  /**
   * 👋 LOGOUT - Cerrar sesión
   */
  const logout = () => {
    console.log('👋 useAuth.logout: Cerrando sesión');
    
    logoutStore();
    navigate('/login');
  };

  /**
   * 📝 REGISTER - Registrar nuevo usuario
   * 
   * @param {Object} userData - Datos del usuario
   * @param {string} userData.username - Nombre de usuario
   * @param {string} userData.name - Nombre
   * @param {string} userData.last_name - Apellido
   * @param {string} userData.email - Email
   * @param {string} userData.password - Contraseña
   */
  const register = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      console.log('📝 useAuth.register: Iniciando registro');

      // Llamar al servicio de registro
      const response = await AuthServices.register(userData);

      console.log('✅ Registro exitoso:', response.message);

      // Auto-login: Guardar token
      loginStore(response.token);

      // Redirigir al home
      console.log('→ Redirigiendo al home');
      navigate('/');

    } catch (err) {
      console.error('❌ Error en registro:', err);
      setError(err.message || 'Error al registrar usuario.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * 🧹 CLEAR ERROR - Limpiar mensaje de error
   */
  const clearError = () => {
    setError(null);
  };

  // Retornar todo lo que los componentes necesitan
  return {
    // Funciones
    login,
    logout,
    register,
    clearError,
    
    // Estados
    loading,
    error,
    user,
    token,
    
    // Estados computados
    isAuthenticated: !!token
  };
};
