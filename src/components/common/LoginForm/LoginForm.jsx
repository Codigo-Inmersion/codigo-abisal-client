import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import './LoginForm.css';

const LoginForm = () => {
  const { login, loading, error, clearError } = useAuth();
  
  // Estado del formulario
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  // Estado de errores de validación
  const [validationErrors, setValidationErrors] = useState({});

  // Estado de mostrar/ocultar password
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Maneja cambios en los inputs
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
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
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  /**
   * Valida el formulario antes de enviar
   * @returns {boolean} true si es válido
   */
  const validateForm = () => {
    const errors = {};

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

    // Enviar credenciales (sin el campo remember)
    const credentials = {
      email: formData.email.trim(),
      password: formData.password
    };

    await login(credentials);
  };

  return (
    <div className="form-container">
      <div className="liquid-card">
        <div className="liquid-card-content">
          <h2 className="card-title">Inicia sesión</h2>
          <p className="card-description">
            Accede a tu cuenta de Código Abisal
          </p>

          {/* Mensaje de error general del servidor */}
          {error && (
            <div className="error-alert" role="alert">
              <span className="error-icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="form" noValidate>
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
                  placeholder="••••••••"
                  className={validationErrors.password ? 'error' : ''}
                  disabled={loading}
                  aria-invalid={!!validationErrors.password}
                  aria-describedby={validationErrors.password ? 'password-error' : undefined}
                  autoComplete="current-password"
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

            {/* Opciones adicionales */}
            <div className="form-options">
              <label className="checkbox-wrapper">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  disabled={loading}
                />
                <span className="checkbox-label">Recuérdame</span>
              </label>
              <Link to="/forgot-password" className="forgot-link">
                ¿Olvidaste tu contraseña?
              </Link>
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
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar sesión'
              )}
            </button>

            {/* Enlace a registro */}
            <div className="signup-link">
              ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
