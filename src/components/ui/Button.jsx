import React from "react";

const Button = ({ children, onClick, className, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 cursor-pointer !rounded-button ${className} ${
        disabled ? "bg-gray-300 text-gray-500 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;