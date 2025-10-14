import React from 'react';
import ArticleListItem from './ArticleListItem';
import './ArticleList.css';

const ArticleList = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return <p className="no-articles-message">No se encontraron artículos en esta categoría.</p>;
  }

  return (
    <div className="article-list-container">
      {articles.map(article => (
        <ArticleListItem key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;