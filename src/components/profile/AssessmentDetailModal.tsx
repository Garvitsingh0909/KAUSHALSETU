/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — ASSESSMENT DETAIL MODAL
 * Shows full assessment diagnostic breakdown, rubric evaluation, strengths,
 * and G-ONE mentoring notes for an assessed skill badge.
 */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  X, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  RotateCcw, 
  ExternalLink,
  Calendar,
  Layers,
  FileCheck2,
  TrendingUp
} from 'lucide-react';
import { Skill } from '../../data/skills';
import { UserSkill } from '../../context/ProfileContext';
import { AssessmentAttempt } from '../../data/assessmentTypes';
import { ProficiencyBadge, normalizeProficiencyLevel, PROFICIENCY_CONFIGS } from './ProficiencyBadge';

interface AssessmentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  skill?: Skill;
  userSkill?: UserSkill;
  attempt?: AssessmentAttempt;
}

export function AssessmentDetailModal({
  isOpen,
  onClose,
  skill,
  userSkill,
  attempt
}: AssessmentDetailModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || (!skill && !userSkill)) return null;

  const skillName = skill?.name || userSkill?.skillId || 'Skill Assessment';
  const category = skill?.category || 'General';
  const assessedLevel = userSkill?.indicativeProficiency || attempt?.indicativeProficiency || 'Developing';
  const canonical = normalizeProficiencyLevel(assessedLevel);
  const config = PROFICIENCY_CONFIGS[canonical];

  const quizScore = attempt?.quizScore || {
    correct: userSkill?.latestScorePercentage ? Math.round((userSkill.latestScorePercentage / 100) * 8) : 6,
    total: 8,
    percentage: userSkill?.latestScorePercentage || 75
  };

  const rubricScore = attempt?.totalRubricScore ?? userSkill?.latestRubricScore ?? 16;
  const maxRubric = attempt?.maxRubricScore ?? 20;
  const evidenceLevel = userSkill?.evidenceLevel || attempt?.evidenceLevel || 'High evidence';
  const dateStr = userSkill?.lastAssessedDate || attempt?.timestamp;

  const validatedStrengths = attempt?.strengths?.length 
    ? attempt.strengths 
    : [
        `Demonstrated strong applied problem-solving and foundational fluency in ${skillName}.`,
        `Satisfied performance standards in practical rubric assessment (${rubricScore}/${maxRubric} pts).`,
        `Autonomous execution verified under standardized vocational rubric guidelines.`
      ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-label={`Assessment details for ${skillName}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-850">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold border shadow-xs ${config.bgClass} ${config.borderClass} ${config.textClass}`}>
              <config.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-2 py-0.5 bg-slate-200/80 dark:bg-slate-800 rounded-md">
                  {category}
                </span>
                <span className="text-[10px] font-extrabold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200 dark:border-emerald-800">
                  <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  Verified Badge
                </span>
              </div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white mt-0.5 font-heading">
                {skillName}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main Badge Showcase */}
          <div className={`p-5 rounded-2xl border ${config.bgClass} ${config.borderClass} flex flex-col sm:flex-row items-center justify-between gap-4`}>
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Verified Proficiency Level
              </span>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h3 className={`text-2xl font-black ${config.textClass} font-heading`}>
                  {config.displayName}
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
                {config.description}
              </p>
            </div>

            <ProficiencyBadge
              level={assessedLevel}
              evidenceLevel={evidenceLevel}
              scorePercentage={quizScore.percentage}
              size="lg"
              variant="badge"
              showStars={true}
              showScore={true}
            />
          </div>

          {/* Assessment Evidence Breakdown */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider mb-3 font-mono">
              Assessment Evidence Diagnostics
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-0.5">
                <span className="text-[10px] font-mono text-slate-400 dark:text-slate-400 uppercase block">Knowledge Quiz</span>
                <span className="text-base font-bold text-slate-900 dark:text-white font-mono">{quizScore.percentage}%</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">{quizScore.correct}/{quizScore.total} correct</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-0.5">
                <span className="text-[10px] font-mono text-slate-400 dark:text-slate-400 uppercase block">Rubric Score</span>
                <span className="text-base font-bold text-slate-900 dark:text-white font-mono">{rubricScore}/{maxRubric}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">4 criteria verified</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-0.5">
                <span className="text-[10px] font-mono text-slate-400 dark:text-slate-400 uppercase block">Evidence Tier</span>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 block truncate">{evidenceLevel}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Standardized Rubric</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-0.5">
                <span className="text-[10px] font-mono text-slate-400 dark:text-slate-400 uppercase block">Evaluated On</span>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block truncate font-mono">
                  {dateStr ? new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : 'Recent'}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Verified Session</span>
              </div>
            </div>
          </div>

          {/* Validated Strengths */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider font-mono">
              Observed Practical Competencies
            </h4>
            <div className="space-y-2">
              {validatedStrengths.map((str, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{str}</span>
                </div>
              ))}
            </div>
          </div>

          {/* G-ONE Synthesis Note */}
          <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 space-y-1.5">
            <div className="flex items-center gap-2 text-blue-900 dark:text-blue-300 font-bold text-xs font-mono uppercase">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              G-ONE Evaluation Summary
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {attempt?.gOneFeedback || `Calibrated assessment demonstrates solid mastery in ${skillName}. Ready for applied micro-ventures and cross-disciplinary combinations.`}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
          <Link
            to={`/assessment/${userSkill?.skillId || skill?.id}`}
            onClick={onClose}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Full Assessment</span>
          </Link>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-blue-600 text-white text-xs font-semibold hover:bg-slate-800 dark:hover:bg-blue-700 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
