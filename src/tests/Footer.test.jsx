// src/components/common/Footer/Footer.test.jsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from '../components/common/Footer/Footer.jsx'

// 'describe' agrupa tests relacionados
describe('Componente Footer', () => {

  // 'it' o 'test' define un caso de prueba individual
  it('debería renderizar el texto de copyright correctamente', () => {
    // 1. Arrange (Preparar): Renderizamos el componente.
    render(<Footer />);

    // 2. Act (Actuar): Buscamos el texto en el componente renderizado.
    // Usamos una expresión regular para ignorar el año, que es dinámico.
    const copyrightText = screen.getByText(/Código Abisal \| Proyecto realizado por/i);

    // 3. Assert (Afirmar): Verificamos que el texto está presente en el documento.
    expect(copyrightText).toBeInTheDocument();
  });

});