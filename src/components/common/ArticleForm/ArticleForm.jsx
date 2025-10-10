import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
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
    species: '',
  });

  // 👇 --- NUEVO ESTADO PARA EL MÉTODO DE SUBIDA --- 👇
  const [uploadMethod, setUploadMethod] = useState('file'); // 'file' o 'url'

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
    if (!formData.title || formData.title.length < 10) newErrors.title = 'El título es obligatorio.';
    if (!formData.description) newErrors.description = 'La descripción es obligatoria.';
    if (!formData.content || formData.content.replace(/<(.|\n)*?>/g, '').trim().length < 100) newErrors.content = 'El contenido es obligatorio.';
    if (!formData.species) newErrors.species = 'La especie es obligatoria.';
    
    if (!formData.image) {
      newErrors.image = 'La imagen es obligatoria.';
    } else {
      // Validamos que sea una URL válida, ya sea de Cloudinary o pegada por el usuario
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
        
        {/* Campos de title, description, content, category y species (sin cambios) */}
        <div className="form-group">
          <label htmlFor="title">Título de la entrada</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} placeholder="El misterio del calamar gigante..." />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripción corta</label>
          <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Un breve resumen para las tarjetas." />
          {errors.description && <span className="error-text">{errors.description}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="content">Contenido Principal</label>
          <RichTextEditor key={editorKey} value={formData.content} onChange={handleContentChange} />
          {errors.content && <span className="error-text">{errors.content}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="category">Categoría</label>
          <select id="category" name="category" value={formData.category} onChange={handleChange}>
            {articleCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="species">Especie Principal</label>
          <input type="text" id="species" name="species" value={formData.species} onChange={handleChange} placeholder="Ej: Vampyroteuthis infernalis" />
          {errors.species && <span className="error-text">{errors.species}</span>}
        </div>

        {/* --- 👇 NUEVO SELECTOR DE MÉTODO DE SUBIDA 👇 --- */}
        <div className="form-group">
          <label>Imagen Principal</label>
          <div className="upload-method-selector">
            <button type="button" onClick={() => setUploadMethod('file')} className={uploadMethod === 'file' ? 'active' : ''}>Subir Archivo</button>
            <button type="button" onClick={() => setUploadMethod('url')} className={uploadMethod === 'url' ? 'active' : ''}>Usar URL</button>
          </div>

          {uploadMethod === 'file' ? (
            <input
              type="file"
              id="image-upload"
              onChange={handleImageUpload}
              accept="image/png, image/jpeg, image/gif"
              disabled={isUploading}
            />
          ) : (
            <input
              type="url"
              id="image-url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://ejemplo.com/imagen.jpg"
              disabled={isUploading}
            />
          )}

          {isUploading && <span className="upload-text">Subiendo imagen...</span>}
          {errors.image && <span className="error-text">{errors.image}</span>}
        </div>
        {/* --- 👆 FIN DEL NUEVO SELECTOR 👆 --- */}

        {formData.image && !errors.image && (
          <div className="image-preview">
            <p>Vista previa:</p>
            <img src={formData.image} alt="Vista previa de la imagen" />
          </div>
        )}

        <div className="form-actions">
          <Button type="button" variant="secondary">Cancelar</Button>
          <Button type="submit" variant="primary" disabled={isSubmitting || isUploading}>
            {isUploading ? 'Procesando imagen...' : (isSubmitting ? 'Publicando...' : (isEditing ? 'Guardar Cambios' : 'Publicar'))}
          </Button>
        </div>
      </form>
    </div>
  );
};

// ... (PropTypes sin cambios)
ArticleForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initialData: PropTypes.object,
    isEditing: PropTypes.bool,
    isSubmitting: PropTypes.bool,
};

export default ArticleForm;