/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — MODULE 2: SKILL ASSESSMENT & QUESTION BANK DATABASE (PHASE 5B)
 * Comprehensive, verified pre-seeded assessment profiles across vocational & academic skills.
 */

import { AssessmentProfile } from './assessmentTypes';
import { TECHNICAL_ASSESSMENTS } from './assessments/technicalAssessments';
import { CREATIVE_ASSESSMENTS } from './assessments/creativeAssessments';
import { COMMUNICATION_ASSESSMENTS } from './assessments/communicationAssessments';
import { PRACTICAL_ASSESSMENTS } from './assessments/practicalAssessments';
import { ENTREPRENEURIAL_ASSESSMENTS } from './assessments/entrepreneurialAssessments';
import { generateDynamicAssessmentForSkill } from './assessments/dynamicGenerator';

// Consolidated master array of all curated assessment profiles
export const INITIAL_ASSESSMENT_PROFILES: AssessmentProfile[] = [
  ...TECHNICAL_ASSESSMENTS,
  ...CREATIVE_ASSESSMENTS,
  ...COMMUNICATION_ASSESSMENTS,
  ...PRACTICAL_ASSESSMENTS,
  ...ENTREPRENEURIAL_ASSESSMENTS
];

/**
 * Helper to get an assessment profile by skill ID, with intelligent dynamic
 * synthesis whenever a skill is created or not yet explicitly present.
 */
export function getAssessmentProfileForSkill(
  skillId: string, 
  skillName?: string, 
  category?: any,
  skillDetails?: {
    description?: string;
    applications?: string[];
    problemsSolved?: string[];
    opportunities?: string[];
  }
): AssessmentProfile {
  if (!skillId) {
    return generateDynamicAssessmentForSkill('custom_skill', skillName, category, skillDetails);
  }

  const cleanId = skillId.trim().toLowerCase();

  // Check exact ID match or alias mapping (e.g. organic_farming -> agriculture)
  const found = INITIAL_ASSESSMENT_PROFILES.find(p => 
    p.skillId.toLowerCase() === cleanId ||
    (cleanId === 'organic_farming' && p.skillId === 'agriculture') ||
    (cleanId === 'agriculture' && p.skillId === 'organic_farming')
  );

  if (found) {
    return found;
  }

  // If not found in curated static banks (e.g. newly created custom skill by user/admin),
  // dynamically generate a complete, authentic profile tailored to its domain!
  return generateDynamicAssessmentForSkill(cleanId, skillName, category, skillDetails);
}
