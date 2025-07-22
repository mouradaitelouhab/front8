// Page de commande pour ALMAS & DIMAS
// Permet aux invités de passer commande sans inscription

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  Truck, 
  Shield, 
  CheckCircle,
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { cart, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    // Informations personnelles
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Adresse de livraison
    address: '',
    city: '',
    postalCode: '',
    country: 'Maroc',
    
    // Informations de paiement
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simuler le traitement de la commande
    setTimeout(() => {
      const orderNum = 'AD' + Date.now().toString().slice(-6);
      setOrderNumber(orderNum);
      setOrderComplete(true);
      clearCart();
      setLoading(false);
    }, 2000);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen elegant-gradient pt-32">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Commande Confirmée !
            </h1>
            
            <p className="text-xl text-muted-foreground mb-6">
              Merci pour votre commande. Votre numéro de commande est :
            </p>
            
            <div className="text-2xl font-bold text-primary mb-8">
              #{orderNumber}
            </div>
            
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 mb-8">
              <h3 className="font-semibold mb-4">Prochaines étapes :</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Confirmation par email envoyée</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <span>Préparation de votre commande (2-3 jours)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-purple-600" />
                  <span>Livraison sécurisée (5-7 jours ouvrés)</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/')}
                className="gold-gradient"
              >
                Retour à l'accueil
              </Button>
              <Button 
                onClick={() => navigate('/products')}
                variant="outline"
              >
                Continuer mes achats
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen elegant-gradient pt-32">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button
              onClick={() => navigate('/cart')}
              variant="ghost"
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au panier
            </Button>
            <h1 className="text-3xl font-bold text-foreground">Finaliser ma commande</h1>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Formulaire de commande */}
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Informations personnelles */}
                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Informations personnelles
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Prénom *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Nom *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Téléphone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Adresse de livraison */}
                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Adresse de livraison
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Adresse *</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Ville *</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Code postal *</label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Pays *</label>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="Maroc">Maroc</option>
                          <option value="France">France</option>
                          <option value="Belgique">Belgique</option>
                          <option value="Suisse">Suisse</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Informations de paiement */}
                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Informations de paiement
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Numéro de carte *</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Date d'expiration *</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/AA"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">CVV *</label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Nom sur la carte *</label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full gold-gradient text-lg py-6"
                >
                  {loading ? 'Traitement en cours...' : `Finaliser la commande - ${getTotalPrice().toFixed(2)} €`}
                </Button>
              </form>
            </div>

            {/* Résumé de commande */}
            <div className="lg:sticky lg:top-32 h-fit">
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-4">Résumé de commande</h2>
                
                <div className="space-y-4 mb-6">
                  {cart.items?.map((item) => (
                    <div key={item.productID} className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">Quantité: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{(item.price * item.quantity).toFixed(2)} €</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Sous-total</span>
                    <span>{getTotalPrice().toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Livraison</span>
                    <span className="text-green-600">Gratuite</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold border-t pt-2">
                    <span>Total</span>
                    <span>{getTotalPrice().toFixed(2)} €</span>
                  </div>
                </div>
                
                <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>Paiement 100% sécurisé</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Truck className="w-4 h-4" />
                    <span>Livraison gratuite dès 100€</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Garantie à vie</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

