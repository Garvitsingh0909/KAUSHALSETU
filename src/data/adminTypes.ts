/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — PHASE 6 ADMIN TYPES & INTERFACES
 * Complete administration data contracts for users, knowledge graph entities,
 * G-ONE controls, assessments, research, analytics, exhibition, and activity logs.
 */

import { SkillCategory } from './skills';
import { CombinationTier, RecordOrigin, ValidationState } from './knowledgeBaseTypes';

export type UserSystemRole = 'student' | 'admin' | 'super_admin' | 'content_admin' | 'research_admin' | 'teacher';
export type AccountStatus = 'active' | 'pending' | 'suspended' | 'disabled';

export interface AdminUserRecord {
  id: string;
  name: string;
  email: string;
  systemRole: UserSystemRole;
  displayRole: string;
  accountStatus: AccountStatus;
  schoolOrOrg: string;
  createdDate: string;
  lastLogin: string;
  permissions: string[];
  skillsCount: number;
  assessmentsCount: number;
  opportunitiesCount: number;
  businessModelsCount: number;
  projectsCompletedCount: number;
  roadmapProgressPct: number;
  gOneInteractionsCount: number;
  skillsList?: string[];
}

export interface ApplicationItem {
  id: string;
  name: string;
  category: string;
  skillIds: string[];
  skillNames: string[];
  description: string;
  relatedProblemIds: string[];
  targetUserTypes: string[];
  relatedOpportunityIds: string[];
  validationStatus: ValidationState;
  updatedAt: string;
}

export interface ProblemItem {
  id: string;
  title: string;
  domain: string;
  description: string;
  relatedSkillIds: string[];
  relatedApplicationIds: string[];
  targetUserTypes: string[];
  possibleSolutions: string[];
  opportunityIds: string[];
  validationStatus: ValidationState;
  updatedAt: string;
}

export interface CustomerTypeItem {
  id: string;
  title: string;
  category: 'Local Retail' | 'School & Youth' | 'Agriculture & Environment' | 'Civic Community' | 'Enterprise & Service' | 'Digital & Creator';
  description: string;
  typicalPainPoints: string[];
  purchasingPower: 'Micro (<₹1k)' | 'Low (₹1k-₹5k)' | 'Medium (₹5k-₹25k)' | 'Institution/B2B';
  matchedOpportunitiesCount: number;
  linkedOpportunityIds: string[];
}

export interface KnowledgeGapQueueItem {
  id: string;
  skillAId: string;
  skillAName: string;
  skillBId: string;
  skillBName: string;
  missingElement: 'Opportunity Mapping' | 'Problem Definition' | 'Practical Project' | 'Financial Model' | 'Roadmap Pathway';
  status: 'Needs Review' | 'Candidate Generated' | 'Approved' | 'Rejected' | 'Draft';
  generatedCandidate?: {
    title: string;
    description: string;
    applications: string[];
    problems: string[];
    suggestedOpportunity: string;
    projectIdea: string;
  };
  detectedAt: string;
  resolvedAt?: string;
  reviewerNotes?: string;
}

export interface QuestionReviewItem {
  id: string;
  questionId: string;
  skillId: string;
  skillName: string;
  difficulty: 'Foundation' | 'Developing' | 'Intermediate' | 'Strong' | 'Advanced';
  competency: string;
  questionPrompt: string;
  suggestedAnswer: string;
  explanation: string;
  status: 'Pending Review' | 'Approved' | 'Needs Revision' | 'Rejected';
  generatedBy: 'G-ONE Engine' | 'Curriculum Author' | 'Dynamic Synthesis';
  timestamp: string;
  reviewerNotes?: string;
}

export interface BusinessTemplateItem {
  id: string;
  title: string;
  businessType: 'Freelance Service' | 'Product Venture' | 'Digital Platform' | 'Local Community Service' | 'Educational Hub' | 'Sustainable AgriTech';
  description: string;
  targetCustomerType: string;
  revenueModel: string;
  typicalPriceRange: { min: number; recommended: number; max: number };
  sampleFixedCosts: { item: string; monthlyCost: number }[];
  sampleVariableCosts: { item: string; costPerUnit: number }[];
  breakEvenGuidance: string;
  validationStatus: ValidationState;
  updatedAt: string;
}

export interface FinancialModelTemplateItem {
  id: string;
  name: string;
  modelType: 'Illustrative Scenario' | 'User-Entered Assumption';
  fixedCostCategories: string[];
  variableCostCategories: string[];
  formulaSummary: string;
  breakEvenFormula: string;
  defaultPricePerUnit: number;
  defaultFixedCostTotal: number;
  defaultVariableCostPerUnit: number;
  guidanceDisclaimer: string;
  lastUpdated: string;
}

export interface SurveyResponseItem {
  id: string;
  round: 'Baseline' | 'Post-Use' | 'Follow-Up';
  respondentType: 'Student' | 'Parent' | 'Teacher' | 'Expert';
  respondentName?: string;
  schoolName: string;
  submittedAt: string;
  ratings: {
    skillClarity: number; // 1-5
    vocationalConfidence: number; // 1-5
    financialLiteracyUnderstanding: number; // 1-5
    perceivedValue: number; // 1-5
  };
  unawareOfSkillApplicationsBefore: boolean;
  seekingMicroEnterprisePathway: boolean;
  strugglesWithPricingEconomics: boolean;
  qualitativeFeedback: string;
}

export interface ExpertInterviewRecord {
  id: string;
  expertName: string;
  organization: string;
  designation: string;
  interviewDate: string;
  topic: string;
  keyInsights: string[];
  cbseAlignmentNotes: string;
  validationDecision: 'Strongly Aligned' | 'Aligned with Recommendations' | 'Needs Iteration';
}

export interface ResearchRoundConfig {
  id: string;
  name: 'Baseline' | 'Post-Use' | 'Follow-Up';
  status: 'Active' | 'Completed' | 'Upcoming';
  targetAudience: string;
  startDate: string;
  endDate?: string;
  responsesTarget: number;
  responsesCollected: number;
}

export interface AdminActivityLogItem {
  id: string;
  adminName: string;
  action: string;
  targetCategory: 'Skill' | 'Combination' | 'Opportunity' | 'Assessment' | 'G-ONE' | 'User' | 'Research' | 'Exhibition' | 'System';
  targetId?: string;
  targetLabel: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface DemoExhibitionConfig {
  activeDemoProfileId: string;
  studentName: string;
  schoolName: string;
  selectedSkills: { skillId: string; proficiency: string }[];
  targetOpportunityId: string;
  targetOpportunityTitle: string;
  activeScenarioName: string;
  unitPrice: number;
  customerVolume: number;
  monthlyRevenue: number;
  roadmapStage: string;
  presentationMode: boolean;
  minimalMode: boolean;
  visibleModules: {
    skills: boolean;
    assessment: boolean;
    opportunities: boolean;
    businessBuilder: boolean;
    roadmap: boolean;
    projects: boolean;
    goneInsights: boolean;
  };
  isDemoDataSet: boolean;
}
