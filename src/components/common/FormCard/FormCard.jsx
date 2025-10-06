import React, { useState } from 'react';
import './FormCard.css';

const FormCard = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    remember: false
  });

  const handleChange = (e) => {
    const { name, value, type , checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type => 'checkbox'? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
    // Aquí iría tu lógica de envío
    alert('Bienvenido!');
  };

  return (
    <div className="form-container">
      <div className="liquid-card">
        <div className="liquid-card-content">
          <h2 className="card-title"> Inicia sesión</h2>

          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="email">Email Adress</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="introduce tu contraseña"
                required
              />
              
            </div>

            <div className = "form-options">
                <label className ="checkbox-wrapper">
                    <input
                    type ="checkbox"
                    name = "remember"
                    checked={formData.remember}
                    onChange={handleChange}
                    />
                   <span clasNme="checkbox-label">Recuerdame</span> 
                </label>
                <a href ="#" clasName="forgot-link">Forgot Password?</a>
               <hr></hr> 

            </div>

            <button 
            type="button" 
            onClick = {handleSubmit}
            className="submit-button">
              Sign In 
            </button>
            <div className='signup-link'>
               No account yet? <a href ="#">Sign Up</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormCard;