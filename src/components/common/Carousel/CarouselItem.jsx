import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './CarouselItem.css';

const CarouselItem = ({ item }) => {
  const navigate = useNavigate();
  const { id, image, title, category, description, created_at, username } = item;

  const handleClick = () => {
    navigate(`/article/${id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

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
      {renderImage()}
      
      <span className='category-tag'>{category}</span>

      <div className="carousel-item-caption">
        <h3>{title}</h3>
        <p>{description}</p>
        <p>{created_at.split('T')[0].split('-').reverse().join('/')}</p>
         <p>{username}</p>
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