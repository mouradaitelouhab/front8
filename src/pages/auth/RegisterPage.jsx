import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Diamond, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (!formData.username || !formData.email || !formData.password) {
      setError('Tous les champs sont requis');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      setLoading(false);
      return;
    }

    try {
      const result = await register(formData.username, formData.email, formData.password);
      if (result.success) {
        // Redirect to login page with success message
        navigate('/login', { 
          state: { 
            message: 'Inscription réussie ! Vous pouvez maintenant vous connecter.' 
          } 
        });
      } else {
        setError(result.message || 'Erreur lors de l\'inscription');
      }
    } catch (err) {
      setError('Une erreur inattendue s\'est produite');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 space-y-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl"
      >
        <div className="text-center text-white">
          <Diamond className="w-12 h-12 mx-auto mb-4 text-purple-400" />
          <h1 className="text-3xl font-bold">Créer un Compte</h1>
          <p className="text-purple-200">Rejoignez l'expérience ALMAS & DIMAS</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300 w-5 h-5" />
            <Input
              type="text"
              name="username"
              placeholder="Nom d'utilisateur"
              value={formData.username}
              onChange={handleChange}
              className="pl-10 bg-white/20 border-none text-white placeholder:text-purple-200 focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300 w-5 h-5" />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="pl-10 bg-white/20 border-none text-white placeholder:text-purple-200 focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300 w-5 h-5" />
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleChange}
              className="pl-10 pr-10 bg-white/20 border-none text-white placeholder:text-purple-200 focus:ring-2 focus:ring-purple-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300 hover:text-white"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300 w-5 h-5" />
            <Input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirmer le mot de passe"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="pl-10 pr-10 bg-white/20 border-none text-white placeholder:text-purple-200 focus:ring-2 focus:ring-purple-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300 hover:text-white"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
              <p className="text-red-200 text-sm text-center">{error}</p>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 disabled:opacity-50" 
            disabled={loading}
          >
            {loading ? 'Inscription en cours...' : 'S\'inscrire'}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-purple-200 text-sm">
            Vous avez déjà un compte ?{' '}
            <Link 
              to="/login" 
              className="text-white font-semibold hover:text-purple-300 transition-colors"
            >
              Se connecter
            </Link>
          </p>
        </div>

        <div className="text-center">
          <p className="text-purple-300 text-xs">
            En vous inscrivant, vous acceptez nos{' '}
            <Link to="/terms" className="underline hover:text-white">
              Conditions d'utilisation
            </Link>{' '}
            et notre{' '}
            <Link to="/privacy" className="underline hover:text-white">
              Politique de confidentialité
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;

