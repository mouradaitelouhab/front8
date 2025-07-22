// Page d'accueil simplifiée pour ALMAS & DIMAS avec images réalistes
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  ArrowRight, 
  Award,
  Shield,
  Truck,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  const featuredProducts = [
    {
      name: "Bagues Élégantes",
      description: "Collection de bagues raffinées en or et diamants",
      image: "/images/products/ring1.jpg",
      price: "À partir de 299€",
      rating: 4.8,
      link: "/products?category=rings"
    },
    {
      name: "Colliers Modernes",
      description: "Colliers contemporains et élégants",
      image: "/images/products/necklace1.jpg",
      price: "À partir de 199€",
      rating: 4.9,
      link: "/products?category=necklaces"
    },
    {
      name: "Bracelets Stylés",
      description: "Bracelets tendance et intemporels",
      image: "/images/products/bracelet1.jpg",
      price: "À partir de 149€",
      rating: 4.7,
      link: "/products?category=bracelets"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Qualité Garantie",
      description: "Bijoux authentiques et certifiés avec garantie à vie"
    },
    {
      icon: Truck,
      title: "Livraison Gratuite",
      description: "Livraison offerte dès 100€ d'achat partout en France"
    },
    {
      icon: Award,
      title: "Service Client",
      description: "Support disponible 7j/7 pour vous accompagner"
    }
  ];

  const testimonials = [
    {
      name: "Marie L.",
      text: "Des bijoux magnifiques, la qualité est exceptionnelle !",
      rating: 5
    },
    {
      name: "Sophie M.",
      text: "Service client parfait, livraison rapide. Je recommande !",
      rating: 5
    },
    {
      name: "Claire D.",
      text: "Ma bague de fiançailles est absolument parfaite.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section avec image de fond */}
      <section 
        className="relative bg-cover bg-center bg-no-repeat py-32"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/images/hero/hero-banner.jpg')`
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-6xl font-bold mb-6 drop-shadow-lg">
            ALMAS & DIMAS
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto drop-shadow-md">
            Découvrez notre collection de bijoux élégants, conçus pour sublimer vos moments précieux.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
              <Link to="/products">
                Voir la Collection
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">
              <Link to="/about">En Savoir Plus</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Nos Collections Populaires
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explorez nos bijoux les plus appréciés, alliant tradition et modernité dans chaque création.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {featuredProducts.map((product, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>
                  <p className="text-2xl font-bold text-blue-600 mb-6">{product.price}</p>
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
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
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Pourquoi Nous Choisir
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nous nous engageons à vous offrir la meilleure expérience d'achat de bijoux.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div key={index} className="text-center bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ce Que Disent Nos Clients
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez les témoignages de nos clients satisfaits.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-md">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold text-gray-900">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à Découvrir Nos Bijoux ?
          </h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Explorez notre collection complète et trouvez le bijou parfait qui vous ressemble.
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
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

