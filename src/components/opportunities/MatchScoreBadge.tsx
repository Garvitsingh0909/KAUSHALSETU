/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — DYNAMIC REAL-TIME MATCH SCORE BADGE
 * Dynamically evaluates compatibility between user's current skill profile
 * and an opportunity's required & preferred competencies in real-time.
 */

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../context/ProfileContext';
import { SKILLS_DB, Skill } from '../../data/skills';
import { Opportunity, MatchResult, calculateMatch, MatchTier } from '../../data/opportunities';
import { 
  BrainCircuit, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle, 
  Target, 
  Compass, 
  Info, 
  X, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  Plus, 
  Zap,
  TrendingUp,
  Award,
  Layers
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { LivePulseDot } from '../common/MotionWrapper';

interface MatchScoreBadgeProps {
  opportunity: Opportunity;
  precomputedMatch?: MatchResult;
  variant?: 'card' | 'compact' | 'detailed' | 'hero';
  showDetailsModal?: boolean;
  className?: string;
}

export function MatchScoreBadge({
  opportunity,
  precomputedMatch,
  variant = 'card',
  showDetailsModal = true,
  className
}: MatchScoreBadgeProps) {
  const { userSkills, customSkills, addSkill } = useProfile();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allSkills = useMemo(() => [...SKILLS_DB, ...customSkills], [customSkills]);

  // Recalculate match dynamically whenever userSkills change
  const match: MatchResult = useMemo(() => {
    return calculateMatch(userSkills, opportunity, allSkills);
  }, [userSkills, opportunity, allSkills]);

  const { score, label, tier, breakdown, actionTip, matchedRequired, missingRequired, matchedPreferred, missingPreferred } = match;

  // Visual theming based on tier
  const tierConfig: Record<MatchTier, {
    bg: string;
    text: string;
    border: string;
    ring: string;
    dotColor: 'emerald' | 'blue' | 'amber';
    icon: React.ElementType;
    shimmer: boolean;
  }> = {
    perfect: {
      bg: 'bg-emerald-50 text-emerald-900',
      text: 'text-emerald-800',
      border: 'border-emerald-200',
      ring: 'stroke-emerald-600',
      dotColor: 'emerald',
      icon: CheckCircle2,
      shimmer: false
    },
    strong: {
      bg: 'bg-emerald-50/90 text-emerald-900',
      text: 'text-emerald-800',
      border: 'border-emerald-200',
      ring: 'stroke-emerald-600',
      dotColor: 'emerald',
      icon: CheckCircle2,
      shimmer: false
    },
    good: {
      bg: 'bg-blue-50 text-blue-900',
      text: 'text-blue-800',
      border: 'border-blue-200 shadow-xs',
      ring: 'stroke-blue-600',
      dotColor: 'blue',
      icon: BrainCircuit,
      shimmer: false
    },
    developing: {
      bg: 'bg-amber-50 text-amber-900',
      text: 'text-amber-800',
      border: 'border-amber-200 shadow-xs',
      ring: 'stroke-amber-600',
      dotColor: 'amber',
      icon: Target,
      shimmer: false
    },
    exploratory: {
      bg: 'bg-slate-100 text-slate-800',
      text: 'text-slate-700',
      border: 'border-slate-300',
      ring: 'stroke-slate-500',
      dotColor: 'blue',
      icon: Compass,
      shimmer: false
    },
    none: {
      bg: 'bg-slate-100 text-slate-600',
      text: 'text-slate-600',
      border: 'border-slate-200',
      ring: 'stroke-slate-400',
      dotColor: 'amber',
      icon: AlertCircle,
      shimmer: false
    }
  };

  const currentTheme = tierConfig[tier];
  const IconComponent = currentTheme.icon;

  const handleOpenModal = (e: React.MouseEvent) => {
    if (!showDetailsModal) return;
    e.stopPropagation();
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      {/* 1. HERO VARIANT */}
      {variant === 'hero' && (
        <div 
          onClick={handleOpenModal}
          className={cn(
            "p-5 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-4 cursor-pointer hover:shadow-md transition-all group",
            currentTheme.bg,
            currentTheme.border,
            className
          )}
        >
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-black/10 stroke-current"
                  strokeWidth="3.5"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <motion.path
                  initial={{ strokeDasharray: "0, 100" }}
                  animate={{ strokeDasharray: `${score}, 100` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={cn(currentTheme.ring, "fill-none")}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-base font-black tracking-tight font-display">
                  <AnimatedNumber value={score} suffix="%" />
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                {(tier === 'perfect' || tier === 'strong') && (
                  <LivePulseDot color={currentTheme.dotColor} className="scale-90" />
                )}
                <span className="text-xs font-bold uppercase tracking-wider font-mono">
                  {label}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/70 font-semibold border border-black/10">
                  {breakdown.matchedRequiredCount}/{breakdown.totalRequired} Core Skills
                </span>
              </div>
              <p className="text-xs opacity-90 line-clamp-1 max-w-md font-medium">
                {actionTip}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="shrink-0 px-3.5 py-1.5 rounded-xl bg-white/90 hover:bg-white text-xs font-bold text-slate-800 border border-slate-200/80 shadow-2xs flex items-center gap-1.5 transition-all group-hover:scale-105"
          >
            <Info className="w-3.5 h-3.5 text-blue-600" />
            <span>Compatibility Breakdown</span>
          </button>
        </div>
      )}

      {/* 2. COMPACT VARIANT */}
      {variant === 'compact' && (
        <button
          type="button"
          onClick={handleOpenModal}
          title={`Click to view skill compatibility breakdown (${label})`}
          className={cn(
            "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-xs font-semibold border transition-colors",
            currentTheme.bg,
            currentTheme.border,
            currentTheme.text,
            className
          )}
        >
          {(tier === 'perfect' || tier === 'strong') && (
            <LivePulseDot color={currentTheme.dotColor} className="scale-75" />
          )}
          <IconComponent className="w-3 h-3 shrink-0" />
          <span><AnimatedNumber value={score} suffix="%" /></span>
          <span className="text-[10px] font-medium opacity-80 hidden sm:inline">• {label}</span>
        </button>
      )}

      {/* 3. DETAILED VARIANT (Includes progress bar) */}
      {variant === 'detailed' && (
        <div 
          onClick={handleOpenModal}
          className={cn(
            "p-3 rounded-xl border cursor-pointer transition-all hover:shadow-sm group",
            currentTheme.bg,
            currentTheme.border,
            className
          )}
        >
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5">
              {(tier === 'perfect' || tier === 'strong') && (
                <LivePulseDot color={currentTheme.dotColor} className="scale-75" />
              )}
              <IconComponent className="w-3.5 h-3.5" />
              <span className="text-xs font-bold">{label}</span>
            </div>
            <span className="text-sm font-black font-display">
              <AnimatedNumber value={score} suffix="%" />
            </span>
          </div>

          {/* Mini progress bar */}
          <div className="h-1.5 w-full bg-black/10 rounded-full overflow-hidden mb-1.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className={cn(
                "h-full rounded-full",
                tier === 'perfect' ? "bg-emerald-500" :
                tier === 'strong' ? "bg-emerald-500" :
                tier === 'good' ? "bg-blue-600" :
                tier === 'developing' ? "bg-amber-500" : "bg-slate-500"
              )}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] opacity-80 font-medium">
            <span>{breakdown.matchedRequiredCount} of {breakdown.totalRequired} core matched</span>
            <span className="underline decoration-dotted flex items-center gap-0.5 text-blue-700 font-semibold">
              Inspect <ArrowRight className="w-2.5 h-2.5" />
            </span>
          </div>
        </div>
      )}

      {/* 4. DEFAULT CARD VARIANT (Standard on opportunity cards) */}
      {variant === 'card' && (
        <div
          onClick={handleOpenModal}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleOpenModal(e as any); }}
          title="Click to view real-time skill compatibility breakdown"
          className={cn(
            "px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 border cursor-pointer select-none transition-colors",
            currentTheme.bg,
            currentTheme.border,
            currentTheme.text,
            className
          )}
        >
          {(tier === 'perfect' || tier === 'strong') ? (
            <LivePulseDot color={currentTheme.dotColor} className="scale-75" />
          ) : (
            <IconComponent className="w-3.5 h-3.5 opacity-80" />
          )}

          <div className="flex items-baseline gap-1">
            <span className="font-black text-sm font-display tracking-tight">
              <AnimatedNumber value={score} suffix="%" />
            </span>
            <span className="text-[11px] font-bold tracking-tight">
              {label}
            </span>
          </div>

          {/* Micro skill counter badge */}
          <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded-md bg-white/70 text-slate-700 font-bold border border-black/5 ml-0.5">
            {breakdown.matchedRequiredCount}/{breakdown.totalRequired}
          </span>

          <span 
            className="p-0.5 rounded-full hover:bg-black/10 transition-colors ml-0.5 opacity-60 group-hover:opacity-100"
            title="Inspect calculation details"
          >
            <Info className="w-3 h-3" />
          </span>
        </div>
      )}

      {/* 5. POPUP / MODAL: DETAILED REAL-TIME COMPATIBILITY BREAKDOWN */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-xl overflow-hidden max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/70">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      Real-Time Compatibility Diagnostic
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 line-clamp-1">
                      {opportunity.title}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto space-y-6">
                {/* Master Score Banner */}
                <div className={cn(
                  "p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-5",
                  currentTheme.bg,
                  currentTheme.border
                )}>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-xs border border-slate-200 flex flex-col items-center justify-center shrink-0">
                      <span className="text-2xl font-black font-display text-slate-900 leading-none">
                        <AnimatedNumber value={score} suffix="%" />
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 mt-1">
                        Score
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        {(tier === 'perfect' || tier === 'strong') && (
                          <LivePulseDot color={currentTheme.dotColor} className="scale-90" />
                        )}
                        <h4 className="text-base font-extrabold text-slate-900">
                          {label}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        {match.explanation}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mathematical Breakdown 4-Metrics Bar */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-blue-600" />
                      Dynamic Compatibility Scoring Math
                    </h4>
                    <span className="text-xs font-mono font-bold text-slate-500">
                      {score} / 100 Pts
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {/* Metric 1: Core Required */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                      <span className="text-[10px] font-bold uppercase text-slate-500 block">Core Skills</span>
                      <span className="text-base font-extrabold text-slate-900 font-mono block mt-0.5">
                        {breakdown.coreScore} <span className="text-xs font-normal text-slate-500">/{breakdown.coreWeight}</span>
                      </span>
                      <span className="text-[10px] text-slate-600">
                        {breakdown.matchedRequiredCount}/{breakdown.totalRequired} held
                      </span>
                    </div>

                    {/* Metric 2: Preferred */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                      <span className="text-[10px] font-bold uppercase text-slate-500 block">Preferred</span>
                      <span className="text-base font-extrabold text-slate-900 font-mono block mt-0.5">
                        {breakdown.preferredScore} <span className="text-xs font-normal text-slate-500">/{breakdown.preferredWeight}</span>
                      </span>
                      <span className="text-[10px] text-slate-600">
                        {breakdown.matchedPreferredCount}/{breakdown.totalPreferred} bonus
                      </span>
                    </div>

                    {/* Metric 3: Proficiency Depth */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                      <span className="text-[10px] font-bold uppercase text-slate-500 block">Depth Level</span>
                      <span className="text-base font-extrabold text-emerald-700 font-mono block mt-0.5">
                        +{breakdown.proficiencyBonus} <span className="text-xs font-normal text-slate-500">/{breakdown.maxProficiencyBonus}</span>
                      </span>
                      <span className="text-[10px] text-slate-600">Proficiency</span>
                    </div>

                    {/* Metric 4: Verified Credibility */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                      <span className="text-[10px] font-bold uppercase text-slate-500 block">Verified Proof</span>
                      <span className="text-base font-extrabold text-blue-700 font-mono block mt-0.5">
                        +{breakdown.verificationBonus} <span className="text-xs font-normal text-slate-500">/{breakdown.maxVerificationBonus}</span>
                      </span>
                      <span className="text-[10px] text-slate-600">
                        {breakdown.verifiedCount} verified
                      </span>
                    </div>
                  </div>
                </div>

                {/* Core Required Skills Audit */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                    <span>Required Competencies Checklist</span>
                    <span className="text-[11px] font-semibold text-slate-500 normal-case">
                      {breakdown.matchedRequiredCount} of {breakdown.totalRequired} matched
                    </span>
                  </h4>

                  <div className="space-y-2">
                    {opportunity.requiredSkills.map(sId => {
                      const skill = allSkills.find(s => s.id === sId);
                      const userSkill = userSkills.find(us => us.skillId === sId);
                      const hasSkill = Boolean(userSkill);
                      const isVerified = Boolean(
                        userSkill?.indicativeProficiency || 
                        userSkill?.evidenceLevel === 'High evidence' || 
                        userSkill?.evidenceLevel === 'Moderate evidence' ||
                        (userSkill?.latestScorePercentage && userSkill.latestScorePercentage >= 60)
                      );

                      return (
                        <div
                          key={sId}
                          className={cn(
                            "p-3 rounded-xl border flex items-center justify-between gap-3 text-xs transition-colors",
                            hasSkill ? "bg-emerald-50/50 border-emerald-200" : "bg-slate-50 border-slate-200"
                          )}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className={cn(
                              "w-6 h-6 rounded-lg flex items-center justify-center shrink-0",
                              hasSkill ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-500"
                            )}>
                              {hasSkill ? <Check className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                            </div>
                            <div>
                              <span className="font-bold text-slate-900 block">
                                {skill?.name || sId}
                              </span>
                              <span className="text-[10px] text-slate-500 block">
                                {hasSkill ? (
                                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                                    {userSkill?.indicativeProficiency || userSkill?.proficiency || 'Active in profile'}
                                    {isVerified && <ShieldCheck className="w-3 h-3 text-emerald-600" title="Assessment Verified" />}
                                  </span>
                                ) : (
                                  'Missing from your profile'
                                )}
                              </span>
                            </div>
                          </div>

                          <div className="shrink-0 flex items-center gap-2">
                            {hasSkill ? (
                              !isVerified ? (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setIsModalOpen(false);
                                    navigate(`/assessment?skillId=${sId}`);
                                  }}
                                  className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 rounded-lg text-[11px] font-bold transition-colors flex items-center gap-1"
                                >
                                  <Award className="w-3 h-3" />
                                  Verify (+Boost)
                                </button>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                                  <ShieldCheck className="w-3.5 h-3.5" /> Verified
                                </span>
                              )
                            ) : (
                              <button
                                type="button"
                                onClick={() => {
                                  addSkill(sId);
                                }}
                                className="px-2.5 py-1 bg-slate-900 text-white hover:bg-slate-800 rounded-lg text-[11px] font-bold transition-colors flex items-center gap-1"
                              >
                                <Plus className="w-3 h-3" />
                                Add Skill
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Preferred Skills (if any) */}
                {opportunity.preferredSkills.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                      Bonus / Preferred Skills (+20 Pts)
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {opportunity.preferredSkills.map(sId => {
                        const skill = allSkills.find(s => s.id === sId);
                        const hasSkill = userSkills.some(us => us.skillId === sId);
                        return (
                          <span
                            key={sId}
                            className={cn(
                              "text-xs px-2.5 py-1 rounded-lg border font-medium flex items-center gap-1",
                              hasSkill 
                                ? "bg-indigo-50 border-indigo-200 text-indigo-800" 
                                : "bg-slate-100 border-slate-200 text-slate-600"
                            )}
                          >
                            {hasSkill && <Check className="w-3 h-3 text-indigo-600" />}
                            {skill?.name || sId}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Recommended Next Action Tip */}
                <div className="p-4 bg-blue-50/70 border border-blue-200/80 rounded-2xl flex items-start gap-3">
                  <TrendingUp className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block">
                      Compatibility Optimization Tip
                    </span>
                    <p className="text-xs text-blue-950 font-semibold mt-0.5 leading-relaxed">
                      {actionTip}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Close
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      navigate('/assessment');
                    }}
                    className="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <Award className="w-3.5 h-3.5" />
                    Take Skill Assessments
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      navigate(`/opportunities/${opportunity.id}`);
                    }}
                    className="px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <span>Open Full Pathway</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
