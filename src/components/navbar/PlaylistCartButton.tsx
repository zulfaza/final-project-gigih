import { Disclosure } from '@headlessui/react';
import { toggleSelectedSong } from 'core/redux/spotify';
import { selectorProps } from 'core/redux/store';
import React from 'react';
import { BsPlusCircle, BsX } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { msToFormatedDuration } from 'utils/converter';

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const PlaylistCartButton = ({ setIsOpen }: Props) => {
  const navigate = useNavigate();
  const selectedTrack = useSelector(
    (state: selectorProps) => state.spotify.selectedSongs
  );
  const dispatch = useDispatch();
  return (
    <Disclosure as={'div'} className="">
      <Disclosure.Button
        type="button"
        className="bg-gray-800 p-1 relative rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      >
        {selectedTrack.length > 0 && (
          <span className="w-4 h-4 text-xs rounded-full -top-1 -right-1 absolute bg-red-500 text-white">
            {selectedTrack.length}
          </span>
        )}
        <BsPlusCircle className="h-6 w-6" aria-hidden="true" />
      </Disclosure.Button>
      <Disclosure.Panel
        as="div"
        className="absolute w-full max-w-sm bg-dark-800 bg-opacity-80 top-14 z-50 right-0 md:right-10 p-4 rounded-lg"
      >
        {({ close }) => (
          <>
            {selectedTrack.map((track) => (
              <div key={track.uri} className="mb-4 flex-bc w-full">
                <div className="flex-sc gap-3 flex-grow-0 flex-shrink w-4/5 ">
                  <img
                    className="w-10 h-10 flex-shrink-0 overflow-hidden rounded-md"
                    src={track.thumbnail}
                    alt={track.title}
                  />
                  <div className="flex-grow-0 truncate">
                    <h4 className="text-white text-sm mb-1">{track.title}</h4>
                    <h5 className="text-white text-opacity-70 text-xs">
                      {msToFormatedDuration(track.duration)}
                    </h5>
                  </div>
                </div>
                <div className="block">
                  <button onClick={() => dispatch(toggleSelectedSong(track))}>
                    <BsX className="text-white w-6 h-6" />
                  </button>
                </div>
              </div>
            ))}
            {selectedTrack.length > 0 ? (
              <button
                onClick={() => {
                  setIsOpen(true);
                  close();
                }}
                className="w-full border rounded text-white text-sm py-1"
              >
                Create Playlist
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate('/create-playlist');
                  close();
                }}
                className="w-full border rounded text-white text-sm py-1"
              >
                Add Tracks
              </button>
            )}
          </>
        )}
      </Disclosure.Panel>
    </Disclosure>
  );
};

export default PlaylistCartButton;
