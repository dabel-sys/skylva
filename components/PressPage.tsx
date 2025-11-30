
import React from 'react';
import { m } from 'framer-motion';
import { Download, Mail, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import TextReveal from './TextReveal';

const PressPage: React.FC = () => {
  const { t } = useLanguage();

  const articles = [
    { title: t.press_page.article_1_title, source: t.press_page.article_1_source, date: 'Oct 2024' },
    { title: t.press_page.article_2_title, source: t.press_page.article_2_source, date: 'Sep 2024' },
    { title: t.press_page.article_3_title, source: t.press_page.article_3_source, date: 'Aug 2024' },
  ];

  return (
    <div className="bg-skylva-offwhite text-skylva-charcoal min-h-screen pt-24 pb-20">
      
      {/* Header */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto py-20">
         <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 block">Media</span>
         <h1 className="text-6xl md:text-9xl font-display font-light mb-12 leading-[0.85]">
           <TextReveal mode="chars" stagger={0.03}>{t.press_page.title}</TextReveal>
         </h1>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-gray-300 pt-12">
            <div>
               <h3 className="text-xl font-display mb-6">{t.press_page.contact_title}</h3>
               <a href={`mailto:${t.press_page.contact_email}`} className="text-3xl font-light hover:text-skylva-green transition-colors flex items-center gap-3">
                  <Mail size={24} /> {t.press_page.contact_email}
               </a>
            </div>
            <div className="flex flex-col items-start justify-center">
               <button className="flex items-center gap-3 px-8 py-4 bg-skylva-charcoal text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors">
                  <Download size={16} /> {t.press_page.download_kit}
               </button>
               <span className="mt-4 text-xs text-gray-400 font-mono">ZIP • 24.5 MB • Updated Nov 2024</span>
            </div>
         </div>
      </section>

      {/* Featured Articles */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto py-20">
         <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-12">{t.press_page.featured_title}</h2>
         
         <div className="space-y-8">
            {articles.map((article, idx) => (
               <m.div 
                 key={idx}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: idx * 0.1 }}
                 className="group border-b border-gray-200 pb-8 cursor-pointer"
               >
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                     <div>
                        <span className="text-xs font-mono uppercase tracking-widest text-skylva-green mb-2 block">{article.source}</span>
                        <h3 className="text-3xl md:text-5xl font-display font-light group-hover:translate-x-4 transition-transform duration-500">
                           {article.title}
                        </h3>
                     </div>
                     <div className="flex items-center gap-4 text-gray-400">
                        <span className="text-sm font-mono">{article.date}</span>
                        <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-skylva-charcoal group-hover:text-white transition-colors">
                           <ArrowUpRight size={16} />
                        </div>
                     </div>
                  </div>
               </m.div>
            ))}
         </div>
      </section>

    </div>
  );
};

export default PressPage;
