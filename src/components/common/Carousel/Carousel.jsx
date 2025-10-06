import React from 'react';
import { Link } from 'react-router-dom'; // Para hacer las tarjetas clickeables
import * as liquidGlass from '@developer-hub/liquid-glass';
const LiquidGlass = liquidGlass.default;
import './Carousel.css';

// El componente recibe los artículos (items) como props
function Carousel({ items }) {
  // Criterio: Mensaje si no hay entradas
  if (!items || items.length === 0) {
    return <p className="no-items-message">No hay descubrimientos para mostrar en este momento.</p>;
  }

  return (
    <div className="carousel">
      {items.map((item) => (
        // Criterio: Click en card lleva a detalle del artículo
        <Link to={`/article/${item.id}`} key={item.id} className="card-link">
          <div className="card-wrapper">
            <LiquidGlass
              height='auto'
              width='300px'
              blur='8px'
              backgroundColor='rgba(255, 255, 255, 0.1)'
              borderColor='rgba(255, 255, 255, 0.2)'
            >
              <div className="discovery-card-content">
                <img src={item.image || '/default-image.png'} alt={item.title} className="card-image" />
                <div className="card-text-content">
                  <span className="card-category">{item.category}</span>
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-description">{item.description}</p>
                </div>
              </div>
            </LiquidGlass>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Carousel;