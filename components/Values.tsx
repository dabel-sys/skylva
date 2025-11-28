import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Values: React.FC = () => {
  const { t } = useLanguage();
  const values = [
    t.values.silence,
    t.values.light,
    t.values.nature,
    t.values.intelligence,
    t.values.precision,
    t.values.longevity
  ];

  return (
    <section className="py-24 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-wrap justify-center md:justify-between gap-8 md:gap-0">
          {values.map((val, idx) => (
            <span 
              key={idx} 
              className="text-2xl md:text-3xl font-display font-light text-gray-400 hover:text-skylva-matte cursor-default transition-colors duration-500 select-none"
            >
              {val}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;