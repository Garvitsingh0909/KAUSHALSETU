import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className, showLabel }) => {
  const { resolvedTheme, toggleTheme, theme, setTheme } = useTheme();

  if (showLabel) {
    return (
      <div className={cn("flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700", className)}>
        <button
          type="button"
          onClick={() => setTheme('light')}
          className={cn(
            "p-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer",
            theme === 'light'
              ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-bold"
              : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          )}
          title="Light mode"
        >
          <Sun className="w-3.5 h-3.5 text-amber-500" />
          <span>Light</span>
        </button>

        <button
          type="button"
          onClick={() => setTheme('dark')}
          className={cn(
            "p-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer",
            theme === 'dark'
              ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-bold"
              : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          )}
          title="Dark mode"
        >
          <Moon className="w-3.5 h-3.5 text-blue-400" />
          <span>Dark</span>
        </button>

        <button
          type="button"
          onClick={() => setTheme('system')}
          className={cn(
            "p-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer",
            theme === 'system'
              ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-bold"
              : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          )}
          title="System theme"
        >
          <Monitor className="w-3.5 h-3.5 text-slate-400" />
          <span>Auto</span>
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-colors shadow-2xs cursor-pointer flex items-center justify-center",
        className
      )}
      title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
      aria-label="Toggle dark mode"
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-400" />
      ) : (
        <Moon className="w-4 h-4 text-slate-700" />
      )}
    </button>
  );
};
