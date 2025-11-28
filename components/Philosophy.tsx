import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const Philosophy: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section id="vision" className="py-32 bg-skylva-matte relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-sm text-skylva-green tracking-[0.3em] uppercase mb-6 font-semibold"
        >
          {t.philosophy.label}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-3xl md:text-5xl font-display font-light text-white leading-snug mb-8"
        >
          {t.philosophy.headline_1}<br/>
          <span className="text-gray-500">{t.philosophy.headline_2}</span>
        </motion.div>

        <motion.p 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-lg font-sans font-light text-white/60 leading-relaxed max-w-2xl mx-auto"
        >
          {t.philosophy.body}
        </motion.p>

      </div>
    </section>
  );
};

export default Philosophy;