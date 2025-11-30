
import React, { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { Recycle, TreePine, Zap, RefreshCw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import TextReveal from './TextReveal';

const SustainabilityPage: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div ref={containerRef} className="bg-skylva-matte text-white min-h-screen relative overflow-hidden">
      
      {/* Dynamic Nature Background */}
      <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-skylva-matte/90 to-skylva-matte z-10" />
          <img 
            src="https://picsum.photos/seed/skylva_forest_canopy/1920/1080" 
            alt="Nature Background" 
            className="w-full h-full object-cover opacity-40 grayscale" 
          />
      </div>

      <section className="relative z-10 pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
        <m.div style={{ y: heroY }} className="max-w-4xl">
           <span className="inline-block text-skylva-green text-xs font-bold tracking-[0.3em] uppercase mb-8 border border-skylva-green/30 px-4 py-2 rounded-full">Eco-Logic</span>
           <h1 className="text-5xl md:text-8xl font-display font-light mb-8 leading-[0.9]">
             <TextReveal mode="chars" stagger={0.02}>{t.sustainability_page.title}</TextReveal>
           </h1>
           <p className="text-xl md:text-2xl text-white/60 font-sans font-light max-w-2xl mx-auto leading-relaxed">
             {t.sustainability_page.subtitle}
           </p>
        </m.div>
      </section>

      {/* Stats Grid */}
      <section className="relative z-10 px-6 md:px-12 pb-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
           {[
             { val: t.sustainability_page.stat_1, label: t.sustainability_page.stat_1_desc, icon: <Recycle size={20} /> },
             { val: t.sustainability_page.stat_2, label: t.sustainability_page.stat_2_desc, icon: <TreePine size={20} /> },
             { val: t.sustainability_page.stat_3, label: t.sustainability_page.stat_3_desc, icon: <Zap size={20} /> },
           ].map((stat, idx) => (
             <m.div 
               key={idx}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.1 }}
               className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col items-center text-center backdrop-blur-sm"
             >
                <div className="text-skylva-green mb-4">{stat.icon}</div>
                <span className="text-4xl md:text-5xl font-display font-light mb-2">{stat.val}</span>
                <span className="text-xs font-mono uppercase tracking-widest text-white/40">{stat.label}</span>
             </m.div>
           ))}
        </div>

        {/* Lifecycle Section */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
           <div className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-display font-light mb-6 leading-tight">
                {t.sustainability_page.section_lifecycle_title}
              </h2>
              <p className="text-white/60 font-sans font-light text-lg leading-relaxed mb-8">
                {t.sustainability_page.section_lifecycle_body}
              </p>
              <div className="flex items-center gap-4 text-skylva-green">
                 <RefreshCw size={24} className="animate-spin-slow" />
                 <span className="text-sm font-bold uppercase tracking-widest">Cradle to Cradle Certified</span>
              </div>
           </div>
           
           <div className="w-full lg:w-1/2 relative aspect-square max-w-md mx-auto">
              {/* Abstract Circular Graphic */}
              <div className="absolute inset-0 border border-white/10 rounded-full flex items-center justify-center">
                 <div className="w-[80%] h-[80%] border border-white/20 rounded-full flex items-center justify-center">
                    <div className="w-[60%] h-[60%] border border-skylva-green/50 rounded-full flex items-center justify-center bg-skylva-green/5">
                        <span className="text-xs font-mono text-skylva-green">ZERO WASTE</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

      </section>

    </div>
  );
};

export default SustainabilityPage;
