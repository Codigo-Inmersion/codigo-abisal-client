import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginService, register as registerService } from '../services/AuthServices';

/**
 * Hook personalizado para manejar autenticación
 * 
 * FUNCIONALIDADES:
 * - Gestiona estados de loading y error
 * - Conecta con AuthServices
 * - Maneja navegación post-login
 * - Guarda token en localStorage (básico por ahora)
 */
export const useAuth = () => {
  const navigate = useNavigate();
  
  // Estados
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Limpia el mensaje de error
   */
  const clearError = () => {
    setError(null);
  };

  /**
   * Función de login
   * @param {Object} credentials - {email, password}
   */
  const login = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      // Llamar al servicio
      const response = await loginService(credentials);
      
      // 🔍 DEBUGGING: Ver qué devuelve el backend
      console.log('✅ Login exitoso - Response completa:', response);
      console.log('📦 Data recibida:', response.data);

      // Extraer token y usuario
      const { token, user } = response.data;

      // Validar que vengan los datos necesarios
      if (!token) {
        throw new Error('El servidor no devolvió un token');
      }

      console.log('🔑 Token recibido:', token);
      console.log('👤 Usuario:', user);

      // Guardar en localStorage (versión simple)
      localStorage.setItem('token', token);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }

      // Redirigir según el rol del usuario
      if (user?.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }

      return response.data;

    } catch (err) {
      console.error('❌ Error en login:', err);

      // Extraer mensaje de error apropiado
      let errorMessage = 'Error al iniciar sesión';

      if (err.response) {
        // Error de respuesta del servidor (4xx, 5xx)
        console.log('📛 Error del servidor:', err.response.data);
        errorMessage = err.response.data.message || 
                      err.response.data.error || 
                      `Error ${err.response.status}`;
      } else if (err.request) {
        // La petición se hizo pero no hubo respuesta
        errorMessage = 'No se pudo conectar con el servidor';
        console.log('🔌 Sin respuesta del servidor');
      } else {
        // Error al configurar la petición
        errorMessage = err.message;
      }

      setError(errorMessage);
      throw err; // Re-lanzar para que el componente pueda manejarlo si quiere

    } finally {
      setLoading(false);
    }
  };

  /**
   * Función de registro (placeholder por ahora)
   * @param {Object} userData - Datos del nuevo usuario
   */
  const register = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await registerService(userData);
      console.log('✅ Registro exitoso:', response.data);

      // Puedes hacer login automático después del registro
      // o redirigir a login
      navigate('/login');
      
      return response.data;

    } catch (err) {
      console.error('❌ Error en registro:', err);
      
      let errorMessage = 'Error al registrarse';
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      
      setError(errorMessage);
      throw err;

    } finally {
      setLoading(false);
    }
  };

  /**
   * Función de logout
   */
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  /**
   * Obtener token del localStorage
   */
  const getToken = () => {
    return localStorage.getItem('token');
  };

  /**
   * Verificar si hay un usuario logueado
   */
  const isAuthenticated = () => {
    return !!getToken();
  };

  return {
    login,
    register,
    logout,
    loading,
    error,
    clearError,
    getToken,
    isAuthenticated
  };
};