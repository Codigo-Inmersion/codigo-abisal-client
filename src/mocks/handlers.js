// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';

const articles = [
  {
    id: 1,
    creator_id: 123,
    title: '[MOCK] Nueva Especie Bioluminiscente',
    description: 'Datos de prueba desde Mock Service Worker.',
    image: 'https://i.imgur.com/example1.jpg',
    category: 'Fauna Abisal',
    created_at: new Date().toISOString(),
    likes: 99,
  },
];

export const handlers = [
  // Handler para el Login
  http.post('http://localhost:8000/auth/login', () => {
    return HttpResponse.json({
      message: 'Login exitoso (mock)',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoidXNlckB0ZXN0LmNvbSIsInJvbGUiOiJ1c2VyIn0.fake_signature_user',
    });
  }),

  // Handler para obtener artículos
  http.get('http://localhost:8000/article', () => {
    return HttpResponse.json(articles);
  }),

  // --- HANDLERS PARA USUARIOS (AHORA CUBRE AMBAS RUTAS) ---

  // 1. Maneja la ruta /users/user/:id
  http.get('http://localhost:8000/users/user/:id', ({ params }) => {
    console.log(`[MSW] Devolviendo usuario mock para ID: ${params.id}`);
    return HttpResponse.json({ name: 'msw_tester' });
  }),

  // 2. Maneja la ruta /user/:id (la que estaba dando el error 404)
  http.get('http://localhost:8000/user/:id', ({ params }) => {
    console.log(`[MSW] Devolviendo usuario mock para ID: ${params.id}`);
    return HttpResponse.json({ user: { username: 'msw_tester' } });
  }),

    http.get('http://localhost:8000/article/:id', ({ params }) => {
    // Respondemos con un artículo de prueba que tiene un 'creator_id' específico.
    return HttpResponse.json({
      id: parseInt(params.id),
      title: 'El Gran Calamar de las Profundidades',
      description: 'Un espécimen único hallado en la Fosa de las Marianas.',
      content: '<p>Contenido detallado del artículo...</p>',
      category: 'Fauna Abisal',
      creator_id: 1, // IMPORTANTE: El autor es el usuario con ID 1
      created_at: new Date().toISOString(),
    });
  }),
];