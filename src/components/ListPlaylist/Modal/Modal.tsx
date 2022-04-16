import { Dialog, Transition } from '@headlessui/react';
import FormCreate from 'components/navbar/ModalCratePlaylist/FormCreate';
import SelectedTrackItem from 'components/navbar/SelectedTrackItem';
import { FormatedTrack } from 'core/hooks/useTrackSearch';
import {
  changePlaylistDetail,
  changePlaylistItem,
  getPlaylist,
  unfollowPlaylist,
} from 'core/spotify/request';
import { PlaylistType } from 'pages/ListPlaylist';
import React, { Fragment, useEffect, useState } from 'react';
import { ImSpinner8 } from 'react-icons/im';

type Props = {
  setType: React.Dispatch<React.SetStateAction<string | null>>;
  isShow: boolean;
  playlistId: string | null;
  type: string | null;
  setPlaylists: React.Dispatch<React.SetStateAction<PlaylistType[]>>;
};

export interface PlaylistTypeApi {
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

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface Owner {
  display_name?: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: Type;
  uri: string;
  name?: string;
}

export enum Type {
  Artist = 'artist',
  User = 'user',
}

export interface Tracks {
  href: string;
  items: Item[];
  limit: number;
  next: null;
  offset: number;
  previous: null;
  total: number;
}

export interface Item {
  added_at: string;
  added_by: Owner;
  is_local: boolean;
  primary_color: null;
  track: Track;
  video_thumbnail: VideoThumbnail;
}

export interface Track {
  album: Album;
  artists: Owner[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  episode: boolean;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track: boolean;
  track_number: number;
  type: string;
  uri: string;
}

export interface Album {
  album_type: string;
  artists: Owner[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface ExternalIDS {
  isrc: string;
}

export interface VideoThumbnail {
  url: null;
}

const Modal = ({ setType, isShow, playlistId, type, setPlaylists }: Props) => {
  const [Title, setTitle] = useState('');
  const [Desccription, setDesccription] = useState('');
  const [LoadingSubmit, setLoadingSubmit] = useState(false);
  const [LoadingDataPlaylist, setLoadingDataPlaylist] = useState(true);
  const [Tracks, setTracks] = useState<FormatedTrack[]>([]);
  const [Success, setSuccess] = useState('');

  useEffect(() => {
    if (playlistId && type === 'edit')
      getPlaylist(playlistId).then((res) => {
        const playlist: PlaylistTypeApi = res.data;
        setTitle(playlist.name);
        setDesccription(playlist.description);
        setTracks(
          playlist.tracks.items.map(({ track }) => ({
            title: track.name,
            thumbnail: track.album.images[0].url,
            duration: track.duration_ms,
            preview: track.preview_url,
            uri: track.uri,
            artists: track.artists.map(({ name = '', id, external_urls }) => ({
              name: name,
              id: id,
              url: external_urls.spotify,
            })),
          }))
        );
        setLoadingDataPlaylist(false);
      });
    else setLoadingDataPlaylist(false);
  }, [playlistId, type]);

  const handleEditDetailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingSubmit(true);
    setSuccess('');
    if (!playlistId) {
      setLoadingSubmit(false);
      setType(null);
      return;
    }
    return changePlaylistDetail(playlistId, {
      name: Title,
      description: Desccription,
      public: false,
      collaborative: false,
    })
      .then(() => {
        setPlaylists((prev) =>
          prev.map((playlist) =>
            playlist.id === playlistId
              ? { ...playlist, name: Title, description: Desccription }
              : playlist
          )
        );
        setSuccess('Successfully updated details');
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setLoadingSubmit(false);
      });
  };

  const onClose = () => {
    setType(null);
  };

  const handleDeleteTrack = (track: FormatedTrack) => {
    setTracks((prev) =>
      prev.filter((filterTrack) => filterTrack.uri !== track.uri)
    );
  };

  const handleUpdateTrack = () => {
    setLoadingSubmit(true);
    setSuccess('');
    if (!playlistId) {
      setLoadingSubmit(false);
      setType(null);
      return;
    }
    changePlaylistItem(playlistId, {
      uris: Tracks.map((track) => track.uri),
    })
      .then(() => {
        setPlaylists((prev) =>
          prev.map((playlist) =>
            playlist.id === playlistId
              ? {
                  ...playlist,
                  tracks: { ...playlist.tracks, total: Tracks.length },
                }
              : playlist
          )
        );
        setSuccess('Successfully updated tracks list');
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setLoadingSubmit(false);
      });
  };

  const handleDeletePlaylist = () => {
    setLoadingSubmit(true);
    setSuccess('');
    if (!playlistId) {
      setLoadingSubmit(false);
      setType(null);
      return;
    }
    unfollowPlaylist(playlistId)
      .then(() => {
        setPlaylists((prev) =>
          prev.filter((playlist) => playlist.id !== playlistId)
        );
        setType(null);
      })
      .catch((err) => {
        console.log(err.message);
        setLoadingSubmit(false);
      });
  };

  return (
    <Transition appear show={isShow} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-100 overflow-y-auto"
        onClose={onClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-dark shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg capitalize mb-4 font-medium leading-6 text-gray-300"
              >
                <span className="mr-1">{type}</span> Playlist
              </Dialog.Title>
              {LoadingDataPlaylist && (
                <div className="flex-cc">
                  <ImSpinner8 className="animate-spin w-10 h-10 text-white" />
                </div>
              )}
              {!LoadingDataPlaylist && type !== null && type === 'delete' && (
                <div className="text-center flex-cc flex-col">
                  <h4 className="text-white font-semibold text-2xl mb-5">
                    Are you sure want to delete this playlist?
                  </h4>
                  <div className="flex-cc gap-4">
                    <button
                      disabled={LoadingSubmit}
                      onClick={onClose}
                      className="bg-accent disabled:opacity-50 hover:text-white hover:bg-transparent transition-colors px-6 py-2 rounded border border-accent text-dark-800"
                    >
                      No
                    </button>
                    <button
                      disabled={LoadingSubmit}
                      onClick={handleDeletePlaylist}
                      className=" bg-transparent disabled:opacity-50 hover:text-dark-800 hover:bg-accent transition-colors px-6 py-2 rounded border border-accent text-gray-300"
                    >
                      Yes
                    </button>
                  </div>
                </div>
              )}
              {!LoadingDataPlaylist && type !== null && type === 'edit' && (
                <>
                  {Success.length > 0 && (
                    <div className="w-full bg-green-500 bg-opacity-60 mb-4 text-white px-2 py-3 rounded-lg">
                      {Success}
                    </div>
                  )}
                  <FormCreate
                    handleSubmit={handleEditDetailSubmit}
                    setTitle={setTitle}
                    setDesccription={setDesccription}
                    Loading={LoadingSubmit}
                    btnLabel="Update Detail Playlist"
                    defaultValueDescription={Desccription}
                    defaultValueTitle={Title}
                  />
                  <div className="my-5">
                    {Tracks.map((track) => (
                      <SelectedTrackItem
                        track={track}
                        handleDelete={() => handleDeleteTrack(track)}
                        key={track.uri}
                      />
                    ))}
                    <button
                      onClick={handleUpdateTrack}
                      disabled={LoadingSubmit}
                      className="bg-accent disabled:opacity-75 px-2 py-2 rounded-md font-semibold w-full"
                    >
                      Update Track list
                    </button>
                  </div>
                </>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
