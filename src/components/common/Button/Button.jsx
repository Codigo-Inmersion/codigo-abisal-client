
import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
  title,
  "aria-label": ariaLabel,
}) => {
  // `variant` nos permite tener diferentes estilos de botón en el futuro (ej: 'primary', 'secondary')
  const buttonClass = `btn ${variant} ${className}`.trim();

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  title: PropTypes.string,
  "aria-label": PropTypes.string,
};

export default Button;
