// Simple Language Context for ALMAS & DIMAS
// Manages current language and provides translation function

import React, { createContext, useContext, useState } from 'react';
import { translations } from '../translations/translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('FR'); // Default to French

  // Function to get translated text
  const t = (key) => {
    return translations[currentLanguage]?.[key] || key;
  };

  // Function to change language
  const changeLanguage = (languageCode) => {
    if (translations[languageCode]) {
      setCurrentLanguage(languageCode);
      // Store in localStorage for persistence
      localStorage.setItem('language', languageCode);
    }
  };

  // Initialize language from localStorage on mount
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const value = {
    currentLanguage,
    changeLanguage,
    t, // Translation function
    isEnglish: currentLanguage === 'EN',
    isFrench: currentLanguage === 'FR'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;

