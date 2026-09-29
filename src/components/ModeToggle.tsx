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
        'inline-flex items-center p-0.5 bg-slate-100 dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700/60 text-xs',
        className
      )}
      role="group"
      aria-label="View Mode Toggle"
    >
      <button
        type="button"
        onClick={() => setMode('default')}
        className={cn(
          'px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 text-xs font-medium cursor-pointer',
          mode === 'default'
            ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-bold shadow-xs'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
        )}
        title="Default Mode (Full Features)"
      >
        <Sparkles className="w-3 h-3 text-blue-600 dark:text-blue-400" />
        <span className="hidden sm:inline">Default</span>
      </button>

      <button
        type="button"
        onClick={() => setMode('minimal')}
        className={cn(
          'px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 text-xs font-medium cursor-pointer',
          mode === 'minimal'
            ? 'bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-400 font-bold shadow-xs'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
        )}
        title="Minimal Mode (Clean & Focused)"
      >
        <Zap className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
        <span className="hidden sm:inline">Minimal</span>
      </button>
    </div>
  );
};
