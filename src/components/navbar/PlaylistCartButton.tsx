import React from 'react';
import { BsPlusCircle } from 'react-icons/bs';

const PlaylistCartButton = () => {
  return (
    <button
      type="button"
      className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
    >
      <BsPlusCircle className="h-6 w-6" aria-hidden="true" />
    </button>
  );
};

export default PlaylistCartButton;
