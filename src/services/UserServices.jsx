import api from "../api/client";

/**
 * 👥 SERVICIOS DE USUARIOS
 * Todas las operaciones relacionadas con usuarios
 * 
 * Endpoints disponibles (requieren rol admin):
 * - GET /users
 * - DELETE /user/:id
 * - PUT /user/:id
 */

/**
 * Obtener todos los usuarios
 * Requiere rol: admin
 */
export async function getAllUsers() {
  try {
    const response = await api.get("/users");
    
    // Normalizar respuesta (por si viene paginada o en formato especial)
    const list = Array.isArray(response.data) 
      ? response.data 
      : (Array.isArray(response.data?.items) ? response.data.items : []);

    console.log('✅ Usuarios obtenidos:', list.length);
    return { ok: true, data: list };
  } catch (error) {
    console.error("❌ Error al obtener usuarios:", error);
    return { 
      ok: false, 
      error: error.response?.data?.message || error.message || "Error obteniendo usuarios" 
    };
  }
}

/**
 * Actualizar el rol de un usuario
 * Requiere rol: admin
 * 
 * @param {number|string} id - ID del usuario
 * @param {string} newRole - Nuevo rol ('user' o 'admin')
 */
export async function updateUserRole(id, newRole) {
  try {
    // El backend espera un objeto con el campo que queremos actualizar
    const response = await api.put(`/user/${id}`, { role: newRole });
    
    console.log('✅ Rol actualizado correctamente');
    return { ok: true, data: response.data };
  } catch (error) {
    console.error("❌ Error al actualizar rol:", error);
    return { 
      ok: false, 
      error: error.response?.data?.message || error.message || "Error actualizando rol" 
    };
  }
}

/**
 * Eliminar un usuario por ID
 * Requiere rol: admin
 * 
 * @param {number|string} id - ID del usuario a eliminar
 */
export async function deleteUser(id) {
  try {
    const response = await api.delete(`/user/${id}`);
    
    console.log('✅ Usuario eliminado correctamente');
    return { ok: true, data: response.data ?? true };
  } catch (error) {
    console.error("❌ Error al eliminar usuario:", error);
    return { 
      ok: false, 
      error: error.response?.data?.message || error.message || "Error eliminando usuario" 
    };
  }
}
