import React from "react";
import LoginForm from "../../components/common/LoginForm/LoginForm";

/**
 * 🎓 EXPLICACIÓN: LoginPage
 * 
 * Página simple que renderiza el componente LoginForm.
 * El LoginForm maneja toda la lógica de autenticación usando:
 * - useAuth hook (que usa AuthServices y authStore)
 * - Validaciones locales
 * - Conexión con el backend
 */

function LoginPage() {
  return <LoginForm />;
}

export default LoginPage;
