import { create } from 'zustand';
import api from './api';

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuth: false,
  loading: true,

  checkAuth: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        set({ user: null, token: null, isAuth: false, loading: false });
        return;
      }
      // Decode token or fetch user profile
      const res = await api.get('/auth/me'); // Assuming we have or will add this route
      set({ user: res.data.user, token, isAuth: true, loading: false });
    } catch (error) {
      localStorage.removeItem('token');
      set({ user: null, token: null, isAuth: false, loading: false });
    }
  },

  login: async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const { token, user } = res.data;
    localStorage.setItem('token', token);
    set({ user, token, isAuth: true });
    return { token, user };
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuth: false });
  }
}));
