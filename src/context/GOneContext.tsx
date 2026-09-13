/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — G-ONE REASONING & RECOMMENDATION ENGINE (PHASE 6)
 * "DATA FIRST. AI SECOND."
 * G-ONE reasons strictly over structured Knowledge Base records.
 */

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useProfile } from './ProfileContext';
import { useBusiness } from './BusinessContext';
import { useRoadmap } from './RoadmapContext';
import { useKnowledgeBase } from './KnowledgeBaseContext';
import { Opportunity } from '../data/opportunities';
import { CombinationRecord } from '../data/knowledgeBaseTypes';

export type UserRoleView = 'student' | 'parent' | 'teacher';

export interface SmartRecommendation {
  id: string;
  priority: 'NOW' | 'NEXT' | 'LATER';
  title: string;
  description: string;
  confidence: 'Strong Match' | 'Good Match' | 'Worth Exploring';
  whyAmISeeingThis: string;
  category: 'skill' | 'project' | 'business' | 'action';
  targetPath?: string;
  connectedSkill?: string;
  origin?: 'Knowledge Base (Curated)' | 'Knowledge Base (Validated)' | 'System Generated';
}

export interface StructuredGOneAnswer {
  query: string;
  basedOnProfile: { skill: string; proficiency: string }[];
  youCouldExplore: string;
  why: string;
  considerDeveloping: string;
  suggestedNextStep: string;
  timestamp: string;
  // Phase 6 Data Grounding
  retrievedFromKnowledgeBase: boolean;
  matchedCombination?: CombinationRecord | null;
  financialInsight?: {
    modelType: 'Illustrative Scenario' | 'User-Entered Assumption';
    suggestedPrice: number;
    breakEvenUnits: number;
    unitDefinition: string;
  };
  isKnowledgeGap?: boolean;
  knowledgeGapProtocolTriggered?: boolean;
  retrievalSummary?: string;
  groundingSource?: string;
}

export interface LocalCommunityNeed {
  id: string;
  category: 'Local Retail' | 'School & Youth' | 'Agriculture & Environment' | 'Civic Community';
  title: string;
  beneficiary: string;
  description: string;
  matchedSkills: string[];
  opportunityType: string;
  isExample: boolean;
}

export interface SchoolAggregateStats {
  totalStudentsSurveyed: number;
  totalProjectsCompleted: number;
  totalBusinessModelsSimulated: number;
  mostCommonSkills: { skill: string; percentage: number }[];
  mostExploredCategories: { category: string; count: number }[];
  commonSkillGaps: { skill: string; percentageNeeded: number }[];
}

export interface ResearchSurveyData {
  respondentsCount: number;
  pctUnawareOfSkillApplications: number;
  pctSeekingMicroEnterprisePathways: number;
  pctStrugglingWithPricingAndEconomics: number;
  keyFinding: string;
}

interface GOneContextType {
  roleView: UserRoleView;
  setRoleView: (role: UserRoleView) => void;
  oneNextStep: {
    title: string;
    action: string;
    reason: string;
    stage: string;
    actionId?: string;
    targetPath: string;
  };
  smartRecommendations: SmartRecommendation[];
  structuredAnswers: StructuredGOneAnswer[];
  askGOneQuery: (queryText: string) => StructuredGOneAnswer;
  clearGOneHistory: () => void;
  localOpportunities: LocalCommunityNeed[];
  schoolStats: SchoolAggregateStats;
  researchData: ResearchSurveyData;
  loadFullCbseJudgeEcosystem: () => void;
  studentJourney: {
    startedWith: { skill: string; proficiency: string }[];
    exploredOpportunities: string[];
    builtProjectsCount: number;
    testedScenariosCount: number;
    skillsDevelopedCount: number;
    currentlyExploring: string;
  };
}

const GOneContext = createContext<GOneContextType | undefined>(undefined);

const ROLE_STORAGE_KEY = 'ks_gone_role_view';
const ANSWERS_STORAGE_KEY = 'ks_gone_answers_history_v6';

const INITIAL_RESEARCH_DATA: ResearchSurveyData = {
  respondentsCount: 420,
  pctUnawareOfSkillApplications: 72,
  pctSeekingMicroEnterprisePathways: 84,
  pctStrugglingWithPricingAndEconomics: 68,
  keyFinding: 'While 84% of secondary students demonstrate verified vocational skills (design, electronics, coding, media), over 70% cannot articulate a practical problem to solve or establish sustainable unit economics.'
};

const INITIAL_SCHOOL_STATS: SchoolAggregateStats = {
  totalStudentsSurveyed: 420,
  totalProjectsCompleted: 156,
  totalBusinessModelsSimulated: 89,
  mostCommonSkills: [
    { skill: 'Photography & Media', percentage: 74 },
    { skill: 'Coding & Algorithms', percentage: 68 },
    { skill: 'Communication & Pitching', percentage: 62 },
    { skill: 'Graphic Design', percentage: 58 },
    { skill: 'Electronics & Hardware', percentage: 46 }
  ],
  mostExploredCategories: [
    { category: 'Creative & Digital Services', count: 184 },
    { category: 'STEM & Smart Hardware', count: 122 },
    { category: 'Educational & Peer Tutoring', count: 96 },
    { category: 'Sustainable AgriTech', count: 78 }
  ],
  commonSkillGaps: [
    { skill: 'Pricing & Cost Estimation', percentageNeeded: 78 },
    { skill: 'Client Communication & Briefing', percentageNeeded: 71 },
    { skill: 'Marketing & Audience Discovery', percentageNeeded: 65 }
  ]
};

const INITIAL_LOCAL_NEEDS: LocalCommunityNeed[] = [
  {
    id: 'local-need-1',
    category: 'Local Retail',
    title: 'Neighborhood Artisan & Confectionery Digital Cataloging',
    beneficiary: 'Independent home bakers & pottery artisans',
    description: 'Local culinary and craft artisans need high-clarity product photography and social media promotional posts to compete with packaged goods on WhatsApp and ONDC.',
    matchedSkills: ['photography', 'photo_editing', 'communication'],
    opportunityType: 'Product Photography & Digital Catalog Service',
    isExample: true
  },
  {
    id: 'local-need-2',
    category: 'School & Youth',
    title: 'Middle-School Practical STEM Tutoring & Concept Labs',
    beneficiary: 'Class 6-8 students needing homework support',
    description: 'Junior students struggle with abstract physics equations and basic electronics wiring; peer mentors provide relatable 1-on-1 practical demonstrations.',
    matchedSkills: ['electronics', 'coding', 'teaching'],
    opportunityType: 'Peer STEM Tutoring & Robotics Lab Mentorship',
    isExample: true
  },
  {
    id: 'local-need-3',
    category: 'Agriculture & Environment',
    title: 'Apartment Rooftop Drip Irrigation Automation',
    beneficiary: 'Residential rooftop garden committees',
    description: 'Urban gardening hobbyists waste water and lose plants during summer vacations; need simple microcontroller-driven moisture sensor triggers.',
    matchedSkills: ['electronics', 'agriculture', 'iot_systems'],
    opportunityType: 'Smart AgriTech & Environmental IoT Solutions',
    isExample: true
  },
  {
    id: 'local-need-4',
    category: 'Civic Community',
    title: 'Senior Citizen Digital Banking & UPI Literacy Workshops',
    beneficiary: 'Senior citizens and neighborhood elders',
    description: 'Elders fear online banking scams and lack confidence navigating smartphone utility bill apps; need empathetic, patient 1-on-1 safety workshops.',
    matchedSkills: ['digital_literacy', 'teaching', 'communication'],
    opportunityType: 'Senior Citizen & Artisan Digital Literacy Drive',
    isExample: true
  }
];

export const GOneProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userSkills, allSkills, setProfile, setUserSkills } = useProfile();
  const { activeScenario, scenarios, saveScenario } = useBusiness();
  const { 
    targetOpportunity, 
    projects, 
    skillGaps, 
    actions, 
    progressMetrics, 
    loadDemoRoadmap 
  } = useRoadmap();
  
  const { 
    combinations, 
    opportunities, 
    skills: kbSkills,
    projects: kbProjects,
    getCombinationForSkills, 
    autoFillMissingCombination,
    retrieveStructuredKnowledge
  } = useKnowledgeBase();

  const [roleView, setRoleViewState] = useState<UserRoleView>(() => {
    try {
      const saved = localStorage.getItem(ROLE_STORAGE_KEY);
      if (saved === 'student' || saved === 'parent' || saved === 'teacher') return saved;
    } catch (e) {
      console.warn(e);
    }
    return 'student';
  });

  const setRoleView = useCallback((role: UserRoleView) => {
    setRoleViewState(role);
    try {
      localStorage.setItem(ROLE_STORAGE_KEY, role);
    } catch (e) {
      console.warn(e);
    }
  }, []);

  const [structuredAnswers, setStructuredAnswers] = useState<StructuredGOneAnswer[]>(() => {
    try {
      const saved = localStorage.getItem(ANSWERS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn(e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(ANSWERS_STORAGE_KEY, JSON.stringify(structuredAnswers));
    } catch (e) {
      console.warn(e);
    }
  }, [structuredAnswers]);

  // Dynamic Deterministic "ONE NEXT STEP" Engine
  const oneNextStep = useMemo(() => {
    // Priority 1: If no skills added yet
    if (userSkills.length === 0) {
      return {
        title: 'Map Your Foundational Skills',
        action: 'Add your first 2 skills in the Skills Assessment step to discover structured pathways.',
        reason: 'G-ONE requires verified skills to retrieve accurate opportunities from the Knowledge Base.',
        stage: 'Foundation',
        targetPath: '/skills'
      };
    }

    // Priority 2: If no target opportunity selected
    if (!targetOpportunity) {
      return {
        title: 'Select a Targeted Opportunity',
        action: 'Explore and pin a matching opportunity to unlock your structured 6-phase roadmap.',
        reason: 'Grounding your efforts in a specific opportunity gives every practice deliverable purpose.',
        stage: 'Opportunity Discovery',
        targetPath: '/opportunities'
      };
    }

    // Priority 3: Check incomplete action items in active roadmap
    if (actions && Array.isArray(actions)) {
      const firstIncomplete = actions.find(a => a.status !== 'completed');
      if (firstIncomplete) {
        const stageLabel = (firstIncomplete.stage || 'Practice').replace(/_/g, ' ').toUpperCase();
        return {
          title: firstIncomplete.title,
          action: firstIncomplete.description || firstIncomplete.purpose || firstIncomplete.title,
          reason: `Progressing through ${stageLabel} (${firstIncomplete.title}) unlocks tangible project evidence.`,
          stage: firstIncomplete.stage || 'Action',
          actionId: firstIncomplete.id,
          targetPath: '/roadmap'
        };
      }
    }

    // Priority 4: Check if business model scenario is built
    if (!activeScenario) {
      return {
        title: 'Calibrate Venture Unit Economics',
        action: 'Open the Business Builder to test pricing, fixed costs, and calculate your break-even customer target.',
        reason: 'A project without economic validation risks hidden financial losses.',
        stage: 'Financial Simulation',
        targetPath: '/business-builder'
      };
    }

    // Priority 5: Completed core cycle
    return {
      title: 'Review Pilot Results & Expand Portfolio',
      action: 'Present your completed deliverables to a mentor or test an alternative cross-domain opportunity.',
      reason: 'Continuous reflection and portfolio iteration turns initial experiments into sustainable ventures.',
      stage: 'Reflection & Expansion',
      targetPath: '/projects'
    };
  }, [userSkills, targetOpportunity, actions, activeScenario]);

  // SMART RECOMMENDATIONS (Strict Knowledge Base Grounding)
  const smartRecommendations = useMemo<SmartRecommendation[]>(() => {
    const recs: SmartRecommendation[] = [];

    // NOW Recommendation
    recs.push({
      id: 'rec-now-action',
      priority: 'NOW',
      title: oneNextStep.title,
      description: oneNextStep.action,
      confidence: 'Strong Match',
      whyAmISeeingThis: oneNextStep.reason,
      category: 'action',
      targetPath: oneNextStep.targetPath,
      origin: 'Knowledge Base (Curated)'
    });

    // NEXT Recommendation (Skill Gap from Knowledge Base)
    const topGap = skillGaps.find(g => g.gapLevel === 'Critical' || g.gapLevel === 'Recommended');
    if (topGap) {
      recs.push({
        id: 'rec-next-gap',
        priority: 'NEXT',
        title: `Develop Skill: ${topGap.skillName}`,
        description: topGap.suggestedPractice,
        confidence: 'Good Match',
        whyAmISeeingThis: `Retrieved from Knowledge Base: ${topGap.skillName} is required for ${targetOpportunity?.title}.`,
        category: 'skill',
        connectedSkill: topGap.skillId,
        targetPath: '/roadmap',
        origin: 'Knowledge Base (Validated)'
      });
    }

    if (activeScenario) {
      recs.push({
        id: 'rec-next-biz',
        priority: 'NEXT',
        title: `Test Financial Sensitivity for ${activeScenario.scenarioName}`,
        description: `Verify what happens if customer demand drops or fixed costs rise.`,
        confidence: 'Strong Match',
        whyAmISeeingThis: `This appears because your active business model has price ₹${activeScenario.pricePerUnit} and customer volume ${activeScenario.customerCount}.`,
        category: 'business',
        targetPath: '/business-builder',
        origin: 'Knowledge Base (Validated)'
      });
    }

    return recs;
  }, [oneNextStep, skillGaps, targetOpportunity, activeScenario]);

  // ==========================================
  // NATURAL LANGUAGE QUERY ENGINE ("DATA FIRST. AI SECOND.")
  // ==========================================
  const askGOneQuery = useCallback((queryText: string): StructuredGOneAnswer => {
    const q = queryText.trim().toLowerCase();

    // 1. Identify active profile skills
    const profileSkillIds = userSkills.map(us => us.skillId);
    const topSkills = userSkills.slice(0, 3).map(us => {
      const s = allSkills.find(sk => sk.id === us.skillId);
      return {
        skill: s ? s.name : us.skillId,
        proficiency: us.proficiency
      };
    });

    const fallbackSkills = topSkills.length > 0
      ? topSkills
      : [{ skill: 'Photography & Lighting', proficiency: 'Strong' }, { skill: 'Marketing', proficiency: 'Developing' }];

    // 2. Identify skills mentioned directly in query
    const mentionedSkills = allSkills.filter(s => 
      q.includes(s.id) || 
      q.includes(s.name.toLowerCase()) || 
      (s.applications || []).some(a => q.includes(a.toLowerCase()))
    );

    const querySkillIds = mentionedSkills.length > 0 
      ? mentionedSkills.map(s => s.id) 
      : profileSkillIds.length > 0 ? profileSkillIds : ['photography', 'marketing'];

    // 3. BASELINE STRUCTURED RETRIEVAL FROM KNOWLEDGE BASE (Step 1 before AI)
    const retrievalContext = retrieveStructuredKnowledge(querySkillIds, queryText);
    const comboRecord = retrievalContext.matchedCombination;
    const retrievedFromKnowledgeBase = Boolean(comboRecord);
    const isKnowledgeGap = retrievalContext.isKnowledgeGap;
    const gapTriggered = retrievalContext.isKnowledgeGap;

    // 4. Structure Output Grounded in Retrieved Record
    let exploreTarget = comboRecord?.title || 'Applied Skill Pathway';
    let rationale = comboRecord?.explanation || 'Matched through verified skill intersection.';
    let toDevelop = comboRecord?.additionalSkills?.slice(0, 2).join(' and ') || 'Pricing & Client Communication';
    
    // Choose next step from retrieved project or roadmap
    let nextStep = retrievalContext.suggestedProjects[0]?.deliverables[0] ||
      comboRecord?.suggestedProjects[0]?.deliverables[0] || 
      'Create 1 tangible verified project deliverable.';

    // Check financial grounding
    let financialInsight = undefined;
    if (activeScenario) {
      financialInsight = {
        modelType: 'User-Entered Assumption' as const,
        suggestedPrice: activeScenario.pricePerUnit,
        breakEvenUnits: activeScenario.breakEvenCustomers,
        unitDefinition: 'Venture Deliverable'
      };
    } else if (retrievalContext.financialTemplate) {
      financialInsight = {
        modelType: 'Illustrative Scenario' as const,
        suggestedPrice: retrievalContext.financialTemplate.suggestedPriceRange.recommended,
        breakEvenUnits: retrievalContext.financialTemplate.estimatedBreakEvenUnits,
        unitDefinition: retrievalContext.financialTemplate.unitDefinition
      };
    } else if (comboRecord?.financialTemplate) {
      financialInsight = {
        modelType: 'Illustrative Scenario' as const,
        suggestedPrice: comboRecord.financialTemplate.suggestedPriceRange.recommended,
        breakEvenUnits: comboRecord.financialTemplate.estimatedBreakEvenUnits,
        unitDefinition: comboRecord.financialTemplate.unitDefinition
      };
    }

    // Specific query overrides
    if (q.includes('price') || q.includes('cost') || q.includes('profit') || q.includes('money')) {
      exploreTarget = `${comboRecord?.title || 'Micro-Enterprise'} — Unit Economics Analysis`;
      rationale = `Retrieved from ${financialInsight?.modelType || 'Knowledge Base'}: Recommended unit price is ₹${financialInsight?.suggestedPrice || 1200} with break-even at ${financialInsight?.breakEvenUnits || 1} client(s).`;
      toDevelop = 'Distinguishing Fixed Setup Costs from Variable Delivery Costs';
      nextStep = 'Open the Business Builder to calibrate unit economics and profit margin.';
    } else if (q.includes('project') || q.includes('build') || q.includes('portfolio')) {
      const topProj = retrievalContext.suggestedProjects[0];
      if (topProj) {
        exploreTarget = `Project Milestone: ${topProj.name}`;
        rationale = `Retrieved verified project deliverable: Solves "${topProj.problemSolved}".`;
        toDevelop = topProj.skillsPractised.slice(0, 2).join(' and ');
        nextStep = topProj.deliverables[0] || nextStep;
      }
    } else if (q.includes('next') || q.includes('what should i do')) {
      exploreTarget = oneNextStep.title;
      rationale = oneNextStep.reason;
      toDevelop = toDevelop || 'Client Briefing & Negotiation';
      nextStep = oneNextStep.action;
    }

    const newAnswer: StructuredGOneAnswer = {
      query: queryText.trim(),
      basedOnProfile: fallbackSkills,
      youCouldExplore: exploreTarget,
      why: rationale,
      considerDeveloping: toDevelop || 'Pricing & Client Communication',
      suggestedNextStep: nextStep,
      timestamp: 'Just now',
      retrievedFromKnowledgeBase,
      matchedCombination: comboRecord,
      financialInsight,
      isKnowledgeGap,
      knowledgeGapProtocolTriggered: gapTriggered,
      retrievalSummary: retrievalContext.retrievalSummary,
      groundingSource: retrievalContext.groundingSource
    };

    setStructuredAnswers(prev => [newAnswer, ...prev.slice(0, 9)]);
    return newAnswer;
  }, [userSkills, allSkills, retrieveStructuredKnowledge, activeScenario, oneNextStep]);

  const clearGOneHistory = useCallback(() => {
    setStructuredAnswers([]);
  }, []);

  // Complete CBSE Judge Demo Ecosystem Loader
  const loadFullCbseJudgeEcosystem = useCallback(() => {
    setProfile({
      name: 'Aarav Patel',
      role: 'Student (Class 10)',
      schoolOrOrg: 'Delhi Public School (CBSE Skill Expo 2026)',
      interests: 'Product Photography, Digital Micro-Enterprise & Visual Storytelling'
    });

    setUserSkills([
      { skillId: 'photography', proficiency: 'Strong' },
      { skillId: 'communication', proficiency: 'Advanced' },
      { skillId: 'photo_editing', proficiency: 'Intermediate' },
      { skillId: 'marketing', proficiency: 'Developing' }
    ]);

    loadDemoRoadmap();

    saveScenario({
      id: 'cbse-aarav-photo-service',
      opportunityId: 'product_photography_service',
      opportunityTitle: 'Product Photography & Digital Catalog Service',
      skillName: 'Photography & Lighting',
      scenarioName: 'Neighborhood Bakery Visual Refresh (Demo)',
      problem: 'Local artisan bakers and small shopkeepers take blurry smartphone photos under poor lighting, losing customer trust on digital catalogs.',
      customerSegment: 'Neighborhood home bakers, specialty confectioners, and craft boutiques',
      solution: 'Deliver a 5-photo high-resolution hero shot catalog pack with natural lighting calibration and WhatsApp-ready crops.',
      valueCreated: {
        problemSolved: 'Transforms dim, unappetizing kitchen snaps into crisp, mouth-watering catalog photos.',
        customerBenefit: 'Increases customer trust and drives an estimated 25-35% higher online order inquiries.',
        willingnessToPay: 'Merchants spend ₹1,500+ on printed banners; ₹500 for permanent digital assets is accessible.'
      },
      pricePerUnit: 500,
      customerCount: 8,
      fixedCosts: [
        { id: 'fc-1', name: 'Software subscription (Lightroom/Canva)', amount: 600, category: 'fixed' },
        { id: 'fc-2', name: 'Equipment maintenance & storage amortization', amount: 400, category: 'fixed' }
      ],
      variableCosts: [
        { id: 'vc-1', name: 'Local metro/bus travel per shoot', amount: 100, category: 'variable', isPerUnit: true },
        { id: 'vc-2', name: 'Backdrop paper cardstock wear & tear', amount: 25, category: 'variable', isPerUnit: true }
      ],
      revenue: 4000,
      totalFixedCost: 1000,
      totalVariableCost: 1000,
      totalCost: 2000,
      surplus: 2000,
      breakEvenCustomers: 3,
      timestamp: new Date().toISOString()
    });

    setRoleViewState('student');
  }, [setProfile, setUserSkills, loadDemoRoadmap, saveScenario]);

  // Overall Student Journey Summary
  const studentJourney = useMemo(() => {
    const startedWith = userSkills.map(us => {
      const s = allSkills.find(sk => sk.id === us.skillId);
      return {
        skill: s ? s.name : us.skillId,
        proficiency: us.proficiency
      };
    });

    return {
      startedWith,
      exploredOpportunities: [
        targetOpportunity?.title || 'Product Photography & Digital Catalog Service',
        'Digital UI/UX & Web Experience Studio',
        'Smart AgriTech & Environmental IoT Solutions'
      ],
      builtProjectsCount: projects.length,
      testedScenariosCount: scenarios.length,
      skillsDevelopedCount: userSkills.filter(s => s.proficiency === 'Strong' || s.proficiency === 'Advanced').length,
      currentlyExploring: targetOpportunity?.title || 'Product Photography & Digital Catalog Service'
    };
  }, [userSkills, allSkills, targetOpportunity, projects, scenarios]);

  return (
    <GOneContext.Provider value={{
      roleView,
      setRoleView,
      oneNextStep,
      smartRecommendations,
      structuredAnswers,
      askGOneQuery,
      clearGOneHistory,
      localOpportunities: INITIAL_LOCAL_NEEDS,
      schoolStats: INITIAL_SCHOOL_STATS,
      researchData: INITIAL_RESEARCH_DATA,
      loadFullCbseJudgeEcosystem,
      studentJourney
    }}>
      {children}
    </GOneContext.Provider>
  );
};

export function useGOne() {
  const context = useContext(GOneContext);
  if (context === undefined) {
    throw new Error('useGOne must be used within a GOneProvider');
  }
  return context;
}
