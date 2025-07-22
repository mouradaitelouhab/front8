// Header simplifié pour ALMAS & DIMAS - Version Demo Académique
// Navigation principale avec design épuré

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  User, 
  Search, 
  Menu, 
  X,
  LogOut,
  Settings,
  Package
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import LanguageSelector from '@/components/ui/LanguageSelector';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useLanguage } from '../../contexts/LanguageContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { user, logout, isAuthenticated } = useAuth();
  const { itemCount } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Effet de scroll pour le header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Gestion de la recherche
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  // Gestion de la déconnexion
  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-200/50' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Barre supérieure avec gradient luxueux */}
      <div className="bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center text-sm">
            <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
            <span className="font-medium">Livraison gratuite pour toute commande supérieure à 500€</span>
            <Sparkles className="w-4 h-4 ml-2 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Navigation principale */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo avec animation */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Diamond className="w-10 h-10 text-primary group-hover:text-accent transition-colors" />
              <motion.div
                className="absolute inset-0 bg-primary/20 rounded-full opacity-20 blur-xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold text-gradient-gold">
                ALMAS & DIMAS
              </h1>
              <p className="text-xs text-gray-500 font-medium">Bijoux de Luxe</p>
            </div>
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            {[
              { name: t('home'), path: '/' },
              { name: t('collections'), path: '/products' },
              { name: 'Services', path: '/services' },
              { name: t('about'), path: '/about' },
              { name: t('contact'), path: '/contact' }
            ].map((item, index) => (
              <div
                key={item.name}
                className="hover-card"
              >
                <Link
                  to={item.path}
                  className="relative text-foreground hover:text-primary font-medium transition-colors duration-300 group"
                >
                  {item.name}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300"
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Barre de recherche */}
          <div className="hidden md:flex items-center">
            <form onSubmit={handleSearch} className="relative">
              <motion.div
                className="relative"
                whileFocus={{ scale: 1.02 }}
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                />
              </motion.div>
            </form>
          </div>

          {/* Actions utilisateur */}
          <div className="flex items-center space-x-4">
            {/* Sélecteur de langue */}
            <LanguageSelector />
            
            {/* Panier */}
            <div className="hover-card">
              <Link to="/cart" className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors">
                <ShoppingBag className="w-6 h-6" />
                {itemCount > 0 && (
                  <div className="absolute -top-1 -right-1">
                    <Badge className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {itemCount}
                    </Badge>
                  </div>
                )}
              </Link>
            </div>

            {/* Liste de souhaits */}
            <div className="hover-card">
              <Link to="/wishlist" className="p-2 text-gray-700 hover:text-blue-600 transition-colors">
                <Heart className="w-6 h-6" />
              </Link>
            </div>

            {/* Menu utilisateur */}
            {isAuthenticated ? (
              <div className="relative">
                <motion.button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden md:block text-sm font-medium text-gray-700">
                    {user?.username}
                  </span>
                </motion.button>

                {/* Menu déroulant utilisateur */}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 z-50"
                    >
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user?.username}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                        <div className="flex items-center mt-1">
                          <Crown className="w-3 h-3 text-purple-600 mr-1" />
                          <span className="text-xs text-purple-600 font-medium">{user?.role}</span>
                        </div>
                      </div>
                      
                      <div className="py-2">
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4 mr-3" />
                          {t('profile')}
                        </Link>
                        <Link
                          to="/orders"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Package className="w-4 h-4 mr-3" />
                          {t('myOrders')}
                        </Link>
                        {(user?.role === 'Admin' || user?.role === 'Seller') && (
                          <Link
                            to="/dashboard"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Crown className="w-4 h-4 mr-3" />
                            Tableau de Bord
                          </Link>
                        )}
                      </div>
                      
                      <div className="border-t border-gray-100 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4 mr-3" />
                          {t('logout')}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/login')}
                  className="text-gray-700 hover:text-purple-600"
                >
                  {t('login')}
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate('/register')}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  Inscription
                </Button>
              </div>
            )}

            {/* Menu mobile */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-purple-600 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <div className="container mx-auto px-4 py-4">
              {/* Recherche mobile */}
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder={t('search')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </form>

              {/* Navigation mobile */}
              <nav className="space-y-2">
                {[
                  { name: t('home'), path: '/' },
                  { name: t('rings'), path: '/products?category=rings' },
                  { name: t('necklaces'), path: '/products?category=necklaces' },
                  { name: t('bracelets'), path: '/products?category=bracelets' },
                  { name: t('collections'), path: '/products' }
                ].map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="block py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;

