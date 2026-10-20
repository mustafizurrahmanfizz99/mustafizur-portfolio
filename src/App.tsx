import React, { useState } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { VideoShowcase } from './components/VideoShowcase';
import { AdsCaseStudies } from './components/AdsCaseStudies';
import { Testimonials } from './components/Testimonials';
import { CommissionForm } from './components/CommissionForm';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CustomSectionRenderer } from './components/CustomSectionRenderer';

function MainPortfolio() {
  const [activeTab, setActiveTab] = useState<'all' | 'ads' | 'video'>('all');
  const { sections, customSections } = usePortfolio();

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-200 antialiased selection:bg-amber-400 selection:text-slate-950">
      {/* Top Navigation with Admin Trigger */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area - Dynamically Rendered Sections */}
      <main>
        {sections
          .filter((sec) => sec.enabled)
          .map((sec) => {
            switch (sec.id) {
              case 'hero':
                return <Hero key={sec.id} onSelectTab={setActiveTab} />;
              case 'about':
                return <About key={sec.id} />;
              case 'services':
                return <Services key={sec.id} />;
              case 'videoShowcase':
                return (activeTab === 'all' || activeTab === 'video') ? (
                  <VideoShowcase key={sec.id} />
                ) : null;
              case 'caseStudies':
                return (activeTab === 'all' || activeTab === 'ads') ? (
                  <AdsCaseStudies key={sec.id} />
                ) : null;
              case 'testimonials':
                return <Testimonials key={sec.id} />;
              case 'contact':
                return <CommissionForm key={sec.id} />;
              default: {
                const customSec = customSections.find((cs) => cs.id === sec.id);
                if (customSec && customSec.enabled) {
                  return <CustomSectionRenderer key={sec.id} section={customSec} />;
                }
                return null;
              }
            }
          })}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Admin Panel Modal (Interactive In-App Project Editor) */}
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <MainPortfolio />
    </PortfolioProvider>
  );
}
