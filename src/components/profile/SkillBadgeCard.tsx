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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2, transition: { duration: 0.15, ease: 'easeOut' } }}
      className={cn(
        "rounded-2xl border p-5 transition-all duration-200 bg-white dark:bg-slate-900 flex flex-col justify-between relative group hover:shadow-xs",
        isAssessed ? "border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700" : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
      )}
    >
      <div>
        {/* Header: Clean Unboxed Kicker + Action */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium flex-wrap">
              <span>{category}</span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
              {isAssessed ? (
                <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-400">
                  <LivePulseDot color="emerald" />
                  Verified Tier {config.tierNumber}
                </span>
              ) : (
                <span className="text-slate-500 dark:text-slate-400">Self-Reported</span>
              )}
              {isAssessed && scorePct !== undefined && (
                <>
                  <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
                  <span className="font-mono tabular-nums font-semibold text-slate-700 dark:text-slate-300">
                    <AnimatedNumber value={Math.round(scorePct)} suffix="%" duration={500} /> score
                  </span>
                </>
              )}
            </div>

            <h3 className="font-heading font-bold text-slate-900 dark:text-white text-base sm:text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {skillName}
            </h3>
          </div>

          {onRemoveSkill && (
            <button
              onClick={() => onRemoveSkill(userSkill.skillId)}
              className="text-slate-300 dark:text-slate-600 hover:text-rose-500 dark:hover:text-rose-400 p-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors btn-press shrink-0"
              title="Remove skill from profile"
              aria-label="Remove skill"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Badge & Level Indicator: Clean Single-Elevation presentation */}
        <div className="py-2.5 flex items-center justify-between gap-3 flex-wrap">
          <ProficiencyBadge
            level={isAssessed ? assessedLevel : selfReportedLevel}
            evidenceLevel={isAssessed ? evidenceLevel : undefined}
            scorePercentage={scorePct}
            size="md"
            variant="detailed"
            showStars={true}
            showScore={false}
          />

          {isAssessed && (
            <div className="text-right">
              <span className="text-[11px] text-slate-400 dark:text-slate-500 block font-medium">Evaluation Rubric</span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-mono tabular-nums">
                {rubricScore !== undefined ? `${rubricScore}/${maxRubric} pts` : 'Task Completed'}
              </span>
            </div>
          )}
        </div>

        {/* Subtle Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden my-2">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${Math.max(15, isAssessed ? (config.tierNumber * 20) : (selfReportedLevel ? 35 : 15))}%` }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className={cn("h-full rounded-full", config.barColor)}
          />
        </div>

        {/* Validation Insight if Self-Reported differs from Assessed */}
        {hasSelfReportComparison && (
          <div className="my-2.5 text-[11px] text-slate-600 dark:text-slate-400 flex items-start gap-1.5 leading-relaxed">
            <TrendingUp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <span>
              Self-reported as <strong className="font-semibold text-slate-700 dark:text-slate-200">{selfReportedLevel}</strong>; calibrated to <strong className="font-semibold text-blue-700 dark:text-blue-400">{assessedLevel}</strong> via assessment.
            </span>
          </div>
        )}

        {/* Metadata Details */}
        {isAssessed ? (
          <div className="pt-2 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between flex-wrap gap-2 border-t border-slate-100 dark:border-slate-800 mt-2">
            <span>{evidenceLevel || 'Standard Evidence'}</span>
            {lastDate && (
              <span className="flex items-center gap-1 text-slate-400 dark:text-slate-500">
                <Calendar className="w-3 h-3" />
                {new Date(lastDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            )}
            {attemptsCount > 1 && (
              <span className="font-mono tabular-nums text-slate-400 dark:text-slate-500">
                {attemptsCount} attempts
              </span>
            )}
          </div>
        ) : (
          <p className="pt-2 text-[11px] text-amber-800/90 dark:text-amber-300/90 leading-relaxed border-t border-slate-100 dark:border-slate-800 mt-2">
            Self-reported entry. Take the vocational assessment to verify your tier badge.
          </p>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2 mt-3">
        {isAssessed ? (
          <>
            {onViewDetails && (
              <button
                type="button"
                onClick={() => onViewDetails(userSkill.skillId)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors py-1.5"
              >
                <Eye className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                <span>View Rubric Details</span>
              </button>
            )}

            <Link
              to={`/assessment/${userSkill.skillId}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline transition-colors ml-auto py-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Assessment</span>
            </Link>
          </>
        ) : (
          <Link
            to={`/assessment/${userSkill.skillId}`}
            className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold text-white bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 py-2 px-4 rounded-xl transition-colors shadow-xs btn-press"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400 dark:text-white" />
            <span>Take Assessment & Earn Badge</span>
          </Link>
        )}
      </div>
    </motion.div>
  );
}
