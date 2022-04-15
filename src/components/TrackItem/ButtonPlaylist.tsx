import { FormatedTrack } from 'core/hooks/useTrackSearch';
import { toggleSelectedSong } from 'core/redux/spotify';
import { selectorProps } from 'core/redux/store';
import React from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
  track: FormatedTrack;
};

const ButtonPlaylist = ({ track }: Props) => {
  const found = useSelector((state: selectorProps) =>
    state.spotify.selectedSongs.find((data) => data.uri === track.uri)
  );
  const dispatch = useDispatch();

  const handleBtnClick = () => {
    dispatch(toggleSelectedSong(track));
  };

  return (
    <button onClick={handleBtnClick} className="text-white">
      {found ? (
        <AiOutlineMinusCircle className="w-10 h-10 ml-[2px]" />
      ) : (
        <AiOutlinePlusCircle className="w-10 h-10 ml-[2px]" />
      )}
    </button>
  );
};

export default ButtonPlaylist;
