// Page de commande simplifiée pour ALMAS & DIMAS avec checkout invité
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, Shield, CheckCircle, ArrowLeft, User, MapPin } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';

const CheckoutPage = () => {
  const { cart } = useCart();
  const [processing, setProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Informations personnelles
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    
    // Adresse de livraison
    shippingAddress: {
      street: '',
      city: '',
      zipCode: '',
      country: 'France'
    },
    
    // Adresse de facturation
    billingAddress: {
      street: '',
      city: '',
      zipCode: '',
      country: 'France'
    },
    
    // Options
    sameAsBilling: true,
    
    // Paiement
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const [errors, setErrors] = useState({});

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.email) newErrors.email = 'Email requis';
      if (!formData.firstName) newErrors.firstName = 'Prénom requis';
      if (!formData.lastName) newErrors.lastName = 'Nom requis';
      if (!formData.phone) newErrors.phone = 'Téléphone requis';
    }
    
    if (step === 2) {
      if (!formData.shippingAddress.street) newErrors['shippingAddress.street'] = 'Adresse requise';
      if (!formData.shippingAddress.city) newErrors['shippingAddress.city'] = 'Ville requise';
      if (!formData.shippingAddress.zipCode) newErrors['shippingAddress.zipCode'] = 'Code postal requis';
    }
    
    if (step === 3) {
      if (!formData.cardNumber) newErrors.cardNumber = 'Numéro de carte requis';
      if (!formData.expiryDate) newErrors.expiryDate = 'Date d\'expiration requise';
      if (!formData.cvv) newErrors.cvv = 'CVV requis';
      if (!formData.cardName) newErrors.cardName = 'Nom sur la carte requis';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmitOrder = async () => {
    if (!validateStep(3)) return;
    
    setProcessing(true);
    
    try {
      // Simuler le traitement de la commande
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Générer un numéro de commande
      const orderNum = 'AD' + Date.now().toString().slice(-6);
      setOrderNumber(orderNum);
      setOrderComplete(true);
      
    } catch (error) {
      console.error('Erreur lors du traitement de la commande:', error);
      alert('Erreur lors du traitement de la commande. Veuillez réessayer.');
    } finally {
      setProcessing(false);
    }
  };

  // Rediriger si le panier est vide
  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Votre panier est vide</h1>
            <p className="text-gray-600 mb-8">Ajoutez des articles à votre panier pour procéder au checkout</p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <a href="/products">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Continuer mes achats
              </a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Page de confirmation de commande
  if (orderComplete) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <CheckCircle className="w-24 h-24 mx-auto mb-6 text-green-500" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Commande confirmée !</h1>
            <p className="text-xl text-gray-600 mb-4">
              Numéro de commande: <span className="font-bold">{orderNumber}</span>
            </p>
            <p className="text-gray-600 mb-8">
              Vous recevrez un email de confirmation à {formData.email}
            </p>
            <div className="space-y-4">
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <a href="/products">Continuer mes achats</a>
              </Button>
              <div className="text-sm text-gray-600">
                <p>✓ Livraison estimée: 3-5 jours ouvrés</p>
                <p>✓ Suivi de commande par email</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Finaliser ma commande</h1>
          <Button variant="outline" onClick={() => navigate('/cart')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au panier
          </Button>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[
              { step: 1, title: 'Informations', icon: User },
              { step: 2, title: 'Livraison', icon: MapPin },
              { step: 3, title: 'Paiement', icon: CreditCard }
            ].map(({ step, title, icon: Icon }) => (
              <div key={step} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`ml-2 ${currentStep >= step ? 'text-blue-600' : 'text-gray-600'}`}>
                  {title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Étape 1: Informations personnelles */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Informations personnelles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.firstName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.lastName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button onClick={handleNextStep} className="bg-blue-600 hover:bg-blue-700">
                      Continuer
                    </Button>
                  </div>
                </div>
              )}

              {/* Étape 2: Adresse de livraison */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Adresse de livraison</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Adresse *
                      </label>
                      <input
                        type="text"
                        name="shippingAddress.street"
                        value={formData.shippingAddress.street}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors['shippingAddress.street'] ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors['shippingAddress.street'] && <p className="text-red-500 text-sm mt-1">{errors['shippingAddress.street']}</p>}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ville *
                        </label>
                        <input
                          type="text"
                          name="shippingAddress.city"
                          value={formData.shippingAddress.city}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors['shippingAddress.city'] ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors['shippingAddress.city'] && <p className="text-red-500 text-sm mt-1">{errors['shippingAddress.city']}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Code postal *
                        </label>
                        <input
                          type="text"
                          name="shippingAddress.zipCode"
                          value={formData.shippingAddress.zipCode}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors['shippingAddress.zipCode'] ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors['shippingAddress.zipCode'] && <p className="text-red-500 text-sm mt-1">{errors['shippingAddress.zipCode']}</p>}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pays
                      </label>
                      <select
                        name="shippingAddress.country"
                        value={formData.shippingAddress.country}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="France">France</option>
                        <option value="Belgique">Belgique</option>
                        <option value="Suisse">Suisse</option>
                        <option value="Luxembourg">Luxembourg</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-between">
                    <Button variant="outline" onClick={handlePreviousStep}>
                      Retour
                    </Button>
                    <Button onClick={handleNextStep} className="bg-blue-600 hover:bg-blue-700">
                      Continuer
                    </Button>
                  </div>
                </div>
              )}

              {/* Étape 3: Paiement */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Informations de paiement</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Numéro de carte *
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date d'expiration *
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/AA"
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.cvv ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom sur la carte *
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.cardName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-between">
                    <Button variant="outline" onClick={handlePreviousStep}>
                      Retour
                    </Button>
                    <Button 
                      onClick={handleSubmitOrder} 
                      disabled={processing}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {processing ? 'Traitement...' : 'Finaliser la commande'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Résumé de commande */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Résumé de la commande</h2>
              
              <div className="space-y-4 mb-6">
                {cart.items.map((item) => (
                  <div key={item.productID} className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Qté: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>{formatPrice(cart.totalPrice || 0)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span className="text-green-600">Gratuite</span>
                </div>
                
                <div className="border-t pt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{formatPrice(cart.totalPrice || 0)}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  <span>Paiement sécurisé</span>
                </div>
                <div className="flex items-center">
                  <Truck className="w-4 h-4 mr-2" />
                  <span>Livraison 3-5 jours</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>Garantie à vie</span>
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

