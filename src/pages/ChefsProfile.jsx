import React from "react";
import { useParams } from "react-router-dom";

const ChefProfile = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold">Chef Profile - {id}</h2>
      <img
        src={`https://via.placeholder.com/150`}
        alt="Chef"
        className="rounded-full w-32 h-32 mt-4 mb-4"
      />
      <p>Here you'll see chef's biography, specialties, and contact options.</p>
    </div>
  );
};

export default ChefProfile;
