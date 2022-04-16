import Modal from 'components/ListPlaylist/Modal';
import PlaylistItem from 'components/ListPlaylist/PlaylistItem';
import { Image } from 'core/hooks/useTrackSearch';
import { selectorProps } from 'core/redux/store';
import { getCurrentUserPlaylists } from 'core/spotify/request';
import DashboardLayout from 'layouts/Dashboard';
import React, { useEffect, useMemo, useState } from 'react';
import { ImSpinner8 } from 'react-icons/im';
import { useSelector } from 'react-redux';
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
        <div className="flex flex-col ">
          {Playlists &&
            Playlists.map((playlist) => (
              <PlaylistItem
                key={playlist.id}
                playlist={playlist}
                links={Links}
              />
            ))}
        </div>
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
