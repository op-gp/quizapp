import axios from 'axios';

const defaultBaseURL = import.meta.env.DEV ? 'http://localhost:5001/api' : '/api';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || defaultBaseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor: Automatically inject JWT Bearer Token if found in localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
