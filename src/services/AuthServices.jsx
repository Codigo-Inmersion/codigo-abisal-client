// src/services/AuthService.jsx
/**
 * SERVICIO DE AUTENTICACIÓN - VERSIÓN HÍBRIDA MEJORADA
 * 
 * Combina lo mejor de ambas versiones:
 * - Fetch API nativo (sin dependencias extra)
 * - Manejo robusto de errores
 * - Decodificación y validación de JWT
 * - Soporte para refresh tokens
 * - Verificación de roles
 */

// ============================================
// CONSTANTES
// ============================================
const TOKEN_KEY = 'abisal_token';
const REFRESH_TOKEN_KEY = 'abisal_refresh_token';
const USER_KEY = 'abisal_user';

// ⚠️ BACKEND: Confirmar URL base de la API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// ============================================
// FUNCIONES AUXILIARES PRIVADAS
// ============================================

/**
 * Decodifica un token JWT
 * @private
 */
const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decodificando token:', error);
    return null;
  }
};

/**
 * Verifica si un token ha expirado
 * @private
 */
const isTokenExpired = (token) => {
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) return true;
  
  const currentTime = Date.now() / 1000;
  // Añadimos 60 segundos de margen para evitar problemas de timing
  return decoded.exp < (currentTime + 60);
};

// ============================================
// SERVICIO DE AUTENTICACIÓN
// ============================================

const AuthService = {
  // ============================================
  // GESTIÓN DE TOKENS
  // ============================================

  /**
   * Guarda el token de acceso
   */
  setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  /**
   * Obtiene el token de acceso
   */
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Guarda el refresh token
   */
  setRefreshToken(token) {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },

  /**
   * Obtiene el refresh token
   */
  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  /**
   * Elimina todos los tokens y datos del usuario
   */
  clearStorage() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  // ============================================
  // GESTIÓN DE USUARIO
  // ============================================

  /**
   * Guarda la información del usuario
   */
  setUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  /**
   * Obtiene el usuario desde localStorage o desde el token
   */
  getCurrentUser() {
    // Primero intenta desde localStorage (más rápido)
    const userStr = localStorage.getItem(USER_KEY);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        console.error('Error parseando usuario:', e);
      }
    }

    // Si no existe, lo extrae del token
    const token = this.getToken();
    if (!token) return null;
    
    return decodeJWT(token);
  },

  // ============================================
  // VERIFICACIÓN DE AUTENTICACIÓN
  // ============================================

  /**
   * Verifica si hay un usuario autenticado con token válido
   */
  isAuthenticated() {
    const token = this.getToken();
    if (!token) return false;
    
    // Verifica si el token expiró
    if (isTokenExpired(token)) {
      this.clearStorage();
      return false;
    }
    
    return true;
  },

  /**
   * Verifica si el usuario tiene un rol específico
   */
  hasRole(requiredRole) {
    const user = this.getCurrentUser();
    if (!user || !user.role) return false;
    
    return user.role === requiredRole;
  },

  /**
   * Verifica si el usuario es admin
   */
  isAdmin() {
    return this.hasRole('admin');
  },

  // ============================================
  // LOGIN
  // ============================================

  /**
   * Realiza el login del usuario
   * 
   * ⚠️ BACKEND: Confirmar:
   * - Endpoint: /api/auth/login
   * - Respuesta esperada: { token, refreshToken?, user }
   * 
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<{token: string, user: object}>}
   */
  async login(email, password) {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      // Manejo de errores HTTP
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Credenciales incorrectas');
      }

      const data = await response.json();
      
      // Validar respuesta del servidor
      if (!data.token) {
        throw new Error('Respuesta del servidor inválida: falta token');
      }

      // Guardar token principal
      this.setToken(data.token);
      
      // Guardar refresh token si existe
      if (data.refreshToken) {
        this.setRefreshToken(data.refreshToken);
      }

      // Guardar información del usuario
      if (data.user) {
        this.setUser(data.user);
      }

      return {
        token: data.token,
        user: data.user || decodeJWT(data.token)
      };

    } catch (error) {
      // Manejo de errores mejorado
      if (error.message.includes('Failed to fetch')) {
        throw new Error('No se pudo conectar con el servidor');
      }
      
      console.error('Error en login:', error);
      throw error;
    }
  },

  // ============================================
  // REGISTER
  // ============================================

  /**
   * Registra un nuevo usuario
   * 
   * ⚠️ BACKEND: Confirmar:
   * - Endpoint: /api/auth/register
   * - Campos requeridos: { email, password, name? }
   * 
   * @param {object} userData - Datos del usuario
   * @returns {Promise<{token: string, user: object}>}
   */
  async register(userData) {
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al registrarse');
      }

      const data = await response.json();
      
      // Validar respuesta
      if (!data.token) {
        throw new Error('Respuesta del servidor inválida: falta token');
      }

      // Guardar datos igual que en login
      this.setToken(data.token);
      
      if (data.refreshToken) {
        this.setRefreshToken(data.refreshToken);
      }

      if (data.user) {
        this.setUser(data.user);
      }

      return {
        token: data.token,
        user: data.user || decodeJWT(data.token)
      };

    } catch (error) {
      if (error.message.includes('Failed to fetch')) {
        throw new Error('No se pudo conectar con el servidor');
      }
      
      console.error('Error en registro:', error);
      throw error;
    }
  },

  // ============================================
  // LOGOUT
  // ============================================

  /**
   * Cierra la sesión del usuario
   * Intenta invalidar el token en el backend
   */
  async logout() {
    const token = this.getToken();
    
    try {
      // Opcional: Invalidar token en el backend
      // ⚠️ BACKEND: Confirmar si implementan endpoint de logout
      if (token) {
        await fetch(`${API_URL}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }
    } catch (error) {
      // No es crítico si falla el logout en backend
      console.warn('No se pudo invalidar el token en el servidor:', error);
    } finally {
      // SIEMPRE limpiar datos locales
      this.clearStorage();
    }
  },

  // ============================================
  // REFRESH TOKEN (para implementación futura)
  // ============================================

  /**
   * Refresca el token de acceso usando el refresh token
   * 
   * ⚠️ BACKEND: Implementar endpoint /api/auth/refresh
   * 
   * @returns {Promise<string>} Nuevo token de acceso
   */
  async refreshAccessToken() {
    const refreshToken = this.getRefreshToken();
    
    if (!refreshToken) {
      throw new Error('No hay refresh token disponible');
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refreshToken })
      });

      if (!response.ok) {
        throw new Error('No se pudo refrescar el token');
      }

      const data = await response.json();
      
      if (data.token) {
        this.setToken(data.token);
        return data.token;
      }

      throw new Error('Respuesta inválida del servidor');

    } catch (error) {
      // Si falla el refresh, cerrar sesión
      this.clearStorage();
      throw error;
    }
  }
};

export default AuthService;