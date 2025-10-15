import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
// 👇 CORRECCIÓN 1: Ruta correcta al componente
import HomePage from '../pages/user/homePage/HomePage';

// --- Mockear los hooks que usa el componente ---

// 👇 CORRECCIÓN 2: Ruta correcta a los hooks
vi.mock('../hooks/useArticles', () => ({
  useArticles: () => ({
    articles: [
      { id: 1, title: 'El Calamar Gigante', description: 'Una bestia de las profundidades.', category: 'Fauna Abisal' },
      { id: 2, title: 'Fosas Marianas', description: 'El lugar más profundo.', category: 'Exploración' },
      { id: 3, title: 'Bacterias abisales', description: 'Vida microscópica extrema.', category: 'Ecosistemas' },
      { id: 4, title: 'Conservación del Océano', description: 'Protegiendo nuestro planeta.', category: 'Conservación' },
    ],
    isLoading: false,
    error: null,
  }),
}));

// 👇 CORRECCIÓN 3: Ruta correcta a los hooks
vi.mock('../hooks/useAuth', () => ({
  useAuth: () => ({
    user: { role: 'user' },
  }),
}));

// --- Suite de Pruebas para HomePage ---

describe('HomePage', () => {
  
  beforeEach(() => {
    // Limpiar mocks antes de cada prueba para evitar interferencias
    vi.clearAllMocks();
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
  });

  it('debe renderizar el título y los artículos iniciales', () => {
    expect(screen.getByRole('heading', { name: /descubre los secretos del abismo/i })).toBeInTheDocument();
    expect(screen.getByText('El Calamar Gigante')).toBeInTheDocument();
    expect(screen.getByText('Fosas Marianas')).toBeInTheDocument();
  });

  it('debe mostrar y ocultar la interfaz de búsqueda al hacer clic en el botón', () => {
    expect(screen.queryByPlaceholderText(/buscar por título o descripción/i)).not.toBeInTheDocument();

    // NOTA: Los iconos de Lucide-React no tienen un "name" accesible por defecto.
    // Usaremos `screen.getAllByRole` para encontrar los botones.
    const buttons = screen.getAllByRole('button');
    // Asumimos que el botón de búsqueda/cierre es el primero de su tipo en el DOM.
    const searchToggleButton = buttons[0]; 
    fireEvent.click(searchToggleButton);

    expect(screen.getByPlaceholderText(/buscar por título o descripción/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /fauna abisal/i })).toBeInTheDocument();

    fireEvent.click(searchToggleButton);

    expect(screen.queryByPlaceholderText(/buscar por título o descripción/i)).not.toBeInTheDocument();
  });

  it('debe filtrar los artículos al escribir en la barra de búsqueda', () => {
    const searchToggleButton = screen.getAllByRole('button')[0];
    fireEvent.click(searchToggleButton);
    
    const searchInput = screen.getByPlaceholderText(/buscar por título o descripción/i);
    fireEvent.change(searchInput, { target: { value: 'Calamar' } });

    expect(screen.getByText('El Calamar Gigante')).toBeInTheDocument();
    expect(screen.queryByText('Fosas Marianas')).not.toBeInTheDocument();
  });

  it('debe filtrar los artículos al hacer clic en una categoría', () => {
    const searchToggleButton = screen.getAllByRole('button')[0];
    fireEvent.click(searchToggleButton);

    const categoryButton = screen.getByRole('button', { name: /exploración/i });
    fireEvent.click(categoryButton);

    expect(screen.getByText('Fosas Marianas')).toBeInTheDocument();
    expect(screen.queryByText('El Calamar Gigante')).not.toBeInTheDocument();
    
    fireEvent.click(categoryButton);
    expect(screen.getByText('Fosas Marianas')).toBeInTheDocument();
    expect(screen.getByText('El Calamar Gigante')).toBeInTheDocument();
  });
  
  it('debe combinar la búsqueda por texto y el filtro por categoría', () => {
    const searchToggleButton = screen.getAllByRole('button')[0];
    fireEvent.click(searchToggleButton);
    
    const categoryButton = screen.getByRole('button', { name: /fauna abisal/i });
    fireEvent.click(categoryButton);

    const searchInput = screen.getByPlaceholderText(/buscar por título o descripción/i);
    fireEvent.change(searchInput, { target: { value: 'Fosas' } });
    
    expect(screen.queryByText('El Calamar Gigante')).not.toBeInTheDocument();
    expect(screen.queryByText('Fosas Marianas')).not.toBeInTheDocument();
    expect(screen.getByText('No se encontraron resultados.')).toBeInTheDocument();
  });
});