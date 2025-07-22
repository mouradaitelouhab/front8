// Service d'authentification pour Gems Revived
// Gère les appels API liés à l'authentification

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Configuration d'axios avec intercepteurs
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token aux requêtes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  // Connexion
  login: async (email, password) => {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  },

  // Inscription
  register: async (userData) => {
    const response = await api.post('/api/auth/register', userData);
    return response.data;
  },

  // Vérifier le token
  verifyToken: async () => {
    const response = await api.post('/api/auth/verify-token');
    return response.data.data.user;
  },

  // Obtenir le profil utilisateur
  getProfile: async () => {
    const response = await api.get('/api/auth/me');
    return response.data.data.user;
  },

  // Mettre à jour le profil
  updateProfile: async (profileData) => {
    const response = await api.put('/api/auth/profile', profileData);
    return response.data;
  },

  // Changer le mot de passe
  changePassword: async (currentPassword, newPassword) => {
    const response = await api.put('/api/auth/change-password', {
      currentPassword,
      newPassword
    });
    return response.data;
  },

  // Mot de passe oublié
  forgotPassword: async (email) => {
    const response = await api.post('/api/auth/forgot-password', { email });
    return response.data;
  },

  // Réinitialiser le mot de passe
  resetPassword: async (token, newPassword) => {
    const response = await api.post('/api/auth/reset-password', {
      token,
      newPassword
    });
    return response.data;
  },

  // Déconnexion
  logout: async () => {
    try {
      await api.post('/api/auth/logout');
    } catch (error) {
      // Ignorer les erreurs de déconnexion
      console.warn('Erreur lors de la déconnexion:', error);
    } finally {
      localStorage.removeItem('token');
    }
  }
};

export default api;
