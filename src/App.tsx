import React, { useState } from 'react';
import { 
  Header, 
  Hero, 
  PartnersSection, 
  ProseReveal,
  KeepMovingSection, 
  WhySuiteSection, 
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

        {/* What Suite handles — a strip, not a partner wall. See PartnersSection. */}
        <PartnersSection />

        {/* Word-by-word Scroll Reveal Prose */}
        <ProseReveal />

        {/* 2. Built for how the counter really works (3-card interactive layout) */}
        <KeepMovingSection />

        {/* 3. Different from spreadsheets: One system, Activity, What it records */}
        <WhySuiteSection />

        {/* 4. Main Conversion Section: Generous whitespace + bold statement */}
        <ConversionSection 
          onOpenSignUp={() => setIsSignUpOpen(true)}
        />

        {/* 5. Huge Faint SUITE Graphic */}
        <HugeSuiteWatermark />
      </main>

      {/* 6. Refined Footer */}
      <Footer onNavigateSection={scrollToSection} />

      {/* Interactive Sign Up Modal */}
      <SignUpModal 
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
      />
    </div>
  );
}
