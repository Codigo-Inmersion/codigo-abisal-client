import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, FileText, Plus, AlertTriangle } from 'lucide-react';
import ArticlesTable from "../../../components/admin/ArticlesTable/ArticlesTable";
import UsersTable from "../../../components/admin/UsersTable/UsersTable";
import Button from "../../../components/common/Button/Button";
import Modal from "../../../components/common/Modal/Modal"; //

import {
  getAbisalArticles,
  deleteArticle,
} from "../../../services/AbisalServices";
import "./DashboardPage.css";

/**
 * 🎛️ Dashboard de Administración
 *
 * Panel principal con pestañas para gestionar artículos y usuarios
 *
 * ✅ Pestaña Articles: Totalmente funcional
 * 🎨 Pestaña Users: Solo diseño (esperando endpoints de backend)
 */
function DashboardPage() {
  const navigate = useNavigate();

  // Estado de las pestañas: 'articles' o 'users'
  const [activeTab, setActiveTab] = useState("articles");

  // Datos y estados de artículos
  const [articles, setArticles] = useState([]);
  const [articlesLoading, setArticlesLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);
  // ========================================
  // 📄 GESTIÓN DE ARTÍCULOS
  // ========================================

  // Cargar artículos al montar el componente o cambiar a la pestaña
  useEffect(() => {
    if (activeTab === "articles") {
      loadArticles();
    }
  }, [activeTab]);

  const loadArticles = async () => {
    setArticlesLoading(true);
    const res = await getAbisalArticles();
    if (res.ok) {
      setArticles(res.data);
    } else {
      alert("Error al cargar artículos: " + res.error);
    }
    setArticlesLoading(false);
  };

  const handleEditArticle = (id) => {
    navigate(`/admin/article/edit/${id}`);
  };
  const openDeleteModal = (id) => {
    setArticleToDelete(id);
    setIsModalOpen(true);
  };
  const handleDeleteArticle = async (id) => {
    if (!articleToDelete) return;

    const res = await deleteArticle(articleToDelete);
    if (res.ok) {
      // Aquí podrías usar un "toast" de éxito
      alert("Artículo eliminado correctamente ✅");
      loadArticles(); // Recargar lista
    } else {
      // Y aquí un modal o toast de error
      alert("Error al eliminar: " + res.error);
    }

    // Cierra el modal y resetea el ID
    setIsModalOpen(false);
    setArticleToDelete(null);
  };

  const handleCreateArticle = () => {
    navigate("/admin/article/create");
  };

  // ========================================
  // 🎨 RENDERIZADO
  // ========================================

  return (
    <div className="dashboard-container">
      {/* Encabezado */}
      <header className="dashboard-header">
        <h1>Panel de Administración</h1>
        <div className="header-actions">
          {activeTab === "articles" && (
            <Button variant="primary" onClick={handleCreateArticle}>
              <Plus size={18} />
              Nuevo Artículo
            </Button>
          )}
          <Button variant="secondary" onClick={() => navigate("/")}>
            Volver al Inicio
          </Button>
        </div>
      </header>

      {/* Card Container (mismo estilo que DetailArticle) */}
      <div className="article-detail-wrapper dashboard-wrapper">
        {/* Pestañas */}
        <div className="dashboard-tabs">
          <button
            className={`tab-button ${activeTab === "articles" ? "active" : ""}`}
            onClick={() => setActiveTab("articles")}
          >
            <FileText size={20} />
            Artículos
            {articles.length > 0 && (
              <span className="tab-count">{articles.length}</span>
            )}
          </button>
          <button
            className={`tab-button ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            <Users size={20} />
            Usuarios
            <span className="tab-badge-soon">Próximamente</span>
          </button>
        </div>

        {/* Contenido según pestaña activa */}
        <div className="dashboard-content">
          {activeTab === "articles" ? (
            <ArticlesTable
              articles={articles}
              onEdit={handleEditArticle}
              onDelete={openDeleteModal}
              isLoading={articlesLoading}
            />
          ) : (
            <UsersTable />
          )}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
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
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Cancelar
          </Button>
          <Button variant="tertiary" onClick={handleDeleteArticle}>
            Eliminar
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default DashboardPage;
