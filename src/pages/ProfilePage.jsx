// Page Profil pour ALMAS & DIMAS
// Gestion du profil utilisateur et des préférences

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit, 
  Save, 
  X,
  Eye,
  EyeOff,
  Shield,
  Bell,
  CreditCard,
  Heart,
  Package,
  Settings,
  Diamond,
  Camera,
  Check,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const [profileData, setProfileData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    country: user?.country || 'Maroc',
    birthDate: user?.birthDate || '',
    avatar: user?.avatar || null
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    promotionalEmails: true,
    orderUpdates: true,
    newsletter: true,
    language: 'fr',
    currency: 'MAD'
  });

  const [stats, setStats] = useState({
    totalOrders: 3,
    totalSpent: 162000,
    wishlistItems: 5,
    loyaltyPoints: 1620
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreferenceChange = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      // Ici, vous feriez un appel API pour sauvegarder le profil
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage({ type: 'success', text: 'Profil mis à jour avec succès!' });
      setIsEditing(false);
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur lors de la mise à jour du profil' });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'Les mots de passe ne correspondent pas' });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Le mot de passe doit contenir au moins 6 caractères' });
      return;
    }

    setLoading(true);
    try {
      // Ici, vous feriez un appel API pour changer le mot de passe
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage({ type: 'success', text: 'Mot de passe modifié avec succès!' });
      setShowPasswordChange(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur lors du changement de mot de passe' });
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'orders', label: 'Commandes', icon: Package },
    { id: 'wishlist', label: 'Favoris', icon: Heart },
    { id: 'settings', label: 'Paramètres', icon: Settings },
    { id: 'security', label: 'Sécurité', icon: Shield }
  ];

  if (!user) {
    return (
      <div className="min-h-screen elegant-gradient pt-32 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <User className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Connectez-vous pour accéder à votre profil
          </h1>
          <Button onClick={() => navigate('/login')} className="w-full">
            Se connecter
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen elegant-gradient pt-32">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Mon <span className="text-gradient-gold">Profil</span>
          </h1>
        </motion.div>

        {/* Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${
              message.type === 'success' 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}
          >
            {message.type === 'success' ? (
              <Check className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            {message.text}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMessage(null)}
              className="ml-auto p-1"
            >
              <X className="w-4 h-4" />
            </Button>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6">
              {/* User Avatar */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full overflow-hidden mx-auto">
                    {profileData.avatar ? (
                      <img
                        src={profileData.avatar}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-12 h-12 text-primary/50" />
                      </div>
                    )}
                  </div>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <h3 className="text-lg font-bold text-foreground mt-3">{user.username}</h3>
                <p className="text-muted-foreground">{user.email}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{stats.totalOrders}</div>
                  <div className="text-sm text-muted-foreground">Commandes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{stats.wishlistItems}</div>
                  <div className="text-sm text-muted-foreground">Favoris</div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-primary/10 text-foreground'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-foreground">Informations personnelles</h2>
                    <Button
                      onClick={() => setIsEditing(!isEditing)}
                      variant={isEditing ? "outline" : "default"}
                    >
                      {isEditing ? (
                        <>
                          <X className="w-4 h-4 mr-2" />
                          Annuler
                        </>
                      ) : (
                        <>
                          <Edit className="w-4 h-4 mr-2" />
                          Modifier
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Nom d'utilisateur
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={profileData.username}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-white/50 disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-white/50 disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-white/50 disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Date de naissance
                      </label>
                      <input
                        type="date"
                        name="birthDate"
                        value={profileData.birthDate}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-white/50 disabled:opacity-50"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Adresse
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={profileData.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-white/50 disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Ville
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={profileData.city}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-white/50 disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Pays
                      </label>
                      <select
                        name="country"
                        value={profileData.country}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-white/50 disabled:opacity-50"
                      >
                        <option value="Maroc">Maroc</option>
                        <option value="France">France</option>
                        <option value="Belgique">Belgique</option>
                        <option value="Canada">Canada</option>
                      </select>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="mt-6 flex gap-3">
                      <Button onClick={handleSaveProfile} disabled={loading}>
                        {loading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 mr-2"
                          >
                            <Diamond className="w-full h-full" />
                          </motion.div>
                        ) : (
                          <Save className="w-4 h-4 mr-2" />
                        )}
                        Sauvegarder
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Sécurité</h2>
                  
                  <div className="space-y-6">
                    <div className="p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">Mot de passe</h3>
                          <p className="text-sm text-muted-foreground">
                            Dernière modification: Il y a 30 jours
                          </p>
                        </div>
                        <Button
                          onClick={() => setShowPasswordChange(!showPasswordChange)}
                          variant="outline"
                        >
                          Modifier
                        </Button>
                      </div>

                      {showPasswordChange && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4 space-y-4"
                        >
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Mot de passe actuel
                            </label>
                            <input
                              type="password"
                              name="currentPassword"
                              value={passwordData.currentPassword}
                              onChange={handlePasswordChange}
                              className="w-full px-4 py-2 border border-border rounded-lg"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Nouveau mot de passe
                            </label>
                            <input
                              type="password"
                              name="newPassword"
                              value={passwordData.newPassword}
                              onChange={handlePasswordChange}
                              className="w-full px-4 py-2 border border-border rounded-lg"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Confirmer le nouveau mot de passe
                            </label>
                            <input
                              type="password"
                              name="confirmPassword"
                              value={passwordData.confirmPassword}
                              onChange={handlePasswordChange}
                              className="w-full px-4 py-2 border border-border rounded-lg"
                            />
                          </div>

                          <div className="flex gap-3">
                            <Button onClick={handleChangePassword} disabled={loading}>
                              {loading ? (
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  className="w-4 h-4 mr-2"
                                >
                                  <Diamond className="w-full h-full" />
                                </motion.div>
                              ) : (
                                <Save className="w-4 h-4 mr-2" />
                              )}
                              Changer le mot de passe
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setShowPasswordChange(false)}
                            >
                              Annuler
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Préférences</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-4">Notifications</h3>
                      <div className="space-y-3">
                        {[
                          { key: 'emailNotifications', label: 'Notifications par email' },
                          { key: 'smsNotifications', label: 'Notifications SMS' },
                          { key: 'promotionalEmails', label: 'Emails promotionnels' },
                          { key: 'orderUpdates', label: 'Mises à jour des commandes' },
                          { key: 'newsletter', label: 'Newsletter' }
                        ].map((pref) => (
                          <div key={pref.key} className="flex items-center justify-between">
                            <span className="text-foreground">{pref.label}</span>
                            <button
                              onClick={() => handlePreferenceChange(pref.key)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                preferences[pref.key] ? 'bg-primary' : 'bg-gray-200'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  preferences[pref.key] ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-4">Langue et région</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Langue
                          </label>
                          <select
                            value={preferences.language}
                            onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
                            className="w-full px-4 py-2 border border-border rounded-lg bg-white/50"
                          >
                            <option value="fr">Français</option>
                            <option value="ar">العربية</option>
                            <option value="en">English</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Devise
                          </label>
                          <select
                            value={preferences.currency}
                            onChange={(e) => setPreferences(prev => ({ ...prev, currency: e.target.value }))}
                            className="w-full px-4 py-2 border border-border rounded-lg bg-white/50"
                          >
                            <option value="MAD">MAD (Dirham)</option>
                            <option value="EUR">EUR (Euro)</option>
                            <option value="USD">USD (Dollar)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Stats for other tabs */}
              {(activeTab === 'orders' || activeTab === 'wishlist') && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 text-primary">
                    {activeTab === 'orders' ? <Package className="w-full h-full" /> : <Heart className="w-full h-full" />}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {activeTab === 'orders' ? 'Vos commandes' : 'Vos favoris'}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {activeTab === 'orders' 
                      ? 'Consultez l\'historique de vos commandes' 
                      : 'Gérez votre liste de souhaits'
                    }
                  </p>
                  <Button
                    onClick={() => navigate(activeTab === 'orders' ? '/orders' : '/wishlist')}
                  >
                    {activeTab === 'orders' ? 'Voir mes commandes' : 'Voir mes favoris'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

