import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

// Translation strings (you can expand this)
const translations = {
  english: {
    welcome: 'Welcome',
    dashboard: 'Dashboard',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    add: 'Add',
  },
  twi: {
    welcome: 'Akwaaba',
    dashboard: 'Dashboard',
    profile: 'Profile',
    settings: 'Nhyehyɛe',
    logout: 'Fi adi',
    save: 'Kora',
    cancel: 'Gyae',
    edit: 'Sesa',
    delete: 'Yi fi',
    add: 'Fa ka ho',
  },
  ga: {
    welcome: 'Bɔɔjɔɔ',
    dashboard: 'Dashboard',
    profile: 'Profile',
    settings: 'Nhyehyɛe',
    logout: 'Fii',
    save: 'Kpaa',
    cancel: 'Gbee',
    edit: 'Sane',
    delete: 'Tutu',
    add: 'Kpaa',
  },
  ewe: {
    welcome: 'Woezɔ',
    dashboard: 'Dashboard',
    profile: 'Profile',
    settings: 'Ðoɖoɖo',
    logout: 'Do le eme',
    save: 'Dzra ɖo',
    cancel: 'Gbe',
    edit: 'Trɔ asi',
    delete: 'Tutu',
    add: 'Tsɔ kpe ɖe eŋu',
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'english';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    // Set HTML lang attribute
    document.documentElement.lang = language === 'english' ? 'en' : language;
  }, [language]);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const t = (key) => {
    return translations[language]?.[key] || translations.english[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
