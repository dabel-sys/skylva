import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const steps = [
  {
    id: '01',
    title: 'Dream',
    subtitle: 'The Vision',
    description: 'Envision a sanctuary where light and shadow play. Define your connection to the outdoors.',
    image: 'https://picsum.photos/seed/skylva_dream_nature/600/800',
    action: 'Explore Gallery'
  },
  {
    id: '02',
    title: 'Design',
    subtitle: 'The Creation',
    description: 'Customize dimensions, materials, and solar capacity in our real-time 3D studio.',
    image: 'https://picsum.photos/seed/skylva_blueprint_arch/600/800',
    action: 'Start Configurator'
  },
  {
    id: '03',
    title: 'Order',
    subtitle: 'The Realization',
    description: 'Precision manufacturing in Scandinavia. Delivered directly to your foundation.',
    image: 'https://picsum.photos/seed/skylva_modern_house/600/800',
    action: 'View Lead Times'
  }
];

const ProcessFlow: React.FC = () => {
  return (
    <section className="bg-white py-32 border-b border-gray-100 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center md:text-left"
        >
          <span className="text-skylva-green text-xs font-bold tracking-[0.2em] uppercase block mb-4">The Process</span>
          <h2 className="text-3xl md:text-4xl font-display font-light text-skylva-matte">Your journey to silence.</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              className="group relative flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-8 w-full rounded-2xl border-[0.8pt] border-black/5">
                 <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700 z-10" />
                 <img 
                   src={step.image} 
                   alt={step.title}
                   className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100" 
                 />
                 
                 {/* Number Overlay */}
                 <div className="absolute top-6 left-6 z-20">
                    <span className="text-6xl font-display font-thin text-white/80 group-hover:text-white transition-colors duration-500 drop-shadow-md">
                      {step.id}
                    </span>
                 </div>
              </div>

              {/* Text Content */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-baseline space-x-4 mb-3">
                   <h3 className="text-2xl font-display font-light text-skylva-matte group-hover:text-skylva-green transition-colors duration-300">
                     {step.title}
                   </h3>
                   <span className="text-xs font-sans text-gray-400 uppercase tracking-widest">{step.subtitle}</span>
                </div>
                
                <p className="text-gray-600 font-sans font-light text-sm leading-relaxed mb-8 border-l border-gray-200 pl-4 group-hover:border-skylva-green/50 transition-colors duration-500">
                  {step.description}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center group-hover:border-gray-200 transition-colors duration-500">
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 group-hover:text-skylva-matte transition-colors duration-300">
                    {step.action}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-skylva-matte group-hover:text-white transition-all duration-300">
                    <ArrowRight size={12} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessFlow;