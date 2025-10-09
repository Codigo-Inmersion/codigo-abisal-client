import { create } from "zustand";

/**
 * 🎓 EXPLICACIÓN: Store de Autenticación
 *
 * Zustand crea un "almacén" global que puede ser usado desde cualquier componente.
 * Es como una caja donde guardamos información importante que varios componentes necesitan.
 */

const useAuthStore = create((set, get) => ({
  // 📦 ESTADO (los datos que guardamos)

  // El token JWT que nos da el backend cuando iniciamos sesión
  token: localStorage.getItem("token") || null,

  // Los datos del usuario (nombre, email, rol, etc.)
  user: JSON.parse(localStorage.getItem("user")) || null,

  // Si está cargando o no
  isLoading: false,

  // 🔧 ACCIONES (funciones para modificar el estado)

  /*
   * LOGIN - Guardar token y datos del usuario
   * Se llama después de una autenticación exitosa
   */
  login: (token, userData) => {
    console.log("🔐 authStore: Guardando sesión");
    console.log("   - Token:", token.substring(0, 20) + "...");
    console.log("   - Usuario:", userData.email);
    console.log("   - Rol:", userData.role);
    // Guardamos en localStorage para que persista al recargar la página
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));

    // Actualizamos el estado de Zustand
    set({
      token: token,
      user: userData,
    });
    console.log("✅ authStore: Sesión guardada correctamente");
  },

  /**
   * LOGOUT
   * Limpiar todo cuando el usuario cierra sesión
   */
  logout: () => {
    console.log("👋 authStore: Cerrando sesión");
    // Borramos del localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Limpiamos el estado
    set({
      token: null,
      user: null,
    });
    console.log("✅ authStore: Sesión cerrada");
  },

  /**
   * IS AUTHENTICATED - Verificar si hay una sesión activa
   * Retorna true si existe un token
   */
  isAuthenticated: () => {
    const state = get();
    return state.token !== null;
  },

  /**
   * HAS ROLE - Verificar si el usuario tiene un rol específico
   * Ejemplo: hasRole('admin') → true/false
   */
  hasRole: (role) => {
    const state = get();
    return state.user?.role === role;
  },


  /**
   * Actualizar el estado de carga
   */
  setLoading: (loading) => set({ isLoading: loading }),
}));

export default useAuthStore;
