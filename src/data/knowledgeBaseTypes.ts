/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — PHASE 6 KNOWLEDGE BASE TYPES
 * Structured Knowledge Base, Combination Matrix, Graph Entities, and Metadata
 */

import { SkillCategory, Proficiency } from './skills';

export type RecordOrigin = 'Curated' | 'System Generated' | 'User Provided' | 'Illustrative';
export type ValidationState = 'Validated' | 'Candidate' | 'Incomplete' | 'Rejected';
export type CombinationTier = 'Tier 1' | 'Tier 2' | 'Tier 3' | 'Tier 4';

export interface BaseRecordMetadata {
  id: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  origin: RecordOrigin;
  validationStatus: ValidationState;
  validationNotes?: string[];
  relevanceScore?: number; // 0 - 100
}

export interface SkillNode extends BaseRecordMetadata {
  name: string;
  category: SkillCategory;
  description: string;
  applications: string[];
  problemsSolved: string[];
  targetUsers: string[];
  opportunities: string[];
  nextSkills: string[];
  projectIdeas: string[];
  roadmapTemplateId?: string;
  cbseCurriculumRef?: string;
}

export interface FinancialAssumptionTemplate {
  templateName: string;
  origin: RecordOrigin;
  startupCosts: { item: string; amount: number; isEssential: boolean }[];
  fixedMonthlyOverhead: { item: string; amount: number }[];
  variableCostPerUnit: number;
  suggestedPriceRange: { min: number; recommended: number; max: number };
  typicalCustomerVolume: number;
  estimatedBreakEvenUnits: number;
  unitDefinition: string; // e.g., "project", "session", "unit package", "service hour"
  financialGuidanceNote: string;
}

export interface ProjectTemplate {
  id: string;
  name: string;
  tier: CombinationTier;
  targetSkillIds: string[];
  problemSolved: string;
  solutionSummary: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  deliverables: string[];
  skillsPractised: string[];
  connectedOpportunityId?: string;
  suggestedDuration: string;
}

export interface RoadmapStepTemplate {
  phaseId: 'foundation' | 'practice' | 'portfolio' | 'communication' | 'test' | 'reflect';
  title: string;
  action: string;
  purpose: string;
  expectedOutput: string;
  suggestedDurationDays: number;
}

export interface RoadmapTemplate {
  id: string;
  title: string;
  pathwayType: 'freelance' | 'service' | 'product' | 'community' | 'tech_venture';
  targetSkillIds: string[];
  connectedOpportunityId?: string;
  steps: RoadmapStepTemplate[];
  origin: RecordOrigin;
}

export interface CombinationRecord extends BaseRecordMetadata {
  tier: CombinationTier;
  skillIds: string[];
  skillNames: string[];
  title: string;
  category: string;
  applications: string[];
  problems: string[];
  targetCustomers: string[];
  solutions: string[];
  opportunityIds: string[];
  opportunityTitles: string[];
  additionalSkills: string[];
  suggestedProjectIds: string[];
  suggestedProjects: ProjectTemplate[];
  entrepreneurialPathway: string;
  financialTemplate: FinancialAssumptionTemplate;
  roadmapTemplateId: string;
  explanation: string;
  crossDomainTag?: string;
}

export interface KnowledgeCoverageReport {
  totalSkills: number;
  totalApplications: number;
  totalProblems: number;
  totalCustomers: number;
  totalOpportunities: number;
  totalCombinations: number;
  totalProjects: number;
  totalRoadmaps: number;
  totalFinancialModels: number;
  
  skillsCoveragePct: number;
  applicationsCoveragePct: number;
  problemsCoveragePct: number;
  customersCoveragePct: number;
  opportunitiesCoveragePct: number;
  combinationsCoveragePct: number;
  projectsCoveragePct: number;
  roadmapsCoveragePct: number;
  financialCoveragePct: number;
  overallCoverageScore: number;
  
  incompleteCount: number;
  candidateCount: number;
  validatedCount: number;
  incompleteRecords: {
    id: string;
    type: 'Skill' | 'Combination' | 'Opportunity';
    missingFields: string[];
  }[];
}

export interface GraphEdge {
  sourceId: string;
  targetId: string;
  relationship: 'combines_with' | 'solves_problem' | 'serves_user' | 'leads_to_opportunity' | 'requires_skill' | 'practices_project';
  weight: number;
  rationale: string;
}

export interface SkillGraphData {
  nodes: { id: string; name: string; category: SkillCategory; type: 'skill' | 'opportunity' | 'application' | 'problem' | 'user' }[];
  edges: GraphEdge[];
}

export interface RecordValidationReport {
  isValid: boolean;
  recordId: string;
  recordType: 'Combination' | 'Skill' | 'Opportunity' | 'Project' | 'Roadmap';
  missingFields: string[];
  warnings: string[];
  remediationApplied: boolean;
  remediationNotes?: string[];
}

export interface GOneRetrievalContext {
  queriedSkillIds: string[];
  queriedSkills: SkillNode[];
  matchedCombination: CombinationRecord | null;
  relatedOpportunities: any[]; // Opportunity[]
  suggestedProjects: ProjectTemplate[];
  roadmapTemplate: RoadmapTemplate | null;
  isKnowledgeGap: boolean;
  groundingSource: 'Curated' | 'Validated' | 'Candidate' | 'Auto-Synthesized' | 'Unmapped';
  retrievalSummary: string;
  financialTemplate: FinancialAssumptionTemplate | null;
  validationReports?: RecordValidationReport[];
  hasMissingRequiredFields?: boolean;
}

export interface Phase6TestCase {
  id: string;
  name: string;
  testType: 'SINGLE_SKILL' | 'TWO_SKILLS' | 'THREE_SKILLS' | 'TECHNICAL' | 'VOCATIONAL' | 'ENTREPRENEURIAL' | 'CROSS_DOMAIN' | 'EXTREME_UNMAPPED';
  inputSkillIds: string[];
  inputSkillNames: string[];
  expectedResult: {
    combinationExists: boolean;
    hasApplications: boolean;
    hasProblems: boolean;
    hasCustomers: boolean;
    hasSolutions: boolean;
    hasOpportunities: boolean;
    hasAdditionalSkills: boolean;
    hasProjects: boolean;
    hasRoadmap: boolean;
    hasGoneExplanation: boolean;
    isUnmappedGap?: boolean;
  };
}
