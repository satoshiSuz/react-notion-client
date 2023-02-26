import axios, {
  AxiosHeaders,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from 'axios';
const BASE_URL = 'https://notion-clone-server.onrender.com/api/v1';

export const axiosClient = axios.create({ baseURL: BASE_URL });
const getToken = () => localStorage.getItem('token');

//APIを叩く前に前処理を行う
axiosClient.interceptors.request.use(async (config) => {
  (config.headers as AxiosHeaders)
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${getToken()}`);
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    throw err.response;
  }
);
