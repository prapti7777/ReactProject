import React from "react";

const CardComp = ({ title, description, image, children }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {image && <img src={image} alt={title} className="w-full h-48 object-cover" />}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
        {children && <div className="mt-4">{children}</div>}
      </div>
    </div>
  );
};

export default CardComp;
