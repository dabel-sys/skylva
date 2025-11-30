
import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useView } from '../contexts/ViewContext';
import { ViewState } from '../types';

const CookieConsent: React.FC = () => {
  const { t } = useLanguage();
  const { setView } = useView();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('skylva_cookie_consent');
    if (!consent) {
      // Delay showing slightly for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('skylva_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('skylva_cookie_consent', 'declined');
    setIsVisible(false);
  };

  const handlePolicyClick = () => {
    setView(ViewState.PRIVACY);
    window.scrollTo(0, 0);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <m.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-6 z-[80] max-w-sm w-full md:w-auto"
        >
          <div className="bg-skylva-matte/90 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl text-white">
            <div className="flex items-start justify-between mb-4">
               <div className="flex items-center gap-2 text-skylva-sand">
                  <Cookie size={18} />
                  <h4 className="text-xs font-bold uppercase tracking-widest">{t.cookie.title}</h4>
               </div>
               {/* Optional Close X, generally better to force a choice in EU, but X to dismiss (implied decline/ignore) is sometimes used. Sticking to buttons. */}
            </div>
            
            <p className="text-sm font-light text-white/70 leading-relaxed mb-6">
              {t.cookie.body}
            </p>

            <div className="flex flex-col gap-3">
               <button 
                 onClick={handleAccept}
                 className="w-full py-3 bg-white text-black rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-skylva-sand transition-colors"
               >
                 {t.cookie.accept}
               </button>
               
               <div className="flex gap-3">
                 <button 
                   onClick={handleDecline}
                   className="flex-1 py-3 bg-white/5 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
                 >
                   {t.cookie.decline}
                 </button>
                 <button 
                   onClick={handlePolicyClick}
                   className="flex-1 py-3 text-white/50 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors underline decoration-white/20 underline-offset-4"
                 >
                   {t.cookie.policy}
                 </button>
               </div>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
