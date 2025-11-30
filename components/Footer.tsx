
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useView } from '../contexts/ViewContext';
import { ViewState } from '../types';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { setView } = useView();

  const handleLinkClick = (e: React.MouseEvent, view: ViewState) => {
    e.preventDefault();
    setView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-skylva-matte text-white/60 py-16 border-t border-white/5 relative z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <h4 className="text-white font-display text-xl tracking-widest uppercase mb-6">Skylva</h4>
            <p className="text-sm font-sans font-light leading-relaxed">
              SKYLVA BV<br />
              Schuttersweg 8<br />
              1217 PZ HILVERSUM
            </p>
          </div>
          
          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-widest mb-6">{t.footer.col_explore}</h5>
            <ul className="space-y-4 text-sm font-light">
              <li><a href="#structures" onClick={(e) => handleLinkClick(e, ViewState.STRUCTURES)} className="hover:text-white transition-colors">{t.nav.product}</a></li>
              <li><a href="#technology" onClick={(e) => handleLinkClick(e, ViewState.TECHNOLOGY)} className="hover:text-white transition-colors">{t.nav.technology}</a></li>
            </ul>
          </div>

          <div>
             <h5 className="text-white text-xs font-bold uppercase tracking-widest mb-6">{t.footer.col_company}</h5>
            <ul className="space-y-4 text-sm font-light">
              <li><a href="#" onClick={(e) => handleLinkClick(e, ViewState.ABOUT)} className="hover:text-white transition-colors">{t.footer.link_about}</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick(e, ViewState.SUSTAINABILITY)} className="hover:text-white transition-colors">{t.footer.link_sustainability}</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick(e, ViewState.CAREERS)} className="hover:text-white transition-colors">{t.footer.link_careers}</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick(e, ViewState.PRESS)} className="hover:text-white transition-colors">{t.footer.link_press}</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick(e, ViewState.CONTACT)} className="hover:text-white transition-colors">{t.footer.link_contact}</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-widest mb-6">{t.footer.col_newsletter}</h5>
            <div className="flex border-b border-white/20 pb-2">
              <input type="email" placeholder="Email Address" className="bg-transparent border-none focus:ring-0 text-white w-full font-light text-sm" />
              <button className="text-xs uppercase font-bold text-white hover:text-skylva-sand">{t.footer.btn_join}</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-xs font-light text-white/30">
          <div className="mb-4 md:mb-0">
            &copy; 2025 {t.footer.rights}
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white">{t.footer.privacy}</a>
            <a href="#" className="hover:text-white">{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
