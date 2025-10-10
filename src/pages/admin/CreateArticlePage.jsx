import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ArticleForm from '../../components/common/ArticleForm/ArticleForm';

function CreateArticlePage() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateArticle = async (formData) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("No estás autenticado. Por favor, inicia sesión.");
      }

      const payloadBase64 = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));
      const userId = decodedPayload.userId;

      if (!userId) {
        throw new Error("No se pudo identificar al usuario desde el token.");
      }

      // Preparamos los datos finales para enviar al backend
      const dataToSend = {
        title: formData.title,
        description: formData.description,
        content: formData.content,
        image: formData.image,
        category: formData.category, 
        species: formData.species,   
        creator_id: parseInt(userId, 10),
      };

      console.log("Enviando los siguientes datos finales al servidor:", dataToSend);

      // Realizamos la petición POST
      await axios.post('http://localhost:8000/article', dataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      alert('¡Artículo creado con éxito!');
      navigate('/');

    } catch (err) {
      console.error("Error al crear el artículo:", err);
      const errorMessage = err.response?.data?.message || err.message || 'No se pudo crear el artículo.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <ArticleForm 
          onSubmit={handleCreateArticle} 
          isEditing={false}
          isSubmitting={isSubmitting}
      />
      
      {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>{error}</p>}
    </div>
  );
}

export default CreateArticlePage;