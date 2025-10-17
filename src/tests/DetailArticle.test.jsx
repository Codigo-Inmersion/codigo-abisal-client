import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DetailArticle from '../components/common/DetailArticle/DetailArticle.jsx';
import useAuthStore from '../stores/authStore.js';

// Helper para renderizar el componente con el router y una ruta dinámica
const renderComponent = (initialPath) => {
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/article/:id" element={<DetailArticle />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('Componente DetailArticle', () => {

  it('debería mostrar los detalles del artículo para cualquier usuario', async () => {
    renderComponent('/article/1');

    // Verificamos que el título y la descripción se renderizan
    expect(await screen.findByText(/El Gran Calamar de las Profundidades/i)).toBeInTheDocument();
    expect(await screen.findByText(/Un espécimen único hallado/i)).toBeInTheDocument();
  });

  it('NO debería mostrar los botones de Editar o Eliminar a un visitante', async () => {
    renderComponent('/article/1');

    // Esperamos a que el título aparezca para asegurarnos de que el componente ha cargado
    await screen.findByText(/El Gran Calamar de las Profundidades/i);

    // queryBy... devuelve null si no encuentra el elemento, en lugar de lanzar un error
    const editButton = screen.queryByRole('button', { name: /editar/i });
    const deleteButton = screen.queryByRole('button', { name: /eliminar/i });

    // Afirmamos que los botones NO existen en el documento
    expect(editButton).not.toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();
  });

  it('debería mostrar el botón Editar al autor del artículo', async () => {
    // Simulamos que el autor (ID 1) ha iniciado sesión
    useAuthStore.setState({
      user: { id: 1, role: 'user' },
      token: 'fake-token'
    });
    
    renderComponent('/article/1');

    // Buscamos el botón de editar, que ahora sí debería aparecer
    const editButton = await screen.findByRole('button', { name: /editar/i });
    expect(editButton).toBeInTheDocument();

    // El botón de eliminar sigue sin aparecer
    expect(screen.queryByRole('button', { name: /eliminar/i })).not.toBeInTheDocument();
  });

  it('debería mostrar los botones Editar y Eliminar a un admin', async () => {
    // Simulamos que un admin (ID 99) ha iniciado sesión
    useAuthStore.setState({
      user: { id: 99, role: 'admin' },
      token: 'fake-admin-token'
    });
    
    renderComponent('/article/1');

    // Buscamos ambos botones, que deberían estar visibles para el admin
    expect(await screen.findByRole('button', { name: /editar/i })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /eliminar/i })).toBeInTheDocument();
  });

});