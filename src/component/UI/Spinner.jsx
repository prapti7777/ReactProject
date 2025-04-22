// src/component/ui/Spinner.jsx
import React from "react";

const Spinner = () => (
  <div className="flex justify-center items-center py-10">
    <div className="w-8 h-8 border-4 border-t-indigo-600 border-gray-200 rounded-full animate-spin"></div>
  </div>
);

export default Spinner;
