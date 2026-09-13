/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — MODULE 2: SKILL ASSESSMENT & PROFICIENCY ENGINE (PHASE 5B)
 * Master orchestrator for evidence-based skill assessment, adaptive knowledge quizzes,
 * hands-on practical tasks, G-ONE synthesis, longitudinal history, and administrative builders.
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
    if (routeSkillId) return routeSkillId;
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

  // Sync route param if it changes
  useEffect(() => {
    if (routeSkillId) {
      setSelectedSkillId(routeSkillId);
      setActiveTab('assess');
      setAssessmentStep('select');
    }
  }, [routeSkillId]);

  const selectedSkill = allSkills.find(s => s.id === selectedSkillId) || 
    SKILLS_DB.find(s => s.id === selectedSkillId) || 
    SKILLS_DB[0];

  const profile = getProfileForSkill(selectedSkill.id, selectedSkill.name, selectedSkill.category);
  const skillAttempts = getAttemptsForSkill(selectedSkill.id);

  // Handle Quiz Completion
  const handleQuizComplete = (answers: typeof quizAnswersState) => {
    setQuizAnswersState(answers);
    // If lengthMode is quick and user has no practical task configured or wants to synthesize directly:
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

    // Update Profile Context with new indicative proficiency & evidence level
    updateAssessedProficiency(
      selectedSkill.id,
      analysis.indicativeProficiency,
      analysis.evidenceLevel,
      analysis.quizScore.percentage,
      taskData.totalRubricScore
    );

    setAssessmentStep('results');
  };

  // Skip task / quick finish
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
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Page Title & Navigation Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-blue-100 text-blue-900 border border-blue-200">
              Module 2
            </span>
            <span className="text-xs text-slate-500 font-semibold">
              G-ONE Skill Assessment & Proficiency Engine
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Skill Proficiency Assessment
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1 max-w-2xl">
            Indicative proficiency derived from knowledge checks, practical tasks, and demonstration evidence — not absolute judgement.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 overflow-x-auto">
          <button
            onClick={() => { setActiveTab('assess'); setAssessmentStep('select'); }}
            className={cn(
              "px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0",
              activeTab === 'assess' 
                ? "bg-white text-blue-700 shadow-xs" 
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            <Zap className="w-3.5 h-3.5" />
            Take Assessment
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={cn(
              "px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0",
              activeTab === 'history' 
                ? "bg-white text-blue-700 shadow-xs" 
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            <History className="w-3.5 h-3.5" />
            My History ({attempts.length})
          </button>

          <button
            onClick={() => setActiveTab('coverage')}
            className={cn(
              "px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0",
              activeTab === 'coverage' 
                ? "bg-white text-blue-700 shadow-xs" 
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Coverage Audit
          </button>

          <button
            onClick={() => setActiveTab('builder')}
            className={cn(
              "px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0",
              activeTab === 'builder' 
                ? "bg-white text-purple-700 shadow-xs" 
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            <Sliders className="w-3.5 h-3.5" />
            Admin Builder
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* TAB 1: ACTIVE ASSESSMENT WORKFLOW */}
      {/* ==================================================================== */}
      {activeTab === 'assess' && (
        <div className="space-y-6">
          {/* STEP 0: SKILL & MODE SELECTION */}
          {assessmentStep === 'select' && (
            <div className="space-y-8 animate-fadeIn">
              {/* Select Skill Box */}
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h2 className="text-lg md:text-xl font-extrabold text-slate-900">
                    1. Select Skill for Assessment
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Choose from your added profile skills or explore any skill across the national curriculum.
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
                          "p-4 rounded-2xl border text-left transition-all space-y-2 relative overflow-hidden",
                          isSelected 
                            ? "border-blue-600 bg-blue-50/70 shadow-sm ring-2 ring-blue-600/30" 
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            {skill.category}
                          </span>
                          {hasAssessed && (
                            <span className="w-2 h-2 rounded-full bg-emerald-500" title="Assessed" />
                          )}
                        </div>

                        <div className="font-extrabold text-xs md:text-sm text-slate-900 leading-tight">
                          {skill.name}
                        </div>

                        <div className="text-[11px] text-slate-500 font-medium">
                          {hasAssessed ? (
                            <span className="text-blue-700 font-bold">
                              Assessed: {existingUserSkill?.indicativeProficiency}
                            </span>
                          ) : (
                            <span>Self-Reported: {existingUserSkill?.proficiency || 'Not Added'}</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Assessment Length & Depth Selector */}
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h2 className="text-lg md:text-xl font-extrabold text-slate-900">
                    2. Choose Assessment Depth
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Select how deeply you would like to test your conceptual knowledge and practical skills.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Option 1: Quick */}
                  <button
                    onClick={() => setLengthMode('quick')}
                    className={cn(
                      "p-5 rounded-2xl border text-left transition-all space-y-3",
                      lengthMode === 'quick' 
                        ? "border-blue-600 bg-blue-50/60 shadow-xs ring-1 ring-blue-600" 
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-800">
                        Quick Check
                      </span>
                      <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> ~4 mins
                      </span>
                    </div>

                    <div className="font-extrabold text-sm text-slate-900">
                      Adaptive Knowledge Quiz
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      5 quick adaptive questions to test conceptual understanding and provide rapid calibration.
                    </p>
                  </button>

                  {/* Option 2: Standard (Recommended) */}
                  <button
                    onClick={() => setLengthMode('standard')}
                    className={cn(
                      "p-5 rounded-2xl border text-left transition-all space-y-3 relative",
                      lengthMode === 'standard' 
                        ? "border-purple-600 bg-purple-50/60 shadow-xs ring-1 ring-purple-600" 
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-purple-900">
                        Standard Assessment (Recommended)
                      </span>
                      <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> ~15 mins
                      </span>
                    </div>

                    <div className="font-extrabold text-sm text-slate-900">
                      Quiz + Practical Task + Rubric
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      8 adaptive questions + hands-on challenge with 4 rubric criteria and demonstration workspace.
                    </p>
                  </button>

                  {/* Option 3: Deep */}
                  <button
                    onClick={() => setLengthMode('deep')}
                    className={cn(
                      "p-5 rounded-2xl border text-left transition-all space-y-3",
                      lengthMode === 'deep' 
                        ? "border-amber-600 bg-amber-50/60 shadow-xs ring-1 ring-amber-600" 
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-900">
                        Deep Diagnostic
                      </span>
                      <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> ~25 mins
                      </span>
                    </div>

                    <div className="font-extrabold text-sm text-slate-900">
                      Full Diagnostic + Multi-Item Task
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      12-15 questions covering all competency facets + project artifact upload & reflection.
                    </p>
                  </button>
                </div>

                {/* Launch Button */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    Selected Skill: <strong className="text-slate-800">{selectedSkill.name}</strong> • Mode: <strong className="text-slate-800 uppercase">{lengthMode}</strong>
                  </div>

                  <button
                    onClick={() => setAssessmentStep('quiz')}
                    className="px-8 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm transition-all flex items-center gap-2 shadow-sm"
                  >
                    <span>Begin Assessment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
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

      {/* ==================================================================== */}
      {/* TAB 2: MY ASSESSMENT HISTORY */}
      {/* ==================================================================== */}
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

      {/* ==================================================================== */}
      {/* TAB 3: ASSESSMENT COVERAGE DASHBOARD */}
      {/* ==================================================================== */}
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

      {/* ==================================================================== */}
      {/* TAB 4: ADMIN BUILDER */}
      {/* ==================================================================== */}
      {activeTab === 'builder' && (
        <AdminAssessmentBuilder
          initialSkillId={selectedSkillId}
        />
      )}
    </div>
  );
}
