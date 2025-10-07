import React, { useState, useEffect } from "react";
import Carousel from "../../../components/common/Carousel/Carousel.jsx";
import Button from "../../../components/common/Button/Button.jsx";
import 'react-multi-carousel/lib/styles.css';
import { useArticles } from '../../../hooks/useArticles.js';
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


function HomePage() {
  const { articles, isLoading, error } = useArticles();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredArticles(articles);
      return;
    }
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = articles.filter(article => 
      (article.title && article.title.toLowerCase().includes(lowercasedTerm)) ||
      (article.description && article.description.toLowerCase().includes(lowercasedTerm))
    );
    setFilteredArticles(filtered);
  }, [searchTerm, articles]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const toggleSearch = () => {
    setIsSearchVisible(prev => !prev);
    if (isSearchVisible) {
      setSearchTerm("");
    }
  };

  const renderContent = () => {
    if (isLoading) return <div className="loading-spinner">Cargando descubrimientos...</div>;
    if (error) return <div className="error-message">Error: {error.message}</div>;
    if (filteredArticles.length === 0 && searchTerm) {
      return <p className="no-items-message">No se encontraron resultados para "{searchTerm}"</p>;
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
            <button onClick={toggleSearch} className="search-toggle-btn">
              <CloseIcon />
            </button>
          ) : (
            <button onClick={toggleSearch} className="search-toggle-btn">
              <SearchIcon />
            </button>
          )}
        </div>
        
        <div className={`controls-container ${isSearchVisible ? 'visible' : ''}`}>
          <form className="search-form" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="text" 
              name="search" 
              placeholder="Buscar por título o descripción..." 
              className="search-input"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button type="submit" className="search-submit-btn">
              <span>&#10140;</span>
            </button>
          </form>
          <div className="filter-tags">
            <Button variant="secondary">Fauna Abisal</Button>
            <Button variant="secondary">Ecosistemas</Button>
            <Button variant="secondary">Exploración</Button>
            <Button variant="secondary">Conservación</Button>
          </div>
        </div>

        <main className="carousel-section">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default HomePage;