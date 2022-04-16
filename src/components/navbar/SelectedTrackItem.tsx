import { FormatedTrack } from 'core/hooks/useTrackSearch';
import React from 'react';
import { BsX } from 'react-icons/bs';
import { msToFormatedDuration } from 'utils/converter';

type Props = {
  track: FormatedTrack;
  handleDelete: (arg0?: any) => void;
};

const SelectedTrackItem = ({ track, handleDelete }: Props) => {
  return (
    <div className="mb-4 flex-bc w-full">
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
        <button onClick={handleDelete}>
          <BsX className="text-white w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default SelectedTrackItem;
