// Contexte d'authentification pour Gems Revived
// Gère l'état global de l'utilisateur connecté

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          // Check if user data exists in localStorage
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          } else {
            // If no stored user but token exists, clear token
            localStorage.removeItem('token');
            setToken(null);
          }
        } catch (error) {
          console.error('Error loading user data:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setToken(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [token]);

  // Fonction de connexion
  const login = async (email, password) => {
    try {
      // For demo purposes, simulate successful login with different roles based on email
      if (email && password) {
        let role = 'Buyer';
        let username = email.split('@')[0];
        
        // Determine role based on email
        if (email.includes('admin')) {
          role = 'Admin';
          username = 'Admin User';
        } else if (email.includes('seller')) {
          role = 'Seller';
          username = 'Seller User';
        }
        
        const mockUser = {
          id: 1,
          email: email,
          username: username,
          role: role,
          firstName: 'Demo',
          lastName: 'User'
        };
        
        const mockToken = 'demo-token-' + Date.now();
        
        setUser(mockUser);
        setToken(mockToken);
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        return { success: true };
      } else {
        return { success: false, message: 'Email et mot de passe requis' };
      }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Erreur de connexion' 
      };
    }
  };

  // Fonction d'inscription
  const register = async (username, email, password) => {
    try {
      // For demo purposes, simulate successful registration
      if (username && email && password) {
        return { success: true, message: 'Inscription réussie! Vous pouvez maintenant vous connecter.' };
      } else {
        return { success: false, message: 'Tous les champs sont requis' };
      }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Erreur d\'inscription' 
      };
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Vérifier si l'utilisateur a un rôle spécifique
  const hasRole = (requiredRole) => {
    if (!user) return false;
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(user.role);
    }
    return user.role === requiredRole;
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    hasRole,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

