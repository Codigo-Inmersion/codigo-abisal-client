import { create } from "zustand";

/**
 * 🎓 EXPLICACIÓN: Store de Autenticación con Zustand
 * 
 * Zustand crea un "almacén" global accesible desde cualquier componente.
 * Guarda el token JWT y extrae automáticamente los datos del usuario.
 */

/**
 * 🔍 Decodificar JWT para extraer información del usuario
 * El backend incluye: { userId, email, role, iat, exp }
 */
const decodeToken = (token) => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const payload = parts[1];
    return JSON.parse(atob(payload));
  } catch (error) {
    console.error('❌ Error decodificando token:', error);
    return null;
  }
};

const useAuthStore = create((set, get) => ({
  // 📦 ESTADO (los datos que guardamos)
  
  token: localStorage.getItem("token") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  isLoading: false,

  // 🔧 ACCIONES (funciones para modificar el estado)

  /**
   * LOGIN - Guardar token y extraer datos del usuario
   * Solo necesita el token, los datos se extraen automáticamente
   */
  login: (token) => {
    console.log("🔐 authStore: Guardando sesión");
    
    // Decodificar el token para extraer datos del usuario
    const decoded = decodeToken(token);
    
    if (!decoded) {
      console.error("❌ No se pudo decodificar el token");
      return;
    }

    // Crear objeto de usuario con los datos del JWT
    const userData = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role,
      exp: decoded.exp,
      iat: decoded.iat
    };

    console.log("   - Usuario:", userData.email);
    console.log("   - Rol:", userData.role);

    // Guardar en localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    // Actualizar estado de Zustand
    set({
      token: token,
      user: userData,
    });
    
    console.log("✅ authStore: Sesión guardada correctamente");
  },

  /**
   * LOGOUT - Limpiar sesión
   */
  logout: () => {
    console.log("👋 authStore: Cerrando sesión");
    
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    set({
      token: null,
      user: null,
    });
    
    console.log("✅ authStore: Sesión cerrada");
  },

  /**
   * IS AUTHENTICATED - Verificar si hay sesión activa
   */
  isAuthenticated: () => {
    const state = get();
    return state.token !== null;
  },

  /**
   * HAS ROLE - Verificar rol del usuario
   */
  hasRole: (role) => {
    const state = get();
    return state.user?.role === role;
  },

  /**
   * SET LOADING - Actualizar estado de carga
   */
  setLoading: (loading) => set({ isLoading: loading }),
}));

export default useAuthStore;
