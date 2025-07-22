// Page Liste de Souhaits pour ALMAS & DIMAS
// Gestion des produits favoris de l'utilisateur

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  ShoppingCart, 
  Eye, 
  Trash2, 
  Diamond,
  Star,
  ArrowRight,
  Filter,
  Grid,
  List,
  SortAsc
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const WishlistPage = () => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('dateAdded');
  const [filterBy, setFilterBy] = useState('all');

  // Données de démonstration - à remplacer par des appels API réels
  const mockWishlistItems = [
    {
      id: 1,
      name: 'Bague Solitaire Éternité',
      price: 45000,
      originalPrice: 50000,
      image: '/images/products/ring-1.jpg',
      category: 'Bagues',
      rating: 4.9,
      reviewCount: 127,
      inStock: true,
      dateAdded: '2024-01-15',
      description: 'Magnifique solitaire en or blanc 18k avec diamant certifié GIA'
    },
    {
      id: 2,
      name: 'Collier Diamant Royal',
      price: 85000,
      originalPrice: 95000,
      image: '/images/products/necklace-1.jpg',
      category: 'Colliers',
      rating: 5.0,
      reviewCount: 89,
      inStock: true,
      dateAdded: '2024-01-10',
      description: 'Collier en or rose avec diamants taille brillant'
    },
    {
      id: 3,
      name: 'Boucles d\'Oreilles Prestige',
      price: 32000,
      originalPrice: 35000,
      image: '/images/products/earrings-1.jpg',
      category: 'Boucles d\'Oreilles',
      rating: 4.8,
      reviewCount: 156,
      inStock: false,
      dateAdded: '2024-01-05',
      description: 'Boucles d\'oreilles pendantes en or blanc et diamants'
    }
  ];

  useEffect(() => {
    // Simuler le chargement des données
    const loadWishlist = async () => {
      setLoading(true);
      // Ici, vous feriez un appel API pour récupérer la wishlist de l'utilisateur
      await new Promise(resolve => setTimeout(resolve, 1000));
      setWishlistItems(mockWishlistItems);
      setLoading(false);
    };

    if (user) {
      loadWishlist();
    } else {
      setLoading(false);
    }
  }, [user]);

  const removeFromWishlist = (itemId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const sortedAndFilteredItems = wishlistItems
    .filter(item => {
      if (filterBy === 'all') return true;
      if (filterBy === 'inStock') return item.inStock;
      if (filterBy === 'outOfStock') return !item.inStock;
      return item.category.toLowerCase() === filterBy.toLowerCase();
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'priceAsc':
          return a.price - b.price;
        case 'priceDesc':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'dateAdded':
        default:
          return new Date(b.dateAdded) - new Date(a.dateAdded);
      }
    });

  if (!user) {
    return (
      <div className="min-h-screen elegant-gradient pt-32 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <Heart className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Connectez-vous pour voir votre liste de souhaits
          </h1>
          <p className="text-muted-foreground mb-6">
            Sauvegardez vos bijoux préférés et retrouvez-les facilement
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
            Ma Liste de <span className="text-gradient-gold">Souhaits</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            {wishlistItems.length} bijou{wishlistItems.length !== 1 ? 'x' : ''} dans votre sélection
          </p>
        </motion.div>

        {wishlistItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto"
          >
            <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Votre liste de souhaits est vide
            </h2>
            <p className="text-muted-foreground mb-6">
              Explorez notre collection et ajoutez vos bijoux préférés à votre liste de souhaits
            </p>
            <Button onClick={() => navigate('/products')} className="w-full">
              Découvrir nos bijoux
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        ) : (
          <>
            {/* Filters and Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap items-center justify-between gap-4 mb-8"
            >
              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-white/50 backdrop-blur-sm border border-border rounded-lg"
                >
                  <option value="dateAdded">Date d'ajout</option>
                  <option value="priceAsc">Prix croissant</option>
                  <option value="priceDesc">Prix décroissant</option>
                  <option value="name">Nom A-Z</option>
                </select>

                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="px-4 py-2 bg-white/50 backdrop-blur-sm border border-border rounded-lg"
                >
                  <option value="all">Tous les produits</option>
                  <option value="inStock">En stock</option>
                  <option value="outOfStock">Rupture de stock</option>
                  <option value="bagues">Bagues</option>
                  <option value="colliers">Colliers</option>
                  <option value="boucles d'oreilles">Boucles d'Oreilles</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>

            {/* Wishlist Items */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {sortedAndFilteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white/50 backdrop-blur-sm rounded-2xl overflow-hidden hover-lift ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'}`}>
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
                      <Diamond className="w-16 h-16 text-primary/50" />
                    </div>
                    
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-bold">Rupture de stock</span>
                      </div>
                    )}

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>

                  <div className="p-6 flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-foreground">{item.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-muted-foreground">
                          {item.rating} ({item.reviewCount})
                        </span>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm mb-4">{item.description}</p>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl font-bold text-foreground">
                        {formatPrice(item.price)}
                      </span>
                      {item.originalPrice > item.price && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(item.originalPrice)}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => navigate(`/products/${item.id}`)}
                        variant="outline"
                        className="flex-1"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Voir
                      </Button>
                      <Button
                        onClick={() => handleAddToCart(item)}
                        disabled={!item.inStock}
                        className="flex-1"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Ajouter
                      </Button>
                    </div>
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

export default WishlistPage;

