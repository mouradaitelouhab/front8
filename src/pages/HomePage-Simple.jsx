// Version simplifiée de la page d'accueil pour demo académique

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Star, 
  ArrowRight, 
  Award,
  Shield,
  Truck,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const HomePage = () => {
  // Collections en vedette
  const featuredCollections = [
    {
      name: "Bagues",
      description: "Élégance intemporelle",
      image: "/images/products/ring1.jpg",
      price: "À partir de 299€",
      link: "/products?category=rings"
    },
    {
      name: "Colliers",
      description: "Raffinement moderne",
      image: "/images/products/necklace1.jpg",
      price: "À partir de 199€",
      link: "/products?category=necklaces"
    },
    {
      name: "Bracelets",
      description: "Style contemporain",
      image: "/images/products/bracelet1.jpg",
      price: "À partir de 149€",
      link: "/products?category=bracelets"
    }
  ];

  // Avantages
  const benefits = [
    {
      icon: Shield,
      title: "Qualité Garantie",
      description: "Bijoux certifiés et authentiques"
    },
    {
      icon: Truck,
      title: "Livraison Gratuite",
      description: "Livraison offerte dès 100€"
    },
    {
      icon: Award,
      title: "Service Client",
      description: "Support 7j/7 pour vous accompagner"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Section Hero */}
      <section className="simple-gradient py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            ALMAS & DIMAS
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Découvrez notre collection de bijoux élégants et intemporels, 
            conçus pour sublimer vos moments précieux.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="btn-primary">
              <Link to="/products">
                Voir la Collection
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="btn-secondary">
              <Link to="/about">En Savoir Plus</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Collections en vedette */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Collections Populaires
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explorez nos collections les plus appréciées, alliant tradition et modernité.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredCollections.map((collection, index) => (
              <div key={index} className="card-shadow rounded-lg overflow-hidden hover-card">
                <div className="aspect-square bg-gray-100">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/images/placeholder.jpg';
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {collection.name}
                  </h3>
                  <p className="text-gray-600 mb-3">{collection.description}</p>
                  <p className="text-blue-600 font-medium mb-4">{collection.price}</p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={collection.link}>
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

      {/* Avantages */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Pourquoi Nous Choisir
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 primary-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à Découvrir Nos Bijoux ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Explorez notre collection complète et trouvez le bijou parfait pour vous.
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

