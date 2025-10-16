import api from "../api/client";

/**
 * 🎓 EXPLICACIÓN: Servicios de Autenticación
 * 
 * Este archivo contiene todas las funciones para comunicarse
 * con el backend en temas de autenticación:
 * - login: Iniciar sesión
 * - register: Registrar nuevo usuario
 * 
 * ESTRUCTURA DE RESPUESTA DEL BACKEND:
 * { message: "string", token: "jwt-token" }
 */

const AuthServices = {
  /**
   * 🔐 LOGIN - Iniciar sesión
   * 
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña
   * @returns {Promise<{message: string, token: string}>}
   * 
   * Endpoint: POST /auth/login
   * Body: { email, password }
   * Response: { message, token }
   */
  login: async (email, password) => {
    try {
      console.log('🔑 AuthServices.login: Intentando login para', email);
      
      const response = await api.post('/auth/login', {
        email,
        password
      });

      console.log('✅ Login exitoso:', response.data.message);
      
      // El backend devuelve { message, token }
      return response.data;
      
    } catch (error) {
      console.error('❌ Error en login:', error.response?.data || error.message);
      
      // Lanzar error con mensaje específico
      throw new Error(
        error.response?.data?.message || 
        'Error al iniciar sesión. Verifica tus credenciales.'
      );
    }
  },

  /**
   * 📝 REGISTER - Registrar nuevo usuario
   * 
   * @param {Object} userData - Datos del usuario
   * @param {string} userData.username - Nombre de usuario
   * @param {string} userData.name - Nombre
   * @param {string} userData.last_name - Apellido
   * @param {string} userData.email - Email
   * @param {string} userData.password - Contraseña
   * @param {string} [userData.role] - Rol (opcional, por defecto "user")
   * @returns {Promise<{message: string, token: string}>}
   * 
   * Endpoint: POST /auth/register
   * Body: { username, name, last_name, email, password, role? }
   * Response: { message, token }
   */
  register: async (userData) => {
    try {
      console.log('📝 AuthServices.register: Registrando usuario', userData.email);
      
      const response = await api.post('/auth/register', {
        username: userData.username,
        name: userData.name,
        last_name: userData.last_name,
        email: userData.email,
        password: userData.password,
        role: userData.role || 'user'  // Por defecto "user"
      });

      console.log('✅ Registro exitoso:', response.data.message);
      
      // El backend devuelve { message, token }
      return response.data;
      
    } catch (error) {
      console.error('❌ Error en registro:', error.response?.data || error.message);
      
      // Lanzar error con mensaje específico
      throw new Error(
        error.response?.data?.message || 
        'Error al registrar usuario. Intenta de nuevo.'
      );
    }
  },

  /**
   * 🔍 DECODE TOKEN - Decodificar JWT (sin verificar firma)
   * 
   * Esta función decodifica el token JWT para extraer la información
   * del usuario sin necesidad de hacer una petición al backend.
   * 
   * ⚠️ IMPORTANTE: Esto NO verifica la firma del token, solo lo decodifica.
   * La verificación real de seguridad la hace el backend.
   * 
   * @param {string} token - Token JWT
   * @returns {Object} - Datos decodificados del token
   */
  decodeToken: (token) => {
    try {
      // Un JWT tiene 3 partes separadas por puntos: header.payload.signature
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Token inválido');
      }

      // Decodificar el payload (segunda parte)
      const payload = parts[1];
      const decoded = JSON.parse(atob(payload));
      
      console.log('🔍 Token decodificado:', decoded);
      return decoded;
      
    } catch (error) {
      console.error('❌ Error decodificando token:', error);
      throw new Error('Error al decodificar token');
    }
  }
};

export default AuthServices;