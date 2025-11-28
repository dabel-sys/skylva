import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const Materials: React.FC = () => {
  const { t } = useLanguage();
  const materials = [
    {
      name: t.materials.m1_name,
      desc: t.materials.m1_desc,
      image: "https://picsum.photos/seed/skylva_pine_texture_v2/600/800"
    },
    {
      name: t.materials.m2_name,
      desc: t.materials.m2_desc,
      image: "https://picsum.photos/seed/skylva_aluminum_matte_v2/600/800"
    },
    {
      name: t.materials.m3_name,
      desc: t.materials.m3_desc,
      image: "https://picsum.photos/seed/skylva_glass_reflection_v2/600/800"
    }
  ];

  return (
    <section id="materials" className="py-32 bg-skylva-offwhite">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="mb-20 max-w-2xl"
        >
          <span className="text-skylva-green text-xs font-bold tracking-[0.2em] uppercase block mb-4">{t.materials.label}</span>
          <h2 className="text-4xl md:text-5xl font-display font-light text-skylva-charcoal mb-8">
            {t.materials.title}
          </h2>
          <p className="text-gray-500 font-sans font-light text-lg leading-relaxed">
            {t.materials.body}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
          {materials.map((mat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
            >
              <div className="aspect-[4/5] bg-gray-200 mb-8 overflow-hidden relative group">
                <img 
                  src={mat.image} 
                  alt={mat.name} 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 grayscale-[0.2]" 
                />
              </div>
              <h3 className="text-2xl font-display font-light text-skylva-charcoal mb-4">{mat.name}</h3>
              <p className="text-gray-500 font-sans font-light text-sm leading-relaxed border-t border-gray-200 pt-4">
                {mat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Materials;