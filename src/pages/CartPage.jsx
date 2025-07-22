import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    try {
      setUpdating(true);
      await updateQuantity(itemId, newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setUpdating(false);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      setUpdating(true);
      await removeFromCart(itemId);
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setUpdating(false);
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir vider votre panier ?')) {
      try {
        setUpdating(true);
        // For demo purposes, we'll implement this in the context
        console.log('Clear cart functionality would be implemented here');
      } catch (error) {
        console.error('Error clearing cart:', error);
      } finally {
        setUpdating(false);
      }
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen pt-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-gray-300" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Votre panier est vide</h1>
            <p className="text-gray-600 mb-8">Découvrez notre collection exceptionnelle de bijoux et diamants</p>
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Continuer mes achats
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mon Panier</h1>
          <button
            onClick={clearCart}
            disabled={updating}
            className="text-red-600 hover:text-red-700 font-medium disabled:opacity-50"
          >
            Vider le panier
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {cart.items.map((item, index) => (
                <div key={`${item.id}-${index}`} className="p-6 border-b border-gray-200 last:border-b-0">
                  <div className="flex items-center space-x-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = '/images/placeholder.jpg';
                        }}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 truncate">{item.name}</h3>
                      <p className="text-purple-600 font-semibold mt-1">{formatPrice(item.price)}</p>
                      {item.options && Object.keys(item.options).length > 0 && (
                        <div className="mt-2 text-sm text-gray-500">
                          {Object.entries(item.options).map(([key, value]) => (
                            <span key={key} className="mr-4">
                              {key}: {value}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={updating || item.quantity <= 1}
                        className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={updating || item.quantity >= item.stockQuantity}
                        className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      disabled={updating}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full disabled:opacity-50"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Résumé de la commande</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Sous-total</span>
                  <span>{formatPrice(cart.subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>TVA (20%)</span>
                  <span>{formatPrice(cart.tax)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Livraison</span>
                  <span>{cart.shipping === 0 ? 'Gratuite' : formatPrice(cart.shipping)}</span>
                </div>
                {cart.shipping === 0 && cart.subtotal > 50000 && (
                  <p className="text-sm text-green-600">
                    ✓ Livraison gratuite pour les commandes supérieures à 500 MAD
                  </p>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Total</span>
                    <span>{formatPrice(cart.total)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Procéder au paiement
                </button>
                <Link
                  to="/products"
                  className="w-full block text-center bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Continuer mes achats
                </Link>
              </div>

              <div className="mt-6 text-sm text-gray-500">
                <p>• Paiement sécurisé</p>
                <p>• Livraison assurée</p>
                <p>• Garantie à vie</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

