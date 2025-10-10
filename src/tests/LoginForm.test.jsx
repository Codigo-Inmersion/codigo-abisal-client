import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter, mockApiResponses } from './test-utils';
import LoginForm from '../components/common/Forms/LoginForm';
import * as AuthServices from '../services/AuthServices';

/**
 * 🎓 EXPLICACIÓN: Tests de LoginForm
 * 
 * Probamos:
 * 1. Renderizado inicial
 * 2. Validaciones de campos
 * 3. Login exitoso
 * 4. Manejo de errores
 * 5. Estados de carga
 */

// Mock del servicio de autenticación
vi.mock('../services/AuthServices', () => ({
  default: {
    login: vi.fn()
  }
}));

// Mock del hook useAuth
vi.mock('../hooks/useAuth', () => ({
  useAuth: () => ({
    login: vi.fn(async (credentials) => {
      return AuthServices.default.login(credentials.email, credentials.password);
    }),
    loading: false,
    error: null,
    clearError: vi.fn()
  })
}));

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  // ========================================
  // TEST 1: Renderizado inicial
  // ========================================
  it('renderiza correctamente todos los elementos del formulario', () => {
    renderWithRouter(<LoginForm />);

    // Verificar título y descripción
    expect(screen.getByText('Inicia sesión')).toBeInTheDocument();
    expect(screen.getByText('Accede a tu cuenta de Código Abisal')).toBeInTheDocument();

    // Verificar campos del formulario
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();

    // Verificar botones
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
    expect(screen.getByText(/¿no tienes cuenta\?/i)).toBeInTheDocument();
  });

  // ========================================
  // TEST 2: Validación de email vacío
  // ========================================
  it('muestra error cuando el email está vacío', async () => {
    const user = userEvent.setup();
    renderWithRouter(<LoginForm />);

    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('El email es obligatorio')).toBeInTheDocument();
    });
  });

  // ========================================
  // TEST 3: Validación de formato de email
  // ========================================
  it('muestra error cuando el email tiene formato inválido', async () => {
    const user = userEvent.setup();
    renderWithRouter(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'email-invalido');

    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('El formato del email no es válido')).toBeInTheDocument();
    });
  });

  // ========================================
  // TEST 4: Validación de contraseña vacía
  // ========================================
  it('muestra error cuando la contraseña está vacía', async () => {
    const user = userEvent.setup();
    renderWithRouter(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'test@example.com');

    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('La contraseña es obligatoria')).toBeInTheDocument();
    });
  });

  // ========================================
  // TEST 5: Validación de contraseña corta
  // ========================================
  it('muestra error cuando la contraseña tiene menos de 6 caracteres', async () => {
    const user = userEvent.setup();
    renderWithRouter(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, '12345');

    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('La contraseña debe tener al menos 6 caracteres')).toBeInTheDocument();
    });
  });

  // ========================================
  // TEST 6: Toggle mostrar/ocultar contraseña
  // ========================================
  it('permite mostrar y ocultar la contraseña', async () => {
    const user = userEvent.setup();
    renderWithRouter(<LoginForm />);

    const passwordInput = screen.getByLabelText(/contraseña/i);
    const toggleButton = screen.getByLabelText(/mostrar contraseña/i);

    // Inicialmente debe ser tipo password
    expect(passwordInput).toHaveAttribute('type', 'password');

    // Click para mostrar
    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');

    // Click para ocultar
    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  // ========================================
  // TEST 7: Login exitoso
  // ========================================
  it('llama al servicio de login con credenciales correctas', async () => {
    const user = userEvent.setup();
    
    // Mock de respuesta exitosa
    AuthServices.default.login.mockResolvedValueOnce(mockApiResponses.loginSuccess);

    renderWithRouter(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });

    // Llenar formulario
    await user.type(emailInput, 'user@test.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    // Verificar que se llamó al servicio
    await waitFor(() => {
      expect(AuthServices.default.login).toHaveBeenCalledWith('user@test.com', 'password123');
    });
  });

  // ========================================
  // TEST 8: Manejo de errores del servidor
  // ========================================
  it('muestra error cuando las credenciales son incorrectas', async () => {
    const user = userEvent.setup();
    
    // Mock de error
    AuthServices.default.login.mockRejectedValueOnce(
      new Error('Credenciales incorrectas')
    );

    renderWithRouter(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });

    await user.type(emailInput, 'wrong@test.com');
    await user.type(passwordInput, 'wrongpassword');
    await user.click(submitButton);

    // Verificar que se muestra el error
    await waitFor(() => {
      expect(screen.getByText(/credenciales incorrectas/i)).toBeInTheDocument();
    });
  });

  // ========================================
  // TEST 9: Limpia errores al escribir
  // ========================================
  it('limpia los errores de validación al empezar a escribir', async () => {
    const user = userEvent.setup();
    renderWithRouter(<LoginForm />);

    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    
    // Provocar error
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('El email es obligatorio')).toBeInTheDocument();
    });

    // Escribir en el campo
    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 't');

    // El error debe desaparecer
    await waitFor(() => {
      expect(screen.queryByText('El email es obligatorio')).not.toBeInTheDocument();
    });
  });

});
