import Lottie from 'components/lottie';
import { sound } from 'components/lottie/animations';
import { FormatedTrack } from 'core/hooks/useTrackSearch';
import React, { useEffect, useRef, useState } from 'react';
import { BsPlayCircle, BsStopCircle } from 'react-icons/bs';
import { ImSpinner8 } from 'react-icons/im';
import { msToFormatedDuration } from 'utils/converter';
import ButtonPlaylist from './ButtonPlaylist';
import VolumeControl from './VolumeControl';

type Props = {
  track: FormatedTrack;
};

const TrackItem = ({ track }: Props) => {
  const AudioRef = useRef<HTMLAudioElement | null>(null);
  const [IsPlay, setIsPlay] = useState(false);
  const [Volume, setVolume] = useState(0.3);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const onEnded = () => {
      setIsPlay(false);
    };

    const onLoaded = () => {
      setLoading(false);
    };

    const onWaiting = () => {
      setLoading(true);
    };

    const onPlay = () => {
      setIsPlay(true);
    };
    const onPause = () => {
      setIsPlay(false);
    };

    const tempRef = AudioRef.current;
    if (tempRef) {
      tempRef.volume = Volume;

      tempRef.addEventListener('ended', onEnded);
      tempRef.addEventListener('play', onPlay);
      tempRef.addEventListener('pause', onPause);
      tempRef.addEventListener('loadeddata', onLoaded);
      tempRef.addEventListener('waiting', onWaiting);
    }
    return () => {
      if (tempRef) {
        tempRef.removeEventListener('ended', onEnded);
        tempRef.removeEventListener('play', onPlay);
        tempRef.removeEventListener('pause', onPause);
        tempRef.removeEventListener('loadeddata', onLoaded);
        tempRef.removeEventListener('waiting', onWaiting);
      }
    };
  }, [Volume, AudioRef]);

  const togglePlay = () => {
    if (AudioRef.current) {
      if (IsPlay) AudioRef.current.pause();
      else AudioRef.current.play();
    }
  };

  return (
    <div
      data-testid="track-item"
      className="flex h-full flex-col p-5 group rounded-xl hover:bg-dark-600 hover:bg-opacity-70 transition-colors bg-dark-700 "
    >
      <audio src={track.preview} ref={AudioRef}></audio>
      <div className="relative z-0 w-full  aspect-w-1 aspect-h-1 bg-dark-600 rounded-2xl overflow-hidden">
        <div className=" bg-gray-600 w-full h-full animate-pulse inset-0 absolute"></div>
        <img
          className="overflow-hidden h-full w-full"
          src={track.thumbnail}
          alt={track.title}
        />
        <div className="w-full h-full flex-cc flex-col  transition-transform transform group-hover:translate-y-0 translate-y-full absolute top-0 left-0 bg-black bg-opacity-70">
          <div className="flex-cc gap-3 w-full items-center">
            <button onClick={togglePlay} className="text-white">
              {IsPlay ? (
                <BsStopCircle className="w-10 h-10" />
              ) : (
                <BsPlayCircle className="w-10 h-10" />
              )}
            </button>
            <ButtonPlaylist track={track} />
          </div>
        </div>
      </div>
      <div className="-mt-10 ml-1">
        <VolumeControl setVolume={setVolume} Volume={Volume} />
      </div>
      <div className="flex-sc">
        <h3 className="text-white font-bold truncate mt-3 mb-2">
          <span>{track.title}</span>
        </h3>
        <div className="w-10 h-10 flex-grow">
          {IsPlay &&
            (Loading ? (
              <div className="flex-cc w-10 h-10">
                <ImSpinner8 className="animate-spin ml-2 w-4 h-4 text-white" />
              </div>
            ) : (
              <Lottie className="w-10 h-10 " animation={sound} />
            ))}
        </div>
      </div>
      <div className="flex flex-wrap">
        {track.artists
          .filter((_, index) => index < 3)
          .map((artist, index, array) => (
            <span key={artist.id}>
              <a
                className="text-dark-300 text-opacity-50 hover:text-opacity-80 transition-colors"
                href={artist.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {artist.name}
              </a>
              {index !== array.length - 1 && (
                <span className="text-dark-300 text-opacity-50 mr-1">,</span>
              )}
            </span>
          ))}
      </div>
      <h5 className="text-white text-opacity-25 text-sm">
        {msToFormatedDuration(track.duration)}
      </h5>
    </div>
  );
};

export default TrackItem;
