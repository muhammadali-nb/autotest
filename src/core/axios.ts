import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_VERSION,
  withCredentials: true
});


const isTokenExpired = (token) => {
  try {

    const decoded = jwtDecode(token);
    //@ts-ignore
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
};


api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  const sessid = localStorage.getItem('sessid');

  if (accessToken && !isTokenExpired(accessToken)) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else if (refreshToken) {
    config.headers.Authorization = `Bearer ${refreshToken}`;
  }

  if (sessid) {
    config.headers['x-sessid'] = sessid;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use((response) => {
  const newAccessToken = response.headers['x-jwt-access'];
  const newRefreshToken = response.headers['x-jwt-refresh'];
  const sessid = response.headers['x-sessid'];

  if (newAccessToken && newRefreshToken) {
    console.log('update tokens')
    localStorage.setItem('accessToken', newAccessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
  }

  if (sessid) {
    localStorage.setItem('sessid', sessid)
  }

  return response;
}, (error) => {
  const newAccessToken = error.response.headers['x-jwt-access'];
  const newRefreshToken = error.response.headers['x-jwt-refresh'];

  if (newAccessToken && newRefreshToken) {
    localStorage.setItem('accessToken', newAccessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
  }
  // Обработка ошибки
  return Promise.reject(error);
});

export default api;