import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

/**
 * 🎓 EXPLICACIÓN: Test Utils
 * 
 * Funciones auxiliares para facilitar los tests:
 * - renderWithRouter: Renderiza componentes que usan react-router
 * - mockAuthStore: Mock del store de autenticación
 */

/**
 * Renderiza un componente con Router
 * Necesario para componentes que usan useNavigate, Link, etc.
 */
export function renderWithRouter(ui, { route = '/' } = {}) {
  window.history.pushState({}, 'Test page', route);

  return render(ui, { wrapper: BrowserRouter });
}

/**
 * Mock del store de autenticación
 * Útil para simular diferentes estados de autenticación
 */
export const mockAuthStore = {
  unauthenticated: {
    token: null,
    user: null,
    isLoading: false
  },
  authenticatedUser: {
    token: 'fake-token-user',
    user: {
      id: '1',
      email: 'user@test.com',
      role: 'user'
    },
    isLoading: false
  },
  authenticatedAdmin: {
    token: 'fake-token-admin',
    user: {
      id: '2',
      email: 'admin@test.com',
      role: 'admin'
    },
    isLoading: false
  }
};

/**
 * Simula respuestas del backend
 */
export const mockApiResponses = {
  loginSuccess: {
    message: 'Login exitoso',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiZW1haWwiOiJ1c2VyQHRlc3QuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MTcwMDYwMDAwMH0.fake'
  },
  registerSuccess: {
    message: 'Usuario registrado correctamente',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzIiwiZW1haWwiOiJuZXdAdGVzdC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjoxNzAwNjAwMDAwfQ.fake'
  },
  loginError: {
    message: 'Credenciales incorrectas'
  },
  registerError: {
    message: 'El email ya está registrado'
  }
};