
import axios from "axios";

// 1) Leemos la URL base de Vite (.env). Debe empezar por VITE_
const RAW_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

// 2) Quitamos / final para evitar dobles //
const BASE_URL = RAW_BASE_URL.replace(/\/+$/, "");

// 3) Creamos la instancia de Axios
export const api = axios.create({
  baseURL: BASE_URL, // p.ej. http://localhost:8080
  timeout: 8000,     // 8s de timeout
  // withCredentials: true, // Actívalo si usas cookies httpOnly
});

// 4) Interceptor de REQUEST (sale de tu app hacia el backend)
api.interceptors.request.use(
  (config) => {
    // 4.1) Si ya tienes login en el futuro, leerás el access_token aquí
    const token = localStorage.getItem("access_token");
    if (token) {
      // 4.2) Inyectamos el Bearer token en Authorization
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    // 4.3) Aceptamos JSON por defecto
    config.headers = {
      Accept: "application/json",
      ...config.headers,
    };
    return config;
  },
  (error) => Promise.reject(error)
);

// 5) Interceptor de RESPONSE (entra la respuesta del backend)
api.interceptors.response.use(
  (r) => r,
  (err) => {
    // 5.1) Errores sin respuesta (caída de red, timeout)
    if (!err.response) {
      const reason =
        err.code === "ECONNABORTED"
          ? "La solicitud tardó demasiado (timeout)."
          : "No se pudo conectar con el servidor.";
      return Promise.reject(new Error(reason));
    }

    const { data, status } = err.response;

    // 5.2) Manejo de express-validator: [{ msg, path/param, ... }]
    if (Array.isArray(data?.errors) && data.errors.length > 0) {
      const list = data.errors
        .map((e) => {
          const field = e.path || e.param || "campo";
          return `${field}: ${e.msg}`;
        })
        .join(" | ");
      return Promise.reject(new Error(list));
    }

    // 5.3) Mensajes típicos del backend
    const msg =
      data?.error ||
      data?.message ||
      (status ? `Error ${status}` : err.message);

    // 5.4) Si quieres tratar 401 aquí (redirigir a /login), lo harás en el futuro
    // if (status === 401) { /* limpiar tokens, navegar a /login */ }

    return Promise.reject(new Error(msg));
  }
);

export default api;
