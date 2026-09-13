/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — ASSESSMENT RESULTS & G-ONE SYNTHESIS SUMMARY (PHASE 5B)
 * Displays Indicative Proficiency, Evidence Level, Strengths, Error Analysis,
 * Self-Reflection Comparison, Next Step Recommendations, and Save Educational Summary.
 */

import React, { useState } from 'react';
import { AssessmentAttempt } from '../../data/assessmentTypes';
import { 
  Award, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  ArrowRight, 
  Download, 
  FileText, 
  RotateCcw, 
  ExternalLink,
  ShieldCheck,
  Compass,
  Layers,
  HelpCircle,
  X,
  Target
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useViewMode } from '../../context/ViewModeContext';

interface AssessmentResultsSummaryProps {
  attempt: AssessmentAttempt;
  onRetake: () => void;
  onExploreOpportunities?: () => void;
}

export function AssessmentResultsSummary({
  attempt,
  onRetake,
  onExploreOpportunities
}: AssessmentResultsSummaryProps) {
  const navigate = useNavigate();
  const { isMinimal } = useViewMode();
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  const getProficiencyColor = (prof: string) => {
    switch (prof) {
      case 'Advanced':
        return 'bg-amber-50 text-amber-900 border-amber-300 ring-amber-400';
      case 'Strong':
        return 'bg-purple-50 text-purple-900 border-purple-300 ring-purple-400';
      case 'Intermediate':
        return 'bg-indigo-50 text-indigo-900 border-indigo-300 ring-indigo-400';
      case 'Developing':
        return 'bg-blue-50 text-blue-900 border-blue-300 ring-blue-400';
      default:
        return 'bg-emerald-50 text-emerald-900 border-emerald-300 ring-emerald-400';
    }
  };

  const getEvidenceBadge = (level: string) => {
    switch (level) {
      case 'High evidence':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> High Evidence (Quiz + Task + Demo)</span>;
      case 'Moderate evidence':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300 flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-blue-600" /> Moderate Evidence (Quiz + Basic Task)</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-300 flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5 text-slate-500" /> Limited Evidence (Quiz Only / Exploratory)</span>;
    }
  };

  const handlePrintSummary = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200">
                Assessment Synthesis
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Attempt #{attempt.attemptNumber} • {new Date(attempt.timestamp).toLocaleDateString()}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {attempt.skillName} Assessment Record
            </h1>
            <p className="text-xs md:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Multi-dimensional evaluation synthesizing conceptual knowledge, practical rubric scoring, and reflective calibration.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSummaryModal(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-2 border border-slate-200"
            >
              <FileText className="w-3.5 h-3.5" />
              Save Summary Card
            </button>
            <button
              onClick={onRetake}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors flex items-center gap-2 border border-blue-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Retake Assessment
            </button>
          </div>
        </div>

        {/* Core Result Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {/* Box 1: Indicative Proficiency */}
          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Indicative Proficiency
              </span>
              <Award className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl md:text-3xl font-extrabold text-slate-900">
                {attempt.indicativeProficiency}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 italic">
              Estimated benchmark based on demonstrated evidence. (Educational guide, not a formal certification).
            </p>
          </div>

          {/* Box 2: Evidence Confidence */}
          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Assessment Evidence Level
              </span>
              <Layers className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              {getEvidenceBadge(attempt.evidenceLevel)}
            </div>
            <p className="text-[11px] text-slate-500">
              Reflects the depth and completeness of submitted artifacts during evaluation.
            </p>
          </div>

          {/* Box 3: Demonstrated Scores */}
          <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Score Breakdown
              </span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
              <span>Quiz Accuracy:</span>
              <span className="font-mono text-emerald-700 font-bold">{attempt.quizScore.percentage}% ({attempt.quizScore.correct}/{attempt.quizScore.total})</span>
            </div>
            <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
              <span>Practical Rubric:</span>
              <span className="font-mono text-purple-700 font-bold">{attempt.totalRubricScore} / {attempt.maxRubricScore} pts</span>
            </div>
          </div>
        </div>
      </div>

      {/* G-ONE Synthesis Insights Card */}
      <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-300">
            <Sparkles className="w-4 h-4 text-blue-400" /> G-ONE Evidence Evaluation
          </div>

          <p className="text-base md:text-lg font-medium leading-relaxed text-blue-50">
            "{attempt.gOneFeedback}"
          </p>

          {/* Self-Assessment Comparison Note */}
          {attempt.comparisonWithSelfReport && (
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 text-xs md:text-sm text-blue-100 leading-relaxed">
              <span className="font-bold text-amber-300 block mb-1">Calibration Analysis:</span>
              {attempt.comparisonWithSelfReport}
            </div>
          )}
        </div>
      </div>

      {/* Strengths & Error Analysis Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Your Strengths */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">Your Demonstrated Strengths</h3>
          </div>
          <p className="text-xs text-slate-500">
            Competencies where you consistently succeeded across conceptual and practical tests:
          </p>

          <div className="space-y-2.5">
            {attempt.strengths.map((str, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </span>
                <span className="text-xs md:text-sm font-semibold text-emerald-950 leading-tight">
                  {str}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Areas to Develop Next */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-bold text-slate-900">Recommended Areas to Develop</h3>
          </div>
          <p className="text-xs text-slate-500">
            Constructive focus areas identified from errors or gaps during assessment:
          </p>

          <div className="space-y-2.5">
            {attempt.areasToDevelop.map((area, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-950">{area.competency}</span>
                  {area.missedQuestionsCount > 0 && (
                    <span className="text-[10px] font-semibold text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded">
                      {area.missedQuestionsCount} missed signal
                    </span>
                  )}
                </div>
                <p className="text-xs text-amber-900 leading-relaxed font-medium">
                  {area.recommendation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Next Steps & Integration Actions */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
            Connected Continuum Next Steps
          </span>
          <h3 className="text-lg md:text-xl font-bold">
            Apply {attempt.skillName} ({attempt.indicativeProficiency}) to Real Opportunities
          </h3>
          <p className="text-xs md:text-sm text-slate-400 max-w-xl">
            Your validated indicative proficiency has updated your Skill Profile and Skill DNA, unlocking tailored real-world opportunities.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => navigate('/opportunities')}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs md:text-sm font-bold transition-all flex items-center gap-2 shadow-sm"
          >
            <Compass className="w-4 h-4" />
            Explore Matching Opportunities
          </button>
          <button
            onClick={() => navigate('/roadmap')}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs md:text-sm font-bold transition-all border border-slate-700"
          >
            View Action Roadmap
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* SAVE ASSESSMENT SUMMARY MODAL / CARD */}
      {/* ==================================================================== */}
      {showSummaryModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-2xl w-full p-6 md:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setShowSummaryModal(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Printable Educational Card Header */}
            <div className="border-b border-slate-200 pb-4 text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-blue-50 text-blue-900 border border-blue-200">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" /> KAUSHAL SETU — EDUCATIONAL ASSESSMENT RECORD
              </div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900">
                {attempt.skillName} Proficiency Summary
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Assessment Attempt #{attempt.attemptNumber} • Date: {new Date(attempt.timestamp).toLocaleDateString()}
              </p>
            </div>

            {/* Summary Details Table */}
            <div className="space-y-3 text-xs md:text-sm">
              <div className="p-3.5 rounded-xl bg-slate-50 flex items-center justify-between border border-slate-200">
                <span className="font-bold text-slate-600">Indicative Proficiency Level:</span>
                <span className="font-extrabold text-blue-700 text-sm md:text-base">{attempt.indicativeProficiency}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 flex items-center justify-between border border-slate-200">
                <span className="font-bold text-slate-600">Assessment Evidence Confidence:</span>
                <span className="font-bold text-slate-900">{attempt.evidenceLevel}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 flex items-center justify-between border border-slate-200">
                <span className="font-bold text-slate-600">Conceptual Quiz Score:</span>
                <span className="font-bold text-emerald-700">{attempt.quizScore.percentage}% ({attempt.quizScore.correct}/{attempt.quizScore.total})</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 flex items-center justify-between border border-slate-200">
                <span className="font-bold text-slate-600">Practical Task Rubric Score:</span>
                <span className="font-bold text-purple-700">{attempt.totalRubricScore} / {attempt.maxRubricScore} pts</span>
              </div>
            </div>

            {/* Strengths & Next Steps Summary */}
            <div className="space-y-2 text-xs">
              <div className="font-bold text-slate-800 uppercase tracking-wider">Demonstrated Strengths:</div>
              <ul className="list-disc pl-5 text-slate-700 space-y-1">
                {attempt.strengths.slice(0, 3).map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            {/* Mandatory Educational Disclaimer */}
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs leading-relaxed">
              <span className="font-bold block mb-0.5">Educational Assessment Notice:</span>
              This document is an educational assessment summary reflecting indicative proficiency within the Kaushal Setu learning platform. It is designed to support student growth, project matching, and self-directed practice, and does not constitute a formal professional or statutory certification.
            </div>

            {/* Card Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowSummaryModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={handlePrintSummary}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                Print / Save PDF Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
