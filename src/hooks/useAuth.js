import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthServices';

/**
 * Custom Hook para manejar la autenticación
 * Proporciona métodos y estado para login/logout
 */
export const useAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(AuthService.getCurrentUser());

  /**
   * Realiza el login del usuario
   * @param {Object} credentials - { email, password }
   */
  const login = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      const data = await AuthService.login(credentials);
      setUser(data.user);
      
      // Redirigir al home tras login exitoso
      navigate('/');
      
      return { success: true, data };
    } catch (err) {
      const errorMessage = err.message || 'Error al iniciar sesión';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cierra la sesión del usuario
   */
  const logout = () => {
    AuthService.logout();
    setUser(null);
    navigate('/login');
  };

  /**
   * Limpia los errores
   */
  const clearError = () => {
    setError(null);
  };

  return {
    user,
    loading,
    error,
    login,
    logout,
    clearError,
    isAuthenticated: AuthService.isAuthenticated()
  };
};
