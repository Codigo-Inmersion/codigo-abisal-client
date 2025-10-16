import React from "react";
import { Edit, Trash2 } from "lucide-react";
import Button from "../../common/Button/Button";
import "./ArticlesTable.css";

/**
 * 📄 Tabla de Artículos
 * Muestra todos los artículos con botones de editar/eliminar
 */
const ArticlesTable = ({ articles, onEdit, onDelete, isLoading }) => {
  // Formatear fecha: "2025-01-15T10:30:00Z" → "15/01/2025"
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES");
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
              <td data-label="Título" className="table-title">
                {article.title}
              </td>
              <td data-label="Categoría">
                <span className="category-badge">{article.category}</span>
              </td>
              <td data-label="Creado">{formatDate(article.created_at)}</td>
              <td data-label="Actualizado">{formatDate(article.updated_at)}</td>
              <td data-label="Acciones" className="table-actions">
                <Button
                  variant="secondary"
                  onClick={() => onEdit(article.id)}
                  type="button"
                  title="Editar artículo"
                  aria-label={`Editar artículo`}
                >
                  <Edit size={16} />
                </Button>
                <Button
                  variant="tertiary"
                  onClick={() => onDelete(article.id)}
                  type="button"
                  title="Eliminar artículo"
                  aria-label={`Eliminar artículo`}
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
