import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, FileText, Plus } from 'lucide-react';
import ArticlesTable from '../../../components/admin/ArticlesTable/ArticlesTable';
import UsersTable from '../../../components/admin/UsersTable/UsersTable';
import Button from '../../../components/common/Button/Button';
import { getAbisalArticles, deleteArticle } from '../../../services/AbisalServices';
import './DashboardPage.css';

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
  const [activeTab, setActiveTab] = useState('articles');

  // Datos y estados de artículos
  const [articles, setArticles] = useState([]);
  const [articlesLoading, setArticlesLoading] = useState(false);

  // ========================================
  // 📄 GESTIÓN DE ARTÍCULOS
  // ========================================

  // Cargar artículos al montar el componente o cambiar a la pestaña
  useEffect(() => {
    if (activeTab === 'articles') {
      loadArticles();
    }
  }, [activeTab]);

  const loadArticles = async () => {
    setArticlesLoading(true);
    const res = await getAbisalArticles();
    if (res.ok) {
      setArticles(res.data);
    } else {
      alert('Error al cargar artículos: ' + res.error);
    }
    setArticlesLoading(false);
  };

  const handleEditArticle = (id) => {
    navigate(`/admin/article/edit/${id}`);
  };

  const handleDeleteArticle = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este artículo?')) {
      const res = await deleteArticle(id);
      if (res.ok) {
        alert('Artículo eliminado correctamente ✅');
        loadArticles(); // Recargar lista
      } else {
        alert('Error al eliminar: ' + res.error);
      }
    }
  };

  const handleCreateArticle = () => {
    navigate('/admin/article/create');
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
          {activeTab === 'articles' && (
            <Button variant="primary" onClick={handleCreateArticle}>
              <Plus size={18} />
              Nuevo Artículo
            </Button>
          )}
          <Button variant="secondary" onClick={() => navigate('/')}>
            Volver al Home
          </Button>
        </div>
      </header>

      {/* Card Container (mismo estilo que DetailArticle) */}
      <div className="article-detail-wrapper dashboard-wrapper">
        {/* Pestañas */}
        <div className="dashboard-tabs">
          <button
            className={`tab-button ${activeTab === 'articles' ? 'active' : ''}`}
            onClick={() => setActiveTab('articles')}
          >
            <FileText size={20} />
            Artículos
            {articles.length > 0 && (
              <span className="tab-count">{articles.length}</span>
            )}
          </button>
          <button
            className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <Users size={20} />
            Usuarios
            <span className="tab-badge-soon">Próximamente</span>
          </button>
        </div>

        {/* Contenido según pestaña activa */}
        <div className="dashboard-content">
          {activeTab === 'articles' ? (
            <ArticlesTable
              articles={articles}
              onEdit={handleEditArticle}
              onDelete={handleDeleteArticle}
              isLoading={articlesLoading}
            />
          ) : (
            <UsersTable />
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
