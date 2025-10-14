import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import './ArticleList.css';

const ArticleListItem = ({ article }) => {
  const navigate = useNavigate();
  const { id, title, description, image, category, created_at, username, likes } = article;

  const handleClick = () => {
    navigate(`/article/${id}`);
  };

  return (
    <div className="article-list-item" onClick={handleClick}>
      <div className="item-image-container">
        <img src={image || 'https://via.placeholder.com/150'} alt={title} className="item-image" />
      </div>
      <div className="item-content">
        <span className="item-category">{category}</span>
        <h3 className="item-title">{title}</h3>
        <p className="item-description">{description}</p>
        <div className="item-meta">
          <span>@{username || 'Desconocido'}</span>
          <span>•</span>
          <span>{new Date(created_at).toLocaleDateString('es-ES')}</span>
          <div className="item-stats">
            <Heart size={14} /> {likes || 0}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleListItem;