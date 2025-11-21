import React from 'react';
import { motion } from 'framer-motion';

interface FeatureProps {
  title: string;
  desc: string;
  image: string;
  delay: number;
}

const Feature: React.FC<FeatureProps> = ({ title, desc, image, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    className="group relative h-[500px] md:h-[600px] w-full overflow-hidden cursor-pointer"
  >
    <img 
      src={image} 
      alt={title} 
      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale-[20%]" 
    />
    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500"></div>
    <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/60 to-transparent text-white">
      <h3 className="text-2xl font-light mb-2">{title}</h3>
      <p className="text-sm text-white/80 max-w-xs font-light leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

export const ProductShowcase: React.FC = () => {
  return (
    <section id="product" className="bg-skylva-stone/30 py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 flex flex-col md:flex-row justify-between items-end">
          <div>
             <h2 className="text-4xl md:text-5xl font-light mb-4 text-skylva-charcoal">The Collection</h2>
             <p className="text-skylva-charcoal/60 font-light">Designed for longevity. Engineered for silence.</p>
          </div>
          <button className="hidden md:block text-xs uppercase tracking-widest border-b border-skylva-charcoal pb-1 hover:text-skylva-concrete hover:border-skylva-concrete transition-colors">
            View Full Catalogue
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-1">
          <Feature 
            title="The Canopy" 
            desc="A freestanding architectural shelter providing deep shade and 4.2kWp energy generation."
            image="https://picsum.photos/seed/skylva_canopy/600/800"
            delay={0}
          />
          <Feature 
            title="The Patio" 
            desc="Wall-mounted extension extending your living space. Seamless integration with existing architecture."
            image="https://picsum.photos/seed/skylva_patio/600/800"
            delay={0.2}
          />
          <Feature 
            title="The Louver" 
            desc="Automated tilting slats that track the sun. AI-driven for optimal light control."
            image="https://picsum.photos/seed/skylva_louver/600/800"
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
};