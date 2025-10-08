import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../../common/Button/Button';
import './ArticleForm.css';

const articleCategories = ["Fauna Abisal", "Ecosistemas", "Exploración", "Conservación"];

const ArticleForm = ({ onSubmit, initialData = null, isEditing = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: articleCategories[0],
    image: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing && initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        content: initialData.content || '',
        category: initialData.category || articleCategories[0],
        image: initialData.image || '',
      });
    }
  }, [initialData, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title || formData.title.length < 10) {
      newErrors.title = 'El título debe tener al menos 10 caracteres.';
    }
    if (!formData.description) {
        newErrors.description = 'La descripción es obligatoria.';
    }
    if (!formData.content || formData.content.length < 100) {
      newErrors.content = 'El contenido debe tener al menos 100 caracteres.';
    }
    if (!formData.image) {
        newErrors.image = 'La URL de la imagen es obligatoria.';
    } else {
        try {
            new URL(formData.image);
        } catch (error) {
            newErrors.image = 'Por favor, introduce una URL válida.';
        }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validamos antes de enviar
    if (validateForm()) {
      onSubmit(formData);
    } else {
      console.log("Validación fallida:", errors);
    }
  };

  return (
    <div className="article-form-container">
      <h1 className="form-title">{isEditing ? 'Editar Entrada' : 'Crear Nueva Entrada'}</h1>
      <form onSubmit={handleSubmit} className="article-form">
        
        {/* Campo: Título con mensaje de error */}
        <div className="form-group">
          <label htmlFor="title">Título de la entrada</label>
          <input /* ...props... */ />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>

        {/* Campo: Descripción con mensaje de error */}
        <div className="form-group">
          <label htmlFor="description">Descripción corta</label>
          <input /* ...props... */ />
          {errors.description && <span className="error-text">{errors.description}</span>}
        </div>

        {/* Campo: Contenido con mensaje de error */}
        <div className="form-group">
          <label htmlFor="content">Contenido Principal</label>
          <textarea /* ...props... */ rows="10" />
          {errors.content && <span className="error-text">{errors.content}</span>}
        </div>

        {/* Campo: Categoría (sin validación por ahora) */}
        <div className="form-group">
          <label htmlFor="category">Categoría</label>
          <select /* ...props... */>
            {articleCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        {/* Campo: URL de la Imagen con vista previa */}
        <div className="form-group">
          <label htmlFor="image">URL de la Imagen</label>
          <input /* ...props... */ />
          {errors.image && <span className="error-text">{errors.image}</span>}
        </div>

        {/* --- 3. Vista previa de la imagen --- */}
        {formData.image && !errors.image && (
          <div className="image-preview">
            <p>Vista previa:</p>
            <img src={formData.image} alt="Vista previa de la imagen" />
          </div>
        )}

        <div className="form-actions">
          <Button type="button" variant="secondary">Cancelar</Button>
          <Button type="submit" variant="primary">{isEditing ? 'Guardar Cambios' : 'Publicar'}</Button>
        </div>
      </form>
    </div>
  );
};


export default ArticleForm;