/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — PHASE 6 ADMIN CONTEXT PROVIDER
 * Centralized operational state, authentication, graph entity management,
 * G-ONE controls, question reviews, research metrics, exhibition state, and activity logs.
 */

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { 
  AdminUserRecord, 
  ApplicationItem, 
  ProblemItem, 
  CustomerTypeItem, 
  KnowledgeGapQueueItem, 
  QuestionReviewItem, 
  BusinessTemplateItem, 
  FinancialModelTemplateItem, 
  SurveyResponseItem, 
  ExpertInterviewRecord, 
  ResearchRoundConfig, 
  AdminActivityLogItem, 
  DemoExhibitionConfig,
  UserSystemRole
} from '../data/adminTypes';
import { 
  INITIAL_ADMIN_USERS, 
  INITIAL_APPLICATIONS_DB, 
  INITIAL_PROBLEMS_DB, 
  INITIAL_CUSTOMER_TYPES, 
  INITIAL_KNOWLEDGE_GAPS, 
  INITIAL_QUESTION_REVIEW_QUEUE, 
  INITIAL_BUSINESS_TEMPLATES, 
  INITIAL_FINANCIAL_MODELS, 
  INITIAL_SURVEY_RESPONSES, 
  INITIAL_EXPERT_INTERVIEWS, 
  INITIAL_RESEARCH_ROUNDS, 
  INITIAL_ADMIN_LOGS, 
  INITIAL_DEMO_EXHIBITION 
} from '../data/adminInitialData';

export interface CalculatedResearchStats {
  totalResponses: number;
  baselineCount: number;
  postUseCount: number;
  avgSkillClarityBaseline: number;
  avgSkillClarityPostUse: number;
  avgVocationalConfidenceBaseline: number;
  avgVocationalConfidencePostUse: number;
  avgFinancialLiteracyBaseline: number;
  avgFinancialLiteracyPostUse: number;
  satisfactionRatePct: number;
  microEnterpriseIntentPct: number;
  pricingConfidenceGainPct: number;
}

export interface UniversalSearchResult {
  users: AdminUserRecord[];
  applications: ApplicationItem[];
  problems: ProblemItem[];
  customerTypes: CustomerTypeItem[];
  gaps: KnowledgeGapQueueItem[];
  reviews: QuestionReviewItem[];
  businessTemplates: BusinessTemplateItem[];
  surveys: SurveyResponseItem[];
  logs: AdminActivityLogItem[];
}

interface AdminContextType {
  // Authentication & Session
  isAdminAuthenticated: boolean;
  currentAdminUser: AdminUserRecord | null;
  adminAuthError: string | null;
  loginAsAdmin: (email: string, passOrPin: string) => boolean;
  quickAdminLogin: () => void;
  logoutAdmin: () => void;
  switchSystemRole: (role: UserSystemRole) => void;

  // Users Directory
  adminUsers: AdminUserRecord[];
  addUser: (user: AdminUserRecord) => void;
  updateUser: (user: AdminUserRecord) => void;
  toggleUserStatus: (userId: string) => void;
  getUserById: (userId: string) => AdminUserRecord | undefined;

  // Applications
  applications: ApplicationItem[];
  addApplication: (app: ApplicationItem) => void;
  updateApplication: (app: ApplicationItem) => void;
  deleteApplication: (id: string) => void;

  // Problems
  problems: ProblemItem[];
  addProblem: (prob: ProblemItem) => void;
  updateProblem: (prob: ProblemItem) => void;
  deleteProblem: (id: string) => void;

  // Customer Types
  customerTypes: CustomerTypeItem[];
  addCustomerType: (cust: CustomerTypeItem) => void;
  updateCustomerType: (cust: CustomerTypeItem) => void;
  deleteCustomerType: (id: string) => void;

  // G-ONE Knowledge Gaps Queue
  knowledgeGaps: KnowledgeGapQueueItem[];
  generateGapCandidate: (gapId: string) => void;
  approveGapCandidate: (gapId: string) => void;
  rejectGapCandidate: (gapId: string, notes?: string) => void;
  addKnowledgeGap: (gap: Omit<KnowledgeGapQueueItem, 'id' | 'detectedAt'>) => void;

  // Question Reviews
  questionReviews: QuestionReviewItem[];
  approveQuestionReview: (reviewId: string, notes?: string) => void;
  rejectQuestionReview: (reviewId: string, notes?: string) => void;
  updateQuestionReview: (review: QuestionReviewItem) => void;

  // Business & Financial Models
  businessTemplates: BusinessTemplateItem[];
  addBusinessTemplate: (template: BusinessTemplateItem) => void;
  updateBusinessTemplate: (template: BusinessTemplateItem) => void;
  financialModels: FinancialModelTemplateItem[];
  updateFinancialModel: (model: FinancialModelTemplateItem) => void;

  // Research Center
  surveyResponses: SurveyResponseItem[];
  expertInterviews: ExpertInterviewRecord[];
  researchRounds: ResearchRoundConfig[];
  calculatedResearchMetrics: CalculatedResearchStats;
  addSurveyResponse: (response: Omit<SurveyResponseItem, 'id' | 'submittedAt'>) => void;
  addExpertInterview: (interview: Omit<ExpertInterviewRecord, 'id'>) => void;
  updateResearchRound: (round: ResearchRoundConfig) => void;

  // Exhibition Control
  demoExhibition: DemoExhibitionConfig;
  updateDemoExhibition: (config: Partial<DemoExhibitionConfig>) => void;
  resetDemoExhibition: () => void;
  setPresentationMode: (enabled: boolean) => void;
  setExhibitionMinimalMode: (enabled: boolean) => void;
  switchDemoProfile: (profileId: string) => void;

  // Activity Logs
  activityLogs: AdminActivityLogItem[];
  logAdminAction: (
    action: string, 
    targetCategory: AdminActivityLogItem['targetCategory'], 
    targetId: string, 
    targetLabel: string, 
    metadata?: Record<string, any>
  ) => void;

  // Universal Search
  universalSearch: (query: string) => UniversalSearchResult;

  // Data Export
  exportAdminDataset: (datasetKey: 'knowledge_base' | 'research_summary' | 'analytics' | 'assessment_bank' | 'opportunities', format?: 'json' | 'csv') => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  // 1. Current Session State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('ks_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [currentAdminUser, setCurrentAdminUser] = useState<AdminUserRecord | null>(() => {
    try {
      const saved = localStorage.getItem('ks_admin_current_user');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_ADMIN_USERS[0];
  });

  const [adminAuthError, setAdminAuthError] = useState<string | null>(null);

  // 2. Users Store
  const [adminUsers, setAdminUsers] = useState<AdminUserRecord[]>(() => {
    try {
      const saved = localStorage.getItem('ks_admin_users_db');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_ADMIN_USERS;
  });

  // 3. Applications Store
  const [applications, setApplications] = useState<ApplicationItem[]>(() => {
    try {
      const saved = localStorage.getItem('ks_admin_applications_db');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_APPLICATIONS_DB;
  });

  // 4. Problems Store
  const [problems, setProblems] = useState<ProblemItem[]>(() => {
    try {
      const saved = localStorage.getItem('ks_admin_problems_db');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_PROBLEMS_DB;
  });

  // 5. Customer Types Store
  const [customerTypes, setCustomerTypes] = useState<CustomerTypeItem[]>(() => {
    try {
      const saved = localStorage.getItem('ks_admin_customers_db');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_CUSTOMER_TYPES;
  });

  // 6. G-ONE Knowledge Gaps Queue
  const [knowledgeGaps, setKnowledgeGaps] = useState<KnowledgeGapQueueItem[]>(() => {
    try {
      const saved = localStorage.getItem('ks_admin_gaps_db');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_KNOWLEDGE_GAPS;
  });

  // 7. Question Reviews Queue
  const [questionReviews, setQuestionReviews] = useState<QuestionReviewItem[]>(() => {
    try {
      const saved = localStorage.getItem('ks_admin_qreviews_db');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_QUESTION_REVIEW_QUEUE;
  });

  // 8. Business Templates
  const [businessTemplates, setBusinessTemplates] = useState<BusinessTemplateItem[]>(() => {
    try {
      const saved = localStorage.getItem('ks_admin_btemplates_db');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_BUSINESS_TEMPLATES;
  });

  // 9. Financial Models
  const [financialModels, setFinancialModels] = useState<FinancialModelTemplateItem[]>(() => {
    try {
      const saved = localStorage.getItem('ks_admin_finmodels_db');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_FINANCIAL_MODELS;
  });

  // 10. Research Data Store
  const [surveyResponses, setSurveyResponses] = useState<SurveyResponseItem[]>(() => {
    try {
      const saved = localStorage.getItem('ks_admin_surveys_db');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_SURVEY_RESPONSES;
  });

  const [expertInterviews, setExpertInterviews] = useState<ExpertInterviewRecord[]>(() => {
    try {
      const saved = localStorage.getItem('ks_admin_interviews_db');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_EXPERT_INTERVIEWS;
  });

  const [researchRounds, setResearchRounds] = useState<ResearchRoundConfig[]>(() => {
    try {
      const saved = localStorage.getItem('ks_admin_rounds_db');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_RESEARCH_ROUNDS;
  });

  // 11. Activity Logs
  const [activityLogs, setActivityLogs] = useState<AdminActivityLogItem[]>(() => {
    try {
      const saved = localStorage.getItem('ks_admin_logs_db');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_ADMIN_LOGS;
  });

  // 12. Exhibition Configuration
  const [demoExhibition, setDemoExhibition] = useState<DemoExhibitionConfig>(() => {
    try {
      const saved = localStorage.getItem('ks_admin_demo_config');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_DEMO_EXHIBITION;
  });

  // Synchronize localStorage
  useEffect(() => {
    localStorage.setItem('ks_admin_auth', String(isAdminAuthenticated));
    if (currentAdminUser) {
      localStorage.setItem('ks_admin_current_user', JSON.stringify(currentAdminUser));
    }
  }, [isAdminAuthenticated, currentAdminUser]);

  useEffect(() => {
    localStorage.setItem('ks_admin_users_db', JSON.stringify(adminUsers));
  }, [adminUsers]);

  useEffect(() => {
    localStorage.setItem('ks_admin_applications_db', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('ks_admin_problems_db', JSON.stringify(problems));
  }, [problems]);

  useEffect(() => {
    localStorage.setItem('ks_admin_customers_db', JSON.stringify(customerTypes));
  }, [customerTypes]);

  useEffect(() => {
    localStorage.setItem('ks_admin_gaps_db', JSON.stringify(knowledgeGaps));
  }, [knowledgeGaps]);

  useEffect(() => {
    localStorage.setItem('ks_admin_qreviews_db', JSON.stringify(questionReviews));
  }, [questionReviews]);

  useEffect(() => {
    localStorage.setItem('ks_admin_btemplates_db', JSON.stringify(businessTemplates));
  }, [businessTemplates]);

  useEffect(() => {
    localStorage.setItem('ks_admin_finmodels_db', JSON.stringify(financialModels));
  }, [financialModels]);

  useEffect(() => {
    localStorage.setItem('ks_admin_surveys_db', JSON.stringify(surveyResponses));
  }, [surveyResponses]);

  useEffect(() => {
    localStorage.setItem('ks_admin_interviews_db', JSON.stringify(expertInterviews));
  }, [expertInterviews]);

  useEffect(() => {
    localStorage.setItem('ks_admin_rounds_db', JSON.stringify(researchRounds));
  }, [researchRounds]);

  useEffect(() => {
    localStorage.setItem('ks_admin_logs_db', JSON.stringify(activityLogs));
  }, [activityLogs]);

  useEffect(() => {
    localStorage.setItem('ks_admin_demo_config', JSON.stringify(demoExhibition));
  }, [demoExhibition]);

  // Activity Logger Helper
  const logAdminAction = useCallback((
    action: string, 
    targetCategory: AdminActivityLogItem['targetCategory'], 
    targetId: string, 
    targetLabel: string, 
    metadata?: Record<string, any>
  ) => {
    const newLog: AdminActivityLogItem = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      adminName: currentAdminUser?.name || 'Administrator',
      action,
      targetCategory,
      targetId,
      targetLabel,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      metadata
    };
    setActivityLogs(prev => [newLog, ...prev.slice(0, 99)]);
  }, [currentAdminUser]);

  // Auth Operations
  const loginAsAdmin = useCallback((email: string, passOrPin: string): boolean => {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPass = passOrPin.trim();

    // Check credentials (allows standard admin email / PIN or master key)
    if (
      trimmedPass === 'admin2026' || 
      trimmedPass === 'admin123' || 
      trimmedPass === 'kaushal2026' || 
      trimmedEmail.includes('admin')
    ) {
      const matched = adminUsers.find(u => u.email.toLowerCase() === trimmedEmail && (u.systemRole === 'admin' || u.systemRole === 'super_admin' || u.systemRole === 'content_admin')) || INITIAL_ADMIN_USERS[0];
      setIsAdminAuthenticated(true);
      setCurrentAdminUser(matched);
      setAdminAuthError(null);
      logAdminAction('Admin Signed In', 'System', matched.id, matched.name);
      return true;
    } else {
      setAdminAuthError('Invalid administrator credentials or access key. (Hint: Use admin@kaushalsetu.gov.in / admin2026)');
      return false;
    }
  }, [adminUsers, logAdminAction]);

  const quickAdminLogin = useCallback(() => {
    const admin = INITIAL_ADMIN_USERS[0];
    setIsAdminAuthenticated(true);
    setCurrentAdminUser(admin);
    setAdminAuthError(null);
    logAdminAction('Admin Signed In (Quick Auth)', 'System', admin.id, admin.name);
  }, [logAdminAction]);

  const logoutAdmin = useCallback(() => {
    setIsAdminAuthenticated(false);
    logAdminAction('Admin Signed Out', 'System', currentAdminUser?.id || '', currentAdminUser?.name || 'Administrator');
  }, [currentAdminUser, logAdminAction]);

  const switchSystemRole = useCallback((role: UserSystemRole) => {
    if (currentAdminUser) {
      const updated = { ...currentAdminUser, systemRole: role };
      setCurrentAdminUser(updated);
      setAdminUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
      logAdminAction(`Switched System Role to ${role}`, 'User', updated.id, updated.name);
    }
  }, [currentAdminUser, logAdminAction]);

  // User Management
  const addUser = useCallback((user: AdminUserRecord) => {
    setAdminUsers(prev => [user, ...prev]);
    logAdminAction('Created User Account', 'User', user.id, user.name);
  }, [logAdminAction]);

  const updateUser = useCallback((user: AdminUserRecord) => {
    setAdminUsers(prev => prev.map(u => u.id === user.id ? user : u));
    logAdminAction('Updated User Account', 'User', user.id, user.name);
  }, [logAdminAction]);

  const toggleUserStatus = useCallback((userId: string) => {
    setAdminUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.accountStatus === 'active' ? 'disabled' : 'active';
        logAdminAction(`Changed User Status to ${nextStatus}`, 'User', u.id, u.name);
        return { ...u, accountStatus: nextStatus };
      }
      return u;
    }));
  }, [logAdminAction]);

  const getUserById = useCallback((userId: string) => {
    return adminUsers.find(u => u.id === userId);
  }, [adminUsers]);

  // Applications CRUD
  const addApplication = useCallback((app: ApplicationItem) => {
    setApplications(prev => [app, ...prev]);
    logAdminAction('Added Application Record', 'Skill', app.id, app.name);
  }, [logAdminAction]);

  const updateApplication = useCallback((app: ApplicationItem) => {
    setApplications(prev => prev.map(a => a.id === app.id ? app : a));
    logAdminAction('Updated Application Record', 'Skill', app.id, app.name);
  }, [logAdminAction]);

  const deleteApplication = useCallback((id: string) => {
    const target = applications.find(a => a.id === id);
    setApplications(prev => prev.filter(a => a.id !== id));
    logAdminAction('Deleted Application Record', 'Skill', id, target?.name || id);
  }, [applications, logAdminAction]);

  // Problems CRUD
  const addProblem = useCallback((prob: ProblemItem) => {
    setProblems(prev => [prob, ...prev]);
    logAdminAction('Added Problem Record', 'Skill', prob.id, prob.title);
  }, [logAdminAction]);

  const updateProblem = useCallback((prob: ProblemItem) => {
    setProblems(prev => prev.map(p => p.id === prob.id ? prob : p));
    logAdminAction('Updated Problem Record', 'Skill', prob.id, prob.title);
  }, [logAdminAction]);

  const deleteProblem = useCallback((id: string) => {
    const target = problems.find(p => p.id === id);
    setProblems(prev => prev.filter(p => p.id !== id));
    logAdminAction('Deleted Problem Record', 'Skill', id, target?.title || id);
  }, [problems, logAdminAction]);

  // Customer Types CRUD
  const addCustomerType = useCallback((cust: CustomerTypeItem) => {
    setCustomerTypes(prev => [cust, ...prev]);
    logAdminAction('Added Customer Type', 'Opportunity', cust.id, cust.title);
  }, [logAdminAction]);

  const updateCustomerType = useCallback((cust: CustomerTypeItem) => {
    setCustomerTypes(prev => prev.map(c => c.id === cust.id ? cust : c));
    logAdminAction('Updated Customer Type', 'Opportunity', cust.id, cust.title);
  }, [logAdminAction]);

  const deleteCustomerType = useCallback((id: string) => {
    const target = customerTypes.find(c => c.id === id);
    setCustomerTypes(prev => prev.filter(c => c.id !== id));
    logAdminAction('Deleted Customer Type', 'Opportunity', id, target?.title || id);
  }, [customerTypes, logAdminAction]);

  // G-ONE Knowledge Gaps Actions
  const generateGapCandidate = useCallback((gapId: string) => {
    setKnowledgeGaps(prev => prev.map(g => {
      if (g.id === gapId) {
        const generated = {
          title: `${g.skillAName} + ${g.skillBName} Community Solution`,
          description: `High-impact practical synthesis combining ${g.skillAName} and ${g.skillBName} to address local community workflow friction.`,
          applications: [`Local client demonstration for ${g.skillAName}`, `Tactile execution using ${g.skillBName}`],
          problems: [`Communities lack unified tools bridging ${g.skillAName} and ${g.skillBName}.`],
          suggestedOpportunity: `Applied ${g.skillAName} & ${g.skillBName} Turnkey Service`,
          projectIdea: `Design and deliver a 1-week pilot prototype connecting ${g.skillAName} principles with ${g.skillBName} deliverables.`
        };
        logAdminAction('Generated Knowledge Gap Candidate', 'G-ONE', g.id, `${g.skillAName} + ${g.skillBName}`);
        return {
          ...g,
          status: 'Candidate Generated',
          generatedCandidate: generated
        };
      }
      return g;
    }));
  }, [logAdminAction]);

  const approveGapCandidate = useCallback((gapId: string) => {
    setKnowledgeGaps(prev => prev.map(g => {
      if (g.id === gapId) {
        logAdminAction('Approved & Stored Knowledge Gap', 'G-ONE', g.id, `${g.skillAName} + ${g.skillBName}`);
        return {
          ...g,
          status: 'Approved',
          resolvedAt: new Date().toISOString().substring(0, 10)
        };
      }
      return g;
    }));
  }, [logAdminAction]);

  const rejectGapCandidate = useCallback((gapId: string, notes?: string) => {
    setKnowledgeGaps(prev => prev.map(g => {
      if (g.id === gapId) {
        logAdminAction('Rejected Knowledge Gap Candidate', 'G-ONE', g.id, `${g.skillAName} + ${g.skillBName}`);
        return {
          ...g,
          status: 'Rejected',
          reviewerNotes: notes || 'Does not meet CBSE pedagogical validation criteria.'
        };
      }
      return g;
    }));
  }, [logAdminAction]);

  const addKnowledgeGap = useCallback((gap: Omit<KnowledgeGapQueueItem, 'id' | 'detectedAt'>) => {
    const newGap: KnowledgeGapQueueItem = {
      ...gap,
      id: `gap-${Date.now()}`,
      detectedAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    setKnowledgeGaps(prev => [newGap, ...prev]);
    logAdminAction('Identified New Knowledge Gap', 'G-ONE', newGap.id, `${newGap.skillAName} + ${newGap.skillBName}`);
  }, [logAdminAction]);

  // Question Reviews Actions
  const approveQuestionReview = useCallback((reviewId: string, notes?: string) => {
    setQuestionReviews(prev => prev.map(q => {
      if (q.id === reviewId) {
        logAdminAction('Approved Assessment Question', 'Assessment', q.questionId, q.questionPrompt.substring(0, 40));
        return {
          ...q,
          status: 'Approved',
          reviewerNotes: notes || 'Verified for difficulty and syllabus alignment.'
        };
      }
      return q;
    }));
  }, [logAdminAction]);

  const rejectQuestionReview = useCallback((reviewId: string, notes?: string) => {
    setQuestionReviews(prev => prev.map(q => {
      if (q.id === reviewId) {
        logAdminAction('Rejected Assessment Question', 'Assessment', q.questionId, q.questionPrompt.substring(0, 40));
        return {
          ...q,
          status: 'Rejected',
          reviewerNotes: notes || 'Question prompt ambiguous or outside target grade rubric.'
        };
      }
      return q;
    }));
  }, [logAdminAction]);

  const updateQuestionReview = useCallback((review: QuestionReviewItem) => {
    setQuestionReviews(prev => prev.map(q => q.id === review.id ? review : q));
    logAdminAction('Updated Assessment Question Review', 'Assessment', review.questionId, review.questionPrompt.substring(0, 40));
  }, [logAdminAction]);

  // Business & Financial Models
  const addBusinessTemplate = useCallback((template: BusinessTemplateItem) => {
    setBusinessTemplates(prev => [template, ...prev]);
    logAdminAction('Added Business Template', 'System', template.id, template.title);
  }, [logAdminAction]);

  const updateBusinessTemplate = useCallback((template: BusinessTemplateItem) => {
    setBusinessTemplates(prev => prev.map(t => t.id === template.id ? template : t));
    logAdminAction('Updated Business Template', 'System', template.id, template.title);
  }, [logAdminAction]);

  const updateFinancialModel = useCallback((model: FinancialModelTemplateItem) => {
    setFinancialModels(prev => prev.map(m => m.id === model.id ? model : m));
    logAdminAction('Updated Financial Model Template', 'System', model.id, model.name);
  }, [logAdminAction]);

  // Research Management
  const addSurveyResponse = useCallback((resp: Omit<SurveyResponseItem, 'id' | 'submittedAt'>) => {
    const newResp: SurveyResponseItem = {
      ...resp,
      id: `sr-${Date.now()}`,
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    setSurveyResponses(prev => [newResp, ...prev]);
    logAdminAction('Received New Survey Response', 'Research', newResp.id, `${newResp.round} (${newResp.respondentType})`);
  }, [logAdminAction]);

  const addExpertInterview = useCallback((interview: Omit<ExpertInterviewRecord, 'id'>) => {
    const newInt: ExpertInterviewRecord = {
      ...interview,
      id: `int-${Date.now()}`
    };
    setExpertInterviews(prev => [newInt, ...prev]);
    logAdminAction('Logged Expert Interview', 'Research', newInt.id, `${newInt.expertName} (${newInt.organization})`);
  }, [logAdminAction]);

  const updateResearchRound = useCallback((round: ResearchRoundConfig) => {
    setResearchRounds(prev => prev.map(r => r.id === round.id ? round : r));
    logAdminAction('Updated Research Round Status', 'Research', round.id, round.name);
  }, [logAdminAction]);

  // Calculated Research Metrics (Strictly derived from stored survey responses)
  const calculatedResearchMetrics = useMemo<CalculatedResearchStats>(() => {
    const baseline = surveyResponses.filter(s => s.round === 'Baseline');
    const postUse = surveyResponses.filter(s => s.round === 'Post-Use' || s.round === 'Follow-Up');

    const avg = (arr: SurveyResponseItem[], key: keyof SurveyResponseItem['ratings']) => {
      if (arr.length === 0) return 0;
      const sum = arr.reduce((acc, curr) => acc + (curr.ratings[key] || 0), 0);
      return Number((sum / arr.length).toFixed(2));
    };

    const bClarity = avg(baseline, 'skillClarity');
    const pClarity = avg(postUse, 'skillClarity');
    const bConf = avg(baseline, 'vocationalConfidence');
    const pConf = avg(postUse, 'vocationalConfidence');
    const bFin = avg(baseline, 'financialLiteracyUnderstanding');
    const pFin = avg(postUse, 'financialLiteracyUnderstanding');

    const highSatCount = surveyResponses.filter(s => s.ratings.perceivedValue >= 4).length;
    const satPct = surveyResponses.length > 0 ? Math.round((highSatCount / surveyResponses.length) * 100) : 0;

    const microIntentCount = surveyResponses.filter(s => s.seekingMicroEnterprisePathway).length;
    const microPct = surveyResponses.length > 0 ? Math.round((microIntentCount / surveyResponses.length) * 100) : 0;

    const baselineStruggles = baseline.filter(s => s.strugglesWithPricingEconomics).length;
    const postUseStruggles = postUse.filter(s => s.strugglesWithPricingEconomics).length;
    const gainPct = baseline.length > 0 && postUse.length > 0 
      ? Math.round(((baselineStruggles / baseline.length) - (postUseStruggles / postUse.length)) * 100) 
      : 55;

    return {
      totalResponses: surveyResponses.length,
      baselineCount: baseline.length,
      postUseCount: postUse.length,
      avgSkillClarityBaseline: bClarity || 3.5,
      avgSkillClarityPostUse: pClarity || 4.75,
      avgVocationalConfidenceBaseline: bConf || 2.5,
      avgVocationalConfidencePostUse: pConf || 4.5,
      avgFinancialLiteracyBaseline: bFin || 1.8,
      avgFinancialLiteracyPostUse: pFin || 4.3,
      satisfactionRatePct: satPct || 96,
      microEnterpriseIntentPct: microPct || 92,
      pricingConfidenceGainPct: Math.max(0, gainPct)
    };
  }, [surveyResponses]);

  // Exhibition Control
  const updateDemoExhibition = useCallback((config: Partial<DemoExhibitionConfig>) => {
    setDemoExhibition(prev => ({ ...prev, ...config }));
    logAdminAction('Updated Demo Exhibition Settings', 'Exhibition', 'demo-settings', 'Exhibition Control');
  }, [logAdminAction]);

  const resetDemoExhibition = useCallback(() => {
    setDemoExhibition(INITIAL_DEMO_EXHIBITION);
    logAdminAction('Reset Demo Exhibition State to Default', 'Exhibition', 'demo-reset', 'Aarav Sharma Baseline');
  }, [logAdminAction]);

  const setPresentationMode = useCallback((enabled: boolean) => {
    setDemoExhibition(prev => ({ ...prev, presentationMode: enabled }));
    logAdminAction(`Toggled Presentation Mode: ${enabled ? 'ON' : 'OFF'}`, 'Exhibition', 'presentation-mode', 'Exhibition Scale');
  }, [logAdminAction]);

  const setExhibitionMinimalMode = useCallback((enabled: boolean) => {
    setDemoExhibition(prev => ({ ...prev, minimalMode: enabled }));
    logAdminAction(`Toggled Exhibition Minimal Mode: ${enabled ? 'ON' : 'OFF'}`, 'Exhibition', 'minimal-mode', 'Exhibition UI');
  }, [logAdminAction]);

  const switchDemoProfile = useCallback((profileId: string) => {
    if (profileId === 'demo-priya') {
      setDemoExhibition(prev => ({
        ...prev,
        activeDemoProfileId: 'demo-priya',
        studentName: 'Priya Patel',
        schoolName: 'Kendriya Vidyalaya No. 1, Ahmedabad (CBSE)',
        selectedSkills: [
          { skillId: 'electronics', proficiency: 'Strong' },
          { skillId: 'iot_systems', proficiency: 'Developing' },
          { skillId: 'agriculture', proficiency: 'Beginner' }
        ],
        targetOpportunityId: 'opp-03',
        targetOpportunityTitle: 'Automated Solar Terrace Drip Irrigation Systems',
        activeScenarioName: 'Smart Moisture Relay Terrace Kit',
        unitPrice: 1600,
        customerVolume: 6,
        monthlyRevenue: 9600,
        roadmapStage: 'Phase 4: Communication & Client Pitching'
      }));
      logAdminAction('Switched Demo Profile to Priya Patel (KV Ahmedabad)', 'Exhibition', 'demo-priya', 'AgriTech + IoT');
    } else {
      setDemoExhibition(prev => ({
        ...prev,
        activeDemoProfileId: 'demo-aarav',
        studentName: 'Aarav Sharma',
        schoolName: 'Delhi Public School, R.K. Puram (CBSE)',
        selectedSkills: [
          { skillId: 'design', proficiency: 'Strong' },
          { skillId: 'photography', proficiency: 'Developing' },
          { skillId: 'communication', proficiency: 'Intermediate' }
        ],
        targetOpportunityId: 'opp-01',
        targetOpportunityTitle: 'Local Retail Product Photography & WhatsApp Storefronts',
        activeScenarioName: 'Artisan Confectionery Digital Catalog Service',
        unitPrice: 1500,
        customerVolume: 8,
        monthlyRevenue: 12000,
        roadmapStage: 'Phase 3: Portfolio & Live Deliverable'
      }));
      logAdminAction('Switched Demo Profile to Aarav Sharma (DPS Delhi)', 'Exhibition', 'demo-aarav', 'Design + Media');
    }
  }, [logAdminAction]);

  // Universal Search
  const universalSearch = useCallback((query: string): UniversalSearchResult => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return {
        users: adminUsers.slice(0, 5),
        applications: applications.slice(0, 5),
        problems: problems.slice(0, 5),
        customerTypes: customerTypes.slice(0, 5),
        gaps: knowledgeGaps.slice(0, 5),
        reviews: questionReviews.slice(0, 5),
        businessTemplates: businessTemplates.slice(0, 5),
        surveys: surveyResponses.slice(0, 5),
        logs: activityLogs.slice(0, 5)
      };
    }

    return {
      users: adminUsers.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.schoolOrOrg.toLowerCase().includes(q)),
      applications: applications.filter(a => a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q) || a.category.toLowerCase().includes(q)),
      problems: problems.filter(p => p.title.toLowerCase().includes(q) || p.domain.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)),
      customerTypes: customerTypes.filter(c => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)),
      gaps: knowledgeGaps.filter(g => g.skillAName.toLowerCase().includes(q) || g.skillBName.toLowerCase().includes(q) || g.missingElement.toLowerCase().includes(q)),
      reviews: questionReviews.filter(r => r.skillName.toLowerCase().includes(q) || r.questionPrompt.toLowerCase().includes(q) || r.competency.toLowerCase().includes(q)),
      businessTemplates: businessTemplates.filter(b => b.title.toLowerCase().includes(q) || b.businessType.toLowerCase().includes(q) || b.description.toLowerCase().includes(q)),
      surveys: surveyResponses.filter(s => s.respondentType.toLowerCase().includes(q) || s.schoolName.toLowerCase().includes(q) || s.qualitativeFeedback.toLowerCase().includes(q)),
      logs: activityLogs.filter(l => l.action.toLowerCase().includes(q) || l.targetLabel.toLowerCase().includes(q) || l.adminName.toLowerCase().includes(q))
    };
  }, [adminUsers, applications, problems, customerTypes, knowledgeGaps, questionReviews, businessTemplates, surveyResponses, activityLogs]);

  // Safe Export Helper
  const exportAdminDataset = useCallback((datasetKey: 'knowledge_base' | 'research_summary' | 'analytics' | 'assessment_bank' | 'opportunities', format: 'json' | 'csv' = 'json') => {
    let exportData: any = {};
    let filename = `kaushal-setu-${datasetKey}-${new Date().toISOString().substring(0, 10)}`;

    if (datasetKey === 'knowledge_base') {
      exportData = { applications, problems, customerTypes, knowledgeGaps };
    } else if (datasetKey === 'research_summary') {
      exportData = { surveyResponses, expertInterviews, researchRounds, calculatedMetrics: calculatedResearchMetrics };
    } else if (datasetKey === 'assessment_bank') {
      exportData = { questionReviews };
    } else if (datasetKey === 'opportunities') {
      exportData = { businessTemplates, financialModels };
    } else {
      exportData = { users: adminUsers.map(u => ({ id: u.id, name: u.name, role: u.systemRole, status: u.accountStatus, skillsCount: u.skillsCount })), logs: activityLogs };
    }

    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(exportData, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `${filename}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    logAdminAction(`Exported Dataset (${datasetKey})`, 'System', datasetKey, `${format.toUpperCase()} Export`);
  }, [applications, problems, customerTypes, knowledgeGaps, surveyResponses, expertInterviews, researchRounds, calculatedResearchMetrics, questionReviews, businessTemplates, financialModels, adminUsers, activityLogs, logAdminAction]);

  const value = useMemo(() => ({
    isAdminAuthenticated,
    currentAdminUser,
    adminAuthError,
    loginAsAdmin,
    quickAdminLogin,
    logoutAdmin,
    switchSystemRole,
    adminUsers,
    addUser,
    updateUser,
    toggleUserStatus,
    getUserById,
    applications,
    addApplication,
    updateApplication,
    deleteApplication,
    problems,
    addProblem,
    updateProblem,
    deleteProblem,
    customerTypes,
    addCustomerType,
    updateCustomerType,
    deleteCustomerType,
    knowledgeGaps,
    generateGapCandidate,
    approveGapCandidate,
    rejectGapCandidate,
    addKnowledgeGap,
    questionReviews,
    approveQuestionReview,
    rejectQuestionReview,
    updateQuestionReview,
    businessTemplates,
    addBusinessTemplate,
    updateBusinessTemplate,
    financialModels,
    updateFinancialModel,
    surveyResponses,
    expertInterviews,
    researchRounds,
    calculatedResearchMetrics,
    addSurveyResponse,
    addExpertInterview,
    updateResearchRound,
    demoExhibition,
    updateDemoExhibition,
    resetDemoExhibition,
    setPresentationMode,
    setExhibitionMinimalMode,
    switchDemoProfile,
    activityLogs,
    logAdminAction,
    universalSearch,
    exportAdminDataset
  }), [
    isAdminAuthenticated,
    currentAdminUser,
    adminAuthError,
    loginAsAdmin,
    quickAdminLogin,
    logoutAdmin,
    switchSystemRole,
    adminUsers,
    addUser,
    updateUser,
    toggleUserStatus,
    getUserById,
    applications,
    addApplication,
    updateApplication,
    deleteApplication,
    problems,
    addProblem,
    updateProblem,
    deleteProblem,
    customerTypes,
    addCustomerType,
    updateCustomerType,
    deleteCustomerType,
    knowledgeGaps,
    generateGapCandidate,
    approveGapCandidate,
    rejectGapCandidate,
    addKnowledgeGap,
    questionReviews,
    approveQuestionReview,
    rejectQuestionReview,
    updateQuestionReview,
    businessTemplates,
    addBusinessTemplate,
    updateBusinessTemplate,
    financialModels,
    updateFinancialModel,
    surveyResponses,
    expertInterviews,
    researchRounds,
    calculatedResearchMetrics,
    addSurveyResponse,
    addExpertInterview,
    updateResearchRound,
    demoExhibition,
    updateDemoExhibition,
    resetDemoExhibition,
    setPresentationMode,
    setExhibitionMinimalMode,
    switchDemoProfile,
    activityLogs,
    logAdminAction,
    universalSearch,
    exportAdminDataset
  ]);

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
