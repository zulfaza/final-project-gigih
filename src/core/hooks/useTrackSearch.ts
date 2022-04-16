import axios from 'axios';
import { handleSearchTrack } from 'core/spotify/request';
import { useEffect, useState } from 'react';

export interface TracksData {
  href: string;
  items: Track[];
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
}

export interface Track {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: ItemType;
  uri: string;
}

export interface Album {
  album_type: AlbumTypeEnum;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: ReleaseDatePrecision;
  total_tracks: number;
  type: AlbumTypeEnum;
  uri: string;
}

export enum AlbumTypeEnum {
  Album = 'album',
  Single = 'single',
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: ArtistType;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export enum ArtistType {
  Artist = 'artist',
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export enum ReleaseDatePrecision {
  Day = 'day',
}

export interface ExternalIDS {
  isrc: string;
}

export enum ItemType {
  Track = 'track',
}

export interface FormatedTrack {
  title: string;
  thumbnail: string;
  duration: number;
  uri: string;
  artists: FormatedArtist[];
  preview: string;
}

export interface FormatedArtist {
  name: string;
  id: string;
  url: string;
}

const useTrackSearch = (
  query: string | null,
  offset = 0
): [FormatedTrack[], boolean, boolean, any, number | null] => {
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState<any>(null);
  const [Tracks, setTracks] = useState<FormatedTrack[]>([]);
  const [HasMore, setHasMore] = useState(false);
  const [TotalTracks, setTotalTracks] = useState<number | null>(null);

  useEffect(() => {
    setTracks([]);
  }, [query]);

  useEffect(() => {
    const controller = new AbortController();

    if (query && query.length > 0) {
      setLoading(true);
      handleSearchTrack(query, offset, controller)
        .then((res) => {
          if (res.data.tracks) {
            const data: TracksData = res.data.tracks;
            // console.log(data);
            setTotalTracks(data.total);
            setHasMore(data.next !== null);
            setTracks((prevTrack) => [
              ...prevTrack,
              ...data.items.map((track) => ({
                title: track.name,
                thumbnail:
                  track.album.images[0].url ??
                  `https://avatars.dicebear.com/api/identicon/${track.id}.svg`,
                duration: track.duration_ms,
                preview: track.preview_url,
                uri: track.uri,
                artists: track.artists.map((artist) => ({
                  name: artist.name,
                  id: artist.id,
                  url: artist.external_urls.spotify,
                })),
              })),
            ]);
          }
        })
        .catch((err) => {
          if (axios.isCancel(err)) return;
          if (err.response) {
            setError(err.response.data.error);
          } else {
            setError(err.message);
          }
        })
        .finally(() => setLoading(false));
    }

    return () => controller.abort();
  }, [query, offset]);

  return [Tracks, HasMore, Loading, Error, TotalTracks];
};

export default useTrackSearch;
