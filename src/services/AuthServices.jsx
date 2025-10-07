
/**
 * SERVICIO DE AUTENTICACIÓN
 * 
 * Gestiona:
 * - Tokens JWT (guardar, leer, validar)
 * - Login/Logout
 * - Verificación de roles
 * 
 * NOTA: Actualmente usa datos MOCK para desarrollo independiente.
 * Cuando el backend esté listo, activar la versión real.
 */

const TOKEN_KEY = 'abisal_token';
const REFRESH_TOKEN_KEY = 'abisal_refresh_token';

// ============================================
// FUNCIONES AUXILIARES
// ============================================

/**
 * Decodificar JWT manualmente
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
 * Verificar si el token ha expirado
 */
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
  // LOGIN - VERSIÓN MOCK
  // ============================================

  /**
   * LOGIN CON MOCK
   * 
   * 🎭 Simula autenticación para desarrollo independiente
   * 
   * Usuarios de prueba:
   * - user@test.com (cualquier password) → rol 'user'
   * - admin@test.com (cualquier password) → rol 'admin'
   * - Cualquier email con 'admin' → rol 'admin'
   * 
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<{token: string, user: object}>}
   */
  async login(email, password) {
    // 🎭 MOCK TEMPORAL - Eliminar cuando backend esté listo
    console.log('🎭 Usando LOGIN MOCK - reemplazar con backend real');
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Validaciones básicas
        if (!email || !password) {
          reject(new Error('Email y password son requeridos'));
          return;
        }

        if (password.length < 3) {
          reject(new Error('Password debe tener al menos 3 caracteres'));
          return;
        }

        // Determinar rol según el email
        const role = email.toLowerCase().includes('admin') ? 'admin' : 'user';
        
        // Crear payload del token
        const payload = {
          userId: '123',
          email: email,
          role: role,
          name: role === 'admin' ? 'Admin User' : 'Normal User',
          exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24h
          iat: Math.floor(Date.now() / 1000)
        };
        
        // Crear token simulado
        const fakeToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify(payload))}.fake_signature`;
        
        resolve({
          token: fakeToken,
          user: {
            id: '123',
            email: email,
            name: payload.name,
            role: role
          }
        });
      }, 500); // Simular latencia de red
    });
  },

  // ============================================
  // LOGIN - VERSIÓN REAL (COMENTADA)
  // ============================================
  
  /**
   * LOGIN REAL - DESCOMENTAR CUANDO BACKEND ESTÉ LISTO
   * 
   * Reemplazar la función login() de arriba con esta:
   * 
   * async login(email, password) {
   *   const API_URL = import.meta.env.VITE_API_URL;
   *   
   *   try {
   *     const response = await fetch(`${API_URL}/auth/login`, {
   *       method: 'POST',
   *       headers: {
   *         'Content-Type': 'application/json'
   *       },
   *       body: JSON.stringify({ email, password })
   *     });
   * 
   *     if (!response.ok) {
   *       const error = await response.json();
   *       throw new Error(error.message || 'Error al iniciar sesión');
   *     }
   * 
   *     const data = await response.json();
   *     
   *     if (data.token) {
   *       this.setToken(data.token);
   *     }
   *     
   *     if (data.refreshToken) {
   *       this.setRefreshToken(data.refreshToken);
   *     }
   * 
   *     return {
   *       token: data.token,
   *       user: data.user
   *     };
   *   } catch (error) {
   *     throw new Error(error.message || 'Error al iniciar sesión');
   *   }
   * }
   */

  // ============================================
  // LOGOUT
  // ============================================

  async logout() {
    // TODO: Opcional - Llamar al backend para invalidar token
    this.removeToken();
  },

  // ============================================
  // REGISTER - VERSIÓN MOCK
  // ============================================

  async register(userData) {
    // 🎭 MOCK TEMPORAL
    console.log('🎭 Usando REGISTER MOCK - reemplazar con backend real');
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!userData.email || !userData.password) {
          reject(new Error('Email y password son requeridos'));
          return;
        }

        // Simular registro exitoso
        const role = 'user';
        const payload = {
          userId: '124',
          email: userData.email,
          role: role,
          name: userData.name || 'New User',
          exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
          iat: Math.floor(Date.now() / 1000)
        };
        
        const fakeToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify(payload))}.fake_signature`;
        
        resolve({
          token: fakeToken,
          user: {
            id: '124',
            email: userData.email,
            name: userData.name || 'New User',
            role: role
          }
        });
      }, 500);
    });
  }
};

export default authService;