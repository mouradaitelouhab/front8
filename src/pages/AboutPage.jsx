// Page À Propos pour ALMAS & DIMAS
// Histoire, valeurs et expertise de la marque

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Diamond, 
  Award, 
  Users, 
  Globe, 
  Heart, 
  Shield,
  Sparkles,
  Crown,
  Star,
  CheckCircle
} from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { icon: Diamond, label: 'Années d\'expérience', value: '25+' },
    { icon: Award, label: 'Certifications GIA', value: '10,000+' },
    { icon: Users, label: 'Clients satisfaits', value: '50,000+' },
    { icon: Globe, label: 'Pays desservis', value: '30+' }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'Notre amour pour les diamants et la joaillerie guide chacune de nos créations.'
    },
    {
      icon: Shield,
      title: 'Confiance',
      description: 'Transparence totale sur l\'origine et la qualité de nos diamants certifiés.'
    },
    {
      icon: Crown,
      title: 'Excellence',
      description: 'Seuls les diamants de la plus haute qualité intègrent nos collections.'
    },
    {
      icon: Sparkles,
      title: 'Innovation',
      description: 'Nous combinons savoir-faire traditionnel et techniques modernes.'
    }
  ];

  const team = [
    {
      name: 'Almas Benali',
      role: 'Fondatrice & Directrice Créative',
      description: 'Experte en gemmologie avec 20 ans d\'expérience dans la joaillerie de luxe.',
      image: '/images/team/almas.jpg'
    },
    {
      name: 'Dimas El Fassi',
      role: 'Co-fondateur & Maître Joaillier',
      description: 'Artisan joaillier formé aux techniques traditionnelles marocaines et européennes.',
      image: '/images/team/dimas.jpg'
    },
    {
      name: 'Sarah Amrani',
      role: 'Responsable Qualité',
      description: 'Gemmologue certifiée GIA, garante de l\'excellence de nos diamants.',
      image: '/images/team/sarah.jpg'
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
            L'Excellence <span className="text-gradient-gold">Marocaine</span>
            <br />en Joaillerie
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Depuis 1999, ALMAS & DIMAS perpétue l'art ancestral de la joaillerie marocaine 
            en créant des pièces d'exception qui allient tradition et modernité.
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

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Notre Histoire
            </h2>
            <div className="space-y-6 text-muted-foreground">
              <p>
                Tout a commencé en 1999 dans les souks de Fès, où Almas et Dimas ont découvert 
                leur passion commune pour l'art de la joaillerie. Inspirés par les techniques 
                ancestrales marocaines et formés aux standards internationaux, ils ont fondé 
                ALMAS & DIMAS avec une vision claire : créer des bijoux d'exception qui racontent 
                une histoire.
              </p>
              <p>
                Aujourd'hui, notre atelier combine le savoir-faire traditionnel marocain avec 
                les technologies les plus avancées. Chaque pièce est créée avec une attention 
                méticuleuse aux détails, utilisant uniquement des diamants certifiés et des 
                métaux précieux de la plus haute qualité.
              </p>
              <p>
                Notre engagement envers l'excellence nous a permis de devenir une référence 
                dans la joaillerie de luxe au Maroc et à l'international, tout en préservant 
                l'authenticité et l'âme de nos créations.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl overflow-hidden">
              <img
                src="/images/about/workshop.jpg"
                alt="Atelier ALMAS & DIMAS"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center" style={{display: 'none'}}>
                <Diamond className="w-24 h-24 text-primary/50" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Nos Valeurs
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Les principes qui guident notre travail et notre relation avec nos clients
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl hover-lift"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <value.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Notre Équipe
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Les artisans passionnés qui donnent vie à vos rêves les plus précieux
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-6 hover-lift"
            >
              <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center" style={{display: 'none'}}>
                  <Users className="w-16 h-16 text-primary/50" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{member.name}</h3>
              <p className="text-primary font-medium mb-3">{member.role}</p>
              <p className="text-muted-foreground">{member.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Certifications Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Certifications & Garanties
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Votre confiance est notre priorité absolue
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Award,
              title: 'Certification GIA',
              description: 'Tous nos diamants sont certifiés par le Gemological Institute of America'
            },
            {
              icon: Shield,
              title: 'Garantie à Vie',
              description: 'Protection complète et service après-vente exceptionnel'
            },
            {
              icon: CheckCircle,
              title: 'Origine Éthique',
              description: 'Diamants issus de sources responsables et traçables'
            },
            {
              icon: Star,
              title: 'Qualité Premium',
              description: 'Sélection rigoureuse des plus beaux diamants'
            },
            {
              icon: Crown,
              title: 'Savoir-faire Artisanal',
              description: 'Création manuelle par nos maîtres joailliers'
            },
            {
              icon: Globe,
              title: 'Livraison Sécurisée',
              description: 'Transport assuré partout dans le monde'
            }
          ].map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl hover-lift"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <cert.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">{cert.title}</h3>
              <p className="text-muted-foreground">{cert.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

