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
  // Compute default high-revenue market benchmarks based on skill category and ID
  const lower = s.id.toLowerCase();
  let hourlyRate = "$125 - $285/hr";
  let monthlyRev = "$18,500 - $48,000/mo";
  let projectRange = "$5,000 - $32,000 / contract";
  let defaultTools = ["Industry Frameworks", "Standard Operating Procedures", "Cloud Infrastructure", "Digital Automation"];

  if (s.category === 'Technical' || lower.includes('code') || lower.includes('iot') || lower.includes('data')) {
    hourlyRate = "$145 - $320/hr";
    monthlyRev = "$24,000 - $65,000/mo";
    projectRange = "$8,500 - $45,000 / contract";
    defaultTools = ["React & Node.js", "Python & PyTorch", "PostgreSQL & Vector DBs", "Gemini API", "Docker", "Tailwind CSS"];
  } else if (s.category === 'Creative' || lower.includes('design') || lower.includes('photo') || lower.includes('video')) {
    hourlyRate = "$115 - $250/hr";
    monthlyRev = "$16,500 - $42,000/mo";
    projectRange = "$5,000 - $28,000 / contract";
    defaultTools = ["Figma & Design Systems", "Adobe Creative Cloud", "After Effects", "Webflow & Framer", "Midjourney & AI Studio"];
  } else if (s.category === 'Entrepreneurial' || lower.includes('finance') || lower.includes('market') || lower.includes('sale')) {
    hourlyRate = "$150 - $350/hr";
    monthlyRev = "$28,000 - $85,000/mo";
    projectRange = "$12,000 - $65,000 / contract";
    defaultTools = ["Stripe & Billing API", "Google Analytics 4", "HubSpot CRM", "Financial Unit Economics Models", "Meta Ads Manager"];
  } else if (s.category === 'Communication') {
    hourlyRate = "$120 - $260/hr";
    monthlyRev = "$15,000 - $38,000/mo";
    projectRange = "$4,000 - $22,000 / contract";
    defaultTools = ["Conversion Copywriting Standards", "Notion Executive Decks", "SEO Intelligence", "CRM Pipelines", "Public Relations Suite"];
  }

  return {
    id: s.id,
    name: s.name,
    category: s.category,
    description: s.description,
    realWorldDefinition: `${s.name} is a high-value vocational discipline encompassing hands-on execution, industry standard toolchains, and strategic client value creation.`,
    toolStack: defaultTools,
    averageHourlyRate: hourlyRate,
    monthlyRevenuePotential: monthlyRev,
    projectRateRange: projectRange,
    marketDemandRating: "Exceptional (98th Percentile)",
    monetizationModels: [
      `High-Ticket Enterprise Monthly Retainer (${monthlyRev})`,
      `Performance-Based Growth & Conversion Royalty`,
      `Turnkey Fixed-Scope Project Delivery (${projectRange})`,
      `Specialized Micro-SaaS & Automated Workflow License`
    ],
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
