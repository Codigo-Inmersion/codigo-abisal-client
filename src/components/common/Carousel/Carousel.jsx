import CarouselLib from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Carousel.css';

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1536 }, items: 5 },
  desktop:           { breakpoint: { max: 1536, min: 1024 }, items: 4 },
  tablet:            { breakpoint: { max: 1024, min: 640  }, items: 2 },
  mobile:            { breakpoint: { max: 640,  min: 0    }, items: 1 },
};

export default function Carousel({ items = [] }) {
  const navigate = useNavigate();

  if (!items.length) {
    return <p className="no-items-message">No hay descubrimientos para mostrar en este momento.</p>;
  }

  return (
    <div className="carousel-container">
      <CarouselLib
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={4000}
        keyBoardControl
        swipeable
        draggable
        containerClass="carousel"
        itemClass="carousel-item-wrapper"
        renderDotsOutside={false}
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
      id:       PropTypes.number.isRequired,
      title:    PropTypes.string.isRequired,
      image:    PropTypes.string.isRequired,
      category: PropTypes.string,
    })
  ),
};
