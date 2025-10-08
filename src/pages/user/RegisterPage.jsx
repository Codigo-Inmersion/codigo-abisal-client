import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore.js";
import FormCard from "../../components/common/RegisterForm/RegisterForm";

function RegisterPage() {
  const navigate = useNavigate();
  const { register, isLoading, error } = useAuthStore();
  const [localError, setLocalError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  /**
   * Función que se pasará al formulario de registro
   */
  const handleRegister = async (userData) => {
    try {
      setLocalError("");
      setSuccessMessage("");
      
      // Llamar a la función register del store
      await register(userData);
      
      // Si el registro fue exitoso
      setSuccessMessage("¡Registro exitoso! Redirigiendo...");
      
      // Esperar un momento para que el usuario vea el mensaje
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
    } catch (err) {
      setLocalError(err.message || "Error al registrar usuario");
    }
  };

  return (
    <div>
      <h1>Página de Registro</h1>
      
      {/* Mensaje de éxito */}
      {successMessage && (
        <div style={{ 
          color: 'green', 
          marginBottom: '1rem',
          padding: '0.5rem',
          background: 'rgba(0,255,0,0.1)',
          borderRadius: '4px'
        }}>
          {successMessage}
        </div>
      )}
      
      {/* Mensaje de error */}
      {(error || localError) && (
        <div style={{ 
          color: 'red', 
          marginBottom: '1rem',
          padding: '0.5rem',
          background: 'rgba(255,0,0,0.1)',
          borderRadius: '4px'
        }}>
          {error || localError}
        </div>
      )}
      
      {/* 
        Pasamos handleRegister como prop
        Y especificamos type="register" para que el formulario sepa qué campos mostrar
      */}
      <FormCard 
        onSubmit={handleRegister}
        isLoading={isLoading}
        type="register"
      />
      
      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <Link to="/login">¿Ya tienes cuenta? Inicia sesión</Link>
      </div>
    </div>
  );
}

export default RegisterPage;