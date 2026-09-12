export type PathwayType = 'freelance' | 'service' | 'product' | 'community' | 'career';

export type PracticalGoal = 
  | 'build_first_project'
  | 'develop_skill'
  | 'create_portfolio'
  | 'explore_idea'
  | 'solve_problem'
  | 'learn_additional_skill';

export type RoadmapStageId = 'foundation' | 'practice' | 'portfolio' | 'communication' | 'test' | 'reflect';

export interface RoadmapStageDefinition {
  id: RoadmapStageId;
  order: number;
  title: string;
  shortDesc: string;
  milestoneTitle: string;
  milestoneDescription: string;
}

export const ROADMAP_STAGES: RoadmapStageDefinition[] = [
  {
    id: 'foundation',
    order: 1,
    title: 'Stage 1 — Foundation',
    shortDesc: 'Understand core concepts and methods',
    milestoneTitle: 'Milestone 1: Understand the Skill',
    milestoneDescription: 'Grasp the foundational techniques and principles behind this skill set.'
  },
  {
    id: 'practice',
    order: 2,
    title: 'Stage 2 — Practice',
    shortDesc: 'Complete deliberate self-directed exercises',
    milestoneTitle: 'Milestone 2: Practise Deliberately',
    milestoneDescription: 'Build repeatable hand-on fluency through low-stakes sample repetitions.'
  },
  {
    id: 'portfolio',
    order: 3,
    title: 'Stage 3 — Portfolio',
    shortDesc: 'Curate verifiable evidence of capability',
    milestoneTitle: 'Milestone 3: Build Something Tangible',
    milestoneDescription: 'Assemble a mini-portfolio showcasing your highest-quality work to external eyes.'
  },
  {
    id: 'communication',
    order: 4,
    title: 'Stage 4 — Communication',
    shortDesc: 'Present and articulate value to real people',
    milestoneTitle: 'Milestone 4: Articulate Value',
    milestoneDescription: 'Practise dialogue, client scoping, and explaining why your solution matters.'
  },
  {
    id: 'test',
    order: 5,
    title: 'Stage 5 — Test',
    shortDesc: 'Execute a small pilot in school or community',
    milestoneTitle: 'Milestone 5: Solve a Real Problem',
    milestoneDescription: 'Run an actual pilot test or pro-bono project for a real user or shopkeeper.'
  },
  {
    id: 'reflect',
    order: 6,
    title: 'Stage 6 — Reflect',
    shortDesc: 'Analyze feedback, unit economics, and next steps',
    milestoneTitle: 'Milestone 6: Synthesize & Iterate',
    milestoneDescription: 'Record learnings, review what was difficult, and plan your next learning milestone.'
  }
];

export interface ActionItem {
  id: string;
  stageId: RoadmapStageId;
  title: string;
  action: string;
  purpose: string;
  output: string;
  status: 'not_started' | 'in_progress' | 'completed';
  isCustom?: boolean;
  completedAt?: string;
  connectedSkillId?: string;
}

export interface SkillGapItem {
  skillId: string;
  skillName: string;
  status: 'have' | 'developing' | 'needed';
  currentProficiency?: string;
  reasonWhy: string;
  educationalTopic: string;
  suggestedPractice: string;
  suggestedProject: string;
}

export interface ProjectDeliverable {
  id: string;
  title: string;
  completed: boolean;
}

export interface StudentReflection {
  whatDidYouLearn: string;
  whatWasDifficult: string;
  whatWouldYouImprove: string;
  skillUsedMost: string;
  whatToLearnNext: string;
  submittedAt: string;
}

export interface StudentProject {
  id: string;
  name: string;
  targetOpportunityId: string;
  targetOpportunityTitle: string;
  skillsUsed: string[];
  problemSolved: string;
  whatICreated: string;
  deliverables: ProjectDeliverable[];
  date: string;
  status: 'planning' | 'in_progress' | 'completed';
  reflection?: StudentReflection;
}

export interface StudentExperience {
  id: string;
  type: 
    | 'School Project' 
    | 'Personal Project' 
    | 'Community Project' 
    | 'Competition' 
    | 'Volunteering' 
    | 'Entrepreneurship Experiment' 
    | 'Skill Demonstration';
  title: string;
  description: string;
  skillsUsed: string[];
  date: string;
  outcome: string;
}

export interface EducationalSkillResource {
  skillId: string;
  name: string;
  category: string;
  explanation: string;
  whyItMatters: string;
  suggestedPractice: string;
  suggestedProject: string;
  suggestedLearningTopic: string;
}

// Structured educational resource repository (Phase 4 knowledge base)
export const EDUCATIONAL_SKILL_RESOURCES: Record<string, EducationalSkillResource> = {
  marketing: {
    skillId: 'marketing',
    name: 'Marketing & Audience Outreach',
    category: 'Entrepreneurial',
    explanation: 'Understanding what customers desire and communicating value clearly through appropriate channels.',
    whyItMatters: 'Marketing may help you find customers and communicate the value of your service or product without aggressive selling.',
    suggestedPractice: 'Interview 2 potential customers about their biggest headache with current alternatives.',
    suggestedProject: 'Draft a 1-page customer discovery summary or 3 social media promotional tiles.',
    suggestedLearningTopic: 'Value proposition design and customer persona identification.'
  },
  client_handling: {
    skillId: 'client_handling',
    name: 'Client Communication & Handling',
    category: 'Communication',
    explanation: 'Managing initial briefings, clarifying client expectations, and agreeing upon written project deliverables.',
    whyItMatters: 'This opportunity involves interacting with local businesses and understanding their exact operational requirements.',
    suggestedPractice: 'Role-play an intake discovery interview with a peer acting as a neighborhood shopkeeper.',
    suggestedProject: 'Create a 1-page Client Scoping Sheet listing what is included and what costs extra.',
    suggestedLearningTopic: 'Active listening, discovery questions, and scope demarcation.'
  },
  pricing: {
    skillId: 'pricing',
    name: 'Pricing Strategy & Unit Economics',
    category: 'Entrepreneurial',
    explanation: 'Calculating your costs of delivery and choosing price points that cover time, equipment, and future reinvestment.',
    whyItMatters: 'Your Phase 3 business model involves setting prices and estimating costs; pricing knowledge grounds your venture in financial viability.',
    suggestedPractice: 'Break down the direct expenses, travel, and time required for a 3-hour project delivery.',
    suggestedProject: 'Create a 3-tier quotation sheet (Starter, Standard, Pro) for your service.',
    suggestedLearningTopic: 'Cost-plus vs value-based pricing, and break-even customer volume.'
  },
  photo_editing: {
    skillId: 'photo_editing',
    name: 'Photo Editing & Retouching',
    category: 'Creative',
    explanation: 'Calibrating color tones, white balance, contrast, and cleanly removing background distractions from product shots.',
    whyItMatters: 'Sharp raw photos require consistent color calibration so products appear realistic and enticing on digital screens.',
    suggestedPractice: 'Take 3 raw photos and edit them to pure white or uniform lifestyle backgrounds in a free photo editor.',
    suggestedProject: 'Assemble a Before/After retouching specimen showing color correction on a dark product.',
    suggestedLearningTopic: 'Histogram balance, highlight recovery, and batch image exporting.'
  },
  photography: {
    skillId: 'photography',
    name: 'Photography & Lighting Setup',
    category: 'Creative',
    explanation: 'Controlling ambient light, framing angles, and depth of field to document reality and elevate products.',
    whyItMatters: 'Visual quality dictates online trust. Clear, well-lit photos directly drive customer decisions.',
    suggestedPractice: 'Experiment with natural window light vs reflector bounce cards across morning and afternoon hours.',
    suggestedProject: '5-photo hero shot collection of contrasting textures (glass, paper, fabric, pastry).',
    suggestedLearningTopic: 'Directional lighting, rule of thirds, and focus bracketing.'
  },
  communication: {
    skillId: 'communication',
    name: 'Communication & Dialogue',
    category: 'Communication',
    explanation: 'Articulating complex ideas in simple, respectful language and listening to client feedback without defensiveness.',
    whyItMatters: 'Clients hire individuals they trust. Clear and polite communication turns one-off trials into repeat collaborations.',
    suggestedPractice: 'Explain your service in 60 seconds to someone who knows nothing about your technical field.',
    suggestedProject: 'Write a professional email template introducing your student project to a community coordinator.',
    suggestedLearningTopic: 'Empathy in professional dialogue and structured update emails.'
  },
  coding: {
    skillId: 'coding',
    name: 'Coding & Software Architecture',
    category: 'Technical',
    explanation: 'Writing modular code to automate logic, build user interfaces, and solve computational problems.',
    whyItMatters: 'Software provides scalable leverage to transform static ideas into working interactive prototypes.',
    suggestedPractice: 'Build a single-screen responsive interface with functional state toggles.',
    suggestedProject: 'Deploy an interactive calculator or portfolio showcase on a free hosting platform.',
    suggestedLearningTopic: 'Component state management, accessible markup, and responsive layouts.'
  },
  electronics: {
    skillId: 'electronics',
    name: 'Electronics & Circuit Design',
    category: 'Technical',
    explanation: 'Interfacing microcontrollers with sensors and actuators using safe low-voltage circuit topologies.',
    whyItMatters: 'Physical computing bridges digital software with physical environmental inputs.',
    suggestedPractice: 'Wire a sensor and relay on a breadboard and log digital/analog readings.',
    suggestedProject: 'Assemble a functioning sensor trigger in a protective project box.',
    suggestedLearningTopic: 'Ohm’s law, relay isolation, and sensor noise filtering.'
  },
  financial_literacy: {
    skillId: 'financial_literacy',
    name: 'Financial Literacy & Cash Flow',
    category: 'Entrepreneurial',
    explanation: 'Managing working capital, understanding the difference between revenue and profit, and tracking expenses.',
    whyItMatters: 'A venture without financial literacy can experience high revenue while quietly suffering unsustainable losses.',
    suggestedPractice: 'Track every rupee of expenses and materials for one week in a digital ledger.',
    suggestedProject: 'Create a monthly cash flow spreadsheet showing break-even thresholds.',
    suggestedLearningTopic: 'Fixed vs variable costs, contribution margin, and working capital buffers.'
  }
};

// Fallback generator for any custom or unexpected skill
export function getEducationalResource(skillId: string, skillName: string): EducationalSkillResource {
  if (EDUCATIONAL_SKILL_RESOURCES[skillId]) {
    return EDUCATIONAL_SKILL_RESOURCES[skillId];
  }
  return {
    skillId,
    name: skillName,
    category: 'Skill Exploration',
    explanation: `Practical knowledge and techniques required to apply ${skillName} effectively.`,
    whyItMatters: `Developing ${skillName} provides valuable leverage toward executing this pathway successfully.`,
    suggestedPractice: `Spend 30 minutes researching and completing one foundational exercise in ${skillName}.`,
    suggestedProject: `Create a mini-demonstration or deliverable incorporating ${skillName}.`,
    suggestedLearningTopic: `Core fundamentals and practical applications of ${skillName}.`
  };
}

// Pre-packaged CBSE Demo Mode Roadmap (Judge-Ready in 2 Minutes)
export const CBSE_DEMO_ACTIONS: ActionItem[] = [
  {
    id: 'demo-act-1',
    stageId: 'foundation',
    title: 'Study Natural Lighting & Reflector Cards',
    action: 'Learn how to use window daylight with white foam-board bounce cards to illuminate product shadows.',
    purpose: 'Eliminate dark, unflattering shadows without purchasing expensive studio strobes.',
    output: 'Lighting sketch diagram showing window angle, product placement, and bounce board.',
    status: 'completed',
    completedAt: '2026-09-08'
  },
  {
    id: 'demo-act-2',
    stageId: 'practice',
    title: '5-Object Surface & Texture Shoot',
    action: 'Photograph 5 distinct everyday items (matte ceramic mug, metal watch, packaged cookie, organic soap, glossy bottle).',
    purpose: 'Build practical muscle memory managing surface reflections and focus sharpness.',
    output: '15 raw test photographs with calibrated exposure.',
    status: 'completed',
    completedAt: '2026-09-10'
  },
  {
    id: 'demo-act-3',
    stageId: 'portfolio',
    title: 'Curate 5-Photo Specimen Lookbook',
    action: 'Select and retouch your top 5 photographs, saving them in a high-resolution PDF and mobile web album.',
    purpose: 'Provide tangible, visual proof of ability to show local merchants before asking for paid work.',
    output: '5-Photo Digital Lookbook (Clean white background + Lifestyle setting).',
    status: 'completed',
    completedAt: '2026-09-11'
  },
  {
    id: 'demo-act-4',
    stageId: 'communication',
    title: 'Draft Merchant Outreach & Roleplay Pitch',
    action: 'Write a polite, 3-sentence WhatsApp introduction and practice presenting the lookbook to a friend acting as a baker.',
    purpose: 'Overcome hesitation and ensure you present yourself as a respectful, reliable student creator.',
    output: '1-page Outreach Script & Discovery Checklist.',
    status: 'in_progress'
  },
  {
    id: 'demo-act-5',
    stageId: 'test',
    title: 'Execute Pro-Bono Pilot for Neighborhood Vendor',
    action: 'Offer a complimentary 3-product photo refresh for a neighborhood home baker or school entrepreneurship stall.',
    purpose: 'Test your end-to-end turnaround speed and client satisfaction in a real-world setting.',
    output: '3 delivered catalog photos + Written client testimonial.',
    status: 'not_started'
  },
  {
    id: 'demo-act-6',
    stageId: 'reflect',
    title: 'Analyze Unit Costs & Calibrate Pricing',
    action: 'Calculate the time spent per photo, review customer feedback, and connect with Phase 3 pricing assumptions.',
    purpose: 'Ensure future shoots generate sustainable surplus rather than unpaid time fatigue.',
    output: 'Calibrated Service Price Sheet (₹500 for 5 photos).',
    status: 'not_started'
  }
];

export const CBSE_DEMO_PROJECTS: StudentProject[] = [
  {
    id: 'demo-proj-1',
    name: 'Artisan Bakery Catalog & Social Refresh',
    targetOpportunityId: 'product_photography_service',
    targetOpportunityTitle: 'Product Photography Service',
    skillsUsed: ['photography', 'photo_editing', 'communication'],
    problemSolved: 'Local home baker had unappealing mobile phone photos of sourdough breads and pastries under dim kitchen lighting.',
    whatICreated: 'Shot 6 high-resolution product photos using morning window light and a white reflector card, retouched them for Instagram and WhatsApp catalog.',
    deliverables: [
      { id: 'del-1', title: '5 High-Res Product Hero Shots', completed: true },
      { id: 'del-2', title: '3 Instagram Promo Graphics', completed: true },
      { id: 'del-3', title: '1-Page Photo Care & Storage Guide', completed: true }
    ],
    date: '2026-09-11',
    status: 'completed',
    reflection: {
      whatDidYouLearn: 'Natural morning window light diffused by a thin white curtain produces softer shadows than direct flash. Keeping backgrounds clutter-free makes pastry crusts look much crispier.',
      whatWasDifficult: 'Directing the shop owner on which pastries to bake fresh for the shoot so they would look best on camera.',
      whatWouldYouImprove: 'Bring my own cake stand and neutral wooden board to save setup time on-site.',
      skillUsedMost: 'Photography & Lighting Control',
      whatToLearnNext: 'Client Handling and negotiating a set number of revisions before shooting.',
      submittedAt: '2026-09-11'
    }
  }
];

export const CBSE_DEMO_EXPERIENCES: StudentExperience[] = [
  {
    id: 'demo-exp-1',
    type: 'School Project',
    title: 'CBSE Annual Science & Skill Fair Media Lead',
    description: 'Documented 24 student innovation stalls and edited photo highlights for the official school website newsletter.',
    skillsUsed: ['photography', 'photo_editing', 'communication'],
    date: 'August 2026',
    outcome: 'Published photo series viewed by 800+ students and parents; received Outstanding Contributor Certificate.'
  },
  {
    id: 'demo-exp-2',
    type: 'Entrepreneurship Experiment',
    title: 'Pilot Catalog Shoot for Neighborhood Handmade Soap Maker',
    description: 'Conducted a 2-hour prototype photo session using a natural lightbox setup for an organic soap artisan.',
    skillsUsed: ['photography', 'marketing', 'pricing'],
    date: 'September 2026',
    outcome: 'Artisan reported a 35% increase in WhatsApp catalog inquiries within 10 days of uploading the new photographs.'
  }
];
