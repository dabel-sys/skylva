import React from 'react';
import { Cpu, Wifi, Sun } from 'lucide-react';

const Technology: React.FC = () => {
  return (
    <section id="technology" className="py-32 bg-skylva-charcoal text-skylva-offwhite relative overflow-hidden">
      {/* Abstract background element */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-skylva-green/20 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-20">
          <h2 className="text-sm text-skylva-sand tracking-[0.3em] uppercase mb-6 font-semibold">Intelligence</h2>
          <h3 className="text-4xl md:text-5xl font-display font-light leading-tight mb-8">
            Designed for those who don’t <br/> need to explain.
          </h3>
          <p className="text-white/60 font-sans font-light text-lg leading-relaxed">
            Our proprietary AI Core doesn't just manage energy; it predicts it. 
            By analyzing local weather patterns and your usage habits, SKYLVA optimizes storage and consumption in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              icon: <Cpu size={32} className="text-skylva-sand" />,
              title: "AI-First Design",
              desc: "Self-learning algorithms adapt to seasons and shadows."
            },
            {
              icon: <Sun size={32} className="text-skylva-sand" />,
              title: "Optimized Generation",
              desc: "Bifacial glass-glass modules capture reflected light."
            },
            {
              icon: <Wifi size={32} className="text-skylva-sand" />,
              title: "Smart Integration",
              desc: "Seamless connection to home batteries and EV chargers."
            }
          ].map((item, idx) => (
            <div key={idx} className="border-t border-white/10 pt-8 group hover:border-skylva-sand transition-colors duration-500">
              <div className="mb-6 opacity-80 group-hover:opacity-100 transition-opacity">{item.icon}</div>
              <h4 className="text-xl font-display font-normal mb-4">{item.title}</h4>
              <p className="text-sm text-white/50 font-sans font-light leading-relaxed group-hover:text-white/70 transition-colors">
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