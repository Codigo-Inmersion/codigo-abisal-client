// src/components/common/Button/Button.jsx

import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ children, onClick, type = 'button', variant = 'primary' }) => {
  // `variant` nos permite tener diferentes estilos de botón en el futuro (ej: 'primary', 'secondary')
  const buttonClass = `btn ${variant}`;

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.string,
};

export default Button;