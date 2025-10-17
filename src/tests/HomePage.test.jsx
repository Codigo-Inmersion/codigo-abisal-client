import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../pages/user/homePage/HomePage.jsx';

// Mockeamos la librería del carrusel
vi.mock('react-multi-carousel', () => {
  // Creamos un componente falso que imita a la librería
  const MockCarousel = ({ children }) => {
    // La librería real recibe los items como 'children', así que nuestro mock
    // simplemente renderizará lo que le pasen por dentro.
    return <div data-testid="mock-carousel">{children}</div>;
  };
  return { default: MockCarousel };
});

// Mockeamos también los estilos para evitar errores en el test
vi.mock('react-multi-carousel/lib/styles.css', () => ({
  default: '',
}));


// --- FIN DE LA SECCIÓN DE MOCKS ---


const renderWithRouter = (component) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe('Componente HomePage', () => {
  it('debería mostrar el título de los artículos obtenidos de la API simulada', async () => {
    renderWithRouter(<HomePage />);

    // findByText esperará a que los datos se carguen y el componente se re-renderice
    const articleTitle = await screen.findByText(
      /\[MOCK\] Nueva Especie Bioluminiscente/i
    );

    // Ahora el test funciona porque:
    // 1. MSW entrega los datos.
    // 2. HomePage se los pasa a Carousel.
    // 3. Nuestro Carousel FALSO renderiza los items que recibe.
    expect(articleTitle).toBeInTheDocument();
    expect(screen.getByTestId('mock-carousel')).toBeInTheDocument();
  });
});