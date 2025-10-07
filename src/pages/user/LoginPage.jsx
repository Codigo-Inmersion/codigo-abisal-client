import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import FormCard from "../../components/common/RegisterForm/RegisterForm";

function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();
  
  // Estado local para manejar errores específicos de esta página
  const [localError, setLocalError] = useState("");

  /**
   * Función que se pasará al formulario
   * El formulario llamará a esta función cuando el usuario haga submit
   */
  const handleLogin = async (credentials) => {
    try {
      setLocalError(""); // Limpiar errores previos
      
      // Llamar a la función login del store
      await login(credentials);
      
      // Si llegamos aquí, el login fue exitoso
      // El middleware ya redirigirá automáticamente
      // pero podemos forzar la navegación si es necesario
      navigate("/");
      
    } catch (err) {
      // El error ya está en el store, pero podemos manejarlo aquí también
      setLocalError(err.message || "Error al iniciar sesión");
    }
  };

  return (
    <div>
      <h1>Página de Login</h1>
      
      {/* Mostrar error si existe */}
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
        IMPORTANTE: Pasamos handleLogin como prop al formulario
        El formulario debe aceptar esta prop y llamarla en su onSubmit
      */}
      <FormCard 
        onSubmit={handleLogin}
        isLoading={isLoading}
        type="login"
      />
      
      {/* Link opcional para ir a registro */}
      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <Link to="/register">¿No tienes cuenta? Regístrate</Link>
      </div>
    </div>
  );
}

export default LoginPage;