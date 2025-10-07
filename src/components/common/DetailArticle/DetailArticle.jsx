import React, { useState } from 'react';
import { ChevronRight, Heart, Edit, Trash2, ArrowLeft } from 'lucide-react';
import './DetailArticle.css';

export default function DetailArticle() {
  // Estado de ejemplo - en producción vendría de useParams y API
  const [article] = useState({
    id: 1,
    title: 'Explorando las maravillas del cosmos',
    username: 'María García',
    created_at: '2025-10-05T14:30:00',
    category: 'Ciencia',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop',
    description: 'Un viaje fascinante a través del universo y sus secretos más profundos',
    content: `
      <p>El universo es un lugar fascinante lleno de misterios por descubrir. Desde las galaxias más lejanas hasta los agujeros negros más masivos, cada descubrimiento nos acerca un poco más a comprender nuestro lugar en el cosmos.</p>
      
      <h2>Los límites del universo observable</h2>
      <p>Actualmente podemos observar hasta 46.500 millones de años luz de distancia en todas las direcciones. Esto nos da una esfera observable de aproximadamente 93.000 millones de años luz de diámetro. Sin embargo, el universo real podría ser infinitamente más grande.</p>
      
      <p>Las tecnologías modernas como el telescopio espacial James Webb nos están permitiendo ver más lejos que nunca, revelando galaxias que se formaron apenas unos cientos de millones de años después del Big Bang.</p>
      
      <h2>Materia oscura y energía oscura</h2>
      <p>Uno de los mayores misterios de la física moderna es que la materia que podemos ver y detectar directamente constituye apenas el 5% del universo. El resto está compuesto por materia oscura (27%) y energía oscura (68%), cuya naturaleza exacta aún nos elude.</p>
      
      <p>Los científicos continúan trabajando en experimentos cada vez más sofisticados para detectar estas misteriosas componentes del universo, lo que podría revolucionar nuestra comprensión de la física fundamental.</p>
    `,
    likes: 42,
    isLiked: false,
    isAuthor: false,
    isAdmin: true
  });

  const [likes, setLikes] = useState(article.likes);
  const [isLiked, setIsLiked] = useState(article.isLiked);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleEdit = () => {
    alert('Funcionalidad de editar - redirigir a página de edición');
  };

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este artículo?')) {
      alert('Artículo eliminado - redirigir al listado');
    }
  };

  const handleBack = () => {
    alert('Volver al listado de descubrimientos');
  };

  const canEdit = article.isAdmin || article.isAuthor;
  const formattedDate = article.created_at.split('T')[0].split('-').reverse().join('/');

  const renderImage = () => {
    if (article.image) {
      return (
        <img
          src={article.image}
          alt={article.title}
          className="article-detail-image"
        />
      );
    }
    return <div className="article-detail-placeholder"></div>;
  };

  return (
    <div className="article-detail-container">
      {/* Breadcrumb */}
      <div className="article-detail-breadcrumb">
        <button
          onClick={handleBack}
          className="breadcrumb-back-button"
        >
          <ArrowLeft size={18} />
          Volver al listado
        </button>
        <ChevronRight size={16} />
        <span>{article.category}</span>
        <ChevronRight size={16} />
        <span className="breadcrumb-current">Detalle</span>
      </div>

      {/* Card Container */}
      <div className="article-detail-wrapper">
        {/* Hero Card */}
        <div className="article-detail-hero">
          {renderImage()}
          
          <span className="article-detail-category-tag">
            {article.category}
          </span>

          <div className="article-detail-caption">
            <h1 className="article-detail-title">
              {article.title}
            </h1>
            <p className="article-detail-description">
              {article.description}
            </p>
            <div className="article-detail-meta">
              <span>{formattedDate}</span>
              <span>•</span>
              <span>{article.username}</span>
            </div>
          </div>
        </div>

        {/* Content Card */}
        <article className="article-detail-content">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </article>

        {/* Action Buttons Card */}
        <div className="article-detail-actions">
          <div className="article-detail-actions-wrapper">
            {/* Like Button */}
            <button
              onClick={handleLike}
              className={`article-detail-button article-detail-button-like ${isLiked ? 'liked' : ''}`}
            >
              <Heart size={20} fill={isLiked ? '#0c0c1a' : 'none'} />
              <span>{likes} Me gusta</span>
            </button>

            {/* Edit and Delete Buttons */}
            {canEdit && (
              <>
                <button
                  onClick={handleEdit}
                  className="article-detail-button article-detail-button-edit"
                >
                  <Edit size={18} />
                  Editar
                </button>

                <button
                  onClick={handleDelete}
                  className="article-detail-button article-detail-button-delete"
                >
                  <Trash2 size={18} />
                  Eliminar
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}