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
  // 📦 ESTADO
  token: localStorage.getItem("token") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  isLoading: false,

  // 🔧 ACCIONES
  login: (token) => {
    console.log("🔐 authStore: Guardando sesión");
    
    const decoded = decodeToken(token);
    if (!decoded) return;

    const userData = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role,
      exp: decoded.exp,
      iat: decoded.iat
    };

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    set({
      token: token,
      user: userData,
    });

    console.log("✅ authStore: Sesión guardada correctamente");
  },

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

  setLoading: (loading) => set({ isLoading: loading }),

  // 🔹 MODIFICACIÓN PARA LA NAVBAR
  get isAuthenticated() {
    return get().token !== null;
  },

  get role() {
    return get().user?.role || null;
  },

  hasRole: (role) => {
    const state = get();
    return state.user?.role === role;
  },
}));

export default useAuthStore;
