/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — SKILL PROFICIENCY BADGE COMPONENT
 * Renders high-craft visual badge indicators for skill proficiency levels
 * (Novice / Foundation, Developing, Intermediate, Strong / Proficient, Advanced / Expert)
 * calibrated directly from assessment data.
 */

import React from 'react';
import { 
  Award, 
  ShieldCheck, 
  Sparkles, 
  Target, 
  Compass, 
  BookOpen, 
  HelpCircle, 
  Star,
  CheckCircle2,
  Check
} from 'lucide-react';
import { IndicativeProficiency, EvidenceLevel } from '../../data/assessmentTypes';
import { Proficiency } from '../../data/skills';
import { cn } from '../../lib/utils';

export type BadgeLevel = 'Novice' | 'Developing' | 'Intermediate' | 'Strong' | 'Advanced' | 'Unassessed';

export interface ProficiencyBadgeProps {
  level: IndicativeProficiency | Proficiency | 'Novice' | 'Unassessed';
  evidenceLevel?: EvidenceLevel;
  scorePercentage?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'pill' | 'badge' | 'detailed' | 'emblem';
  showStars?: boolean;
  showScore?: boolean;
  className?: string;
}

export interface ProficiencyConfig {
  canonicalLevel: BadgeLevel;
  displayName: string;
  tierNumber: number;
  stars: number;
  description: string;
  icon: React.ElementType;
  bgClass: string;
  borderClass: string;
  textClass: string;
  accentClass: string;
  glowClass: string;
  barColor: string;
}

export function normalizeProficiencyLevel(level?: string | null): BadgeLevel {
  if (!level) return 'Unassessed';
  const lower = level.toLowerCase().trim();
  
  if (lower === 'advanced' || lower === 'expert' || lower === 'master') {
    return 'Advanced';
  }
  if (lower === 'strong' || lower === 'proficient') {
    return 'Strong';
  }
  if (lower === 'intermediate') {
    return 'Intermediate';
  }
  if (lower === 'developing' || lower === 'competent') {
    return 'Developing';
  }
  if (lower === 'novice' || lower === 'foundation' || lower === 'beginner') {
    return 'Novice';
  }
  return 'Unassessed';
}

export const PROFICIENCY_CONFIGS: Record<BadgeLevel, ProficiencyConfig> = {
  Advanced: {
    canonicalLevel: 'Advanced',
    displayName: 'Advanced / Expert',
    tierNumber: 5,
    stars: 5,
    description: 'Demonstrates mastery, creative autonomy, and complex synthesis in real-world scenarios.',
    icon: Award,
    bgClass: 'bg-amber-50/80',
    borderClass: 'border-amber-200',
    textClass: 'text-amber-900',
    accentClass: 'bg-amber-600 text-white',
    glowClass: '',
    barColor: 'bg-amber-500'
  },
  Strong: {
    canonicalLevel: 'Strong',
    displayName: 'Strong / Proficient',
    tierNumber: 4,
    stars: 4,
    description: 'High degree of fluency, consistent execution, and validated practical competency.',
    icon: ShieldCheck,
    bgClass: 'bg-emerald-50/80',
    borderClass: 'border-emerald-200',
    textClass: 'text-emerald-900',
    accentClass: 'bg-emerald-600 text-white',
    glowClass: '',
    barColor: 'bg-emerald-600'
  },
  Intermediate: {
    canonicalLevel: 'Intermediate',
    displayName: 'Intermediate',
    tierNumber: 3,
    stars: 3,
    description: 'Solid conceptual understanding and autonomous execution on standard deliverables.',
    icon: Target,
    bgClass: 'bg-indigo-50/80',
    borderClass: 'border-indigo-200',
    textClass: 'text-indigo-900',
    accentClass: 'bg-indigo-600 text-white',
    glowClass: '',
    barColor: 'bg-indigo-600'
  },
  Developing: {
    canonicalLevel: 'Developing',
    displayName: 'Developing',
    tierNumber: 2,
    stars: 2,
    description: 'Grasps key foundations, building momentum with guided practical execution.',
    icon: Compass,
    bgClass: 'bg-sky-50/80',
    borderClass: 'border-sky-200',
    textClass: 'text-sky-900',
    accentClass: 'bg-sky-600 text-white',
    glowClass: '',
    barColor: 'bg-sky-600'
  },
  Novice: {
    canonicalLevel: 'Novice',
    displayName: 'Novice / Foundation',
    tierNumber: 1,
    stars: 1,
    description: 'Initial awareness and foundational orientation; ready for structured progression.',
    icon: BookOpen,
    bgClass: 'bg-slate-50',
    borderClass: 'border-slate-200',
    textClass: 'text-slate-800',
    accentClass: 'bg-slate-700 text-white',
    glowClass: '',
    barColor: 'bg-slate-600'
  },
  Unassessed: {
    canonicalLevel: 'Unassessed',
    displayName: 'Awaiting Assessment',
    tierNumber: 0,
    stars: 0,
    description: 'Self-reported competency. Complete an assessment to earn your verified badge.',
    icon: HelpCircle,
    bgClass: 'bg-slate-50',
    borderClass: 'border-dashed border-slate-200',
    textClass: 'text-slate-600',
    accentClass: 'bg-slate-300 text-slate-700',
    glowClass: '',
    barColor: 'bg-slate-300'
  }
};

export function ProficiencyBadge({
  level,
  evidenceLevel,
  scorePercentage,
  size = 'md',
  variant = 'badge',
  showStars = true,
  showScore = false,
  className
}: ProficiencyBadgeProps) {
  const canonical = normalizeProficiencyLevel(level);
  const config = PROFICIENCY_CONFIGS[canonical];
  const Icon = config.icon;

  // Render Star Pips (1 to 5)
  const renderStars = (starCount: number) => {
    return (
      <div className="flex items-center gap-0.5" title={`Level ${config.tierNumber} of 5`}>
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            className={cn(
              size === 'xs' || size === 'sm' ? "w-2.5 h-2.5" : "w-3 h-3",
              "transition-transform duration-200",
              s <= starCount 
                ? "text-amber-500 fill-amber-500 pop-in" 
                : "text-slate-300 fill-slate-100"
            )}
            style={{ animationDelay: `${s * 50}ms` }}
          />
        ))}
      </div>
    );
  };

  if (variant === 'pill') {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 font-semibold rounded-full border transition-colors shadow-2xs",
          config.bgClass,
          config.borderClass,
          config.textClass,
          size === 'xs' && "px-2 py-0.5 text-[10px]",
          size === 'sm' && "px-2.5 py-0.5 text-xs",
          size === 'md' && "px-3 py-1 text-xs",
          size === 'lg' && "px-3.5 py-1.5 text-sm",
          className
        )}
      >
        <Icon className={cn(
          size === 'xs' ? "w-2.5 h-2.5" : size === 'sm' ? "w-3 h-3" : "w-3.5 h-3.5",
          "shrink-0"
        )} />
        <span className="whitespace-nowrap">{config.displayName.split('/')[0].trim()}</span>
        {showStars && config.stars > 0 && (
          <span className="text-amber-600 font-extrabold ml-0.5 flex items-center">
            ★{config.stars}
          </span>
        )}
        {showScore && scorePercentage !== undefined && (
          <span className="font-mono text-[10px] bg-white/80 px-1 rounded ml-1 border border-slate-200/60 font-semibold">
            {Math.round(scorePercentage)}%
          </span>
        )}
      </span>
    );
  }

  if (variant === 'emblem') {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div 
          className={cn(
            "w-9 h-9 rounded-xl flex items-center justify-center border shadow-xs transition-transform",
            config.bgClass,
            config.borderClass,
            config.textClass
          )}
          title={`${config.displayName} Badge`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className={cn("text-xs font-bold leading-none", config.textClass)}>
              {config.displayName}
            </span>
            {config.stars > 0 && renderStars(config.stars)}
          </div>
          {evidenceLevel && (
            <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
              {evidenceLevel}
            </span>
          )}
        </div>
      </div>
    );
  }

  // Standard 'badge' or 'detailed' variant
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 transition-all shadow-xs",
        config.bgClass,
        config.borderClass,
        config.textClass,
        size === 'sm' && "px-2 py-1 text-xs",
        size === 'lg' && "px-4 py-2 text-sm",
        className
      )}
    >
      <div className={cn(
        "rounded-lg p-1 shrink-0 flex items-center justify-center",
        config.accentClass
      )}>
        <Icon className={size === 'sm' ? "w-3 h-3" : "w-3.5 h-3.5"} />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="font-extrabold text-xs tracking-tight whitespace-nowrap">
            {config.displayName}
          </span>
          {showStars && config.stars > 0 && renderStars(config.stars)}
        </div>

        {(showScore || evidenceLevel) && (
          <div className="flex items-center gap-1.5 text-[10px] text-slate-600 font-medium mt-0.5">
            {showScore && scorePercentage !== undefined && (
              <span className="font-mono font-bold text-slate-900 bg-white/90 px-1 rounded border border-slate-200">
                {Math.round(scorePercentage)}% Score
              </span>
            )}
            {evidenceLevel && (
              <span className="truncate">{evidenceLevel}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
