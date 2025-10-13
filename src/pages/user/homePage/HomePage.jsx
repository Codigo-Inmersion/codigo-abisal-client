import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom"; // 1. Importar useNavigate
import { Plus } from 'lucide-react'; // 2. Importar el ícono
import Carousel from "../../../components/common/Carousel/Carousel.jsx";
import Button from "../../../components/common/Button/Button.jsx";
import 'react-multi-carousel/lib/styles.css';
import { useArticles } from '../../../hooks/useArticles.js';
import { useAuth } from '../../../hooks/useAuth.js'; // 3. Importar useAuth
import './HomePage.css';

const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const filterCategories = ["Fauna Abisal", "Ecosistemas", "Exploración", "Conservación"];

function HomePage() {
  const { articles, isLoading, error } = useArticles();
  const { user } = useAuth(); // 4. Obtener la información del usuario
  const navigate = useNavigate(); // 5. Inicializar el hook de navegación

  const baseList = useMemo(() => {
    if (Array.isArray(articles)) return articles;
    if (Array.isArray(articles?.items)) return articles.items;
    return [];
  }, [articles]);

  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    let articlesToFilter = baseList;
    if (selectedCategory) {
      const cat = selected.toLowerCase();
      articlesToFilter = articlesToFilter.filter(
        (a) => a.category && a.category.toLowerCase() === cat
      );
    }
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      articlesToFilter = articlesToFilter.filter(
        (a) =>
          (a.title && a.title.toLowerCase().includes(q)) ||
          (a.description && a.description.toLowerCase().includes(q))
      );
    }
    setFilteredArticles(articlesToFilter);
  }, [searchTerm, selectedCategory, baseList]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleCategoryClick = (category) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  const toggleSearch = () => {
    setIsSearchVisible((prev) => !prev);
    if (isSearchVisible) {
      setSearchTerm("");
      setSelectedCategory(null);
    }
  };
  
  // 6. Función para navegar a la página de creación
  const handleCreateArticle = () => {
    navigate('/admin/article/create');
  };

  const renderContent = () => {
    if (isLoading) return <div className="loading-spinner">Cargando descubrimientos...</div>;
    if (error) {
      const msg = typeof error === "string" ? error : error.message || "Error desconocido";
      return <div className="error-message">Error: {msg}</div>;
    }
    if (!Array.isArray(filteredArticles) || filteredArticles.length === 0) {
      return <p className="no-items-message">No se encontraron resultados.</p>;
    }
    return <Carousel items={filteredArticles} />;
  };

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>Descubre los secretos del Abismo</h1>
      </header>

      <div className="content-wrapper">
        <div className="search-toggle-header">
          {isSearchVisible ? (
            <button onClick={toggleSearch} className="search-toggle-btn"><CloseIcon /></button>
          ) : (
            <button onClick={toggleSearch} className="search-toggle-btn"><SearchIcon /></button>
          )}
        </div>

        <div className={`controls-container ${isSearchVisible ? 'visible' : ''}`}>
          {/* ... tu formulario de búsqueda y filtros no cambian ... */}
        </div>

        <main className="carousel-section">
          {renderContent()}
        </main>
        
        {/* --- 7. BOTÓN PARA ADMINS --- */}
        {user?.role === 'admin' && (
          <div className="admin-actions">
            <Button variant="primary" onClick={handleCreateArticle}>
              <Plus size={18} />
              Nuevo Artículo
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;