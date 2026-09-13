/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — ASSESSMENT COVERAGE DASHBOARD (PHASE 5B)
 * Computes and displays true, real-world assessment coverage metrics across all skills in the platform.
 */

import React from 'react';
import { useAssessment } from '../../context/AssessmentContext';
import { useProfile } from '../../context/ProfileContext';
import { SKILLS_DB } from '../../data/skills';
import { 
  BarChart3, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  HelpCircle, 
  FileText, 
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Check
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';

interface AssessmentCoverageDashboardProps {
  onSelectSkillForAssessment?: (skillId: string) => void;
  onOpenAdminBuilder?: (skillId: string) => void;
}

export function AssessmentCoverageDashboard({
  onSelectSkillForAssessment,
  onOpenAdminBuilder
}: AssessmentCoverageDashboardProps) {
  const { calculateAssessmentCoverage, getProfileForSkill } = useAssessment();
  const { allSkills } = useProfile();
  const coverage = calculateAssessmentCoverage();

  const percentageComplete = coverage.totalSkills > 0 
    ? Math.round((coverage.skillsWithCompleteAssessment / coverage.totalSkills) * 100) 
    : 0;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-blue-50 text-blue-900 border border-blue-200 mb-2">
              <BarChart3 className="w-3.5 h-3.5 text-blue-600" /> Administrative Telemetry
            </div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900">
              Module 2 — Assessment Coverage Analytics
            </h2>
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              Real-time audit of knowledge quizzes, practical tasks, and objective rubrics across all {coverage.totalSkills} skills.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center shrink-0">
            <span className="text-xs font-bold text-blue-800 uppercase tracking-wider block">
              Total Platform Coverage
            </span>
            <div className="text-2xl md:text-3xl font-black text-blue-900 mt-0.5">
              {percentageComplete}%
            </div>
            <span className="text-[11px] font-semibold text-blue-700">
              {coverage.skillsWithCompleteAssessment} of {coverage.totalSkills} fully covered
            </span>
          </div>
        </div>

        {/* 4 Core Quantitative Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          {/* Metric 1 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Skills with Quiz
            </span>
            <div className="text-xl font-extrabold text-slate-900">
              {coverage.skillsWithQuiz} <span className="text-xs text-slate-400 font-normal">/ {coverage.totalSkills}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
              <div 
                className="bg-blue-600 h-1.5 rounded-full" 
                style={{ width: `${(coverage.skillsWithQuiz / coverage.totalSkills) * 100}%` }}
              />
            </div>
          </div>

          {/* Metric 2 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Skills with Practical Task
            </span>
            <div className="text-xl font-extrabold text-slate-900">
              {coverage.skillsWithPracticalTask} <span className="text-xs text-slate-400 font-normal">/ {coverage.totalSkills}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
              <div 
                className="bg-purple-600 h-1.5 rounded-full" 
                style={{ width: `${(coverage.skillsWithPracticalTask / coverage.totalSkills) * 100}%` }}
              />
            </div>
          </div>

          {/* Metric 3 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Skills with Rubric
            </span>
            <div className="text-xl font-extrabold text-slate-900">
              {coverage.skillsWithRubric} <span className="text-xs text-slate-400 font-normal">/ {coverage.totalSkills}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
              <div 
                className="bg-indigo-600 h-1.5 rounded-full" 
                style={{ width: `${(coverage.skillsWithRubric / coverage.totalSkills) * 100}%` }}
              />
            </div>
          </div>

          {/* Metric 4 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Complete Assessment
            </span>
            <div className="text-xl font-extrabold text-emerald-700">
              {coverage.skillsWithCompleteAssessment} <span className="text-xs text-slate-400 font-normal">/ {coverage.totalSkills}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
              <div 
                className="bg-emerald-600 h-1.5 rounded-full" 
                style={{ width: `${(coverage.skillsWithCompleteAssessment / coverage.totalSkills) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown Progress */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-600" /> Category-Wise Coverage Distribution
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(coverage?.categoryBreakdown || {}).map(([catName, stats]: [string, { total: number; complete: number; percentage: number }]) => (
            <div key={catName} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-800">{catName} Skills</span>
                <span className="text-xs font-extrabold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                  {stats.percentage}% Complete
                </span>
              </div>
              <div className="text-xs text-slate-500 font-medium">
                {stats.complete} of {stats.total} skills ready for evaluation
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all" 
                  style={{ width: `${stats.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Complete Skills Assessment Audit Table */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Skill Assessment Status Registry
            </h3>
            <p className="text-xs text-slate-500">
              Detailed breakdown of quiz questions, practical exercises, and versioning per skill.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
                <th className="py-3 px-3">Skill Name</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3 text-center">Quiz Bank</th>
                <th className="py-3 px-3 text-center">Practical Task</th>
                <th className="py-3 px-3 text-center">Rubric Criteria</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {allSkills.map((skill) => {
                const profile = getProfileForSkill(skill.id, skill.name, skill.category);
                const qCount = profile?.questions?.length || 0;
                const hasTask = Boolean(profile?.practicalTask?.title);
                const rubricCount = profile?.practicalTask?.rubric?.length || 0;
                const isFull = qCount >= 3 && hasTask && rubricCount >= 2;

                return (
                  <tr key={skill.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-3 font-bold text-slate-900">
                      {skill.name}
                    </td>
                    <td className="py-3.5 px-3 text-slate-600">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-semibold">
                        {skill.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span className="font-mono font-semibold text-slate-700">
                        {qCount} Questions
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      {hasTask ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Ready
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-amber-600 font-medium text-[11px]">
                          <AlertCircle className="w-3.5 h-3.5" /> Pending
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span className="font-mono font-semibold text-purple-700">
                        {rubricCount} Criteria (/20)
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      {isFull ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          Complete
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                          Partial
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {onOpenAdminBuilder && (
                          <button
                            onClick={() => onOpenAdminBuilder(skill.id)}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
                          >
                            Edit
                          </button>
                        )}
                        {onSelectSkillForAssessment && (
                          <button
                            onClick={() => onSelectSkillForAssessment(skill.id)}
                            className="px-3 py-1 rounded-lg text-[11px] font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-xs"
                          >
                            Assess Skill
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
