export const API_URL = "http://localhost:8000/article";
/**
 * Función genérica para hacer peticiones fetch.
 * Maneja errores comunes y convierte la respuesta a JSON.
 * @param {string} url - La URL a la que hacer la petición.
 * @returns {Promise<any>} - La promesa con los datos en formato JSON.
 */
export const fetchApi = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error ${response.status}: No se pudo conectar con el servidor.`);
  }
  return response.json();
};