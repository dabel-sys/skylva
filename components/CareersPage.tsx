
import React from 'react';
import { m } from 'framer-motion';
import { ArrowUpRight, Users, Briefcase, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import TextReveal from './TextReveal';

const CareersPage: React.FC = () => {
  const { t } = useLanguage();

  const jobs = [
    { title: t.careers_page.role_1, loc: t.careers_page.loc_1, type: 'Full-time' },
    { title: t.careers_page.role_2, loc: t.careers_page.loc_2, type: 'Full-time' },
    { title: t.careers_page.role_3, loc: t.careers_page.loc_3, type: 'Contract' },
  ];

  return (
    <div className="bg-white text-skylva-charcoal min-h-screen pt-24 pb-20">
      
      {/* Hero */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto py-20 text-center">
         <h1 className="text-5xl md:text-7xl font-display font-light mb-8 text-skylva-charcoal leading-[0.9]">
           <TextReveal mode="words" stagger={0.05}>{t.careers_page.title}</TextReveal>
         </h1>
         <p className="text-xl text-gray-500 font-sans font-light max-w-2xl mx-auto leading-relaxed mb-12">
           {t.careers_page.subtitle}
         </p>
         <div className="w-full h-[1px] bg-gray-100 mb-20" />
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            <div className="flex flex-col gap-4">
               <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-skylva-charcoal">
                  <Briefcase size={20} />
               </div>
               <h3 className="text-lg font-bold uppercase tracking-widest">Impact</h3>
               <p className="text-gray-500 font-light text-sm">Build structures that actually make a difference to the planet's energy grid.</p>
            </div>
            <div className="flex flex-col gap-4">
               <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-skylva-charcoal">
                  <Users size={20} />
               </div>
               <h3 className="text-lg font-bold uppercase tracking-widest">Culture</h3>
               <p className="text-gray-500 font-light text-sm">A flat hierarchy where the best idea wins, regardless of title.</p>
            </div>
            <div className="flex flex-col gap-4">
               <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-skylva-charcoal">
                  <Award size={20} />
               </div>
               <h3 className="text-lg font-bold uppercase tracking-widest">Excellence</h3>
               <p className="text-gray-500 font-light text-sm">We don't compromise on design or engineering standards.</p>
            </div>
         </div>
      </section>

      {/* Jobs List */}
      <section className="px-6 md:px-12 max-w-5xl mx-auto py-20 bg-gray-50 rounded-3xl">
         <h2 className="text-3xl font-display font-light mb-12 text-center">{t.careers_page.positions_title}</h2>
         
         <div className="flex flex-col gap-4">
            {jobs.map((job, idx) => (
               <m.div 
                 key={idx}
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ delay: idx * 0.1 }}
                 className="group bg-white p-6 md:p-8 rounded-2xl border border-gray-200 flex flex-col md:flex-row md:items-center justify-between hover:shadow-lg transition-all cursor-pointer"
               >
                  <div className="mb-4 md:mb-0">
                     <h3 className="text-xl font-bold text-skylva-charcoal mb-1 group-hover:text-skylva-green transition-colors">{job.title}</h3>
                     <div className="flex items-center gap-4 text-sm text-gray-400 font-mono uppercase tracking-widest">
                        <span>{job.loc}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full" />
                        <span>{job.type}</span>
                     </div>
                  </div>
                  <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-skylva-charcoal text-white px-6 py-3 rounded-full group-hover:bg-skylva-green transition-colors">
                     {t.careers_page.btn_apply} <ArrowUpRight size={14} />
                  </button>
               </m.div>
            ))}
         </div>
      </section>

    </div>
  );
};

export default CareersPage;
