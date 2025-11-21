import React from 'react';
import { Hero } from './components/Hero';
import { Philosophy } from './components/Philosophy';
import { ProductShowcase } from './components/ProductShowcase';
import { Values } from './components/Values';
import { AiAssistant } from './components/AiAssistant';
import { ArrowUpRight, Cpu, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  return (
    <div className="bg-skylva-white min-h-screen text-skylva-charcoal font-sans selection:bg-skylva-stone selection:text-skylva-charcoal">
      
      <main>
        <Hero />
        <Philosophy />
        
        {/* Steps Section */}
        <section className="py-32 px-6 border-t border-skylva-stone/50">
          <div className="max-w-7xl mx-auto">
             <div className="grid md:grid-cols-3 gap-12">
                {[
                  { step: "01", title: "Design", desc: "Configure your structure in 3D, guided by our AI Architect." },
                  { step: "02", title: "Craft", desc: "Precision manufacturing in Scandinavia using low-carbon aluminium." },
                  { step: "03", title: "Live", desc: "Professional installation. Immediate energy generation. Zero maintenance." }
                ].map((item, idx) => (
                  <motion.div 
                    key={item.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 }}
                    className="border-l border-skylva-charcoal/10 pl-8"
                  >
                    <span className="block text-4xl font-light text-skylva-concrete mb-4">{item.step}</span>
                    <h3 className="text-xl font-medium uppercase tracking-wide mb-2">{item.title}</h3>
                    <p className="text-skylva-charcoal/60 font-light">{item.desc}</p>
                  </motion.div>
                ))}
             </div>
          </div>
        </section>

        <ProductShowcase />

        {/* Technology Section */}
        <section id="technology" className="py-32 px-6 bg-skylva-white relative overflow-hidden">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
             <div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-3 py-1 border border-skylva-charcoal/20 rounded-full mb-6"
                >
                  <Cpu className="w-4 h-4 text-skylva-charcoal" />
                  <span className="text-xs uppercase tracking-widest">Skylva Core OS</span>
                </motion.div>
                <h2 className="text-4xl md:text-6xl font-light mb-8 leading-tight">
                  It thinks,<br/> so you don't have to.
                </h2>
                <p className="text-lg text-skylva-charcoal/70 font-light mb-8 leading-relaxed">
                  The integrated neural processing unit analyzes weather patterns, sun trajectory, and your energy consumption habits. It adjusts the louvers automatically to maximize efficiency or comfort, before you even ask.
                </p>
                <ul className="space-y-4 font-light text-sm text-skylva-charcoal/80">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-skylva-concrete" />
                    Self-learning shade optimization
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-skylva-concrete" />
                    Seamless Tesla Powerwall integration
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-skylva-concrete" />
                    Over-the-air performance updates
                  </li>
                </ul>
             </div>
             <div className="relative">
                <div className="aspect-square bg-skylva-stone/20 rounded-full flex items-center justify-center">
                  {/* Abstract representation of AI/Tech */}
                  <div className="w-64 h-64 border border-skylva-charcoal/10 rounded-full animate-[spin_10s_linear_infinite]"></div>
                  <div className="absolute w-48 h-48 border border-skylva-charcoal/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                  <div className="absolute w-32 h-32 bg-skylva-charcoal rounded-full shadow-2xl flex items-center justify-center">
                     <span className="text-white text-xs font-mono">AI CORE</span>
                  </div>
                </div>
             </div>
          </div>
        </section>

        <Values />

        {/* CTA Section */}
        <section className="py-40 px-6 bg-skylva-white text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-light mb-8 tracking-tight">Design your SKYLVA.</h2>
            <button className="group relative inline-flex items-center justify-center px-12 py-5 bg-skylva-charcoal text-white overflow-hidden transition-all hover:bg-black">
              <span className="relative z-10 text-sm uppercase tracking-[0.2em] font-medium mr-2">Start Configurator</span>
              <ArrowUpRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-skylva-charcoal text-skylva-stone py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div>
            <h4 className="text-xl font-semibold uppercase tracking-[0.2em] text-white mb-6">Skylva</h4>
            <p className="text-sm font-light max-w-xs opacity-60">
              Defining the future of architectural energy. <br/>
              Designed in Stockholm. Assembled in Europe.
            </p>
          </div>
          <div className="flex gap-16 text-xs uppercase tracking-widest">
            <ul className="space-y-4 opacity-70">
              <li className="hover:opacity-100 hover:text-white hover:-translate-y-1 cursor-pointer transition-all duration-300">Models</li>
              <li className="hover:opacity-100 hover:text-white hover:-translate-y-1 cursor-pointer transition-all duration-300">Technology</li>
              <li className="hover:opacity-100 hover:text-white hover:-translate-y-1 cursor-pointer transition-all duration-300">Sustainability</li>
            </ul>
            <ul className="space-y-4 opacity-70">
              <li className="hover:opacity-100 hover:text-white hover:-translate-y-1 cursor-pointer transition-all duration-300">Configurator</li>
              <li className="hover:opacity-100 hover:text-white hover:-translate-y-1 cursor-pointer transition-all duration-300">Contact</li>
              <li className="hover:opacity-100 hover:text-white hover:-translate-y-1 cursor-pointer transition-all duration-300">Press</li>
            </ul>
            <ul className="space-y-4 opacity-70">
              <li className="hover:opacity-100 hover:text-white hover:-translate-y-1 cursor-pointer transition-all duration-300">Instagram</li>
              <li className="hover:opacity-100 hover:text-white hover:-translate-y-1 cursor-pointer transition-all duration-300">LinkedIn</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between text-[10px] uppercase tracking-widest opacity-40">
          <span>© 2024 SKYLVA Architecture AB</span>
          <div className="flex gap-6 mt-4 md:mt-0">
             <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
             <span className="hover:text-white cursor-pointer transition-colors">Terms of Use</span>
          </div>
        </div>
      </footer>

      <AiAssistant />
    </div>
  );
};

export default App;
