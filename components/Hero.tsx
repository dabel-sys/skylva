
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import TextReveal from './TextReveal';

const Hero: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  // Scroll Progress
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Mouse Interaction (Magnetic Background)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for mouse interaction
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    
    // Subtle movement range
    mouseX.set(xPct * 20); 
    mouseY.set(yPct * 20);
  }

  // Cinematic Scroll Effects
  // The background scales UP slowly as you scroll down
  const scaleScroll = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const yScroll = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  
  // The content moves faster than background (Parallax) and blurs out
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentBlur = useTransform(scrollYProgress, [0, 0.5], [0, 10]);
  const contentFilter = useMotionTemplate`blur(${contentBlur}px)`;

  // Combine scroll scale with mouse movement
  const x = springX;
  const y = useMotionTemplate`calc(${yScroll} + ${springY}px)`;

  return (
    <section 
      ref={ref} 
      onMouseMove={handleMouseMove}
      className="relative h-[100dvh] w-full overflow-hidden flex items-center justify-center bg-skylva-matte"
    >
      {/* Background Layer with Cinematic Entry & Mouse Parallax */}
      <div className="absolute inset-0 z-0 will-change-transform overflow-hidden">
        <motion.div 
          style={{ 
            scale: scaleScroll,
            x,
            y
          }} 
          initial={{ scale: 1.4, filter: "blur(20px)" }}
          animate={{ scale: 1, filter: "blur(0px)" }}
          transition={{ 
            duration: 2.5, 
            ease: [0.25, 1, 0.5, 1] // "Heavy" ease for premium feel
          }}
          className="absolute inset-0 w-[110%] h-[110%] -left-[5%] -top-[5%]"
        >
          <img 
            src="/images/hero.jpg" 
            alt="Premium Scandinavian solar canopy" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-skylva-matte/80" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-skylva-matte to-transparent z-10" />
      </div>

      {/* Main Content Layer */}
      <motion.div 
        style={{ y: contentY, opacity: contentOpacity, filter: contentFilter }}
        className="relative z-10 text-center px-6 max-w-7xl mx-auto mt-12 w-full will-change-transform"
      >
        {/* Headlines - Staggered Char Reveal */}
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-display font-light tracking-tight text-white mb-8 leading-[0.9] mix-blend-screen">
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
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row gap-6 justify-center items-center"
        >
          <button className="group relative bg-white text-skylva-matte px-10 py-5 text-xs font-bold tracking-[0.25em] uppercase overflow-hidden transition-all duration-500 w-72 md:w-auto shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.5)] rounded-full hover:scale-105">
            <span className="relative z-10 group-hover:text-white transition-colors duration-500">{t.hero.button_discover}</span>
            <div className="absolute inset-0 bg-skylva-matte transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-[0.22,1,0.36,1]" />
          </button>
          
          <button className="group relative border border-white/20 text-white px-10 py-5 text-xs font-bold tracking-[0.25em] uppercase overflow-hidden transition-all duration-500 w-72 md:w-auto hover:border-white/60 rounded-full backdrop-blur-sm hover:scale-105">
            <span className="relative z-10 group-hover:text-skylva-matte transition-colors duration-500">{t.hero.button_configure}</span>
             <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-[0.22,1,0.36,1]" />
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/30 z-20"
      >
        <div className="flex flex-col items-center gap-2">
           <span className="text-[9px] font-mono tracking-widest uppercase writing-vertical-lr">Scroll</span>
           <motion.div 
             animate={{ y: [0, 8, 0] }}
             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
           >
              <ChevronDown size={20} strokeWidth={1} />
           </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
