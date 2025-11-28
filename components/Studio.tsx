import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const Studio: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section id="studio" className="py-32 bg-skylva-stone border-t border-white/50">
       <div className="max-w-7xl mx-auto px-6 md:px-12">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
            >
              <img 
                src="/images/studio.png" 
                alt="SKYLVA Design Studio" 
                className="w-full h-auto object-cover shadow-2xl shadow-black/5 grayscale-[0.1] rounded-2xl border-[0.8pt] border-black/5"
              />
            </motion.div>

            <motion.div
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-skylva-green text-xs font-bold tracking-[0.2em] uppercase block mb-4">{t.studio.label}</span>
              <h2 className="text-4xl md:text-5xl font-display font-light text-skylva-charcoal mb-8">
                {t.studio.title}
              </h2>
              <p className="text-gray-600 font-sans font-light text-lg leading-relaxed mb-8">
                {t.studio.body}
              </p>
              
              <div className="space-y-8">
                <div className="flex flex-col">
                  <span className="text-sm font-bold uppercase tracking-widest text-skylva-matte mb-2">{t.studio.cap_label}</span>
                  <p className="text-sm font-light text-gray-500">{t.studio.cap_desc}</p>
                </div>
                 <div className="flex flex-col">
                  <span className="text-sm font-bold uppercase tracking-widest text-skylva-matte mb-2">{t.studio.inq_label}</span>
                  <a href="mailto:studio@skylva.com" className="text-sm font-light text-skylva-green hover:text-skylva-matte transition-colors underline decoration-1 underline-offset-4">
                    {t.studio.inq_link}
                  </a>
                </div>
              </div>
            </motion.div>
         </div>
       </div>
    </section>
  );
};

export default Studio;