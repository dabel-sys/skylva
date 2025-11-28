import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const Philosophy: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section id="vision" className="py-32 bg-skylva-matte relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="relative z-10 order-2 lg:order-1">
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
                className="text-lg font-sans font-light text-white/60 leading-relaxed max-w-lg"
            >
              {t.philosophy.body}
            </motion.p>
          </div>

          <div className="relative order-1 lg:order-2">
             <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="aspect-[4/5] overflow-hidden bg-white/5"
             >
                <img 
                  src="/image/philosophy.jpg" 
                  alt="SKYLVA Architectural Philosophy" 
                  className="w-full h-full object-cover grayscale-[0.2]"
                />
             </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Philosophy;