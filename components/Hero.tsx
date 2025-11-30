
import React, { useRef } from 'react';
import { m, useScroll, useTransform, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useView } from '../contexts/ViewContext';
import { ViewState } from '../types';
import TextReveal from './TextReveal';

const Hero: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  const { setView } = useView();

  // Scroll Progress
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Mouse Interaction (3D Magnetic Background)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for mouse interaction
  const springConfig = { stiffness: 40, damping: 30 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    
    mouseX.set(xPct); 
    mouseY.set(yPct);
  }

  // 3D Transforms
  const imageX = useTransform(springX, [-0.5, 0.5], [-60, 60]);
  const imageY = useTransform(springY, [-0.5, 0.5], [-60, 60]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [3, -3]); // Tilt up/down
  const rotateY = useTransform(springX, [-0.5, 0.5], [-3, 3]); // Tilt left/right
  
  // Content Parallax (Opposite direction for depth)
  const contentX = useTransform(springX, [-0.5, 0.5], [20, -20]);
  const contentMoveY = useTransform(springY, [-0.5, 0.5], [20, -20]);

  // Cinematic Scroll Effects
  // The background scales UP slowly as you scroll down
  const scaleScroll = useTransform(scrollYProgress, [0, 1], [1.2, 1.35]);
  const yScroll = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  
  // The content moves faster than background (Parallax) and blurs out
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentBlur = useTransform(scrollYProgress, [0, 0.5], [0, 10]);
  const contentBlurFilter = useMotionTemplate`blur(${contentBlur}px)`;
  const blurFilter = useMotionTemplate`blur(0px)`; // Kept strictly clear for 3D effect

  // Combine transforms
  const finalImageY = useMotionTemplate`calc(${yScroll} + ${imageY}px)`;
  const finalContentY = useMotionTemplate`calc(${contentY} + ${contentMoveY}px)`;

  const handleExploreClick = () => {
    setView(ViewState.ABOUT);
    window.scrollTo(0, 0);
  };

  const handleConfigureClick = () => {
     const el = document.getElementById('configure');
     if (el && (window as any).lenis) (window as any).lenis.scrollTo(el, { offset: -50, duration: 1.5 });
     else if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={ref} 
      onMouseMove={handleMouseMove}
      className="relative h-[100dvh] w-full overflow-hidden flex items-center justify-center bg-skylva-matte perspective-1000 gpu-accelerated"
    >
      {/* Background Layer with Cinematic Entry & 3D Parallax */}
      <div className="absolute inset-0 z-0 will-change-transform overflow-hidden backface-hidden">
        <m.div 
          style={{ 
            scale: scaleScroll,
            x: imageX,
            y: finalImageY,
            rotateX,
            rotateY,
            filter: blurFilter,
            transformStyle: "preserve-3d"
          }} 
          initial={{ scale: 1.25, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 1 }}
          transition={{ 
            duration: 1.5, 
            ease: [0.25, 1, 0.5, 1] 
          }}
          className="absolute inset-0 w-[110%] h-[110%] -left-[5%] -top-[5%] will-change-transform backface-hidden"
        >
          <img 
            src="/images/hero.jpg" 
            alt="Premium Scandinavian solar canopy" 
            className="w-full h-full object-cover"
            // High priority loading for LCP
            fetchPriority="high"
            decoding="async"
          />
        </m.div>
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-skylva-matte/80 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-skylva-matte to-transparent z-10 pointer-events-none" />
      </div>

      {/* Main Content Layer */}
      <m.div 
        style={{ 
          y: finalContentY, 
          x: contentX,
          opacity: contentOpacity, 
          filter: contentBlurFilter 
        }}
        className="relative z-10 text-center px-6 max-w-7xl mx-auto mt-12 w-full will-change-transform pointer-events-none"
      >
        <div className="pointer-events-auto">
            {/* Headlines - Staggered Char Reveal */}
            <h1 className="text-5xl md:text-7xl lg:text-7xl font-display font-light tracking-tight text-white mb-8 leading-none md:leading-[0.9]">
            <div className="block overflow-hidden pb-2" key={`h1-${t.hero.headline_1}`}>
                <TextReveal 
                    mode="chars" 
                    delay={0.1} 
                    stagger={0.025} 
                    duration={0.8}
                    className="block" 
                    triggerOnce={false}
                >
                    {t.hero.headline_1}
                </TextReveal>
            </div>
            <div className="block text-skylva-sand/90 overflow-hidden pb-4" key={`h2-${t.hero.headline_2}`}>
                <TextReveal 
                    mode="chars" 
                    delay={0.3} 
                    stagger={0.025} 
                    duration={0.8}
                    className="block" 
                    triggerOnce={false}
                >
                    {t.hero.headline_2}
                </TextReveal>
            </div>
            </h1>

            {/* Subline - Word Reveal */}
            <div className="mb-16 max-w-2xl mx-auto">
            <TextReveal 
                mode="words" 
                delay={0.5} 
                stagger={0.04} 
                duration={0.8}
                className="text-lg md:text-2xl font-sans font-extralight text-white/80 tracking-widest block leading-relaxed"
                triggerOnce={false}
            >
                {t.hero.subline}
            </TextReveal>
            </div>

            {/* Buttons - Magnetic Drift Entry */}
            <m.div 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row gap-6 justify-center items-center"
            >
            <button 
                onClick={handleExploreClick}
                className="group relative bg-white text-black px-10 py-5 text-xs font-bold tracking-[0.25em] uppercase overflow-hidden transition-all duration-500 w-72 md:w-auto shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.5)] rounded-full hover:scale-105 z-20"
            >
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">{t.hero.button_discover}</span>
                <div className="absolute inset-0 bg-skylva-matte transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-[0.22,1,0.36,1]" />
            </button>
            
            <button 
                onClick={handleConfigureClick}
                className="group relative border border-white/40 text-white px-10 py-5 text-xs font-bold tracking-[0.25em] uppercase overflow-hidden transition-all duration-500 w-72 md:w-auto hover:border-white/80 rounded-full backdrop-blur-md hover:scale-105 z-20"
            >
                <span className="relative z-10 group-hover:text-skylva-matte transition-colors duration-500">{t.hero.button_configure}</span>
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-[0.22,1,0.36,1]" />
            </button>
            </m.div>
        </div>
      </m.div>

      {/* Scroll Indicator */}
      <m.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/30 z-20 pointer-events-none"
      >
        <div className="flex flex-col items-center gap-2">
           <span className="text-[9px] font-mono tracking-widest uppercase writing-vertical-lr">Scroll</span>
           <m.div 
             animate={{ y: [0, 8, 0] }}
             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
           >
              <ChevronDown size={20} strokeWidth={1} />
           </m.div>
        </div>
      </m.div>
    </section>
  );
};

export default Hero;
