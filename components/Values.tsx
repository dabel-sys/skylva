
import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const Values: React.FC = () => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const valuesData = [
    {
      id: 0,
      label: t.values.silence,
      image: '/images/value-silence.jpg', // Fallback or use placeholder logic below
      desc: 'Quiet power. Systems that work without being heard.'
    },
    {
      id: 1,
      label: t.values.light,
      image: '/images/value-light.jpg',
      desc: 'Shaping shadows. Filtering the sun, not blocking it.'
    },
    {
      id: 2,
      label: t.values.nature,
      image: '/images/value-nature.jpg',
      desc: 'Biophilic design. Materials that breathe and age.'
    },
    {
      id: 3,
      label: t.values.intelligence,
      image: '/images/value-tech.jpg',
      desc: 'Predictive energy. Algorithms that know the weather.'
    },
    {
      id: 4,
      label: t.values.precision,
      image: '/images/value-precision.jpg',
      desc: 'Millimeter perfect. Aerospace-grade aluminum joinery.'
    },
    {
      id: 5,
      label: t.values.longevity,
      image: '/images/value-time.jpg',
      desc: 'Built for generations. Resistant to the harshest North.'
    }
  ];

  // Map images to high-quality unsplash seeds for demo purposes
  const getImageUrl = (index: number) => {
    const seeds = [
      'skylva_fog_mist_calm', // Silence
      'skylva_sun_rays_shadows', // Light
      'skylva_forest_texture_wood', // Nature
      'skylva_abstract_network_nodes', // Intelligence
      'skylva_metal_structure_detail', // Precision
      'skylva_ancient_stone_rock' // Longevity
    ];
    return `https://picsum.photos/seed/${seeds[index]}/1600/900`;
  };

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center bg-black overflow-hidden py-12">
      
      {/* Dynamic Background Layer */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <m.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.6, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <img 
              src={getImageUrl(activeIndex)}
              alt={valuesData[activeIndex].label}
              className="w-full h-full object-cover grayscale-[0.5]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
          </m.div>
        </AnimatePresence>
        
        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-80" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full h-full flex flex-col md:flex-row items-center md:items-stretch">
        
        {/* Label & Description (Desktop: Left, Mobile: Top) */}
        <div className="w-full md:w-1/3 flex flex-col justify-center mb-12 md:mb-0 pointer-events-none">
          <span className="text-skylva-green text-xs font-bold tracking-[0.2em] uppercase mb-8 block">
            Core Principles
          </span>
          <AnimatePresence mode="wait">
             <m.div
               key={activeIndex}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               transition={{ duration: 0.4 }}
             >
               <h3 className="text-white text-xl md:text-2xl font-display font-light mb-4">
                 0{activeIndex + 1} // {valuesData[activeIndex].label}
               </h3>
               <p className="text-gray-400 font-sans font-light text-sm md:text-base leading-relaxed max-w-xs">
                 {valuesData[activeIndex].desc}
               </p>
             </m.div>
          </AnimatePresence>
        </div>

        {/* Interactive List (Desktop: Right, Mobile: Bottom) */}
        <div className="w-full md:w-2/3 flex flex-col justify-center items-start md:items-end">
          <div className="flex flex-col space-y-2 md:space-y-0">
            {valuesData.map((val, idx) => (
              <m.div 
                key={idx}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                className="group relative cursor-pointer py-2 md:py-4"
              >
                {/* Text Effect: Solid Gray to White */}
                <h2 
                  className={`
                    text-5xl md:text-8xl lg:text-9xl font-display font-bold tracking-tight uppercase transition-all duration-500
                    ${activeIndex === idx 
                      ? 'text-white translate-x-4 md:-translate-x-8' 
                      : 'text-white/20 blur-[1px] hover:text-white/60 hover:blur-0'}
                  `}
                >
                  {val.label}
                </h2>
                
                {/* Hover Line */}
                <m.div 
                  className={`h-[1px] bg-skylva-green absolute bottom-0 right-0 transition-all duration-500 ${activeIndex === idx ? 'w-full opacity-100' : 'w-0 opacity-0'}`}
                />
              </m.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Values;
