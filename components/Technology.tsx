import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
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

  return (
    <section ref={ref} id="technology" className="py-32 relative overflow-hidden bg-black">
      {/* Background Image Parallax */}
      <div className="absolute inset-0 z-0">
        <motion.div style={{ y, scale: 1.2 }} className="w-full h-full">
            <img 
            src="/images/intelligence.jpg" 
            alt="SKYLVA Artificial Intelligence Core" 
            className="w-full h-full object-cover grayscale-[0.5] opacity-60"
            />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Main Text Block */}
        <div className="max-w-3xl mb-24 bg-black/40 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl p-8 md:p-12 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
          
          <h2 className="text-sm text-skylva-sand tracking-[0.3em] uppercase mb-6 font-semibold">{t.technology.label}</h2>
          <div className="text-4xl md:text-6xl font-display font-light leading-tight mb-8 text-white">
            <TextReveal>{t.technology.title}</TextReveal>
          </div>
          <p className="text-white/80 font-sans font-light text-lg leading-relaxed">
            {t.technology.body}
          </p>
        </div>

        {/* Feature Grid with Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Cpu size={32} className="text-skylva-sand" />,
              title: t.technology.t1_title,
              desc: t.technology.t1_desc
            },
            {
              icon: <Sun size={32} className="text-skylva-sand" />,
              title: t.technology.t2_title,
              desc: t.technology.t2_desc
            },
            {
              icon: <Wifi size={32} className="text-skylva-sand" />,
              title: t.technology.t3_title,
              desc: t.technology.t3_desc
            }
          ].map((item, idx) => (
             <SpotlightCard key={idx} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

const SpotlightCard = ({ item, index }: { item: any, index: number }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div 
      className="group relative border border-white/10 bg-black/40 backdrop-blur-xl rounded-2xl p-8 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.1),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ delay: index * 0.1 }}
           className="mb-6 opacity-80 group-hover:opacity-100 transition-opacity text-skylva-sand"
        >
            {item.icon}
        </motion.div>
        <h4 className="text-xl font-display font-normal mb-4 text-white">{item.title}</h4>
        <p className="text-sm text-white/60 font-sans font-light leading-relaxed group-hover:text-white/80 transition-colors">
          {item.desc}
        </p>
      </div>
    </div>
  )
}

export default Technology;