import React from 'react';
import { Sparkles, Zap } from 'lucide-react';
import { useViewMode } from '../context/ViewModeContext';
import { cn } from '../lib/utils';

interface ModeToggleProps {
  className?: string;
}

export const ModeToggle: React.FC<ModeToggleProps> = ({ className }) => {
  const { mode, setMode } = useViewMode();

  return (
    <div
      className={cn(
        'inline-flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200 text-xs',
        className
      )}
      role="group"
      aria-label="View Mode Toggle"
    >
      <button
        type="button"
        onClick={() => setMode('default')}
        className={cn(
          'px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 text-xs font-medium',
          mode === 'default'
            ? 'bg-white text-slate-900 font-bold shadow-xs'
            : 'text-slate-500 hover:text-slate-800'
        )}
        title="Default Mode (Full Features)"
      >
        <Sparkles className="w-3 h-3 text-blue-600" />
        <span>Default</span>
      </button>

      <button
        type="button"
        onClick={() => setMode('minimal')}
        className={cn(
          'px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 text-xs font-medium',
          mode === 'minimal'
            ? 'bg-white text-emerald-800 font-bold shadow-xs'
            : 'text-slate-500 hover:text-slate-800'
        )}
        title="Minimal Mode (Clean & Focused)"
      >
        <Zap className="w-3 h-3 text-emerald-600" />
        <span>Minimal</span>
      </button>
    </div>
  );
};
