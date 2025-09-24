import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://YOUR_RENDER_APP_NAME.onrender.com/api' 
  : 'http://localhost:5000/api';

// Replace YOUR_RENDER_APP_NAME with your actual Render app name

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

export const userAPI = {
  getProfile: () => api.get('/user/profile'),
};

export default api;