// src/components/common/DetailArticle/DetailArticle.jsx

import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Heart,
  ArrowLeft,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import "./DetailArticle.css";
import Button from "../Button/Button";
import Modal from "../Modal/Modal"; // Importar el componente Modal
import {
  getArticleById,
  getUsernameById,
  likeArticle,
  unlikeArticle,
  deleteArticle,
} from "../../../services/AbisalServices";
import useAuthStore from "../../../stores/authStore";
import DOMPurify from "dompurify";

export default function DetailArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [authorName, setAuthorName] = useState("");

  // --- 👇 1. AÑADIR ESTADOS PARA LOS MODALES ---
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalState, setModalState] = useState({
    showSuccess: false,
    showError: false,
    message: "",
  });

  useEffect(() => {
    if (!id || Number.isNaN(Number(id))) {
      setError("Identificador de artículo inválido.");
      setLoading(false);
      return;
    }

    const fetchArticleData = async () => {
      setLoading(true);
      setError(null);
      setAuthorName("");
      try {
        const res = await getArticleById(id);
        if (!res.ok) {
          setError(res.error || "No se pudo cargar el artículo");
          setArticle(null);
          return;
        }
        const data = res.data;
        setArticle(data);
        setLikes(typeof data.likes === "number" ? data.likes : 0);
        setIsLiked(Boolean(data.isLikedByCurrentUser));
        if (data?.creator_id) {
          const ures = await getUsernameById(data.creator_id);
          if (ures.ok && ures.name) {
            setAuthorName(ures.name);
          } else {
            setAuthorName(`Usuario #${data.creator_id}`);
          }
        } else {
          setAuthorName("Desconocido");
        }
      } catch (e) {
        console.error("Error al cargar el artículo:", e);
        setError("Error de conexión al cargar el artículo.");
      } finally {
        setLoading(false);
      }
    };
    fetchArticleData();
  }, [id]);

  const formattedDate = useMemo(() => {
    if (!article?.created_at) return "";
    const d = new Date(article.created_at);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("es-ES");
  }, [article?.created_at]);

  const sanitizedContent = useMemo(() => {
    if (!article?.content) return "";
    return DOMPurify.sanitize(article.content, {
      USE_PROFILES: { html: true },
    });
  }, [article?.content]);

  const isAuthenticated = !!token;
  const isAuthor = article?.creator_id === Number(user?.id);
  const isAdmin = user?.role === "admin";
  const canLike = isAuthenticated;
  const canEdit = isAuthenticated && (isAuthor || isAdmin);
  const canDelete = isAdmin;

  // --- 👇 2. FUNCIÓN PARA CERRAR MODALES DE FEEDBACK ---
  const closeFeedbackModal = () => {
    setModalState({ showSuccess: false, showError: false, message: "" });
  };

  const handleLike = async () => {
    if (isLikeLoading) return;
    setIsLikeLoading(true);
    const previousState = { isLiked, likes };
    setIsLiked((current) => !current);
    setLikes((current) =>
      previousState.isLiked ? Math.max(0, current - 1) : current + 1
    );
    try {
      const res = previousState.isLiked
        ? await unlikeArticle(id)
        : await likeArticle(id);
      if (!res.ok) throw new Error(res.error);
    } catch (err) {
      console.error("Error en la operación de like:", err);
      setIsLiked(previousState.isLiked);
      setLikes(previousState.likes);
      // 👇 REEMPLAZAR ALERT CON MODAL
      setModalState({
        showError: true,
        message: "No se pudo procesar tu 'Me gusta'. Inténtalo de nuevo.",
      });
    } finally {
      setIsLikeLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/article/edit/${id}`);
  };

  const handleDelete = async () => {
    setIsDeleteModalOpen(false); // Cerrar modal de confirmación
    try {
      const res = await deleteArticle(id);
      if (res.ok) {
        navigate("/");
      } else {
        // 👇 REEMPLAZAR ALERT CON MODAL DE ERROR
        setModalState({
          showError: true,
          message: "No se pudo eliminar el artículo.",
        });
      }
    } catch (err) {
      console.error("Error eliminando artículo:", err);
      setModalState({
        showError: true,
        message: "Error de conexión al eliminar el artículo.",
      });
    }
  };

  const handleBack = () => navigate("/");

  const renderImage = () => {
    if (article?.image) {
      return (
        <img
          src={article.image}
          alt={article.title}
          className="article-detail-image"
        />
      );
    }
    return <div className="article-detail-placeholder" />;
  };

  if (loading) {
    return (
      <div className="article-detail-wrapper">
        <p>Cargando artículo…</p>
      </div>
    );
  }
  if (error || !article) {
    return (
      <div className="article-detail-wrapper">
        <p style={{ color: "red" }}>{error || "No se encontró el artículo."}</p>
        <Button onClick={handleBack}>Volver al inicio</Button>
      </div>
    );
  }

  return (
    <div className="article-detail-container">
      {/* ... (código del breadcrumb y hero sin cambios) ... */}
      <div className="article-detail-breadcrumb">
        <button
          onClick={() => navigate("/")}
          className="breadcrumb-back-button"
        >
          <ArrowLeft size={18} /> Volver al listado
        </button>
        <ChevronRight size={16} />
        <button
          onClick={() =>
            navigate(`/category/${encodeURIComponent(article.category)}`)
          }
          className="breadcrumb-category-button"
        >
          {article.category}
        </button>
        <ChevronRight size={16} />
        <span className="breadcrumb-current">Detalle</span>
      </div>

      <div className="article-detail-wrapper">
        <div className="article-detail-hero">
          {renderImage()}
          <span className="article-detail-category-tag">
            {article.category}
          </span>
          <div className="article-detail-caption">
            <h1 className="article-detail-title">{article.title}</h1>
            <p className="article-detail-description">{article.description}</p>
            <div className="article-detail-meta">
              <span>{formattedDate}</span>
              <span>•</span>
              <span>@{authorName}</span>
            </div>
          </div>
        </div>

        <article
          className="article-detail-content"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />

        <div className="article-detail-actions">
          <div className="article-detail-actions-wrapper">
            {canLike && (
              <Button
                onClick={handleLike}
                variant="primary"
                className={`article-detail-button article-detail-button-like ${
                  isLiked ? "liked" : ""
                }`}
                disabled={isLikeLoading}
              >
                <Heart size={20} fill={isLiked ? "#0c0c1a" : "none"} />
                <span>{likes}</span>
              </Button>
            )}
            {canEdit && (
              <Button
                onClick={handleEdit}
                variant="secondary"
                className="article-detail-button article-detail-button-edit"
              >
                <Edit size={18} />
                Editar
              </Button>
            )}
            {canDelete && (
              // 👇 REEMPLAZAR LLAMADA DIRECTA CON APERTURA DE MODAL
              <Button
                onClick={() => setIsDeleteModalOpen(true)}
                variant="tertiary"
                className="article-detail-button article-detail-button-delete"
              >
                <Trash2 size={18} />
                Eliminar
              </Button>
            )}
            {!isAuthenticated && (
              <p style={{ color: "rgba(255,255,255,0.7)", marginTop: "1rem" }}>
                <a href="/login" style={{ color: "#AEF7A6" }}>
                  Inicia sesión
                </a>{" "}
                para dar like o crear contenido
              </p>
            )}
          </div>
        </div>
      </div>

      {/* --- 👇 3. AÑADIR LOS MODALES AL FINAL DEL COMPONENTE --- */}

      {/* Modal de confirmación para ELIMINAR */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={
          <span
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <AlertTriangle color="#ef4444" />
            Confirmar Eliminación
          </span>
        }
      >
        <p>
          ¿Estás seguro de que deseas eliminar este artículo? Esta acción no se
          puede deshacer.
        </p>
        <div className="modal-actions">
          <Button
            variant="secondary"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Cancelar
          </Button>
          <Button variant="tertiary" onClick={handleDelete}>
            Eliminar
          </Button>
        </div>
      </Modal>

      {/* Modal de ÉXITO */}
      <Modal
        isOpen={modalState.showSuccess}
        onClose={closeFeedbackModal}
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
        <p>{modalState.message}</p>
        <div className="modal-actions">
          <Button variant="primary" onClick={closeFeedbackModal}>
            Aceptar
          </Button>
        </div>
      </Modal>

      {/* Modal de ERROR */}
      <Modal
        isOpen={modalState.showError}
        onClose={closeFeedbackModal}
        title={
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              color: "#ef4444",
            }}
          >
            <AlertTriangle />
            Error
          </span>
        }
      >
        <p>{modalState.message}</p>
        <div className="modal-actions">
          <Button variant="primary" onClick={closeFeedbackModal}>
            Aceptar
          </Button>
        </div>
      </Modal>
    </div>
  );
}
