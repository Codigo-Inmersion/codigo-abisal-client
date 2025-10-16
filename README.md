# 🌊 Código Abisal - Frontend

> Plataforma web interactiva para explorar y compartir información sobre el océano profundo y sus misterios.
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?logo=vite)
![Zustand](https://img.shields.io/badge/Zustand-5.0.8-orange)

---

## 📋 Tabla de Contenidos

- [Sobre el Proyecto](#-sobre-el-proyecto)
- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Scripts Disponibles](#-scripts-disponibles)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Rutas de la Aplicación](#-rutas-de-la-aplicación)
- [Sistema de Autenticación](#-sistema-de-autenticación)
- [Gestión de Estado](#-gestión-de-estado)
- [Componentes Principales](#-componentes-principales)
- [Despliegue](#-despliegue)
- [Equipo](#-equipo)

---

## 🌊 Sobre el Proyecto

**Código Abisal** es una aplicación web educativa y colaborativa que permite a los usuarios explorar, crear y compartir artículos sobre el fascinante mundo del océano profundo. 

La plataforma ofrece una experiencia visual inmersiva con un fondo animado de fluidos que simula las corrientes marinas, proporcionando una interfaz única y atractiva para descubrir contenido sobre fauna abisal, ecosistemas, exploración y conservación marina.

**Contexto:** Este proyecto fue desarrollado como parte del Bootcamp Fullstack de Femcoders (Factoría F5), con fines educativos y de divulgación científica.

---

## ✨ Características

### Para Todos los Usuarios
- 🔍 **Búsqueda y Filtrado:** Encuentra artículos por categoría o término de búsqueda
- 📱 **Diseño Responsivo:** Experiencia óptima en dispositivos móviles, tablets y escritorio
- 🎨 **Interfaz Visual Única:** Fondo animado con efectos de fluido líquido
- 📖 **Lectura de Artículos:** Acceso completo a todos los artículos publicados


### Para Usuarios Registrados
- ✍️ **Crear Artículos:** Publica tu propio contenido con editor enriquecido
- 📝 **Editar Artículos:** Modifica tus propias publicaciones
- 🖼️ **Subida de Imágenes:** Carga imágenes desde tu dispositivo o usa URLs
- 😀 **Editor de Texto Rico:** Formato avanzado con soporte para emojis
- ❤️ **Sistema de Likes:** Interactúa con el contenido 

### Para Administradores
- 👥 **Gestión de Usuarios:** Administra roles y permisos
- 📊 **Panel de Control:** Vista general de artículos y usuarios
- ✏️ **Edición Global:** Modifica cualquier artículo de la plataforma
- 🗑️ **Eliminación de Contenido:** Control total sobre artículos y usuarios

---

## 🛠 Tecnologías

### Core
- **React 19.1.1** - Biblioteca de interfaz de usuario
- **Vite 7.1.7** - Build tool y servidor de desarrollo
- **React Router DOM 7.9.2** - Navegación y enrutamiento

### Estado y Datos
- **Zustand 5.0.8** - Gestión de estado global
- **Axios 1.12.2** - Cliente HTTP para peticiones API

### UI/UX
- **TipTap 3.6.5** - Editor de texto enriquecido
- **Emoji Picker React 4.14.0** - Selector de emojis
- **Lucide React 0.545.0** - Iconos modernos
- **React Multi Carousel 2.8.6** - Carrusel de artículos
- **Three.js 0.180.0** - Animaciones 3D y efectos visuales

### Utilidades
- **DOMPurify 3.2.7** - Sanitización de HTML
- **Headless UI 2.2.9** - Componentes UI accesibles

### Desarrollo
- **ESLint 9.36.0** - Linter para calidad de código
- **SWC** - Compilador super rápido de JavaScript/TypeScript

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18.0 o superior)
- **npm** o **yarn** (gestor de paquetes)
- **Backend de Código Abisal** [=> ver repositorio backend](https://github.com/Codigo-Inmersion/codigo-abisal-server)

---

## 🚀 Instalación

### 1. Clonar el Repositorio
```bash
git clone https://github.com/Codigo-Inmersion/codigo-abisal-client.git
cd codigo-abisal-client
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:
```bash
cp .env.example .env
```

Edita el archivo `.env` y configura la URL del backend:
```env
VITE_API_URL=http://localhost:8000
```

> ⚠️ **Importante:** Asegúrate de que el backend esté corriendo en el puerto especificado.

---

## ⚙️ Configuración

### Configuración de Cloudinary (Subida de Imágenes)

Si deseas usar la función de subida de imágenes, configura Cloudinary:

1. Crea una cuenta en [Cloudinary](https://cloudinary.com/)
2. Crea un preset de subida sin autenticación
3. Actualiza la configuración en `src/components/common/ArticleForm/ArticleForm.jsx`:
```javascript
data.append('upload_preset', 'tu_preset_aqui');
// ...
'https://api.cloudinary.com/v1_1/tu_cloud_name/image/upload'
```

---

## 📜 Scripts Disponibles
```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview

# Ejecutar linter
npm run lint
```

La aplicación estará disponible en: `http://localhost:5174`

---

## 📁 Estructura del Proyecto
```
src/
├── api/              # Configuración de cliente HTTP
│   └── client.js     # Cliente Axios con interceptores
├── assets/           # Recursos estáticos
│   ├── icons/
│   └── images/
├── components/       # Componentes React
│   ├── admin/        # Componentes de administración
│   │   ├── ArticlesTable/
│   │   └── UsersTable/
│   ├── common/       # Componentes reutilizables
│   │   ├── ArticleForm/
│   │   ├── ArticleList/
│   │   ├── Button/
│   │   ├── Carousel/
│   │   ├── DetailArticle/
│   │   ├── Footer/
│   │   ├── Forms/
│   │   ├── Modal/
│   │   ├── NavBar/
│   │   ├── ProtectedRoute/
│   │   └── RichTextEditor/
│   └── layout/       # Layouts de la aplicación
│       ├── Background/
│       ├── Layout_Admin/
│       ├── Layout_Intro/
│       ├── Layout_User/
│       └── LiquidEther/
├── hooks/            # Custom Hooks
│   ├── useArticles.js
│   └── useAuth.js
├── pages/            # Páginas de la aplicación
│   ├── admin/
│   │   ├── dashboardPage/
│   │   ├── CreateArticlePage.jsx
│   │   └── EditArticlePage.jsx
│   └── user/
│       ├── categoryPage/
│       ├── forbiddenPage/
│       ├── homePage/
│       ├── DetailPage.jsx
│       ├── LoginPage.jsx
│       └── RegisterPage.jsx
├── router/           # Configuración de rutas
│   └── AbisalRoutes.jsx
├── services/         # Servicios de API
│   ├── AbisalServices.jsx
│   ├── AuthServices.jsx
│   └── UserServices.jsx
├── stores/           # Gestión de estado global
│   └── authStore.js
├── styles/           # Estilos globales
│   └── index.css
└── main.jsx          # Punto de entrada
```

---

## 🗺️ Rutas de la Aplicación

### Rutas Públicas (sin autenticación)

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | HomePage | Página principal con carrusel de artículos |
| `/article/:id` | DetailPage | Vista detallada de un artículo |
| `/category/:categoryName` | CategoryPage | Artículos filtrados por categoría |
| `/login` | LoginPage | Inicio de sesión |
| `/register` | RegisterPage | Registro de nuevos usuarios |

### Rutas Protegidas (requieren autenticación)

| Ruta | Componente | Rol Requerido | Descripción |
|------|-----------|---------------|-------------|
| `/article/create` | CreateArticlePage | Usuario/Admin | Crear nuevo artículo |
| `/article/edit/:id` | EditArticlePage | Autor/Admin | Editar artículo existente |

### Rutas de Administración (solo admin)

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/admin/dashboard` | DashboardPage | Panel de control con gestión de artículos y usuarios |

### Rutas de Error

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/403` | ForbiddenPage | Acceso denegado |

---

## 🔐 Sistema de Autenticación

### Flujo de Autenticación

1. **Login/Register** → El usuario envía credenciales al backend
2. **Token JWT** → El backend devuelve un token JWT
3. **Decodificación** → El frontend decodifica el token para extraer datos del usuario
4. **Almacenamiento** → Token y datos se guardan en localStorage y Zustand
5. **Interceptor** → Todas las peticiones incluyen automáticamente el token

### Roles de Usuario
```javascript
// Usuario Regular
{
  role: "user"
  // Puede: ver, crear y editar sus propios artículos
}

// Administrador
{
  role: "admin"
  // Puede: todo lo anterior + gestionar usuarios + editar/eliminar cualquier contenido
}
```

## 🗄️ Gestión de Estado

### Zustand Store (authStore.js)
```javascript
// Estado global de autenticación
{
  token: string | null,      // Token JWT
  user: {                     // Datos del usuario
    id: number,
    email: string,
    role: 'user' | 'admin',
    exp: number,
    iat: number
  } | null,
  isLoading: boolean
}

// Acciones disponibles
- login(token)              // Guardar sesión
- logout()                  // Cerrar sesión
- isAuthenticated()         // Verificar si hay sesión activa
- hasRole(role)             // Verificar rol del usuario
```

### Uso en Componentes -  ejemplo
```javascript
import useAuthStore from '../stores/authStore';

function MyComponent() {
  const { user, token, logout } = useAuthStore();
  
  return (
    
      {user && Bienvenido, {user.email}}
      Cerrar sesión
    
  );
}
```

---

## 🧩 Componentes Principales

### ArticleForm
Editor completo de artículos con:
- Campo de título y descripción
- Editor de texto enriquecido (TipTap)
- Selector de categoría
- Subida de imágenes (archivo o URL)
- Validaciones en tiempo real

### Carousel
Carrusel responsivo de artículos con:
- Navegación táctil y por flechas
- Diseño adaptable
- Vista previa de imagen, título y descripción

### Modal
Componente modal reutilizable con:
- Animaciones de entrada/salida
- Fondo con blur
- Cierre por clic fuera o botón X

### ProtectedRoute
Guardia de seguridad para rutas que:
- Verifica autenticación (token)
- Valida roles de usuario
- Redirige según permisos

---

## 🎨 Características Visuales

### Fondo Animado (LiquidEther)
Simulación de fluidos líquidos usando Three.js:
- Modo automático cuando no hay interacción
- Optimizado para rendimiento

### Glassmorphism
Efecto de cristal esmerilado en tarjetas:
```css
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.1);
```

---

## 📡 Conexión con el Backend

### Cliente HTTP (api/client.js)
```javascript
// Configuración base
baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000"

// Interceptores
Request:  Agrega token JWT automáticamente
Response: Maneja errores 401 (no autorizado)
```

### Servicios Disponibles

#### AbisalServices
- `getAbisalArticles()` - Obtener todos los artículos
- `getArticleById(id)` - Obtener artículo por ID
- `createArticle(data)` - Crear nuevo artículo
- `updateArticle(id, data)` - Actualizar artículo
- `deleteArticle(id)` - Eliminar artículo
- `likeArticle(id)` - Dar like a artículo
- `unlikeArticle(id)` - Quitar like de artículo

#### AuthServices
- `login(email, password)` - Iniciar sesión
- `register(userData)` - Registrar usuario

#### UserServices (Admin)
- `getAllUsers()` - Obtener todos los usuarios
- `updateUserRole(id, role)` - Cambiar rol de usuario
- `deleteUser(id)` - Eliminar usuario

---

## 🚢 Despliegue

### Build de Producción
```bash
# Generar build optimizado
npm run build

# Los archivos se generarán en la carpeta 'dist/'
```

### Variables de Entorno en Producción

Asegúrate de configurar:
```env
VITE_API_URL=https://codigo-abisal-server-api-dev.onrender.com/
```

O para local:
```env
VITE_API_URL=http://localhost:8000
```

---

## 👥 Equipo

Este proyecto fue desarrollado por:

| Desarrolladora | GitHub | LinkedIn |
|----------------|--------|----------|
| **Camila Arenas** | [GitHub](https://github.com/mcarenashd) | [LinkedIn](https://www.linkedin.com/in/mcarenash) |
| **Gema Yébenes** | [GitHub](https://github.com/gemayc) | [LinkedIn](https://www.linkedin.com/in/gema-yebenes-83b6a6100/) |
| **Mariana Moreno** | [GitHub](https://github.com/MarianaMH1195) | [LinkedIn](https://www.linkedin.com/in/mariana-moreno-henao-70305a16b/) |
| **Olga Ramírez** | [GitHub](https://github.com/olgararo) | [LinkedIn](https://www.linkedin.com/in/olga-ramirez-rodriguez/) |
| **Rocio Coronel** | [GitHub](https://github.com/Rocio-Coronel) | [LinkedIn](https://www.linkedi) |


**Bootcamp:** Fullstack Web Development  
**Organización:** Femcoders - Factoría F5  
**Año:** 2025

---

## 📝 Notas Importantes

### ⚠️ Para el Equipo de Backend

- El frontend espera respuestas en formato: `{ ok: boolean, data: any, error?: string }`
- Todos los endpoints protegidos deben validar el token JWT en el header `Authorization: Bearer <token>`
- El token debe incluir: `{ userId, email, role, iat, exp }`

### 🔒 Seguridad

- Nunca commitear el archivo `.env`
- Las contraseñas deben tener mínimo 6 caracteres
- El token se almacena en localStorage 

### 🐛 Inconvenientes Conocidos

- El editor de texto no soporta pegar imágenes directamente
- En iOS, el tipo de float para texturas puede causar problemas de rendimiento

---

## 📄 Licencia

Este proyecto es con fines educativos y no tiene licencia comercial.

---

**¿Preguntas o sugerencias?**  
Este proyecto está en desarrollo activo. Si encuentras algún bug o tienes ideas para mejorar, no dudes en abrir un issue o contactar al equipo.

---

*Desarrollado con 💙 por el equipo de Código Abisal*

[![GitHub](https://img.shields.io/badge/GitHub-Codigo--Inmersion-181717?style=flat-square&logo=github)](https://github.com/Codigo-Inmersion)