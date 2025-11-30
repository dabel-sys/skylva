
import React, { useRef } from 'react';
import { m, useScroll, useTransform, useSpring } from 'framer-motion';
import { Wind, Sun, Leaf, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import TextReveal from './TextReveal';

const AtmospherePage: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  
  // Hero Scroll Logic (Parallax)
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(heroScrollProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(heroScrollProgress, [0, 1], [1, 1.1]);

  return (
    <div ref={containerRef} className="bg-skylva-offwhite text-skylva-charcoal min-h-screen relative font-sans">
      
      {/* Background Ambience (Subtle Gradient Animation) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
         <m.div 
           animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-yellow-100/30 rounded-full blur-[150px]" 
         />
         <div className="absolute inset-0 bg-white/20 backdrop-blur-3xl" />
      </div>

      {/* Hero Section - Cinematic Video Style */}
      {/* Changed h-screen to h-[100dvh] for mobile edge-to-edge fix */}
      <section ref={heroRef} className="relative h-[100dvh] w-full overflow-hidden bg-black flex items-center justify-center">
         {/* Video Layer */}
         <m.div style={{ y: heroY, scale: heroScale, opacity: heroOpacity }} className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/30 z-10" />
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="w-full h-full object-cover opacity-90"
              poster="/images/atmos-1.png"
            >
               {/* Sunlight through trees (Komorebi effect) */}
               <source src="/images/atmoshpere.mp4" type="video/mp4" />
            </video>
         </m.div>

         {/* Content */}
         {/* Added pt-[env(safe-area-inset-top)] to prevent text from being hidden behind Dynamic Island */}
         <div className="relative z-20 text-center px-6 max-w-5xl pt-[env(safe-area-inset-top)]">
            <m.div
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
               <span className="inline-block text-white text-xs font-bold tracking-[0.3em] uppercase mb-6 border border-white/30 px-4 py-2 rounded-full backdrop-blur-md">
                 Sensory Design
               </span>
               <h1 className="text-7xl md:text-[10rem] font-display font-light text-white mb-6 leading-[0.8] tracking-tighter mix-blend-overlay">
                 <TextReveal mode="chars" stagger={0.02}>{t.atmosphere_page.title}</TextReveal>
               </h1>
               <p className="text-xl md:text-2xl font-light text-white/90 tracking-wide max-w-2xl mx-auto drop-shadow-md">
                 {t.atmosphere_page.subtitle}
               </p>
            </m.div>
         </div>

         {/* Scroll Hint */}
         <m.div 
           initial={{ opacity: 0 }} 
           animate={{ opacity: 1 }} 
           transition={{ delay: 1, duration: 1 }}
           className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-2 z-20"
         >
            <span className="text-[10px] font-mono uppercase tracking-widest">Scroll to Discover</span>
            <ChevronDown className="animate-bounce" size={16} />
         </m.div>
      </section>

      {/* Content Sections */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-32 flex flex-col gap-32 md:gap-48 pt-32">
         
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
            image="/images/process-1.png" // Placeholder
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
      <section className="py-32 px-6 text-center relative z-10 bg-white/50 backdrop-blur-xl border-t border-white/50">
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
