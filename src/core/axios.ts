import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const api = axios.create();

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  //@ts-ignore
  const activeToken = new Date() > jwtDecode(accessToken as string).exp ? accessToken : refreshToken;

  const sessid = localStorage.getItem('sessid');


  if (accessToken && refreshToken) {
    config.headers.Authorization = `Bearer ${activeToken}`;
  }

  if (sessid) {
    config.headers['X-SESSID'] = sessid;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use((response) => {
  const newAccessToken = response.headers['X-Jwt-Access'];
  const newRefreshToken = response.headers['X-Jwt-Refresh'];
  const sessid = response.headers['x-sessid'];

  if (newAccessToken && newRefreshToken) {
    localStorage.setItem('accessToken', newAccessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
  }
  if (sessid) {
    localStorage.setItem('sessid', sessid)
  }

  return response;
}, (error) => {
  // Обработка ошибки
  return Promise.reject(error);
});

export default api;