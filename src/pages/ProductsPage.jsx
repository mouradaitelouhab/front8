// Page des produits époustouflante pour ALMAS & DIMAS
// Affichage et filtrage des bijoux et diamants avec design luxueux

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Diamond, 
  Filter, 
  Grid, 
  List, 
  Search, 
  Star, 
  Heart, 
  ShoppingBag,
  SlidersHorizontal,
  X,
  ChevronDown,
  Sparkles,
  Crown,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '../utils/formatPrice';
import { productService } from '../services/productService';
import { useCart } from '../contexts/CartContext';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'newest'
  });
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
  const [categories] = useState([
    { id: 'rings', name: 'Bagues', icon: '💍' },
    { id: 'necklaces', name: 'Colliers', icon: '📿' },
    { id: 'earrings', name: 'Boucles d\'Oreilles', icon: '👂' },
    { id: 'bracelets', name: 'Bracelets', icon: '⌚' },
    { id: 'watches', name: 'Montres', icon: '⌚' },
    { id: 'sets', name: 'Parures', icon: '💎' }
  ]);

  const { addToCart } = useCart();

  // Charger les produits
  useEffect(() => {
    loadProducts();
  }, [filters]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const result = await productService.getAllProducts(filters);
      if (result.success) {
        setProducts(result.products);
      } else {
        console.error('Failed to load products:', result.error);
        setProducts([]);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Gestion des filtres
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Mettre à jour l'URL
    const newSearchParams = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) newSearchParams.set(k, v);
    });
    setSearchParams(newSearchParams);
  };

  // Réinitialiser les filtres
  const resetFilters = () => {
    setFilters({
      category: '',
      search: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'newest'
    });
    setSearchParams({});
  };

  // Ajouter au panier
  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, 1);
      // Afficher une notification de succès
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error);
    }
  };

  // Fonction pour appliquer les filtres
  const applyFilters = () => {
    // Logic for applying filters would go here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32">
      {/* En-tête */}
      <div className="container mx-auto px-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Nos <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Collections</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre sélection exceptionnelle de bijoux et diamants de luxe, 
            chaque pièce étant soigneusement sélectionnée pour sa beauté et sa qualité
          </p>
        </motion.div>

        {/* Barre de recherche et filtres */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Recherche */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher des bijoux..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white shadow-sm"
              />
            </div>
          </div>

          {/* Contrôles */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl border-gray-200 hover:border-purple-300"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtres
              {Object.values(filters).some(v => v && v !== 'newest') && (
                <Badge className="bg-purple-600 text-white text-xs">
                  {Object.values(filters).filter(v => v && v !== 'newest').length}
                </Badge>
              )}
            </Button>

            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            >
              <option value="newest">Plus récents</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="rating">Mieux notés</option>
            </select>

            <div className="flex border border-gray-200 rounded-2xl overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Panneau de filtres */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Filter className="w-5 h-5 mr-2 text-purple-600" />
                  Filtres
                </h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetFilters}
                    className="text-gray-600"
                  >
                    Réinitialiser
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFilters(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Catégories */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Catégories</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleFilterChange('category', '')}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        !filters.category ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-50'
                      }`}
                    >
                      Toutes les catégories
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleFilterChange('category', category.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center ${
                          filters.category === category.id ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-50'
                        }`}
                      >
                        <span className="mr-2">{category.icon}</span>
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Prix */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Prix</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Prix minimum</label>
                      <input
                        type="number"
                        placeholder="0"
                        value={filters.minPrice}
                        onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Prix maximum</label>
                      <input
                        type="number"
                        placeholder="50000"
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Filtres rapides */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Filtres rapides</h4>
                  <div className="space-y-2">
                    {[
                      { label: 'En vedette', value: 'featured' },
                      { label: 'Meilleures ventes', value: 'bestseller' },
                      { label: 'Luxe', value: 'luxury' },
                      { label: 'Nouveautés', value: 'new' }
                    ].map((quick) => (
                      <button
                        key={quick.value}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        {quick.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Résultats */}
      <div className="container mx-auto px-4">
        {/* Compteur de résultats */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-900">{products.length}</span> produits trouvés
          </p>
          
          {Object.values(filters).some(v => v && v !== 'newest') && (
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              className="text-purple-600 border-purple-200 hover:bg-purple-50"
            >
              Effacer les filtres
            </Button>
          )}
        </div>

        {/* Grille de produits */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="aspect-square bg-gray-200 animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3" />
                  <div className="h-5 bg-gray-200 rounded animate-pulse w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            layout
            className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1 max-w-4xl mx-auto'
            }`}
          >
            <AnimatePresence>
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  {/* Image */}
                  <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-64 flex-shrink-0' : 'aspect-square'}`}>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Overlay avec actions */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex gap-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-red-500 transition-colors"
                        >
                          <Heart className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAddToCart(product.id)}
                          className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-purple-600 transition-colors"
                        >
                          <ShoppingBag className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.featured && (
                        <Badge className="bg-purple-600 text-white">
                          <Crown className="w-3 h-3 mr-1" />
                          Vedette
                        </Badge>
                      )}
                      {product.originalPrice > product.price && (
                        <Badge className="bg-red-500 text-white">
                          -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="p-4 flex-1">
                    <Link to={`/products/${product.id}`} className="block">
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Note et avis */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {product.rating} ({product.reviewCount})
                      </span>
                    </div>

                    {/* Prix */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl font-bold text-purple-600">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* Spécifications clés */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {product.specifications.metal && (
                        <Badge variant="outline" className="text-xs">
                          {product.specifications.metal}
                        </Badge>
                      )}
                      {product.specifications.caratWeight && (
                        <Badge variant="outline" className="text-xs">
                          {product.specifications.caratWeight}
                        </Badge>
                      )}
                    </div>

                    {/* Bouton d'action */}
                    <Button
                      onClick={() => handleAddToCart(product.id)}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                      disabled={product.stockQuantity <= 0}
                    >
                      {product.stockQuantity > 0 ? (
                        <>
                          <ShoppingBag className="w-4 h-4 mr-2" />
                          Ajouter au Panier
                        </>
                      ) : (
                        'Rupture de Stock'
                      )}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Message si aucun produit */}
        {!loading && products.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Diamond className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Aucun produit trouvé</h3>
            <p className="text-gray-600 mb-6">
              Essayez de modifier vos critères de recherche ou de navigation.
            </p>
            <Button
              onClick={resetFilters}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              Voir tous les produits
            </Button>
          </motion.div>
        )}
      </div>

      {/* Section CTA */}
      <section className="mt-20 py-16 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Besoin d'Aide pour Choisir ?
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Nos experts en joaillerie sont là pour vous conseiller et vous aider à trouver la pièce parfaite.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-4"
              >
                <Award className="w-5 h-5 mr-2" />
                Consultation Gratuite
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Personnalisation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;

