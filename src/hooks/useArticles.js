// // src/hooks/useArticles.js

// import { useState, useEffect } from 'react';
// // import { API_URL, fetchApi } from '../services/AbisalServices.jsx';
// import { getAbisalArticles } from '../services/AbisalServices';
 
// /**
//  * Custom Hook para obtener la lista de artículos.
//  * Encapsula la lógica de fetching, el estado de carga y los errores.
//  * @returns {{articles: Array, isLoading: boolean, error: Error|null}}
//  */
// export function useArticles() {
//   const [articles, setArticles] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getArticles = async () => {
//       try {
//         setIsLoading(true);
//         setError(null);
//         const data = await getAbisalArticles();
//         setArticles(data); // Asumimos que la API ya los devuelve ordenados
//       } catch (err) {
//         setError(err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     getArticles();
//   }, []); // El array vacío asegura que se ejecute solo una vez

//   return { articles, isLoading, error };
// }

import { useState, useEffect } from 'react';
import { getAbisalArticles } from '../services/AbisalServices';

export function useArticles(params = {}) {
  const [articles, setArticles] = useState([]);
  const [meta, setMeta] = useState(null);        // opcional, por si quieres paginación
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      setIsLoading(true);
      setError(null);

      const res = await getAbisalArticles(params); // ← res = { ok, data (array), meta? }

      if (!alive) return;

      if (res.ok) {
        setArticles(Array.isArray(res.data) ? res.data : []); // 👈 guardo SOLO el array
        setMeta(res.meta || null);
      } else {
        setArticles([]);
        setMeta(null);
        setError(res.error || 'Error al cargar artículos');
      }

      setIsLoading(false);
    })();

    return () => { alive = false; };
  }, [JSON.stringify(params)]);

  return { articles, meta, isLoading, error };
}
