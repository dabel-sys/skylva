
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import TextReveal from './TextReveal';

const Experience: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-skylva-offwhite min-h-[100dvh] py-20 md:py-0 flex flex-col justify-center overflow-hidden">
      {/* Light & Atmosphere Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <span className="text-skylva-green text-xs font-bold tracking-[0.2em] uppercase block mb-6">
              {t.experience.light_label}
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-light text-skylva-charcoal mb-8 leading-tight">
              <TextReveal>{t.experience.light_title}</TextReveal>
            </h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-gray-500 font-sans font-light text-lg leading-relaxed"
            >
              {t.experience.light_body}
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="order-1 lg:order-2 relative aspect-square lg:aspect-[4/5] bg-gray-200 rounded-2xl border-[0.8pt] border-black/5 overflow-hidden"
          >
            <img
              src="/images/atmos-1.jpg"
              alt="Dappled light under pergola"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* Customization Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative aspect-square lg:aspect-[4/5] bg-gray-200 rounded-2xl border-[0.8pt] border-black/5 overflow-hidden"
          >
            <img
              src="/images/atmos-2.jpg"
              alt="Glass sliding walls"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div>
            <span className="text-skylva-green text-xs font-bold tracking-[0.2em] uppercase block mb-6">
              {t.experience.cust_label}
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-light text-skylva-charcoal mb-8 leading-tight">
              <TextReveal>{t.experience.cust_title}</TextReveal>
            </h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-gray-500 font-sans font-light text-lg leading-relaxed"
            >
              {t.experience.cust_body}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
