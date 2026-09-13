/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — MODULE 2: ASSESSMENT CONTEXT & G-ONE ANALYSER ENGINE (PHASE 5B)
 * Manages assessment profiles, multi-dimensional scoring, retake history, and G-ONE synthesis.
 */

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { 
  AssessmentProfile, 
  AssessmentAttempt, 
  QuestionItem, 
  IndicativeProficiency, 
  EvidenceLevel, 
  AssessmentCoverageMetric,
  AssessmentLengthMode,
  QuestionDifficulty
} from '../data/assessmentTypes';
import { INITIAL_ASSESSMENT_PROFILES, getAssessmentProfileForSkill } from '../data/assessmentDatabase';
import { SKILLS_DB } from '../data/skills';

interface AssessmentContextType {
  profiles: AssessmentProfile[];
  attempts: AssessmentAttempt[];
  getProfileForSkill: (skillId: string, skillName?: string, category?: any) => AssessmentProfile;
  saveAttempt: (attempt: AssessmentAttempt) => void;
  saveAssessmentAttempt: (attempt: AssessmentAttempt) => void;
  getAttemptsForSkill: (skillId: string) => AssessmentAttempt[];
  getLatestAttemptForSkill: (skillId: string) => AssessmentAttempt | undefined;
  updateProfile: (profile: AssessmentProfile) => void;
  addQuestionToProfile: (skillId: string, question: QuestionItem) => void;
  deleteQuestionFromProfile: (skillId: string, questionId: string) => void;
  calculateAssessmentCoverage: () => AssessmentCoverageMetric;
  analyzeAssessmentEvidence: (
    paramsOrSkillId: any,
    skillName?: string,
    quizAnswers?: any,
    rubricScores?: any,
    totalRubricScore?: number,
    maxRubricScore?: number,
    practicalTaskCompleted?: boolean,
    selfReportedProficiencyBefore?: string
  ) => {
    indicativeProficiency: IndicativeProficiency;
    evidenceLevel: EvidenceLevel;
    strengths: string[];
    areasToDevelop: { competency: string; recommendation: string; missedQuestionsCount: number }[];
    gOneFeedback: string;
    gOneNextStepRecommendation: 'Retake' | 'Move to Advanced Task' | 'Practise Before Retaking' | 'Explore Opportunities';
    comparisonWithSelfReport: string;
    difficultyBreakdown: { [key in QuestionDifficulty]?: { correct: number; total: number } };
    quizScore: { correct: number; total: number; percentage: number };
    totalRubricScore: number;
  };
  clearAssessmentData: () => void;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export function AssessmentProvider({ children }: { children: React.ReactNode }) {
  // Profiles store (seeded with built-in profiles, supports custom admin updates)
  const [profiles, setProfiles] = useState<AssessmentProfile[]>(() => {
    try {
      const saved = localStorage.getItem('ks_assessment_profiles_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load assessment profiles from localStorage:', e);
    }
    return INITIAL_ASSESSMENT_PROFILES;
  });

  // Attempts store (stores all student attempts chronologically)
  const [attempts, setAttempts] = useState<AssessmentAttempt[]>(() => {
    try {
      const saved = localStorage.getItem('ks_assessment_attempts_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load assessment attempts from localStorage:', e);
    }
    return [];
  });

  // Persist profiles
  useEffect(() => {
    try {
      localStorage.setItem('ks_assessment_profiles_v1', JSON.stringify(profiles));
    } catch (e) {
      console.error('Failed to save assessment profiles:', e);
    }
  }, [profiles]);

  // Persist attempts
  useEffect(() => {
    try {
      localStorage.setItem('ks_assessment_attempts_v1', JSON.stringify(attempts));
    } catch (e) {
      console.error('Failed to save assessment attempts:', e);
    }
  }, [attempts]);

  const getProfileForSkill = useCallback((skillId: string, skillName?: string, category?: any): AssessmentProfile => {
    const cleanId = (skillId || '').trim().toLowerCase();
    const existing = profiles.find(p => p.skillId.toLowerCase() === cleanId);
    if (existing) return existing;
    return getAssessmentProfileForSkill(skillId, skillName, category);
  }, [profiles]);

  const saveAttempt = useCallback((attempt: AssessmentAttempt) => {
    setAttempts(prev => [attempt, ...prev]);
  }, []);

  const getAttemptsForSkill = useCallback((skillId: string): AssessmentAttempt[] => {
    const cleanId = (skillId || '').trim().toLowerCase();
    return attempts.filter(a => a.skillId.toLowerCase() === cleanId).sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }, [attempts]);

  const getLatestAttemptForSkill = useCallback((skillId: string): AssessmentAttempt | undefined => {
    const skillAttempts = getAttemptsForSkill(skillId);
    return skillAttempts.length > 0 ? skillAttempts[0] : undefined;
  }, [getAttemptsForSkill]);

  const updateProfile = useCallback((updatedProfile: AssessmentProfile) => {
    setProfiles(prev => {
      const idx = prev.findIndex(p => p.skillId.toLowerCase() === updatedProfile.skillId.toLowerCase());
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...updatedProfile, lastUpdated: new Date().toISOString().split('T')[0], version: (copy[idx].version || 1) + 1 };
        return copy;
      }
      return [...prev, updatedProfile];
    });
  }, []);

  const addQuestionToProfile = useCallback((skillId: string, question: QuestionItem) => {
    setProfiles(prev => {
      return prev.map(p => {
        if (p.skillId.toLowerCase() === skillId.toLowerCase()) {
          return {
            ...p,
            questions: [...p.questions, question],
            version: (p.version || 1) + 1,
            lastUpdated: new Date().toISOString().split('T')[0]
          };
        }
        return p;
      });
    });
  }, []);

  const deleteQuestionFromProfile = useCallback((skillId: string, questionId: string) => {
    setProfiles(prev => {
      return prev.map(p => {
        if (p.skillId.toLowerCase() === skillId.toLowerCase()) {
          return {
            ...p,
            questions: p.questions.filter(q => q.id !== questionId),
            version: (p.version || 1) + 1,
            lastUpdated: new Date().toISOString().split('T')[0]
          };
        }
        return p;
      });
    });
  }, []);

  const calculateAssessmentCoverage = useCallback((): AssessmentCoverageMetric => {
    let customSkillsList: any[] = [];
    try {
      const saved = localStorage.getItem('ks_custom_skills');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          customSkillsList = parsed.filter(s => s && s.id && s.name);
        }
      }
    } catch (e) {
      console.error('Failed to parse custom skills for assessment coverage:', e);
    }

    const allSkills = [...SKILLS_DB, ...customSkillsList];
    const totalSkills = allSkills.length;
    
    let skillsWithQuiz = 0;
    let skillsWithPracticalTask = 0;
    let skillsWithRubric = 0;
    let skillsWithCompleteAssessment = 0;

    const categoryStats: { [cat: string]: { total: number; complete: number; percentage: number } } = {};

    allSkills.forEach(skill => {
      const cat = skill.category || 'General';
      if (!categoryStats[cat]) {
        categoryStats[cat] = { total: 0, complete: 0, percentage: 0 };
      }
      categoryStats[cat].total += 1;

      const profile = profiles.find(p => p.skillId.toLowerCase() === skill.id.toLowerCase()) || 
                      getAssessmentProfileForSkill(skill.id, skill.name, skill.category, {
                        description: skill.description,
                        applications: skill.applications,
                        problemsSolved: skill.problemsSolved,
                        opportunities: skill.opportunities
                      });
      
      const hasQuiz = Boolean(profile && profile.questions && profile.questions.length >= 3);
      const hasTask = Boolean(profile && profile.practicalTask && profile.practicalTask.instructions);
      const hasRubric = Boolean(profile && profile.practicalTask && profile.practicalTask.rubric && profile.practicalTask.rubric.length >= 2);
      const isComplete = Boolean(hasQuiz && hasTask && hasRubric);

      if (hasQuiz) skillsWithQuiz += 1;
      if (hasTask) skillsWithPracticalTask += 1;
      if (hasRubric) skillsWithRubric += 1;
      if (isComplete) {
        skillsWithCompleteAssessment += 1;
        categoryStats[cat].complete += 1;
      }
    });

    Object.keys(categoryStats).forEach(cat => {
      const entry = categoryStats[cat];
      entry.percentage = entry.total > 0 ? Math.round((entry.complete / entry.total) * 100) : 0;
    });

    return {
      totalSkills,
      skillsWithQuiz,
      skillsWithPracticalTask,
      skillsWithRubric,
      skillsWithCompleteAssessment,
      categoryBreakdown: categoryStats
    };
  }, [profiles]);

  /**
   * G-ONE MULTI-DIMENSIONAL ASSESSMENT ANALYSER (RULES-GROUNDED)
   * Strictly derives indicative proficiency, evidence confidence, strengths, and develop-next areas
   * from actual performance records rather than generic placeholders.
   */
  const analyzeAssessmentEvidence = useCallback((...args: any[]) => {
    let skillId = '';
    let skillName = '';
    let quizAnswers: { [questionId: string]: { selectedAnswer: any; isCorrect: boolean; timeSpentSeconds?: number; questionRef?: QuestionItem } } = {};
    let practicalTaskCompleted = false;
    let rubricScores: { [criterionId: string]: number } = {};
    let maxRubricScore = 20;
    let demonstrationProvided = false;
    let selfReportedProficiencyBefore: string | undefined = undefined;
    let profile: AssessmentProfile | undefined = undefined;

    if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && !Array.isArray(args[0]) && ('quizAnswers' in args[0] || 'skillId' in args[0])) {
      const p = args[0];
      skillId = p.skillId || '';
      skillName = p.skillName || '';
      quizAnswers = p.quizAnswers || {};
      practicalTaskCompleted = Boolean(p.practicalTaskCompleted);
      rubricScores = p.rubricScores || {};
      maxRubricScore = typeof p.maxRubricScore === 'number' && p.maxRubricScore > 0 ? p.maxRubricScore : 20;
      demonstrationProvided = Boolean(p.demonstrationProvided);
      selfReportedProficiencyBefore = p.selfReportedProficiencyBefore;
      profile = p.profile;
    } else {
      // Positional invocation: (skillId, skillName, quizAnswers, rubricScores, totalRubricScore, maxRubricScore, practicalTaskCompleted, selfReportedProf)
      skillId = typeof args[0] === 'string' ? args[0] : '';
      skillName = typeof args[1] === 'string' ? args[1] : '';
      quizAnswers = (args[2] && typeof args[2] === 'object') ? args[2] : {};
      rubricScores = (args[3] && typeof args[3] === 'object') ? args[3] : {};
      maxRubricScore = typeof args[5] === 'number' && args[5] > 0 ? args[5] : 20;
      practicalTaskCompleted = Boolean(args[6]);
      selfReportedProficiencyBefore = typeof args[7] === 'string' ? args[7] : undefined;
    }

    if (!profile && skillId) {
      profile = getProfileForSkill(skillId, skillName);
    }

    const answeredQuestions = Object.values(quizAnswers || {});
    const totalQuizQuestions = answeredQuestions.length;
    const correctCount = answeredQuestions.filter(a => a && a.isCorrect).length;
    const quizPercentage = totalQuizQuestions > 0 ? Math.round((correctCount / totalQuizQuestions) * 100) : 0;

    // Difficulty breakdown
    const difficultyBreakdown: { [key in QuestionDifficulty]?: { correct: number; total: number } } = {
      Foundation: { correct: 0, total: 0 },
      Developing: { correct: 0, total: 0 },
      Intermediate: { correct: 0, total: 0 },
      Strong: { correct: 0, total: 0 },
      Advanced: { correct: 0, total: 0 }
    };

    const competencyPerformance: { [comp: string]: { correct: number; total: number; missedQuestions: string[] } } = {};

    answeredQuestions.forEach(ans => {
      if (!ans) return;
      const q = ans.questionRef;
      if (q) {
        const diff = q.difficulty || 'Developing';
        if (!difficultyBreakdown[diff]) difficultyBreakdown[diff] = { correct: 0, total: 0 };
        difficultyBreakdown[diff]!.total += 1;
        if (ans.isCorrect) difficultyBreakdown[diff]!.correct += 1;

        const comp = q.competency || 'General Understanding';
        if (!competencyPerformance[comp]) {
          competencyPerformance[comp] = { correct: 0, total: 0, missedQuestions: [] };
        }
        competencyPerformance[comp].total += 1;
        if (ans.isCorrect) {
          competencyPerformance[comp].correct += 1;
        } else {
          competencyPerformance[comp].missedQuestions.push(q.question);
        }
      }
    });

    // Rubric score
    const totalRubricScore = Object.values(rubricScores || {}).reduce((sum, val) => sum + (Number(val) || 0), 0);
    const rubricPercentage = maxRubricScore > 0 ? Math.round((totalRubricScore / maxRubricScore) * 100) : 0;

    // Combined evidence weighting
    // If practical task was completed, it counts for 40% of the overall proficiency signal, quiz 60%
    let compositeScore = quizPercentage;
    if (practicalTaskCompleted && maxRubricScore > 0) {
      compositeScore = Math.round((quizPercentage * 0.6) + (rubricPercentage * 0.4));
    }

    // Determine Indicative Proficiency
    let indicativeProficiency: IndicativeProficiency = 'Foundation';
    if (compositeScore >= 88 && (difficultyBreakdown.Strong?.correct ?? 0) >= 1) {
      indicativeProficiency = 'Advanced';
    } else if (compositeScore >= 72) {
      indicativeProficiency = 'Strong';
    } else if (compositeScore >= 55) {
      indicativeProficiency = 'Intermediate';
    } else if (compositeScore >= 35) {
      indicativeProficiency = 'Developing';
    } else {
      indicativeProficiency = 'Foundation';
    }

    // Determine Assessment Confidence / Evidence Level
    // Based purely on evidence volume & multi-dimensionality, NOT student ability
    let evidenceLevel: EvidenceLevel = 'Limited evidence';
    if (totalQuizQuestions >= 7 && practicalTaskCompleted && demonstrationProvided) {
      evidenceLevel = 'High evidence';
    } else if (totalQuizQuestions >= 4 && (practicalTaskCompleted || totalQuizQuestions >= 8)) {
      evidenceLevel = 'Moderate evidence';
    } else {
      evidenceLevel = 'Limited evidence';
    }

    // Extract Evidence-Based Strengths
    const strengths: string[] = [];
    Object.entries(competencyPerformance || {}).forEach(([comp, stats]) => {
      if (stats && stats.total >= 1 && stats.correct === stats.total) {
        strengths.push(`Solid grasp of ${comp}`);
      }
    });

    if (practicalTaskCompleted && rubricPercentage >= 75) {
      strengths.push('High practical execution and rubric fulfillment');
    }
    if ((difficultyBreakdown.Intermediate?.correct ?? 0) >= 2) {
      strengths.push('Independent intermediate application');
    }
    if (strengths.length === 0) {
      strengths.push(`Foundational familiarity with ${skillName || 'skill'} concepts`);
    }

    // Extract Evidence-Based Areas to Develop
    const areasToDevelop: { competency: string; recommendation: string; missedQuestionsCount: number }[] = [];
    Object.entries(competencyPerformance || {}).forEach(([comp, stats]) => {
      if (!stats) return;
      const missed = stats.total - stats.correct;
      if (missed > 0) {
        let recommendation = `Review foundational rules and complete 1 practical exercise in ${comp}.`;
        if (profile && profile.commonMistakes && profile.commonMistakes.length > 0) {
          recommendation = profile.commonMistakes[0].guidance;
        }
        areasToDevelop.push({
          competency: comp,
          recommendation,
          missedQuestionsCount: missed
        });
      }
    });

    if (!practicalTaskCompleted) {
      areasToDevelop.push({
        competency: 'Hands-on Demonstration',
        recommendation: 'Complete the practical task in your next session to demonstrate applied capability.',
        missedQuestionsCount: 1
      });
    }

    // Self-Assessment Comparison Analysis
    let comparisonWithSelfReport = '';
    const selfReport = selfReportedProficiencyBefore || 'Developing';
    const levelRanks: { [key: string]: number } = {
      'Foundation': 1,
      'Beginner': 1,
      'Developing': 2,
      'Intermediate': 3,
      'Strong': 4,
      'Advanced': 5,
      'Expert': 5
    };

    const selfRank = levelRanks[selfReport] || 2;
    const assessedRank = levelRanks[indicativeProficiency] || 2;

    if (selfRank > assessedRank) {
      comparisonWithSelfReport = `Your self-reported rating (${selfReport}) was more confident than the current assessment evidence (${indicativeProficiency}). We recommend targeted practice in ${areasToDevelop.slice(0, 2).map(a => a.competency).join(' and ')} before taking on complex projects.`;
    } else if (selfRank < assessedRank) {
      comparisonWithSelfReport = `Your demonstrated assessment evidence (${indicativeProficiency}) exceeded your initial self-assessment (${selfReport}). You have stronger foundational command than you estimated—consider tackling more ambitious project roadmaps.`;
    } else {
      comparisonWithSelfReport = `Your self-assessment (${selfReport}) accurately matches the demonstrated assessment evidence (${indicativeProficiency}). Your self-awareness is well calibrated.`;
    }

    // G-ONE Next Step Recommendation
    let gOneNextStepRecommendation: 'Retake' | 'Move to Advanced Task' | 'Practise Before Retaking' | 'Explore Opportunities' = 'Explore Opportunities';
    if (evidenceLevel === 'Limited evidence') {
      gOneNextStepRecommendation = 'Practise Before Retaking';
    } else if (indicativeProficiency === 'Strong' || indicativeProficiency === 'Advanced') {
      gOneNextStepRecommendation = 'Explore Opportunities';
    } else if (indicativeProficiency === 'Foundation') {
      gOneNextStepRecommendation = 'Practise Before Retaking';
    } else {
      gOneNextStepRecommendation = 'Move to Advanced Task';
    }

    // G-ONE Synthesized Insight
    const gOneFeedback = `You demonstrated ${indicativeProficiency.toLowerCase()} proficiency across ${totalQuizQuestions} conceptual scenarios and ${practicalTaskCompleted ? 'a practical task submission' : 'quiz evaluation'}. Evidence confidence is rated at ${evidenceLevel.toLowerCase()} based on submitted artifacts. Focus next on ${areasToDevelop[0]?.competency || 'advanced project applications'}.`;

    return {
      indicativeProficiency,
      evidenceLevel,
      strengths,
      areasToDevelop,
      gOneFeedback,
      gOneNextStepRecommendation,
      comparisonWithSelfReport,
      difficultyBreakdown,
      quizScore: { correct: correctCount, total: totalQuizQuestions, percentage: quizPercentage },
      totalRubricScore
    };
  }, [getProfileForSkill]);

  const clearAssessmentData = useCallback(() => {
    setAttempts([]);
    setProfiles(INITIAL_ASSESSMENT_PROFILES);
    localStorage.removeItem('ks_assessment_attempts_v1');
    localStorage.removeItem('ks_assessment_profiles_v1');
  }, []);

  return (
    <AssessmentContext.Provider value={{
      profiles,
      attempts,
      getProfileForSkill,
      saveAttempt,
      saveAssessmentAttempt: saveAttempt,
      getAttemptsForSkill,
      getLatestAttemptForSkill,
      updateProfile,
      addQuestionToProfile,
      deleteQuestionFromProfile,
      calculateAssessmentCoverage,
      analyzeAssessmentEvidence,
      clearAssessmentData
    }}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
}
