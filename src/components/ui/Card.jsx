import React from "react";

const Card = ({ children, className, onClick }) => {
  return (
    <div
      className={`rounded-xl overflow-hidden shadow-lg w-full box-border ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;