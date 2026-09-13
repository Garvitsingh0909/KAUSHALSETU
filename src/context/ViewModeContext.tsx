import React, { createContext, useContext, useState, useEffect } from 'react';

export type ViewMode = 'default' | 'minimal';

interface ViewModeContextType {
  mode: ViewMode;
  setMode: (mode: ViewMode) => void;
  toggleMode: () => void;
  isMinimal: boolean;
  isDefault: boolean;
}

const ViewModeContext = createContext<ViewModeContextType | undefined>(undefined);

const STORAGE_KEY = 'kaushal_setu_view_mode';

export const ViewModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<ViewMode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'minimal' || saved === 'default') {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'default';
  });

  const setMode = (newMode: ViewMode) => {
    setModeState(newMode);
    try {
      localStorage.setItem(STORAGE_KEY, newMode);
    } catch {
      // ignore
    }
  };

  const toggleMode = () => {
    setMode(mode === 'default' ? 'minimal' : 'default');
  };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // ignore
    }
    // Update body class for styling adjustments if desired
    if (mode === 'minimal') {
      document.documentElement.classList.add('mode-minimal');
      document.documentElement.classList.remove('mode-default');
    } else {
      document.documentElement.classList.add('mode-default');
      document.documentElement.classList.remove('mode-minimal');
    }
  }, [mode]);

  return (
    <ViewModeContext.Provider
      value={{
        mode,
        setMode,
        toggleMode,
        isMinimal: mode === 'minimal',
        isDefault: mode === 'default'
      }}
    >
      {children}
    </ViewModeContext.Provider>
  );
};

export function useViewMode() {
  const context = useContext(ViewModeContext);
  if (context === undefined) {
    throw new Error('useViewMode must be used within a ViewModeProvider');
  }
  return context;
}
