/*
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter, mockApiResponses } from './test-utils';
import RegisterForm from '../components/common/RegisterForm/RegisterForm';
import * as AuthServices from '../services/AuthServices';

/**
 * 🎓 EXPLICACIÓN: Tests de RegisterForm
 * 
 * Probamos:
 * 1. Renderizado inicial
 * 2. Validaciones de todos los campos
 * 3. Validación de contraseñas coincidentes
 * 4. Registro exitoso
 * 5. Manejo de errores


// Mock del servicio de autenticación
vi.mock('../services/AuthServices', () => ({
  default: {
    register: vi.fn()
  }
}));

// Mock del hook useAuth
vi.mock('../hooks/useAuth', () => ({
  useAuth: () => ({
    register: vi.fn(async (userData) => {
      return AuthServices.default.register(userData);
    }),
    loading: false,
    error: null,
    clearError: vi.fn()
  })
}));

describe('RegisterForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  // ========================================
  // TEST 1: Renderizado inicial
  // ========================================
  it('renderiza correctamente todos los campos del formulario', () => {
    renderWithRouter(<RegisterForm />);

    expect(screen.getByText('Crear cuenta')).toBeInTheDocument();
    expect(screen.getByText('Únete a Código Abisal')).toBeInTheDocument();

    // Verificar todos los campos
    expect(screen.getByLabelText(/^nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/apellido/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nombre de usuario/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^contraseña/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmar contraseña/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /crear cuenta/i })).toBeInTheDocument();
  });

  // ========================================
  // TEST 2: Validación de campos vacíos
  // ========================================
  it('muestra errores cuando los campos obligatorios están vacíos', async () => {
    const user = userEvent.setup();
    renderWithRouter(<RegisterForm />);

    const submitButton = screen.getByRole('button', { name: /crear cuenta/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('El nombre es obligatorio')).toBeInTheDocument();
      expect(screen.getByText('El apellido es obligatorio')).toBeInTheDocument();
      expect(screen.getByText('El nombre de usuario es obligatorio')).toBeInTheDocument();
      expect(screen.getByText('El email es obligatorio')).toBeInTheDocument();
      expect(screen.getByText('La contraseña es obligatoria')).toBeInTheDocument();
    });
  });

  // ========================================
  // TEST 3: Validación de longitud mínima
  // ========================================
  it('valida la longitud mínima de los campos', async () => {
    const user = userEvent.setup();
    renderWithRouter(<RegisterForm />);

    const nameInput = screen.getByLabelText(/^nombre/i);
    const lastNameInput = screen.getByLabelText(/apellido/i);
    const usernameInput = screen.getByLabelText(/nombre de usuario/i);

    await user.type(nameInput, 'A');
    await user.type(lastNameInput, 'B');
    await user.type(usernameInput, 'AB');

    const submitButton = screen.getByRole('button', { name: /crear cuenta/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('El nombre debe tener al menos 2 caracteres')).toBeInTheDocument();
      expect(screen.getByText('El apellido debe tener al menos 2 caracteres')).toBeInTheDocument();
      expect(screen.getByText('El username debe tener al menos 3 caracteres')).toBeInTheDocument();
    });
  });

  // ========================================
  // TEST 4: Validación de formato de username
  // ========================================
  it('valida que el username solo tenga caracteres permitidos', async () => {
    const user = userEvent.setup();
    renderWithRouter(<RegisterForm />);

    const usernameInput = screen.getByLabelText(/nombre de usuario/i);
    await user.type(usernameInput, 'user@name!');

    const submitButton = screen.getByRole('button', { name: /crear cuenta/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Solo letras, números y guion bajo')).toBeInTheDocument();
    });
  });

  // ========================================
  // TEST 5: Validación de formato de email
  // ========================================
  it('valida el formato del email', async () => {
    const user = userEvent.setup();
    renderWithRouter(<RegisterForm />);

    const emailInput = screen.getByLabelText(/^email/i);
    await user.type(emailInput, 'email-invalido');

    const submitButton = screen.getByRole('button', { name: /crear cuenta/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('El formato del email no es válido')).toBeInTheDocument();
    });
  });

  // ========================================
  // TEST 6: Validación de contraseñas coincidentes
  // ========================================
  it('valida que las contraseñas coincidan', async () => {
    const user = userEvent.setup();
    renderWithRouter(<RegisterForm />);

    const passwordInput = screen.getByLabelText(/^contraseña/i);
    const confirmPasswordInput = screen.getByLabelText(/confirmar contraseña/i);

    await user.type(passwordInput, 'password123');
    await user.type(confirmPasswordInput, 'password456');

    const submitButton = screen.getByRole('button', { name: /crear cuenta/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Las contraseñas no coinciden')).toBeInTheDocument();
    });
  });

  // ========================================
  // TEST 7: Toggle mostrar/ocultar contraseñas
  // ========================================
  it('permite mostrar y ocultar ambas contraseñas', async () => {
    const user = userEvent.setup();
    renderWithRouter(<RegisterForm />);

    const passwordInput = screen.getByLabelText(/^contraseña/i);
    const confirmPasswordInput = screen.getByLabelText(/confirmar contraseña/i);
    
    const toggleButtons = screen.getAllByLabelText(/mostrar contraseña/i);

    // Inicialmente ambas son tipo password
    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(confirmPasswordInput).toHaveAttribute('type', 'password');

    // Mostrar primera contraseña
    await user.click(toggleButtons[0]);
    expect(passwordInput).toHaveAttribute('type', 'text');

    // Mostrar segunda contraseña
    await user.click(toggleButtons[1]);
    expect(confirmPasswordInput).toHaveAttribute('type', 'text');
  });

  // ========================================
  // TEST 8: Registro exitoso
  // ========================================
  it('llama al servicio de registro con datos correctos', async () => {
    const user = userEvent.setup();
    
    // Mock de respuesta exitosa
    AuthServices.default.register.mockResolvedValueOnce(mockApiResponses.registerSuccess);

    renderWithRouter(<RegisterForm />);

    // Llenar todos los campos
    await user.type(screen.getByLabelText(/^nombre/i), 'Juan');
    await user.type(screen.getByLabelText(/apellido/i), 'Pérez');
    await user.type(screen.getByLabelText(/nombre de usuario/i), 'juanperez');
    await user.type(screen.getByLabelText(/^email/i), 'juan@test.com');
    await user.type(screen.getByLabelText(/^contraseña/i), 'password123');
    await user.type(screen.getByLabelText(/confirmar contraseña/i), 'password123');

    const submitButton = screen.getByRole('button', { name: /crear cuenta/i });
    await user.click(submitButton);

    // Verificar que se llamó al servicio con los datos correctos
    await waitFor(() => {
      expect(AuthServices.default.register).toHaveBeenCalledWith({
        name: 'Juan',
        last_name: 'Pérez',
        username: 'juanperez',
        email: 'juan@test.com',
        password: 'password123',
        role: 'user'
      });
    });
  });

  // ========================================
  // TEST 9: Manejo de errores del servidor
  // ========================================
  it('muestra error cuando el email ya está registrado', async () => {
    const user = userEvent.setup();
    
    // Mock de error
    AuthServices.default.register.mockRejectedValueOnce(
      new Error('El email ya está registrado')
    );

    renderWithRouter(<RegisterForm />);

    // Llenar formulario
    await user.type(screen.getByLabelText(/^nombre/i), 'Juan');
    await user.type(screen.getByLabelText(/apellido/i), 'Pérez');
    await user.type(screen.getByLabelText(/nombre de usuario/i), 'juanperez');
    await user.type(screen.getByLabelText(/^email/i), 'existing@test.com');
    await user.type(screen.getByLabelText(/^contraseña/i), 'password123');
    await user.type(screen.getByLabelText(/confirmar contraseña/i), 'password123');

    const submitButton = screen.getByRole('button', { name: /crear cuenta/i });
    await user.click(submitButton);

    // Verificar que se muestra el error
    await waitFor(() => {
      expect(screen.getByText(/el email ya está registrado/i)).toBeInTheDocument();
    });
  });

  // ========================================
  // TEST 10: Limpia errores al escribir
  // ========================================
  it('limpia los errores de validación al empezar a escribir', async () => {
    const user = userEvent.setup();
    renderWithRouter(<RegisterForm />);

    const submitButton = screen.getByRole('button', { name: /crear cuenta/i });
    
    // Provocar error
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('El nombre es obligatorio')).toBeInTheDocument();
    });

    // Escribir en el campo
    const nameInput = screen.getByLabelText(/^nombre/i);
    await user.type(nameInput, 'J');

    // El error debe desaparecer
    await waitFor(() => {
      expect(screen.queryByText('El nombre es obligatorio')).not.toBeInTheDocument();
    });
  });
});
 */