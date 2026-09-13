/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — ASSESSMENT RETAKE HISTORY & PROGRESS TRACKER (PHASE 5B)
 * Tracks multiple student attempts over time, displays proficiency deltas,
 * and preserves past attempt logs without overwriting history.
 */

import React, { useState } from 'react';
import { AssessmentAttempt } from '../../data/assessmentTypes';
import { 
  History, 
  Calendar, 
  TrendingUp, 
  Award, 
  Layers, 
  Eye, 
  CheckCircle2, 
  XCircle,
  Clock,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface AssessmentHistoryModalProps {
  attempts: AssessmentAttempt[];
  onSelectAttempt?: (attempt: AssessmentAttempt) => void;
  onClose?: () => void;
}

export function AssessmentHistoryModal({
  attempts,
  onSelectAttempt,
  onClose
}: AssessmentHistoryModalProps) {
  const [selectedAttemptId, setSelectedAttemptId] = useState<string | null>(
    attempts.length > 0 ? attempts[0].id : null
  );

  const activeAttempt = attempts.find(a => a.id === selectedAttemptId) || attempts[0];

  if (attempts.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-3">
        <History className="w-10 h-10 text-slate-400 mx-auto" />
        <h3 className="text-base font-bold text-slate-800">No Assessment History Found</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Complete an assessment quiz and practical task to start building your longitudinal evidence record.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-6 p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
              <History className="w-4 h-4" />
            </span>
            <h2 className="text-lg md:text-xl font-extrabold text-slate-900">
              My Assessment History & Progress Log
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Tracking longitudinal progress and proficiency development across {attempts.length} attempts.
          </p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-lg hover:bg-slate-100"
          >
            Close History
          </button>
        )}
      </div>

      {/* Main Attempts View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left List: Attempt Cards */}
        <div className="space-y-3 lg:col-span-1 border-r border-slate-100 pr-0 lg:pr-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Chronological Attempts ({attempts.length})
          </div>

          <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
            {attempts.map((att, idx) => {
              const isSelected = att.id === activeAttempt?.id;

              return (
                <button
                  key={att.id}
                  onClick={() => {
                    setSelectedAttemptId(att.id);
                    if (onSelectAttempt) onSelectAttempt(att);
                  }}
                  className={cn(
                    "w-full text-left p-4 rounded-2xl border transition-all text-xs space-y-2",
                    isSelected 
                      ? "border-blue-600 bg-blue-50/70 shadow-xs ring-1 ring-blue-600" 
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/70"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">
                      Attempt #{att.attemptNumber}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(att.timestamp).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded text-[11px]">
                      {att.indicativeProficiency}
                    </span>
                    <span className="text-slate-600 font-mono text-[11px] font-semibold">
                      Quiz: {att.quizScore.percentage}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                    <span>{att.evidenceLevel}</span>
                    <span className="font-medium text-purple-700">
                      Rubric: {att.totalRubricScore}/{att.maxRubricScore}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Detail: Selected Attempt Evidence Details */}
        {activeAttempt && (
          <div className="lg:col-span-2 space-y-6">
            {/* Header of Active Attempt */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    {activeAttempt.skillName} • Attempt #{activeAttempt.attemptNumber}
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">
                    Indicative Level: {activeAttempt.indicativeProficiency}
                  </h3>
                </div>
                <div className="text-right text-xs text-slate-500">
                  <div>Assessed on {new Date(activeAttempt.timestamp).toLocaleString()}</div>
                  <div className="font-semibold text-slate-700">{activeAttempt.evidenceLevel}</div>
                </div>
              </div>

              {/* Progress Signal Comparison */}
              {attempts.length > 1 && (
                <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 flex items-center justify-between">
                  <span className="font-bold flex items-center gap-1.5 text-blue-700">
                    <TrendingUp className="w-3.5 h-3.5" /> Longitudinal Trajectory:
                  </span>
                  <span className="font-medium">
                    Initial Attempt 1 ({attempts[attempts.length - 1].indicativeProficiency}) → Latest Attempt ({attempts[0].indicativeProficiency})
                  </span>
                </div>
              )}

              {/* G-ONE Feedback Snapshot */}
              <div className="p-3.5 rounded-xl bg-blue-900 text-white text-xs leading-relaxed space-y-1">
                <span className="font-bold text-blue-300 block">G-ONE Diagnostic Record:</span>
                <p>{activeAttempt.gOneFeedback}</p>
              </div>
            </div>

            {/* Answered Questions Breakdown */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Quiz Evaluation Questions ({Object.keys(activeAttempt.quizAnswers || {}).length})
              </h4>

              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {Object.entries(activeAttempt.quizAnswers || {}).map(([qId, ans], qIdx) => (
                  <div 
                    key={qId}
                    className="p-3 rounded-xl border border-slate-200 bg-white text-xs flex items-start justify-between gap-3"
                  >
                    <div className="flex items-start gap-2.5">
                      {ans.isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className="font-semibold text-slate-800">
                          {ans.questionRef?.question || `Question ${qIdx + 1}`}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Competency: {ans.questionRef?.competency || 'General'} • Difficulty: {ans.questionRef?.difficulty || 'Standard'}
                        </div>
                      </div>
                    </div>

                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-bold shrink-0",
                      ans.isCorrect ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                    )}>
                      {ans.isCorrect ? 'Correct' : 'Needs Review'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Practical Task Rubric Score Table */}
            {activeAttempt.practicalTaskCompleted && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Practical Task Rubric Breakdown ({activeAttempt.totalRubricScore || 0}/{activeAttempt.maxRubricScore || 20} pts)
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {Object.entries(activeAttempt.rubricScores || {}).map(([critId, score]) => (
                    <div key={critId} className="p-3 rounded-xl border border-slate-200 bg-slate-50 text-center">
                      <div className="text-[10px] font-bold text-slate-500 uppercase truncate">
                        {critId.replace(/_/g, ' ')}
                      </div>
                      <div className="text-sm font-extrabold text-purple-700 mt-1">
                        {score} / 5 pts
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
