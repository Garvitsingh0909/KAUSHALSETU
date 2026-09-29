import React from 'react';
import { Target, ShieldCheck, Combine, Blocks, Layers, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export type PathwayStepId = 'SKILL' | 'CAPABILITY' | 'OPPORTUNITY' | 'APPLICATION' | 'CAREER_BUSINESS' | string;

interface KaushalPathwayBannerProps {
  currentStep: PathwayStepId;
  subtitle?: string;
  className?: string;
}

interface StepInfo {
  id: string;
  code: PathwayStepId;
  label: string;
  sublabel: string;
  icon: React.ElementType;
}

const STEPS: StepInfo[] = [
  {
    id: 'step_1',
    code: 'SKILL',
    label: '1. Skill Discovery',
    sublabel: 'Vocational Competencies',
    icon: Target,
  },
  {
    id: 'step_2',
    code: 'CAPABILITY',
    label: '2. Capability & DNA',
    sublabel: 'Assessment & Verification',
    icon: ShieldCheck,
  },
  {
    id: 'step_3',
    code: 'OPPORTUNITY',
    label: '3. Opportunity Matching',
    sublabel: 'Market & Micro-ventures',
    icon: Combine,
  },
  {
    id: 'step_4',
    code: 'APPLICATION',
    label: '4. Venture Building',
    sublabel: 'Projects & Deliverables',
    icon: Blocks,
  },
  {
    id: 'step_5',
    code: 'CAREER_BUSINESS',
    label: '5. Income Pathway',
    sublabel: 'Career & Growth Roadmap',
    icon: Layers,
  },
];

export const KaushalPathwayBanner: React.FC<KaushalPathwayBannerProps> = ({
  currentStep,
  subtitle = "The standard CBSE vocational framework transforming practical abilities into market opportunities.",
  className
}) => {
  const normalizeStep = (step: string): number => {
    const s = step.toUpperCase();
    if (s.includes('SKILL')) return 0;
    if (s.includes('CAPABILITY') || s.includes('DNA') || s.includes('ASSESSMENT')) return 1;
    if (s.includes('OPPORTUNITY') || s.includes('MATCH')) return 2;
    if (s.includes('APPLICATION') || s.includes('BUILD') || s.includes('PROJECT')) return 3;
    if (s.includes('CAREER') || s.includes('BUSINESS') || s.includes('ROADMAP') || s.includes('INCOME')) return 4;
    return 0;
  };

  const activeIndex = normalizeStep(currentStep);

  return (
    <div className={cn("bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-2xs space-y-4 transition-colors", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
          <h2 className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            KAUSHALSETU VOCATIONAL PATHWAY
          </h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {STEPS.map((step, idx) => {
          const isActive = idx === activeIndex;
          const isCompleted = idx < activeIndex;
          const StepIcon = step.icon;

          return (
            <div
              key={step.id}
              className={cn(
                "relative p-3 rounded-xl border transition-all flex flex-col justify-between gap-2",
                isActive
                  ? "bg-blue-50/90 dark:bg-blue-950/60 border-blue-300 dark:border-blue-700/80 text-blue-900 dark:text-blue-100 shadow-2xs"
                  : isCompleted
                  ? "bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                  : "bg-white dark:bg-slate-900/60 border-slate-200/60 dark:border-slate-800/60 text-slate-400 dark:text-slate-400 opacity-80"
              )}
            >
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    "w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-colors",
                    isActive
                      ? "bg-blue-600 text-white shadow-2xs"
                      : isCompleted
                      ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <StepIcon className="w-4 h-4" />
                  )}
                </div>
                {isActive && (
                  <span className="text-[10px] font-mono font-bold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/80 px-1.5 py-0.5 rounded uppercase">
                    Active
                  </span>
                )}
              </div>

              <div>
                <p className={cn(
                  "text-xs font-bold leading-tight font-heading truncate",
                  isActive ? "text-blue-950 dark:text-white" : "text-slate-800 dark:text-slate-200"
                )}>
                  {step.label}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {step.sublabel}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
