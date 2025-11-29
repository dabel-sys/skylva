
import React, { useRef, useState, useEffect } from 'react';
import { m, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import TextReveal from './TextReveal';

const Philosophy: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);
  
  // Track scroll progress for the whole section (Desktop only)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Mouse Interaction for the Aurora
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Parallax Transforms (Desktop Only)
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const sublineY = useTransform(scrollYProgress, [0, 1], [0, -25]);
  const labelOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Split body text into sentences safely
  const sentences = t.philosophy.body.match(/[^.!?]+[.!?]+/g) || [t.philosophy.body];

  return (
    <section 
      ref={containerRef} 
      id="vision" 
      onMouseMove={handleMouseMove}
      // Mobile: 100dvh for exact full screen. Desktop: Taller track for scrollytelling.
      className={`relative w-full bg-skylva-matte overflow-hidden flex flex-col ${isDesktop ? 'h-[130vh]' : 'min-h-[100dvh] justify-center pb-0'}`}
    >
      {/* Dynamic Aurora Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none h-full w-full fixed-on-mobile">
         <div className="absolute inset-0 bg-gradient-to-b from-black via-skylva-matte to-black z-0" />
         
         {/* Moving Orbs */}
         <m.div 
            style={{ 
              x: springX, 
              y: springY,
              translateX: "-50%",
              translateY: "-50%"
            }}
            className="absolute w-[600px] h-[600px] rounded-full bg-skylva-green/10 blur-[120px] mix-blend-screen z-0 hidden md:block" 
         />
         <m.div 
            animate={{ 
              x: [0, 100, -100, 0],
              y: [0, -100, 100, 0],
              scale: [1, 1.2, 0.8, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/4 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-skylva-green/5 blur-[80px] md:blur-[100px] mix-blend-screen z-0"
         />
         <m.div 
            animate={{ 
              x: [0, -150, 150, 0],
              y: [0, 150, -150, 0],
              scale: [1, 1.5, 0.9, 1]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-[#4A5D53]/10 blur-[80px] md:blur-[100px] mix-blend-screen z-0"
         />
         
         {/* Noise Overlay */}
         <div className="absolute inset-0 opacity-20 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* Content Container */}
      {/* Mobile: Relative flow. Desktop: Sticky center. */}
      <div className={`${isDesktop ? 'sticky top-0 h-screen py-0' : 'relative h-auto'} w-full flex flex-col justify-center items-center px-6 md:px-12 max-w-5xl mx-auto z-10`}>
        
        {/* Label */}
        <m.div 
          style={{ opacity: isDesktop ? labelOpacity : 1 }}
          className="md:absolute md:top-32 md:left-12 flex items-center gap-3 mb-12 md:mb-0 self-start md:self-auto"
        >
          <span className="w-2 h-2 bg-skylva-green rounded-full animate-pulse" />
          <span className="text-xs font-mono text-skylva-green tracking-widest uppercase">{t.philosophy.label}</span>
        </m.div>

        {/* Headlines */}
        <div className="relative w-full text-center md:text-left mb-16 md:mb-24 perspective-1000">
          <m.h2 
            style={{ y: isDesktop ? headlineY : 0 }}
            className="text-4xl md:text-7xl lg:text-8xl font-display font-light text-white leading-[0.9] tracking-tight mb-4 mix-blend-difference"
          >
            {t.philosophy.headline_1}
          </m.h2>
          <m.h2 
            style={{ y: isDesktop ? sublineY : 0 }}
            className="text-4xl md:text-7xl lg:text-8xl font-display font-light text-white/30 leading-[0.9] tracking-tight mix-blend-overlay"
          >
            {t.philosophy.headline_2}
          </m.h2>
        </div>

        {/* Body Text - Adaptive Animation */}
        <div className="relative w-full max-w-3xl md:ml-auto">
          <p className="text-xl md:text-3xl font-sans font-light leading-relaxed text-white">
            <TextReveal mode="words">
              {t.philosophy.body}
            </TextReveal>
          </p>
        </div>

        {/* Decorative Quote - Desktop Only */}
        <m.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute bottom-4 right-12 text-right hidden md:block"
        >
          <span className="block text-[10px] font-mono text-white/20 tracking-widest mb-2">CORE PRINCIPLE</span>
          <span className="text-sm font-display text-white/60 tracking-widest uppercase">{t.philosophy.quote}</span>
        </m.div>

      </div>
    </section>
  );
};

export default Philosophy;