import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ArticleForm from '../../components/common/ArticleForm/ArticleForm';
import Modal from '../../components/common/Modal/Modal'; // 1. Importar Modal
import Button from '../../components/common/Button/Button'; // 2. Importar Button
import { CheckCircle } from 'lucide-react'; // 3. Importar el ícono

function CreateArticlePage() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 4. Estado para controlar el modal de éxito
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleCreateArticle = async (formData) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error("No estás autenticado. Por favor, inicia sesión.");

      const payloadBase64 = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));
      const userId = decodedPayload.userId;

      if (!userId) throw new Error("No se pudo identificar al usuario desde el token.");

      const dataToSend = {
        title: formData.title,
        description: formData.description,
        content: formData.content,
        image: formData.image,
        category: formData.category, 
        species: formData.species,   
        creator_id: parseInt(userId, 10),
      };

      await axios.post('http://localhost:8000/article', dataToSend, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      // 5. En lugar del alert, abrimos el modal
      setIsSuccessModalOpen(true);

    } catch (err) {
      console.error("Error al crear el artículo:", err);
      const errorMessage = err.response?.data?.message || err.message || 'No se pudo crear el artículo.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // 6. Función para cerrar el modal y navegar al inicio
  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    navigate('/'); // Redirigir DESPUÉS de cerrar el modal
  };

  return (
    <div>
      <ArticleForm 
          onSubmit={handleCreateArticle} 
          onCancel={() => navigate(-1)} // Añadimos la función onCancel
          isEditing={false}
          isSubmitting={isSubmitting}
      />
      
      {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>{error}</p>}
      
      {/* 7. Añadir el Modal al final del JSX */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={handleCloseSuccessModal}
        title={
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#AEF7A6' }}>
            <CheckCircle />
            ¡Éxito!
          </span>
        }
      >
        <p>El nuevo artículo ha sido creado correctamente.</p>
        <div className="modal-actions">
          <Button variant="primary" onClick={handleCloseSuccessModal}>
            Aceptar
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default CreateArticlePage;