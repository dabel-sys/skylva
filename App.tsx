
import React from 'react';
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
import Values from './components/Values';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import ScrollGauge from './components/ScrollGauge';
import ContactPage from './components/ContactPage';
import StructuresPage from './components/StructuresPage';
import TechnologyPage from './components/TechnologyPage';
import AtmospherePage from './components/AtmospherePage';

const MainContent = () => (
  <main>
    <Hero />
    <Philosophy />
    <ProductShowcase />
    <ProcessFlow />
    <Experience />
    <Technology />
    <ConfiguratorCTA />
    <Values />
  </main>
);

const AppContent = () => {
  const { view } = useView();

  return (
    <div className="bg-skylva-offwhite text-skylva-charcoal font-sans selection:bg-skylva-green selection:text-white relative">
      <ScrollGauge />
      <Navigation />
      
      {view === ViewState.LANDING && <MainContent />}
      {view === ViewState.CONTACT && <ContactPage />}
      {view === ViewState.STRUCTURES && <StructuresPage />}
      {view === ViewState.TECHNOLOGY && <TechnologyPage />}
      {view === ViewState.ATMOSPHERE && <AtmospherePage />}
      
      <Footer />
      <ChatWidget />
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
