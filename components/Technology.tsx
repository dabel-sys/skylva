
import React, { useRef, useState, useEffect } from 'react';
import { m, useScroll, useTransform, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { Cpu, Wifi, Sun } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import TextReveal from './TextReveal';

const Technology: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const { t } = useLanguage();
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  
  // Parallax for the main content block
  const contentY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={ref} id="technology" className="py-32 relative overflow-hidden bg-black min-h-[100dvh] flex flex-col justify-center">
      {/* Background Image Parallax with Cinematic Darkening */}
      <div className="absolute inset-0 z-0">
        <m.div style={{ y, scale: 1.2 }} className="w-full h-full">
            <img 
            src="/images/intelligence.png" 
            alt="SKYLVA Artificial Intelligence Core" 
            className="w-full h-full object-cover opacity-40"
            />
        </m.div>
        {/* Base dark overlay */}
        <div className="absolute inset-0 bg-black/5" />
        {/* Cinematic Vignette: Darkens edges to focus on center */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_90%)]" />
      </div>
      
      {/* Digital Data Stream Background (Subtle Texture) */}
      <DataStream />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* Main Text Block with Glassmorphism */}
        <m.div 
          style={{ y: contentY }}
          className="max-w-3xl mb-24 bg-black/40 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl p-8 md:p-12 relative overflow-hidden group perspective-1000"
        >
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
          <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-skylva-sand/20 to-transparent opacity-50" />
          
          <div className="flex items-center justify-between mb-8">
             <h2 className="text-xs text-skylva-sand tracking-[0.3em] uppercase font-bold flex items-center gap-2">
                <span className="w-2 h-2 bg-skylva-sand rounded-full animate-pulse" />
                {t.technology.label}
             </h2>
             <span className="text-[10px] font-mono text-white/30 tracking-widest">SYS.V.2.4</span>
          </div>

          <div className="text-4xl md:text-6xl font-display font-light leading-tight mb-8 text-white">
            <TextReveal>{t.technology.title}</TextReveal>
          </div>
          <p className="text-white/80 font-sans font-light text-lg leading-relaxed max-w-2xl">
            {t.technology.body}
          </p>
        </m.div>

        {/* 3D Tilt Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-2000">
          {[
            {
              icon: <Cpu size={32} />,
              title: t.technology.t1_title,
              desc: t.technology.t1_desc,
              code: "01 // LEARN"
            },
            {
              icon: <Sun size={32} />,
              title: t.technology.t2_title,
              desc: t.technology.t2_desc,
               code: "02 // OPTIMIZE"
            },
            {
              icon: <Wifi size={32} />,
              title: t.technology.t3_title,
              desc: t.technology.t3_desc,
               code: "03 // CONNECT"
            }
          ].map((item, idx) => (
             <TiltCard key={idx} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

const DataStream = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-20">
      <div className="flex justify-between w-full px-12">
        {[...Array(5)].map((_, i) => (
           <m.div 
             key={i}
             className="text-[10px] font-mono text-skylva-sand/20 writing-vertical-lr"
             initial={{ y: -100, opacity: 0 }}
             animate={{ y: ["0%", "100%"], opacity: [0, 1, 0] }}
             transition={{ duration: 15 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 5, ease: "linear" }}
           >
             {Array.from({length: 20}).map(() => Math.random().toString(16).substr(2, 2).toUpperCase()).join(' ')}
           </m.div>
        ))}
      </div>
    </div>
  )
}

interface TiltCardProps {
  item: {
    icon: React.ReactNode;
    title: string;
    desc: string;
    code: string;
  };
  index: number;
}

const TiltCard: React.FC<TiltCardProps> = ({ item, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const shineOpacity = useTransform(mouseY, [-0.5, 0.5], [0, 0.3]);

  return (
    <m.div 
      className="group relative h-full"
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
    >
      <div className="absolute inset-0 bg-skylva-sand/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-30" />
      
      <div className="relative h-full bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 overflow-hidden shadow-2xl flex flex-col">
        {/* Dynamic Shine */}
        <m.div 
          style={{ opacity: shineOpacity }}
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none z-10"
        />
        
        {/* Content */}
        <div className="relative z-20 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <m.div 
              className="p-3 bg-white/5 rounded-xl text-skylva-sand group-hover:text-skylva-matte group-hover:bg-skylva-sand transition-colors duration-500"
            >
              {item.icon}
            </m.div>
            <span className="text-[10px] font-mono text-white/20">{item.code}</span>
          </div>

          <h4 className="text-xl font-display font-normal mb-4 text-white group-hover:translate-x-1 transition-transform duration-300">{item.title}</h4>
          <p className="text-sm text-white/60 font-sans font-light leading-relaxed group-hover:text-white/80 transition-colors">
            {item.desc}
          </p>
        </div>

        {/* Decorative Corner */}
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/10 rounded-br-2xl group-hover:border-skylva-sand/50 transition-colors duration-500" />
      </div>
    </m.div>
  )
}

export default Technology;