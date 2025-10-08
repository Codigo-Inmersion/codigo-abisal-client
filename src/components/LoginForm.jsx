import { GlassCard } from '@developer-hub/liquid-glass'
import { useState } from 'react'
import './LoginForm.css'

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert(`Email: ${formData.email}\nPassword: ${formData.password}\nRemember: ${formData.remember}`)
  }

  return (
    <div className="content-wrapper">
        {/* Formulario de Login */}
        <div className="login-card-wrapper">
          <GlassCard
            shadowMode={false}
            cornerRadius={20}
            className="login-card"
          >
            <div className="form-container">
            <h2 className="form-title">Inicia sesión</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="introduce tu contraseña"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-footer">
                <label className="remember-label">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                    className="remember-checkbox"
                  />
                  <span>Recordar contraseña</span>
                </label>
                <a href="#" className="forgot-link">
                  ¿Has olvidado tu contraseña?
                </a>
              </div>

              <hr className="form-divider" />

              <button type="submit" className="submit-button">
                Acceder
              </button>

              <div className="signup-section">
                ¿No tienes cuenta?{' '}
                <a href="#" className="signup-link">
                  Regístrate
                </a>
              </div>
            </form>
          </div>
        </GlassCard>
        </div>
      
    </div>
  )
}

export default LoginForm

