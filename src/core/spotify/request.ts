import { AxiosRequestConfig } from 'axios';
import Api from 'components/Api';
import { userType } from 'core/redux/spotify';

function getAxiosConfig() {
  const accessTokenRedux = localStorage.getItem('accessToken');
  const Authorization = `Bearer ${accessTokenRedux}`;
  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization,
    },
  };

  return config;
}

const handleSearchTrack = (
  keyword: string | null,
  offset = 0,
  controller: AbortController | null = null
) => {
  const config = getAxiosConfig();
  config.params = {
    q: keyword,
    type: 'track',
    offset,
  };
  if (controller) config.signal = controller.signal;

  return Api.get('/search', config);
};

const getUserInfo = () => {
  const config = getAxiosConfig();
  return Api.get('/me', config);
};

const getSavedTrack = () => {
  const config = getAxiosConfig();
  config.params = {
    limit: 10,
  };
  return Api.get('/me/player/recently-played', config);
};
const createPlaylist = ({
  body,
}: {
  body: {
    name: string;
    description: string;
  };
}) => {
  const userStr = localStorage.getItem('userData');
  if (!userStr) throw new Error('Missing userData');

  const user: userType = JSON.parse(userStr);

  const config = getAxiosConfig();
  return Api.post(
    `/users/${user.id}/playlists`,
    {
      ...body,
      public: false,
      collaborative: false,
    },
    config
  );
};

const addToPlaylist = ({
  body,
  playlistId,
}: {
  body: {
    uris: string[];
  };
  playlistId: string;
}) => {
  const config = getAxiosConfig();

  return Api.post(
    `/playlists/${playlistId}/tracks`,
    {
      uris: body.uris,
    },
    config
  );
};

const getTracks = (ids: string, market: string = 'ID') => {
  const config = getAxiosConfig();
  config.params = {
    market,
    ids,
  };
  return Api.get('/tracks', config);
};

export {
  handleSearchTrack,
  getUserInfo,
  getTracks,
  getSavedTrack,
  createPlaylist,
  addToPlaylist,
};
