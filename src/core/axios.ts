import axios from 'axios';

const api = axios.create();

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use((response) => {
  const newAccessToken = response.headers['X-Jwt-Access'];
  const newRefreshToken = response.headers['X-Jwt-Refresh'];

  if (newAccessToken && newRefreshToken) {
    localStorage.setItem('accessToken', newAccessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
  }

  return response;
}, (error) => {
  // Обработка ошибки
  return Promise.reject(error);
});

export default api;