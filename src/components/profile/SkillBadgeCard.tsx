/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — SKILL BADGE CARD COMPONENT
 * Displays an individual skill with its assessment-backed visual proficiency badge,
 * score progress bar, evidence level, validation comparison, and direct actions.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Award, 
  Calendar, 
  RotateCcw, 
  Eye, 
  Zap, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Trash2,
  TrendingUp,
  FileCheck2
} from 'lucide-react';
import { UserSkill } from '../../context/ProfileContext';
import { Skill } from '../../data/skills';
import { AssessmentAttempt } from '../../data/assessmentTypes';
import { ProficiencyBadge, normalizeProficiencyLevel, PROFICIENCY_CONFIGS } from './ProficiencyBadge';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { LivePulseDot } from '../common/MotionWrapper';
import { cn } from '../../lib/utils';

interface SkillBadgeCardProps {
  key?: React.Key;
  userSkill: UserSkill;
  skillDetails?: Skill;
  latestAttempt?: AssessmentAttempt;
  onViewDetails?: (skillId: string) => void;
  onRemoveSkill?: (skillId: string) => void;
}

export function SkillBadgeCard({
  userSkill,
  skillDetails,
  latestAttempt,
  onViewDetails,
  onRemoveSkill
}: SkillBadgeCardProps) {
  const skillName = skillDetails?.name || userSkill.skillId;
  const category = skillDetails?.category || 'General';

  // Determine effective assessed level: prefer explicit indicativeProficiency, then latestAttempt
  const assessedLevel = userSkill.indicativeProficiency || latestAttempt?.indicativeProficiency;
  const isAssessed = Boolean(assessedLevel);
  const canonicalAssessed = normalizeProficiencyLevel(assessedLevel);
  const config = PROFICIENCY_CONFIGS[canonicalAssessed];

  // Assessment score metrics
  const scorePct = userSkill.latestScorePercentage ?? latestAttempt?.quizScore?.percentage;
  const rubricScore = userSkill.latestRubricScore ?? latestAttempt?.totalRubricScore;
  const maxRubric = latestAttempt?.maxRubricScore || 20;
  const evidenceLevel = userSkill.evidenceLevel || latestAttempt?.evidenceLevel;
  const lastDate = userSkill.lastAssessedDate || latestAttempt?.timestamp;
  const attemptsCount = userSkill.attemptsCount || (latestAttempt ? 1 : 0);

  // Self-report vs Assessed comparison
  const selfReportedLevel = userSkill.proficiency;
  const hasSelfReportComparison = isAssessed && selfReportedLevel && selfReportedLevel !== assessedLevel;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -3, transition: { duration: 0.2, ease: 'easeOut' } }}
      className={cn(
        "rounded-2xl border p-5 transition-shadow duration-200 bg-white flex flex-col justify-between relative group hover:shadow-lg",
        isAssessed ? config.borderClass : "border-slate-200 hover:border-slate-300"
      )}
    >
      {/* Top Banner / Category & Actions */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2 py-0.5 bg-slate-100 rounded-md">
                {category}
              </span>
              {isAssessed ? (
                <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold text-emerald-800 bg-emerald-100/90 border border-emerald-200/80 px-2.5 py-0.5 rounded-full shadow-xs">
                  <LivePulseDot color="emerald" />
                  Assessment Verified
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
                  <HelpCircle className="w-3 h-3 text-slate-400" />
                  Self-Reported Only
                </span>
              )}
            </div>

            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg mt-1 group-hover:text-blue-600 transition-colors">
              {skillName}
            </h3>
          </div>

          {onRemoveSkill && (
            <button
              onClick={() => onRemoveSkill(userSkill.skillId)}
              className="text-slate-300 hover:text-red-500 p-1 rounded-lg hover:bg-red-50 transition-colors btn-press"
              title="Remove skill from profile"
              aria-label="Remove skill"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Visual Proficiency Badge Display */}
        <div className="my-3.5 p-3 rounded-xl bg-slate-50/80 border border-slate-100">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {isAssessed ? 'Assessed Competency Tier' : 'Declared Competency Level'}
            </span>
            {isAssessed && (
              <span className="text-[11px] font-bold text-slate-700">
                Tier {config.tierNumber} of 5
              </span>
            )}
          </div>

          <div className="flex items-center justify-between gap-2 flex-wrap">
            <ProficiencyBadge
              level={isAssessed ? assessedLevel : selfReportedLevel}
              evidenceLevel={isAssessed ? evidenceLevel : undefined}
              scorePercentage={scorePct}
              size="md"
              variant="detailed"
              showStars={true}
              showScore={false}
            />

            {/* Quick Score Gauge Pill */}
            {scorePct !== undefined && (
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Assessment Score</span>
                <span className="font-mono font-black text-slate-900 text-sm sm:text-base">
                  <AnimatedNumber value={Math.round(scorePct)} suffix="%" duration={600} />
                </span>
              </div>
            )}
          </div>

          {/* Progress Bar reflecting the level */}
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-3">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${Math.max(15, isAssessed ? (config.tierNumber * 20) : (selfReportedLevel ? 35 : 15))}%` }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className={cn("h-full rounded-full", config.barColor)}
            />
          </div>
        </div>

        {/* Real Skill Definition & High Market Valuation Banner */}
        <div className="p-3 rounded-xl bg-emerald-950 text-white space-y-2 mb-3 shadow-xs">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-extrabold text-emerald-400 flex items-center gap-1 uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Market Valuation
            </span>
            <span className="font-mono font-bold text-emerald-300">
              {skillDetails?.averageHourlyRate || '$145/hr'}
            </span>
          </div>

          <p className="text-[11px] text-slate-200 leading-snug line-clamp-2">
            {skillDetails?.realWorldDefinition || skillDetails?.description || `Professional mastery in ${skillName} delivering high-value automated workflows and client solutions.`}
          </p>

          {/* Tool Stack Tags */}
          {skillDetails?.toolStack && skillDetails.toolStack.length > 0 && (
            <div className="flex items-center gap-1 flex-wrap pt-1 border-t border-emerald-800/60">
              <span className="text-[10px] text-emerald-300 font-bold uppercase mr-1">Stack:</span>
              {skillDetails.toolStack.slice(0, 4).map((tool, idx) => (
                <span key={idx} className="text-[10px] font-medium bg-emerald-900/90 text-emerald-200 px-2 py-0.5 rounded border border-emerald-700/60 font-mono">
                  {tool}
                </span>
              ))}
            </div>
          )}

          {/* Unique Matched Opportunity Tag */}
          {skillDetails?.opportunities && skillDetails.opportunities.length > 0 && (
            <div className="pt-1 flex items-center gap-1 text-[10px] text-amber-300 font-bold truncate">
              <Award className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="truncate">Matched: {skillDetails.opportunities[0]}</span>
            </div>
          )}
        </div>

        {/* Validation Insight if Self-Reported differs from Assessed */}
        {hasSelfReportComparison && (
          <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-200/70 text-xs text-blue-900 mb-3 flex items-start gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-[11px] leading-tight">
              <span className="font-bold">Calibrated Evidence:</span> Self-reported as{' '}
              <span className="font-semibold underline">{selfReportedLevel}</span>, calibrated to{' '}
              <span className="font-bold text-blue-950 underline">{assessedLevel}</span> based on assessment scoring.
            </div>
          </div>
        )}

        {/* Metadata Details (Rubric, Last Date, Attempts) */}
        {isAssessed ? (
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-white rounded-xl p-2.5 border border-slate-100 mb-3">
            <div>
              <span className="text-[10px] text-slate-400 block font-bold uppercase">Practical Rubric</span>
              <span className="font-bold text-slate-800 text-xs flex items-center gap-1 mt-0.5">
                <FileCheck2 className="w-3.5 h-3.5 text-blue-600" />
                {rubricScore !== undefined ? (
                  <span><AnimatedNumber value={rubricScore} duration={500} />/{maxRubric} pts</span>
                ) : 'Verified Task'}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-bold uppercase">Evidence Depth</span>
              <span className="font-bold text-slate-800 text-xs truncate block mt-0.5">
                {evidenceLevel || 'Standard Evidence'}
              </span>
            </div>
            {lastDate && (
              <div className="col-span-2 pt-1 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  Assessed: {new Date(lastDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
                {attemptsCount > 0 && (
                  <span className="font-medium bg-slate-100 px-1.5 py-0.5 rounded text-[10px]">
                    {attemptsCount} attempt{attemptsCount > 1 ? 's' : ''}
                  </span>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-200/60 mb-3 text-xs text-amber-900">
            <p className="text-[11px] font-medium leading-relaxed">
              This skill currently relies on self-reported proficiency. Take the vocational competency quiz and practical task to unlock your verified badge.
            </p>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        {isAssessed ? (
          <>
            {onViewDetails && (
              <button
                type="button"
                onClick={() => onViewDetails(userSkill.skillId)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-blue-700 bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 rounded-xl transition-all btn-press"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Details</span>
              </button>
            )}

            <Link
              to={`/assessment/${userSkill.skillId}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-xl transition-all ml-auto btn-press"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Assessment</span>
            </Link>
          </>
        ) : (
          <Link
            to={`/assessment/${userSkill.skillId}`}
            className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded-xl transition-all shadow-xs btn-press"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Take Assessment & Earn Badge</span>
          </Link>
        )}
      </div>
    </motion.div>
  );
}
