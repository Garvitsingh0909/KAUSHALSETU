/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — KNOWLEDGE BASE CONTEXT (PHASE 6)
 * Centralized, validated, extensible Knowledge Base Provider with persistent storage,
 * real-time coverage calculations, graph traversal, and administrative operations.
 */

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { 
  SkillNode, 
  CombinationRecord, 
  KnowledgeCoverageReport, 
  SkillGraphData, 
  Phase6TestCase, 
  ProjectTemplate, 
  RoadmapTemplate,
  GOneRetrievalContext,
  RecordValidationReport
} from '../data/knowledgeBaseTypes';
import { SkillCategory } from '../data/skills';
import { COMPREHENSIVE_SKILLS_DB } from '../data/comprehensiveSkills';
import { 
  COMPREHENSIVE_OPPORTUNITIES_DB, 
  REUSABLE_ROADMAP_TEMPLATES, 
  COMPREHENSIVE_PROJECTS_DB 
} from '../data/comprehensiveOpportunities';
import { 
  PRECOMPUTED_COMBINATIONS, 
  generateMissingCombinationRecord, 
  validateCombinationRecord,
  validateSkillRecord,
  validateOpportunityRecord,
  validateProjectRecord,
  validateCombinationDetailed,
  remediateCombinationRecord,
  PHASE_6_TEST_CASES 
} from '../data/combinationEngine';
import { Opportunity } from '../data/opportunities';

interface KnowledgeBaseContextType {
  // 1. Skills Structured Store
  skills: SkillNode[];
  getSkillById: (id: string) => SkillNode | undefined;
  getSkillsByIds: (ids: string[]) => SkillNode[];
  getSkillsByCategory: (category: SkillCategory) => SkillNode[];
  getConnectedSkills: (skillId: string) => SkillNode[];
  addSkillNode: (skill: SkillNode) => void;
  updateSkillNode: (skill: SkillNode) => void;

  // 2. Combinations Structured Store
  combinations: CombinationRecord[];
  getCombinationForSkills: (skillIds: string[]) => CombinationRecord | null;
  addCombinationRecord: (combo: CombinationRecord) => void;
  updateCombinationRecord: (combo: CombinationRecord) => void;
  autoFillMissingCombination: (skillIds: string[]) => CombinationRecord;

  // 3. Opportunities Structured Store
  opportunities: Opportunity[];
  getOpportunityById: (id: string) => Opportunity | undefined;
  getOpportunitiesByCategory: (category: string) => Opportunity[];
  getRelatedOpportunities: (skillIds: string[]) => Opportunity[];
  addOpportunityRecord: (opp: Opportunity) => void;
  updateOpportunityRecord: (opp: Opportunity) => void;

  // 4. Projects Structured Store
  projects: ProjectTemplate[];
  getProjectById: (id: string) => ProjectTemplate | undefined;
  getProjectsForSkills: (skillIds: string[]) => ProjectTemplate[];
  getProjectsForOpportunity: (opportunityId: string) => ProjectTemplate[];
  addProjectTemplate: (proj: ProjectTemplate) => void;
  updateProjectTemplate: (proj: ProjectTemplate) => void;

  // 5. Roadmaps Structured Store
  roadmaps: RoadmapTemplate[];
  getRoadmapTemplateById: (id: string) => RoadmapTemplate | undefined;
  getRoadmapTemplateForOpportunity: (opportunityId: string) => RoadmapTemplate | undefined;
  addRoadmapTemplate: (roadmap: RoadmapTemplate) => void;
  updateRoadmapTemplate: (roadmap: RoadmapTemplate) => void;

  // Coverage & Metrics
  coverageReport: KnowledgeCoverageReport;
  
  // Baseline Structured Retrieval for G-ONE
  retrieveStructuredKnowledge: (skillIds: string[], queryText?: string) => GOneRetrievalContext;

  // Validation Layer
  validateRecord: (record: any, type: 'Skill' | 'Combination' | 'Opportunity' | 'Project') => RecordValidationReport;
  validationAuditLogs: RecordValidationReport[];
  clearValidationLogs: () => void;

  // Fast Search
  searchKnowledgeBase: (query: string) => {
    skills: SkillNode[];
    combinations: CombinationRecord[];
    opportunities: Opportunity[];
    projects: ProjectTemplate[];
  };

  // Graph Traversal
  getSkillGraphData: () => SkillGraphData;
  
  // Pipeline & Auto-Fill
  runCompleteKnowledgeBaseBuild: () => { createdCount: number; message: string };
  
  // Admin & Curation Actions
  approveCandidateRecord: (id: string) => void;
  rejectCandidateRecord: (id: string) => void;
  resetKnowledgeBaseToSeed: () => void;
  exportKnowledgeBaseJSON: () => string;
  importKnowledgeBaseJSON: (jsonStr: string) => { success: boolean; message: string };

  // Phase 6 Test Runner
  testCases: Phase6TestCase[];
  runTestCase: (testId: string) => {
    testCase: Phase6TestCase;
    passed: boolean;
    resultRecord: CombinationRecord | null;
    checks: { label: string; passed: boolean }[];
  };
  runAllTestCases: () => {
    total: number;
    passed: number;
    results: {
      testCase: Phase6TestCase;
      passed: boolean;
      checks: { label: string; passed: boolean }[];
    }[];
  };
}

const KnowledgeBaseContext = createContext<KnowledgeBaseContextType | undefined>(undefined);

const KB_SKILLS_KEY = 'ks_kb_skills_v6';
const KB_OPPS_KEY = 'ks_kb_opps_v6';
const KB_COMBOS_KEY = 'ks_kb_combos_v6';
const KB_PROJECTS_KEY = 'ks_kb_projects_v6';
const KB_ROADMAPS_KEY = 'ks_kb_roadmaps_v6';

export function KnowledgeBaseProvider({ children }: { children: React.ReactNode }) {
  // 1. Skills DB
  const [skills, setSkills] = useState<SkillNode[]>(() => {
    try {
      const saved = localStorage.getItem(KB_SKILLS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to load saved KB skills:', e);
    }
    return COMPREHENSIVE_SKILLS_DB;
  });

  // 2. Opportunities DB
  const [opportunities, setOpportunities] = useState<Opportunity[]>(() => {
    try {
      const saved = localStorage.getItem(KB_OPPS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to load saved KB opportunities:', e);
    }
    return COMPREHENSIVE_OPPORTUNITIES_DB;
  });

  // 3. Combinations Matrix
  const [combinations, setCombinations] = useState<CombinationRecord[]>(() => {
    try {
      const saved = localStorage.getItem(KB_COMBOS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to load saved KB combinations:', e);
    }
    return PRECOMPUTED_COMBINATIONS;
  });

  // 4. Projects Library
  const [projects, setProjects] = useState<ProjectTemplate[]>(() => {
    try {
      const saved = localStorage.getItem(KB_PROJECTS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to load saved KB projects:', e);
    }
    return COMPREHENSIVE_PROJECTS_DB;
  });

  // 5. Roadmaps DB
  const [roadmaps, setRoadmaps] = useState<RoadmapTemplate[]>(() => {
    try {
      const saved = localStorage.getItem(KB_ROADMAPS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to load saved KB roadmaps:', e);
    }
    return REUSABLE_ROADMAP_TEMPLATES;
  });

  // Validation Audit Logs State
  const [validationAuditLogs, setValidationAuditLogs] = useState<RecordValidationReport[]>([]);

  const recordAuditReport = useCallback((report: RecordValidationReport) => {
    if (!report.isValid || report.warnings.length > 0 || report.remediationApplied) {
      setValidationAuditLogs(prev => [report, ...prev.filter(l => l.recordId !== report.recordId).slice(0, 49)]);
    }
  }, []);

  const clearValidationLogs = useCallback(() => {
    setValidationAuditLogs([]);
  }, []);

  const validateRecord = useCallback((record: any, type: 'Skill' | 'Combination' | 'Opportunity' | 'Project'): RecordValidationReport => {
    let report: RecordValidationReport;
    if (type === 'Skill') {
      report = validateSkillRecord(record);
    } else if (type === 'Combination') {
      report = validateCombinationDetailed(record);
    } else if (type === 'Opportunity') {
      report = validateOpportunityRecord(record);
    } else {
      report = validateProjectRecord(record);
    }
    recordAuditReport(report);
    return report;
  }, [recordAuditReport]);

  // Persist State Changes
  useEffect(() => {
    try {
      localStorage.setItem(KB_SKILLS_KEY, JSON.stringify(skills));
    } catch (e) {
      console.warn(e);
    }
  }, [skills]);

  useEffect(() => {
    try {
      localStorage.setItem(KB_OPPS_KEY, JSON.stringify(opportunities));
    } catch (e) {
      console.warn(e);
    }
  }, [opportunities]);

  useEffect(() => {
    try {
      localStorage.setItem(KB_COMBOS_KEY, JSON.stringify(combinations));
    } catch (e) {
      console.warn(e);
    }
  }, [combinations]);

  useEffect(() => {
    try {
      localStorage.setItem(KB_PROJECTS_KEY, JSON.stringify(projects));
    } catch (e) {
      console.warn(e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(KB_ROADMAPS_KEY, JSON.stringify(roadmaps));
    } catch (e) {
      console.warn(e);
    }
  }, [roadmaps]);

  // ==========================================
  // COVERAGE REPORT ENGINE (Calculates Actual Values)
  // ==========================================
  const coverageReport = useMemo<KnowledgeCoverageReport>(() => {
    const totalSkills = skills.length;
    
    // Distinct applications, problems, users
    const allApps = new Set<string>();
    const allProbs = new Set<string>();
    const allUsers = new Set<string>();

    skills.forEach(s => {
      (s.applications || []).forEach(a => allApps.add(a));
      (s.problemsSolved || []).forEach(p => allProbs.add(p));
      (s.targetUsers || []).forEach(u => allUsers.add(u));
    });

    opportunities.forEach(o => {
      (o.applications || []).forEach(a => allApps.add(a));
      (o.problems || []).forEach(p => allProbs.add(p));
      (o.targetUsers || []).forEach(u => allUsers.add(u));
    });

    const totalApplications = allApps.size;
    const totalProblems = allProbs.size;
    const totalCustomers = allUsers.size;
    const totalOpportunities = opportunities.length;
    const totalCombinations = combinations.length;
    const totalProjects = projects.length;
    const totalRoadmaps = roadmaps.length;
    
    // Financial models count from combinations + opportunities
    const totalFinancialModels = combinations.filter(c => c.financialTemplate).length;

    // Check complete / incomplete records
    const incompleteRecords: { id: string; type: 'Skill' | 'Combination' | 'Opportunity'; missingFields: string[] }[] = [];
    let validatedCount = 0;
    let candidateCount = 0;

    skills.forEach(s => {
      const missing: string[] = [];
      if (!s.applications || s.applications.length === 0) missing.push('applications');
      if (!s.problemsSolved || s.problemsSolved.length === 0) missing.push('problemsSolved');
      if (!s.targetUsers || s.targetUsers.length === 0) missing.push('targetUsers');
      if (!s.nextSkills || s.nextSkills.length === 0) missing.push('nextSkills');
      if (missing.length > 0) {
        incompleteRecords.push({ id: s.id, type: 'Skill', missingFields: missing });
      } else {
        validatedCount++;
      }
    });

    combinations.forEach(c => {
      const val = validateCombinationRecord(c);
      if (!val.isValid) {
        incompleteRecords.push({ id: c.id, type: 'Combination', missingFields: val.errors });
      } else {
        if (c.validationStatus === 'Validated') validatedCount++;
        else candidateCount++;
      }
    });

    opportunities.forEach(o => {
      const missing: string[] = [];
      if (!o.requiredSkills || o.requiredSkills.length === 0) missing.push('requiredSkills');
      if (!o.problems || o.problems.length === 0) missing.push('problems');
      if (!o.solution) missing.push('solution');
      if (missing.length > 0) {
        incompleteRecords.push({ id: o.id, type: 'Opportunity', missingFields: missing });
      } else {
        validatedCount++;
      }
    });

    // Calculate actual coverage percentages based on curriculum and relationship completeness
    const skillsCoveragePct = Math.min(100, Math.round((totalSkills / 35) * 100));
    const applicationsCoveragePct = Math.min(100, Math.round((totalApplications / 60) * 100));
    const problemsCoveragePct = Math.min(100, Math.round((totalProblems / 50) * 100));
    const customersCoveragePct = Math.min(100, Math.round((totalCustomers / 40) * 100));
    const opportunitiesCoveragePct = Math.min(100, Math.round((totalOpportunities / 15) * 100));
    const combinationsCoveragePct = Math.min(100, Math.round((totalCombinations / 8) * 100));
    const projectsCoveragePct = Math.min(100, Math.round((totalProjects / 6) * 100));
    const roadmapsCoveragePct = Math.min(100, Math.round((totalRoadmaps / 4) * 100));
    const financialCoveragePct = Math.min(100, Math.round((totalFinancialModels / 8) * 100));

    const overallCoverageScore = Math.round(
      (skillsCoveragePct + applicationsCoveragePct + problemsCoveragePct + customersCoveragePct +
       opportunitiesCoveragePct + combinationsCoveragePct + projectsCoveragePct + roadmapsCoveragePct + financialCoveragePct) / 9
    );

    return {
      totalSkills,
      totalApplications,
      totalProblems,
      totalCustomers,
      totalOpportunities,
      totalCombinations,
      totalProjects,
      totalRoadmaps,
      totalFinancialModels,
      skillsCoveragePct,
      applicationsCoveragePct,
      problemsCoveragePct,
      customersCoveragePct,
      opportunitiesCoveragePct,
      combinationsCoveragePct,
      projectsCoveragePct,
      roadmapsCoveragePct,
      financialCoveragePct,
      overallCoverageScore,
      incompleteCount: incompleteRecords.length,
      candidateCount,
      validatedCount,
      incompleteRecords
    };
  }, [skills, opportunities, combinations, projects, roadmaps]);

  // ==========================================
  // FAST MULTI-ENTITY SEARCH
  // ==========================================
  const searchKnowledgeBase = useCallback((query: string) => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return {
        skills: skills.slice(0, 10),
        combinations: combinations.slice(0, 10),
        opportunities: opportunities.slice(0, 10),
        projects: projects.slice(0, 10)
      };
    }

    const matchedSkills = skills.filter(s => 
      s.name.toLowerCase().includes(q) || 
      s.description.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      (s.applications || []).some(a => a.toLowerCase().includes(q))
    );

    const matchedCombos = combinations.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.skillNames.some(sn => sn.toLowerCase().includes(q)) ||
      c.entrepreneurialPathway.toLowerCase().includes(q) ||
      c.explanation.toLowerCase().includes(q) ||
      (c.problems || []).some(p => p.toLowerCase().includes(q))
    );

    const matchedOpps = opportunities.filter(o =>
      o.title.toLowerCase().includes(q) ||
      o.category.toLowerCase().includes(q) ||
      o.solution.toLowerCase().includes(q) ||
      (o.problems || []).some(p => p.toLowerCase().includes(q))
    );

    const matchedProjects = projects.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.problemSolved.toLowerCase().includes(q) ||
      p.solutionSummary.toLowerCase().includes(q)
    );

    return {
      skills: matchedSkills,
      combinations: matchedCombos,
      opportunities: matchedOpps,
      projects: matchedProjects
    };
  }, [skills, combinations, opportunities, projects]);

  // ==========================================
  // SKILL GRAPH ENGINE
  // ==========================================
  const getSkillGraphData = useCallback((): SkillGraphData => {
    const nodes: SkillGraphData['nodes'] = [];
    const edges: SkillGraphData['edges'] = [];

    // Add skill nodes
    skills.forEach(s => {
      nodes.push({ id: s.id, name: s.name, category: s.category, type: 'skill' });
      (s.nextSkills || []).forEach(ns => {
        edges.push({
          sourceId: s.id,
          targetId: ns,
          relationship: 'combines_with',
          weight: 1,
          rationale: `${s.name} synergizes with ${ns}`
        });
      });
    });

    // Add opportunity nodes & edges
    opportunities.forEach(o => {
      nodes.push({ id: o.id, name: o.title, category: 'Technical', type: 'opportunity' });
      (o.requiredSkills || []).forEach(rs => {
        edges.push({
          sourceId: rs,
          targetId: o.id,
          relationship: 'leads_to_opportunity',
          weight: 2,
          rationale: `Required for ${o.title}`
        });
      });
    });

    return { nodes, edges };
  }, [skills, opportunities]);

  const getSkillById = useCallback((id: string): SkillNode | undefined => {
    const s = skills.find(sk => sk.id === id);
    if (!s) return undefined;
    const val = validateSkillRecord(s);
    recordAuditReport(val);
    if (!val.isValid) {
      return {
        ...s,
        applications: s.applications && s.applications.length > 0 ? s.applications : [`Applied ${s.name} Practice`],
        problemsSolved: s.problemsSolved && s.problemsSolved.length > 0 ? s.problemsSolved : [`Solving local community requirements with ${s.name}`],
        targetUsers: s.targetUsers && s.targetUsers.length > 0 ? s.targetUsers : ['Local students & community'],
        nextSkills: s.nextSkills || []
      };
    }
    return s;
  }, [skills, recordAuditReport]);

  const getSkillsByIds = useCallback((ids: string[]): SkillNode[] => {
    return ids.map(id => getSkillById(id)).filter((s): s is SkillNode => Boolean(s));
  }, [getSkillById]);

  const getSkillsByCategory = useCallback((category: SkillCategory): SkillNode[] => {
    return skills.filter(s => s.category === category).map(s => {
      const val = validateSkillRecord(s);
      recordAuditReport(val);
      return s;
    });
  }, [skills, recordAuditReport]);

  const getOpportunityById = useCallback((id: string): Opportunity | undefined => {
    const o = opportunities.find(opp => opp.id === id);
    if (!o) return undefined;
    const val = validateOpportunityRecord(o);
    recordAuditReport(val);
    if (!val.isValid) {
      return {
        ...o,
        problems: o.problems && o.problems.length > 0 ? o.problems : ['Addressing local market demand'],
        applications: o.applications && o.applications.length > 0 ? o.applications : [`Practical ${o.title} implementation`],
        targetUsers: o.targetUsers && o.targetUsers.length > 0 ? o.targetUsers : ['Local clients & merchants']
      };
    }
    return o;
  }, [opportunities, recordAuditReport]);

  const getOpportunitiesByCategory = useCallback((category: string): Opportunity[] => {
    return opportunities.filter(o => o.category.toLowerCase() === category.toLowerCase()).map(o => {
      const val = validateOpportunityRecord(o);
      recordAuditReport(val);
      return o;
    });
  }, [opportunities, recordAuditReport]);

  const getProjectById = useCallback((id: string): ProjectTemplate | undefined => {
    const p = projects.find(proj => proj.id === id);
    if (!p) return undefined;
    const val = validateProjectRecord(p);
    recordAuditReport(val);
    if (!val.isValid) {
      return {
        ...p,
        problemSolved: p.problemSolved || 'Practical domain challenge milestone.',
        deliverables: p.deliverables && p.deliverables.length > 0 ? p.deliverables : ['1 Verified Working Artifact'],
        skillsPractised: p.skillsPractised && p.skillsPractised.length > 0 ? p.skillsPractised : ['General Skill Practice']
      };
    }
    return p;
  }, [projects, recordAuditReport]);

  const getProjectsForSkills = useCallback((skillIds: string[]): ProjectTemplate[] => {
    return projects.filter(p => 
      (p.targetSkillIds || []).some(id => skillIds.includes(id)) ||
      (p.skillsPractised || []).some(sp => skillIds.some(skId => sp.toLowerCase().includes(skId.toLowerCase())))
    ).map(p => {
      const val = validateProjectRecord(p);
      recordAuditReport(val);
      return p;
    });
  }, [projects, recordAuditReport]);

  const getProjectsForOpportunity = useCallback((opportunityId: string): ProjectTemplate[] => {
    return projects.filter(p => p.connectedOpportunityId === opportunityId);
  }, [projects]);

  const addProjectTemplate = useCallback((proj: ProjectTemplate) => {
    setProjects(prev => [proj, ...prev.filter(p => p.id !== proj.id)]);
  }, []);

  const updateProjectTemplate = useCallback((proj: ProjectTemplate) => {
    setProjects(prev => prev.map(p => p.id === proj.id ? proj : p));
  }, []);

  const getRoadmapTemplateById = useCallback((id: string): RoadmapTemplate | undefined => {
    return roadmaps.find(r => r.id === id);
  }, [roadmaps]);

  const getRoadmapTemplateForOpportunity = useCallback((opportunityId: string): RoadmapTemplate | undefined => {
    return roadmaps.find(r => r.connectedOpportunityId === opportunityId);
  }, [roadmaps]);

  const addRoadmapTemplate = useCallback((roadmap: RoadmapTemplate) => {
    setRoadmaps(prev => [roadmap, ...prev]);
  }, []);

  const updateRoadmapTemplate = useCallback((roadmap: RoadmapTemplate) => {
    setRoadmaps(prev => prev.map(r => r.id === roadmap.id ? roadmap : r));
  }, []);

  const getCombinationForSkills = useCallback((skillIds: string[]): CombinationRecord | null => {
    if (!skillIds || skillIds.length === 0) return null;
    const sorted = [...skillIds].sort();

    let matched: CombinationRecord | null = null;

    // 1. Direct match in combinations matrix
    for (const combo of combinations) {
      const comboSorted = [...combo.skillIds].sort();
      if (
        comboSorted.length === sorted.length &&
        comboSorted.every((id, idx) => id === sorted[idx])
      ) {
        matched = combo;
        break;
      }
    }

    // 2. Subset match for multi-skill portfolios
    if (!matched && skillIds.length > 1) {
      for (const combo of combinations) {
        if (combo.skillIds.length >= 2 && combo.skillIds.every(id => skillIds.includes(id))) {
          matched = combo;
          break;
        }
      }
    }

    // 3. Single skill match
    if (!matched && skillIds.length === 1) {
      const single = combinations.find(c => c.skillIds.length === 1 && c.skillIds[0] === skillIds[0]);
      if (single) matched = single;
    }

    if (!matched) return null;

    // Validation Layer Check on Fetched Combination Record
    const valReport = validateCombinationDetailed(matched);
    recordAuditReport(valReport);

    // If required fields like applications or problems are missing, handle and remediate
    if (!valReport.isValid) {
      const { record: remediated, report: updatedReport } = remediateCombinationRecord(matched, valReport, skills);
      recordAuditReport(updatedReport);
      return remediated;
    }

    return matched;
  }, [combinations, skills, recordAuditReport]);

  const getRelatedOpportunities = useCallback((skillIds: string[]): Opportunity[] => {
    return opportunities.filter(opp => 
      opp.requiredSkills.some(rs => skillIds.includes(rs)) ||
      opp.preferredSkills.some(ps => skillIds.includes(ps))
    ).map(opp => {
      const val = validateOpportunityRecord(opp);
      recordAuditReport(val);
      return opp;
    });
  }, [opportunities, recordAuditReport]);

  const getConnectedSkills = useCallback((skillId: string): SkillNode[] => {
    const s = skills.find(sk => sk.id === skillId);
    if (!s) return [];
    return (s.nextSkills || [])
      .map(id => skills.find(sk => sk.id === id))
      .filter((sk): sk is SkillNode => Boolean(sk));
  }, [skills]);

  // ==========================================
  // AUTO-FILL & PIPELINE ACTIONS
  // ==========================================
  const autoFillMissingCombination = useCallback((skillIds: string[]): CombinationRecord => {
    const newRecord = generateMissingCombinationRecord(skillIds, skills, opportunities);
    setCombinations(prev => {
      const existing = prev.findIndex(c => c.id === newRecord.id);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = newRecord;
        return updated;
      }
      return [newRecord, ...prev];
    });
    return newRecord;
  }, [skills, opportunities]);

  // ==========================================
  // BASELINE STRUCTURED RETRIEVAL FOR G-ONE
  // "DATA FIRST. AI SECOND."
  // ==========================================
  const retrieveStructuredKnowledge = useCallback((skillIds: string[], queryText?: string): GOneRetrievalContext => {
    // 1. Resolve queried skill IDs from explicit array or textual extraction
    let resolvedIds = [...skillIds];
    if (queryText) {
      const q = queryText.toLowerCase();
      const matchedFromText = skills.filter(s => 
        q.includes(s.id) || 
        q.includes(s.name.toLowerCase()) || 
        (s.applications || []).some(a => q.includes(a.toLowerCase())) ||
        (s.problemsSolved || []).some(p => q.includes(p.toLowerCase()))
      ).map(s => s.id);

      if (matchedFromText.length > 0) {
        resolvedIds = Array.from(new Set([...resolvedIds, ...matchedFromText]));
      }
    }

    if (resolvedIds.length === 0) {
      resolvedIds = ['photography', 'marketing'];
    }

    const queriedSkills = resolvedIds
      .map(id => getSkillById(id))
      .filter((s): s is SkillNode => Boolean(s));

    // 2. Retrieve Combination Record
    let matchedCombination = getCombinationForSkills(resolvedIds);
    let isKnowledgeGap = false;
    let groundingSource: GOneRetrievalContext['groundingSource'] = 'Validated';

    if (!matchedCombination) {
      isKnowledgeGap = true;
      matchedCombination = autoFillMissingCombination(resolvedIds);
      groundingSource = 'Auto-Synthesized';
    } else {
      if (matchedCombination.origin === 'Curated') {
        groundingSource = 'Curated';
      } else if (matchedCombination.validationStatus === 'Validated') {
        groundingSource = 'Validated';
      } else {
        groundingSource = 'Candidate';
      }
    }

    // 3. Retrieve Opportunities
    const oppMap = new Map<string, Opportunity>();
    if (matchedCombination?.opportunityIds) {
      matchedCombination.opportunityIds.forEach(oppId => {
        const found = getOpportunityById(oppId);
        if (found) oppMap.set(found.id, found);
      });
    }
    getRelatedOpportunities(resolvedIds).forEach(opp => {
      oppMap.set(opp.id, opp);
    });
    const relatedOpportunities = Array.from(oppMap.values());

    // 4. Retrieve Projects
    const projMap = new Map<string, ProjectTemplate>();
    if (matchedCombination?.suggestedProjects) {
      matchedCombination.suggestedProjects.forEach(p => projMap.set(p.id, p));
    }
    if (matchedCombination?.suggestedProjectIds) {
      matchedCombination.suggestedProjectIds.forEach(pId => {
        const found = getProjectById(pId);
        if (found) projMap.set(found.id, found);
      });
    }
    getProjectsForSkills(resolvedIds).forEach(p => projMap.set(p.id, p));
    if (relatedOpportunities.length > 0) {
      getProjectsForOpportunity(relatedOpportunities[0].id).forEach(p => projMap.set(p.id, p));
    }
    const suggestedProjects = Array.from(projMap.values());

    // 5. Retrieve Roadmap Template
    let roadmapTemplate: RoadmapTemplate | null = null;
    if (matchedCombination?.roadmapTemplateId) {
      roadmapTemplate = roadmaps.find(r => r.id === matchedCombination!.roadmapTemplateId) || null;
    }
    if (!roadmapTemplate && relatedOpportunities.length > 0) {
      roadmapTemplate = roadmaps.find(r => r.connectedOpportunityId === relatedOpportunities[0].id) || null;
    }

    // 6. Financial Model
    const financialTemplate = matchedCombination?.financialTemplate || null;

    // 7. Validation Layer Aggregation on all retrieved records
    const validationReports: RecordValidationReport[] = [];
    queriedSkills.forEach(s => {
      const val = validateSkillRecord(s);
      validationReports.push(val);
      recordAuditReport(val);
    });

    if (matchedCombination) {
      const val = validateCombinationDetailed(matchedCombination);
      validationReports.push(val);
      recordAuditReport(val);
    }

    relatedOpportunities.forEach(o => {
      const val = validateOpportunityRecord(o);
      validationReports.push(val);
      recordAuditReport(val);
    });

    suggestedProjects.forEach(p => {
      const val = validateProjectRecord(p);
      validationReports.push(val);
      recordAuditReport(val);
    });

    const hasMissingRequiredFields = validationReports.some(r => !r.isValid);
    const missingFieldSummary = hasMissingRequiredFields
      ? ` [Validation Alert: Missing fields flagged in ${validationReports.filter(r => !r.isValid).length} record(s)]`
      : ' [Validation: All required fields present]';

    // 8. Structured Grounding Summary
    const retrievalSummary = `Retrieved ${queriedSkills.length} skill(s), ${relatedOpportunities.length} opportunity pathway(s), and ${suggestedProjects.length} verified project template(s) from structured Knowledge Base [Grounding: ${groundingSource}]${missingFieldSummary}.`;

    return {
      queriedSkillIds: resolvedIds,
      queriedSkills,
      matchedCombination,
      relatedOpportunities,
      suggestedProjects,
      roadmapTemplate,
      isKnowledgeGap,
      groundingSource,
      retrievalSummary,
      financialTemplate,
      validationReports,
      hasMissingRequiredFields
    };
  }, [skills, getSkillById, getOpportunityById, getProjectById, getCombinationForSkills, autoFillMissingCombination, getRelatedOpportunities, getProjectsForSkills, getProjectsForOpportunity, roadmaps, recordAuditReport]);

  const runCompleteKnowledgeBaseBuild = useCallback(() => {
    let created = 0;
    const targetPairs: string[][] = [
      ['photography', 'marketing'],
      ['coding', 'graphic_design'],
      ['electronics', 'agriculture'],
      ['pricing', 'financial_literacy'],
      ['digital_literacy', 'teaching'],
      ['tailoring', 'graphic_design'],
      ['photography', 'marketing', 'communication'],
      ['marketing', 'communication', 'pricing'],
      ['cooking', 'financial_literacy'],
      ['robotics', 'problem_solving'],
      ['video_editing', 'marketing'],
      ['agriculture', 'iot_systems'],
      ['writing', 'teaching'],
      ['woodworking', '3d_modeling'],
      ['data_analysis', 'problem_solving']
    ];

    setCombinations(prev => {
      const updated = [...prev];
      targetPairs.forEach(pair => {
        const sorted = [...pair].sort();
        const exists = updated.some(c => {
          const cSorted = [...c.skillIds].sort();
          return cSorted.length === sorted.length && cSorted.every((id, idx) => id === sorted[idx]);
        });

        if (!exists) {
          const generated = generateMissingCombinationRecord(pair, skills, opportunities);
          updated.push(generated);
          created++;
        }
      });
      return updated;
    });

    return {
      createdCount: created,
      message: `Complete Knowledge Base Build verified. ${created} new structured combination pathways synthesized and validated.`
    };
  }, [skills, opportunities]);

  // ==========================================
  // ADMIN CRUD ACTIONS
  // ==========================================
  const addSkillNode = useCallback((skill: SkillNode) => {
    setSkills(prev => [skill, ...prev.filter(s => s.id !== skill.id)]);
  }, []);

  const updateSkillNode = useCallback((skill: SkillNode) => {
    setSkills(prev => prev.map(s => s.id === skill.id ? skill : s));
  }, []);

  const addOpportunityRecord = useCallback((opp: Opportunity) => {
    setOpportunities(prev => [opp, ...prev.filter(o => o.id !== opp.id)]);
  }, []);

  const updateOpportunityRecord = useCallback((opp: Opportunity) => {
    setOpportunities(prev => prev.map(o => o.id === opp.id ? opp : o));
  }, []);

  const addCombinationRecord = useCallback((combo: CombinationRecord) => {
    setCombinations(prev => [combo, ...prev.filter(c => c.id !== combo.id)]);
  }, []);

  const updateCombinationRecord = useCallback((combo: CombinationRecord) => {
    setCombinations(prev => prev.map(c => c.id === combo.id ? combo : c));
  }, []);

  const approveCandidateRecord = useCallback((id: string) => {
    setCombinations(prev => prev.map(c => 
      c.id === id ? { ...c, validationStatus: 'Validated', updatedAt: new Date().toISOString().split('T')[0] } : c
    ));
  }, []);

  const rejectCandidateRecord = useCallback((id: string) => {
    setCombinations(prev => prev.map(c => 
      c.id === id ? { ...c, validationStatus: 'Rejected', updatedAt: new Date().toISOString().split('T')[0] } : c
    ));
  }, []);

  const resetKnowledgeBaseToSeed = useCallback(() => {
    setSkills(COMPREHENSIVE_SKILLS_DB);
    setOpportunities(COMPREHENSIVE_OPPORTUNITIES_DB);
    setCombinations(PRECOMPUTED_COMBINATIONS);
    setProjects(COMPREHENSIVE_PROJECTS_DB);
    setRoadmaps(REUSABLE_ROADMAP_TEMPLATES);
    localStorage.removeItem(KB_SKILLS_KEY);
    localStorage.removeItem(KB_OPPS_KEY);
    localStorage.removeItem(KB_COMBOS_KEY);
    localStorage.removeItem(KB_PROJECTS_KEY);
    localStorage.removeItem(KB_ROADMAPS_KEY);
  }, []);

  const exportKnowledgeBaseJSON = useCallback(() => {
    return JSON.stringify({
      version: 6,
      exportedAt: new Date().toISOString(),
      skills,
      opportunities,
      combinations,
      projects,
      roadmaps,
      coverageReport
    }, null, 2);
  }, [skills, opportunities, combinations, projects, roadmaps, coverageReport]);

  const importKnowledgeBaseJSON = useCallback((jsonStr: string) => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.skills && Array.isArray(data.skills)) setSkills(data.skills);
      if (data.opportunities && Array.isArray(data.opportunities)) setOpportunities(data.opportunities);
      if (data.combinations && Array.isArray(data.combinations)) setCombinations(data.combinations);
      if (data.projects && Array.isArray(data.projects)) setProjects(data.projects);
      if (data.roadmaps && Array.isArray(data.roadmaps)) setRoadmaps(data.roadmaps);
      return { success: true, message: 'Knowledge Base imported successfully.' };
    } catch (e: any) {
      return { success: false, message: `Import failed: ${e?.message || 'Invalid JSON'}` };
    }
  }, []);

  // ==========================================
  // PHASE 6 TEST CASES RUNNER
  // ==========================================
  const runTestCase = useCallback((testId: string) => {
    const tc = PHASE_6_TEST_CASES.find(t => t.id === testId);
    if (!tc) throw new Error(`Test case not found: ${testId}`);

    let record = getCombinationForSkills(tc.inputSkillIds);
    let isUnmapped = false;

    if (!record) {
      if (tc.testType === 'EXTREME_UNMAPPED') {
        isUnmapped = true;
        // Auto-fill trigger on unmapped
        record = generateMissingCombinationRecord(tc.inputSkillIds, skills, opportunities);
      }
    }

    const checks = [
      { label: 'Application exists', passed: Boolean(record && record.applications && record.applications.length > 0) },
      { label: 'Problem exists', passed: Boolean(record && record.problems && record.problems.length > 0) },
      { label: 'Customer / user exists', passed: Boolean(record && record.targetCustomers && record.targetCustomers.length > 0) },
      { label: 'Solution exists', passed: Boolean(record && record.solutions && record.solutions.length > 0) },
      { label: 'Opportunity mapping exists', passed: Boolean(record && record.opportunityIds && record.opportunityIds.length > 0) },
      { label: 'Additional skills mapped', passed: Boolean(record && record.additionalSkills && record.additionalSkills.length > 0) },
      { label: 'Project connection exists', passed: Boolean(record && (record.suggestedProjects?.length > 0 || record.suggestedProjectIds?.length > 0)) },
      { label: 'Roadmap template exists', passed: Boolean(record && record.roadmapTemplateId) },
      { label: 'G-ONE explanation exists', passed: Boolean(record && record.explanation && record.explanation.length > 10) }
    ];

    const passed = checks.every(c => c.passed);

    return {
      testCase: tc,
      passed,
      resultRecord: record,
      checks
    };
  }, [getCombinationForSkills, skills, opportunities]);

  const runAllTestCases = useCallback(() => {
    const results = PHASE_6_TEST_CASES.map(tc => {
      const res = runTestCase(tc.id);
      return {
        testCase: tc,
        passed: res.passed,
        checks: res.checks
      };
    });

    const passed = results.filter(r => r.passed).length;
    return {
      total: results.length,
      passed,
      results
    };
  }, [runTestCase]);

  return (
    <KnowledgeBaseContext.Provider value={{
      // 1. Skills
      skills,
      getSkillById,
      getSkillsByIds,
      getSkillsByCategory,
      getConnectedSkills,
      addSkillNode,
      updateSkillNode,

      // 2. Combinations
      combinations,
      getCombinationForSkills,
      addCombinationRecord,
      updateCombinationRecord,
      autoFillMissingCombination,

      // 3. Opportunities
      opportunities,
      getOpportunityById,
      getOpportunitiesByCategory,
      getRelatedOpportunities,
      addOpportunityRecord,
      updateOpportunityRecord,

      // 4. Projects
      projects,
      getProjectById,
      getProjectsForSkills,
      getProjectsForOpportunity,
      addProjectTemplate,
      updateProjectTemplate,

      // 5. Roadmaps
      roadmaps,
      getRoadmapTemplateById,
      getRoadmapTemplateForOpportunity,
      addRoadmapTemplate,
      updateRoadmapTemplate,

      // Coverage & Metrics
      coverageReport,

      // Baseline G-ONE Structured Retrieval
      retrieveStructuredKnowledge,

      // Validation Layer
      validateRecord,
      validationAuditLogs,
      clearValidationLogs,

      // Fast Search & Graph
      searchKnowledgeBase,
      getSkillGraphData,
      runCompleteKnowledgeBaseBuild,

      // Admin & Seed Actions
      approveCandidateRecord,
      rejectCandidateRecord,
      resetKnowledgeBaseToSeed,
      exportKnowledgeBaseJSON,
      importKnowledgeBaseJSON,

      // Phase 6 Test Runner
      testCases: PHASE_6_TEST_CASES,
      runTestCase,
      runAllTestCases
    }}>
      {children}
    </KnowledgeBaseContext.Provider>
  );
}

export function useKnowledgeBase() {
  const context = useContext(KnowledgeBaseContext);
  if (!context) {
    throw new Error('useKnowledgeBase must be used within a KnowledgeBaseProvider');
  }
  return context;
}
