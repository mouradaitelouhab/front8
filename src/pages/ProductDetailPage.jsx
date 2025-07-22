import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import { useCart } from '../contexts/CartContext';
import { formatPrice } from '../utils/formatPrice';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, loading: cartLoading } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  // Charger le produit
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Loading product with ID:', id);
        const response = await productService.getProductById(id);
        console.log('Product response received:', response);
        if (response.success && response.product) {
          setProduct(response.product);
        } else {
          throw new Error(response.error || 'Product not found');
        }
      } catch (error) {
        console.error('Error loading product:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    try {
      setAddingToCart(true);
      const result = await addToCart(product.id, quantity);
      
      if (result.success) {
        alert(`${product.name} ajouté au panier avec succès!`);
      } else {
        alert(`Erreur: ${result.message}`);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Erreur lors de l\'ajout au panier');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p>Chargement du produit...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2 text-red-600">Erreur</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => navigate('/products')} 
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
          >
            Retour aux produits
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Produit non trouvé</h1>
          <p className="text-gray-600 mb-6">Le produit demandé n'existe pas.</p>
          <button 
            onClick={() => navigate('/products')} 
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
          >
            Retour aux produits
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <button 
            onClick={() => navigate('/')}
            className="hover:text-purple-600 transition-colors"
          >
            Accueil
          </button>
          <span>›</span>
          <button 
            onClick={() => navigate('/products')}
            className="hover:text-purple-600 transition-colors"
          >
            Produits
          </button>
          <span>›</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-lg">
              <img
                src={product.images?.[0] || 'https://via.placeholder.com/500x500?text=Image+Non+Disponible'}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/500x500?text=Image+Non+Disponible';
                }}
              />
            </div>
            
            {/* Thumbnail gallery */}
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-3">
                {product.images.map((image, index) => (
                  <div key={index} className="w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200">
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/80x80?text=N/A';
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${
                        i < Math.floor(product.rating) 
                          ? 'text-yellow-400' 
                          : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviewCount} avis)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-purple-600">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-semibold rounded">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Specifications */}
            {product.specifications && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Spécifications</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-gray-600 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                      </span>
                      <span className="font-medium text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-lg font-semibold">Quantité:</label>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  ({product.stockQuantity} en stock)
                </span>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-lg py-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={product.stockQuantity === 0 || addingToCart}
              >
                {addingToCart ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Ajout en cours...
                  </span>
                ) : product.stockQuantity > 0 ? (
                  '🛒 Ajouter au Panier'
                ) : (
                  'Rupture de Stock'
                )}
              </button>
            </div>

            {/* Guarantees */}
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="text-lg font-semibold mb-4">Nos Garanties</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-green-600">🛡️</span>
                  <span className="text-sm">Garantie à vie</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-blue-600">🚚</span>
                  <span className="text-sm">Livraison gratuite dès 500€</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-purple-600">💎</span>
                  <span className="text-sm">Certificat d'authenticité</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-yellow-600">↩️</span>
                  <span className="text-sm">Retour gratuit sous 30 jours</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vous Aimerez Aussi */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Vous Aimerez Aussi</h2>
          <div className="text-center text-gray-600">
            <p>Découvrez notre collection complète de bijoux et diamants</p>
            <button 
              onClick={() => navigate('/products')}
              className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Voir tous les produits
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

