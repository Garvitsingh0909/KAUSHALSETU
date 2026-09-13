/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — DYNAMIC ASSESSMENT SYNTHESIZER
 * Automatically generates a complete, authentic Assessment Profile with Questions,
 * Practical Tasks, and Multi-Criteria Rubrics whenever a new custom skill is created.
 */

import { AssessmentProfile, QuestionItem, PracticalTask, TaskRubricCriterion } from '../assessmentTypes';
import { SkillCategory } from '../skills';

export function generateDynamicAssessmentForSkill(
  skillId: string, 
  skillName?: string, 
  category?: SkillCategory | string,
  skillDetails?: {
    description?: string;
    applications?: string[];
    problemsSolved?: string[];
    opportunities?: string[];
  }
): AssessmentProfile {
  const cleanId = (skillId || 'custom_skill').trim().toLowerCase().replace(/\s+/g, '_');
  const resolvedName = (skillName || cleanId.replace(/_/g, ' ')).replace(/\b\w/g, l => l.toUpperCase());
  const resolvedCategory = (category as SkillCategory) || 'Technical';
  
  const desc = skillDetails?.description || `Application and mastery of ${resolvedName}`;
  const app1 = skillDetails?.applications?.[0] || `Practical ${resolvedName} Solution`;
  const app2 = skillDetails?.applications?.[1] || `Workflow optimization in ${resolvedName}`;
  const problem1 = skillDetails?.problemsSolved?.[0] || `Inefficiency and errors in ${resolvedName}`;

  // Domain-specific task starter templates based on category
  let taskTitle = `Design & Execute a Baseline ${resolvedName} Deliverable`;
  let taskInstructions = `Apply the principles of ${resolvedName} to produce a verifiable outcome that solves a practical problem. Document your method, key design choices, testing results, and reflection.`;
  let starterTemplate = `// Deliverable for: ${resolvedName}
// Category: ${resolvedCategory}

1. Objective:
   - State the target problem you are addressing with ${resolvedName}.

2. Core Methodology & Execution Steps:
   - Step 1: Requirements & Safety/Standards Check
   - Step 2: Implementation / Execution
   - Step 3: Verification & Quality Testing

3. Evidence Output / Links / Code / Artifacts:
   - [Provide text, links, or file summary here]

4. Self-Reflection:
   - What went well?
   - What would you improve in the next iteration?`;

  let expectedOutput = `A structured, verifiable deliverable demonstrating hands-on proficiency in ${resolvedName}, meeting baseline safety, quality, and functional standards.`;

  if (resolvedCategory === 'Technical') {
    taskTitle = `Implement & Verify a Functional ${resolvedName} Prototype`;
    taskInstructions = `Build and test a functional component or script addressing ${app1}. Ensure clean modular structure, error handling, and documented edge-case verification.`;
    starterTemplate = `/**
 * Deliverable: ${resolvedName} Prototype
 * Target: ${app1}
 */

// Step 1: Input Data / Parameters Definition
const inputConfig = {
  projectName: "${resolvedName} Demonstration",
  targetGoal: "${app1}",
  timestamp: new Date().toISOString()
};

// Step 2: Core Execution Logic / Implementation
export function executeSolution(params: any) {
  // TODO: Implement solution logic
  console.log("Executing ${resolvedName} pipeline...", params);
  return { success: true, timestamp: Date.now() };
}

// Step 3: Verification Test Cases
// - Test Normal Case: Verify expected output
// - Test Edge Case: Empty input or boundary condition`;
    expectedOutput = `Functional logic or schematic resolving ${problem1} with zero critical defects and verified test cases.`;
  } else if (resolvedCategory === 'Creative') {
    taskTitle = `Create a Refined ${resolvedName} Asset & Style System`;
    taskInstructions = `Produce an original creative asset (or comprehensive design brief) for ${app1}. Articulate your visual hierarchy, compositional logic, color/typography choices, and export formats.`;
    starterTemplate = `/* Creative Brief & Deliverable: ${resolvedName} */
Target Project: ${app1}

1. Visual Direction & Hierarchy:
   - Core focal point and visual intent.
   - Primary and secondary elements.

2. Palette & Composition:
   - Color specifications / lighting setup / styling parameters.
   - Balance, spacing, and contrast considerations.

3. Deliverable Asset Links & Specifications:
   - Format (PNG, SVG, Vector, Video, Audio, Figma Link):
   - Resolution / Dimensions:

4. Creative Evaluation:
   - How does this deliverable evoke the intended brand emotion or audience message?`;
    expectedOutput = `High-resolution original asset or portfolio-ready piece adhering to standard visual/compositional principles.`;
  } else if (resolvedCategory === 'Communication') {
    taskTitle = `Draft & Deliver a Persuasive ${resolvedName} Framework`;
    taskInstructions = `Draft a structured communication piece (pitch script, briefing document, or interview synthesis) addressing ${app1}. Focus on active empathy, clarity of message, and audience engagement.`;
    starterTemplate = `## Communication Brief: ${resolvedName}
Target Audience / Stakeholder: ${app1}

1. Context & Objective:
   - Why is this message important now?

2. Key Message Pillars (3-Point Structure):
   - Pillar A: Core Pain Point / Opportunity
   - Pillar B: Proposed Pathway / Value Proposition
   - Pillar C: Call to Action & Mutual Benefit

3. Script / Dialogue / Report Content:
   [Draft your full script or report here]

4. Delivery & Empathy Strategy:
   - Tone, pacing, non-verbal cues, and anticipated audience questions.`;
    expectedOutput = `Clear, structured communication draft with well-defined call to action and audience empathy.`;
  } else if (resolvedCategory === 'Practical') {
    taskTitle = `Standard Operating Procedure & Execution: ${resolvedName}`;
    taskInstructions = `Execute a practical hands-on task in ${resolvedName}. Document the preparation, tool safety check, step-by-step physical execution, and quality inspection criteria.`;
    starterTemplate = `# Practical Execution Log: ${resolvedName}
Task: ${app1}

1. Material & Tool Checklist:
   - Required tools / equipment:
   - Safety gear / PPE:

2. Step-by-Step Execution Sequence:
   - Phase 1: Setup & Calibration
   - Phase 2: Core Physical Action / Fabrication / Processing
   - Phase 3: Finishing & Clean-up

3. Quality Inspection Checklist:
   - [ ] Tolerance / Finish / Safety / Taste / Fit verified
   - [ ] No structural defects or hazards observed

4. Troubleshooting Log:
   - Unexpected issue encountered and corrective action taken:`;
    expectedOutput = `Documented physical execution or prototype demonstrating proper tool safety, correct technique, and quality standards.`;
  } else if (resolvedCategory === 'Entrepreneurial') {
    taskTitle = `Formulate a Complete ${resolvedName} Action Plan & Model`;
    taskInstructions = `Develop a quantitative strategy or action plan using ${resolvedName} to solve ${problem1}. Include customer assumptions, unit metrics, risk mitigations, and milestone timeline.`;
    starterTemplate = `# Strategic Model: ${resolvedName}
Target Venture / Opportunity: ${app1}

1. Problem Statement & Value Proposition:
   - Addressing: ${problem1}

2. Quantitative Model / Strategic Framework:
   - Metrics / Cost Structure / Funnel Stages / Pricing:
   - Target KPI / Milestone:

3. Implementation Plan (4-Week Horizon):
   - Week 1: Validation & Research
   - Week 2: Prototype / Outreach Launch
   - Week 3: Iteration & Metric Tracking
   - Week 4: Scaling / Review

4. Risk & Contingency Management:
   - Key Risk 1 -> Mitigation:`;
    expectedOutput = `Comprehensive strategic framework with verifiable metrics, realistic timeline, and risk mitigations.`;
  }

  // 4 Standard, transparent Rubric Criteria
  const rubric: TaskRubricCriterion[] = [
    {
      id: 'crit_execution',
      name: 'Technical & Functional Execution',
      maxPoints: 5,
      description: `Demonstrates sound execution technique and delivers a workable outcome in ${resolvedName}.`,
      levelDescriptors: {
        5: `Flawless execution meeting or exceeding all specified standards for ${resolvedName}.`,
        3: 'Functional execution with minor non-blocking flaws or omissions.',
        1: 'Incomplete or non-functional execution.'
      }
    },
    {
      id: 'crit_problem_solving',
      name: 'Problem-Solving & Methodological Rigor',
      maxPoints: 5,
      description: `Applies structured problem-solving to overcome constraints and optimize results.`,
      levelDescriptors: {
        5: 'Methodical root-cause handling, clear edge-case testing, and adaptive resilience.',
        3: 'Basic problem-solving applied; resolves standard difficulties.',
        1: 'Lack of systematic approach or inability to recover from setbacks.'
      }
    },
    {
      id: 'crit_quality_standards',
      name: 'Quality, Safety & Best Practices',
      maxPoints: 5,
      description: `Adheres to industry or craft standards, safety protocols, and maintainable formatting.`,
      levelDescriptors: {
        5: 'Exemplary standard adherence, robust safety/cleanliness, and professional documentation.',
        3: 'Acceptable standards with room for better consistency or refinement.',
        1: 'Disregards standard safety, hygiene, or structural conventions.'
      }
    },
    {
      id: 'crit_reflection_communication',
      name: 'Reflection & Domain Communication',
      maxPoints: 5,
      description: `Articulates decisions clearly and reflects constructively on self-performance.`,
      levelDescriptors: {
        5: 'Crisp, insightful articulation using accurate domain terminology and honest self-critique.',
        3: 'Understandable summary with minor terminology gaps.',
        1: 'Vague, superficial, or missing self-evaluation.'
      }
    }
  ];

  const practicalTask: PracticalTask = {
    id: `task_${cleanId}`,
    skillId: cleanId,
    title: taskTitle,
    instructions: taskInstructions,
    starterTemplate,
    expectedOutput,
    totalRubricPoints: 20,
    timeEstimateMinutes: 20,
    demonstrationOptions: ['text', 'link', 'file'],
    rubric
  };

  // Questions spanning 5 difficulties and multiple archetypes
  const questions: QuestionItem[] = [
    {
      id: `q_${cleanId}_01`,
      skillId: cleanId,
      difficulty: 'Foundation',
      type: 'multiple_choice',
      competency: 'Core Principles & Scoping',
      question: `What is the foundational first principle when initiating any project in ${resolvedName}?`,
      options: [
        'Clearly define objectives, evaluate constraints, and verify safety/quality requirements before starting.',
        'Execute rapidly without inspecting inputs or client requirements.',
        'Rely exclusively on guess-work and skip all documentation.',
        'Assume all variables are static and avoid checking intermediate outputs.'
      ],
      correctAnswer: 'Clearly define objectives, evaluate constraints, and verify safety/quality requirements before starting.',
      explanation: `Systematic scoping and requirement verification in ${resolvedName} prevent expensive rework, safety hazards, and misaligned deliverables.`,
      validationStatus: 'Validated',
      version: 1
    },
    {
      id: `q_${cleanId}_02`,
      skillId: cleanId,
      difficulty: 'Foundation',
      type: 'true_false',
      competency: 'Quality Standards',
      question: `In professional ${resolvedName}, evaluating deliverables against objective rubric criteria eliminates subjective bias and ensures repeatable quality.`,
      options: ['True', 'False'],
      correctAnswer: 'True',
      explanation: 'Objective rubrics and measurable benchmarks provide clear feedback loops for iterative craftsmanship.',
      validationStatus: 'Validated',
      version: 1
    },
    {
      id: `q_${cleanId}_03`,
      skillId: cleanId,
      difficulty: 'Developing',
      type: 'scenario',
      competency: 'Troubleshooting & Iteration',
      scenarioContext: `While executing a ${resolvedName} task, the preliminary output fails to meet the expected performance benchmark or client standard.`,
      question: 'What is the most disciplined and effective next step?',
      options: [
        'Isolate the root cause by examining inputs, reviewing recent changes, and testing targeted hypotheses.',
        'Discard the entire project immediately without diagnosis.',
        'Blame external tools and deliver the defective output as-is.',
        'Ignore the discrepancy and rush to completion.'
      ],
      correctAnswer: 'Isolate the root cause by examining inputs, reviewing recent changes, and testing targeted hypotheses.',
      explanation: 'Systematic root-cause diagnosis builds true diagnostic capability and prevents recurrence of defects.',
      validationStatus: 'Validated',
      version: 1
    },
    {
      id: `q_${cleanId}_04`,
      skillId: cleanId,
      difficulty: 'Intermediate',
      type: 'multi_select',
      competency: 'Industry Best Practices',
      question: `Which of the following professional practices elevate performance in ${resolvedName}? (Select all that apply)`,
      options: [
        'Maintaining clean documentation, versioning, or process logs',
        'Validating outputs with objective tests, peer reviews, or real user feedback',
        'Refining core fundamentals through deliberate, repetitive practice',
        'Skipping verification whenever working under deadline pressure'
      ],
      correctAnswer: [
        'Maintaining clean documentation, versioning, or process logs',
        'Validating outputs with objective tests, peer reviews, or real user feedback',
        'Refining core fundamentals through deliberate, repetitive practice'
      ],
      explanation: 'Disciplined documentation, multi-perspective validation, and deliberate practice define true mastery.',
      validationStatus: 'Validated',
      version: 1
    },
    {
      id: `q_${cleanId}_05`,
      skillId: cleanId,
      difficulty: 'Strong',
      type: 'scenario',
      competency: 'Constraint Optimization & Trade-Offs',
      scenarioContext: `You are leading a high-stakes ${resolvedName} initiative where time and budget are cut by 40%.`,
      question: 'How should you manage trade-offs to protect core value without compromising safety or ethics?',
      options: [
        'Focus resources on non-negotiable core functionality (MVP), maintain strict safety/quality standards, and defer non-critical secondary features.',
        'Eliminate all testing and quality controls to finish faster.',
        'Deliver a superficial facade that looks complete but fails under load.',
        'Abandon the project without communicating with stakeholders.'
      ],
      correctAnswer: 'Focus resources on non-negotiable core functionality (MVP), maintain strict safety/quality standards, and defer non-critical secondary features.',
      explanation: 'Strategic scoping and prioritizing core functionality preserves integrity and delivers real value within constraints.',
      validationStatus: 'Validated',
      version: 1
    },
    {
      id: `q_${cleanId}_06`,
      skillId: cleanId,
      difficulty: 'Advanced',
      type: 'ordering',
      competency: 'Lifecycle Governance',
      question: `Arrange the canonical lifecycle stages for a professional ${resolvedName} project in correct chronological order:`,
      options: [
        'Problem Discovery & Scope Formulation',
        'System Architecture & Resource Planning',
        'Core Execution & Iterative Prototyping',
        'Rigorous Quality Validation & User Testing',
        'Deployment, Handover & Continuous Improvement'
      ],
      correctAnswer: [0, 1, 2, 3, 4],
      explanation: 'Professional projects progress systematically from discovery -> planning -> execution -> validation -> handover.',
      validationStatus: 'Validated',
      version: 1
    }
  ];

  return {
    skillId: cleanId,
    skillName: resolvedName,
    category: resolvedCategory,
    version: 1,
    published: true,
    lastUpdated: new Date().toISOString().split('T')[0],
    commonMistakes: [
      {
        mistake: `Starting execution in ${resolvedName} without verifying constraints and prerequisites.`,
        guidance: 'Always conduct a structured 5-minute pre-flight checklist before commencing work.'
      },
      {
        mistake: `Working in a silo without validating intermediate deliverables with real users or criteria.`,
        guidance: 'Establish small, frequent review milestones to catch deviations early.'
      },
      {
        mistake: `Failing to document key parameters and troubleshooting steps for future reference.`,
        guidance: 'Keep a clean digital or physical log of configurations, test metrics, and lessons learned.'
      }
    ],
    recommendedNextSkills: ['problem_solving', 'communication', 'project_management'],
    recommendedProjects: [
      `Complete Baseline ${resolvedName} Solution for Local Stakeholder`,
      `Interactive Community Workshop or Guide on ${resolvedName}`,
      `Optimized ${resolvedName} Workflow Portfolio Case Study`
    ],
    practicalTask,
    questions
  };
}
