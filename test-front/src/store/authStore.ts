import { defineStore } from 'pinia';
import { login, logout, check } from '../services/authService';
import { User } from '../types/User';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null') as User | null,
    token: localStorage.getItem('token') || null,
  }),
  actions: {
    async authLogin(credentials: { email: string; password: string }) {
      const data = await login(credentials);
      this.user = data.user;
      this.token = data.token;
      localStorage.setItem('user', JSON.stringify(data.user)); // Guarda el usuario
      localStorage.setItem('token', data.token); // Guarda el token
    },
    async authLogout() {
      await logout();
      this.user = null;
      this.token = null;
      localStorage.removeItem('user'); // Limpia el usuario
      localStorage.removeItem('token'); // Limpia el token
    },

    async authCheck() {
      try {
        if (!this.token) {
          return;
        }
        const user = await check();
        this.user = user;
      } catch (error) {

        this.user = null;
        this.token = null;
        localStorage.removeItem('user'); // Limpia el usuario
        localStorage.removeItem('token'); // Limpia el token
      }
  }},
  getters: {
    isAuthenticated: (state) => !!state.token, // Retorna true si el usuario está autenticado
  },
});
