// src/hooks/useArticles.js

import { useState, useEffect } from 'react';
// import { API_URL, fetchApi } from '../services/AbisalServices.jsx';

/**
 * Custom Hook para obtener la lista de artículos.
 * Encapsula la lógica de fetching, el estado de carga y los errores.
 * @returns {{articles: Array, isLoading: boolean, error: Error|null}}
 */
export function useArticles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getArticles = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchApi(API_URL);
        setArticles(data); // Asumimos que la API ya los devuelve ordenados
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    getArticles();
  }, []); // El array vacío asegura que se ejecute solo una vez

  return { articles, isLoading, error };
}