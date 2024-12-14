import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Cambia a la URL de tu backend
  withCredentials: true, // Necesario para Sanctum
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor para agregar el token en cada petición
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
