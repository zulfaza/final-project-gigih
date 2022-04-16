import { Menu, Transition } from '@headlessui/react';
import Modal from 'components/ListPlaylist/Modal';
import { Image } from 'core/hooks/useTrackSearch';
import { selectorProps } from 'core/redux/store';
import { getCurrentUserPlaylists } from 'core/spotify/request';
import DashboardLayout from 'layouts/Dashboard';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { ImSpinner8 } from 'react-icons/im';
import { useSelector } from 'react-redux';
import classNames from 'utils/classNames';

export interface PlaylistType {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  primary_color: null;
  public: boolean;
  snapshot_id: string;
  tracks: Tracks;
  type: string;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Owner {
  display_name: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface Tracks {
  href: string;
  total: number;
}

const ListPlaylist = () => {
  const [Playlists, setPlaylists] = useState<PlaylistType[]>([]);
  const user = useSelector((state: selectorProps) => state.spotify.user);
  const [Loading, setLoading] = useState(true);
  const [SelectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [EventType, setEventType] = useState<string | null>(null);

  const Links = useMemo(
    () => [
      {
        name: 'Edit',
        onClick: (uri: string) => {
          setSelectedTrack(uri);
          setEventType('edit');
        },
      },
      {
        name: 'Delete',
        onClick: (uri: string) => {
          setSelectedTrack(uri);
          setEventType('delete');
        },
      },
    ],
    []
  );

  useEffect(() => {
    getCurrentUserPlaylists().then((res) => {
      setPlaylists(res.data.items);
      setLoading(false);
    });
  }, []);

  return (
    <DashboardLayout>
      <>
        <h2 className="font-bold mb-10 text-white text-xl md:text-4xl lg:text-7xl">
          My Playlist
        </h2>
        {(Loading || !user) && (
          <div className="flex-cc">
            <ImSpinner8 className="animate-spin w-10 h-10 text-white" />
          </div>
        )}
        {user && (
          <div className="flex flex-col ">
            {Playlists.map((playlist) => (
              <div
                key={playlist.uri}
                className="flex w-full border-b group border-white border-opacity-20 last:border-0 py-5"
              >
                <div className="flex w-full gap-5">
                  <img
                    className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden object-cover"
                    src={
                      playlist.images[0].url ??
                      `https://avatars.dicebear.com/api/identicon/${playlist.id}.svg`
                    }
                    alt={playlist.name}
                  />
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
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className=" text-white text-opacity-50 group-hover:text-opacity-100 bg-gray-800 rounded px-2 py-1 flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open playlist menu</span>
                        <BsThreeDots className="w-5 h-5" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg py-1 bg-dark-800 bg-opacity-50 ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {Links.filter(
                          (item) =>
                            playlist.owner.id == user.id ||
                            item.name === 'Delete'
                        ).map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <button
                                onClick={() => item.onClick(playlist.id)}
                                className={classNames(
                                  active ? ' text-opacity-100' : '',
                                  'block w-full text-left px-4 py-2 text-sm transition-colors text-white text-opacity-40'
                                )}
                              >
                                {item.name}
                              </button>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            ))}
          </div>
        )}
        <Modal
          type={EventType}
          isShow={EventType !== null}
          playlistId={SelectedTrack}
          setType={setEventType}
          setPlaylists={setPlaylists}
        />
      </>
    </DashboardLayout>
  );
};

export default ListPlaylist;
