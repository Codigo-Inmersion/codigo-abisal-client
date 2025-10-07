// src/pages/user/homePage/HomePage.jsx

import React from 'react';
import Carousel from '../../../components/common/Carousel/Carousel.jsx';
import 'react-multi-carousel/lib/styles.css';
import { useArticles } from '../../../hooks/useArticles.js'; // Importamos el nuevo hook
import './HomePage.css';

function HomePage() {
  // Usamos el hook para obtener los datos y los estados
  const { articles, isLoading, error } = useArticles();

  // Función para renderizar el contenido principal
  const renderContent = () => {
    if (isLoading) {
      return <div className="loading-spinner">Cargando descubrimientos...</div>;
    }
    if (error) {
      // Mostramos un mensaje más descriptivo y un botón para reintentar (opcional)
      return (
        <div className="error-message">
          <p>Ha ocurrido un error al conectar con el abismo: {error.message}</p>
          {/* Opcional: podrías implementar una función para reintentar */}
          {/* <button onClick={() => window.location.reload()}>Reintentar</button> */}
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
            <button className="search-button">Buscar</button>
          </div>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default HomePage;