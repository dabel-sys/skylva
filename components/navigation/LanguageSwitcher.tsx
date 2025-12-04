
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface LanguageSwitcherProps {
  activeClass: string;
  inactiveClass: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ activeClass, inactiveClass }) => {
  const { language, setLanguage } = useLanguage();
  const languages = ['en', 'nl', 'de'] as const;

  return (
    <>
      {languages.map((lang) => (
         <button 
            key={lang}
            onClick={() => setLanguage(lang)} 
            className={`transition-colors hover:opacity-100 ${language === lang ? activeClass : inactiveClass}`}
          >
           {lang}
         </button>
      ))}
    </>
  );
};

export default LanguageSwitcher;
