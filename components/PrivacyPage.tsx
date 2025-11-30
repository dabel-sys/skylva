
import React from 'react';
import { m } from 'framer-motion';
import { Shield, Lock, FileText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import TextReveal from './TextReveal';

const PrivacyPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-white text-skylva-charcoal min-h-screen pt-24 pb-20">
      
      {/* Header */}
      <section className="px-6 md:px-12 max-w-4xl mx-auto py-20 text-center">
         <div className="flex justify-center mb-6">
             <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-skylva-green">
                 <Shield size={32} />
             </div>
         </div>
         <h1 className="text-4xl md:text-6xl font-display font-light mb-8 text-skylva-charcoal leading-tight">
           <TextReveal mode="words" stagger={0.05}>{t.privacy_page.title}</TextReveal>
         </h1>
         <p className="text-lg text-gray-500 font-sans font-light max-w-2xl mx-auto leading-relaxed mb-8">
           {t.privacy_page.subtitle}
         </p>
         <span className="text-xs font-mono uppercase tracking-widest text-gray-400">{t.privacy_page.last_updated}</span>
      </section>

      {/* Content */}
      <section className="px-6 md:px-12 max-w-3xl mx-auto">
         <div className="prose prose-lg prose-gray font-light max-w-none">
            <p className="text-xl leading-relaxed mb-12 border-l-2 border-skylva-green pl-6">
               {t.privacy_page.intro}
            </p>

            <div className="space-y-12">
                <div>
                   <div className="flex items-center gap-3 mb-4">
                       <FileText size={20} className="text-skylva-charcoal" />
                       <h2 className="text-2xl font-display font-normal m-0">{t.privacy_page.section_1_title}</h2>
                   </div>
                   <p className="text-gray-600 leading-relaxed">
                       {t.privacy_page.section_1_body}
                   </p>
                </div>

                <div>
                   <div className="flex items-center gap-3 mb-4">
                       <Shield size={20} className="text-skylva-charcoal" />
                       <h2 className="text-2xl font-display font-normal m-0">{t.privacy_page.section_2_title}</h2>
                   </div>
                   <p className="text-gray-600 leading-relaxed">
                       {t.privacy_page.section_2_body}
                   </p>
                </div>

                <div>
                   <div className="flex items-center gap-3 mb-4">
                       <Lock size={20} className="text-skylva-charcoal" />
                       <h2 className="text-2xl font-display font-normal m-0">{t.privacy_page.section_3_title}</h2>
                   </div>
                   <p className="text-gray-600 leading-relaxed">
                       {t.privacy_page.section_3_body}
                   </p>
                </div>
            </div>
         </div>

         {/* Contact for Privacy */}
         <div className="mt-20 pt-12 border-t border-gray-100 text-center">
            <p className="text-sm font-light text-gray-400 mb-4">Questions about your data?</p>
            <a href="mailto:privacy@skylva.com" className="text-lg font-bold uppercase tracking-widest hover:text-skylva-green transition-colors">
                privacy@skylva.com
            </a>
         </div>
      </section>

    </div>
  );
};

export default PrivacyPage;
