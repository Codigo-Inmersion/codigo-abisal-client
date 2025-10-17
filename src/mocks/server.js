// src/mocks/server.js
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Este configura un "servidor" de mocking para Node.js, reutilizando los mismos handlers
export const server = setupServer(...handlers);