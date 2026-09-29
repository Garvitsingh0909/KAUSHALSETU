import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { 
  PathwayType, 
  PracticalGoal, 
  RoadmapStageId, 
  ActionItem, 
  SkillGapItem, 
  StudentProject, 
  StudentExperience, 
  StudentReflection,
  ROADMAP_STAGES,
  CBSE_DEMO_ACTIONS, 
  CBSE_DEMO_PROJECTS, 
  CBSE_DEMO_EXPERIENCES,
  getEducationalResource
} from '../data/roadmap';
import { OPPORTUNITIES, Opportunity } from '../data/opportunities';
import { useProfile } from './ProfileContext';
import { useBusiness } from './BusinessContext';

interface RoadmapContextType {
  targetOpportunityId: string;
  targetOpportunity: Opportunity | null;
  setTargetOpportunityId: (id: string) => void;
  pathwayType: PathwayType;
  setPathwayType: (type: PathwayType) => void;
  practicalGoal: PracticalGoal;
  setPracticalGoal: (goal: PracticalGoal) => void;
  actions: ActionItem[];
  addAction: (action: Omit<ActionItem, 'id'>) => void;
  updateActionStatus: (id: string, status: ActionItem['status']) => void;
  deleteAction: (id: string) => void;
  skillGaps: SkillGapItem[];
  projects: StudentProject[];
  addProject: (project: Omit<StudentProject, 'id'>) => string;
  updateProject: (id: string, updates: Partial<StudentProject>) => void;
  deleteProject: (id: string) => void;
  saveProjectReflection: (projectId: string, reflection: StudentReflection) => void;
  toggleDeliverable: (projectId: string, deliverableId: string) => void;
  experiences: StudentExperience[];
  addExperience: (exp: Omit<StudentExperience, 'id'>) => void;
  deleteExperience: (id: string) => void;
  loadDemoRoadmap: () => void;
  resetRoadmapForTarget: (oppId: string) => void;
  // Progress calculations
  progressMetrics: {
    totalActions: number;
    completedActions: number;
    percentComplete: number;
    completedProjects: number;
    totalProjects: number;
    verifiedSkillsCount: number;
    targetSkillsCovered: number;
    totalTargetSkills: number;
  };
  gOneRoadmapAdvice: {
    title: string;
    summary: string;
    suggestedNextStep: string;
    potentialGapsReasoning: { skill: string; why: string }[];
  };
}

const RoadmapContext = createContext<RoadmapContextType | undefined>(undefined);

const ACTIONS_STORAGE_KEY = 'ks_roadmap_actions';
const TARGET_STORAGE_KEY = 'ks_roadmap_target';
const PATHWAY_STORAGE_KEY = 'ks_roadmap_pathway';
const GOAL_STORAGE_KEY = 'ks_roadmap_goal';
const PROJECTS_STORAGE_KEY = 'ks_roadmap_projects';
const EXPERIENCES_STORAGE_KEY = 'ks_roadmap_experiences';

export const RoadmapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userSkills, allSkills, setProfile, setUserSkills } = useProfile();
  const { activeScenario, scenarios } = useBusiness();

  // Target Opportunity ID
  const [targetOpportunityId, setTargetOpportunityIdState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(TARGET_STORAGE_KEY);
      if (saved && OPPORTUNITIES.some(o => o.id === saved)) {
        return saved;
      }
    } catch (e) {
      console.warn('Failed to parse target opportunity id', e);
    }
    return 'product_photography_service';
  });

  // Pathway Type
  const [pathwayType, setPathwayTypeState] = useState<PathwayType>(() => {
    try {
      const saved = localStorage.getItem(PATHWAY_STORAGE_KEY) as PathwayType;
      if (saved) return saved;
    } catch (e) {
      console.warn(e);
    }
    return 'service';
  });

  // Practical Goal
  const [practicalGoal, setPracticalGoalState] = useState<PracticalGoal>(() => {
    try {
      const saved = localStorage.getItem(GOAL_STORAGE_KEY) as PracticalGoal;
      if (saved) return saved;
    } catch (e) {
      console.warn(e);
    }
    return 'create_portfolio';
  });

  // Action Items
  const [actions, setActions] = useState<ActionItem[]>(() => {
    try {
      const saved = localStorage.getItem(ACTIONS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn(e);
    }
    return CBSE_DEMO_ACTIONS;
  });

  // Projects & Portfolio
  const [projects, setProjects] = useState<StudentProject[]>(() => {
    try {
      const saved = localStorage.getItem(PROJECTS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn(e);
    }
    return CBSE_DEMO_PROJECTS;
  });

  // Experiences
  const [experiences, setExperiences] = useState<StudentExperience[]>(() => {
    try {
      const saved = localStorage.getItem(EXPERIENCES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn(e);
    }
    return CBSE_DEMO_EXPERIENCES;
  });

  // Synchronize localStorage
  useEffect(() => {
    try {
      localStorage.setItem(TARGET_STORAGE_KEY, targetOpportunityId);
    } catch (e) {
      console.warn(e);
    }
  }, [targetOpportunityId]);

  useEffect(() => {
    try {
      localStorage.setItem(PATHWAY_STORAGE_KEY, pathwayType);
    } catch (e) {
      console.warn(e);
    }
  }, [pathwayType]);

  useEffect(() => {
    try {
      localStorage.setItem(GOAL_STORAGE_KEY, practicalGoal);
    } catch (e) {
      console.warn(e);
    }
  }, [practicalGoal]);

  useEffect(() => {
    try {
      localStorage.setItem(ACTIONS_STORAGE_KEY, JSON.stringify(actions));
    } catch (e) {
      console.warn(e);
    }
  }, [actions]);

  useEffect(() => {
    try {
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.warn(e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(EXPERIENCES_STORAGE_KEY, JSON.stringify(experiences));
    } catch (e) {
      console.warn(e);
    }
  }, [experiences]);

  // Retrieve current target opportunity object
  const targetOpportunity = useMemo(() => {
    return OPPORTUNITIES.find(o => o.id === targetOpportunityId) || OPPORTUNITIES[0];
  }, [targetOpportunityId]);

  // Skill Gap Analysis Engine
  const skillGaps = useMemo<SkillGapItem[]>(() => {
    if (!targetOpportunity) return [];

    const userSkillMap = new Map(userSkills.map(us => [us.skillId, us.proficiency]));
    const allTargetSkills = Array.from(new Set([
      ...targetOpportunity.requiredSkills,
      ...targetOpportunity.preferredSkills
    ]));

    return allTargetSkills.map(skillId => {
      const skillMeta = allSkills.find(s => s.id === skillId);
      const skillName = skillMeta ? skillMeta.name : skillId.replace(/_/g, ' ');
      const userProf = userSkillMap.get(skillId);
      const res = getEducationalResource(skillId, skillName);

      let status: 'have' | 'developing' | 'needed' = 'needed';
      if (userProf) {
        if (userProf === 'Strong' || userProf === 'Advanced') {
          status = 'have';
        } else {
          status = 'developing';
        }
      }

      // Generate explainable G-ONE justification
      let reasonWhy = '';
      if (skillId === 'marketing') {
        reasonWhy = 'Marketing may help you identify prospective clients and explain the value of your work without aggressive sales pitches.';
      } else if (skillId === 'client_handling' || skillId === 'communication') {
        reasonWhy = 'This opportunity involves interacting with clients, listening to their problems, and establishing clear written project expectations.';
      } else if (skillId === 'pricing' || skillId === 'financial_literacy') {
        const scenarioMatch = activeScenario || scenarios[0];
        const priceInfo = scenarioMatch ? `₹${scenarioMatch.pricePerUnit}` : 'your target rate';
        reasonWhy = `Pricing helps you cover materials and time sustainably (e.g. testing your Phase 3 model assumption of ${priceInfo}) without suffering hidden losses.`;
      } else if (skillId === 'photography') {
        reasonWhy = 'Photography is the primary creative deliverable needed to capture sharp, well-composed visual assets.';
      } else if (skillId === 'photo_editing') {
        reasonWhy = 'Editing allows you to color-grade raw captures, clean up backdrops, and format images for e-commerce catalogs.';
      } else {
        reasonWhy = `${skillName} provides valuable practical capability for delivering this solution effectively.`;
      }

      return {
        skillId,
        skillName,
        status,
        currentProficiency: userProf,
        reasonWhy,
        educationalTopic: res.suggestedLearningTopic,
        suggestedPractice: res.suggestedPractice,
        suggestedProject: res.suggestedProject
      };
    });
  }, [targetOpportunity, userSkills, allSkills, activeScenario, scenarios]);

  // Generate Default Actions for a given opportunity
  const generateDefaultActionsForOpportunity = useCallback((opp: Opportunity): ActionItem[] => {
    return [
      {
        id: `act-${Date.now()}-1`,
        stageId: 'foundation',
        title: `Learn foundational techniques in ${opp.title}`,
        action: `Review fundamental principles and study 3 successful examples of ${opp.applications[0] || opp.title}.`,
        purpose: 'Grasp the core standards before creating custom work.',
        output: '1-page study note or annotated visual reference board.',
        status: 'not_started',
        connectedSkillId: opp.requiredSkills[0]
      },
      {
        id: `act-${Date.now()}-2`,
        stageId: 'practice',
        title: 'Execute deliberate practice exercises',
        action: opp.firstStepProfile?.immediateAction || `Create 3 low-stakes trial drafts or prototype exercises.`,
        purpose: 'Build initial muscle memory in a risk-free environment.',
        output: '3 completed practice samples or test outputs.',
        status: 'not_started',
        connectedSkillId: opp.requiredSkills[1] || opp.requiredSkills[0]
      },
      {
        id: `act-${Date.now()}-3`,
        stageId: 'portfolio',
        title: 'Curate a tangible mini-portfolio',
        action: 'Select your best 3 to 5 outputs and assemble them into a clean, shareable showcase document or web album.',
        purpose: 'Create concrete evidence of your practical skill to show future clients or mentors.',
        output: 'A clean 3-to-5 specimen showcase lookbook.',
        status: 'not_started'
      },
      {
        id: `act-${Date.now()}-4`,
        stageId: 'communication',
        title: 'Practise client discovery & presentation',
        action: 'Draft a polite, concise outreach dialogue and practise explaining the problem you solve to a peer or mentor.',
        purpose: 'Build confidence in discussing project requirements without anxiety.',
        output: '1-page presentation script and client intake checklist.',
        status: 'not_started',
        connectedSkillId: 'communication'
      },
      {
        id: `act-${Date.now()}-5`,
        stageId: 'test',
        title: 'Conduct a small real-world pilot',
        action: 'Carry out a pro-bono or small pilot trial for a school club, peer project, or neighborhood contact.',
        purpose: 'Validate your workflow, timing, and deliverable quality against real human feedback.',
        output: 'Completed pilot delivery + feedback review notes.',
        status: 'not_started'
      },
      {
        id: `act-${Date.now()}-6`,
        stageId: 'reflect',
        title: 'Synthesize learnings & review economics',
        action: 'Document what was difficult, calculate hours spent, and link with your Phase 3 business model pricing.',
        purpose: 'Calibrate unit economics and plan your next skill growth milestone.',
        output: 'Reflection summary and calibrated price sheet.',
        status: 'not_started',
        connectedSkillId: 'pricing'
      }
    ];
  }, []);

  const resetRoadmapForTarget = useCallback((oppId: string) => {
    setTargetOpportunityIdState(oppId);
    const opp = OPPORTUNITIES.find(o => o.id === oppId);
    if (opp) {
      if (oppId === 'product_photography_service') {
        setActions(CBSE_DEMO_ACTIONS);
      } else {
        setActions(generateDefaultActionsForOpportunity(opp));
      }
    }
  }, [generateDefaultActionsForOpportunity]);

  const setTargetOpportunityId = useCallback((id: string) => {
    resetRoadmapForTarget(id);
  }, [resetRoadmapForTarget]);

  const setPathwayType = useCallback((type: PathwayType) => {
    setPathwayTypeState(type);
  }, []);

  const setPracticalGoal = useCallback((goal: PracticalGoal) => {
    setPracticalGoalState(goal);
  }, []);

  const addAction = useCallback((newAction: Omit<ActionItem, 'id'>) => {
    const item: ActionItem = {
      ...newAction,
      id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`
    };
    setActions(prev => [...prev, item]);
  }, []);

  const updateActionStatus = useCallback((id: string, status: ActionItem['status']) => {
    setActions(prev => prev.map(a => {
      if (a.id === id) {
        return {
          ...a,
          status,
          completedAt: status === 'completed' ? new Date().toISOString().split('T')[0] : undefined
        };
      }
      return a;
    }));
  }, []);

  const deleteAction = useCallback((id: string) => {
    setActions(prev => prev.filter(a => a.id !== id));
  }, []);

  const addProject = useCallback((newProj: Omit<StudentProject, 'id'>) => {
    const id = `proj-${Date.now()}`;
    const project: StudentProject = {
      ...newProj,
      id
    };
    setProjects(prev => [project, ...prev]);
    return id;
  }, []);

  const updateProject = useCallback((id: string, updates: Partial<StudentProject>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  }, []);

  const deleteProject = useCallback((id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  }, []);

  const saveProjectReflection = useCallback((projectId: string, reflection: StudentReflection) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          status: 'completed',
          reflection
        };
      }
      return p;
    }));
  }, []);

  const toggleDeliverable = useCallback((projectId: string, deliverableId: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const updatedDeliverables = p.deliverables.map(d => 
          d.id === deliverableId ? { ...d, completed: !d.completed } : d
        );
        const allDone = updatedDeliverables.every(d => d.completed);
        return {
          ...p,
          deliverables: updatedDeliverables,
          status: allDone ? 'completed' : p.status
        };
      }
      return p;
    }));
  }, []);

  const addExperience = useCallback((newExp: Omit<StudentExperience, 'id'>) => {
    const exp: StudentExperience = {
      ...newExp,
      id: `exp-${Date.now()}`
    };
    setExperiences(prev => [exp, ...prev]);
  }, []);

  const deleteExperience = useCallback((id: string) => {
    setExperiences(prev => prev.filter(e => e.id !== id));
  }, []);

  // Quick CBSE Demo Loader for Judges
  const loadDemoRoadmap = useCallback(() => {
    // 1. Set Student Profile to Aarav Patel (CBSE Grade 10)
    setProfile({
      name: 'Aarav Patel',
      role: 'Student (Class 10)',
      schoolOrOrg: 'Delhi Public School (Class 10 Vocational)',
      interests: 'Visual Media, Micro-Entrepreneurship & Community Design'
    });

    // 2. Set Verified Skills (Photography: Strong, Communication: Advanced, Photo Editing: Intermediate, Marketing: Developing)
    setUserSkills([
      { skillId: 'photography', proficiency: 'Strong' },
      { skillId: 'communication', proficiency: 'Advanced' },
      { skillId: 'photo_editing', proficiency: 'Intermediate' },
      { skillId: 'marketing', proficiency: 'Developing' }
    ]);

    // 3. Set Target Opportunity to Product Photography Service
    setTargetOpportunityIdState('product_photography_service');
    setPathwayTypeState('service');
    setPracticalGoalState('create_portfolio');

    // 4. Preload 6 Actions (3 completed, 1 in progress, 2 upcoming)
    setActions(CBSE_DEMO_ACTIONS);

    // 5. Preload 1 completed project with rich reflection
    setProjects(CBSE_DEMO_PROJECTS);

    // 6. Preload experiences
    setExperiences(CBSE_DEMO_EXPERIENCES);
  }, [setProfile, setUserSkills]);

  // Progress metrics calculation
  const progressMetrics = useMemo(() => {
    const totalActions = actions.length;
    const completedActions = actions.filter(a => a.status === 'completed').length;
    const percentComplete = totalActions > 0 ? Math.round((completedActions / totalActions) * 100) : 0;
    const totalProjects = projects.length;
    const completedProjects = projects.filter(p => p.status === 'completed').length;

    const userSkillIds = new Set(userSkills.map(s => s.skillId));
    const targetRequired = targetOpportunity?.requiredSkills || [];
    const targetSkillsCovered = targetRequired.filter(id => userSkillIds.has(id)).length;

    return {
      totalActions,
      completedActions,
      percentComplete,
      completedProjects,
      totalProjects,
      verifiedSkillsCount: userSkills.length,
      targetSkillsCovered,
      totalTargetSkills: targetRequired.length
    };
  }, [actions, projects, userSkills, targetOpportunity]);

  // G-ONE Educational Roadmap Advisor
  const gOneRoadmapAdvice = useMemo(() => {
    const nextAction = actions.find(a => a.status === 'in_progress') || actions.find(a => a.status === 'not_started');
    const missingSkills = skillGaps.filter(g => g.status === 'needed');

    const potentialGapsReasoning = skillGaps.map(g => ({
      skill: g.skillName,
      why: g.reasonWhy
    }));

    let summary = '';
    if (progressMetrics.completedActions === 0) {
      summary = `Suggested starting point: Begin with Stage 1 Foundation to build your baseline technical vocabulary for ${targetOpportunity?.title || 'this pathway'}.`;
    } else if (progressMetrics.percentComplete >= 80) {
      summary = `Excellent progress! You have completed ${progressMetrics.completedActions} roadmap actions. Consider launching a live pilot test in your school or neighborhood.`;
    } else {
      summary = `You have completed ${progressMetrics.completedActions} of ${progressMetrics.totalActions} milestone actions (${progressMetrics.percentComplete}%). Keep focusing on building tangible deliverables rather than theoretical study.`;
    }

    const suggestedNextStep = nextAction 
      ? `${nextAction.title}: ${nextAction.action}`
      : 'All current milestone actions are completed! Consider logging a new project in My Portfolio.';

    return {
      title: 'G-ONE Roadmap Guidance',
      summary,
      suggestedNextStep,
      potentialGapsReasoning
    };
  }, [actions, skillGaps, targetOpportunity, progressMetrics]);

  return (
    <RoadmapContext.Provider value={{
      targetOpportunityId,
      targetOpportunity,
      setTargetOpportunityId,
      pathwayType,
      setPathwayType,
      practicalGoal,
      setPracticalGoal,
      actions,
      addAction,
      updateActionStatus,
      deleteAction,
      skillGaps,
      projects,
      addProject,
      updateProject,
      deleteProject,
      saveProjectReflection,
      toggleDeliverable,
      experiences,
      addExperience,
      deleteExperience,
      loadDemoRoadmap,
      resetRoadmapForTarget,
      progressMetrics,
      gOneRoadmapAdvice
    }}>
      {children}
    </RoadmapContext.Provider>
  );
};

export function useRoadmap() {
  const context = useContext(RoadmapContext);
  if (context === undefined) {
    throw new Error('useRoadmap must be used within a RoadmapProvider');
  }
  return context;
}
