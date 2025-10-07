// src/components/common/Carousel/Carousel.jsx

import CarouselLib from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Carousel.css';

const responsive = {
  desktop: { breakpoint: { max: 4000, min: 1024 }, items: 3, slidesToSlide: 1 },
  tablet:  { breakpoint: { max: 1024, min: 640  }, items: 2, slidesToSlide: 1 },
  mobile:  { breakpoint: { max: 640,  min: 0    }, items: 1, slidesToSlide: 1 },
};

export default function Carousel({ items = [] }) {
  const navigate = useNavigate();

  if (!items.length) {
    return <p className="no-items-message">No hay descubrimientos para mostrar.</p>;
  }

  return (
    <div className="carousel-container">
      <CarouselLib
        responsive={responsive}
        infinite
        keyBoardControl
        swipeable
        draggable
        removeArrowOnDeviceType={[]}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="carousel-item"
            onClick={() => navigate(`/discoveries/${item.id}`)}
            role="button"
            tabIndex={0}
          >
            <img
              src={item.image}
              alt={item.title}
              className="carousel-image"
              loading="lazy"
            />
            <div className="carousel-caption">
              <h3>{item.title}</h3>
              <p>{item.category}</p>
            </div>
          </div>
        ))}
      </CarouselLib>
    </div>
  );
}

Carousel.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id:       PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title:    PropTypes.string.isRequired,
      image:    PropTypes.string,
      category: PropTypes.string,
    })
  ),
};