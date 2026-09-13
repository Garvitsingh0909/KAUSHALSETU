/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { COMPREHENSIVE_SKILLS_DB } from './comprehensiveSkills';

export type SkillCategory =
  | 'Technical'
  | 'Creative'
  | 'Communication'
  | 'Practical'
  | 'Entrepreneurial';

export type Proficiency = 'Beginner' | 'Developing' | 'Intermediate' | 'Strong' | 'Advanced';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  applications: string[];
  problemsSolved: string[];
  opportunities: string[];
  nextSkills: string[];
}

export const SKILLS_DB: Skill[] = COMPREHENSIVE_SKILLS_DB.map(s => ({
  id: s.id,
  name: s.name,
  category: s.category,
  description: s.description,
  applications: s.applications || [],
  problemsSolved: s.problemsSolved || [],
  opportunities: s.opportunities || [],
  nextSkills: s.nextSkills || []
}));

export interface CombinedOpportunity {
  skillIds: string[];
  title: string;
  description: string;
  applications: string[];
  nextSkills: string[];
}

export function getCombination(selectedSkills: Skill[]): CombinedOpportunity | null {
  const validSkills = (selectedSkills || []).filter(s => s && s.id && s.name);
  if (validSkills.length < 2) return null;
  
  const skillIds = validSkills.map(s => s.id);
  const skillNames = validSkills.map(s => s.name);
  const title = `Interdisciplinary Specialist: ${skillNames.join(' + ')}`;
  
  const allApps = new Set<string>();
  validSkills.forEach(s => (s.applications || []).slice(0, 2).forEach(app => allApps.add(app)));
  
  const allNext = new Set<string>();
  validSkills.forEach(s => (s.nextSkills || []).slice(0, 2).forEach(ns => allNext.add(ns)));
  
  return {
    skillIds,
    title,
    description: `A unique pathway created by merging the capabilities of ${skillNames[0]} with the strengths of ${skillNames[1]}. This opens up innovative opportunities that neither skill could achieve alone.`,
    applications: Array.from(allApps).slice(0, 4),
    nextSkills: Array.from(allNext).slice(0, 4)
  };
}
