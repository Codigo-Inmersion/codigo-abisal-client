import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Configura el worker con los handlers importados
export const worker = setupWorker(...handlers);