import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronRight, Heart, ArrowLeft, Edit, Trash2 } from "lucide-react";
import "./DetailArticle.css";
import Button from "../Button/Button";
import {
  getArticleById,
  getUsernameById,
  likeArticle,
  unlikeArticle,
  deleteArticle,
} from "../../../services/AbisalServices";
import useAuthStore from "../../../stores/authStore";
import DOMPurify from "dompurify";
import {
  Users,
  FileText,
  Plus,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";


export default function DetailArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user); // 👈 NUEVO
  const token = useAuthStore((state) => state.token);

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);

  const [authorName, setAuthorName] = useState("");
  // const handleCategoryClick = () => {
  //   if (article?.category) {
  //     // Navegamos a la home con el parámetro de búsqueda
  //     navigate(`/?category=${encodeURIComponent(article.category)}`);
  //   }
  // };

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

  // 🔐 Calcular permisos
  const isAuthenticated = !!token;
  const isAuthor = article?.creator_id === Number(user?.id);
  const isAdmin = user?.role === "admin";

  // Permisos calculados
  const canLike = isAuthenticated; // Solo logueados pueden dar like
  const canEdit = isAuthenticated && (isAuthor || isAdmin); // Autor o admin
  const canDelete = isAdmin; // Solo admin

  const handleLike = async () => {
    if (isLikeLoading) return; // Evita clics múltiples mientras se procesa

    setIsLikeLoading(true);

    // Guardamos el estado anterior por si la petición al backend falla
    const previousState = { isLiked, likes };

    // Actualización optimista: cambiamos la UI al instante
    setIsLiked((current) => !current);
    setLikes((current) =>
      previousState.isLiked ? Math.max(0, current - 1) : current + 1
    );

    try {
      // Llamamos al servicio correspondiente
      const res = previousState.isLiked
        ? await unlikeArticle(id)
        : await likeArticle(id);

      // Si el servicio nos devuelve un error, lo lanzamos para que lo capture el catch
      if (!res.ok) {
        throw new Error(res.error);
      }
    } catch (err) {
      console.error("Error en la operación de like:", err);
      // Si algo falló, revertimos la UI al estado anterior
      setIsLiked(previousState.isLiked);
      setLikes(previousState.likes);
      // Y mostramos un mensaje al usuario
      alert("No se pudo procesar tu 'Me gusta'. Inténtalo de nuevo.");
    } finally {
      setIsLikeLoading(false); // Habilitamos el botón de nuevo
    }
  };

  const handleEdit = () => {
    navigate(`/article/edit/${id}`);
  };

  const handleDelete = async () => {
    if (
      !window.confirm("¿Estás seguro de que deseas eliminar este artículo?")
    ) {
      return;
    }

    try {
      const res = await deleteArticle(id);
      if (res.ok) {
        alert("Artículo eliminado correctamente ✅");
        navigate("/");
      } else {
        alert("No se pudo eliminar el artículo ❌");
      }
    } catch (err) {
      console.error("Error eliminando artículo:", err);
      alert("Error al eliminar el artículo");
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
      <div className="article-detail-breadcrumb">
        <button
          onClick={() => navigate("/")}
          className="breadcrumb-back-button"
        >
          <ArrowLeft size={18} /> Volver al listado
        </button>
        <ChevronRight size={16} />
        {/* Modificación aquí */}
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
            {/* 👉 LIKE - Solo si está logueado */}
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

            {/* 👉 EDITAR - Solo el autor o admin */}
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

            {/* 👉 ELIMINAR - Solo admin */}
            {canDelete && (
              <Button
                onClick={handleDelete}
                variant="tertiary"
                className="article-detail-button article-detail-button-delete"
              >
                <Trash2 size={18} />
                Eliminar
              </Button>
            )}

            {/* 👉 Si NO está logueado, mostrar mensaje */}
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
    </div>
  );
}
