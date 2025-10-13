import React, { useState } from 'react';
import { Edit, Trash2, Save, X } from 'lucide-react';
import Button from '../../common/Button/Button';
import './UsersTable.css';

/**
 * 👥 Tabla de Usuarios
 * Muestra todos los usuarios con opción de cambiar rol y eliminar
 */
const UsersTable = ({ users, onUpdateRole, onDelete, isLoading }) => {
  // Estado para saber qué usuario está siendo editado
  const [editingUserId, setEditingUserId] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  };

  // Activar modo edición
  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setSelectedRole(user.role);
  };

  // Cancelar edición
  const handleCancelEdit = () => {
    setEditingUserId(null);
    setSelectedRole('');
  };

  // Guardar cambio de rol
  const handleSaveRole = (userId) => {
    onUpdateRole(userId, selectedRole);
    setEditingUserId(null);
  };

  if (isLoading) {
    return <p className="table-loading">Cargando usuarios...</p>;
  }

  if (!users || users.length === 0) {
    return <p className="table-empty">No hay usuarios disponibles</p>;
  }

  return (
    <div className="table-container">
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
          {users.map((user) => (
            <tr key={user.id}>
              <td className="table-username">{user.username}</td>
              <td>{user.email}</td>
              <td>
                {editingUserId === user.id ? (
                  // Modo edición: mostrar select
                  <select
                    className="role-select"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                ) : (
                  // Modo normal: mostrar badge
                  <span className={`role-badge role-${user.role}`}>
                    {user.role}
                  </span>
                )}
              </td>
              <td>{formatDate(user.created_at)}</td>
              <td className="table-actions">
                {editingUserId === user.id ? (
                  // Botones de guardar/cancelar
                  <>
                    <Button
                      variant="primary"
                      onClick={() => handleSaveRole(user.id)}
                      type="button"
                    >
                      <Save size={16} />
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={handleCancelEdit}
                      type="button"
                    >
                      <X size={16} />
                    </Button>
                  </>
                ) : (
                  // Botones normales
                  <>
                    <Button
                      variant="secondary"
                      onClick={() => handleEditClick(user)}
                      type="button"
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="tertiary"
                      onClick={() => onDelete(user.id)}
                      type="button"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
