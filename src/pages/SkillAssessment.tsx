/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — MODULE 2: SKILL ASSESSMENT & PROFICIENCY ENGINE
 * Master orchestrator for evidence-based skill assessment, adaptive knowledge quizzes,
 * hands-on practical tasks, G-ONE synthesis, longitudinal history, and administrative builders.
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useAssessment } from '../context/AssessmentContext';
import { useProfile } from '../context/ProfileContext';
import { useViewMode } from '../context/ViewModeContext';
import { SKILLS_DB, Skill } from '../data/skills';
import { 
  AssessmentLengthMode, 
  QuestionItem, 
  PracticalTask, 
  AssessmentAttempt 
} from '../data/assessmentTypes';
import { AdaptiveQuizEngine } from '../components/assessment/AdaptiveQuizEngine';
import { PracticalTaskEngine } from '../components/assessment/PracticalTaskEngine';
import { AssessmentResultsSummary } from '../components/assessment/AssessmentResultsSummary';
import { AssessmentHistoryModal } from '../components/assessment/AssessmentHistoryModal';
import { AssessmentCoverageDashboard } from '../components/assessment/AssessmentCoverageDashboard';
import { AdminAssessmentBuilder } from '../components/assessment/AdminAssessmentBuilder';
import { 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  History, 
  BarChart3, 
  Sliders, 
  ArrowRight, 
  Award, 
  HelpCircle, 
  Clock, 
  ShieldCheck, 
  ChevronRight, 
  Zap, 
  BookOpen, 
  FileCode,
  RotateCcw
} from 'lucide-react';
import { cn } from '../lib/utils';

export function SkillAssessment() {
  const { skillId: routeSkillId } = useParams<{ skillId?: string }>();
  const [searchParams] = useSearchParams();
  const querySkillId = searchParams.get('skillId') || undefined;
  const effectiveSkillId = routeSkillId || querySkillId;

  const navigate = useNavigate();
  const { isMinimal } = useViewMode();
  
  const { 
    getProfileForSkill, 
    analyzeAssessmentEvidence, 
    saveAssessmentAttempt, 
    getAttemptsForSkill, 
    attempts 
  } = useAssessment();

  const { userSkills, updateAssessedProficiency, allSkills } = useProfile();

  // Top navigation tabs
  const [activeTab, setActiveTab] = useState<'assess' | 'history' | 'coverage' | 'builder'>('assess');

  // Selected skill & mode state
  const [selectedSkillId, setSelectedSkillId] = useState<string>(() => {
    if (effectiveSkillId) return effectiveSkillId;
    if (userSkills.length > 0) return userSkills[0].skillId;
    return 'coding';
  });

  const [lengthMode, setLengthMode] = useState<AssessmentLengthMode>('standard');
  const [assessmentStep, setAssessmentStep] = useState<'select' | 'quiz' | 'task' | 'results'>('select');

  // Quiz state during active session
  const [quizAnswersState, setQuizAnswersState] = useState<{
    [questionId: string]: {
      selectedAnswer: any;
      isCorrect: boolean;
      timeSpentSeconds: number;
      questionRef: QuestionItem;
    };
  }>({});

  // Finished attempt state
  const [latestAttempt, setLatestAttempt] = useState<AssessmentAttempt | null>(null);

  // Sync route param or search param if it changes
  useEffect(() => {
    if (effectiveSkillId) {
      setSelectedSkillId(effectiveSkillId);
      setActiveTab('assess');
      setAssessmentStep('select');
    }
  }, [effectiveSkillId]);

  const selectedSkill = allSkills.find(s => s.id === selectedSkillId) || 
    SKILLS_DB.find(s => s.id === selectedSkillId) || 
    SKILLS_DB[0];

  const profile = getProfileForSkill(selectedSkill.id, selectedSkill.name, selectedSkill.category);
  const skillAttempts = getAttemptsForSkill(selectedSkill.id);

  // Handle Quiz Completion
  const handleQuizComplete = (answers: typeof quizAnswersState) => {
    setQuizAnswersState(answers);
    if (lengthMode === 'quick') {
      finishAssessmentWithoutTask(answers);
    } else {
      setAssessmentStep('task');
    }
  };

  // Complete assessment with practical task
  const handleTaskComplete = (taskData: {
    taskCompleted: boolean;
    response: any;
    rubricScores: { [criterionId: string]: number };
    totalRubricScore: number;
    maxRubricScore: number;
    selfReportedConfidenceScore: number;
    selfReportedExperienceYears: string;
  }) => {
    const existingSkill = userSkills.find(s => s.skillId === selectedSkill.id);
    const selfReportedProf = existingSkill?.proficiency;

    const analysis = analyzeAssessmentEvidence(
      selectedSkill.id,
      selectedSkill.name,
      quizAnswersState,
      taskData.rubricScores,
      taskData.totalRubricScore,
      taskData.maxRubricScore,
      taskData.taskCompleted,
      selfReportedProf
    );

    const attemptNumber = skillAttempts.length + 1;
    const attemptId = `att_${selectedSkill.id}_${Date.now()}`;

    const newAttempt: AssessmentAttempt = {
      id: attemptId,
      skillId: selectedSkill.id,
      skillName: selectedSkill.name,
      timestamp: new Date().toISOString(),
      durationSeconds: 180,
      attemptNumber,
      lengthMode,
      quizAnswers: quizAnswersState,
      quizScore: analysis.quizScore,
      difficultyBreakdown: {},
      practicalTaskCompleted: taskData.taskCompleted,
      practicalResponse: taskData.response,
      rubricScores: taskData.rubricScores,
      totalRubricScore: taskData.totalRubricScore,
      maxRubricScore: taskData.maxRubricScore,
      selfReportedProficiencyBefore: selfReportedProf,
      selfReportedConfidenceScore: taskData.selfReportedConfidenceScore,
      selfReportedExperienceYears: taskData.selfReportedExperienceYears,
      indicativeProficiency: analysis.indicativeProficiency,
      evidenceLevel: analysis.evidenceLevel,
      strengths: analysis.strengths,
      areasToDevelop: analysis.areasToDevelop,
      gOneFeedback: analysis.gOneFeedback,
      gOneNextStepRecommendation: 'Explore Opportunities',
      comparisonWithSelfReport: analysis.comparisonWithSelfReport,
      isAssessmentSupported: true,
      assessmentVersion: 1
    };

    saveAssessmentAttempt(newAttempt);
    setLatestAttempt(newAttempt);

    updateAssessedProficiency(
      selectedSkill.id,
      analysis.indicativeProficiency,
      analysis.evidenceLevel,
      analysis.quizScore.percentage,
      taskData.totalRubricScore
    );

    setAssessmentStep('results');
  };

  const finishAssessmentWithoutTask = (answers: typeof quizAnswersState) => {
    const existingSkill = userSkills.find(s => s.skillId === selectedSkill.id);
    const selfReportedProf = existingSkill?.proficiency;

    const analysis = analyzeAssessmentEvidence(
      selectedSkill.id,
      selectedSkill.name,
      answers,
      {},
      0,
      20,
      false,
      selfReportedProf
    );

    const attemptNumber = skillAttempts.length + 1;
    const attemptId = `att_${selectedSkill.id}_${Date.now()}`;

    const newAttempt: AssessmentAttempt = {
      id: attemptId,
      skillId: selectedSkill.id,
      skillName: selectedSkill.name,
      timestamp: new Date().toISOString(),
      durationSeconds: 120,
      attemptNumber,
      lengthMode,
      quizAnswers: answers,
      quizScore: analysis.quizScore,
      difficultyBreakdown: {},
      practicalTaskCompleted: false,
      rubricScores: {},
      totalRubricScore: 0,
      maxRubricScore: 20,
      selfReportedProficiencyBefore: selfReportedProf,
      indicativeProficiency: analysis.indicativeProficiency,
      evidenceLevel: analysis.evidenceLevel,
      strengths: analysis.strengths,
      areasToDevelop: analysis.areasToDevelop,
      gOneFeedback: analysis.gOneFeedback,
      gOneNextStepRecommendation: 'Move to Advanced Task',
      comparisonWithSelfReport: analysis.comparisonWithSelfReport,
      isAssessmentSupported: true,
      assessmentVersion: 1
    };

    saveAssessmentAttempt(newAttempt);
    setLatestAttempt(newAttempt);

    updateAssessedProficiency(
      selectedSkill.id,
      analysis.indicativeProficiency,
      analysis.evidenceLevel,
      analysis.quizScore.percentage,
      0
    );

    setAssessmentStep('results');
  };

  const handleRetake = () => {
    setAssessmentStep('quiz');
    setQuizAnswersState({});
    setLatestAttempt(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-7 pb-16 animate-in fade-in duration-300">
      
      {/* 2. Header & Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 dark:text-slate-400 uppercase">
              COMPETENCY VERIFICATION
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-slate-900 dark:text-white tracking-tight">
            Skill Proficiency Assessment
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Indicative proficiency derived from knowledge checks, practical tasks, and demonstration evidence.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/90 dark:border-slate-700 overflow-x-auto">
          <button
            onClick={() => { setActiveTab('assess'); setAssessmentStep('select'); }}
            className={cn(
              "px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer",
              activeTab === 'assess' 
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-bold" 
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            <Zap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Take Assessment</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={cn(
              "px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer",
              activeTab === 'history' 
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-bold" 
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            <History className="w-3.5 h-3.5 text-slate-500" />
            <span>My History ({attempts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('coverage')}
            className={cn(
              "px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer",
              activeTab === 'coverage' 
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-bold" 
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            <BarChart3 className="w-3.5 h-3.5 text-slate-500" />
            <span>Coverage Audit</span>
          </button>

          <button
            onClick={() => setActiveTab('builder')}
            className={cn(
              "px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer",
              activeTab === 'builder' 
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-bold" 
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            <Sliders className="w-3.5 h-3.5 text-slate-500" />
            <span>Admin Builder</span>
          </button>
        </div>
      </div>

      {/* ACTIVE ASSESSMENT WORKFLOW */}
      {activeTab === 'assess' && (
        <div className="space-y-6">
          {/* STEP 0: SKILL & MODE SELECTION */}
          {assessmentStep === 'select' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Select Skill Box */}
              <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-5 transition-colors">
                <div>
                  <h2 className="text-base md:text-lg font-heading font-bold text-slate-900 dark:text-white">
                    1. Select Skill for Assessment
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Choose from your added profile skills or explore any vocational curriculum skill.
                  </p>
                </div>

                {/* Skill Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {allSkills.map((skill) => {
                    const isSelected = skill.id === selectedSkillId;
                    const existingUserSkill = userSkills.find(s => s.skillId === skill.id);
                    const hasAssessed = Boolean(existingUserSkill?.indicativeProficiency);

                    return (
                      <button
                        key={skill.id}
                        onClick={() => setSelectedSkillId(skill.id)}
                        className={cn(
                          "p-3.5 rounded-xl border text-left transition-all space-y-1.5 relative overflow-hidden cursor-pointer",
                          isSelected 
                            ? "border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 dark:border-blue-500 shadow-xs ring-2 ring-blue-600/20" 
                            : "border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-semibold text-slate-400 dark:text-slate-400 uppercase">
                            {skill.category}
                          </span>
                          {hasAssessed && (
                            <span className="w-2 h-2 rounded-full bg-emerald-500" title="Assessed" />
                          )}
                        </div>

                        <div className="font-heading font-bold text-xs md:text-sm text-slate-900 dark:text-white leading-tight">
                          {skill.name}
                        </div>

                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                          {hasAssessed ? (
                            <span className="text-blue-700 dark:text-blue-400 font-bold font-mono">
                              Verified: {existingUserSkill?.indicativeProficiency}
                            </span>
                          ) : (
                            <span>Self-Reported: {existingUserSkill?.proficiency || 'Not Added'}</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Assessment Length & Depth Selector */}
              <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-5 transition-colors">
                <div>
                  <h2 className="text-base md:text-lg font-heading font-bold text-slate-900 dark:text-white">
                    2. Choose Assessment Depth
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Select how deeply you would like to test conceptual knowledge and practical execution.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Option 1: Quick */}
                  <button
                    onClick={() => setLengthMode('quick')}
                    className={cn(
                      "p-4 rounded-xl border text-left transition-all space-y-2.5 cursor-pointer",
                      lengthMode === 'quick' 
                        ? "border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 dark:border-blue-500 shadow-xs ring-2 ring-blue-500/20" 
                        : "border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                        QUICK CHECK
                      </span>
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> ~4 mins
                      </span>
                    </div>

                    <div className="font-heading font-bold text-sm text-slate-900 dark:text-white">
                      Adaptive Knowledge Quiz
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      5 quick adaptive questions to test core understanding and provide rapid calibration.
                    </p>
                  </button>

                  {/* Option 2: Standard (Recommended) */}
                  <button
                    onClick={() => setLengthMode('standard')}
                    className={cn(
                      "p-4 rounded-xl border text-left transition-all space-y-2.5 cursor-pointer relative",
                      lengthMode === 'standard' 
                        ? "border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 dark:border-blue-500 shadow-xs ring-2 ring-blue-500/20" 
                        : "border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                        STANDARD (RECOMMENDED)
                      </span>
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> ~15 mins
                      </span>
                    </div>

                    <div className="font-heading font-bold text-sm text-slate-900 dark:text-white">
                      Quiz + Practical Task + Rubric
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      8 adaptive questions + hands-on challenge with 4 rubric criteria and demonstration workspace.
                    </p>
                  </button>

                  {/* Option 3: Deep */}
                  <button
                    onClick={() => setLengthMode('deep')}
                    className={cn(
                      "p-4 rounded-xl border text-left transition-all space-y-2.5 cursor-pointer",
                      lengthMode === 'deep' 
                        ? "border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 dark:border-blue-500 shadow-xs ring-2 ring-blue-500/20" 
                        : "border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                        FULL DIAGNOSTIC
                      </span>
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> ~25 mins
                      </span>
                    </div>

                    <div className="font-heading font-bold text-sm text-slate-900 dark:text-white">
                      Full Diagnostic + Multi-Item Task
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      12-15 questions covering all competency facets + project artifact reflection.
                    </p>
                  </button>
                </div>

                {/* Launch Button */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Selected Skill: <strong className="text-slate-800 dark:text-slate-200">{selectedSkill.name}</strong> • Mode: <strong className="text-slate-800 dark:text-slate-200 uppercase font-mono">{lengthMode}</strong>
                  </div>

                  <button
                    onClick={() => setAssessmentStep('quiz')}
                    className="px-6 py-2.5 rounded-xl bg-slate-950 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-xs btn-press"
                  >
                    <span>Begin Assessment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </section>
            </div>
          )}

          {/* STEP 1: ADAPTIVE QUIZ */}
          {assessmentStep === 'quiz' && (
            <div className="space-y-4">
              <AdaptiveQuizEngine
                questions={profile.questions}
                skillName={selectedSkill.name}
                category={selectedSkill.category}
                lengthMode={lengthMode}
                onComplete={handleQuizComplete}
                onCancel={() => setAssessmentStep('select')}
              />
            </div>
          )}

          {/* STEP 2: PRACTICAL TASK */}
          {assessmentStep === 'task' && (
            <div className="space-y-4">
              <PracticalTaskEngine
                task={profile.practicalTask}
                skillName={selectedSkill.name}
                onComplete={handleTaskComplete}
                onSkip={() => finishAssessmentWithoutTask(quizAnswersState)}
              />
            </div>
          )}

          {/* STEP 3: RESULTS SYNTHESIS */}
          {assessmentStep === 'results' && latestAttempt && (
            <div className="space-y-4">
              <AssessmentResultsSummary
                attempt={latestAttempt}
                onRetake={handleRetake}
                onExploreOpportunities={() => navigate('/opportunities')}
              />
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MY ASSESSMENT HISTORY */}
      {activeTab === 'history' && (
        <AssessmentHistoryModal
          attempts={attempts}
          onSelectAttempt={(att) => {
            setLatestAttempt(att);
            setActiveTab('assess');
            setAssessmentStep('results');
          }}
        />
      )}

      {/* TAB 3: ASSESSMENT COVERAGE DASHBOARD */}
      {activeTab === 'coverage' && (
        <AssessmentCoverageDashboard
          onSelectSkillForAssessment={(skillId) => {
            setSelectedSkillId(skillId);
            setActiveTab('assess');
            setAssessmentStep('select');
          }}
          onOpenAdminBuilder={(skillId) => {
            setSelectedSkillId(skillId);
            setActiveTab('builder');
          }}
        />
      )}

      {/* TAB 4: ADMIN BUILDER */}
      {activeTab === 'builder' && (
        <AdminAssessmentBuilder
          initialSkillId={selectedSkillId}
        />
      )}
    </div>
  );
}
