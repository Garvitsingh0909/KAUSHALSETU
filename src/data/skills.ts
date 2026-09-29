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
  realWorldDefinition?: string;
  toolStack?: string[];
  averageHourlyRate?: string;
  monthlyRevenuePotential?: string;
  projectRateRange?: string;
  marketDemandRating?: string;
  monetizationModels?: string[];
  applications: string[];
  problemsSolved: string[];
  opportunities: string[];
  nextSkills: string[];
}

export const SKILLS_DB: Skill[] = COMPREHENSIVE_SKILLS_DB.map(s => {
  const lower = s.id.toLowerCase();
  let defaultTools = ["Industry Standard Tools", "SOPs", "Digital Workspace"];

  if (s.category === 'Technical' || lower.includes('code') || lower.includes('iot') || lower.includes('data')) {
    defaultTools = ["React & Node.js", "Python & Scripts", "PostgreSQL", "Git & GitHub", "Tailwind CSS"];
  } else if (s.category === 'Creative' || lower.includes('design') || lower.includes('photo') || lower.includes('video')) {
    defaultTools = ["Figma & UI Kits", "Adobe CC & Canva", "CapCut", "Color Systems"];
  } else if (s.category === 'Entrepreneurial' || lower.includes('finance') || lower.includes('market') || lower.includes('sale')) {
    defaultTools = ["Spreadsheets & Financial Models", "Payment Gateways", "CRM & Email", "Ads Manager"];
  } else if (s.category === 'Communication') {
    defaultTools = ["Copywriting Rules", "Presentation Decks", "SEO Keyword Tools", "Public Speaking"];
  }

  return {
    id: s.id,
    name: s.name,
    category: s.category,
    description: s.description,
    realWorldDefinition: `${s.name} is a practical vocational skill focused on real-world project execution, problem solving, and client value delivery.`,
    toolStack: defaultTools,
    applications: s.applications || [],
    problemsSolved: s.problemsSolved || [],
    opportunities: s.opportunities || [],
    nextSkills: s.nextSkills || []
  };
});

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
