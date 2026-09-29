/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — DYNAMIC ASSESSMENT PROGRESS BAR COMPONENT
 * Clean, serious, modern assessment progress tracker.
 */

import React from 'react';
import { motion } from 'motion/react';
import { Clock, HelpCircle, X } from 'lucide-react';
import { QuestionDifficulty, AssessmentLengthMode } from '../../data/assessmentTypes';
import { cn } from '../../lib/utils';

export interface AssessmentProgressBarProps {
  currentStep: number;
  totalSteps: number;
  skillName: string;
  category?: string;
  difficulty?: QuestionDifficulty;
  timeSpentSeconds?: number;
  lengthMode?: AssessmentLengthMode;
  stage?: 'quiz' | 'task' | 'synthesis';
  hasPracticalTask?: boolean;
  onExit?: () => void;
  className?: string;
}

export function AssessmentProgressBar({
  currentStep,
  totalSteps,
  skillName,
  category,
  difficulty = 'Developing',
  timeSpentSeconds = 0,
  lengthMode = 'standard',
  stage = 'quiz',
  hasPracticalTask = true,
  onExit,
  className
}: AssessmentProgressBarProps) {
  const safeTotal = Math.max(1, totalSteps);
  const safeCurrent = Math.min(Math.max(1, currentStep), safeTotal);
  
  const stepCurrentFormatted = safeCurrent.toString().padStart(2, '0');
  const stepTotalFormatted = safeTotal.toString().padStart(2, '0');
  const progressPercent = Math.min(100, Math.round((safeCurrent / safeTotal) * 100));

  const minutes = Math.floor(timeSpentSeconds / 60);
  const seconds = (timeSpentSeconds % 60).toString().padStart(2, '0');

  return (
    <div className={cn("bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden", className)}>
      <div className="p-5 sm:p-6 space-y-4">
        {/* Top Header: Serious & Minimal */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                SKILL ASSESSMENT
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-500 font-medium">
                {skillName} {category ? `(${category})` : ''}
              </span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-mono font-bold text-slate-900 tracking-tight mt-1">
              STEP {stepCurrentFormatted} / {stepTotalFormatted}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/80">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{minutes}:{seconds}</span>
            </div>

            {onExit && (
              <button
                type="button"
                onClick={onExit}
                className="text-xs font-medium text-slate-500 hover:text-slate-900 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                title="Pause and exit assessment"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Thin Progress Line */}
        <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-slate-900 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>
    </div>
  );
}
