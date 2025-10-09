// src/pages/admin/CreateArticlePage.jsx

import React from 'react';
import ArticleForm from '../../components/common/ArticleForm/ArticleForm';

function CreateArticlePage() {

  // Esta función se ejecutará cuando el formulario se envíe con datos válidos
  const handleCreateArticle = (formData) => {
    console.log("Creando nuevo artículo con los datos:", formData);
  };

  return (
    // Renderizamos el formulario en modo de creación
    <ArticleForm 
        onSubmit={handleCreateArticle} 
        isEditing={false} 
    />
  );
}

export default CreateArticlePage;