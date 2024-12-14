import api from './api'; 
import { User } from '../types/User';

export const login = async (credentials: { email: string; password: string }): Promise<{ user: User; token: string }> => {
  const response = await api.post('/login', credentials);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/logout');
};

export const check = async (): Promise<User> => {
  const response = await api.get('/user');
  return response.data;
};