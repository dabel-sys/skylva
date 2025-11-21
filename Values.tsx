import React from 'react';
import { motion } from 'framer-motion';

const values = [
  "Silence", "Light", "Nature", "Intelligence", "Precision", "Longevity"
];

export const Values: React.FC = () => {
  return (
    <section className="py-24 bg-skylva-charcoal text-skylva-stone overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
          {values.map((val, idx) => (
            <motion.div
              key={val}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex flex-col items-center gap-4 group"
            >
              <div className="w-1 h-1 bg-skylva-stone rounded-full opacity-20 group-hover:opacity-100 transition-opacity"></div>
              <span className="text-lg md:text-xl font-light tracking-wide uppercase opacity-50 group-hover:opacity-100 transition-opacity duration-500 cursor-default">
                {val}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};