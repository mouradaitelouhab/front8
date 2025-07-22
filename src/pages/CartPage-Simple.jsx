// Page du panier simplifiée pour ALMAS & DIMAS
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [updating, setUpdating] = useState(false);

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-gray-300" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Votre panier est vide</h1>
            <p className="text-gray-600 mb-8">Découvrez notre collection exceptionnelle de bijoux et diamants</p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link to="/products">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Continuer mes achats
              </Link>
            </Button>
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
          <h1 className="text-3xl font-bold text-gray-900">Mon Panier</h1>
          <Button variant="outline" asChild>
            <Link to="/products">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continuer mes achats
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">Articles ({cart.items.length})</h2>
                
                <div className="space-y-6">
                  {cart.items.map((item) => (
                    <div key={item.productID} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
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
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900 truncate">
                          {item.name}
                        </h3>
                        <p className="text-lg font-bold text-blue-600 mt-1">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleUpdateQuantity(item.productID, item.quantity - 1)}
                          disabled={updating || item.quantity <= 1}
                          className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() => handleUpdateQuantity(item.productID, item.quantity + 1)}
                          disabled={updating}
                          className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        <button
                          onClick={() => handleRemoveItem(item.productID)}
                          disabled={updating}
                          className="text-red-600 hover:text-red-800 mt-2 disabled:opacity-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Résumé de la commande</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>{formatPrice(cart.totalPrice || 0)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span className="text-green-600">Gratuite</span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{formatPrice(cart.totalPrice || 0)}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                  <Link to="/checkout">
                    Procéder au paiement
                  </Link>
                </Button>
                
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/products">
                    Continuer mes achats
                  </Link>
                </Button>
              </div>
              
              <div className="mt-6 text-sm text-gray-600">
                <p>✓ Livraison gratuite dès 100€</p>
                <p>✓ Retours gratuits sous 30 jours</p>
                <p>✓ Garantie à vie</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

