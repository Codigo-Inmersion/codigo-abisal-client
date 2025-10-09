/*import React from "react";

function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}

export default DashboardPage;*/

// TODO revisar el codigo para esta página

// src/pages/admin/DashboardPage.jsx
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/authStore';

/**
 * 🎓 EXPLICACIÓN: Dashboard de Admin (Protegido)
 * 
 * Esta página SOLO es accesible por usuarios con rol "admin"
 * gracias a que Layout_Admin está envuelto en <ProtectedRoute requireRole="admin">
 */

function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    console.log('👋 Cerrando sesión...');
    logout();
    navigate('/login');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem' }}>
        🔐 Panel de Administración
      </h1>
      
      {/* Información del usuario */}
      <div style={{ 
        backgroundColor: '#2a2a2a', 
        padding: '1.5rem', 
        borderRadius: '12px',
        marginBottom: '2rem',
        border: '2px solid #646cff'
      }}>
        <h3 style={{ marginTop: 0, color: '#646cff' }}>
          👤 Información de Usuario
        </h3>
        <p><strong>Nombre:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Rol:</strong> <span style={{ 
          backgroundColor: '#646cff', 
          padding: '0.2rem 0.6rem', 
          borderRadius: '4px',
          fontSize: '0.9rem'
        }}>
          {user?.role}
        </span></p>
      </div>

      {/* Acciones disponibles */}
      <div style={{ marginBottom: '2rem' }}>
        <h3>📋 Acciones disponibles</h3>
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          flexWrap: 'wrap',
          marginTop: '1rem'
        }}>
          <button
            onClick={() => navigate('/admin/articles/create')}
            style={{
              padding: '1rem 1.5rem',
              backgroundColor: '#646cff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '1rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#535bf2'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#646cff'}
          >
            ➕ Crear Artículo
          </button>

          <button
            onClick={() => navigate('/')}
            style={{
              padding: '1rem 1.5rem',
              backgroundColor: '#333',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '1rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#444'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#333'}
          >
            🏠 Ir al Home
          </button>

          <button
            onClick={handleLogout}
            style={{
              padding: '1rem 1.5rem',
              backgroundColor: '#ff4444',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '1rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#ff3333'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#ff4444'}
          >
            🚪 Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Información sobre la protección */}
      <div style={{ 
        backgroundColor: '#1a1a1a', 
        padding: '1.5rem', 
        borderRadius: '12px',
        border: '1px solid #333'
      }}>
        <h3 style={{ marginTop: 0, color: '#4caf50' }}>
          ✅ Protección de Rutas Activa
        </h3>
        <ul style={{ lineHeight: '1.8', color: '#ccc' }}>
          <li>Esta página solo es accesible por usuarios con rol "admin"</li>
          <li>Si intentas acceder sin autenticarte, te redirige a /login</li>
          <li>Si intentas acceder con rol "user", te redirige a /403</li>
          <li>El Layout_Admin completo está protegido</li>
        </ul>
      </div>
    </div>
  );
}

export default DashboardPage;
