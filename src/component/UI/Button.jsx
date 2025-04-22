import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  className = ""
}) => {
  const base = "px-4 py-2 rounded-full font-medium transition duration-300 focus:outline-none";
  const variants = {
    primary: "bg-green-500 text-white hover:bg-green-600 disabled:bg-green-400",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:bg-gray-100",
    danger: "bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
