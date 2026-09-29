import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { Proficiency, Skill, SKILLS_DB } from '../data/skills';
import { Opportunity } from '../data/opportunities';
import { IndicativeProficiency, EvidenceLevel } from '../data/assessmentTypes';
import { UserSystemRole, AccountStatus } from '../data/adminTypes';
import { enhanceSkillProfile } from '../utils/skillEnhancer';

export interface UserProfile {
  name: string;
  email?: string;
  role: 'Student' | 'Parent' | 'Teacher' | 'Judge' | 'Admin' | 'Other' | '';
  systemRole?: UserSystemRole; // 'student' | 'admin'
  accountStatus?: AccountStatus;
  createdDate?: string;
  lastLogin?: string;
  permissions?: string[];
  schoolOrOrg: string;
  academicGrade?: string;
  interests: string;
}

export interface UserSkill {
  skillId: string;
  proficiency: Proficiency; // Self-reported
  indicativeProficiency?: IndicativeProficiency; // Assessment-supported
  evidenceLevel?: EvidenceLevel;
  lastAssessedDate?: string;
  attemptsCount?: number;
  latestScorePercentage?: number;
  latestRubricScore?: number;
}

interface ProfileContextType {
  profile: UserProfile;
  setProfile: (profile: UserProfile | ((prev: UserProfile) => UserProfile)) => void;
  userSkills: UserSkill[];
  customSkills: Skill[];
  allSkills: Skill[];
  customOpportunities: Opportunity[];
  isAdministrator: boolean;
  addSkill: (skillId: string) => void;
  addCustomSkill: (skill: Skill) => void;
  addCustomOpportunity: (opp: Opportunity) => void;
  removeSkill: (skillId: string) => void;
  updateProficiency: (skillId: string, proficiency: Proficiency) => void;
  updateAssessedProficiency: (
    skillId: string, 
    indicative: IndicativeProficiency, 
    evidence: EvidenceLevel, 
    scorePercentage: number, 
    rubricScore: number
  ) => void;
  getSkillDetails: (skillId: string) => Skill | undefined;
  isProfileComplete: boolean;
  clearData: () => void;
  triggerDemoMode: () => void;
  setSystemRole: (role: UserSystemRole) => void;
}

const defaultProfile: UserProfile = {
  name: '',
  email: '',
  role: '',
  systemRole: 'student',
  accountStatus: 'active',
  createdDate: '2026-02-01',
  lastLogin: '2026-03-13 09:00:00',
  permissions: [],
  schoolOrOrg: '',
  academicGrade: 'Class 10',
  interests: ''
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('ks_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return { ...defaultProfile, ...parsed };
        }
      }
    } catch (e) {
      console.error("Failed to parse saved profile:", e);
    }
    return defaultProfile;
  });

  const [userSkills, setUserSkills] = useState<UserSkill[]>(() => {
    try {
      const saved = localStorage.getItem('ks_skills');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter(item => item && item.skillId);
        }
      }
    } catch (e) {
      console.error("Failed to parse saved user skills:", e);
    }
    return [];
  });
  
  const [customSkills, setCustomSkills] = useState<Skill[]>(() => {
    try {
      const saved = localStorage.getItem('ks_custom_skills');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed
            .filter(item => item && item.id && item.name)
            // Filter out old basic art skill if it exists so it defaults to the official curated fine arts visual skill
            .filter(item => !['art', 'art_skill', 'drawing_art'].includes(item.id.toLowerCase()))
            .map(item => enhanceSkillProfile(item));
        }
      }
    } catch (e) {
      console.error("Failed to parse custom skills:", e);
    }
    return [];
  });
  
  const [customOpportunities, setCustomOpportunities] = useState<Opportunity[]>(() => {
    try {
      const saved = localStorage.getItem('ks_custom_opps');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter(item => item && item.id && item.title);
        }
      }
    } catch (e) {
      console.error("Failed to parse custom opportunities:", e);
    }
    return [];
  });

  useEffect(() => {
    if (profile) {
      localStorage.setItem('ks_profile', JSON.stringify(profile));
    }
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('ks_skills', JSON.stringify(userSkills));
  }, [userSkills]);
  
  useEffect(() => {
    localStorage.setItem('ks_custom_skills', JSON.stringify(customSkills));
  }, [customSkills]);

  useEffect(() => {
    localStorage.setItem('ks_custom_opps', JSON.stringify(customOpportunities));
  }, [customOpportunities]);

  const allSkills = useMemo(() => [...SKILLS_DB, ...customSkills], [customSkills]);

  const addSkill = useCallback((skillId: string) => {
    if (!skillId) return;
    setUserSkills(prev => {
      if (prev.some(s => s && s.skillId === skillId)) return prev;
      return [...prev, { skillId, proficiency: 'Beginner' }];
    });
  }, []);
  
  const addCustomSkill = useCallback((skill: Skill) => {
    if (!skill || !skill.name) return;
    const enhanced = enhanceSkillProfile(skill);
    setCustomSkills(prev => {
      if (prev.some(s => s && s.id === enhanced.id) || SKILLS_DB.some(s => s && s.id === enhanced.id)) {
        return prev;
      }
      return [...prev, enhanced];
    });
    setUserSkills(prev => {
      if (prev.some(s => s && s.skillId === enhanced.id)) return prev;
      return [...prev, { skillId: enhanced.id, proficiency: 'Beginner' }];
    });
  }, []);
  
  const addCustomOpportunity = useCallback((opp: Opportunity) => {
    if (!opp || !opp.id) return;
    setCustomOpportunities(prev => {
      if (prev.some(o => o && o.id === opp.id)) return prev;
      return [opp, ...prev];
    });
  }, []);

  const removeSkill = useCallback((skillId: string) => {
    setUserSkills(prev => prev.filter(s => s && s.skillId !== skillId));
  }, []);

  const updateProficiency = useCallback((skillId: string, proficiency: Proficiency) => {
    setUserSkills(prev => prev.map(s => 
      s && s.skillId === skillId ? { ...s, proficiency } : s
    ));
  }, []);

  const updateAssessedProficiency = useCallback((
    skillId: string, 
    indicative: IndicativeProficiency, 
    evidence: EvidenceLevel, 
    scorePercentage: number, 
    rubricScore: number
  ) => {
    setUserSkills(prev => {
      const exists = prev.some(s => s && s.skillId === skillId);
      const today = new Date().toISOString().split('T')[0];
      if (exists) {
        return prev.map(s => {
          if (s && s.skillId === skillId) {
            return {
              ...s,
              indicativeProficiency: indicative,
              evidenceLevel: evidence,
              lastAssessedDate: today,
              attemptsCount: (s.attemptsCount || 0) + 1,
              latestScorePercentage: scorePercentage,
              latestRubricScore: rubricScore
            };
          }
          return s;
        });
      } else {
        // Automatically add skill to user profile if not previously added
        return [
          ...prev,
          {
            skillId,
            proficiency: 'Developing',
            indicativeProficiency: indicative,
            evidenceLevel: evidence,
            lastAssessedDate: today,
            attemptsCount: 1,
            latestScorePercentage: scorePercentage,
            latestRubricScore: rubricScore
          }
        ];
      }
    });
  }, []);
  
  const getSkillDetails = useCallback((skillId: string): Skill | undefined => {
    if (!skillId) return undefined;
    const cleanId = skillId.trim().toLowerCase();
    const aliasMap: Record<string, string> = {
      'design': 'graphic_design',
      'tech': 'coding',
      'finance': 'financial_literacy',
      'media': 'photography'
    };
    const targetId = aliasMap[cleanId] || cleanId;
    return allSkills.find(s => s && (s.id.toLowerCase() === targetId || s.id.toLowerCase() === cleanId));
  }, [allSkills]);

  const clearData = useCallback(() => {
    setProfile(defaultProfile);
    setUserSkills([]);
    setCustomSkills([]);
    setCustomOpportunities([]);
    localStorage.removeItem('ks_profile');
    localStorage.removeItem('ks_skills');
    localStorage.removeItem('ks_custom_skills');
    localStorage.removeItem('ks_custom_opps');
  }, []);

  const triggerDemoMode = useCallback(() => {
    setProfile(prev => ({
      ...defaultProfile,
      ...prev,
      name: 'Aarav Patel',
      email: 'aarav.patel@student.edu.in',
      role: 'Student',
      schoolOrOrg: 'Delhi Public School, R.K. Puram (Vocational Wing)',
      academicGrade: 'Class 10 (Secondary Vocational)',
      interests: 'Robotics & IoT, Sustainable Energy, Digital Arts & Media, Financial Tech'
    }));
    setUserSkills([
      { 
        skillId: 'graphic_design', 
        proficiency: 'Advanced',
        indicativeProficiency: 'Advanced',
        evidenceLevel: 'High evidence',
        lastAssessedDate: '2026-03-12',
        attemptsCount: 3,
        latestScorePercentage: 94,
        latestRubricScore: 20
      },
      { 
        skillId: 'coding', 
        proficiency: 'Strong',
        indicativeProficiency: 'Strong',
        evidenceLevel: 'High evidence',
        lastAssessedDate: '2026-03-10',
        attemptsCount: 2,
        latestScorePercentage: 86,
        latestRubricScore: 18
      },
      { 
        skillId: 'communication', 
        proficiency: 'Strong',
        indicativeProficiency: 'Strong',
        evidenceLevel: 'Moderate evidence',
        lastAssessedDate: '2026-03-06',
        attemptsCount: 2,
        latestScorePercentage: 82,
        latestRubricScore: 17
      },
      { 
        skillId: 'financial_literacy', 
        proficiency: 'Intermediate',
        indicativeProficiency: 'Intermediate',
        evidenceLevel: 'Moderate evidence',
        lastAssessedDate: '2026-03-02',
        attemptsCount: 1,
        latestScorePercentage: 74,
        latestRubricScore: 15
      },
      { 
        skillId: 'marketing', 
        proficiency: 'Developing',
        indicativeProficiency: 'Developing',
        evidenceLevel: 'Moderate evidence',
        lastAssessedDate: '2026-02-24',
        attemptsCount: 1,
        latestScorePercentage: 64,
        latestRubricScore: 13
      },
      { 
        skillId: 'electronics', 
        proficiency: 'Beginner',
        indicativeProficiency: 'Foundation',
        evidenceLevel: 'Limited evidence',
        lastAssessedDate: '2026-02-18',
        attemptsCount: 1,
        latestScorePercentage: 52,
        latestRubricScore: 10
      },
      { 
        skillId: 'robotics', 
        proficiency: 'Intermediate'
        // Unassessed / needs assessment
      }
    ]);
  }, []);

  const setSystemRole = useCallback((systemRole: UserSystemRole) => {
    setProfile(prev => ({
      ...prev,
      systemRole,
      role: systemRole === 'admin' ? 'Admin' : (prev.role === 'Admin' ? 'Student' : prev.role)
    }));
  }, []);

  const isAdministrator = useMemo(() => {
    return profile?.systemRole === 'admin' || profile?.role === 'Admin';
  }, [profile?.systemRole, profile?.role]);

  const isProfileComplete = Boolean(
    profile?.name && 
    profile.name.trim() !== '' && 
    profile?.role && 
    profile.role !== '' && 
    userSkills.length > 0
  );

  return (
    <ProfileContext.Provider value={{
      profile,
      setProfile,
      userSkills,
      customSkills,
      allSkills,
      customOpportunities,
      isAdministrator,
      addSkill,
      addCustomSkill,
      addCustomOpportunity,
      removeSkill,
      updateProficiency,
      updateAssessedProficiency,
      getSkillDetails,
      isProfileComplete,
      clearData,
      triggerDemoMode,
      setSystemRole
    }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
