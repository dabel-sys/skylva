import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import TextReveal from './TextReveal';

const Hero: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const { t } = useLanguage();

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative h-[100dvh] w-full overflow-hidden flex items-center justify-center bg-skylva-matte">
      {/* Background Image with Cinematic Scale-out on Load */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          style={{ y, scale }} 
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src="/images/hero.jpg" 
            alt="Premium Scandinavian solar canopy" 
            className="w-full h-full object-cover opacity-80 grayscale-[0.1]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-skylva-matte" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto mt-20">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-display font-light tracking-tight text-white mb-8 leading-[1.1]">
          <div className="block overflow-hidden">
             <TextReveal delay={0.2} stagger={0.05} className="block">{t.hero.headline_1}</TextReveal>
          </div>
          <div className="block text-skylva-sand overflow-hidden">
             <TextReveal delay={0.6} stagger={0.05} className="block">{t.hero.headline_2}</TextReveal>
          </div>
        </h1>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 1.2, duration: 1 }}
        >
           <p className="text-lg md:text-xl font-sans font-light text-white/90 tracking-widest mb-12 max-w-2xl mx-auto drop-shadow-lg">
             {t.hero.subline}
           </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
          className="flex flex-col md:flex-row gap-6 justify-center items-center"
        >
          <button className="group relative bg-white text-skylva-matte px-10 py-4 text-xs font-medium tracking-[0.2em] uppercase overflow-hidden transition-all duration-300 w-64 md:w-auto shadow-lg shadow-white/10 hover:shadow-white/20">
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">{t.hero.button_discover}</span>
            <div className="absolute inset-0 bg-skylva-matte transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </button>
          <button className="group relative border border-white/30 text-white px-10 py-4 text-xs font-medium tracking-[0.2em] uppercase overflow-hidden transition-all duration-300 w-64 md:w-auto hover:border-white">
            <span className="relative z-10 group-hover:text-skylva-matte transition-colors duration-300">{t.hero.button_configure}</span>
             <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </button>
        </motion.div>
      </div>

      <motion.div 
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 animate-bounce pb-[env(safe-area-inset-bottom)]"
      >
        <ChevronDown size={32} strokeWidth={0.5} />
      </motion.div>
    </section>
  );
};

export default Hero;