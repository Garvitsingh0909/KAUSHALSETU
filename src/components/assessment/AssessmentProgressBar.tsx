/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — DYNAMIC ASSESSMENT PROGRESS BAR COMPONENT
 * Displays real-time question progress, remaining questions counter,
 * completion percentage, stage indicators, and difficulty calibration badge.
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  HelpCircle, 
  Layers, 
  Flag,
  Flame,
  Check
} from 'lucide-react';
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
  
  // Remaining questions calculation
  const remainingQuestions = Math.max(0, safeTotal - safeCurrent);
  const progressPercent = Math.min(100, Math.round((safeCurrent / safeTotal) * 100));

  // Difficulty badge styling
  const getDifficultyBadge = (diff: QuestionDifficulty) => {
    switch (diff) {
      case 'Foundation':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Foundation
          </span>
        );
      case 'Developing':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Developing
          </span>
        );
      case 'Intermediate':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            Intermediate
          </span>
        );
      case 'Strong':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200 inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            Strong
          </span>
        );
      case 'Advanced':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-300 inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Advanced
          </span>
        );
      default:
        return null;
    }
  };

  // Format timer
  const minutes = Math.floor(timeSpentSeconds / 60);
  const seconds = (timeSpentSeconds % 60).toString().padStart(2, '0');

  // Friendly remaining text
  const getRemainingMessage = () => {
    if (remainingQuestions === 0) {
      return (
        <span className="text-emerald-700 font-extrabold flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          Final question — ready to complete!
        </span>
      );
    }
    if (remainingQuestions === 1) {
      return (
        <span className="text-blue-700 font-bold flex items-center gap-1">
          <Flame className="w-3.5 h-3.5 text-amber-500" />
          Almost there! <strong>1 question</strong> remaining
        </span>
      );
    }
    return (
      <span className="text-slate-600 font-medium">
        <strong>{remainingQuestions}</strong> {remainingQuestions === 1 ? 'question' : 'questions'} remaining
      </span>
    );
  };

  return (
    <div className={cn("bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden", className)}>
      {/* Top Banner: Skill Info + Timer + Remaining Count */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-50 via-white to-blue-50/40 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          
          {/* Skill Title & Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow-xs">
              Q{safeCurrent}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-slate-900 font-display">
                  {skillName}
                </span>
                {category && (
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md hidden sm:inline-block">
                    {category}
                  </span>
                )}
                {getDifficultyBadge(difficulty)}
              </div>
              <div className="text-xs text-slate-500 font-medium flex items-center gap-2">
                <span>Knowledge Check</span>
                <span className="text-slate-300">•</span>
                <span className="uppercase tracking-wider text-[10px] font-bold text-slate-400">
                  {lengthMode} Mode
                </span>
              </div>
            </div>
          </div>

          {/* Timer & Question Progress Pill */}
          <div className="flex items-center gap-2 sm:gap-3 self-end sm:self-center">
            {/* Live Elapsed Timer */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100/90 border border-slate-200 text-slate-700 text-xs font-mono font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{minutes}:{seconds}</span>
            </div>

            {/* Question Step Indicator Pill */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold shadow-xs">
              <span className="font-extrabold text-blue-700">
                Question {safeCurrent}
              </span>
              <span className="text-blue-300">/</span>
              <span className="text-blue-600">{safeTotal}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Progress Bar Track */}
        <div className="space-y-2 pt-1">
          <div 
            className="relative w-full bg-slate-200/80 rounded-full h-3 overflow-hidden shadow-inner"
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Assessment progress: ${progressPercent}% completed (${remainingQuestions} questions remaining)`}
          >
            {/* Active animated fill bar */}
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 rounded-full relative"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Shimmer overlay */}
              <div className="absolute inset-0 bg-white/20 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </motion.div>
          </div>

          {/* Segmented Step Dots (for up to 15 questions) */}
          {safeTotal <= 15 && (
            <div className="flex items-center justify-between gap-1 px-1">
              {Array.from({ length: safeTotal }).map((_, index) => {
                const stepNum = index + 1;
                const isCompleted = stepNum < safeCurrent;
                const isCurrent = stepNum === safeCurrent;

                return (
                  <div 
                    key={index}
                    title={`Question ${stepNum} ${isCompleted ? '(Answered)' : isCurrent ? '(Current)' : '(Remaining)'}`}
                    className="flex-1 flex flex-col items-center group cursor-default"
                  >
                    <div 
                      className={cn(
                        "h-1.5 w-full rounded-full transition-all duration-300",
                        isCompleted 
                          ? "bg-blue-600" 
                          : isCurrent 
                            ? "bg-blue-500 ring-2 ring-blue-300 shadow-xs" 
                            : "bg-slate-200"
                      )}
                    />
                  </div>
                );
              })}
            </div>
          )}

          {/* Progress Status Footer: Percent + Remaining Count */}
          <div className="flex items-center justify-between text-xs pt-1">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-slate-800">
                {progressPercent}% Complete
              </span>
            </div>

            <div className="text-right">
              {getRemainingMessage()}
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Stage Journey Footnote (Quiz -> Practical Task -> Synthesis) */}
      {hasPracticalTask && lengthMode !== 'quick' && (
        <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span className="font-bold text-blue-700 flex items-center gap-1">
              <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] font-black flex items-center justify-center">1</span>
              Adaptive Quiz (Active)
            </span>
            <span className="text-slate-300">&rarr;</span>
            <span className="text-slate-500 flex items-center gap-1">
              <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-600 text-[9px] font-black flex items-center justify-center">2</span>
              Practical Task & Rubric
            </span>
            <span className="text-slate-300">&rarr;</span>
            <span className="text-slate-500 flex items-center gap-1">
              <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-600 text-[9px] font-black flex items-center justify-center">3</span>
              G-ONE Synthesis
            </span>
          </div>

          <span className="text-[10px] text-slate-400 hidden md:inline">
            Step 1 of 3
          </span>
        </div>
      )}
    </div>
  );
}
