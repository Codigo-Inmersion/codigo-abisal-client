// src/setupTests.js
import { expect, afterEach, beforeAll, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { server } from './mocks/server.js'; // Importamos el servidor

// Inicia el servidor antes de que comiencen todos los tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Cierra el servidor una vez que terminen todos los tests
afterAll(() => server.close());

// Limpia los handlers después de cada test para que no interfieran entre sí
afterEach(() => {
  server.resetHandlers();
  cleanup();
});

// Extiende `expect` con los matchers de jest-dom
expect.extend(matchers);