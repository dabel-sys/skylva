
import React from 'react';
import { Menu, X, ArrowRight, Sparkles, MessageCircle } from 'lucide-react';
import { m, AnimatePresence, Variants } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';
import { useView } from '../../contexts/ViewContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { ViewState } from '../../types';
import { MobileNavProps } from './types';

const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  setIsOpen,
  navItems,
  handleNavClick,
  scrollProgress,
  isButtonVisible,
  onToggleChat
}) => {
  const { view, setView } = useView();
  const { t } = useLanguage();

  // Helper to get current page label
  const getViewLabel = (currentView: ViewState) => {
    switch (currentView) {
        case ViewState.LANDING: return t.nav.home; // Changed from 'Architectural Energy' to 'Home'
        case ViewState.STRUCTURES: return t.nav.product;
        case ViewState.TECHNOLOGY: return t.nav.technology;
        case ViewState.ATMOSPHERE: return t.experience.light_label;
        case ViewState.SUSTAINABILITY: return t.footer.link_sustainability;
        case ViewState.CAREERS: return t.footer.link_careers;
        case ViewState.PRESS: return t.footer.link_press;
        case ViewState.ABOUT: return t.footer.link_about;
        case ViewState.CONTACT: return t.footer.link_contact;
        case ViewState.PRIVACY: return t.footer.privacy;
        default: return 'SKYLVA';
    }
  };

  const currentLabel = getViewLabel(view);

  // Animation Variants for the Sheet
  const sheetVariants: Variants = {
    closed: { y: "100%", borderRadius: "0px" },
    open: { 
      y: 0, 
      borderRadius: "24px 24px 0 0",
      transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] as const }
    }
  };

  const linkVariants: Variants = {
    closed: { opacity: 0, x: -20 },
    open: (i: number) => ({ 
      opacity: 1, 
      x: 0,
      transition: { delay: 0.1 + i * 0.05, duration: 0.4, ease: "easeOut" }
    })
  };

  const handleQuickAction = (view: ViewState) => {
    setIsOpen(false);
    setView(view);
    if ((window as any).lenis) {
        (window as any).lenis.scrollTo(0, { immediate: true });
    } else {
        window.scrollTo(0, 0);
    }
  };

  const handleChatAction = () => {
    setIsOpen(false);
    onToggleChat();
  };

  return (
    <>
      {/* 
        FLOATING CONTROL DECK 
        Centered bottom bar that acts as the trigger and scroll indicator.
      */}
      <m.div 
        initial={{ y: 100 }}
        animate={{ 
          y: isButtonVisible || isOpen ? 0 : 100,
          opacity: isButtonVisible || isOpen ? 1 : 0
        }}
        transition={{ duration: 0.4 }}
        className="fixed bottom-6 left-4 right-4 z-[70] md:hidden flex justify-center items-end pointer-events-none mb-[env(safe-area-inset-bottom)]"
      >
        <div className="pointer-events-auto shadow-2xl shadow-black/40 rounded-full overflow-hidden relative group">
           
           {/* The Scroll Progress Fill */}
           <div className="absolute inset-0 bg-skylva-matte" />
           <m.div 
              className="absolute left-0 top-0 bottom-0 bg-white/10"
              style={{ width: `${scrollProgress * 100}%` }}
           />

           {/* The Bar Content */}
           <div className="relative flex items-center bg-transparent backdrop-blur-xl border border-white/10 rounded-full h-16 pl-6 pr-2 min-w-[300px] justify-between">
              
              {/* Left: Current Page Label ONLY */}
              <div className="flex flex-col justify-center max-w-[180px]">
                  <span className="text-sm font-display text-white tracking-widest truncate uppercase">
                    {isOpen ? 'MENU' : currentLabel}
                  </span>
              </div>

              {/* Right: Toggle Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center active:scale-90 transition-transform duration-200 shadow-lg flex-shrink-0 ml-4"
              >
                <m.div
                   animate={{ rotate: isOpen ? 90 : 0 }}
                   transition={{ duration: 0.4 }}
                >
                   {isOpen ? <X size={20} /> : <Menu size={20} />}
                </m.div>
              </button>

           </div>
        </div>
      </m.div>

      {/* 
        BACKDROP OVERLAY 
      */}
      <AnimatePresence>
        {isOpen && (
           <m.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             onClick={() => setIsOpen(false)}
             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
           />
        )}
      </AnimatePresence>

      {/* 
        MENU SHEET
        Slides up like an iOS app sheet.
      */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            variants={sheetVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-x-0 bottom-0 top-[10vh] bg-[#0A0A0A] z-[65] md:hidden flex flex-col overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.5)] border-t border-white/10"
          >
             {/* Sheet Handle */}
             <div className="w-full flex justify-center pt-4 pb-2" onClick={() => setIsOpen(false)}>
                <div className="w-12 h-1 bg-white/20 rounded-full" />
             </div>

             {/* Content Container */}
             <div className="flex-1 flex flex-col px-6 pb-28 overflow-y-auto no-scrollbar">
                
                {/* 1. Main Navigation Links */}
                <div className="py-8 space-y-2">
                   {navItems.map((item, i) => (
                      <m.div
                        key={item.label}
                        custom={i}
                        variants={linkVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                      >
                         <a 
                           href={item.href}
                           onClick={(e) => handleNavClick(e, item)}
                           className="flex items-center justify-between group py-3 border-b border-white/5 active:bg-white/5 transition-colors -mx-4 px-4 rounded-xl"
                         >
                            <span className="text-3xl font-display font-light text-white group-hover:text-skylva-green transition-colors">
                               {item.label}
                            </span>
                            <ArrowRight className="text-white/20 group-hover:text-white transition-colors" size={20} />
                         </a>
                      </m.div>
                   ))}
                </div>

                {/* 2. Quick Actions Grid (Thumb Zone) */}
                <div className="mt-auto pt-8">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-4 block">Quick Access</span>
                    <div className="grid grid-cols-2 gap-3">
                        <button 
                            onClick={() => handleQuickAction(ViewState.CONTACT)}
                            className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 active:scale-95 transition-all active:bg-white/10"
                        >
                            <Sparkles className="text-skylva-sand" size={20} />
                            <span className="text-xs font-bold uppercase tracking-widest text-white">Config</span>
                        </button>
                        <button 
                            onClick={handleChatAction}
                            className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 active:scale-95 transition-all active:bg-white/10"
                        >
                            <MessageCircle className="text-skylva-green" size={20} />
                            <span className="text-xs font-bold uppercase tracking-widest text-white">AI Assistant</span>
                        </button>
                    </div>
                </div>

                {/* 3. Language & Meta */}
                <div className="mt-8 flex justify-between items-end border-t border-white/10 pt-6">
                    <div className="flex gap-4">
                        <LanguageSwitcher activeClass="text-white font-bold" inactiveClass="text-white/40" />
                    </div>
                    <div className="text-right">
                        <div className="text-[10px] font-mono text-white/30 uppercase">Oslo • Amsterdam</div>
                    </div>
                </div>

             </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;
