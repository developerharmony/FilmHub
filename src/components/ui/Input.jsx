import React from "react";

const Input = ({ value, onChange, placeholder, className }) => {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 pl-10 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm ${className}`}
      />
      <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
    </div>
  );
};

export default Input;