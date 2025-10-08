// export const API_URL = "http://localhost:8080/article";
// /**
//  * Función genérica para hacer peticiones fetch.
//  * Maneja errores comunes y convierte la respuesta a JSON.
//  * @param {string} url - La URL a la que hacer la petición.
//  * @returns {Promise<any>} - La promesa con los datos en formato JSON.
//  */
// export const fetchApi = async (url) => {
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error(`Error ${response.status}: No se pudo conectar con el servidor.`);
//   }
//   return response.json();
// };

// /**
//  * 🔐 Obtiene un artículo por su ID desde el backend.
//  * Usa try/catch para manejar errores de red.
//  * En el futuro, si tienes login, añadiremos el token.
//  *
//  * @param {number|string} id - //ID del artículo que quieres obtener
//  * @returns {Promise<object>}  //Devuelve { ok: true, data } o { ok: false, error }
//  */
// export async function getArticleById(id) {
//   try {
//     // 2️⃣ Construimos la URL completa, por ejemplo: http://localhost:8080/article/3
//     const url = `${API_URL}/${id}`;

//     // 3️⃣ (Opcional en el futuro) — si hay token de usuario, lo añadiremos aquí:
//     // const token = localStorage.getItem("access_token");

//     // 4️⃣ Hacemos la petición HTTP al backend
//     const response = await fetch(url, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         // Authorization: `Bearer ${token}`,  ← la activaremos cuando tengas login
//       },
//     });

//     // 5️⃣ Si el servidor responde con error (404, 500, etc.), lanzamos error
//     if (!response.ok) {
//       throw new Error(`Error ${response.status}: no se pudo cargar el artículo`);
//     }

//     // 6️⃣ Si todo fue bien, convertimos la respuesta a JSON
//     const data = await response.json();

//     // 7️⃣ Devolvemos el artículo dentro de un objeto con ok:true
//     return { ok: true, data };

//   } catch (error) {
//     // 8️⃣ Si algo falla (red caída, timeout, error 404...), lo capturamos aquí
//     console.error("Error al obtener artículo:", error);
//     return { ok: false, error: error.message || "Error desconocido" };
//   }
// }
// src/services/articles.js
// =====================================
// 📄 Servicio para pedir un artículo por ID
// Ahora usa tu cliente Axios centralizado (api/client.js)
// =====================================

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
    // 1️⃣ Hacemos la petición con Axios usando el cliente ya configurado
    // Ejemplo: GET http://localhost:8080/article/3
    const response = await api.get(`/article/${id}`);

    // 2️⃣ Si todo va bien, devolvemos el contenido de la respuesta
    return { ok: true, data: response.data };
  } catch (error) {
    // 3️⃣ Si hay error, lo capturamos (el interceptor ya lo limpia)
    console.error("Error al obtener artículo:", error);
    return { ok: false, error: error.message || "Error desconocido" };
  }
}
