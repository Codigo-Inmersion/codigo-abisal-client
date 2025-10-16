import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../../stores/authStore";
import ArticleForm from "../../components/common/ArticleForm/ArticleForm";
import { getArticleById } from "../../services/AbisalServices";
import Modal from "../../components/common/Modal/Modal";
import Button from "../../components/common/Button/Button";
import { CheckCircle } from "lucide-react";

export default function EditArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      setError("ID de artículo no válido.");
      setLoading(false);
      return;
    }

    const fetchArticle = async () => {
      setLoading(true);
      try {
        // Usamos el servicio para obtener los datos iniciales
        const res = await getArticleById(id);
        if (res.ok) {
          // 👇 NUEVA validación de permisos aquí
          const article = res.data;
          const isAuthor = article.creator_id === Number(user?.id);
          const isAdmin = user?.role === "admin";

          if (!isAdmin && !isAuthor) {
            navigate("/403");
            return;
          }

          setInitialData(res.data);
        } else {
          setError(res.error || "No se encontró el artículo.");
        }
      } catch (e) {
        setError("Error al cargar los datos del artículo.");
        console.error("Error fetching article:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id, user, navigate]); // 👈 se agregan user y navigate a las dependencias

  // Maneja el envío del formulario con los datos actualizados
  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No estás autenticado para realizar esta acción.");
      }

      // Tu backend espera `category` y no `category_id` según el modelo
      const dataToSend = {
        title: formData.title,
        description: formData.description,
        content: formData.content,
        image: formData.image,
        category: formData.category,
        species: formData.species,
      };

      // Se usa axios.put para actualizar, con el token en las cabeceras
      await axios.put(`http://localhost:8000/article/${id}`, dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsSuccessModalOpen(true);
    } catch (err) {
      console.error("Error al actualizar el artículo:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "No se pudo actualizar el artículo.";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Maneja el clic en el botón "Cancelar"
  const handleCancel = () => {
    navigate(-1); // Esto navega a la página anterior en el historial
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    navigate(`/article/${id}`); // Redirigir DESPUÉS de cerrar el modal
  };

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>
        Cargando artículo...
      </p>
    );
  if (error)
    return (
      <p style={{ color: "red", textAlign: "center", marginTop: "2rem" }}>
        {error}
      </p>
    );

  return (
    <div className="edit-article-page">
      {/* Le pasamos todos los props necesarios a ArticleForm, incluyendo la nueva función onCancel.
        La 'key' es importante para forzar a React a renderizar de nuevo el formulario cuando los datos iniciales cambian.
      */}
      <ArticleForm
        key={initialData ? initialData.id : "loading"}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        initialData={initialData}
        isEditing={true}
        isSubmitting={isSubmitting}
      />
      {error && (
        <p style={{ color: "red", textAlign: "center", marginTop: "1rem" }}>
          {error}
        </p>
      )}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={handleCloseSuccessModal}
        title={
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              color: "#AEF7A6",
            }}
          >
            <CheckCircle />
            ¡Éxito!
          </span>
        }
      >
        <p>El artículo ha sido actualizado correctamente.</p>
        <div className="modal-actions">
          <Button variant="primary" onClick={handleCloseSuccessModal}>
            Aceptar
          </Button>
        </div>
      </Modal>
    </div>
  );
}
