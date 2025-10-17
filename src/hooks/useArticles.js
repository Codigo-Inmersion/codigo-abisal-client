
import { useState, useEffect } from 'react';
import { getAbisalArticles, getUsernameById } from '../services/AbisalServices';

export function useArticles(params = {}) {
  const [articles, setArticles] = useState([]);
  const [meta, setMeta] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    let alive = true;
    (async () => {
      setIsLoading(true);
      setError(null);

      const res = await getAbisalArticles(params);

      if (!alive) return;

      if (res.ok) {
        const articlesData = Array.isArray(res.data) ? res.data : [];

        // 2. Buscamos los nombres de usuario para cada artículo
        const articlesWithUsernames = await Promise.all(
          articlesData.map(async (article) => {
            if (article.creator_id) {
              const userRes = await getUsernameById(article.creator_id);
              // Añadimos el username al objeto del artículo
              return {
                ...article,
                username: userRes.ok ? userRes.name : 'Desconocido',
              };
            }
            // Si no hay creator_id, lo dejamos como 'Desconocido'
            return { ...article, username: 'Desconocido' };
          })
        );
        
        if (!alive) return;

        // 3. Guardamos los artículos ya enriquecidos con el username
          console.log('🕵️‍♂️ Datos listos para guardar en el estado:', articlesWithUsernames);

        setArticles(articlesWithUsernames);
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