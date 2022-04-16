import Lottie from 'components/lottie';
import { spinningVinyl } from 'components/lottie/animations';
import { PlaylistType } from 'pages/ListPlaylist';
import React from 'react';
import MenuPlaylist from './MenuPlaylist';
import { Image } from './Modal/Modal';

type Props = {
  playlist: PlaylistType;
  links: {
    name: string;
    onClick: (uri: string) => void;
  }[];
};

const PlaylistItem = ({ playlist, links }: Props) => {
  return (
    <div className="flex w-full border-b group border-white border-opacity-20 last:border-0 py-5">
      <div className="flex w-full gap-5">
        <ImagePlaylist image={playlist.images[0]} />
        <div className="flex-grow-0 flex overflow-hidden flex-col">
          <div className="flex-ss gap-3">
            <a
              href={playlist.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <h4 className="text-xl mb-1 truncate font-semibold capitalize text-white group-hover:text-opacity-100 text-opacity-75">
                {playlist.name}
              </h4>
            </a>
            <div
              className={`${
                playlist.public
                  ? ' bg-green-500 text-green-500'
                  : ' bg-indigo-500 text-indigo-500'
              } bg-opacity-10 rounded-lg py-1 px-2 text-xs`}
            >
              {playlist.public ? 'Public' : 'Private'}
            </div>
          </div>
          <p className="text-white text-opacity-50 group-hover:text-opacity-75">
            {playlist.description}
          </p>
          <p className="text-accent text-sm text-opacity-50 group-hover:text-opacity-75">
            {playlist.tracks.total} Tracks
          </p>
        </div>
      </div>
      <div>
        <MenuPlaylist playlist={playlist} links={links} />
      </div>
    </div>
  );
};

const ImagePlaylist = ({ image }: { image: Image }) => (
  <div className="w-20 h-20 relative">
    <div className=" bg-gray-600 w-full h-full z-10 animate-pulse rounded-lg overflow-hidden inset-0 absolute"></div>
    <div className="z-20 relative rounded-lg overflow-hidden">
      {image ? (
        <img
          className="w-20 h-20 flex-shrink-0 object-cover"
          src={image.url}
          alt={'Playlist cover'}
        />
      ) : (
        <div className="w-20 h-20 flex-cc bg-slate-700 flex-shrink-0 ">
          <Lottie className="w-10 h-10" animation={spinningVinyl} />
        </div>
      )}
    </div>
  </div>
);

export default PlaylistItem;
