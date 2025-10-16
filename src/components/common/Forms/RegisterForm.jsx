import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import './Form.css';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';


/**
 * 🎓 EXPLICACIÓN: Formulario de Registro
 * 
 * Componente que maneja el registro de nuevos usuarios.
 * Campos obligatorios: name, last_name, username, email, password
 * 
 * Características:
 * - Validaciones en tiempo real
 * - Confirmación de contraseña
 * - Auto-login después del registro
 * - Manejo de errores del servidor
 */

const RegisterForm = () => {
  const { register, loading, error, clearError } = useAuth();
  const navigate = useNavigate();

  // Estado del formulario
  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Estado de errores de validación
  const [validationErrors, setValidationErrors] = useState({});

  // Estado de mostrar/ocultar passwords
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /**
   * Maneja cambios en los inputs
   */
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Limpiar error del campo al empezar a escribir
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Limpiar error general si existe
    if (error) clearError();

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Valida el formulario antes de enviar
   * @returns {boolean} true si es válido
   */
  const validateForm = () => {
    const errors = {};

    // Validación de nombre
    if (!formData.name.trim()) {
      errors.name = 'El nombre es obligatorio';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    // Validación de apellido
    if (!formData.last_name.trim()) {
      errors.last_name = 'El apellido es obligatorio';
    } else if (formData.last_name.trim().length < 2) {
      errors.last_name = 'El apellido debe tener al menos 2 caracteres';
    }

    // Validación de username
    if (!formData.username.trim()) {
      errors.username = 'El nombre de usuario es obligatorio';
    } else if (formData.username.trim().length < 3) {
      errors.username = 'El username debe tener al menos 3 caracteres';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      errors.username = 'Solo letras, números y guion bajo';
    }

    // Validación de email
    if (!formData.email.trim()) {
      errors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'El formato del email no es válido';
    }

    // Validación de password
    if (!formData.password) {
      errors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    // Validación de confirmación de password
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Debes confirmar tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Maneja el envío del formulario
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar antes de enviar
    if (!validateForm()) {
      return;
    }

    // Preparar datos (sin confirmPassword)
    const userData = {
      name: formData.name.trim(),
      last_name: formData.last_name.trim(),
      username: formData.username.trim(),
      email: formData.email.trim(),
      password: formData.password
    };

    await register(userData);
  };

  return (
    <div className="form-container">
      <div className="liquid-card">
        <div className="liquid-card-content">
          <h2 className="card-title">Crear cuenta</h2>
          <p className="card-description">
            Únete a Código Abisal
          </p>

          {/* Mensaje de error general del servidor */}
          {error && (
            <div className="error-alert" role="alert">
              <span className="error-icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="form" noValidate>
            {/* Campo Nombre */}
            <div className="form-group">
              <label htmlFor="name">
                Nombre <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Beyoncé"
                className={validationErrors.name ? 'error' : ''}
                disabled={loading}
                aria-invalid={!!validationErrors.name}
                aria-describedby={validationErrors.name ? 'name-error' : undefined}
                autoComplete="given-name"
              />
              {validationErrors.name && (
                <span className="error-message" id="name-error" role="alert">
                  {validationErrors.name}
                </span>
              )}
            </div>

            {/* Campo Apellido */}
            <div className="form-group">
              <label htmlFor="last_name">
                Apellido <span className="required">*</span>
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Knowles"
                className={validationErrors.last_name ? 'error' : ''}
                disabled={loading}
                aria-invalid={!!validationErrors.last_name}
                aria-describedby={validationErrors.last_name ? 'lastname-error' : undefined}
                autoComplete="family-name"
              />
              {validationErrors.last_name && (
                <span className="error-message" id="lastname-error" role="alert">
                  {validationErrors.last_name}
                </span>
              )}
            </div>

            {/* Campo Username */}
            <div className="form-group">
              <label htmlFor="username">
                Nombre de usuario <span className="required">*</span>
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="crazyinlove01"
                className={validationErrors.username ? 'error' : ''}
                disabled={loading}
                aria-invalid={!!validationErrors.username}
                aria-describedby={validationErrors.username ? 'username-error' : undefined}
                autoComplete="username"
              />
              {validationErrors.username && (
                <span className="error-message" id="username-error" role="alert">
                  {validationErrors.username}
                </span>
              )}
            </div>

            {/* Campo Email */}
            <div className="form-group">
              <label htmlFor="email">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                className={validationErrors.email ? 'error' : ''}
                disabled={loading}
                aria-invalid={!!validationErrors.email}
                aria-describedby={validationErrors.email ? 'email-error' : undefined}
                autoComplete="email"
              />
              {validationErrors.email && (
                <span className="error-message" id="email-error" role="alert">
                  {validationErrors.email}
                </span>
              )}
            </div>

            {/* Campo Password */}
            <div className="form-group">
              <label htmlFor="password">
                Contraseña <span className="required">*</span>
              </label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Mínimo 6 caracteres"
                  className={validationErrors.password ? 'error' : ''}
                  disabled={loading}
                  aria-invalid={!!validationErrors.password}
                  aria-describedby={validationErrors.password ? 'password-error' : undefined}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  tabIndex={-1}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {validationErrors.password && (
                <span className="error-message" id="password-error" role="alert">
                  {validationErrors.password}
                </span>
              )}
            </div>

            {/* Campo Confirmar Password */}
            <div className="form-group">
              <label htmlFor="confirmPassword">
                Confirmar contraseña <span className="required">*</span>
              </label>
              <div className="password-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repite tu contraseña"
                  className={validationErrors.confirmPassword ? 'error' : ''}
                  disabled={loading}
                  aria-invalid={!!validationErrors.confirmPassword}
                  aria-describedby={validationErrors.confirmPassword ? 'confirm-error' : undefined}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {validationErrors.confirmPassword && (
                <span className="error-message" id="confirm-error" role="alert">
                  {validationErrors.confirmPassword}
                </span>
              )}
            </div>

            {/* Botón de submit */}
            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Creando cuenta...
                </>
              ) : (
                'Crear cuenta'
              )}
            </button>

            {/* Enlace a login */}
            <div className="signup-link">
              ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
            </div>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="back-button"
            >
              <ArrowLeft size={20} /> Volver al inicio
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
