import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import Button from '../../common/Button/Button';
import './ArticlesTable.css';

/**
 * 📄 Tabla de Artículos
 * Muestra todos los artículos con botones de editar/eliminar
 */
const ArticlesTable = ({ articles, onEdit, onDelete, isLoading }) => {
  // Formatear fecha: "2025-01-15T10:30:00Z" → "15/01/2025"
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };

  if (isLoading) {
    return <p className="table-loading">Cargando artículos...</p>;
  }

  if (!articles || articles.length === 0) {
    return <p className="table-empty">No hay artículos disponibles</p>;
  }

  return (
    <div className="table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Categoría</th>
            <th>Creado</th>
            <th>Actualizado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id}>
              <td className="table-title">{article.title}</td>
              <td>
                <span className="category-badge">{article.category}</span>
              </td>
              <td>{formatDate(article.created_at)}</td>
              <td>{formatDate(article.updated_at)}</td>
              <td className="table-actions">
                <Button
                  variant="secondary"
                  onClick={() => onEdit(article.id)}
                  type="button"
                >
                  <Edit size={16} />
                </Button>
                <Button
                  variant="tertiary"
                  onClick={() => onDelete(article.id)}
                  type="button"
                >
                  <Trash2 size={16} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArticlesTable;
