/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — MODULE 2: SKILL ASSESSMENT & PROFICIENCY ENGINE TYPES (PHASE 5B)
 * Multi-dimensional evaluation: Knowledge Quiz + Practical Task + Demonstration + Self-Reflection
 */

export type IndicativeProficiency = 'Foundation' | 'Developing' | 'Intermediate' | 'Strong' | 'Advanced';

export type EvidenceLevel = 'High evidence' | 'Moderate evidence' | 'Limited evidence';

export type QuestionDifficulty = 'Foundation' | 'Developing' | 'Intermediate' | 'Strong' | 'Advanced';

export type QuestionType = 
  | 'multiple_choice' 
  | 'multi_select' 
  | 'true_false' 
  | 'scenario' 
  | 'ordering' 
  | 'short_answer' 
  | 'practical_response';

export type AssessmentLengthMode = 'quick' | 'standard' | 'deep';

export interface QuestionItem {
  id: string;
  skillId: string;
  difficulty: QuestionDifficulty;
  type: QuestionType;
  competency: string;
  question: string;
  options?: string[];
  correctAnswer: string | string[] | number[] | boolean;
  explanation: string;
  codeSnippet?: string;
  scenarioContext?: string;
  hint?: string;
  validationStatus: 'Validated' | 'PendingReview' | 'Draft';
  version: number;
}

export interface TaskRubricCriterion {
  id: string;
  name: string;
  maxPoints: number; // e.g. 5
  description: string;
  levelDescriptors: { [points: number]: string };
}

export interface PracticalTask {
  id: string;
  skillId: string;
  title: string;
  instructions: string;
  starterTemplate?: string;
  expectedOutput: string;
  rubric: TaskRubricCriterion[];
  totalRubricPoints: number;
  demonstrationOptions: ('text' | 'link' | 'image' | 'audio_video' | 'file')[];
  timeEstimateMinutes: number;
  sampleSolutionDescription?: string;
}

export interface AssessmentProfile {
  skillId: string;
  skillName: string;
  category: 'Technical' | 'Creative' | 'Communication' | 'Practical' | 'Entrepreneurial';
  version: number;
  questions: QuestionItem[];
  practicalTask: PracticalTask;
  commonMistakes: { mistake: string; guidance: string }[];
  recommendedNextSkills: string[];
  recommendedProjects: string[];
  published: boolean;
  lastUpdated: string;
}

export interface AssessmentAttempt {
  id: string;
  attemptNumber: number;
  studentId?: string;
  skillId: string;
  skillName: string;
  timestamp: string;
  durationSeconds: number;
  lengthMode: AssessmentLengthMode;
  quizAnswers: {
    [questionId: string]: {
      selectedAnswer: any;
      isCorrect: boolean;
      timeSpentSeconds?: number;
      questionRef?: QuestionItem;
    };
  };
  quizScore: {
    correct: number;
    total: number;
    percentage: number;
  };
  difficultyBreakdown: {
    [key in QuestionDifficulty]?: { correct: number; total: number };
  };
  practicalTaskCompleted: boolean;
  practicalResponse?: {
    text?: string;
    link?: string;
    fileUrl?: string;
    fileName?: string;
    selfReflectionNotes?: string;
  };
  rubricScores: { [criterionId: string]: number };
  totalRubricScore: number;
  maxRubricScore: number;
  selfReportedProficiencyBefore?: string;
  selfReportedConfidenceScore?: number; // 1-5 scale
  selfReportedExperienceYears?: string;
  indicativeProficiency: IndicativeProficiency;
  evidenceLevel: EvidenceLevel;
  strengths: string[];
  areasToDevelop: { competency: string; recommendation: string; missedQuestionsCount: number }[];
  gOneFeedback: string;
  gOneNextStepRecommendation: 'Retake' | 'Move to Advanced Task' | 'Practise Before Retaking' | 'Explore Opportunities';
  comparisonWithSelfReport?: string;
  isAssessmentSupported: boolean;
  assessmentVersion: number;
}

export interface AssessmentCoverageMetric {
  totalSkills: number;
  skillsWithQuiz: number;
  skillsWithPracticalTask: number;
  skillsWithRubric: number;
  skillsWithCompleteAssessment: number;
  categoryBreakdown: {
    [category: string]: {
      total: number;
      complete: number;
      percentage: number;
    };
  };
}
