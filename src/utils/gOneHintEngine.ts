/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — G-ONE ASSESSMENT HINT & COGNITIVE GUIDANCE ENGINE
 * Generates context-aware, pedagogical hints for assessment questions without spoiling answers.
 * Grounds tips in Knowledge Base competencies, real-world applications, and common mental models.
 */

import { QuestionItem, QuestionDifficulty } from '../data/assessmentTypes';

export interface GOneGuidanceTip {
  corePrinciple: string;
  contextualClue: string;
  pitfallToAvoid: string;
  thoughtPrompt: string;
  realWorldContext?: string;
  confidenceScore: number;
  domainCompetency: string;
}

/**
 * Generate a context-aware tip for any assessment question using G-ONE reasoning
 */
export function generateGOneQuestionHint(
  question: QuestionItem,
  skillName: string,
  category?: string
): GOneGuidanceTip {
  const qText = (question.question || '').toLowerCase();
  const competency = question.competency || skillName || 'Core Technical Competency';
  const explanation = question.explanation || '';
  const scenario = question.scenarioContext || '';
  const code = question.codeSnippet || '';
  const qType = question.type;

  // 1. If an explicit author-provided hint exists on the question item
  if (question.hint && question.hint.trim().length > 0) {
    return {
      corePrinciple: `Mastering ${competency}`,
      contextualClue: question.hint,
      pitfallToAvoid: "Be careful not to jump to conclusions before evaluating all options or constraints provided in the prompt.",
      thoughtPrompt: `What is the primary constraint or requirement stated in this problem?`,
      realWorldContext: `Applied in standard ${skillName} workflows.`,
      confidenceScore: 98,
      domainCompetency: competency
    };
  }

  // 2. Domain-Specific Intelligence & Keyword Matchers
  // Web & Coding / React / JavaScript / Python
  if (
    qText.includes('state') || 
    qText.includes('props') || 
    qText.includes('component') ||
    qText.includes('hook') || 
    qText.includes('react')
  ) {
    return {
      corePrinciple: "Unidirectional Data Flow & State Immutability",
      contextualClue: "Remember: 'Props' flow downward from parent to child and are read-only inputs, while 'State' is maintained internally by the component and triggers re-renders upon mutation.",
      pitfallToAvoid: "Avoid confusing data that needs to change over time with static configuration passed from a parent container.",
      thoughtPrompt: "Is this data owned by the component itself, or passed in from above?",
      realWorldContext: "Essential for building responsive interactive web UIs without unpredictable UI side-effects.",
      confidenceScore: 96,
      domainCompetency: competency || "State Management & React Architecture"
    };
  }

  if (
    qText.includes('api') || 
    qText.includes('async') || 
    qText.includes('await') || 
    qText.includes('promise') || 
    qText.includes('fetch')
  ) {
    return {
      corePrinciple: "Asynchronous Execution & Non-Blocking I/O",
      contextualClue: "Network requests take unknown time. The execution thread must not freeze the UI while waiting for responses, requiring promises or async/await wrappers with error catching.",
      pitfallToAvoid: "Forgetting to handle potential network failure states (404/500) or trying to access data before the Promise resolves.",
      thoughtPrompt: "What happens if the remote server takes 3 seconds or fails to return valid JSON?",
      realWorldContext: "Underpins all modern web APIs, client-server synchronization, and database queries.",
      confidenceScore: 95,
      domainCompetency: competency || "Asynchronous Programming"
    };
  }

  if (
    qText.includes('loop') || 
    qText.includes('recursion') || 
    qText.includes('array') || 
    qText.includes('algorithm') || 
    qText.includes('sort') ||
    qText.includes('complexity')
  ) {
    return {
      corePrinciple: "Algorithmic Efficiency & Edge Case Handling",
      contextualClue: "Examine the base condition and step increment. Verify what happens at the boundary values (e.g. index 0, empty list, or maximum bounds).",
      pitfallToAvoid: "Watch out for off-by-one index mistakes or infinite termination loops.",
      thoughtPrompt: "What is the terminating condition that prevents this routine from repeating indefinitely?",
      realWorldContext: "Critical for high-performance software and data transformation pipelines.",
      confidenceScore: 94,
      domainCompetency: competency || "Algorithms & Data Structures"
    };
  }

  // Electronics / Hardware / IoT
  if (
    qText.includes('resistor') || 
    qText.includes('ohm') || 
    qText.includes('voltage') || 
    qText.includes('current') || 
    qText.includes('circuit') ||
    qText.includes('led')
  ) {
    return {
      corePrinciple: "Ohm's Law & Current-Limiting Protection",
      contextualClue: "Recall the fundamental relationship: V = I × R (Voltage = Current × Resistance). Active components like LEDs have forward voltage drops and need current limiting.",
      pitfallToAvoid: "Directly connecting low-impedance semiconductors directly across power rails without a series resistor risks thermal overload.",
      thoughtPrompt: "How much excess voltage must the resistor drop to maintain safe rated milliamp current?",
      realWorldContext: "Standard safety calculation in robotics, sensor circuits, and Arduino prototyping.",
      confidenceScore: 96,
      domainCompetency: competency || "Circuit Analysis & Component Sizing"
    };
  }

  if (
    qText.includes('sensor') || 
    qText.includes('analog') || 
    qText.includes('digital') || 
    qText.includes('gpio') || 
    qText.includes('microcontroller')
  ) {
    return {
      corePrinciple: "Signal Conversion & Peripheral Interfacing",
      contextualClue: "Distinguish between continuous analog voltage levels (requiring ADC channels) versus binary HIGH/LOW digital logic signals.",
      pitfallToAvoid: "Feeding raw 5V analog signals into a 3.3V-only microchip pin without a level shifter or divider.",
      thoughtPrompt: "Is the physical quantity continuous (like temperature) or binary (like a push button)?",
      realWorldContext: "Foundational for environmental monitoring and IoT automation systems.",
      confidenceScore: 93,
      domainCompetency: competency || "Embedded Systems & Signal Acquisition"
    };
  }

  // Business / Finance / Pricing / Entrepreneurship
  if (
    qText.includes('break-even') || 
    qText.includes('breakeven') || 
    qText.includes('margin') || 
    qText.includes('fixed cost') || 
    qText.includes('variable cost') ||
    qText.includes('price')
  ) {
    return {
      corePrinciple: "Unit Contribution & Break-Even Mechanics",
      contextualClue: "Break-even units = Total Fixed Costs ÷ (Selling Price per Unit - Variable Cost per Unit). Each unit sold contributes its profit margin toward paying off fixed overhead.",
      pitfallToAvoid: "Treating fixed overhead (like annual software subscriptions or equipment) as a variable cost per item.",
      thoughtPrompt: "How much gross cash surplus does each individual sale generate after deducting only its immediate materials?",
      realWorldContext: "The core metric used by small businesses to establish survival volume and safe product pricing.",
      confidenceScore: 97,
      domainCompetency: competency || "Unit Economics & Financial Feasibility"
    };
  }

  if (
    qText.includes('customer') || 
    qText.includes('target audience') || 
    qText.includes('market') || 
    qText.includes('value proposition') ||
    qText.includes('pitch')
  ) {
    return {
      corePrinciple: "Problem-Solution Fit & Value Articulation",
      contextualClue: "Focus on the specific, urgent pain point of the beneficiary. High-converting solutions articulate tangible benefits (time saved, money earned, friction removed) over technical feature lists.",
      pitfallToAvoid: "Defining the product features rather than the actual outcome or transformation experienced by the user.",
      thoughtPrompt: "Why would a customer pay for this specific solution rather than continuing their current alternative?",
      realWorldContext: "Essential for winning client proposals, grant applications, and commercial sales.",
      confidenceScore: 92,
      domainCompetency: competency || "Market Discovery & Value Positioning"
    };
  }

  // Creative / Photography / Video / Design
  if (
    qText.includes('aperture') || 
    qText.includes('shutter') || 
    qText.includes('iso') || 
    qText.includes('exposure') || 
    qText.includes('composition') ||
    qText.includes('lighting')
  ) {
    return {
      corePrinciple: "The Exposure Triangle & Optical Depth",
      contextualClue: "Remember the inverse relationship: a lower f-number (e.g. f/1.8) means a WIDER aperture opening, allowing more light in and creating a shallower depth of field (blurred background).",
      pitfallToAvoid: "Thinking a higher f-stop number lets in more light. It's a fraction (1/f), so f/16 is a tiny pinhole compared to f/2.8.",
      thoughtPrompt: "Do you want the background crisp and sharp, or soft and defocused to isolate the subject?",
      realWorldContext: "Fundamental technique in commercial product photography, portraiture, and cinematic storytelling.",
      confidenceScore: 95,
      domainCompetency: competency || "Exposure Triangle & Visual Hierarchy"
    };
  }

  if (
    qText.includes('typography') || 
    qText.includes('hierarchy') || 
    qText.includes('contrast') || 
    qText.includes('color') || 
    qText.includes('spacing') ||
    qText.includes('grid')
  ) {
    return {
      corePrinciple: "Visual Hierarchy & Accessibility (WCAG)",
      contextualClue: "The human eye scans by size, contrast, and proximity. Important elements need sufficient color contrast ratios and purposeful white space around them to guide attention.",
      pitfallToAvoid: "Using low contrast gray text on busy backgrounds or cramming elements without proportional padding.",
      thoughtPrompt: "Where should the user's eye land first within the first 500 milliseconds of viewing?",
      realWorldContext: "Core standard for graphic design, web usability, and publication layouts.",
      confidenceScore: 94,
      domainCompetency: competency || "Visual Design & Usability Principles"
    };
  }

  // Agriculture / Environment / Practical
  if (
    qText.includes('soil') || 
    qText.includes('compost') || 
    qText.includes('irrigation') || 
    qText.includes('crop') || 
    qText.includes('organic')
  ) {
    return {
      corePrinciple: "Ecological Balance & Soil Nutrient Cycling",
      contextualClue: "Look for natural microbial activity, carbon-to-nitrogen ratios, and moisture retention mechanisms that support sustainable root development without chemical shocks.",
      pitfallToAvoid: "Over-watering or applying uncomposted high-nitrogen waste directly to tender seedlings.",
      thoughtPrompt: "What organic balance maintains soil aeration while preserving beneficial microorganisms?",
      realWorldContext: "Crucial for high-yield organic farming, terrace gardening, and rooftop agriculture.",
      confidenceScore: 93,
      domainCompetency: competency || "Sustainable Agricultural Practices"
    };
  }

  // Communication & Public Speaking
  if (
    qText.includes('communication') || 
    qText.includes('listening') || 
    qText.includes('feedback') || 
    qText.includes('conflict') || 
    qText.includes('negotiation')
  ) {
    return {
      corePrinciple: "Empathetic Listening & Objective De-escalation",
      contextualClue: "Effective communication starts by acknowledging the other party's perspective without defensive counter-arguments, using open-ended questions to clarify intent.",
      pitfallToAvoid: "Formulating your response while the other person is still speaking rather than actively comprehending.",
      thoughtPrompt: "How can you validate their concern before introducing your proposed solution?",
      realWorldContext: "Essential for client management, team collaboration, and dispute resolution.",
      confidenceScore: 91,
      domainCompetency: competency || "Active Listening & Interpersonal Dynamics"
    };
  }

  // 3. Question Type-Specific Fallback Scaffolding
  if (qType === 'ordering') {
    return {
      corePrinciple: "Sequential Dependency & Prerequisite Verification",
      contextualClue: "Identify the absolute first prerequisite step (e.g. initial setup, requirement gathering, or safety inspection) and the final verification deliverable. Then arrange intermediate processing actions logically.",
      pitfallToAvoid: "Executing execution or deployment actions before validation or foundational preparation is done.",
      thoughtPrompt: "Which single action is impossible to perform until other prerequisites are completed?",
      realWorldContext: "Standard operating procedure in project workflows and technical engineering.",
      confidenceScore: 90,
      domainCompetency: competency
    };
  }

  if (qType === 'true_false') {
    return {
      corePrinciple: "Absolute vs. Contextual Conditions",
      contextualClue: "Pay close attention to absolute words like 'always', 'never', 'only', or 'all'. In practical engineering and vocational skills, blanket absolutes are frequently false exceptions.",
      pitfallToAvoid: "Assuming a general rule applies in 100% of special edge-case conditions.",
      thoughtPrompt: "Can you think of a single valid exception to this statement?",
      realWorldContext: "Critical for evaluating engineering assumptions and edge-case safety.",
      confidenceScore: 89,
      domainCompetency: competency
    };
  }

  if (qType === 'multi_select') {
    return {
      corePrinciple: "Multi-Factor Verification",
      contextualClue: "Evaluate each option independently as a true/false statement against the question's criteria rather than trying to compare options against each other.",
      pitfallToAvoid: "Selecting an option because it sounds plausible in isolation, even if it doesn't directly solve the specific requirement asked.",
      thoughtPrompt: "Does this specific option satisfy ALL conditions outlined in the question?",
      realWorldContext: "Common in technical audits, safety checklists, and multi-skill evaluations.",
      confidenceScore: 90,
      domainCompetency: competency
    };
  }

  if (qType === 'short_answer') {
    return {
      corePrinciple: "Standardized Technical Terminology",
      contextualClue: "Think of the concise industry-standard keyword, acronym, or exact scientific term that encapsulates this mechanism.",
      pitfallToAvoid: "Writing long conversational sentences when a specific recognized concept name or formula is required.",
      thoughtPrompt: "What single term would an engineer or practitioner use to define this concept?",
      realWorldContext: "Important for concise technical documentation and code review discussions.",
      confidenceScore: 88,
      domainCompetency: competency
    };
  }

  // 4. Default Pedagogical Clue Synthesizer
  // Extract a helpful pedagogical nudge from the explanation without giving away the exact option
  let synthesizedClue = "Carefully analyze the relationship between the inputs and desired output stated in the question.";
  if (explanation && explanation.length > 20) {
    const sentences = explanation.split('. ');
    if (sentences.length > 0) {
      // Pick first sentence and generalize it
      synthesizedClue = `Consider this key relationship: ${sentences[0].replace(/is\s+(correct|true|the answer)/gi, 'applies').replace(/option\s+[A-D]/gi, 'the correct principle')}.`;
    }
  }

  return {
    corePrinciple: `Fundamental Principles of ${competency}`,
    contextualClue: synthesizedClue,
    pitfallToAvoid: "Watch out for superficially similar distractors that miss the core constraint.",
    thoughtPrompt: `What is the key criteria that separates an optimal solution from a flawed one in ${skillName}?`,
    realWorldContext: `Directly mapped to vocational competency standards in ${category || 'Applied Skills'}.`,
    confidenceScore: 88,
    domainCompetency: competency
  };
}
