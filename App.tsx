
import React, { useEffect } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import { LanguageProvider } from './contexts/LanguageContext';
import { ViewProvider, useView } from './contexts/ViewContext';
import { ViewState } from './types';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import ProductShowcase from './components/ProductShowcase';
import ProcessFlow from './components/ProcessFlow';
import Experience from './components/Experience';
import Technology from './components/Technology';
import ConfiguratorCTA from './components/ConfiguratorCTA';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import ScrollGauge from './components/ScrollGauge';
import ContactPage from './components/ContactPage';
import StructuresPage from './components/StructuresPage';
import TechnologyPage from './components/TechnologyPage';
import AtmospherePage from './components/AtmospherePage';
import SustainabilityPage from './components/SustainabilityPage';
import CareersPage from './components/CareersPage';
import PressPage from './components/PressPage';
import AboutPage from './components/AboutPage';
import PrivacyPage from './components/PrivacyPage';
import CookieConsent from './components/CookieConsent';

const MainContent = () => (
  <main>
    <Hero />
    <Philosophy />
    <ProductShowcase />
    <ProcessFlow />
    <Experience />
    <Technology />
    <ConfiguratorCTA />
  </main>
);

const AppContent = () => {
  const { view } = useView();

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    // Check if Lenis is loaded from the CDN script
    if ((window as any).Lenis) {
      const lenis = new (window as any).Lenis({
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical', 
        gestureOrientation: 'vertical',
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      
      requestAnimationFrame(raf);
      (window as any).lenis = lenis; // Expose for Navigation.tsx

      return () => {
        lenis.destroy();
        delete (window as any).lenis;
      };
    }
  }, []);

  // Global Scroll Reset on View Change
  useEffect(() => {
    if ((window as any).lenis) {
      // Immediate scroll to top without animation for page transitions
      (window as any).lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [view]);

  return (
    <div className="bg-skylva-offwhite text-skylva-charcoal font-sans selection:bg-skylva-green selection:text-white relative">
      <ScrollGauge />
      <Navigation />
      
      {view === ViewState.LANDING && <MainContent />}
      {view === ViewState.CONTACT && <ContactPage />}
      {view === ViewState.STRUCTURES && <StructuresPage />}
      {view === ViewState.TECHNOLOGY && <TechnologyPage />}
      {view === ViewState.ATMOSPHERE && <AtmospherePage />}
      {view === ViewState.SUSTAINABILITY && <SustainabilityPage />}
      {view === ViewState.CAREERS && <CareersPage />}
      {view === ViewState.PRESS && <PressPage />}
      {view === ViewState.ABOUT && <AboutPage />}
      {view === ViewState.PRIVACY && <PrivacyPage />}
      
      <Footer />
      <ChatWidget />
      <CookieConsent />
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <ViewProvider>
        <LazyMotion features={domAnimation}>
          <AppContent />
        </LazyMotion>
      </ViewProvider>
    </LanguageProvider>
  );
}

export default App;
