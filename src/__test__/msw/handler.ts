import { rest } from 'msw';
import spotifySearchResponse from '__test__/msw/data/spotify/search.json';
import ProfileData from '__test__/msw/data/spotify/me.json';
import RecentTracks from '__test__/msw/data/spotify/recently-played.json';
import Tracks from '__test__/msw/data/spotify/tracks.json';

const handler = [
  rest.get('https://api.spotify.com/v1/search', (req, res, ctx) => {
    return res(ctx.json(spotifySearchResponse));
  }),
  rest.get('https://api.spotify.com/v1/me', (req, res, ctx) => {
    return res(ctx.json(ProfileData));
  }),
  rest.get(
    'https://api.spotify.com/v1/me/player/recently-played',
    (req, res, ctx) => {
      return res(ctx.json(RecentTracks));
    }
  ),
  rest.get('https://api.spotify.com/v1/tracks', (req, res, ctx) => {
    return res(ctx.json(Tracks));
  }),
];

export default handler;
