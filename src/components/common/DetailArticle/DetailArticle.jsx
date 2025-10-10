import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { ChevronRight, Heart, Edit, Trash2, ArrowLeft } from 'lucide-react';
import './DetailArticle.css';
import Button from '../Button/Button';
import { getArticleById } from "../../../services/AbisalServices";
import DOMPurify from 'dompurify';
import api from "../../../api/client";
 import { getUsernameById  } from "../../../services/AbisalServices";


export default function DetailArticle() {
  // 1) Param de ruta
  const { id } = useParams();
  const navigate = useNavigate();

  // 2) Estado
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 3) UI local (likes/permisos)
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [canEdit, setCanEdit] = useState(false);// esta linea se usara cuando el admin edite o borre solo el admin

  // 4) Cargar artículo
  useEffect(() => {
    // 👇 Evito llamar a la API si id no existe o no es número
    if (!id || Number.isNaN(Number(id))) {
      setError("Identificador de artículo inválido.");
      setArticle(null);
      setLoading(false);
      return;
    }

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getArticleById(id); // Debe devolver { ok, data, error }
        if (!res.ok) {
          setError(res.error || "No se pudo cargar el artículo");
          setArticle(null);
        } else {
          const data = res.data;
          setArticle(data);
          setLikes(typeof data.likes === "number" ? data.likes : 0);
          setIsLiked(Boolean(data.isLiked));
          setCanEdit(Boolean(data.isAdmin) || Boolean(data.isAuthor));
        }
      } catch (e) {
        setError("Error al cargar el artículo");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);
//para sacar el monbre de  usuario que escribe el articulo por su id
const [authorName, setAuthorName] = useState("");

// ...
useEffect(() => {
  if (!id || Number.isNaN(Number(id))) {
    setError("Identificador de artículo inválido.");
    setArticle(null);
    setLoading(false);
    return;
  }

  (async () => {
    setLoading(true);
    setError(null);
    setAuthorName(""); // reset autor

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
      setIsLiked(Boolean(data.isLiked));
      // si ahora no quieres permisos, deja los botones siempre visibles y no uses canEdit

      // 👇 aquí pedimos el nombre usando creator_id
      if (data?.creator_id) {
        const ures = await getUsernameById(data.creator_id);
        // Logs para ver qué trae tu backend (mira consola si falla)
        console.debug("[Detail] getUsernameById:", ures);
        if (ures.ok && ures.name) {
          setAuthorName(ures.name);
        } else {
          setAuthorName(`Usuario #${data.creator_id}`);
        }
      } else {
        setAuthorName("");
      }
    } catch (e) {
      console.error("Error al cargar el artículo:", e);
      setError("Error al cargar el artículo");
    } finally {
      setLoading(false);
    }
  })();
}, [id]);


  // 5) Formateo fecha
  const formattedDate = useMemo(() => {
    if (!article?.created_at) return "";
    const d = new Date(article.created_at);
    if (Number.isNaN(d.getTime())) return "";
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }, [article?.created_at]);

  // 6) Limpieza HTML
  const sanitizedContent = useMemo(() => {
    if (!article?.content) return "";
    return DOMPurify.sanitize(article.content, { USE_PROFILES: { html: true } });
  }, [article?.content]);

  // 7) Handlers
  const handleLike = () => {
    setIsLiked((prev) => !prev);
    setLikes((v) => (isLiked ? Math.max(0, v - 1) : v + 1));
    // FUTURO: POST/DELETE /article/:id/like con tu api client
  };
 
  const handleEdit = () => {
    navigate(`/admin/article/edit/${id}`);
  };

  const HOME_PATH = "/";

  const handleDelete = async () => {
    if (!id || Number.isNaN(Number(id))) return;
    if (window.confirm("¿Estás seguro de que deseas eliminar este artículo?")) {
      try {
        // ✅ Usa tu cliente Axios (interceptores, auth, etc.)
        await api.delete(`/article/${id}`);
        navigate( HOME_PATH);// vuelve al home
      } catch (err) {
        alert(err.message || "No se pudo eliminar el artículo");
      }
    }
  };

  const handleBack = () => {
  navigate( HOME_PATH); // vuelve SIEMPRE al Home del carrusel
};

  // 8) Render imagen
  const renderImage = () => {
    if (article?.image) {
      return (
        <img
          src={article.image}
          alt={article.title || "Imagen del artículo"}
          className="article-detail-image"
        />
      );
    }
    return <div className="article-detail-placeholder" />;
  };

  // 9) Loading / Error
  if (loading) {
    return (
      <div className="article-detail-container">
        <div className="article-detail-breadcrumb">
          <button onClick={handleBack} className="breadcrumb-back-button">
            <ArrowLeft size={18} />
            Volver al listado
          </button>
          <ChevronRight size={16} />
          <span>Cargando…</span>
        </div>
        <div className="article-detail-wrapper">
          <p>Cargando artículo…</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="article-detail-container">
        <div className="article-detail-breadcrumb">
          <button onClick={handleBack} className="breadcrumb-back-button">
            <ArrowLeft size={18} />
            Volver al listado
          </button>
          <ChevronRight size={16} />
          <span>Error</span>
        </div>
        <div className="article-detail-wrapper">
          <p className="error">{error || "No se encontró el artículo."}</p>
        </div>
      </div>
    );
  }

  // 10) Render principal (tus mismas classNames)
  return (
    <div className="article-detail-container">
      {/* Breadcrumb */}
      <div className="article-detail-breadcrumb">
        <button onClick={handleBack} className="breadcrumb-back-button">
          <ArrowLeft size={18} />
          Volver al listado
        </button>
        <ChevronRight size={16} />
        <span>{article.category}</span>
        <ChevronRight size={16} />
        <span className="breadcrumb-current">Detalle</span>
      </div>

      {/* Card Container */}
      <div className="article-detail-wrapper">
        {/* Hero Card */}
        <div className="article-detail-hero">
          {renderImage()}

          <span className="article-detail-category-tag">{article.category}</span>

          <div className="article-detail-caption">
            <h1 className="article-detail-title">{article.title}</h1>
            <p className="article-detail-description">{article.description}</p>
            <div className="article-detail-meta">
              <span>{formattedDate}</span>
              <span>•</span>
               <span>@{authorName || `Usuario #${article?.creator_id ?? "?"}`}</span>
            </div>
          </div>
        </div>

        {/* Content Card */}
        <article className="article-detail-content">
          <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
        </article>

        {/* Action Buttons Card */}
        <div className="article-detail-actions">
          <div className="article-detail-actions-wrapper">
            {/* Like Button */}
            <Button
              onClick={handleLike} variant="primary"
              className={`article-detail-button article-detail-button-like ${isLiked ? "liked" : ""}`}
            >
              <Heart size={20} fill={isLiked ? "#0c0c1a" : "none"} />
              <span>{likes}</span>
            </Button>

            {/* Editar y Eliminar SIEMPRE visibles por ahora */}
            <Button onClick={handleEdit} variant="secondary"
            className="article-detail-button article-detail-button-edit">
              <Edit size={18} />
              Editar
            </Button>

            <Button onClick={handleDelete} variant="tertiary"
             className="article-detail-button article-detail-button-delete">
              <Trash2 size={18} />
              Eliminar
            </Button>

            {/* Edit and Delete Buttons */}
             {/* {canEdit && (
              <>
                <button onClick={handleEdit} className="article-detail-button article-detail-button-edit">
                  <Edit size={18} />
                  Editar
                </button>

                <button onClick={handleDelete} className="article-detail-button article-detail-button-delete">
                  <Trash2 size={18} />
                  Eliminar
                </button>
              </>
            )}   */}


          </div>
        </div>
      </div>
    </div>
  );
}