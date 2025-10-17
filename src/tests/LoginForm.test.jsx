// src/components/common/Forms/LoginForm.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import LoginForm from '../components/common/Forms/LoginForm.jsx';
import HomePage from '../pages/user/homePage/HomePage';

// Mockeamos el hook useNavigate para poder espiar si es llamado
const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

// Creamos un componente wrapper para tener el contexto del Router
const renderWithRouter = (component) => {
  return render(
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route path="/login" element={component} />
        {/* Añadimos una ruta de destino para verificar la redirección */}
        <Route path="/" element={<HomePage />} /> 
      </Routes>
    </MemoryRouter>
  );
};

describe('Componente LoginForm', () => {
  it('debería mostrar errores de validación si los campos están vacíos', async () => {
    const user = userEvent.setup();
    renderWithRouter(<LoginForm />);

    // 1. Simula el clic en el botón sin rellenar nada
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    // 2. Verifica que aparecen los mensajes de error
    expect(await screen.findByText(/el email es obligatorio/i)).toBeInTheDocument();
    expect(await screen.findByText(/la contraseña es obligatoria/i)).toBeInTheDocument();
  });

  it('debería navegar a la página de inicio con credenciales correctas', async () => {
    const user = userEvent.setup();
    renderWithRouter(<LoginForm />);

    // 1. Simula al usuario rellenando el formulario
    await user.type(screen.getByPlaceholderText(/tu@email.com/i), 'test@test.com');
    await user.type(screen.getByPlaceholderText(/••••••••/i), 'password123');

    // 2. Simula el clic en el botón de submit
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    // 3. Verifica que la función de navegación fue llamada para ir a la home.
    // Usamos waitFor para darle tiempo a que la llamada asíncrona de login se resuelva.
    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('/');
    });
  });
});