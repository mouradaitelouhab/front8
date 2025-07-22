// Dashboard Administrateur pour ALMAS & DIMAS
// Interface complète de gestion avec statistiques et CRUD

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  Crown,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '../utils/formatPrice';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('30');

  // Charger les données du dashboard
  useEffect(() => {
    loadDashboardData();
  }, [selectedPeriod]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      // Simuler des données pour la démonstration
      const mockData = {
        overview: {
          totalUsers: 1247,
          totalProducts: 89,
          totalOrders: 342,
          totalRevenue: 125890,
          newUsers: 23,
          ordersInPeriod: 45,
          revenueInPeriod: 18750,
          period: parseInt(selectedPeriod)
        },
        charts: {
          usersByRole: [
            { _id: 'Buyer', count: 1089 },
            { _id: 'Seller', count: 145 },
            { _id: 'Admin', count: 13 }
          ],
          ordersByStatus: [
            { _id: 'Delivered', count: 234 },
            { _id: 'Pending', count: 67 },
            { _id: 'Confirmed', count: 28 },
            { _id: 'Cancelled', count: 13 }
          ],
          salesTrend: [
            { _id: { day: 1 }, orders: 12, revenue: 3450 },
            { _id: { day: 2 }, orders: 8, revenue: 2890 },
            { _id: { day: 3 }, orders: 15, revenue: 4200 },
            { _id: { day: 4 }, orders: 11, revenue: 3100 },
            { _id: { day: 5 }, orders: 18, revenue: 5200 }
          ]
        },
        topLists: {
          topProducts: [
            { productName: 'Bague Solitaire Diamant', totalSold: 45, totalRevenue: 134550 },
            { productName: 'Collier Perles Luxe', totalSold: 32, totalRevenue: 96000 },
            { productName: 'Bracelet Or 18k', totalSold: 28, totalRevenue: 84000 }
          ],
          topSellers: [
            { sellerName: 'Marie Dubois', totalOrders: 67, totalRevenue: 89450 },
            { sellerName: 'Pierre Martin', totalOrders: 54, totalRevenue: 72300 },
            { sellerName: 'Sophie Laurent', totalOrders: 43, totalRevenue: 65200 }
          ]
        }
      };
      setDashboardData(mockData);
    } catch (error) {
      console.error('Erreur lors du chargement du dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  // Charger les produits
  const loadProducts = async () => {
    try {
      // Simuler des données produits
      const mockProducts = [
        {
          id: '1',
          name: 'Bague Solitaire Diamant Luxe',
          price: 2999,
          stockQuantity: 12,
          status: 'Active',
          category: 'Bagues',
          seller: 'Marie Dubois',
          createdAt: new Date(),
          images: ['/api/placeholder/300/300']
        },
        {
          id: '2',
          name: 'Collier Perles Tahiti',
          price: 1899,
          stockQuantity: 8,
          status: 'Active',
          category: 'Colliers',
          seller: 'Pierre Martin',
          createdAt: new Date(),
          images: ['/api/placeholder/300/300']
        }
      ];
      setProducts(mockProducts);
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error);
    }
  };

  // Charger les utilisateurs
  const loadUsers = async () => {
    try {
      // Simuler des données utilisateurs
      const mockUsers = [
        {
          id: '1',
          username: 'marie.dubois',
          email: 'marie@example.com',
          role: 'Seller',
          status: 'Active',
          createdAt: new Date(),
          totalOrders: 67,
          totalRevenue: 89450
        },
        {
          id: '2',
          username: 'jean.client',
          email: 'jean@example.com',
          role: 'Buyer',
          status: 'Active',
          createdAt: new Date(),
          totalOrders: 12,
          totalSpent: 15600
        }
      ];
      setUsers(mockUsers);
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs:', error);
    }
  };

  // Supprimer un produit
  const deleteProduct = async (productId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      try {
        // Simuler la suppression
        setProducts(products.filter(p => p.id !== productId));
        alert('Produit supprimé avec succès');
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression');
      }
    }
  };

  // Supprimer un utilisateur
  const deleteUser = async (userId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        // Simuler la suppression
        setUsers(users.filter(u => u.id !== userId));
        alert('Utilisateur supprimé avec succès');
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Crown className="w-8 h-8 mr-3 text-purple-600" />
                Dashboard Administrateur
              </h1>
              <p className="text-gray-600 mt-2">
                Gérez votre plateforme ALMAS & DIMAS
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="7">7 derniers jours</option>
                <option value="30">30 derniers jours</option>
                <option value="90">90 derniers jours</option>
                <option value="365">1 an</option>
              </select>
              
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>

          {/* Navigation des onglets */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {[
              { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
              { id: 'products', label: 'Produits', icon: Package },
              { id: 'users', label: 'Utilisateurs', icon: Users },
              { id: 'orders', label: 'Commandes', icon: ShoppingCart },
              { id: 'analytics', label: 'Analyses', icon: PieChart }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.id === 'products') loadProducts();
                  if (tab.id === 'users') loadUsers();
                }}
                className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Contenu des onglets */}
        {activeTab === 'overview' && dashboardData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Cartes de statistiques */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Utilisateurs Total</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {dashboardData.overview.totalUsers.toLocaleString()}
                    </p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +{dashboardData.overview.newUsers} ce mois
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Produits</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {dashboardData.overview.totalProducts}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Catalogue actif
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Commandes</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {dashboardData.overview.totalOrders}
                    </p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +{dashboardData.overview.ordersInPeriod} ce mois
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Revenus</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatPrice(dashboardData.overview.totalRevenue)}
                    </p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +{formatPrice(dashboardData.overview.revenueInPeriod)} ce mois
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Graphiques et listes */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Top Produits */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Produits les Plus Vendus
                </h3>
                <div className="space-y-4">
                  {dashboardData.topLists.topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-sm font-semibold text-purple-600">
                            {index + 1}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{product.productName}</p>
                          <p className="text-sm text-gray-500">{product.totalSold} vendus</p>
                        </div>
                      </div>
                      <p className="font-semibold text-green-600">
                        {formatPrice(product.totalRevenue)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Vendeurs */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Meilleurs Vendeurs
                </h3>
                <div className="space-y-4">
                  {dashboardData.topLists.topSellers.map((seller, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-sm font-semibold text-blue-600">
                            {index + 1}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{seller.sellerName}</p>
                          <p className="text-sm text-gray-500">{seller.totalOrders} commandes</p>
                        </div>
                      </div>
                      <p className="font-semibold text-green-600">
                        {formatPrice(seller.totalRevenue)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Onglet Produits */}
        {activeTab === 'products' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Gestion des Produits</h2>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un Produit
              </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Rechercher des produits..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtres
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Produit
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Prix
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vendeur
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-10 h-10 rounded-lg object-cover mr-3"
                            />
                            <div>
                              <p className="font-medium text-gray-900">{product.name}</p>
                              <p className="text-sm text-gray-500">{product.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="font-semibold text-gray-900">
                            {formatPrice(product.price)}
                          </p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className={`font-medium ${
                            product.stockQuantity <= 5 ? 'text-red-600' : 'text-gray-900'
                          }`}>
                            {product.stockQuantity}
                          </p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={
                            product.status === 'Active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }>
                            {product.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-gray-900">{product.seller}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => deleteProduct(product.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Onglet Utilisateurs */}
        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Gestion des Utilisateurs</h2>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un Utilisateur
              </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Rechercher des utilisateurs..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="">Tous les rôles</option>
                    <option value="Buyer">Acheteurs</option>
                    <option value="Seller">Vendeurs</option>
                    <option value="Admin">Administrateurs</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Utilisateur
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rôle
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Commandes
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <p className="font-medium text-gray-900">{user.username}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={
                            user.role === 'Admin' 
                              ? 'bg-purple-100 text-purple-800'
                              : user.role === 'Seller'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }>
                            {user.role}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={
                            user.status === 'Active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }>
                            {user.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-gray-900">{user.totalOrders}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="font-semibold text-gray-900">
                            {formatPrice(user.totalRevenue || user.totalSpent || 0)}
                          </p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => deleteUser(user.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

