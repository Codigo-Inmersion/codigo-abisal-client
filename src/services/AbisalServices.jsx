import api from "../api/client";

/**
 * 🔐 Obtiene un artículo por su ID desde el backend.
 * Usa try/catch para manejar errores de red.
 * En el futuro, si tienes login, el Authorization vendrá
 * automáticamente desde el interceptor del cliente Axios.
 *
 * @param {number|string} id - ID del artículo que quieres obtener
 * @returns {Promise<object>} - Devuelve { ok: true, data } o { ok: false, error }
 */
export async function getArticleById(id) {
  try {
    // 1️ Hacemos la petición con Axios usando el cliente ya configurado
   
    const response = await api.get(`/article/${id}`);

    // 2️ Si todo va bien, devolvemos el contenido de la respuesta
    return { ok: true, data: response.data };
  } catch (error) {
    // 3️ Si hay error, lo capturamos (el interceptor ya lo limpia)
    console.error("Error al obtener artículo:", error);
    return { ok: false, error: error.message || "Error desconocido" };
  }
}

export async function getAbisalArticles(params = {}) {
  try {
    const { data } = await api.get("/article", { params });

    //  Normalizo: si data ya es array, lo uso; si es objeto con .items, uso ese array;
    //               si no, dejo array vacío.
    const list = Array.isArray(data) ? data : (Array.isArray(data?.items) ? data.items : []);

    // (Opcional) Puedes exponer meta si venía paginado:
    // const meta = !Array.isArray(data) ? { total: data.total, page: data.page, limit: data.limit, pages: data.pages } : null;

    return { ok: true, data: list };
  } catch (error) {
    return { ok: false, error: error.message || "Error desconocido" };
  }
}


/**
 * POST /article  → crear un artículo
 */
export async function createArticle(payload = {}) {
  try {
    // Hacemos una petición POST a /article enviando el objeto payload tal cual
    const response = await api.post("/article", payload);
    // Si todo va bien, devolvemos ok: true y los datos de la respuesta
    return { ok: true, data: response.data };
  } catch (error) {
    // Si falla, devolvemos ok: false y un mensaje simple
    return { ok: false, error: error.message || "Error creando el artículo" };
  }
}

/**
 * PUT /article/:id  → actualizar un artículo COMPLETO por id
 */
export async function updateArticle(id, payload = {}) {
  try {
    // Hacemos PUT a /article/:id enviando el objeto con los campos a guardar
    const response = await api.put(`/article/${id}`, payload);
    // Devolvemos la respuesta del backend
    return { ok: true, data: response.data };
  } catch (error) {
    return { ok: false, error: error.message || "Error actualizando el artículo" };
  }
}


 //DELETE /article/:id  → borrar un artículo por id
 
export async function deleteArticle(id) {
  try {
    // Llamamos a DELETE sobre el recurso /article/:id
    const response = await api.delete(`/article/${id}`);
    // Algunos backends devuelven 204 sin body; por si acaso, devolvemos true si no hay data
    return { ok: true, data: response.data ?? true };
  } catch (error) {
    return { ok: false, error: error.message || "Error eliminando el artículo" };
  }
}
export async function getUsernameById(id) {
  // Helper que saca el usuario “real” de payloads raros
  const pickUserObject = (payload) => {
    // soporta {user:{...}}, {data:{...}}, array, o el objeto directo
    if (Array.isArray(payload)) return payload[0] || null;
    return payload?.user ?? payload?.data ?? payload ?? null;
  };

  // Helper que extrae un nombre visible del objeto usuario
  const extractName = (u) => {
    if (!u || typeof u !== "object") return "";
    if (u.username) return u.username;
    if (u.name) return u.name;
    if (u.first_name && u.last_name) return `${u.first_name} ${u.last_name}`;
    if (u.email && typeof u.email === "string") {
      // como último recurso, parte local del email
      return u.email.split("@")[0];
    }
    return "";
  };

  try {
    // Intento 1: /user/:id
    const r1 = await api.get(`/user/${id}`);
    const u1 = pickUserObject(r1.data);
    const name1 = extractName(u1);
    if (name1) return { ok: true, name: name1, raw: r1.data };
  } catch (e1) {
    // si 404 pruebo /users/:id
    if (e1?.response?.status !== 404) {
      return { ok: false, error: e1.message || "Error cargando usuario" };
    }
  }

  try {
    // Intento 2: /users/:id
    const r2 = await api.get(`/users/${id}`);
    const u2 = pickUserObject(r2.data);
    const name2 = extractName(u2);
    if (name2) return { ok: true, name: name2, raw: r2.data };
    return { ok: false, error: "Usuario sin nombre reconocible" };
  } catch (e2) {
    return { ok: false, error: e2.message || "No se encontró el usuario" };
  }
}

export async function likeArticle(id) {
  try {
    // Usamos el cliente 'api' que ya incluye el token de autorización
    const response = await api.post(`/article/${id}/like`);
    return { ok: true, data: response.data };
  } catch (error) {
    console.error("Error al dar like:", error.response?.data || error.message);
    return { ok: false, error: error.response?.data?.message || "No se pudo dar like." };
  }
}

/**
 * DELETE /article/:id/like → Quita el "like" de un artículo
 */
export async function unlikeArticle(id) {
  try {
    const response = await api.delete(`/article/${id}/like`);
    return { ok: true, data: response.data };
  } catch (error) {
    console.error("Error al quitar like:", error.response?.data || error.message);
    return { ok: false, error: error.response?.data?.message || "No se pudo quitar el like." };
  }
}