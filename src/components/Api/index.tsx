import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://api.spotify.com/v1',
});

export default Api;
