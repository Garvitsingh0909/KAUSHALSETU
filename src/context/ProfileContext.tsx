import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { Proficiency, Skill, SKILLS_DB } from '../data/skills';
import { Opportunity } from '../data/opportunities';

export interface UserProfile {
  name: string;
  role: 'Student' | 'Parent' | 'Teacher' | 'Judge' | 'Other' | '';
  schoolOrOrg: string;
  interests: string;
}

export interface UserSkill {
  skillId: string;
  proficiency: Proficiency;
}

interface ProfileContextType {
  profile: UserProfile;
  setProfile: (profile: UserProfile | ((prev: UserProfile) => UserProfile)) => void;
  userSkills: UserSkill[];
  customSkills: Skill[];
  allSkills: Skill[];
  customOpportunities: Opportunity[];
  addSkill: (skillId: string) => void;
  addCustomSkill: (skill: Skill) => void;
  addCustomOpportunity: (opp: Opportunity) => void;
  removeSkill: (skillId: string) => void;
  updateProficiency: (skillId: string, proficiency: Proficiency) => void;
  getSkillDetails: (skillId: string) => Skill | undefined;
  isProfileComplete: boolean;
  clearData: () => void;
  triggerDemoMode: () => void;
}

const defaultProfile: UserProfile = {
  name: '',
  role: '',
  schoolOrOrg: '',
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
          return parsed.filter(item => item && item.id && item.name);
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
    if (!skill || !skill.id || !skill.name) return;
    setCustomSkills(prev => {
      if (prev.some(s => s && s.id === skill.id) || SKILLS_DB.some(s => s && s.id === skill.id)) {
        return prev;
      }
      return [...prev, skill];
    });
    setUserSkills(prev => {
      if (prev.some(s => s && s.skillId === skill.id)) return prev;
      return [...prev, { skillId: skill.id, proficiency: 'Beginner' }];
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
  
  const getSkillDetails = useCallback((skillId: string): Skill | undefined => {
    if (!skillId) return undefined;
    return allSkills.find(s => s && s.id === skillId);
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
    setProfile({ name: 'Aarav Sharma', role: 'Student', schoolOrOrg: 'Delhi Public School (CBSE)', interests: 'Design, Micro-Enterprise & Technology' });
    setUserSkills([
      { skillId: 'design', proficiency: 'Strong' },
      { skillId: 'communication', proficiency: 'Advanced' },
      { skillId: 'marketing', proficiency: 'Developing' },
      { skillId: 'photography', proficiency: 'Intermediate' }
    ]);
  }, []);

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
      addSkill,
      addCustomSkill,
      addCustomOpportunity,
      removeSkill,
      updateProficiency,
      getSkillDetails,
      isProfileComplete,
      clearData,
      triggerDemoMode
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
