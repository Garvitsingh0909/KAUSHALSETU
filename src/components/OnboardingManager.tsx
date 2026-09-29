import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { FirstTimeLoader } from './FirstTimeLoader';
import { FeatureIntroduction } from './FeatureIntroduction';

export function OnboardingManager() {
  const [showLoader, setShowLoader] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    // Check if user has already visited in this session or ever
    const hasSeenIntro = localStorage.getItem('ks_has_seen_intro');
    const hasLoadedSession = sessionStorage.getItem('ks_has_loaded_session');

    if (!hasLoadedSession) {
      sessionStorage.setItem('ks_has_loaded_session', 'true');
      if (!hasSeenIntro) {
        setShowLoader(true);
      }
    }

    // Listen to custom event so any component can trigger the feature tour
    const handleOpenTour = () => {
      setShowIntro(true);
    };

    window.addEventListener('ks:open-feature-tour', handleOpenTour);
    return () => window.removeEventListener('ks:open-feature-tour', handleOpenTour);
  }, []);

  const handleLoaderComplete = () => {
    setShowLoader(false);
    setShowIntro(true);
  };

  return (
    <>
      <AnimatePresence>
        {showLoader && (
          <FirstTimeLoader onComplete={handleLoaderComplete} />
        )}
      </AnimatePresence>

      <FeatureIntroduction
        isOpen={showIntro}
        onClose={() => setShowIntro(false)}
      />
    </>
  );
}

export function triggerFeatureTour() {
  window.dispatchEvent(new CustomEvent('ks:open-feature-tour'));
}
