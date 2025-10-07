// src/components/common/Carousel/Carousel.jsx

import React from 'react';
import CarouselLib from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import PropTypes from 'prop-types';
import CarouselItem from './CarouselItem'; // Importamos el nuevo componente
import './Carousel.css';

const responsive = {
  desktop: { breakpoint: { max: 4000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 640 }, items: 2 },
  mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
};

export default function Carousel({ items = [] }) {
  if (!items || items.length === 0) {
    return <p className="no-items-message">No hay descubrimientos para mostrar.</p>;
  }

  return (
    <div className="carousel-wrapper">
      <CarouselLib
        responsive={responsive}
        infinite
        keyBoardControl
        swipeable
        draggable
        containerClass="carousel-container" // Clase para el contenedor principal
        itemClass="carousel-item" // Clase para cada slide
      >
        {items.map((item) => (
          <CarouselItem key={item.id} item={item} />
        ))}
      </CarouselLib>
    </div>
  );
}

Carousel.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};