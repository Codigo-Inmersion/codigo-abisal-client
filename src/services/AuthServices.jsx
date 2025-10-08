/**
 * SERVICIO DE AUTENTICACIÓN
 * 
 * Gestiona:
 * - Tokens JWT (guardar, leer, validar)
 * - Login/Logout
 * - Verificación de roles
 */

const TOKEN_KEY = 'abisal_token';
const REFRESH_TOKEN_KEY = 'abisal_refresh_token';

// 🔧 Configuración de la API desde variables de entorno
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// ============================================
// FUNCIONES AUXILIARES
// ============================================

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

const isTokenExpired = (token) => {
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) return true;
  
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
};

// ============================================
// SERVICIO DE AUTENTICACIÓN
// ============================================

const authService = {
  // ============================================
  // GESTIÓN DE TOKENS
  // ============================================

  setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  setRefreshToken(token) {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },

  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  // ============================================
  // VERIFICACIÓN DE AUTENTICACIÓN
  // ============================================

  isAuthenticated() {
    const token = this.getToken();
    if (!token) return false;
    
    if (isTokenExpired(token)) {
      this.removeToken();
      return false;
    }
    
    return true;
  },

  getCurrentUser() {
    const token = this.getToken();
    if (!token) return null;
    
    return decodeJWT(token);
  },

  hasRole(requiredRole) {
    const user = this.getCurrentUser();
    if (!user || !user.role) return false;
    
    return user.role === requiredRole;
  },

  // ============================================
  // LOGIN - VERSIÓN REAL
  // ============================================

  /**
   * LOGIN con Backend Real
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

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al iniciar sesión');
      }

      const data = await response.json();
      
      // Guardar tokens
      if (data.token) {
        this.setToken(data.token);
      }
      
      if (data.refreshToken) {
        this.setRefreshToken(data.refreshToken);
      }

      return {
        token: data.token,
        user: data.user
      };
    } catch (error) {
      console.error('Error en login:', error);
      throw new Error(error.message || 'Error al iniciar sesión');
    }
  },

  // ============================================
  // REGISTER - VERSIÓN REAL
  // ============================================

  /**
   * REGISTRO con Backend Real
   * 
   * @param {object} userData - {email, password, name}
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
      
      // Guardar tokens
      if (data.token) {
        this.setToken(data.token);
      }
      
      if (data.refreshToken) {
        this.setRefreshToken(data.refreshToken);
      }

      return {
        token: data.token,
        user: data.user
      };
    } catch (error) {
      console.error('Error en registro:', error);
      throw new Error(error.message || 'Error al registrarse');
    }
  },

  // ============================================
  // LOGOUT
  // ============================================

  async logout() {
    try {
      const token = this.getToken();
      
      // Opcional: Invalidar token en el backend
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
      console.error('Error al cerrar sesión en el backend:', error);
    } finally {
      // Siempre limpiar tokens locales
      this.removeToken();
    }
  }
};

export default authService;