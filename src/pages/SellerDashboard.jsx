// Dashboard Vendeur pour ALMAS & DIMAS
// Interface de gestion pour les vendeurs avec CRUD produits

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
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
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  Store,
  Settings,
  Upload,
  Save
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '../utils/formatPrice';

const SellerDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    stockQuantity: '',
    category: '',
    images: []
  });

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
          totalProducts: 23,
          activeProducts: 21,
          totalOrders: 89,
          totalRevenue: 45670,
          ordersInPeriod: 12,
          revenueInPeriod: 8950,
          averageRating: 4.7,
          totalReviews: 156,
          pendingActions: 3,
          period: parseInt(selectedPeriod)
        },
        charts: {
          ordersByStatus: [
            { _id: 'Delivered', count: 67 },
            { _id: 'Pending', count: 12 },
            { _id: 'Confirmed', count: 8 },
            { _id: 'Cancelled', count: 2 }
          ],
          salesTrend: [
            { _id: { day: 1 }, orders: 3, revenue: 890 },
            { _id: { day: 2 }, orders: 2, revenue: 650 },
            { _id: { day: 3 }, orders: 5, revenue: 1200 },
            { _id: { day: 4 }, orders: 4, revenue: 980 },
            { _id: { day: 5 }, orders: 6, revenue: 1450 }
          ]
        },
        topProducts: [
          { productName: 'Bague Solitaire Diamant', totalSold: 12, totalRevenue: 35880, stockQuantity: 8 },
          { productName: 'Collier Perles Luxe', totalSold: 8, totalRevenue: 15200, stockQuantity: 5 },
          { productName: 'Bracelet Or 18k', totalSold: 6, totalRevenue: 11400, stockQuantity: 12 }
        ]
      };
      setDashboardData(mockData);
    } catch (error) {
      console.error('Erreur lors du chargement du dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  // Charger les produits du vendeur
  const loadProducts = async () => {
    try {
      // Simuler des données produits
      const mockProducts = [
        {
          id: '1',
          name: 'Bague Solitaire Diamant Luxe',
          description: 'Magnifique bague solitaire en or jaune 18k sertie d\'un diamant de 1 carat.',
          price: 2999,
          stockQuantity: 8,
          status: 'Active',
          category: 'Bagues',
          createdAt: new Date(),
          images: ['/api/placeholder/300/300'],
          rating: 4.8,
          reviewCount: 24
        },
        {
          id: '2',
          name: 'Collier Perles Tahiti',
          description: 'Collier en perles de Tahiti authentiques avec fermoir en or blanc.',
          price: 1899,
          stockQuantity: 5,
          status: 'Active',
          category: 'Colliers',
          createdAt: new Date(),
          images: ['/api/placeholder/300/300'],
          rating: 4.6,
          reviewCount: 18
        },
        {
          id: '3',
          name: 'Bracelet Tennis Diamants',
          description: 'Bracelet tennis avec diamants brillants, design classique et élégant.',
          price: 3499,
          stockQuantity: 3,
          status: 'Active',
          category: 'Bracelets',
          createdAt: new Date(),
          images: ['/api/placeholder/300/300'],
          rating: 4.9,
          reviewCount: 31
        }
      ];
      setProducts(mockProducts);
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error);
    }
  };

  // Ajouter/Modifier un produit
  const handleSaveProduct = async () => {
    try {
      if (editingProduct) {
        // Modifier le produit existant
        setProducts(products.map(p => 
          p.id === editingProduct.id 
            ? { ...p, ...productForm, id: editingProduct.id }
            : p
        ));
        alert('Produit modifié avec succès');
      } else {
        // Ajouter un nouveau produit
        const newProduct = {
          ...productForm,
          id: Date.now().toString(),
          status: 'Active',
          createdAt: new Date(),
          rating: 0,
          reviewCount: 0,
          images: ['/api/placeholder/300/300']
        };
        setProducts([...products, newProduct]);
        alert('Produit ajouté avec succès');
      }
      
      setShowAddProduct(false);
      setEditingProduct(null);
      setProductForm({
        name: '',
        description: '',
        price: '',
        stockQuantity: '',
        category: '',
        images: []
      });
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert('Erreur lors de la sauvegarde');
    }
  };

  // Supprimer un produit
  const deleteProduct = async (productId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      try {
        setProducts(products.filter(p => p.id !== productId));
        alert('Produit supprimé avec succès');
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression');
      }
    }
  };

  // Modifier un produit
  const editProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stockQuantity: product.stockQuantity.toString(),
      category: product.category,
      images: product.images
    });
    setShowAddProduct(true);
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
                <Store className="w-8 h-8 mr-3 text-purple-600" />
                Dashboard Vendeur
              </h1>
              <p className="text-gray-600 mt-2">
                Gérez vos produits et commandes
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
              </select>
              
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Download className="w-4 h-4 mr-2" />
                Rapport
              </Button>
            </div>
          </div>

          {/* Navigation des onglets */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {[
              { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
              { id: 'products', label: 'Mes Produits', icon: Package },
              { id: 'orders', label: 'Commandes', icon: ShoppingCart },
              { id: 'analytics', label: 'Analyses', icon: Activity }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.id === 'products') loadProducts();
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
                    <p className="text-sm text-gray-600">Mes Produits</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {dashboardData.overview.totalProducts}
                    </p>
                    <p className="text-sm text-green-600 mt-1">
                      {dashboardData.overview.activeProducts} actifs
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

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Note Moyenne</p>
                    <p className="text-2xl font-bold text-gray-900 flex items-center">
                      {dashboardData.overview.averageRating}
                      <Star className="w-5 h-5 text-yellow-400 ml-1 fill-current" />
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {dashboardData.overview.totalReviews} avis
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Actions en attente */}
            {dashboardData.overview.pendingActions > 0 && (
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 text-orange-600 mr-3" />
                  <div>
                    <p className="font-medium text-orange-900">
                      {dashboardData.overview.pendingActions} action(s) en attente
                    </p>
                    <p className="text-sm text-orange-700">
                      Vous avez des commandes qui nécessitent votre attention.
                    </p>
                  </div>
                  <Button size="sm" className="ml-auto bg-orange-600 hover:bg-orange-700">
                    Voir les commandes
                  </Button>
                </div>
              </div>
            )}

            {/* Top Produits */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Mes Produits les Plus Vendus
              </h3>
              <div className="space-y-4">
                {dashboardData.topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm font-semibold text-purple-600">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{product.productName}</p>
                        <p className="text-sm text-gray-500">
                          {product.totalSold} vendus • Stock: {product.stockQuantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold text-green-600">
                      {formatPrice(product.totalRevenue)}
                    </p>
                  </div>
                ))}
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
              <h2 className="text-2xl font-bold text-gray-900">Mes Produits</h2>
              <Button 
                onClick={() => setShowAddProduct(true)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un Produit
              </Button>
            </div>

            {/* Formulaire d'ajout/modification */}
            {showAddProduct && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {editingProduct ? 'Modifier le Produit' : 'Ajouter un Nouveau Produit'}
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom du produit
                    </label>
                    <input
                      type="text"
                      value={productForm.name}
                      onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Ex: Bague Solitaire Diamant"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Catégorie
                    </label>
                    <select
                      value={productForm.category}
                      onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Sélectionner une catégorie</option>
                      <option value="Bagues">Bagues</option>
                      <option value="Colliers">Colliers</option>
                      <option value="Bracelets">Bracelets</option>
                      <option value="Boucles d'oreilles">Boucles d'oreilles</option>
                      <option value="Montres">Montres</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prix (€)
                    </label>
                    <input
                      type="number"
                      value={productForm.price}
                      onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock
                    </label>
                    <input
                      type="number"
                      value={productForm.stockQuantity}
                      onChange={(e) => setProductForm({...productForm, stockQuantity: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="0"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={productForm.description}
                      onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Description détaillée du produit..."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Images
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Cliquez pour télécharger ou glissez-déposez vos images
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-6">
                  <Button onClick={handleSaveProduct} className="bg-purple-600 hover:bg-purple-700">
                    <Save className="w-4 h-4 mr-2" />
                    {editingProduct ? 'Modifier' : 'Ajouter'}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowAddProduct(false);
                      setEditingProduct(null);
                      setProductForm({
                        name: '',
                        description: '',
                        price: '',
                        stockQuantity: '',
                        category: '',
                        images: []
                      });
                    }}
                  >
                    Annuler
                  </Button>
                </div>
              </div>
            )}

            {/* Liste des produits */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Rechercher mes produits..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtres
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {products.map((product) => (
                  <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 line-clamp-2">
                          {product.name}
                        </h3>
                        <Badge className={
                          product.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }>
                          {product.status}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between mb-3">
                        <p className="text-lg font-bold text-purple-600">
                          {formatPrice(product.price)}
                        </p>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm text-gray-600">
                            {product.rating} ({product.reviewCount})
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <p className={`text-sm font-medium ${
                          product.stockQuantity <= 5 ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          Stock: {product.stockQuantity}
                        </p>
                        <p className="text-sm text-gray-500">{product.category}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="w-4 h-4 mr-1" />
                          Voir
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => editProduct(product)}
                        >
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;

