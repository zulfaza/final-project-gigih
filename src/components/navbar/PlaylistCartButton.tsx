import { selectorProps } from 'core/redux/store';
import React from 'react';
import { BsPlusCircle } from 'react-icons/bs';
import { useSelector } from 'react-redux';

const PlaylistCartButton = () => {
  const selectedTrack = useSelector(
    (state: selectorProps) => state.spotify.selectedSongs
  );
  return (
    <button
      type="button"
      className="bg-gray-800 p-1 relative rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
    >
      {selectedTrack.length > 0 && (
        <span className="w-4 h-4 text-xs rounded-full -top-1 -right-1 absolute bg-red-500 text-white">
          {selectedTrack.length}
        </span>
      )}
      <BsPlusCircle className="h-6 w-6" aria-hidden="true" />
    </button>
  );
};

export default PlaylistCartButton;
