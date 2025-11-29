
import React from 'react';
import { m } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import TextReveal from './TextReveal';

const Values: React.FC = () => {
  const { t } = useLanguage();

  const valuesData = [
    {
      id: 0,
      label: t.values.silence,
      desc: 'Quiet power. Systems that work without being heard.',
      image: 'https://picsum.photos/seed/skylva_scandinavian_misty_lake/1600/900',
      tech: '0dB OPERATION',
      span: 'md:col-span-2'
    },
    {
      id: 1,
      label: t.values.light,
      desc: 'Shaping shadows. Filtering the sun, not blocking it.',
      image: 'https://picsum.photos/seed/skylva_nordic_sunlight_forest/1600/900',
      tech: '98% TRANSMISSION',
      span: 'md:col-span-1'
    },
    {
      id: 2,
      label: t.values.nature,
      desc: 'Biophilic design. Materials that breathe and age.',
      image: 'https://picsum.photos/seed/skylva_deep_pine_forest/1600/900',
      tech: 'FSC CERTIFIED',
      span: 'md:col-span-1'
    },
    {
      id: 3,
      label: t.values.intelligence,
      desc: 'Predictive energy. Algorithms that know the weather.',
      image: 'https://picsum.photos/seed/skylva_northern_lights_aurora/1600/900',
      tech: 'NEURAL NET V4',
      span: 'md:col-span-2'
    },
    {
      id: 4,
      label: t.values.precision,
      desc: 'Millimeter perfect. Aerospace-grade aluminum joinery.',
      image: 'https://picsum.photos/seed/skylva_glacier_ice_detail/1600/900',
      tech: '±0.5mm TOLERANCE',
      span: 'md:col-span-1'
    },
    {
      id: 5,
      label: t.values.longevity,
      desc: 'Built for generations. Resistant to the harshest North.',
      image: 'https://picsum.photos/seed/skylva_granite_coast_rock/1600/900',
      tech: '50YR LIFESPAN',
      span: 'md:col-span-3'
    }
  ];

  return (
    <section className="min-h-[100dvh] bg-skylva-matte text-white py-24 md:py-32 flex flex-col justify-center relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        
        {/* Header */}
        <div className="mb-20 text-center md:text-left">
           <m.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-3 mb-6 bg-white/5 px-4 py-2 rounded-full border border-white/10"
           >
              <span className="w-1.5 h-1.5 bg-skylva-green rounded-full animate-pulse" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400">Core DNA</span>
           </m.div>
           <h2 className="text-4xl md:text-6xl font-display font-light leading-tight">
             <TextReveal mode="chars" stagger={0.02}>Built on Principle.</TextReveal>
           </h2>
        </div>

        {/* Tesla-Inspired Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {valuesData.map((val, idx) => (
            <m.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className={`
                group relative h-[400px] md:h-[500px] bg-white/5 rounded-3xl overflow-hidden border border-white/10
                ${val.span}
              `}
            >
              {/* Image Layer */}
              <div className="absolute inset-0 overflow-hidden">
                 <m.img 
                   src={val.image} 
                   alt={val.label}
                   className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-[1.5s] ease-out"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              </div>

              {/* Content Layer */}
              <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between">
                 {/* Top Tech Spec */}
                 <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase border border-white/10 px-2 py-1 rounded backdrop-blur-sm">
                        {val.tech}
                    </span>
                 </div>

                 {/* Bottom Text */}
                 <div>
                    <h3 className="text-3xl md:text-4xl font-display font-light mb-3 text-white">
                        {val.label}
                    </h3>
                    <p className="text-gray-300 font-sans font-light text-sm md:text-base leading-relaxed max-w-sm opacity-80 group-hover:opacity-100 transition-opacity">
                        {val.desc}
                    </p>
                 </div>
              </div>
            </m.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Values;
