
import React, { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import TextReveal from './TextReveal';

const Experience: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  
  // Parallax logic for a subtle premium feel
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="bg-skylva-offwhite min-h-[100dvh] py-20 md:py-32 flex flex-col justify-center overflow-hidden gpu-accelerated">
      
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 w-full">
        
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-20 md:mb-32">
             <m.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="flex flex-col items-start"
             >
                <div className="flex items-center gap-3 mb-6">
                    <span className="w-1.5 h-1.5 bg-skylva-charcoal rounded-full" />
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500">The Experience</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-display font-light text-skylva-charcoal leading-tight max-w-2xl">
                    Designed for <span className="text-gray-400">living.</span>
                </h2>
             </m.div>
        </div>

        {/* Feature Block 1: Atmosphere (Left Image Heavy) */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center mb-32 max-w-7xl mx-auto">
          {/* Image Side - 60% Width */}
          <m.div 
            style={{ y: y1 }}
            className="w-full lg:w-3/5 will-change-transform"
          >
            <div className="relative aspect-[4/3] lg:aspect-[16/10] overflow-hidden rounded-3xl cursor-pointer group shadow-xl shadow-black/5 transform-gpu">
                <img
                  src="/images/atmos-1.png"
                  alt="Dappled light under pergola"
                  className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[0.22,1,0.36,1] group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                {/* Subtle sheen overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          </m.div>

          {/* Text Side - 40% Width */}
          <div className="w-full lg:w-2/5 flex flex-col justify-center">
            <m.div
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.2 }}
            >
                <span className="text-skylva-green text-xs font-bold tracking-[0.2em] uppercase block mb-6">
                  {t.experience.light_label}
                </span>
                <h3 className="text-3xl md:text-5xl font-display font-light text-skylva-charcoal mb-6 leading-tight">
                  <TextReveal>{t.experience.light_title}</TextReveal>
                </h3>
                <p className="text-gray-500 font-sans font-light text-lg leading-relaxed mb-8 border-l border-black/10 pl-6">
                  {t.experience.light_body}
                </p>
                
                <button className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-skylva-charcoal hover:text-skylva-green transition-colors">
                   <span>Discover Atmosphere</span>
                   <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
            </m.div>
          </div>
        </div>

        {/* Feature Block 2: Customization (Right Image Heavy) */}
        <div className="flex flex-col lg:flex-row-reverse gap-12 lg:gap-24 items-center max-w-7xl mx-auto">
          {/* Image Side - 60% Width */}
          <m.div 
            style={{ y: y2 }}
            className="w-full lg:w-3/5 will-change-transform"
          >
            <div className="relative aspect-[4/3] lg:aspect-[16/10] overflow-hidden rounded-3xl cursor-pointer group shadow-xl shadow-black/5 transform-gpu">
                <img
                  src="/images/atmos-2.png"
                  alt="Glass sliding walls"
                  className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[0.22,1,0.36,1] group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-tl from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          </m.div>

          {/* Text Side - 40% Width */}
          <div className="w-full lg:w-2/5 flex flex-col justify-center lg:items-end lg:text-right">
            <m.div
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="flex flex-col lg:items-end"
            >
                <span className="text-skylva-green text-xs font-bold tracking-[0.2em] uppercase block mb-6">
                  {t.experience.cust_label}
                </span>
                <h3 className="text-3xl md:text-5xl font-display font-light text-skylva-charcoal mb-6 leading-tight">
                  <TextReveal>{t.experience.cust_title}</TextReveal>
                </h3>
                <p className="text-gray-500 font-sans font-light text-lg leading-relaxed mb-8 border-l lg:border-l-0 lg:border-r border-black/10 pl-6 lg:pl-0 lg:pr-6">
                  {t.experience.cust_body}
                </p>

                <button className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-skylva-charcoal hover:text-skylva-green transition-colors">
                   <span>View Options</span>
                   <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
            </m.div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;
