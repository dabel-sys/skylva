
import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Values: React.FC = () => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const valuesData = [
    {
      id: 0,
      label: t.values.silence,
      desc: 'Quiet power. Systems that work without being heard.',
      image: 'https://picsum.photos/seed/skylva_fog_mist_calm/1600/900',
      tech: '0dB OPERATION'
    },
    {
      id: 1,
      label: t.values.light,
      desc: 'Shaping shadows. Filtering the sun, not blocking it.',
      image: 'https://picsum.photos/seed/skylva_sun_rays_shadows/1600/900',
      tech: '98% TRANSMISSION'
    },
    {
      id: 2,
      label: t.values.nature,
      desc: 'Biophilic design. Materials that breathe and age.',
      image: 'https://picsum.photos/seed/skylva_forest_texture_wood/1600/900',
      tech: 'FSC CERTIFIED'
    },
    {
      id: 3,
      label: t.values.intelligence,
      desc: 'Predictive energy. Algorithms that know the weather.',
      image: 'https://picsum.photos/seed/skylva_abstract_network_nodes/1600/900',
      tech: 'NEURAL NET V4'
    },
    {
      id: 4,
      label: t.values.precision,
      desc: 'Millimeter perfect. Aerospace-grade aluminum joinery.',
      image: 'https://picsum.photos/seed/skylva_metal_structure_detail/1600/900',
      tech: '±0.5mm TOLERANCE'
    },
    {
      id: 5,
      label: t.values.longevity,
      desc: 'Built for generations. Resistant to the harshest North.',
      image: 'https://picsum.photos/seed/skylva_ancient_stone_rock/1600/900',
      tech: '50YR LIFESPAN'
    }
  ];

  return (
    <section className="relative min-h-[100dvh] bg-skylva-matte text-white flex flex-col justify-center overflow-hidden">
      
      {/* Header (Absolute top left) */}
      <div className="absolute top-12 left-6 md:left-12 z-20 pointer-events-none">
        <div className="flex items-center gap-3 mb-2">
            <span className="w-1.5 h-1.5 bg-white rounded-full" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/60">Core Principles</span>
        </div>
        <h2 className="text-xl md:text-2xl font-display font-light text-white">The DNA of SKYLVA.</h2>
      </div>

      {/* 
         THE BLADES LAYOUT 
         Desktop: Horizontal Accordion
         Mobile: Vertical Stack
      */}
      <div className="w-full h-[100dvh] md:h-screen flex flex-col md:flex-row pt-32 pb-12 md:pt-0 md:pb-0">
        {valuesData.map((val, idx) => {
          const isActive = activeIndex === idx;
          
          return (
            <m.div
              key={idx}
              layout
              onClick={() => setActiveIndex(idx)}
              onMouseEnter={() => isDesktop && setActiveIndex(idx)}
              className={`
                relative overflow-hidden cursor-pointer border-b md:border-b-0 md:border-r border-white/10 group
                ${isDesktop 
                    ? (isActive ? 'flex-[4]' : 'flex-[0.5]') 
                    : (isActive ? 'flex-[4]' : 'flex-[0.5]')
                }
              `}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              {/* Background Image (Dimmed when inactive) */}
              <div className="absolute inset-0 z-0">
                <m.img 
                  layoutId={`bg-img-${val.id}`}
                  src={val.image} 
                  alt={val.label}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                  style={{ 
                    filter: isActive ? 'grayscale(0%) brightness(0.8)' : 'grayscale(100%) brightness(0.4)'
                  }}
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-80' : 'opacity-90'}`} />
              </div>

              {/* CONTENT LAYER */}
              <div className="absolute inset-0 z-10 p-6 md:p-12 flex flex-col justify-between">
                
                {/* Top / Number */}
                <div className="flex justify-between items-start">
                    <span className={`text-xs font-mono tracking-widest transition-colors ${isActive ? 'text-skylva-green' : 'text-white/40'}`}>
                        0{idx + 1}
                    </span>
                    {isActive && (
                        <m.div 
                            initial={{ opacity: 0, rotate: 45 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-md"
                        >
                            <ArrowUpRight size={14} />
                        </m.div>
                    )}
                </div>

                {/* 
                   DESKTOP: VERTICAL TEXT (Inactive) vs HORIZONTAL (Active)
                */}
                {isDesktop ? (
                    <div className="mt-auto relative">
                        {/* INACTIVE STATE: Vertical Text */}
                        {!isActive && (
                            <m.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute bottom-0 left-0 origin-bottom-left -rotate-90 translate-y-8 min-w-[300px]"
                            >
                                <h3 className="text-3xl font-display font-bold uppercase tracking-widest text-white/40 whitespace-nowrap">
                                    {val.label}
                                </h3>
                            </m.div>
                        )}

                        {/* ACTIVE STATE: Full Content */}
                        <AnimatePresence>
                            {isActive && (
                                <m.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <h3 className="text-6xl lg:text-8xl font-display font-light uppercase tracking-tight mb-6">
                                        {val.label}
                                    </h3>
                                    <div className="h-[1px] w-24 bg-skylva-green mb-6" />
                                    <div className="flex items-end justify-between max-w-xl">
                                        <p className="text-lg text-gray-300 font-sans font-light leading-relaxed">
                                            {val.desc}
                                        </p>
                                        <div className="hidden lg:block text-right">
                                            <span className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Spec</span>
                                            <span className="font-mono text-skylva-green">{val.tech}</span>
                                        </div>
                                    </div>
                                </m.div>
                            )}
                        </AnimatePresence>
                    </div>
                ) : (
                    /* MOBILE LAYOUT */
                    <div className="mt-auto">
                        <div className="flex items-center justify-between">
                            <h3 className={`font-display uppercase tracking-widest transition-all ${isActive ? 'text-3xl font-light text-white' : 'text-xl font-bold text-white/50'}`}>
                                {val.label}
                            </h3>
                            {!isActive && <Plus size={16} className="text-white/40" />}
                        </div>
                        
                        <AnimatePresence>
                            {isActive && (
                                <m.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="pt-4"
                                >
                                    <p className="text-sm text-gray-300 font-sans font-light leading-relaxed mb-4">
                                        {val.desc}
                                    </p>
                                    <div className="flex items-center gap-2 text-[10px] font-mono text-skylva-green uppercase tracking-widest">
                                        <span>Tech: {val.tech}</span>
                                    </div>
                                </m.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}

              </div>
              
              {/* Highlight Border */}
              <m.div 
                 className={`absolute inset-0 border-2 pointer-events-none transition-colors duration-500 ${isActive ? 'border-white/10' : 'border-transparent'}`} 
              />
            </m.div>
          );
        })}
      </div>
    </section>
  );
};

export default Values;
