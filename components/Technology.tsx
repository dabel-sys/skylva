import React from 'react';
import { Cpu, Wifi, Sun } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Technology: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section id="technology" className="py-32 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/intelligence.png" 
          alt="SKYLVA Artificial Intelligence Core" 
          className="w-full h-full object-cover grayscale-[0.3]"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Main Text Block with Glass Design */}
        <div className="max-w-3xl mb-20 bg-black/10 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-2xl p-8 md:p-12">
          <h2 className="text-sm text-skylva-sand tracking-[0.3em] uppercase mb-6 font-semibold">{t.technology.label}</h2>
          <h3 className="text-4xl md:text-5xl font-display font-light leading-tight mb-8 text-white">
            {t.technology.title}
          </h3>
          <p className="text-white/80 font-sans font-light text-lg leading-relaxed">
            {t.technology.body}
          </p>
        </div>

        {/* Feature Grid with Glass Cards */}
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
            <div 
              key={idx} 
              className="bg-black/10 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-2xl p-8 group hover:border-skylva-sand/50 transition-all duration-500 hover:bg-black/70"
            >
              <div className="mb-6 opacity-80 group-hover:opacity-100 transition-opacity">{item.icon}</div>
              <h4 className="text-xl font-display font-normal mb-4 text-white">{item.title}</h4>
              <p className="text-sm text-white/60 font-sans font-light leading-relaxed group-hover:text-white/80 transition-colors">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technology;