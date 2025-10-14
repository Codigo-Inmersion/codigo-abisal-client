import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from '../Button/Button';
import RichTextEditor from '../RichTextEditor/RichTextEditor';
import './ArticleForm.css';

const articleCategories = ["Fauna Abisal", "Ecosistemas", "Exploración", "Conservación"];

const ArticleForm = ({ onSubmit, onCancel, initialData = null, isEditing = false, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: articleCategories[0],
    image: '',
    species: '',
  });

  const [uploadMethod, setUploadMethod] = useState('file');
  const [errors, setErrors] = useState({});
  const [editorKey, setEditorKey] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (isEditing && initialData) {
      const newFormData = {
        title: initialData.title || '',
        description: initialData.description || '',
        content: initialData.content || '',
        category: initialData.category || articleCategories[0],
        image: initialData.image || '',
        species: initialData.species || '',
      };
      setFormData(newFormData);
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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setErrors(prev => ({ ...prev, image: null }));

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'unsigned_preset_abisal');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/da3higfux/image/upload',
        data
      );
      setFormData(prev => ({ ...prev, image: response.data.secure_url }));
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      setErrors(prev => ({ ...prev, image: 'No se pudo subir la imagen.' }));
    } finally {
      setIsUploading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'El título es obligatorio.';
    } else if (formData.title.trim().length < 10) {
      newErrors.title = 'El título debe tener al menos 10 caracteres.';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es obligatoria.';
    }

    const textContent = formData.content.replace(/<(.|\n)*?>/g, '').trim();
    if (!textContent) {
      newErrors.content = 'El contenido es obligatorio.';
    } else if (textContent.length < 100) {
      newErrors.content = `El contenido debe tener al menos 100 caracteres (actualmente tienes ${textContent.length}).`;
    }
    
    if (!formData.species.trim()) {
      newErrors.species = 'La especie es obligatoria.';
    }

    if (!formData.image) {
      newErrors.image = 'La imagen es obligatoria.';
    } else {
      try {
        new URL(formData.image);
      } catch (_) {
        newErrors.image = 'Por favor, introduce o sube una imagen con URL válida.';
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
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
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
            className={errors.description ? 'error' : ''}
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="content">Contenido Principal</label>
          <div className={errors.content ? 'error' : ''}>
            <RichTextEditor key={editorKey} value={formData.content} onChange={handleContentChange} />
          </div>
          {errors.content && <span className="error-message">{errors.content}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="category">Categoría</label>
          <select 
            id="category" 
            name="category" 
            value={formData.category} 
            onChange={handleChange}
            className={errors.category ? 'error' : ''}
          >
            {articleCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          {errors.category && <span className="error-message">{errors.category}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="species">Especie Principal</label>
          <input 
            type="text" 
            id="species" 
            name="species" 
            value={formData.species} 
            onChange={handleChange} 
            placeholder="Ej: Vampyroteuthis infernalis"
            className={errors.species ? 'error' : ''}
          />
          {errors.species && <span className="error-message">{errors.species}</span>}
        </div>

        <div className="form-group">
          <label>Imagen Principal</label>
          <div className="upload-method-selector">
            <button type="button" onClick={() => setUploadMethod('file')} className={uploadMethod === 'file' ? 'active' : ''}>Subir Archivo</button>
            <button type="button" onClick={() => setUploadMethod('url')} className={uploadMethod === 'url' ? 'active' : ''}>Usar URL</button>
          </div>
          {uploadMethod === 'file' ? (
            <input type="file" id="image-upload" onChange={handleImageUpload} accept="image/png, image/jpeg, image/gif" disabled={isUploading} className={errors.image ? 'error' : ''} />
          ) : (
            <input type="url" id="image-url" name="image" value={formData.image} onChange={handleChange} placeholder="https://ejemplo.com/imagen.jpg" disabled={isUploading} className={errors.image ? 'error' : ''} />
          )}
          {isUploading && <span className="upload-text">Subiendo imagen...</span>}
          {errors.image && <span className="error-message">{errors.image}</span>}
        </div>

        {formData.image && !errors.image && (
          <div className="image-preview">
            <p>Vista previa:</p>
            <img src={formData.image} alt="Vista previa de la imagen" />
          </div>
        )}

        <div className="form-actions">
          <Button type="button" variant="secondary" onClick={onCancel}>Cancelar</Button>
          <Button type="submit" variant="primary" disabled={isSubmitting || isUploading}>
            {isUploading ? 'Procesando imagen...' : (isSubmitting ? 'Publicando...' : (isEditing ? 'Guardar Cambios' : 'Publicar'))}
          </Button>
        </div>
      </form>
    </div>
  );
};

ArticleForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    initialData: PropTypes.object,
    isEditing: PropTypes.bool,
    isSubmitting: PropTypes.bool,
};

ArticleForm.defaultProps = {
  onCancel: () => {},
};

export default ArticleForm;