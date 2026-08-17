import React, { useState } from 'react';
import { 
  Header, 
  Hero, 
  PartnersSection, 
  ProseReveal,
  KeepMovingSection, 
  DemoShowcase,
  WhySuiteSection, 
  PricingSection,
  ConversionSection, 
  HugeSuiteWatermark, 
  Footer, 
  SignUpModal 
} from './components';

export default function App() {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#121316] flex flex-col justify-between selection:bg-[#121316] selection:text-[#FAF9F6] antialiased">
      {/* Top Header */}
      <Header 
        onOpenSignUp={() => setIsSignUpOpen(true)}
        onNavigateSection={scrollToSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1 w-full flex flex-col">
        {/* 1. Hero Section with dynamic masked rotating headline & software window visual */}
        <Hero 
          onOpenSignUp={() => setIsSignUpOpen(true)}
          onNavigateSection={scrollToSection}
        />

        {/* Partners / Social Proof Section */}
        <PartnersSection />

        {/* Word-by-word Scroll Reveal Prose */}
        <ProseReveal />

        {/* 2. Section Two: Keep business moving (3-card interactive layout) */}
        <KeepMovingSection />

        {/* Demo Showcase: Big MacBook 5 with 70px rounded-12px Play Demo button */}
        <DemoShowcase onOpenSignUp={() => setIsSignUpOpen(true)} />

        {/* 3. Why Suite works differently: Products, Activity, Tools + Curved SVG connectors */}
        <WhySuiteSection />

        {/* 4. Pricing Section: 3 tiers, monthly/yearly toggle with savings */}
        <PricingSection onOpenSignUp={() => setIsSignUpOpen(true)} />

        {/* 5. Main Conversion Section: Generous whitespace + bold statement */}
        <ConversionSection 
          onOpenSignUp={() => setIsSignUpOpen(true)}
        />

        {/* 5. Huge Faint SUITE Graphic */}
        <HugeSuiteWatermark />
      </main>

      {/* 6. Refined Footer */}
      <Footer 
        onOpenSignUp={() => setIsSignUpOpen(true)}
        onNavigateSection={scrollToSection}
      />

      {/* Interactive Sign Up Modal */}
      <SignUpModal 
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
      />
    </div>
  );
}
