/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — REVENUE ESTIMATES & FINANCIAL BENCHMARKS UTILITY
 * Standardized market-aligned revenue estimates, hourly rates, project pricing, and skill combination multipliers.
 */

import { Proficiency, SkillCategory, Skill } from '../data/skills';

export interface SkillRevenueBenchmark {
  hourlyRateINR: { beginner: number; intermediate: number; advanced: number };
  projectRateINR: { min: number; avg: number; max: number };
  monthlyEarningPotentialINR: { beginner: number; intermediate: number; advanced: number };
  demandLevel: 'High' | 'Very High' | 'Moderate';
  monetizationModels: string[];
  typicalDeliverables: string[];
  combinationBonusMultiplier: number;
}

// Category-level default benchmarks
const CATEGORY_BENCHMARKS: Record<SkillCategory, SkillRevenueBenchmark> = {
  Technical: {
    hourlyRateINR: { beginner: 250, intermediate: 600, advanced: 1400 },
    projectRateINR: { min: 1500, avg: 5000, max: 15000 },
    monthlyEarningPotentialINR: { beginner: 3000, intermediate: 8000, advanced: 20000 },
    demandLevel: 'Very High',
    monetizationModels: ['Per Project', 'Monthly Retainer', 'Custom Automation Sales'],
    typicalDeliverables: ['Web Apps', 'Automation Scripts', 'Database Schemas', 'IoT Enclosures'],
    combinationBonusMultiplier: 1.35
  },
  Creative: {
    hourlyRateINR: { beginner: 200, intermediate: 500, advanced: 1200 },
    projectRateINR: { min: 1000, avg: 3500, max: 12000 },
    monthlyEarningPotentialINR: { beginner: 2500, intermediate: 6500, advanced: 16000 },
    demandLevel: 'Very High',
    monetizationModels: ['Per Project', 'Social Media Retainer', 'Digital Asset Sales'],
    typicalDeliverables: ['Brand Logos', 'Social Promo Reels', 'Product Photography Packs', 'UI Wireframes'],
    combinationBonusMultiplier: 1.30
  },
  Communication: {
    hourlyRateINR: { beginner: 180, intermediate: 450, advanced: 1000 },
    projectRateINR: { min: 800, avg: 2500, max: 8000 },
    monthlyEarningPotentialINR: { beginner: 2000, intermediate: 5000, advanced: 12500 },
    demandLevel: 'High',
    monetizationModels: ['Hourly Tutoring', 'Grant Writing Commission', 'Public Speaking Coaching'],
    typicalDeliverables: ['1-on-1 Tutoring Sessions', 'Sponsorship Proposals', 'Copywriting Packages'],
    combinationBonusMultiplier: 1.25
  },
  Practical: {
    hourlyRateINR: { beginner: 160, intermediate: 400, advanced: 900 },
    projectRateINR: { min: 600, avg: 2000, max: 6000 },
    monthlyEarningPotentialINR: { beginner: 1800, intermediate: 4800, advanced: 11000 },
    demandLevel: 'High',
    monetizationModels: ['Direct Unit Sales', 'Hardware Repair Fees', 'Subscription Produce Packs'],
    typicalDeliverables: ['Upcycled Bags/Furniture', 'Device Screen Repair', 'Preserved Food Jams', 'Hydroponic Salad Packs'],
    combinationBonusMultiplier: 1.20
  },
  Entrepreneurial: {
    hourlyRateINR: { beginner: 220, intermediate: 550, advanced: 1300 },
    projectRateINR: { min: 1200, avg: 4000, max: 12000 },
    monthlyEarningPotentialINR: { beginner: 2800, intermediate: 7000, advanced: 18000 },
    demandLevel: 'Very High',
    monetizationModels: ['Management Consulting', 'Unit Economics Advisory', 'Event Sponsorship Share'],
    typicalDeliverables: ['Pricing Calculators', 'Marketing Campaigns', 'Event Sponsorship Decks'],
    combinationBonusMultiplier: 1.40
  }
};

// Skill-specific custom overrides
const SKILL_OVERRIDES: Record<string, Partial<SkillRevenueBenchmark>> = {
  coding: {
    hourlyRateINR: { beginner: 300, intermediate: 750, advanced: 1800 },
    monthlyEarningPotentialINR: { beginner: 3500, intermediate: 9500, advanced: 24000 },
    demandLevel: 'Very High'
  },
  graphic_design: {
    hourlyRateINR: { beginner: 220, intermediate: 550, advanced: 1300 },
    monthlyEarningPotentialINR: { beginner: 2800, intermediate: 7000, advanced: 17000 },
    demandLevel: 'Very High'
  },
  electronics: {
    hourlyRateINR: { beginner: 250, intermediate: 650, advanced: 1500 },
    monthlyEarningPotentialINR: { beginner: 3000, intermediate: 8500, advanced: 21000 }
  },
  photography: {
    hourlyRateINR: { beginner: 250, intermediate: 600, advanced: 1400 },
    projectRateINR: { min: 1500, avg: 4500, max: 12000 },
    monthlyEarningPotentialINR: { beginner: 3000, intermediate: 8000, advanced: 18000 }
  },
  financial_literacy: {
    hourlyRateINR: { beginner: 200, intermediate: 500, advanced: 1200 },
    monthlyEarningPotentialINR: { beginner: 2500, intermediate: 6000, advanced: 15000 }
  },
  python_programming: {
    hourlyRateINR: { beginner: 280, intermediate: 700, advanced: 1700 },
    monthlyEarningPotentialINR: { beginner: 3500, intermediate: 9000, advanced: 22000 },
    demandLevel: 'Very High'
  },
  agritech_sensors: {
    hourlyRateINR: { beginner: 300, intermediate: 750, advanced: 1600 },
    monthlyEarningPotentialINR: { beginner: 3200, intermediate: 8800, advanced: 20000 },
    demandLevel: 'High'
  },
  drone_piloting: {
    hourlyRateINR: { beginner: 350, intermediate: 900, advanced: 2000 },
    monthlyEarningPotentialINR: { beginner: 4000, intermediate: 11000, advanced: 25000 },
    demandLevel: 'Very High'
  },
  animation_motion_graphics: {
    hourlyRateINR: { beginner: 250, intermediate: 600, advanced: 1400 },
    monthlyEarningPotentialINR: { beginner: 3000, intermediate: 8000, advanced: 19000 },
    demandLevel: 'Very High'
  },
  interior_3d_spatial: {
    hourlyRateINR: { beginner: 300, intermediate: 700, advanced: 1500 },
    monthlyEarningPotentialINR: { beginner: 3500, intermediate: 8500, advanced: 21000 },
    demandLevel: 'High'
  },
  mushroom_cultivation: {
    hourlyRateINR: { beginner: 200, intermediate: 500, advanced: 1200 },
    monthlyEarningPotentialINR: { beginner: 2800, intermediate: 7500, advanced: 18000 },
    demandLevel: 'High'
  },
  terrazzo_resin_craft: {
    hourlyRateINR: { beginner: 220, intermediate: 480, advanced: 1100 },
    monthlyEarningPotentialINR: { beginner: 2400, intermediate: 6200, advanced: 15000 },
    demandLevel: 'Moderate'
  },
  crowdfunding_pitching: {
    hourlyRateINR: { beginner: 300, intermediate: 800, advanced: 1800 },
    monthlyEarningPotentialINR: { beginner: 3500, intermediate: 9500, advanced: 23000 },
    demandLevel: 'Very High'
  }
};

/**
 * Retrieves the comprehensive revenue benchmark for a given skill and proficiency level.
 */
export function getSkillRevenueBenchmark(skillId: string, category: SkillCategory = 'Technical'): SkillRevenueBenchmark {
  const base = CATEGORY_BENCHMARKS[category] || CATEGORY_BENCHMARKS.Technical;
  const override = SKILL_OVERRIDES[skillId] || {};

  return {
    ...base,
    ...override,
    hourlyRateINR: { ...base.hourlyRateINR, ...override.hourlyRateINR },
    projectRateINR: { ...base.projectRateINR, ...override.projectRateINR },
    monthlyEarningPotentialINR: { ...base.monthlyEarningPotentialINR, ...override.monthlyEarningPotentialINR }
  };
}

/**
 * Calculates estimated monthly earning potential for a skill at a given proficiency.
 */
export function getMonthlyPotentialForProficiency(benchmark: SkillRevenueBenchmark, proficiency: Proficiency): number {
  switch (proficiency) {
    case 'Beginner':
      return benchmark.monthlyEarningPotentialINR.beginner;
    case 'Developing':
      return Math.round((benchmark.monthlyEarningPotentialINR.beginner + benchmark.monthlyEarningPotentialINR.intermediate) / 2);
    case 'Intermediate':
      return benchmark.monthlyEarningPotentialINR.intermediate;
    case 'Strong':
      return Math.round((benchmark.monthlyEarningPotentialINR.intermediate + benchmark.monthlyEarningPotentialINR.advanced) / 2);
    case 'Advanced':
      return benchmark.monthlyEarningPotentialINR.advanced;
    default:
      return benchmark.monthlyEarningPotentialINR.beginner;
  }
}

/**
 * Calculates hourly rate for a skill at a given proficiency.
 */
export function getHourlyRateForProficiency(benchmark: SkillRevenueBenchmark, proficiency: Proficiency): number {
  switch (proficiency) {
    case 'Beginner':
      return benchmark.hourlyRateINR.beginner;
    case 'Developing':
      return Math.round((benchmark.hourlyRateINR.beginner + benchmark.hourlyRateINR.intermediate) / 2);
    case 'Intermediate':
      return benchmark.hourlyRateINR.intermediate;
    case 'Strong':
      return Math.round((benchmark.hourlyRateINR.intermediate + benchmark.hourlyRateINR.advanced) / 2);
    case 'Advanced':
      return benchmark.hourlyRateINR.advanced;
    default:
      return benchmark.hourlyRateINR.beginner;
  }
}

export interface UserSkillEarningAnalysis {
  skillId: string;
  skillName: string;
  category: SkillCategory;
  proficiency: Proficiency;
  monthlyPotentialINR: number;
  hourlyRateINR: number;
  projectRateAvgINR: number;
  demandLevel: string;
}

export interface UserFinancialCapacity {
  totalMonthlyPotentialINR: number;
  baseMonthlySumINR: number;
  combinationMultiplier: number;
  combinationBonusINR: number;
  skillCount: number;
  skillBreakdown: UserSkillEarningAnalysis[];
}

/**
 * Analyzes total monthly earning capacity based on user's active skills and proficiencies.
 */
export function calculateUserFinancialCapacity(
  userSkills: { skillId: string; proficiency: Proficiency }[],
  allSkills: Skill[]
): UserFinancialCapacity {
  if (!userSkills || userSkills.length === 0) {
    return {
      totalMonthlyPotentialINR: 0,
      baseMonthlySumINR: 0,
      combinationMultiplier: 1.0,
      combinationBonusINR: 0,
      skillCount: 0,
      skillBreakdown: []
    };
  }

  const breakdown: UserSkillEarningAnalysis[] = [];
  let baseMonthlySum = 0;

  userSkills.forEach(us => {
    const skillObj = allSkills.find(s => s.id === us.skillId);
    const category = skillObj?.category || 'Technical';
    const benchmark = getSkillRevenueBenchmark(us.skillId, category);

    const monthlyPotential = getMonthlyPotentialForProficiency(benchmark, us.proficiency);
    const hourlyRate = getHourlyRateForProficiency(benchmark, us.proficiency);

    baseMonthlySum += monthlyPotential;

    breakdown.push({
      skillId: us.skillId,
      skillName: skillObj ? skillObj.name : us.skillId,
      category,
      proficiency: us.proficiency,
      monthlyPotentialINR: monthlyPotential,
      hourlyRateINR: hourlyRate,
      projectRateAvgINR: benchmark.projectRateINR.avg,
      demandLevel: benchmark.demandLevel
    });
  });

  // Calculate synergy multiplier based on skill count and cross-domain categories
  const categories = new Set(breakdown.map(b => b.category));
  let multiplier = 1.0;
  if (breakdown.length >= 2) multiplier += 0.15;
  if (breakdown.length >= 4) multiplier += 0.10;
  if (categories.size >= 2) multiplier += 0.15; // Cross-domain synergy bonus

  // Cap max multiplier at 1.5x
  multiplier = Math.min(1.5, multiplier);

  const totalMonthlyPotentialINR = Math.round(baseMonthlySum * multiplier);
  const combinationBonusINR = totalMonthlyPotentialINR - baseMonthlySum;

  return {
    totalMonthlyPotentialINR,
    baseMonthlySumINR: baseMonthlySum,
    combinationMultiplier: Math.round(multiplier * 100) / 100,
    combinationBonusINR,
    skillCount: userSkills.length,
    skillBreakdown: breakdown
  };
}
