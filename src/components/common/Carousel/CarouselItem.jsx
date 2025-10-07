import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './CarouselItem.css';

// Componente para un único elemento del carrusel
const CarouselItem = ({ item }) => {
  const navigate = useNavigate();
  const { id, image, title, category, description } = item;

  const handleClick = () => {
    navigate(`/discoveries/${id}`);
  };

  // Permite la navegación con la tecla "Enter" por accesibilidad
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  // Renderiza una imagen o un fondo de color si no hay imagen
  const renderImage = () => {
    if (image) {
      return (
        <img
          src={image}
          alt={title}
          className="carousel-item-image"
          loading="lazy"
        />
      );
    }
    // Si no hay imagen, muestra un fondo oscuro (placeholder)
    return <div className="carousel-item-placeholder"></div>;
  };

  return (
  <div
    className="carousel-item-wrapper"
    onClick={handleClick}
    onKeyDown={handleKeyDown}
    role="button"
    tabIndex={0}
  >
    <div className="carousel-item-content">
      {/* La imagen se renderiza primero para que quede de fondo */}
      {renderImage()}
      
      {/* La etiqueta ahora es un span para mejor semántica */}
      <span className='category-tag'>{category}</span>

      {/* El contenido de texto va después */}
      <div className="carousel-item-caption">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  </div>
);
};

CarouselItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
};

export default CarouselItem;