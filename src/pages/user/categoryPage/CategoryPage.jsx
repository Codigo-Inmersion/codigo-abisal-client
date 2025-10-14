import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useArticles } from '../../../hooks/useArticles';
import ArticleList from '../../../components/common/ArticleList/ArticleList';
import { ArrowLeft } from 'lucide-react';
import './CategoryPage.css';

function CategoryPage() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const { articles, isLoading, error } = useArticles();

  const filteredArticles = useMemo(() => {
    if (!articles || !categoryName) return [];
    // Decodificamos el nombre de la categoría por si contiene espacios (ej: "Fauna%20Abisal")
    const decodedCategory = decodeURIComponent(categoryName);
    return articles.filter(
      article => article.category.toLowerCase() === decodedCategory.toLowerCase()
    );
  }, [articles, categoryName]);

  if (isLoading) return <div className="category-loading">Cargando artículos...</div>;
  if (error) return <div className="category-error">Error: {error}</div>;

  return (
    <div className="category-page-container">
      <div className="category-header">
        <button onClick={() => navigate('/')} className="back-button">
          <ArrowLeft size={20} /> Volver al inicio
        </button>
        <h1>Categoría: <span>{decodeURIComponent(categoryName)}</span></h1>
      </div>
      <ArticleList articles={filteredArticles} />
    </div>
  );
}

export default CategoryPage;