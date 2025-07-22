// Composant de route protégée pour Gems Revived
// Contrôle l'accès aux pages selon l'authentification et les rôles

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Shield, Crown } from 'lucide-react';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, loading, isAuthenticated, hasRole } = useAuth();
  const location = useLocation();

  // Affichage du loader pendant la vérification
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center"
          >
            <Shield className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Vérification...</h2>
          <p className="text-gray-500">Authentification en cours</p>
        </motion.div>
      </div>
    );
  }

  // Redirection vers login si non authentifié
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Vérification des rôles si requis
  if (requiredRole && !hasRole(requiredRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto p-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center"
          >
            <Crown className="w-10 h-10 text-white" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Accès Restreint</h2>
          <p className="text-gray-600 mb-6">
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
          </p>
          
          <div className="space-y-2 text-sm text-gray-500">
            <p><strong>Votre rôle :</strong> {user?.role}</p>
            <p><strong>Rôle requis :</strong> {Array.isArray(requiredRole) ? requiredRole.join(' ou ') : requiredRole}</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.history.back()}
            className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
          >
            Retour
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // Affichage du contenu protégé
  return children;
};

export default ProtectedRoute;

