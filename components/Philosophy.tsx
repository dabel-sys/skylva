
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const Philosophy: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: textProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
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

  // Parallax Transforms
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const sublineY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const labelOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  // Split body text into sentences for individual highlighting
  const sentences = t.philosophy.body.split('. ').map(s => s.endsWith('.') ? s : s + '.');

  return (
    <section 
      ref={containerRef} 
      id="vision" 
      onMouseMove={handleMouseMove}
      className="relative min-h-[150vh] bg-skylva-matte overflow-hidden snap-start flex flex-col items-center"
    >
      {/* Dynamic Aurora Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         {/* Base Gradient */}
         <div className="absolute inset-0 bg-gradient-to-b from-black via-skylva-matte to-black z-0" />
         
         {/* Moving Orbs */}
         <motion.div 
            style={{ 
              x: springX, 
              y: springY,
              translateX: "-50%",
              translateY: "-50%"
            }}
            className="absolute w-[600px] h-[600px] rounded-full bg-skylva-green/10 blur-[120px] mix-blend-screen z-0" 
         />
         <motion.div 
            animate={{ 
              x: [0, 100, -100, 0],
              y: [0, -100, 100, 0],
              scale: [1, 1.2, 0.8, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-skylva-green/5 blur-[100px] mix-blend-screen z-0"
         />
         <motion.div 
            animate={{ 
              x: [0, -150, 150, 0],
              y: [0, 150, -150, 0],
              scale: [1, 1.5, 0.9, 1]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#4A5D53]/10 blur-[100px] mix-blend-screen z-0"
         />
         
         {/* Noise Overlay */}
         <div className="absolute inset-0 opacity-20 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* Sticky Content Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-6 md:px-12 max-w-5xl mx-auto z-10">
        
        {/* Label */}
        <motion.div 
          style={{ opacity: labelOpacity }}
          className="absolute top-24 md:top-32 left-6 md:left-12 flex items-center gap-3"
        >
          <span className="w-2 h-2 bg-skylva-green rounded-full animate-pulse" />
          <span className="text-xs font-mono text-skylva-green tracking-widest uppercase">{t.philosophy.label}</span>
        </motion.div>

        {/* Headlines with Parallax */}
        <div className="relative w-full text-center md:text-left mb-16 md:mb-24 perspective-1000">
          <motion.h2 
            style={{ y: headlineY }}
            className="text-4xl md:text-7xl lg:text-8xl font-display font-light text-white leading-[0.9] tracking-tight mb-4 mix-blend-difference"
          >
            {t.philosophy.headline_1}
          </motion.h2>
          <motion.h2 
            style={{ y: sublineY }}
            className="text-4xl md:text-7xl lg:text-8xl font-display font-light text-white/30 leading-[0.9] tracking-tight mix-blend-overlay"
          >
            {t.philosophy.headline_2}
          </motion.h2>
        </div>

        {/* Interactive Scroll-Reading Body Text */}
        <div className="relative w-full max-w-3xl md:ml-auto">
          <p className="text-xl md:text-3xl font-sans font-light leading-relaxed">
            {sentences.map((sentence, i) => {
              // Calculate opacity based on scroll position relative to sentence index
              // We create a window of 'active' reading
              const start = i / sentences.length;
              const end = (i + 1) / sentences.length;
              
              return (
                <Sentence 
                  key={i} 
                  text={sentence} 
                  range={[start, end]} 
                  progress={textProgress} 
                />
              );
            })}
          </p>
        </div>

        {/* Decorative Quote */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute bottom-12 right-6 md:right-12 text-right hidden md:block"
        >
          <span className="block text-[10px] font-mono text-white/20 tracking-widest mb-2">CORE PRINCIPLE</span>
          <span className="text-sm font-display text-white/60 tracking-widest uppercase">{t.philosophy.quote}</span>
        </motion.div>

      </div>
    </section>
  );
};

const Sentence = ({ text, range, progress }: { text: string, range: [number, number], progress: any }) => {
  const opacity = useTransform(progress, [range[0], range[0] + 0.1], [0.1, 1]);
  const blur = useTransform(progress, [range[0], range[0] + 0.1], [4, 0]);
  const y = useTransform(progress, [range[0], range[0] + 0.1], [10, 0]);
  
  return (
    <span className="relative inline-block mr-2">
      <motion.span 
        style={{ opacity, filter: useMotionTemplate`blur(${blur}px)`, y }}
        className="text-white inline-block transition-colors duration-500"
      >
        {text}
      </motion.span>
    </span>
  );
};

export default Philosophy;
