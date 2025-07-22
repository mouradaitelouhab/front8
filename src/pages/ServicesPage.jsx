// Page Services pour ALMAS & DIMAS
// Présentation de tous les services offerts

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Diamond, 
  Crown, 
  Shield, 
  Award, 
  Sparkles,
  Heart,
  Settings,
  Eye,
  Truck,
  RotateCcw,
  Calendar,
  MessageCircle,
  Star,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ServicesPage = () => {
  const navigate = useNavigate();

  const mainServices = [
    {
      icon: Crown,
      title: 'Création Sur Mesure',
      description: 'Donnez vie à vos rêves les plus précieux avec nos créations uniques.',
      features: [
        'Consultation personnalisée',
        'Design 3D et prototypage',
        'Sélection de diamants certifiés',
        'Fabrication artisanale',
        'Suivi complet du projet'
      ],
      price: 'À partir de 50,000 MAD',
      duration: '4-8 semaines',
      image: '/images/services/custom.jpg'
    },
    {
      icon: Eye,
      title: 'Expertise & Évaluation',
      description: 'Faites évaluer vos bijoux par nos gemmologues certifiés GIA.',
      features: [
        'Évaluation professionnelle',
        'Certificat d\'authenticité',
        'Estimation de valeur',
        'Conseils de conservation',
        'Rapport détaillé'
      ],
      price: 'À partir de 500 MAD',
      duration: '24-48 heures',
      image: '/images/services/expertise.jpg'
    },
    {
      icon: Settings,
      title: 'Réparation & Restauration',
      description: 'Redonnez éclat et beauté à vos bijoux les plus précieux.',
      features: [
        'Diagnostic gratuit',
        'Réparation de montures',
        'Polissage et nettoyage',
        'Remplacement de pierres',
        'Garantie sur les réparations'
      ],
      price: 'À partir de 200 MAD',
      duration: '1-3 semaines',
      image: '/images/services/repair.jpg'
    },
    {
      icon: Sparkles,
      title: 'Transformation & Modernisation',
      description: 'Transformez vos anciens bijoux en créations contemporaines.',
      features: [
        'Analyse de faisabilité',
        'Nouveaux designs proposés',
        'Récupération des matériaux',
        'Création moderne',
        'Garantie de satisfaction'
      ],
      price: 'À partir de 30,000 MAD',
      duration: '3-6 semaines',
      image: '/images/services/transformation.jpg'
    }
  ];

  const additionalServices = [
    {
      icon: Shield,
      title: 'Garantie à Vie',
      description: 'Protection complète pour tous vos achats ALMAS & DIMAS'
    },
    {
      icon: Truck,
      title: 'Livraison Sécurisée',
      description: 'Transport assuré partout au Maroc et à l\'international'
    },
    {
      icon: RotateCcw,
      title: 'Retour 30 Jours',
      description: 'Échange ou remboursement sans condition'
    },
    {
      icon: Calendar,
      title: 'Rendez-vous VIP',
      description: 'Consultation privée dans notre showroom exclusif'
    },
    {
      icon: MessageCircle,
      title: 'Conseil Expert',
      description: 'Accompagnement personnalisé par nos spécialistes'
    },
    {
      icon: Award,
      title: 'Certification GIA',
      description: 'Tous nos diamants sont certifiés par les meilleurs laboratoires'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Consultation',
      description: 'Échangez avec nos experts pour définir vos besoins et envies'
    },
    {
      step: '02',
      title: 'Conception',
      description: 'Création du design et sélection des matériaux précieux'
    },
    {
      step: '03',
      title: 'Fabrication',
      description: 'Réalisation artisanale par nos maîtres joailliers'
    },
    {
      step: '04',
      title: 'Livraison',
      description: 'Présentation de votre pièce unique et livraison sécurisée'
    }
  ];

  return (
    <div className="min-h-screen elegant-gradient pt-32">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Nos <span className="text-gradient-gold">Services</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            De la création sur mesure à l'expertise gemmologique, découvrez notre gamme 
            complète de services dédiés à l'excellence en joaillerie.
          </p>
          <div className="flex justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 text-primary"
            >
              <Diamond className="w-full h-full" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Services principaux */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Services Premium
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Des services d'exception pour répondre à tous vos besoins en joaillerie
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {mainServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/50 backdrop-blur-sm rounded-2xl overflow-hidden hover-lift elegant-shadow"
            >
              {/* Image */}
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center" style={{display: 'none'}}>
                  <service.icon className="w-16 h-16 text-primary/50" />
                </div>
                <div className="absolute top-4 left-4">
                  <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </div>

              {/* Contenu */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>

                {/* Caractéristiques */}
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Informations pratiques */}
                <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-background/50 rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Prix</p>
                    <p className="font-medium text-primary">{service.price}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Délai</p>
                    <p className="font-medium">{service.duration}</p>
                  </div>
                </div>

                {/* Action */}
                <Button 
                  onClick={() => navigate('/contact')}
                  className="w-full gold-gradient hover-lift"
                >
                  Demander un devis
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services additionnels */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Services Inclus
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Bénéficiez de services exceptionnels inclus avec tous vos achats
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {additionalServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl hover-lift"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <service.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Processus */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Notre Processus
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            De l'idée à la réalisation, découvrez les étapes de création de votre bijou unique
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {process.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center relative"
            >
              {/* Ligne de connexion */}
              {index < process.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary to-accent transform translate-x-4 -translate-y-1/2" />
              )}
              
              {/* Numéro d'étape */}
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-xl">
                {step.step}
              </div>
              
              <h3 className="text-lg font-bold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Prêt à Créer Votre Bijou Unique ?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contactez nos experts pour discuter de votre projet et obtenir un devis personnalisé.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/contact')}
              className="gold-gradient text-lg px-8 py-6 hover-lift"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Prendre rendez-vous
            </Button>
            <Button 
              onClick={() => navigate('/products')}
              variant="outline" 
              className="text-lg px-8 py-6 hover-lift"
            >
              <Diamond className="w-5 h-5 mr-2" />
              Voir nos créations
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default ServicesPage;

