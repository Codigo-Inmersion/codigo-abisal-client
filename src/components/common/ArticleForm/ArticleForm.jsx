import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import RichTextEditor from '../RichTextEditor/RichTextEditor';
import './ArticleForm.css';

const articleCategories = ["Fauna Abisal", "Ecosistemas", "Exploración", "Conservación"];

const ArticleForm = ({ onSubmit, initialData = null, isEditing = false, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: articleCategories[0],
    image: '',
  });

  const [errors, setErrors] = useState({});
  const [editorKey, setEditorKey] = useState(0);

  // ✅ Cargar datos iniciales cuando cambia initialData
  useEffect(() => {
    if (isEditing && initialData) {
      const newFormData = {
        title: initialData.title || '',
        description: initialData.description || '',
        content: initialData.content || '',
        category: initialData.category || articleCategories[0],
        image: initialData.image || '',
      };
      setFormData(newFormData);
      // ✅ Forzar remontaje del editor para que cargue el contenido
      setEditorKey(prev => prev + 1);
    }
  }, [initialData, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (content) => {
    setFormData(prev => ({ ...prev, content: content }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title || formData.title.length < 10) {
      newErrors.title = 'El título debe tener al menos 10 caracteres.';
    }
    if (!formData.description) {
      newErrors.description = 'La descripción es obligatoria.';
    }
    if (!formData.content || formData.content.replace(/<(.|\n)*?>/g, '').trim().length < 100) {
      newErrors.content = 'El contenido debe tener al menos 100 caracteres (sin contar formato).';
    }
    if (!formData.image) {
      newErrors.image = 'La URL de la imagen es obligatoria.';
    } else {
      try {
        new URL(formData.image);
      } catch (_) {
        newErrors.image = 'Por favor, introduce una URL válida.';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    } else {
      console.log("Validación fallida");
    }
  };

  return (
    <div className="article-form-container">
      <h1 className="form-title">{isEditing ? 'Editar Entrada' : 'Crear Nueva Entrada'}</h1>
      <form onSubmit={handleSubmit} className="article-form">
        
        <div className="form-group">
          <label htmlFor="title">Título de la entrada</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="El misterio del calamar gigante..."
          />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción corta</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Un breve resumen para las tarjetas."
          />
          {errors.description && <span className="error-text">{errors.description}</span>}
        </div>

        {/* ✅ Agregar key al editor para forzar remontaje */}
        <div className="form-group">
          <label htmlFor="content">Contenido Principal</label>
          <RichTextEditor
            key={editorKey}
            value={formData.content}
            onChange={handleContentChange}
          />
          {errors.content && <span className="error-text">{errors.content}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoría</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {articleCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="image">URL de la Imagen</label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://ejemplo.com/imagen.jpg"
          />
          {errors.image && <span className="error-text">{errors.image}</span>}
        </div>

        {formData.image && !errors.image && (
          <div className="image-preview">
            <p>Vista previa:</p>
            <img src={formData.image} alt="Vista previa de la imagen" />
          </div>
        )}

        <div className="form-actions">
          <Button type="button" variant="secondary">Cancelar</Button>
          <Button 
            type="submit" 
            variant="primary" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Publicando...' : (isEditing ? 'Guardar Cambios' : 'Publicar')}
          </Button>
        </div>
      </form>
    </div>
  );
};

ArticleForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initialData: PropTypes.object,
    isEditing: PropTypes.bool,
    isSubmitting: PropTypes.bool,
};

export default ArticleForm;