// Page Contact pour ALMAS & DIMAS
// Formulaire de contact, informations et localisation

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  MessageCircle,
  Calendar,
  Award,
  Shield,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    appointmentDate: '',
    serviceType: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulation d'envoi
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        appointmentDate: '',
        serviceType: 'general'
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Adresse',
      details: [
        'Boulevard Mohammed V',
        'Quartier Gueliz, Marrakech',
        'Maroc 40000'
      ]
    },
    {
      icon: Phone,
      title: 'Téléphone',
      details: [
        '+212 5 24 43 XX XX',
        '+212 6 61 XX XX XX',
        'Service client 24/7'
      ]
    },
    {
      icon: Mail,
      title: 'Email',
      details: [
        'contact@almas-dimas.ma',
        'ventes@almas-dimas.ma',
        'support@almas-dimas.ma'
      ]
    },
    {
      icon: Clock,
      title: 'Horaires',
      details: [
        'Lun - Ven: 9h00 - 19h00',
        'Samedi: 9h00 - 18h00',
        'Dimanche: Sur rendez-vous'
      ]
    }
  ];

  const services = [
    {
      icon: MessageCircle,
      title: 'Consultation Gratuite',
      description: 'Échangez avec nos experts pour choisir la pièce parfaite'
    },
    {
      icon: Calendar,
      title: 'Rendez-vous Privé',
      description: 'Découvrez nos collections dans un cadre exclusif'
    },
    {
      icon: Award,
      title: 'Expertise & Évaluation',
      description: 'Faites évaluer vos bijoux par nos gemmologues certifiés'
    },
    {
      icon: Shield,
      title: 'Service Après-Vente',
      description: 'Maintenance, réparation et garantie à vie'
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
            Contactez-<span className="text-gradient-gold">Nous</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Nos experts sont à votre disposition pour vous accompagner dans le choix 
            de vos bijoux d'exception. Prenez rendez-vous ou contactez-nous directement.
          </p>
        </motion.div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Formulaire de contact */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 elegant-shadow"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Envoyez-nous un message
            </h2>

            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg flex items-center"
              >
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-green-800">Message envoyé avec succès !</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white/70"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white/70"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white/70"
                    placeholder="+212 6XX XXX XXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Type de service
                  </label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white/70"
                  >
                    <option value="general">Demande générale</option>
                    <option value="consultation">Consultation</option>
                    <option value="appointment">Rendez-vous</option>
                    <option value="evaluation">Évaluation</option>
                    <option value="repair">Réparation</option>
                    <option value="custom">Création sur mesure</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Sujet *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white/70"
                  placeholder="Objet de votre message"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Date souhaitée (optionnel)
                </label>
                <input
                  type="datetime-local"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white/70"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white/70 resize-none"
                  placeholder="Décrivez votre demande en détail..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full gold-gradient text-lg py-6 hover-lift"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 mr-2"
                  >
                    <Send className="w-full h-full" />
                  </motion.div>
                ) : (
                  <Send className="w-5 h-5 mr-2" />
                )}
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
              </Button>
            </form>
          </motion.div>

          {/* Informations de contact */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Informations principales */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start space-x-4 p-6 bg-white/50 backdrop-blur-sm rounded-2xl hover-lift"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{info.title}</h3>
                    <div className="space-y-1">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-muted-foreground">{detail}</p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Services disponibles */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/50 backdrop-blur-sm rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-foreground mb-6">
                Nos Services
              </h3>
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div key={service.title} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <service.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{service.title}</h4>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Carte (placeholder) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white/50 backdrop-blur-sm rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-foreground mb-4">
                Notre Localisation
              </h3>
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-primary/50 mx-auto mb-2" />
                  <p className="text-muted-foreground">Carte interactive</p>
                  <p className="text-sm text-muted-foreground">Boulevard Mohammed V, Marrakech</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

