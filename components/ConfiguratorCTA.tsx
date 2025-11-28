
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ConfiguratorCTA: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-6">
      <h2 className="text-5xl md:text-7xl font-display font-light text-skylva-matte mb-8 tracking-tight">
        {t.cta.title}
      </h2>
      <p className="text-gray-500 font-sans font-light text-lg mb-12 max-w-lg">
        {t.cta.body}
      </p>
      <button className="group flex items-center space-x-4 bg-skylva-matte text-white px-12 py-5 text-sm font-bold tracking-[0.2em] uppercase hover:bg-skylva-green transition-all duration-500 rounded-full">
        <span>{t.cta.button}</span>
        <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
      </button>
    </section>
  );
};

export default ConfiguratorCTA;
