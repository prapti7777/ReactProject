// src/component/ui/Input.jsx
import React from "react";

const Input = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder = "",
  error = "",
}) => (
  <div className="mb-4">
    {label && (
      <label htmlFor={id} className="block mb-1 font-medium">
        {label}
      </label>
    )}
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
        error ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-indigo-200"
      }`}
    />
    {error && <p className="text-red-600 mt-1 text-sm">{error}</p>}
  </div>
);

export default Input;
