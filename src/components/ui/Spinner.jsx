import React from "react";

const Spinner = ({ className }) => {
  return (
    <div
      className={`animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500 ${className}`}
    ></div>
  );
};

export default Spinner;