// src/component/ui/Alert.jsx
import React from "react";

const Alert = ({ type = "error", children }) => {
  const base = "p-4 rounded-md mb-4";
  const styles = {
    error: "bg-red-100 text-red-800",
    success: "bg-green-100 text-green-800",
    info: "bg-blue-100 text-blue-800",
  };

  return <div className={`${base} ${styles[type]}`}>{children}</div>;
};

export default Alert;
