import React, { useState, useEffect } from 'react';
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
  Footer, 
  SignUpModal,
  BlogPage 
} from './components';

export default function Home() {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [signUpEmail, setSignUpEmail] = useState('');
  const [currentView, setCurrentView] = useState<'home' | 'blog'>(() => {
    return typeof window !== 'undefined' && window.location.hash === '#blog' ? 'blog' : 'home';
  });

  const openSignUp = (email = '') => {
    setSignUpEmail(email.trim());
    setIsSignUpOpen(true);
  };

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#blog') {
        setCurrentView('blog');
      } else if (window.location.hash === '' || window.location.hash === '#') {
        setCurrentView('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      window.location.hash = '';
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToBlog = () => {
    setCurrentView('blog');
    window.location.hash = 'blog';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentView('home');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentView === 'blog') {
    return (
      <>
        <BlogPage 
          onBackToHome={navigateToHome}
          onOpenSignUp={() => openSignUp()}
        />
        <SignUpModal 
          isOpen={isSignUpOpen}
          initialEmail={signUpEmail}
          onClose={() => setIsSignUpOpen(false)}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#121316] flex flex-col justify-between selection:bg-[#121316] selection:text-[#FAF9F6] antialiased">
      {/* Top Header */}
      <Header 
        onOpenSignUp={() => openSignUp()}
        onNavigateSection={scrollToSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1 w-full flex flex-col">
        {/* 1. Hero Section with dynamic masked rotating headline & software window visual */}
        <Hero 
          onOpenSignUp={openSignUp}
          onNavigateSection={scrollToSection}
        />

        {/* Partners / What Suite handles strip */}
        <PartnersSection />

        {/* Word-by-word Scroll Reveal Prose */}
        <ProseReveal />

        {/* 2. Built for how the counter really works (3-card interactive layout) */}
        <KeepMovingSection />

        {/* Demo Showcase: Big MacBook 5 with 70px rounded-12px Play Demo button */}
        <DemoShowcase onOpenSignUp={() => openSignUp()} />

        {/* 3. Why Suite works differently: Products, Activity, Tools */}
        <WhySuiteSection />

        {/* 4. Pricing Section: 3 tiers, monthly/yearly toggle with savings */}
        <PricingSection onOpenSignUp={() => openSignUp()} />

        {/* 5. Main Conversion Section: Generous whitespace + bold statement */}
        <ConversionSection 
          onOpenSignUp={() => openSignUp()}
        />
      </main>

      {/* 6. Refined Footer (only place with Blog link) */}
      <Footer 
        onOpenSignUp={() => openSignUp()}
        onNavigateSection={scrollToSection}
        onNavigateBlog={navigateToBlog}
      />

      {/* Interactive Sign Up Modal */}
      <SignUpModal 
        isOpen={isSignUpOpen}
        initialEmail={signUpEmail}
        onClose={() => setIsSignUpOpen(false)}
      />
    </div>
  );
}
