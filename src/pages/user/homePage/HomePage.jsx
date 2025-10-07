// src/pages/user/homePage/HomePage.jsx

import React from 'react';
import Carousel from '../../../components/common/Carousel/Carousel.jsx';
import 'react-multi-carousel/lib/styles.css';
import { useArticles } from '../../../hooks/useArticles.js'; 
import './HomePage.css';
import Button from '../../../components/common/Button/Button.jsx';

function HomePage() {
  const { articles, isLoading, error } = useArticles();
    const handleSearchClick = () => {
    // Aquí puedes añadir la lógica para la búsqueda
    console.log("Botón de búsqueda clickeado");}

  const renderContent = () => {
    if (isLoading) {
      return <div className="loading-spinner">Cargando descubrimientos...</div>;
    }
    if (error) {
      return (
        <div className="error-message">
          <p>Ha ocurrido un error al conectar con el abismo: {error.message}</p>

        </div>
      );
    }
    return <Carousel items={articles} />;
  };

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>Descubre los secretos del Abismo</h1>
      </header>

      <div className="content-wrapper">
        <main className="carousel-section">
          <div className="search-bar">
            <Button onClick={handleSearchClick} variant="primary">
              Buscar
            </Button>
          </div>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default HomePage;