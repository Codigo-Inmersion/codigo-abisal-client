import axios from "axios"

const VITE_API_URL = import.meta.env.VITE_API_URL

export const login = async(data) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await axios.post(`${VITE_API_URL}/login`, data)
    return res
  } catch (error) {
    throw error
  }
};

export const register = async(data) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await axios.post(`${VITE_API_URL}/register`, data)
    return res
  } catch (error) {
    throw error
  }
};


//2 servicios de post. Ponerle try y catch para manjeo de errores. 
// Siguiente paso que la petición me devuelva un token y tratar de recogerlo (esta gestión se hace con Zustand)