import React, { useState, useEffect } from "react";
import Carousel from "../../../components/common/Carousel/Carousel.jsx";
import 'react-multi-carousel/lib/styles.css';

import './HomePage.css';

// URL de tu API (deberías moverla a un archivo de configuración)
const API_URL = "http://localhost:8000/article";

function HomePage() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Criterio: Loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("No se pudo conectar con el servidor.");
        }
        const data = await response.json();
        // Criterio: Ordenadas por fecha (asumiendo que tu API lo hace)
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []); // El array vacío asegura que se ejecute solo una vez

  // Función para renderizar el contenido principal
  const renderContent = () => {
    // 1. Estado de carga
    if (isLoading) {
      return <div className="loading-spinner">Cargando descubrimientos...</div>;
    }
    // 2. Estado de error
    if (error) {
      return <div className="error-message">Error: {error}</div>;
    }
    // 3. Contenido cargado
    return <Carousel items={articles} />;
  };

return (
    <div className="homepage-container">
      {/* 1. El header con el título ahora está FUERA del content-wrapper */}
      <header className="homepage-header">
        <h1>Descubre los secretos del Abismo</h1>
      </header>

      {/* 2. El content-wrapper ahora solo contiene la búsqueda y el carrusel */}
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