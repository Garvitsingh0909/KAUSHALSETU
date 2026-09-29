/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — G-ONE ASSESSMENT QUESTION HINT COMPONENT
 * Provides interactive, context-aware tips powered by the G-ONE Reasoning Engine.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lightbulb, 
  Sparkles, 
  BrainCircuit, 
  AlertTriangle, 
  Compass, 
  HelpCircle,
  X,
  ChevronDown,
  ChevronUp,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { QuestionItem } from '../../data/assessmentTypes';
import { generateGOneQuestionHint, GOneGuidanceTip } from '../../utils/gOneHintEngine';
import { cn } from '../../lib/utils';

export interface GOneQuestionHintProps {
  question: QuestionItem;
  skillName: string;
  category?: string;
  isAnswerSubmitted?: boolean;
  className?: string;
}

export function GOneQuestionHint({
  question,
  skillName,
  category,
  isAnswerSubmitted = false,
  className
}: GOneQuestionHintProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hintData, setHintData] = useState<GOneGuidanceTip | null>(null);
  const [hasRequestedHint, setHasRequestedHint] = useState(false);

  // Generate or update hint whenever question changes
  useEffect(() => {
    // Reset open state for new questions so it doesn't stay open automatically
    setIsOpen(false);
    setHasRequestedHint(false);
    const tip = generateGOneQuestionHint(question, skillName, category);
    setHintData(tip);
  }, [question.id, skillName, category]);

  const handleToggleHint = () => {
    if (!hasRequestedHint) {
      setHasRequestedHint(true);
    }
    setIsOpen(prev => !prev);
  };

  if (!hintData) return null;

  return (
    <div className={cn("w-full transition-all", className)}>
      {/* Action Button: Get Hint / Hide Hint */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleToggleHint}
          aria-expanded={isOpen}
          className={cn(
            "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 shadow-xs group btn-press",
            isOpen
              ? "bg-amber-100 text-amber-900 border border-amber-300 ring-2 ring-amber-200"
              : hasRequestedHint
                ? "bg-amber-50/90 text-amber-800 border border-amber-200 hover:bg-amber-100"
                : "bg-gradient-to-r from-blue-50 to-indigo-50/80 text-blue-800 border border-blue-200 hover:border-blue-300 hover:bg-blue-100/70"
          )}
        >
          <div className={cn(
            "w-5 h-5 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110",
            isOpen ? "bg-amber-500 text-white" : "bg-blue-600 text-white"
          )}>
            <Lightbulb className="w-3 h-3 animate-pulse" />
          </div>

          <span className="font-display">
            {isOpen ? "Hide G-ONE Hint" : hasRequestedHint ? "Revisit G-ONE Hint" : "Get Hint"}
          </span>

          <span className="px-1.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-white/80 border border-blue-200 text-blue-700">
            G-ONE Tip
          </span>

          {isOpen ? (
            <ChevronUp className="w-3.5 h-3.5 text-amber-700" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-blue-600" />
          )}
        </button>

        {/* Small indicator when hint is active */}
        {hasRequestedHint && !isOpen && (
          <span className="text-[11px] text-slate-500 font-medium hidden sm:inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Hint available for this question
          </span>
        )}
      </div>

      {/* Expandable G-ONE Cognitive Scaffolding Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -6 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -6 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden mt-3"
          >
            <div className="rounded-2xl bg-gradient-to-br from-amber-50/90 via-white to-blue-50/40 border border-amber-200/90 p-4 sm:p-5 shadow-sm space-y-4 relative">
              
              {/* Card Header with G-ONE Tag */}
              <div className="flex items-start justify-between gap-3 border-b border-amber-200/50 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
                    <BrainCircuit className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-black text-amber-950 uppercase tracking-wider font-display">
                        G-ONE Pedagogical Guidance
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100/90 text-amber-900 border border-amber-200">
                        Concept Scaffold
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium">
                      Grounded guidance to reason through without giving away the exact answer.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-amber-100/60 transition-colors"
                  aria-label="Close Hint"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Core Hint Content Grid */}
              <div className="space-y-3 text-xs">
                
                {/* 1. Contextual Clue (The main tip) */}
                <div className="p-3.5 rounded-xl bg-white border border-amber-200/80 shadow-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                    <span>Key Contextual Tip</span>
                  </div>
                  <p className="text-slate-800 leading-relaxed font-medium pl-5 text-[13px]">
                    {hintData.contextualClue}
                  </p>
                </div>

                {/* 2. Core Mental Model & Common Pitfall */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  
                  {/* Mental Model / Principle */}
                  <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200/70 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-blue-900">
                      <Compass className="w-3.5 h-3.5 text-blue-600" />
                      <span>Core Principle</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed font-medium text-[12px] pl-5">
                      {hintData.corePrinciple}
                    </p>
                  </div>

                  {/* Pitfall to Avoid */}
                  <div className="p-3 rounded-xl bg-rose-50/50 border border-rose-200/70 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-rose-900">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                      <span>Pitfall to Avoid</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed font-medium text-[12px] pl-5">
                      {hintData.pitfallToAvoid}
                    </p>
                  </div>
                </div>

                {/* 3. Guiding Reflection Thought Prompt */}
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-100/80 border border-slate-200 text-slate-700">
                  <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-900">Guiding Question to Ask Yourself:</span>
                    <p className="italic text-slate-700 text-[12px]">
                      "{hintData.thoughtPrompt}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer Note */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-amber-200/40">
                <span className="flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Domain: {hintData.domainCompetency}
                </span>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="font-bold text-blue-700 hover:text-blue-900 underline"
                >
                  Got it, apply to question &rarr;
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
