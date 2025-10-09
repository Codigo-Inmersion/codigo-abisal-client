import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArticleForm from "../../components/common/ArticleForm/ArticleForm";
import { getArticleById, updateArticle } from "../../services/AbisalServices";

export default function EditArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [articleData, setArticleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      setError("ID de artículo no válido.");
      setLoading(false);
      return;
    }

    (async () => {
      setLoading(true);
      try {
        const res = await getArticleById(id);
        if (res.ok) {
          setArticleData(res.data);
        } else {
          setError(res.error || "No se encontró el artículo.");
        }
      } catch (e) {
        setError("Error al cargar el artículo.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // ✅ Manejar envío del formulario
  const handleSubmit = async (updatedData) => {
    setIsSubmitting(true);
    try {
      const res = await updateArticle(id, updatedData);
      if (res.ok) {
        alert("Artículo actualizado correctamente ✅");
        navigate("/admin/dashboard"); // o a donde quieras volver
      } else {
        alert("No se pudo actualizar el artículo ❌");
      }
    } catch (err) {
      alert("Error al actualizar el artículo");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Render
  if (loading) return <p>Cargando artículo...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="edit-article-page">
      <ArticleForm
      key={`edit-${id}-${articleData?.updated_at || articleData?.id || 'first'}`}
        onSubmit={handleSubmit}
        initialData={articleData}
        isEditing={true}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
