
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
    <section className="min-h-[60vh] flex flex-col justify-center py-24 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="flex flex-wrap justify-center md:justify-between gap-8 md:gap-0">
          {values.map((val, idx) => (
            <span 
              key={idx} 
              className="inline-block text-2xl md:text-3xl font-display font-light text-gray-400 hover:text-skylva-green hover:scale-110 cursor-default transition-all duration-500 ease-out select-none origin-center"
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
