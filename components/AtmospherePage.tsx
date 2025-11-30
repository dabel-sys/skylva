
import React, { useRef } from 'react';
import { m, useScroll, useTransform, useSpring } from 'framer-motion';
import { Wind, Sun, Leaf, ArrowDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import TextReveal from './TextReveal';

const AtmospherePage: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Overall Page Scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 1.05]);

  return (
    <div ref={containerRef} className="bg-skylva-offwhite text-skylva-charcoal min-h-screen relative overflow-hidden font-sans">
      
      {/* Background Ambience (Subtle Gradient Animation) */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <m.div 
           animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-yellow-100/30 rounded-full blur-[150px]" 
         />
         <div className="absolute inset-0 bg-white/20 backdrop-blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
         <m.div style={{ opacity: heroOpacity, scale: heroScale }} className="relative z-10 max-w-5xl">
            <span className="block text-skylva-green text-xs font-bold tracking-[0.3em] uppercase mb-8 animate-pulse">Sensory Design</span>
            <h1 className="text-6xl md:text-9xl font-display font-light text-skylva-charcoal mb-8 tracking-tight leading-[0.9]">
               <TextReveal mode="chars" stagger={0.02}>{t.atmosphere_page.title}</TextReveal>
            </h1>
            <p className="text-xl md:text-2xl text-skylva-charcoal/60 font-sans font-light max-w-2xl mx-auto leading-relaxed">
               {t.atmosphere_page.subtitle}
            </p>
         </m.div>

         {/* Scroll Indicator */}
         <m.div 
           style={{ opacity: heroOpacity }}
           className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-skylva-charcoal/30"
         >
            <span className="text-[10px] font-mono uppercase tracking-widest">Discover</span>
            <ArrowDown size={16} className="animate-bounce" />
         </m.div>
      </section>

      {/* Content Sections */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-32 flex flex-col gap-32 md:gap-48">
         
         {/* 1. Light as Material */}
         <FeatureSection 
            title={t.atmosphere_page.intro_title}
            body={t.atmosphere_page.intro_body}
            image="/images/atmos-1.png"
            align="right"
            icon={<Sun size={32} className="text-yellow-600/80" />}
            accentColor="bg-yellow-50"
         />

         {/* 2. Air / Ventilation */}
         <FeatureSection 
            title={t.atmosphere_page.section_air_title}
            body={t.atmosphere_page.section_air_body}
            image="/images/process-1.png" // Placeholder, ideally an open-air shot
            align="left"
            icon={<Wind size={32} className="text-blue-400/80" />}
            accentColor="bg-blue-50"
         />

         {/* 3. Biophilia */}
         <FeatureSection 
            title={t.atmosphere_page.section_bio_title}
            body={t.atmosphere_page.section_bio_body}
            image="/images/atmos-2.png"
            align="right"
            icon={<Leaf size={32} className="text-green-600/80" />}
            accentColor="bg-green-50"
         />
      
      </div>

      {/* Footer / Quote */}
      <section className="py-32 px-6 text-center relative z-10 bg-white/50 backdrop-blur-xl">
         <m.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="max-w-3xl mx-auto"
         >
            <p className="text-3xl md:text-5xl font-display font-light text-skylva-charcoal leading-tight mb-8">
               "We do not build to protect you from nature. We build to connect you to it."
            </p>
            <div className="w-12 h-[1px] bg-skylva-charcoal/20 mx-auto" />
         </m.div>
      </section>

    </div>
  );
};

const FeatureSection = ({ title, body, image, align, icon, accentColor }: any) => {
   const ref = useRef(null);
   const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "center center"]
   });
   
   const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
   const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
   const isRight = align === 'right';

   return (
      <section ref={ref} className={`flex flex-col ${isRight ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>
         
         {/* Text Side */}
         <m.div 
            style={{ opacity, x: isRight ? -50 : 50 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full lg:w-2/5"
         >
            <div className={`w-16 h-16 ${accentColor} rounded-2xl flex items-center justify-center mb-8`}>
               {icon}
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-light text-skylva-charcoal mb-6 leading-tight">
               {title}
            </h2>
            <p className="text-skylva-charcoal/70 font-sans font-light text-lg leading-relaxed border-l border-skylva-charcoal/10 pl-6">
               {body}
            </p>
         </m.div>

         {/* Image Side */}
         <m.div style={{ y, opacity }} className="w-full lg:w-3/5">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-black/5">
               <img 
                  src={image} 
                  alt={title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s] ease-out"
               />
               {/* Soft overlay */}
               <div className="absolute inset-0 bg-white/10 mix-blend-soft-light" />
            </div>
         </m.div>

      </section>
   );
};

export default AtmospherePage;
