// Page Commandes pour ALMAS & DIMAS
// Historique et suivi des commandes de l'utilisateur

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  Eye, 
  Download,
  Diamond,
  Star,
  ArrowRight,
  Filter,
  Calendar,
  CreditCard,
  MapPin,
  Phone,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const OrdersPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Données de démonstration - à remplacer par des appels API réels
  const mockOrders = [
    {
      id: 'CMD-2024-001',
      date: '2024-01-15',
      status: 'delivered',
      statusText: 'Livré',
      total: 45000,
      items: [
        {
          id: 1,
          name: 'Bague Solitaire Éternité',
          price: 45000,
          quantity: 1,
          image: '/images/products/ring-1.jpg'
        }
      ],
      shipping: {
        address: '123 Rue Mohammed V, Casablanca, Maroc',
        method: 'Livraison Express',
        trackingNumber: 'TRK123456789',
        estimatedDelivery: '2024-01-18'
      },
      payment: {
        method: 'Carte bancaire',
        last4: '1234',
        status: 'paid'
      }
    },
    {
      id: 'CMD-2024-002',
      date: '2024-01-20',
      status: 'shipped',
      statusText: 'Expédié',
      total: 85000,
      items: [
        {
          id: 2,
          name: 'Collier Diamant Royal',
          price: 85000,
          quantity: 1,
          image: '/images/products/necklace-1.jpg'
        }
      ],
      shipping: {
        address: '456 Avenue Hassan II, Rabat, Maroc',
        method: 'Livraison Standard',
        trackingNumber: 'TRK987654321',
        estimatedDelivery: '2024-01-25'
      },
      payment: {
        method: 'Virement bancaire',
        status: 'paid'
      }
    },
    {
      id: 'CMD-2024-003',
      date: '2024-01-22',
      status: 'processing',
      statusText: 'En préparation',
      total: 32000,
      items: [
        {
          id: 3,
          name: 'Boucles d\'Oreilles Prestige',
          price: 32000,
          quantity: 1,
          image: '/images/products/earrings-1.jpg'
        }
      ],
      shipping: {
        address: '789 Boulevard Zerktouni, Marrakech, Maroc',
        method: 'Livraison Express',
        estimatedDelivery: '2024-01-28'
      },
      payment: {
        method: 'Carte bancaire',
        last4: '5678',
        status: 'paid'
      }
    }
  ];

  useEffect(() => {
    // Simuler le chargement des données
    const loadOrders = async () => {
      setLoading(true);
      // Ici, vous feriez un appel API pour récupérer les commandes de l'utilisateur
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOrders(mockOrders);
      setLoading(false);
    };

    if (user) {
      loadOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredOrders = orders.filter(order => {
    if (filterStatus === 'all') return true;
    return order.status === filterStatus;
  });

  if (!user) {
    return (
      <div className="min-h-screen elegant-gradient pt-32 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <Package className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Connectez-vous pour voir vos commandes
          </h1>
          <p className="text-muted-foreground mb-6">
            Suivez l'état de vos commandes et votre historique d'achats
          </p>
          <Button onClick={() => navigate('/login')} className="w-full">
            Se connecter
          </Button>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen elegant-gradient pt-32 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 text-primary"
        >
          <Diamond className="w-full h-full" />
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
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Mes <span className="text-gradient-gold">Commandes</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            {orders.length} commande{orders.length !== 1 ? 's' : ''} dans votre historique
          </p>
        </motion.div>

        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto"
          >
            <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Aucune commande trouvée
            </h2>
            <p className="text-muted-foreground mb-6">
              Vous n'avez pas encore passé de commande. Explorez notre collection pour trouver le bijou parfait.
            </p>
            <Button onClick={() => navigate('/products')} className="w-full">
              Découvrir nos bijoux
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        ) : (
          <>
            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 mb-8"
            >
              <Filter className="w-5 h-5 text-muted-foreground" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 bg-white/50 backdrop-blur-sm border border-border rounded-lg"
              >
                <option value="all">Toutes les commandes</option>
                <option value="processing">En préparation</option>
                <option value="shipped">Expédiées</option>
                <option value="delivered">Livrées</option>
              </select>
            </motion.div>

            {/* Orders List */}
            <div className="space-y-6">
              {filteredOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 hover-lift"
                >
                  {/* Order Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.statusText}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Commande #{order.id}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-foreground">
                        {formatPrice(order.total)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(order.date)}
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div 
                            className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center" 
                            style={{display: 'none'}}
                          >
                            <Diamond className="w-8 h-8 text-primary/50" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground truncate">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Quantité: {item.quantity} • {formatPrice(item.price)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Details */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Shipping Info */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Livraison
                      </h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>{order.shipping.address}</p>
                        <p>Méthode: {order.shipping.method}</p>
                        {order.shipping.trackingNumber && (
                          <p>Suivi: {order.shipping.trackingNumber}</p>
                        )}
                        <p>Livraison prévue: {formatDate(order.shipping.estimatedDelivery)}</p>
                      </div>
                    </div>

                    {/* Payment Info */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        Paiement
                      </h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>Méthode: {order.payment.method}</p>
                        {order.payment.last4 && (
                          <p>Carte: •••• •••• •••• {order.payment.last4}</p>
                        )}
                        <p className="text-green-600 font-medium">✓ Paiement confirmé</p>
                      </div>
                    </div>
                  </div>

                  {/* Order Actions */}
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedOrder(order)}
                      className="flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Voir les détails
                    </Button>
                    
                    {order.status === 'shipped' && order.shipping.trackingNumber && (
                      <Button
                        variant="outline"
                        onClick={() => window.open(`https://track.example.com/${order.shipping.trackingNumber}`, '_blank')}
                        className="flex items-center gap-2"
                      >
                        <Truck className="w-4 h-4" />
                        Suivre le colis
                      </Button>
                    )}

                    {order.status === 'delivered' && (
                      <Button
                        variant="outline"
                        onClick={() => {/* Télécharger la facture */}}
                        className="flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Télécharger la facture
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      onClick={() => navigate(`/products/${order.items[0].id}`)}
                      className="flex items-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Racheter
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;

