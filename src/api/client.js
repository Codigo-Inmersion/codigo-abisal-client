import axios from "axios";
import useAuthStore from "../stores/authStore";

/**
 * 🎓 EXPLICACIÓN: Cliente HTTP con Axios
 *
 * Este cliente se encarga de:
 * 1. Configurar la URL base del backend
 * 2. Agregar automáticamente el token JWT a todas las peticiones
 * 3. Manejar errores de autenticación (401)
 *
 * INTERCEPTOR: Se ejecuta antes de cada petición
 * - Lee el token del store de Zustand
 * - Lo agrega al header Authorization
 */

// Crear instancia de axios con configuración base
const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 segundos de timeout
});

// Log para verificar qué URL se está usando (solo en desarrollo)
if (import.meta.env.DEV) {
  console.log(
    "🌐 API URL:",
    import.meta.env.VITE_API_URL || "http://localhost:8000"
  );
}

// 🔧 INTERCEPTOR DE PETICIONES (REQUEST)
// Se ejecuta ANTES de enviar cada petición
client.interceptors.request.use(
  (config) => {
    // Obtener token del store sin usar el hook (getState funciona fuera de componentes)
    /*EXPLICACIÓN
     * Los hooks de React (incluyendo hooks de Zustand) SOLO pueden usarse dentro de componentes de React o custom hooks
     * Un interceptor de Axios NO es un componente de React
     * Es JavaScript puro que se ejecuta fuera del ciclo de vida de React
     */
    const token = useAuthStore.getState().token;

    // Si hay token, agregarlo al header Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("🔑 Token agregado a la petición:", config.url);
    }

    return config;
  },
  (error) => {
    console.error("❌ Error en interceptor de request:", error);
    return Promise.reject(error);
  }
);

// 🔧 INTERCEPTOR DE RESPUESTAS (RESPONSE)
// Se ejecuta DESPUÉS de recibir cada respuesta
client.interceptors.response.use(
  (response) => {
    // Si la respuesta es exitosa (status 2xx), la devuelve tal cual
    return response;
  },
  (error) => {
    // Si hay error, verificar si es 401 (no autorizado)
    if (error.response?.status === 401) {
      console.log("❌ Error 401: Token inválido o expirado");

      // Limpiar sesión y redirigir a login
      const logout = useAuthStore.getState().logout;
      logout();

      // Redirigir a login (si estamos en el navegador)
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default client;
