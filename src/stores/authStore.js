import { create } from 'zustand';

/**
 * 🎓 EXPLICACIÓN: Store de Autenticación
 * 
 * Zustand crea un "almacén" global que puede ser usado desde cualquier componente.
 * Es como una caja donde guardamos información importante que varios componentes necesitan.
 */

const useAuthStore = create((set) => ({
  // 📦 ESTADO (los datos que guardamos)
  
  // El token JWT que nos da el backend cuando iniciamos sesión
  token: localStorage.getItem('token') || null,
  
  // Los datos del usuario (nombre, email, rol, etc.)
  user: JSON.parse(localStorage.getItem('user')) || null,
  
  // Si está cargando o no
  isLoading: false,

  // 🔧 ACCIONES (funciones para modificar el estado)
  
  /**
   * Guardar los datos cuando el usuario inicia sesión
   */
  login: (token, userData) => {
    // Guardamos en localStorage para que persista al recargar la página
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Actualizamos el estado de Zustand
    set({ 
      token: token, 
      user: userData 
    });
  },

  /**
   * Limpiar todo cuando el usuario cierra sesión
   */
  logout: () => {
    // Borramos del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Limpiamos el estado
    set({ 
      token: null, 
      user: null 
    });
  },

  /**
   * Verificar si el usuario está autenticado
   * (tiene token guardado)
   */
  isAuthenticated: () => {
    const state = useAuthStore.getState();
    return state.token !== null;
  },

  /**
   * Verificar si el usuario tiene un rol específico
   * Por ejemplo: isAdmin, isUser, etc.
   */
  hasRole: (role) => {
    const state = useAuthStore.getState();
    return state.user?.role === role;
  },

  /**
   * Actualizar el estado de carga
   */
  setLoading: (loading) => set({ isLoading: loading })
}));

export default useAuthStore;