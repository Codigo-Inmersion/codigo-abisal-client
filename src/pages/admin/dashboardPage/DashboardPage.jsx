import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, FileText, Plus, AlertTriangle } from 'lucide-react';
import ArticlesTable from "../../../components/admin/ArticlesTable/ArticlesTable";
import UsersTable from "../../../components/admin/UsersTable/UsersTable";
import Button from "../../../components/common/Button/Button";
import Modal from "../../../components/common/Modal/Modal"; //

import {getAbisalArticles, deleteArticle} from "../../../services/AbisalServices";
import {getAllUsers, deleteUser, updateUserRole} from "../../../services/UserServices";
import "./DashboardPage.css";

/**
 * 🎛️ Dashboard de Administración
 *
 * Panel principal con pestañas para gestionar artículos y usuarios
 *
 * ✅ Pestaña Articles: Gestión completa de artículos
 * ✅ Pestaña Users: Gestión completa de usuarios
 */
function DashboardPage() {
  const navigate = useNavigate();

  // Estado de las pestañas: 'articles' o 'users'
  const [activeTab, setActiveTab] = useState("articles");

  // ========================================
  // 📄 GESTIÓN DE ARTÍCULOS
  // ========================================

  // Datos y estados de artículos
  const [articles, setArticles] = useState([]);
  const [articlesLoading, setArticlesLoading] = useState(false);

  // Modal de confirmación para eliminar artículo
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);

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
      alert("❌ Error al cargar artículos: " + res.error);
    }
    setArticlesLoading(false);
  };

  const handleEditArticle = (id) => {
    navigate(`/admin/article/edit/${id}`);
  };

  const openArticleDeleteModal = (id) => {
    setArticleToDelete(id);
    setIsArticleModalOpen(true);
  };

  const handleDeleteArticle = async () => {
    if (!articleToDelete) return;

    const res = await deleteArticle(articleToDelete);
    if (res.ok) {
      alert("✅ Artículo eliminado correctamente");
      loadArticles(); // Recargar lista
    } else {
      alert("❌ Error al eliminar: " + res.error);
    }

    // Cierra el modal y resetea el ID
    setIsArticleModalOpen(false);
    setArticleToDelete(null);
  };

  const handleCreateArticle = () => {
    navigate("/admin/article/create");
  };

  // ========================================
  // 👥 GESTIÓN DE USUARIOS
  // ========================================

  // Datos y estados de usuarios
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);

  // Modal de confirmación para eliminar usuario
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Cargar usuarios al cambiar a la pestaña
  useEffect(() => {
    if (activeTab === "users") {
      loadUsers();
    }
  }, [activeTab]);

  const loadUsers = async () => {
    setUsersLoading(true);
    const res = await getAllUsers();
    if (res.ok) {
      setUsers(res.data);
    } else {
      alert("❌ Error al cargar usuarios: " + res.error);
    }
    setUsersLoading(false);
  };

  const handleUpdateUserRole = async (userId, newRole) => {
    const res = await updateUserRole(userId, newRole);
    if (res.ok) {
      alert("✅ Rol actualizado correctamente");
      loadUsers(); // Recargar lista
    } else {
      alert("❌ Error al actualizar rol: " + res.error);
    }
  };

  const openUserDeleteModal = (userId) => {
    setUserToDelete(userId);
    setIsUserModalOpen(true);
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    const res = await deleteUser(userToDelete);
    if (res.ok) {
      alert("✅ Usuario eliminado correctamente");
      loadUsers(); // Recargar lista
    } else {
      alert("❌ Error al eliminar: " + res.error);
    }

    // Cierra el modal y resetea el ID
    setIsUserModalOpen(false);
    setUserToDelete(null);
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
            {users.length > 0 && (
              <span className="tab-count">{users.length}</span>
            )}
          </button>
        </div>

        {/* Contenido según pestaña activa */}
        <div className="dashboard-content">
          {activeTab === "articles" ? (
            <ArticlesTable
              articles={articles}
              onEdit={handleEditArticle}
              onDelete={openArticleDeleteModal}
              isLoading={articlesLoading}
            />
          ) : (
            <UsersTable
              users={users}
              onUpdateRole={handleUpdateUserRole}
              onDelete={openUserDeleteModal}
              isLoading={usersLoading}
            />
          )}
        </div>
      </div>

      {/* Modal de confirmación para eliminar ARTÍCULO */}
      <Modal
        isOpen={isArticleModalOpen}
        onClose={() => setIsArticleModalOpen(false)}
        title={
          <span
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <AlertTriangle color="#ef4444" />
            Confirmar Eliminación de Artículo
          </span>
        }
      >
        <p>
          ¿Estás seguro de que deseas eliminar este artículo? Esta acción no se
          puede deshacer.
        </p>
        <div className="modal-actions">
          <Button variant="secondary" onClick={() => setIsArticleModalOpen(false)}>
            Cancelar
          </Button>
          <Button variant="tertiary" onClick={handleDeleteArticle}>
            Eliminar
          </Button>
        </div>
      </Modal>

      {/* Modal de confirmación para eliminar USUARIO */}
      <Modal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        title={
          <span
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <AlertTriangle color="#ef4444" />
            Confirmar Eliminación de Usuario
          </span>
        }
      >
        <p>
          ¿Estás seguro de que deseas eliminar este usuario? Esta acción no se
          puede deshacer y eliminará todos sus datos.
        </p>
        <div className="modal-actions">
          <Button variant="secondary" onClick={() => setIsUserModalOpen(false)}>
            Cancelar
          </Button>
          <Button variant="tertiary" onClick={handleDeleteUser}>
            Eliminar
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default DashboardPage;
