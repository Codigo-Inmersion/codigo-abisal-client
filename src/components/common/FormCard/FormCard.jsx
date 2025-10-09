import { useState } from "react";
import PropTypes from "prop-types";
import "../../../styles/RegisterPage.css";

const FormCard = ({ onSubmit, isLoading = false, type = "register" }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    last_name: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!formData.email || !formData.password || !formData.username) {
      alert("Por favor completa todos los campos requeridos");
      return;
    }

    // Llamar a la función que maneja la autenticación
    await onSubmit(formData);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">
          {type === "login" ? "Inicia sesión" : "Crea una cuenta"}
        </h2>

        {/* Campos solo para registro */}
        {type === "register" && (
          <>
            <input
              type="text"
              name="username"
              placeholder="Nombre de usuario"
              value={formData.username}
              onChange={handleChange}
              disabled={isLoading}
              required
            />

            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
              required
            />

            <input
              type="text"
              name="last_name"
              placeholder="Apellido"
              value={formData.last_name}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </>
        )}

        {/* Campos comunes (email y password) */}
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          disabled={isLoading}
          required
        />

        <button type="submit" disabled={isLoading}>
          {isLoading
            ? "Cargando..."
            : type === "login"
            ? "Iniciar sesión"
            : "Registrarse"}
        </button>
      </form>
    </div>
  );
};

FormCard.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  type: PropTypes.oneOf(["login", "register"]).isRequired
};

export default FormCard;
