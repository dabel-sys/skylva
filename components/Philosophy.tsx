import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import TextReveal from './TextReveal';

const Philosophy: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section id="vision" className="relative overflow-hidden bg-skylva-matte min-h-[100dvh] flex items-center md:min-h-0 md:block md:py-32">
      <div className="w-full max-w-4xl mx-auto px-6 md:px-12 flex flex-col items-center text-center py-12 md:py-0">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-sm text-skylva-green tracking-[0.3em] uppercase mb-8 font-semibold"
        >
          {t.philosophy.label}
        </motion.h2>

        <div className="text-3xl md:text-5xl lg:text-6xl font-display font-light text-white leading-[1.2] mb-12">
           <TextReveal className="block mb-2">{t.philosophy.headline_1}</TextReveal>
           <span className="text-white/40 block">
             <TextReveal delay={0.4} className="block">{t.philosophy.headline_2}</TextReveal>
           </span>
        </div>

        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-lg md:text-xl font-sans font-light text-white/60 leading-relaxed max-w-2xl mx-auto"
        >
          {t.philosophy.body.split('. ').map((sentence, i) => (
             <span key={i} className="inline-block mr-1">
                {sentence}.
             </span>
          ))}
        </motion.div>

        <motion.div
           initial={{ scaleX: 0 }}
           whileInView={{ scaleX: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
           className="w-24 h-[1px] bg-white/20 mt-16"
        />

      </div>
    </section>
  );
};

export default Philosophy;