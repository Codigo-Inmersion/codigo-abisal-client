import React from 'react';
import { Users as UsersIcon } from 'lucide-react';
import './UsersTable.css';

//TODO ⚠️ IMPORTANTE: Esta tabla es solo un diseño de ejemplo.

/**
 * 👥 Tabla de Usuarios (Placeholder)
 * La funcionalidad real se implementará cuando el backend 
 * tenga listos los endpoints:
 * - GET /users
 * - DELETE /user/:id
 * - PUT /user/:id
 */
const UsersTable = () => {
  // Datos de ejemplo para mostrar el diseño
  const mockUsers = [
    {
      id: 1,
      username: 'admin_user',
      email: 'admin@ejemplo.com',
      role: 'admin',
      created_at: '2024-01-15T10:00:00Z'
    },
    {
      id: 2,
      username: 'john_doe',
      email: 'john@ejemplo.com',
      role: 'user',
      created_at: '2024-02-20T14:30:00Z'
    },
    {
      id: 3,
      username: 'jane_smith',
      email: 'jane@ejemplo.com',
      role: 'user',
      created_at: '2024-03-10T09:15:00Z'
    }
  ];

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };

  return (
    <div className="users-placeholder">
      {/* Banner informativo */}
      <div className="placeholder-banner">
        <UsersIcon size={24} />
        <div>
          <h3>Gestión de Usuarios (Próximamente)</h3>
          <p>
            Esta funcionalidad estará disponible cuando el backend implemente
            los endpoints necesarios: <code>GET /users</code>, <code>DELETE /user/:id</code>, <code>PUT /user/:id</code>
          </p>
        </div>
      </div>

      {/* Vista previa del diseño */}
      <div className="table-container table-preview">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Fecha de registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user) => (
              <tr key={user.id} className="preview-row">
                <td className="table-username">{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge role-${user.role}`}>
                    {user.role}
                  </span>
                </td>
                <td>{formatDate(user.created_at)}</td>
                <td className="table-actions">
                  <button className="btn-preview" disabled title="Próximamente">
                    Editar
                  </button>
                  <button className="btn-preview btn-delete" disabled title="Próximamente">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
