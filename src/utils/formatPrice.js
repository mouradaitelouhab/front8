// Utilitaire de formatage des prix pour ALMAS & DIMAS
// Formatage centralisé en MAD (Dirham Marocain)

/**
 * Formate un prix en MAD avec le format marocain
 * @param {number} price - Le prix à formater
 * @returns {string} - Le prix formaté (ex: "45 000,00 MAD")
 */
export const formatPrice = (price) => {
  if (typeof price !== 'number' || isNaN(price)) {
    return '0,00 MAD';
  }

  return new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency: 'MAD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
};

/**
 * Formate un prix en MAD avec un format personnalisé
 * @param {number} price - Le prix à formater
 * @returns {string} - Le prix formaté (ex: "45.000,00 MAD")
 */
export const formatPriceCustom = (price) => {
  if (typeof price !== 'number' || isNaN(price)) {
    return '0,00 MAD';
  }

  // Format personnalisé avec points pour les milliers
  const formatted = price.toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return `${formatted} MAD`;
};

/**
 * Formate un prix sans devise (pour les calculs)
 * @param {number} price - Le prix à formater
 * @returns {string} - Le prix formaté sans devise (ex: "45.000,00")
 */
export const formatPriceNumber = (price) => {
  if (typeof price !== 'number' || isNaN(price)) {
    return '0,00';
  }

  return price.toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

/**
 * Parse un prix formaté en nombre
 * @param {string} formattedPrice - Le prix formaté
 * @returns {number} - Le prix en nombre
 */
export const parsePrice = (formattedPrice) => {
  if (typeof formattedPrice !== 'string') {
    return 0;
  }

  // Supprimer la devise et les espaces
  const cleanPrice = formattedPrice
    .replace(/MAD/g, '')
    .replace(/\s/g, '')
    .replace(/\./g, '') // Supprimer les points (milliers)
    .replace(/,/g, '.'); // Remplacer la virgule par un point (décimales)

  return parseFloat(cleanPrice) || 0;
};

