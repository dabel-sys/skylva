
import React, { useRef, useState } from 'react';
import { motion, useSpring, useTransform, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ArrowRight, Move, Layers, Maximize, Settings } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import TextReveal from './TextReveal';

const ConfiguratorCTA: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  
  // Mouse Interaction
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width);
    mouseY.set((e.clientY - top) / height);
  };

  const springConfig = { stiffness: 100, damping: 30 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Parallax Transforms
  const rotateX = useTransform(springY, [0, 1], [5, -5]);
  const rotateY = useTransform(springX, [0, 1], [-5, 5]);

  return (
    <section 
      ref={ref} 
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-white relative overflow-hidden flex flex-col items-center justify-center perspective-1000"
    >
      {/* Floating Configurator UI Elements (Background) */}
      <FloatingUI springX={springX} springY={springY} />

      {/* Main Content Layer */}
      <motion.div 
        style={{ 
          rotateX, 
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="relative z-20 flex flex-col items-center text-center px-6 max-w-5xl"
      >
        {/* Label */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="mb-8 flex items-center gap-3 bg-white/50 backdrop-blur-sm border border-black/5 px-4 py-2 rounded-full shadow-sm"
        >
          <span className="w-2 h-2 bg-skylva-green rounded-full animate-pulse" />
          <span className="text-xs font-mono text-skylva-green tracking-widest uppercase">Interactive Studio</span>
        </motion.div>

        {/* Title */}
        <h2 className="text-5xl md:text-7xl lg:text-9xl font-display font-light text-skylva-charcoal mb-8 tracking-tight leading-[0.85]">
          <TextReveal mode="chars" stagger={0.02} triggerOnce={false}>{t.cta.title}</TextReveal>
        </h2>

        {/* Body */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-gray-500 font-sans font-light text-lg md:text-2xl mb-16 max-w-xl leading-relaxed"
        >
          {t.cta.body}
        </motion.p>

        {/* Magnetic Button */}
        <MagneticButton text={t.cta.button} />
        
      </motion.div>
    </section>
  );
};

// --- Subcomponents ---

const FloatingUI = ({ springX, springY }: { springX: any, springY: any }) => {
  // Parallax layers for UI cards
  const uiX1 = useTransform(springX, [0, 1], [40, -40]);
  const uiY1 = useTransform(springY, [0, 1], [40, -40]);
  
  const uiX2 = useTransform(springX, [0, 1], [-30, 30]);
  const uiY2 = useTransform(springY, [0, 1], [-50, 50]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Floating Card 1: Dimensions */}
      <motion.div 
        style={{ x: uiX1, y: uiY1 }}
        className="absolute top-[20%] left-[10%] bg-white/40 backdrop-blur-md border border-black/5 p-4 rounded-xl shadow-xl hidden md:block"
      >
        <div className="flex items-center gap-3 mb-2">
          <Maximize size={14} className="text-skylva-green" />
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Dimensions</span>
        </div>
        <div className="h-1 w-24 bg-gray-200 rounded-full overflow-hidden">
           <motion.div 
             animate={{ width: ["0%", "70%", "70%", "100%"] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             className="h-full bg-skylva-green"
           />
        </div>
        <div className="mt-2 text-xs font-mono text-gray-800">4.5m x 3.2m</div>
      </motion.div>

      {/* Floating Card 2: Material */}
      <motion.div 
        style={{ x: uiX2, y: uiY2 }}
        className="absolute bottom-[25%] right-[15%] bg-white/40 backdrop-blur-md border border-black/5 p-4 rounded-xl shadow-xl hidden md:block"
      >
        <div className="flex items-center gap-3 mb-2">
          <Layers size={14} className="text-skylva-green" />
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Material</span>
        </div>
        <div className="flex gap-2">
           <div className="w-6 h-6 rounded-full bg-[#D8D4CD] border border-white shadow-sm" />
           <div className="w-6 h-6 rounded-full bg-[#2A2A2A] border border-white shadow-sm scale-110 ring-1 ring-offset-1 ring-skylva-green" />
           <div className="w-6 h-6 rounded-full bg-[#8B5E3C] border border-white shadow-sm" />
        </div>
      </motion.div>
    </div>
  );
};

const MagneticButton = ({ text }: { text: string }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Magnetic pull calculation
    x.set((clientX - centerX) * 0.3);
    y.set((clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button 
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="group relative bg-skylva-matte text-white px-16 py-6 rounded-full text-sm font-bold tracking-[0.25em] uppercase overflow-hidden shadow-2xl hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] transition-all duration-300"
    >
      <span className="relative z-10 flex items-center gap-4 group-hover:gap-6 transition-all duration-300">
        {text}
        <ArrowRight size={18} />
      </span>
      
      {/* Fill Effect */}
      <div className="absolute inset-0 bg-skylva-green transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom ease-[0.22,1,0.36,1]" />
    </motion.button>
  );
};

export default ConfiguratorCTA;
