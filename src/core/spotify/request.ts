import { AxiosRequestConfig } from 'axios';
import Api from 'components/Api';

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

const getUserInfo = () => {
  const accessTokenRedux = localStorage.getItem('accessToken');
  const Authorization = `Bearer ${accessTokenRedux}`;
  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization,
    },
  };
  return Api.get('/me', config);
};

export { handleSearchTrack, getUserInfo };
