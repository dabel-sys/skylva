import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations } from '../utils/translations';

type Language = 'en' | 'nl' | 'de';
type Translations = typeof translations.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from localStorage if available
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('skylva_language');
      if (saved === 'en' || saved === 'nl' || saved === 'de') {
        return saved;
      }
    }
    return 'en';
  });

  // Save to localStorage whenever language changes
  useEffect(() => {
    localStorage.setItem('skylva_language', language);
  }, [language]);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};