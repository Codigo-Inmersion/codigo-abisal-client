/*import React from "react";
import LoginForm from "../../components/common/LoginForm/LoginForm";


function LoginPage() {
  return <LoginForm />;
}

export default LoginPage;*/


//TODO descomentar lo anterior y borrar apartir de la 13
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/authStore';

/**
 * 🎓 EXPLICACIÓN: Página de Login (VERSIÓN DE PRUEBA)
 * 
 * Esta es una versión simplificada para probar el sistema de protección.
 * Simula el login sin conectar con el backend aún.
 * 
 * ⚠️ TEMPORAL: Más adelante reemplazarás esto con:
 * - Tu componente LoginForm existente
 * - Conexión real con el backend
 * - Tu servicio AuthServices
 */

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    console.log('🔑 Intentando login con:', email);

    // ⚠️ SIMULACIÓN TEMPORAL (reemplazar con AuthServices.login())
    // Simula diferentes usuarios para probar la protección de rutas
    
    if (email === 'admin@test.com' && password === 'admin123') {
      // 👑 Usuario ADMIN
      const fakeToken = 'fake-jwt-token-admin-' + Date.now();
      const userData = {
        id: 1,
        email: 'admin@test.com',
        name: 'Admin User',
        role: 'admin' // ← IMPORTANTE: rol "admin"
      };
      
      login(fakeToken, userData);
      console.log('✅ Login exitoso como ADMIN');
      navigate('/admin/dashboard');
      
    } else if (email === 'user@test.com' && password === 'user123') {
      // 👤 Usuario NORMAL
      const fakeToken = 'fake-jwt-token-user-' + Date.now();
      const userData = {
        id: 2,
        email: 'user@test.com',
        name: 'Regular User',
        role: 'user' // ← IMPORTANTE: rol "user"
      };
      
      login(fakeToken, userData);
      console.log('✅ Login exitoso como USER');
      navigate('/');
      
    } else {
      setError('Credenciales incorrectas');
      console.log('❌ Login fallido');
    }
  };

  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '450px', 
      margin: '0 auto',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        🔐 Login de Prueba
      </h1>
      
      {/* Instrucciones de prueba */}
      <div style={{ 
        backgroundColor: '#333', 
        padding: '1.5rem', 
        borderRadius: '12px', 
        marginBottom: '2rem',
        border: '2px solid #646cff'
      }}>
        <p style={{ 
          margin: '0 0 1rem 0', 
          fontWeight: 'bold',
          color: '#646cff'
        }}>
          👥 Usuarios de prueba:
        </p>
        <div style={{ fontSize: '0.95rem', lineHeight: '1.8' }}>
          <p style={{ margin: '0.5rem 0' }}>
            <strong>👑 Admin:</strong><br/>
            Email: admin@test.com<br/>
            Password: admin123
          </p>
          <p style={{ margin: '0.5rem 0' }}>
            <strong>👤 User:</strong><br/>
            Email: user@test.com<br/>
            Password: user123
          </p>
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        {error && (
          <div style={{
            backgroundColor: '#ff4444',
            color: 'white',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem',
            fontWeight: '500'
          }}>
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@test.com"
            style={{
              width: '100%',
              padding: '0.8rem',
              fontSize: '1rem',
              borderRadius: '8px',
              border: '1px solid #444',
              backgroundColor: '#2a2a2a',
              color: 'white'
            }}
            required
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem',
            fontWeight: '500'
          }}>
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="admin123"
            style={{
              width: '100%',
              padding: '0.8rem',
              fontSize: '1rem',
              borderRadius: '8px',
              border: '1px solid #444',
              backgroundColor: '#2a2a2a',
              color: 'white'
            }}
            required
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '1rem',
            fontSize: '1.1rem',
            fontWeight: '600',
            backgroundColor: '#646cff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#535bf2'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#646cff'}
        >
          Iniciar Sesión
        </button>
      </form>

      <p style={{ 
        textAlign: 'center', 
        marginTop: '1.5rem',
        color: '#888',
        fontSize: '0.9rem'
      }}>
        ⚠️ Esta es una versión de prueba sin backend
      </p>
    </div>
  );
}

export default LoginPage;