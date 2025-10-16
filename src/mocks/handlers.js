// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';

//  simulating a small database of articles
const articles = [
  {
    id: 1,
    title: 'Descubren Nueva Especie Bioluminiscente',
    description: 'Un equipo internacional registra por primera vez un cefalópodo bioluminiscente en la zona abisal del Pacífico.',
    image: 'https://i.imgur.com/example1.jpg', // Usamos una URL de imagen real para el mock
    category: 'Fauna Abisal',
    created_at: new Date().toISOString(),
    username: 'explorador_marino',
    likes: 42,
  },
  {
    id: 2,
    title: 'Los Ecosistemas de las Fosas Marianas',
    description: 'Un estudio revela la increíble diversidad de vida en las condiciones más extremas del planeta.',
    image: 'https://i.imgur.com/example2.jpg',
    category: 'Ecosistemas',
    created_at: new Date().toISOString(),
    username: 'oceanografa_pro',
    likes: 15,
  },
];

export const handlers = [
  // Handler para el Login 
  http.post('http://localhost:8000/auth/login', async ({ request }) => {
    const { email } = await request.json();
    if (email === 'admin@test.com') {
      // Mock para un admin
      return HttpResponse.json({
        message: 'Login de admin exitoso (mock)',
        // Payload: { userId: 1, email: 'admin@test.com', role: 'admin' }
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AdGVzdC5jb20iLCJyb2xlIjoiYWRtaW4ifQ.fake_signature_admin',
      });
    }
    
    // Mock para un usuario normal
    return HttpResponse.json({
      message: 'Login exitoso (mock)',
      // Payload: { userId: 2, email: 'user@test.com', role: 'user' }
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoidXNlckB0ZXN0LmNvbSIsInJvbGUiOiJ1c2VyIn0.fake_signature_user',
    });
  }),

  // --- NUEVO HANDLER ---
  // Intercepta las peticiones GET a "http://localhost:8000/article"
  http.get('http://localhost:8000/article', () => {
    // Responde con el array de artículos simulados
    return HttpResponse.json(articles);
  }),
];