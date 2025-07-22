// Page d'accueil simplifiée pour ALMAS & DIMAS
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  ArrowRight, 
  Award,
  Shield,
  Truck
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  const featuredProducts = [
    {
      name: "Bagues Élégantes",
      description: "Collection de bagues raffinées",
      image: "/images/products/ring1.jpg",
      price: "À partir de 299€",
      link: "/products?category=rings"
    },
    {
      name: "Colliers Modernes",
      description: "Colliers contemporains et élégants",
      image: "/images/products/necklace1.jpg",
      price: "À partir de 199€",
      link: "/products?category=necklaces"
    },
    {
      name: "Bracelets Stylés",
      description: "Bracelets tendance et intemporels",
      image: "/images/products/bracelet1.jpg",
      price: "À partir de 149€",
      link: "/products?category=bracelets"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Qualité Garantie",
      description: "Bijoux authentiques et certifiés"
    },
    {
      icon: Truck,
      title: "Livraison Gratuite",
      description: "Livraison offerte dès 100€ d'achat"
    },
    {
      icon: Award,
      title: "Service Client",
      description: "Support disponible 7j/7"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            ALMAS & DIMAS
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Découvrez notre collection de bijoux élégants, conçus pour sublimer vos moments précieux.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link to="/products">
                Voir la Collection
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/about">En Savoir Plus</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nos Collections Populaires
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explorez nos bijoux les plus appréciés, alliant tradition et modernité.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/images/placeholder.jpg';
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-3">{product.description}</p>
                  <p className="text-blue-600 font-medium mb-4">{product.price}</p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={product.link}>
                      Découvrir
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pourquoi Nous Choisir
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à Découvrir Nos Bijoux ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Explorez notre collection complète et trouvez le bijou parfait.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/products">
              Voir Tous les Produits
              <ShoppingBag className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

