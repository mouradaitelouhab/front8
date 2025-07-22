// Footer luxueux pour Gems Revived
// Design élégant avec liens et informations importantes

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Diamond, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  Crown,
  Heart,
  Shield,
  Award
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    collections: [
      { name: 'Diamants Bruts', href: '/products?category=raw-diamonds' },
      { name: 'Bagues de Fiançailles', href: '/products?category=engagement-rings' },
      { name: 'Colliers de Luxe', href: '/products?category=necklaces' },
      { name: 'Bracelets', href: '/products?category=bracelets' },
      { name: 'Boucles d\'Oreilles', href: '/products?category=earrings' }
    ],
    services: [
      { name: 'Personnalisation', href: '/services/customization' },
      { name: 'Certification GIA', href: '/services/certification' },
      { name: 'Assurance Bijoux', href: '/services/insurance' },
      { name: 'Entretien & Réparation', href: '/services/maintenance' },
      { name: 'Expertise', href: '/services/expertise' }
    ],
    company: [
      { name: 'À Propos', href: '/about' },
      { name: 'Notre Histoire', href: '/story' },
      { name: 'Artisans', href: '/craftsmen' },
      { name: 'Carrières', href: '/careers' },
      { name: 'Presse', href: '/press' }
    ],
    support: [
      { name: 'Centre d\'Aide', href: '/help' },
      { name: 'Guide des Tailles', href: '/size-guide' },
      { name: 'Livraison', href: '/shipping' },
      { name: 'Retours', href: '/returns' },
      { name: 'Contact', href: '/contact' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/almas-dimas', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com/almas_dimas', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com/almas_dimas', label: 'Twitter' },
    { icon: Youtube, href: 'https://youtube.com/almas-dimas', label: 'YouTube' }
  ];

  const certifications = [
    { icon: Award, text: 'Certifié GIA' },
    { icon: Shield, text: 'Garantie à Vie' },
    { icon: Crown, text: 'Joaillier de Luxe' },
    { icon: Heart, text: 'Fait avec Passion' }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
      {/* Motifs de fond */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border border-purple-400 rounded-full" />
        <div className="absolute bottom-40 right-40 w-24 h-24 border border-blue-400 rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-purple-400 rounded-full" />
      </div>

      {/* Section principale */}
      <div className="relative z-10 pt-16 pb-8">
        <div className="container mx-auto px-4">
          {/* En-tête du footer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="relative mr-4"
              >
                <Diamond className="w-12 h-12 text-purple-400" />
                <motion.div
                  className="absolute inset-0 bg-purple-400 rounded-full opacity-20 blur-xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  ALMAS & DIMAS
                </h3>
                <p className="text-gray-400 text-sm">Bijoux et Diamants de Luxe</p>
              </div>
            </div>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Depuis plus de 20 ans, nous créons des bijoux d'exception qui racontent votre histoire unique. 
              Chaque pièce est conçue avec passion et expertise pour célébrer vos moments les plus précieux.
            </p>
          </motion.div>

          {/* Liens du footer */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Collections */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
                <Crown className="w-5 h-5 mr-2 text-purple-400" />
                Collections
              </h4>
              <ul className="space-y-3">
                {footerLinks.collections.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-purple-400 transition-colors duration-300 flex items-center group"
                    >
                      <motion.span
                        whileHover={{ x: 5 }}
                        className="group-hover:text-purple-400"
                      >
                        {link.name}
                      </motion.span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-blue-400" />
                Services
              </h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                    >
                      <motion.span
                        whileHover={{ x: 5 }}
                        className="group-hover:text-blue-400"
                      >
                        {link.name}
                      </motion.span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Entreprise */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-pink-400" />
                Entreprise
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-pink-400 transition-colors duration-300 flex items-center group"
                    >
                      <motion.span
                        whileHover={{ x: 5 }}
                        className="group-hover:text-pink-400"
                      >
                        {link.name}
                      </motion.span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
                <Award className="w-5 h-5 mr-2 text-yellow-400" />
                Support
              </h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 flex items-center group"
                    >
                      <motion.span
                        whileHover={{ x: 5 }}
                        className="group-hover:text-yellow-400"
                      >
                        {link.name}
                      </motion.span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Informations de contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="border-t border-gray-800 pt-12 mb-12"
          >
            <div className="grid md:grid-cols-3 gap-8">
              {/* Contact */}
              <div className="text-center md:text-left">
                <h4 className="text-lg font-semibold text-white mb-4">Contactez-nous</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-center md:justify-start">
                    <Phone className="w-5 h-5 text-purple-400 mr-3" />
                    <span className="text-gray-400">+212 5 22 12 34 56</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <Mail className="w-5 h-5 text-purple-400 mr-3" />
                    <span className="text-gray-400">contact@almas-dimas.com</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <MapPin className="w-5 h-5 text-purple-400 mr-3" />
                    <span className="text-gray-400">Casablanca, Maroc</span>
                  </div>
                </div>
              </div>

              {/* Horaires */}
              <div className="text-center">
                <h4 className="text-lg font-semibold text-white mb-4">Horaires Boutique</h4>
                <div className="space-y-2 text-gray-400">
                  <p>Lundi - Samedi: 10h - 19h</p>
                  <p>Dimanche: 14h - 18h</p>
                  <p className="text-purple-400 font-medium">Sur rendez-vous 7j/7</p>
                </div>
              </div>

              {/* Réseaux sociaux */}
              <div className="text-center md:text-right">
                <h4 className="text-lg font-semibold text-white mb-4">Suivez-nous</h4>
                <div className="flex justify-center md:justify-end space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-600 transition-all duration-300"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="border-t border-gray-800 pt-8 mb-8"
          >
            <div className="flex flex-wrap justify-center gap-8">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                >
                  <cert.icon className="w-5 h-5 text-purple-400" />
                  <span className="text-sm font-medium">{cert.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 py-6 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-gray-400 text-sm mb-4 md:mb-0"
            >
              © {currentYear} ALMAS & DIMAS. Tous droits réservés. Fait avec ❤️ au Maroc.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex space-x-6 text-sm"
            >
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Confidentialité
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                Conditions
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookies
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

