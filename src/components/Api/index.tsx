import axios, { AxiosRequestConfig } from 'axios';

const Api = axios.create({
  baseURL: 'https://api.spotify.com/v1',
});

const handleSearchTrack = (
  keyword: string | null,
  offset = 0,
  controller: AbortController | null = null
) => {
  const accessTokenRedux = localStorage.getItem('accessToken');
  const Authorization = `Bearer ${accessTokenRedux}`;

  const config: AxiosRequestConfig = {
    params: {
      q: keyword,
      type: 'track',
      offset,
    },
    headers: {
      'Content-Type': 'application/json',
      Authorization,
    },
  };

  if (controller) config.signal = controller.signal;

  return Api.get('/search', config);
};

export { handleSearchTrack };

export default Api;
