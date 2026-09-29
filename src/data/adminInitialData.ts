/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — PHASE 6 INITIAL ADMIN SEED DATA
 * Pre-seeded realistic databases for user management, graph entities, G-ONE gaps,
 * question reviews, business templates, research surveys, and exhibition profiles.
 */

import { 
  AdminUserRecord, 
  ApplicationItem, 
  ProblemItem, 
  CustomerTypeItem, 
  KnowledgeGapQueueItem, 
  QuestionReviewItem, 
  BusinessTemplateItem, 
  FinancialModelTemplateItem, 
  SurveyResponseItem, 
  ExpertInterviewRecord, 
  ResearchRoundConfig, 
  AdminActivityLogItem, 
  DemoExhibitionConfig 
} from './adminTypes';

export const INITIAL_ADMIN_USERS: AdminUserRecord[] = [
  {
    id: 'usr-admin-01',
    name: 'Dr. Ramesh Kulkarni',
    email: 'ramesh.kulkarni@kaushalsetu.gov.in',
    systemRole: 'admin',
    displayRole: 'System Administrator & CBSE Lead',
    accountStatus: 'active',
    schoolOrOrg: 'CBSE Vocational Cell / Kaushal Setu Core',
    createdDate: '2026-01-10',
    lastLogin: '2026-03-12 08:30:15',
    permissions: ['all', 'manage_skills', 'manage_assessments', 'manage_knowledge_base', 'manage_opportunities', 'manage_research', 'manage_users', 'exhibition_control'],
    skillsCount: 12,
    assessmentsCount: 8,
    opportunitiesCount: 16,
    businessModelsCount: 5,
    projectsCompletedCount: 4,
    roadmapProgressPct: 100,
    gOneInteractionsCount: 48
  },
  {
    id: 'usr-admin-02',
    name: 'Meenakshi Sundaram',
    email: 'meenakshi.s@kaushalsetu.edu.in',
    systemRole: 'content_admin',
    displayRole: 'Curriculum & Assessment Reviewer',
    accountStatus: 'active',
    schoolOrOrg: 'Kaushal Setu Content Review Council',
    createdDate: '2026-01-18',
    lastLogin: '2026-03-11 16:45:00',
    permissions: ['manage_skills', 'manage_assessments', 'manage_knowledge_base'],
    skillsCount: 6,
    assessmentsCount: 14,
    opportunitiesCount: 10,
    businessModelsCount: 2,
    projectsCompletedCount: 2,
    roadmapProgressPct: 75,
    gOneInteractionsCount: 32
  },
  {
    id: 'usr-stu-01',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@dpsdelhi.edu.in',
    systemRole: 'student',
    displayRole: 'Class 11 Student (Vocational IT & Design)',
    accountStatus: 'active',
    schoolOrOrg: 'Delhi Public School, R.K. Puram',
    createdDate: '2026-02-01',
    lastLogin: '2026-03-13 09:05:22',
    permissions: [],
    skillsCount: 3,
    assessmentsCount: 3,
    opportunitiesCount: 4,
    businessModelsCount: 2,
    projectsCompletedCount: 1,
    roadmapProgressPct: 60,
    gOneInteractionsCount: 14,
    skillsList: ['Graphic Design', 'Web Development', 'Digital Marketing']
  },
  {
    id: 'usr-stu-02',
    name: 'Priya Patel',
    email: 'priya.patel@kvs.ac.in',
    systemRole: 'student',
    displayRole: 'Class 10 Student (STEM & Electronics)',
    accountStatus: 'active',
    schoolOrOrg: 'Kendriya Vidyalaya No. 1, Ahmedabad',
    createdDate: '2026-02-05',
    lastLogin: '2026-03-12 14:20:10',
    permissions: [],
    skillsCount: 4,
    assessmentsCount: 2,
    opportunitiesCount: 3,
    businessModelsCount: 1,
    projectsCompletedCount: 2,
    roadmapProgressPct: 45,
    gOneInteractionsCount: 9,
    skillsList: ['Electronics & Hardware', 'IoT Systems', 'Organic Farming']
  },
  {
    id: 'usr-stu-03',
    name: 'Kabir Verma',
    email: 'kabir.verma@davschools.in',
    systemRole: 'student',
    displayRole: 'Class 12 Student (Commerce & Media)',
    accountStatus: 'active',
    schoolOrOrg: 'DAV Public School, Chandigarh',
    createdDate: '2026-02-14',
    lastLogin: '2026-03-10 11:15:40',
    permissions: [],
    skillsCount: 2,
    assessmentsCount: 1,
    opportunitiesCount: 2,
    businessModelsCount: 1,
    projectsCompletedCount: 0,
    roadmapProgressPct: 20,
    gOneInteractionsCount: 6,
    skillsList: ['Photography & Media', 'Communication & Pitching']
  },
  {
    id: 'usr-stu-04',
    name: 'Ananya Deshmukh',
    email: 'ananya.d@saraswati.edu.in',
    systemRole: 'student',
    displayRole: 'Class 9 Student (Practical Crafts)',
    accountStatus: 'active',
    schoolOrOrg: 'Saraswati Vidyalaya, Pune',
    createdDate: '2026-02-20',
    lastLogin: '2026-03-09 17:00:12',
    permissions: [],
    skillsCount: 3,
    assessmentsCount: 2,
    opportunitiesCount: 3,
    businessModelsCount: 1,
    projectsCompletedCount: 1,
    roadmapProgressPct: 35,
    gOneInteractionsCount: 8,
    skillsList: ['Handicraft & Woodworking', 'Graphic Design']
  },
  {
    id: 'usr-stu-05',
    name: 'Rohan Sen',
    email: 'rohan.sen@southpoint.org',
    systemRole: 'student',
    displayRole: 'Class 11 Student (Computer Science)',
    accountStatus: 'disabled',
    schoolOrOrg: 'South Point High School, Kolkata',
    createdDate: '2026-02-22',
    lastLogin: '2026-02-28 10:10:00',
    permissions: [],
    skillsCount: 1,
    assessmentsCount: 0,
    opportunitiesCount: 1,
    businessModelsCount: 0,
    projectsCompletedCount: 0,
    roadmapProgressPct: 0,
    gOneInteractionsCount: 2,
    skillsList: ['Coding & Algorithms']
  }
];

export const INITIAL_APPLICATIONS_DB: ApplicationItem[] = [
  {
    id: 'app-01',
    name: 'Local Retail WhatsApp & ONDC Digital Cataloging',
    category: 'Creative & Digital Services',
    skillIds: ['photography', 'graphic_design', 'communication'],
    skillNames: ['Photography & Media', 'Graphic Design', 'Communication'],
    description: 'Transforming handmade artisan confectionery and pottery items into high-clarity digital catalogs, social story templates, and WhatsApp storefronts.',
    relatedProblemIds: ['prob-01'],
    targetUserTypes: ['Local Retail', 'Small Enterprise'],
    relatedOpportunityIds: ['opp-01', 'opp-08'],
    validationStatus: 'Validated',
    updatedAt: '2026-03-01'
  },
  {
    id: 'app-02',
    name: 'Automated Solar/Battery Terrace Drip Irrigation',
    category: 'AgriTech & Environmental IoT',
    skillIds: ['electronics', 'iot_systems', 'agriculture'],
    skillNames: ['Electronics & Hardware', 'IoT Systems', 'Agriculture'],
    description: 'Designing low-cost soil moisture sensor probes wired to 5V relay solenoids for residential terrace garden drip watering during vacation seasons.',
    relatedProblemIds: ['prob-02'],
    targetUserTypes: ['Agriculture & Environment', 'Civic Community'],
    relatedOpportunityIds: ['opp-03', 'opp-07'],
    validationStatus: 'Validated',
    updatedAt: '2026-03-02'
  },
  {
    id: 'app-03',
    name: 'Middle-School Hands-on Science & STEM Concept Lab Kits',
    category: 'Educational & Peer Mentorship',
    skillIds: ['teaching', 'electronics', 'coding'],
    skillNames: ['Teaching & Mentorship', 'Electronics & Hardware', 'Coding & Algorithms'],
    description: 'Developing physical breadboard experiments and interactive Python simulations for Class 6-8 students struggling with abstract physics concepts.',
    relatedProblemIds: ['prob-03'],
    targetUserTypes: ['School & Youth', 'Student'],
    relatedOpportunityIds: ['opp-02', 'opp-05'],
    validationStatus: 'Validated',
    updatedAt: '2026-03-03'
  },
  {
    id: 'app-04',
    name: 'Senior Citizen UPI & Digital Safety Clinic',
    category: 'Civic Community & Digital Literacy',
    skillIds: ['digital_literacy', 'communication', 'teaching'],
    skillNames: ['Digital Literacy', 'Communication', 'Teaching & Mentorship'],
    description: 'Organizing empathetic 1-on-1 smartphone guidance sessions teaching elder residents how to safely pay electricity bills, identify phishing links, and operate DigiLocker.',
    relatedProblemIds: ['prob-04'],
    targetUserTypes: ['Civic Community', 'Consumer'],
    relatedOpportunityIds: ['opp-04'],
    validationStatus: 'Validated',
    updatedAt: '2026-03-04'
  },
  {
    id: 'app-05',
    name: 'School Event Multi-Cam Live Streaming & Reel Production',
    category: 'Media & Event Production',
    skillIds: ['video_editing', 'photography', 'communication'],
    skillNames: ['Video Editing', 'Photography & Media', 'Communication'],
    description: 'Setting up dual-angle mobile camera rigs with wireless mic feeds to stream inter-school sports days and drama competitions directly to YouTube with automated highlight reels.',
    relatedProblemIds: ['prob-05'],
    targetUserTypes: ['School & Youth', 'Community Organisation'],
    relatedOpportunityIds: ['opp-06'],
    validationStatus: 'Validated',
    updatedAt: '2026-03-05'
  }
];

export const INITIAL_PROBLEMS_DB: ProblemItem[] = [
  {
    id: 'prob-01',
    title: 'Artisans Lose Orders Due to Blurry, Non-Professional Product Photos',
    domain: 'Local Commerce & Artisan Economy',
    description: 'Home bakers, pottery makers, and textile weavers produce exceptional physical products but capture dark, out-of-focus phone snapshots against cluttered kitchen backgrounds, eroding consumer trust on digital marketplaces.',
    relatedSkillIds: ['photography', 'photo_editing', 'graphic_design'],
    relatedApplicationIds: ['app-01'],
    targetUserTypes: ['Local Retail', 'Creator'],
    possibleSolutions: ['Standardized DIY light-tent product shoots', 'Turnkey catalog creation with standardized dimensions', 'Canva promotional banner bundles'],
    opportunityIds: ['opp-01', 'opp-08'],
    validationStatus: 'Validated',
    updatedAt: '2026-03-01'
  },
  {
    id: 'prob-02',
    title: 'Terrace Garden Plants Wither During Summer Vacations & Water Scarcity',
    domain: 'Urban Sustainability & Domestic Horticulture',
    description: 'Urban gardening hobbyists lose up to 40% of their potted vegetable and flower plants during summer holidays because traditional timers flood dry soil indiscriminately or fail during power cuts.',
    relatedSkillIds: ['electronics', 'iot_systems', 'agriculture'],
    relatedApplicationIds: ['app-02'],
    targetUserTypes: ['Agriculture & Environment', 'Consumer'],
    possibleSolutions: ['Capacitive soil moisture sensing triggers', 'Gravity-fed 12V DC solenoid valves', 'Solar capacitor backup controllers'],
    opportunityIds: ['opp-03', 'opp-07'],
    validationStatus: 'Validated',
    updatedAt: '2026-03-02'
  },
  {
    id: 'prob-03',
    title: 'Junior Students Fail Abstract Physics Formulas Without Tactile Feedback',
    domain: 'K-12 STEM Education & Practical Labs',
    description: 'Class 6-8 students memorize Ohm’s law and circuit schematics for exams but panic when handed an actual resistor, breadboard, or multimeter, creating severe vocational confidence gaps.',
    relatedSkillIds: ['electronics', 'teaching', 'coding'],
    relatedApplicationIds: ['app-03'],
    targetUserTypes: ['School & Youth', 'Student'],
    possibleSolutions: ['Low-cost LED logic gate kits', 'Step-by-step peer demonstration workshops', 'Block-coded visual simulation apps'],
    opportunityIds: ['opp-02', 'opp-05'],
    validationStatus: 'Validated',
    updatedAt: '2026-03-03'
  },
  {
    id: 'prob-04',
    title: 'Senior Citizens Fear Online Banking Scams and Inadvertent Payment Losses',
    domain: 'Digital Inclusion & Cyber Safety',
    description: 'Over 65% of neighborhood elders remain dependent on adult children for basic utility bill payments due to traumatic fear of OTP scams and confusing UI layouts in modern banking apps.',
    relatedSkillIds: ['digital_literacy', 'communication', 'teaching'],
    relatedApplicationIds: ['app-04'],
    targetUserTypes: ['Civic Community', 'Consumer'],
    possibleSolutions: ['Printed large-font safety cheat-sheets', 'Simulated demo UPI transactions in a sandbox environment', 'Bi-weekly apartment community help desks'],
    opportunityIds: ['opp-04'],
    validationStatus: 'Validated',
    updatedAt: '2026-03-04'
  }
];

export const INITIAL_CUSTOMER_TYPES: CustomerTypeItem[] = [
  {
    id: 'cust-01',
    title: 'Neighborhood Artisan & Home Baker',
    category: 'Local Retail',
    description: 'Micro-entrepreneurs selling handcrafted cakes, bespoke pottery, and organic snacks who need affordable digital branding and product photography.',
    typicalPainPoints: ['No time for social media marketing', 'Low visual appeal of phone snapshots', 'WhatsApp order clutter'],
    purchasingPower: 'Low (₹1k-₹5k)',
    matchedOpportunitiesCount: 6,
    linkedOpportunityIds: ['opp-01', 'opp-08']
  },
  {
    id: 'cust-02',
    title: 'School Clubs & Academic Departments',
    category: 'School & Youth',
    description: 'Secondary school faculties, science clubs, and annual sports committees looking for student organizers, video production, and lab demonstrators.',
    typicalPainPoints: ['Limited budget for commercial media agencies', 'Need reliable on-campus student crews', 'Fast turnaround for festival footage'],
    purchasingPower: 'Medium (₹5k-₹25k)',
    matchedOpportunitiesCount: 5,
    linkedOpportunityIds: ['opp-02', 'opp-06']
  },
  {
    id: 'cust-03',
    title: 'Apartment Terrace Garden Committees',
    category: 'Agriculture & Environment',
    description: 'Residential housing society greening teams and terrace hobbyists managing rooftop planters and composting pits.',
    typicalPainPoints: ['High summer plant mortality', 'Water wastage from garden hoses', 'Need low-cost automation kits'],
    purchasingPower: 'Medium (₹5k-₹25k)',
    matchedOpportunitiesCount: 4,
    linkedOpportunityIds: ['opp-03', 'opp-07']
  },
  {
    id: 'cust-04',
    title: 'Senior Citizens & Elder Societies',
    category: 'Civic Community',
    description: 'Retired elders living independently who seek compassionate, scam-proof smartphone coaching for bill payments, cab booking, and telemedicine.',
    typicalPainPoints: ['Fear of OTP fraud', 'Small font sizes on smartphones', 'Impatient relatives when asking for tech help'],
    purchasingPower: 'Micro (<₹1k)',
    matchedOpportunitiesCount: 3,
    linkedOpportunityIds: ['opp-04']
  },
  {
    id: 'cust-05',
    title: 'Local Coaching Institutes & Small Businesses',
    category: 'Enterprise & Service',
    description: 'Neighborhood tuition centers, gyms, and dental clinics requiring localized Google Maps SEO, printed flyers, and responsive landing pages.',
    typicalPainPoints: ['High agency retainer costs', 'Outdated Google Business profiles', 'Lack of consistent local outreach'],
    purchasingPower: 'Medium (₹5k-₹25k)',
    matchedOpportunitiesCount: 5,
    linkedOpportunityIds: ['opp-05', 'opp-08']
  }
];

export const INITIAL_KNOWLEDGE_GAPS: KnowledgeGapQueueItem[] = [
  {
    id: 'gap-01',
    skillAId: 'photography',
    skillAName: 'Photography & Media',
    skillBId: 'agriculture',
    skillBName: 'Organic Farming & Agriculture',
    missingElement: 'Opportunity Mapping',
    status: 'Candidate Generated',
    generatedCandidate: {
      title: 'Farm-to-Fork Visual Storytelling & Traceability Documentation',
      description: 'Documenting organic farming practices, harvest freshness, and farm-stay experiences for agricultural direct-to-consumer brands.',
      applications: ['Farm harvest photo essays', 'Organic certification QR code photo proofs', 'Social media agro-tourism reels'],
      problems: ['Organic farmers struggle to prove authenticity and charge premium rates against conventional produce.'],
      suggestedOpportunity: 'Agri-Product Visual Branding & Farm Provenance Documentation',
      projectIdea: 'Create a 5-photo harvest documentary series with crop metadata tags for a local organic nursery.'
    },
    detectedAt: '2026-03-10 14:12:00'
  },
  {
    id: 'gap-02',
    skillAId: 'music',
    skillAName: 'Music & Audio Production',
    skillBId: 'digital_literacy',
    skillBName: 'Digital Literacy',
    missingElement: 'Practical Project',
    status: 'Needs Review',
    detectedAt: '2026-03-11 09:30:20'
  },
  {
    id: 'gap-03',
    skillAId: 'handicraft',
    skillAName: 'Handicraft & Woodworking',
    skillBId: 'coding',
    skillBName: 'Coding & Algorithms',
    missingElement: 'Financial Model',
    status: 'Candidate Generated',
    generatedCandidate: {
      title: 'Parametric CNC & Laser-Cut Wooden Educational Puzzle Kits',
      description: 'Writing SVG parametric generator scripts in Python/JavaScript to produce interlocking wooden math and geography puzzle models.',
      applications: ['Custom school desk organizers', 'Montessori geometric tactile kits'],
      problems: ['Handmade puzzles take too long to cut manually; imported acrylic sets are too expensive for government schools.'],
      suggestedOpportunity: 'Parametric Wooden Educational Toy & Kit Fabrication',
      projectIdea: 'Code an algorithm that outputs dxf vectors for a modular 3D wooden animal anatomy puzzle.'
    },
    detectedAt: '2026-03-12 11:05:44'
  }
];

export const INITIAL_QUESTION_REVIEW_QUEUE: QuestionReviewItem[] = [
  {
    id: 'qrev-01',
    questionId: 'q-gen-881',
    skillId: 'react',
    skillName: 'React & Web Apps',
    difficulty: 'Intermediate',
    competency: 'Asynchronous State Management',
    questionPrompt: 'When making an asynchronous fetch call inside a useEffect hook, what is the recommended pattern to prevent setting state on an unmounted component?',
    suggestedAnswer: 'Use an active boolean flag inside the effect cleanup or an AbortController signal.',
    explanation: 'Setting state on an unmounted component triggers React memory warnings; cleanup functions ensure in-flight promises are ignored or aborted.',
    status: 'Pending Review',
    generatedBy: 'G-ONE Engine',
    timestamp: '2026-03-12 15:40:10'
  },
  {
    id: 'qrev-02',
    questionId: 'q-gen-882',
    skillId: 'electronics',
    skillName: 'Electronics & Hardware',
    difficulty: 'Developing',
    competency: 'Pull-up vs Pull-down Resistors',
    questionPrompt: 'Why is an internal or external pull-up resistor required when connecting a mechanical push button to a microcontroller digital input pin?',
    suggestedAnswer: 'To establish a deterministic HIGH logic voltage when the switch is open and prevent a floating, noisy input pin state.',
    explanation: 'Without a pull-up or pull-down resistor, an open pin floats in high-impedance state and picks up ambient electromagnetic noise, causing random false triggers.',
    status: 'Pending Review',
    generatedBy: 'Curriculum Author',
    timestamp: '2026-03-13 07:15:22'
  },
  {
    id: 'qrev-03',
    questionId: 'q-gen-883',
    skillId: 'business',
    skillName: 'Business & Unit Economics',
    difficulty: 'Intermediate',
    competency: 'Contribution Margin Calculation',
    questionPrompt: 'If a student sells custom printed stickers for ₹50 each with raw material costs of ₹15 each, and has monthly fixed software costs of ₹700, how many stickers must they sell to break even?',
    suggestedAnswer: '20 stickers (₹700 ÷ [₹50 - ₹15] = 20 units).',
    explanation: 'Contribution margin per unit is ₹35. Dividing total fixed cost ₹700 by ₹35 yields exactly 20 units.',
    status: 'Approved',
    generatedBy: 'G-ONE Engine',
    timestamp: '2026-03-11 18:20:00',
    reviewerNotes: 'Numerically verified and pedagogically aligned with Class 10/11 vocational math standards.'
  }
];

export const INITIAL_BUSINESS_TEMPLATES: BusinessTemplateItem[] = [
  {
    id: 'btemp-01',
    title: 'Micro-Freelance Creative Digital Service',
    businessType: 'Freelance Service',
    description: 'Providing bespoke design, social media assets, and digital cataloging on a per-project or monthly retainer basis for local retail merchants.',
    targetCustomerType: 'Neighborhood Artisan & Local Retail',
    revenueModel: 'Per-deliverable fee (₹800 - ₹2,500 per catalog) + Monthly update retainer (₹1,500/mo)',
    typicalPriceRange: { min: 500, recommended: 1500, max: 4000 },
    sampleFixedCosts: [
      { item: 'Software Subscriptions (Canva / Adobe Student)', monthlyCost: 499 },
      { item: 'Cloud Storage & Portfolio Hosting', monthlyCost: 150 }
    ],
    sampleVariableCosts: [
      { item: 'Transport / Local Client Visit Fuel', costPerUnit: 100 },
      { item: 'Props & Product Backdrop Consumables', costPerUnit: 50 }
    ],
    breakEvenGuidance: 'At ₹1,500 per project with ₹150 variable cost, the student earns ₹1,350 net contribution per project, breaking even on monthly fixed costs (₹649) on their very first client.',
    validationStatus: 'Validated',
    updatedAt: '2026-03-01'
  },
  {
    id: 'btemp-02',
    title: 'Hardware Automation & IoT Micro-Kit Assembly',
    businessType: 'Product Venture',
    description: 'Fabricating pre-calibrated smart moisture sensors and automated relay controllers for terrace gardens and school labs.',
    targetCustomerType: 'Apartment Terrace Garden Committees & STEM Hobbyists',
    revenueModel: 'Unit hardware kit sales (₹1,200 - ₹2,400) + Optional installation fee (₹500)',
    typicalPriceRange: { min: 900, recommended: 1600, max: 2800 },
    sampleFixedCosts: [
      { item: 'Soldering & Multimeter Tool Depreciation', monthlyCost: 300 },
      { item: 'Component Storage Bins & Workbench Space', monthlyCost: 200 }
    ],
    sampleVariableCosts: [
      { item: 'Microcontroller (ESP8266 / Arduino Clone)', costPerUnit: 280 },
      { item: 'Capacitive Moisture Sensor & 5V Relay', costPerUnit: 160 },
      { item: 'Waterproof Housing Enclosure & Wires', costPerUnit: 110 }
    ],
    breakEvenGuidance: 'With unit cost of ₹550 and retail price of ₹1,600, margin is ₹1,050 per kit. Only 1 unit needed to cover monthly tooling overhead.',
    validationStatus: 'Validated',
    updatedAt: '2026-03-02'
  },
  {
    id: 'btemp-03',
    title: 'Peer-to-Peer STEM Tutoring & Practical Concept Workshop',
    businessType: 'Educational Hub',
    description: 'Organizing weekend 2-hour practical science and robotics concept sessions for Class 6-8 students in residential community halls.',
    targetCustomerType: 'School & Youth / Parents',
    revenueModel: 'Monthly cohort fee per student (₹600 - ₹1,200 for 4 weekend sessions)',
    typicalPriceRange: { min: 400, recommended: 800, max: 1500 },
    sampleFixedCosts: [
      { item: 'Community Room Cleaning / Electricity Contribution', monthlyCost: 500 },
      { item: 'Demonstration Hardware Pool Amortization', monthlyCost: 300 }
    ],
    sampleVariableCosts: [
      { item: 'Student Worksheets & Consumable Craft Materials', costPerUnit: 80 }
    ],
    breakEvenGuidance: 'With 6 enrolled students at ₹800 each (₹4,800 revenue) and ₹480 materials cost, monthly surplus exceeds ₹3,500.',
    validationStatus: 'Validated',
    updatedAt: '2026-03-03'
  }
];

export const INITIAL_FINANCIAL_MODELS: FinancialModelTemplateItem[] = [
  {
    id: 'fin-model-01',
    name: 'Single-Unit Service & Labor Margin Model',
    modelType: 'Illustrative Scenario',
    fixedCostCategories: ['Software Tooling', 'Workspace / Internet', 'Marketing & Print Samples', 'Equipment Amortization'],
    variableCostCategories: ['Raw Consumables per Job', 'Travel / Local Commute', 'Packaging / Digital Media Transfer'],
    formulaSummary: 'Contribution Margin = Price - Variable Cost; Net Surplus = (Volume × Contribution Margin) - Total Fixed Costs',
    breakEvenFormula: 'Break-Even Units = Total Monthly Fixed Costs ÷ (Price Per Unit - Variable Cost Per Unit)',
    defaultPricePerUnit: 1500,
    defaultFixedCostTotal: 650,
    defaultVariableCostPerUnit: 150,
    guidanceDisclaimer: 'All default values are illustrative pedagogical scenarios for secondary vocational learning, not guaranteed commercial benchmarks.',
    lastUpdated: '2026-03-01'
  },
  {
    id: 'fin-model-02',
    name: 'Hardware & Tangible Batch Production Model',
    modelType: 'Illustrative Scenario',
    fixedCostCategories: ['Tools & Instruments', 'Safety Gear & Soldering Consumables', 'Storage & Organization'],
    variableCostCategories: ['Electronic Components (BOM)', 'PCB / Enclosure Casings', 'Fasteners & Connectors', 'Packaging'],
    formulaSummary: 'Gross Profit Margin % = ((Price - BOM Cost) ÷ Price) × 100',
    breakEvenFormula: 'Break-Even Units = Total Tooling Fixed Costs ÷ (Retail Price - BOM Variable Cost)',
    defaultPricePerUnit: 1800,
    defaultFixedCostTotal: 850,
    defaultVariableCostPerUnit: 620,
    guidanceDisclaimer: 'Component market prices fluctuate based on distributor volume and shipping tariffs.',
    lastUpdated: '2026-03-02'
  }
];

export const INITIAL_SURVEY_RESPONSES: SurveyResponseItem[] = [
  {
    id: 'sr-01',
    round: 'Baseline',
    respondentType: 'Student',
    respondentName: 'Student Survey Batch A-1',
    schoolName: 'Delhi Public School, R.K. Puram',
    submittedAt: '2026-02-10 11:20:00',
    ratings: {
      skillClarity: 3,
      vocationalConfidence: 2,
      financialLiteracyUnderstanding: 2,
      perceivedValue: 4
    },
    unawareOfSkillApplicationsBefore: true,
    seekingMicroEnterprisePathway: true,
    strugglesWithPricingEconomics: true,
    qualitativeFeedback: 'I knew coding and graphic design, but I did not know anyone in my neighborhood who would pay me or how to calculate what to charge.'
  },
  {
    id: 'sr-02',
    round: 'Baseline',
    respondentType: 'Student',
    respondentName: 'Student Survey Batch A-2',
    schoolName: 'Kendriya Vidyalaya No. 1, Ahmedabad',
    submittedAt: '2026-02-12 14:15:00',
    ratings: {
      skillClarity: 4,
      vocationalConfidence: 3,
      financialLiteracyUnderstanding: 1,
      perceivedValue: 5
    },
    unawareOfSkillApplicationsBefore: true,
    seekingMicroEnterprisePathway: true,
    strugglesWithPricingEconomics: true,
    qualitativeFeedback: 'School teaches theory for board exams. Kaushal Setu connected my electronics knowledge to rooftop garden irrigation for the first time.'
  },
  {
    id: 'sr-03',
    round: 'Post-Use',
    respondentType: 'Student',
    respondentName: 'Student Survey Batch B-1',
    schoolName: 'Delhi Public School, R.K. Puram',
    submittedAt: '2026-03-05 16:30:00',
    ratings: {
      skillClarity: 5,
      vocationalConfidence: 5,
      financialLiteracyUnderstanding: 4,
      perceivedValue: 5
    },
    unawareOfSkillApplicationsBefore: false,
    seekingMicroEnterprisePathway: true,
    strugglesWithPricingEconomics: false,
    qualitativeFeedback: 'The Business Builder break-even formula made it crystal clear that selling 2 digital catalogs pays for my monthly software costs.'
  },
  {
    id: 'sr-04',
    round: 'Post-Use',
    respondentType: 'Teacher',
    respondentName: 'Sanjay Rawat (Vocational Coordinator)',
    schoolName: 'DAV Public School, Chandigarh',
    submittedAt: '2026-03-08 10:45:00',
    ratings: {
      skillClarity: 5,
      vocationalConfidence: 4,
      financialLiteracyUnderstanding: 5,
      perceivedValue: 5
    },
    unawareOfSkillApplicationsBefore: false,
    seekingMicroEnterprisePathway: true,
    strugglesWithPricingEconomics: false,
    qualitativeFeedback: 'The 6-stage practical roadmap gives students accountability without overwhelming them with corporate jargon.'
  },
  {
    id: 'sr-05',
    round: 'Post-Use',
    respondentType: 'Parent',
    respondentName: 'Sunita Sharma (Parent of Class 11 Student)',
    schoolName: 'Delhi Public School, R.K. Puram',
    submittedAt: '2026-03-09 18:10:00',
    ratings: {
      skillClarity: 4,
      vocationalConfidence: 4,
      financialLiteracyUnderstanding: 4,
      perceivedValue: 5
    },
    unawareOfSkillApplicationsBefore: false,
    seekingMicroEnterprisePathway: true,
    strugglesWithPricingEconomics: false,
    qualitativeFeedback: 'I was worried my son was spending screen time playing games; seeing him create real pricing sheets for local shopkeepers changed our perspective.'
  }
];

export const INITIAL_EXPERT_INTERVIEWS: ExpertInterviewRecord[] = [
  {
    id: 'int-01',
    expertName: 'Dr. Anirudh Sen',
    organization: 'National Council of Vocational Education & Training (NCVET)',
    designation: 'Senior Advisor on K-12 Vocational Frameworks',
    interviewDate: '2026-01-25',
    topic: 'Alignment with NEP 2020 10-Bagless Days and Vocational Integration',
    keyInsights: [
      'Students must not be taught entrepreneurship as abstract venture capital theory; focus on micro-unit economics.',
      'Connecting pairs of complementary skills (e.g. Design + Photography) creates 3x higher community utility than isolated skills.',
      'Hands-on demonstration rubrics should grade problem understanding equally with technical output.'
    ],
    cbseAlignmentNotes: 'Directly validates the Phase 6 combination engine and 6-stage roadmap structure.',
    validationDecision: 'Strongly Aligned'
  },
  {
    id: 'int-02',
    expertName: 'Prof. Shalini Joshi',
    organization: 'Department of Educational Technology, Jamia Millia Islamia',
    designation: 'Head of Experiential Pedagogy',
    interviewDate: '2026-02-14',
    topic: 'Adaptive Assessment & Formative Feedback Scaffolding',
    keyInsights: [
      'Immediate explanatory rules after quiz submission build durable mental models.',
      'G-ONE cognitive guidance hints should avoid spoiling answers and instead prompt constraint reflection.'
    ],
    cbseAlignmentNotes: 'Supported the G-ONE Context-Aware Hint Engine implementation.',
    validationDecision: 'Strongly Aligned'
  }
];

export const INITIAL_RESEARCH_ROUNDS: ResearchRoundConfig[] = [
  {
    id: 'rr-baseline',
    name: 'Baseline',
    status: 'Completed',
    targetAudience: 'Secondary Students (Classes 9-12) Prior to Kaushal Setu',
    startDate: '2026-01-15',
    endDate: '2026-02-15',
    responsesTarget: 400,
    responsesCollected: 420
  },
  {
    id: 'rr-post-use',
    name: 'Post-Use',
    status: 'Active',
    targetAudience: 'Students & Educators Completing 1+ Roadmap Deliverable',
    startDate: '2026-02-20',
    responsesTarget: 250,
    responsesCollected: 168
  },
  {
    id: 'rr-follow-up',
    name: 'Follow-Up',
    status: 'Upcoming',
    targetAudience: '3-Month Longitudinal Venture & Skill Retention Study',
    startDate: '2026-04-01',
    responsesTarget: 150,
    responsesCollected: 0
  }
];

export const INITIAL_ADMIN_LOGS: AdminActivityLogItem[] = [
  {
    id: 'log-01',
    adminName: 'Dr. Ramesh Kulkarni',
    action: 'Published Knowledge Record',
    targetCategory: 'Combination',
    targetId: 'combo-01',
    targetLabel: 'Graphic Design + Photography & Media',
    timestamp: '2026-03-12 09:14:20'
  },
  {
    id: 'log-02',
    adminName: 'Meenakshi Sundaram',
    action: 'Approved Assessment Question',
    targetCategory: 'Assessment',
    targetId: 'qrev-03',
    targetLabel: 'Contribution Margin Calculation (q-gen-883)',
    timestamp: '2026-03-12 11:32:05'
  },
  {
    id: 'log-03',
    adminName: 'Dr. Ramesh Kulkarni',
    action: 'Configured CBSE Exhibition Profile',
    targetCategory: 'Exhibition',
    targetId: 'demo-aarav',
    targetLabel: 'Aarav Sharma — DPS Delhi (Design & Tech)',
    timestamp: '2026-03-12 14:05:50'
  },
  {
    id: 'log-04',
    adminName: 'Meenakshi Sundaram',
    action: 'Generated Knowledge Gap Candidate',
    targetCategory: 'G-ONE',
    targetId: 'gap-01',
    targetLabel: 'Photography + Agriculture Mapping',
    timestamp: '2026-03-13 08:20:11'
  }
];

export const INITIAL_DEMO_EXHIBITION: DemoExhibitionConfig = {
  activeDemoProfileId: 'demo-aarav',
  studentName: 'Aarav Sharma',
  schoolName: 'Delhi Public School, R.K. Puram (CBSE)',
  selectedSkills: [
    { skillId: 'design', proficiency: 'Strong' },
    { skillId: 'photography', proficiency: 'Developing' },
    { skillId: 'communication', proficiency: 'Intermediate' }
  ],
  targetOpportunityId: 'opp-01',
  targetOpportunityTitle: 'Local Retail Product Photography & WhatsApp Storefronts',
  activeScenarioName: 'Artisan Confectionery Digital Catalog Service',
  unitPrice: 1500,
  customerVolume: 8,
  monthlyRevenue: 12000,
  roadmapStage: 'Phase 3: Portfolio & Live Deliverable',
  presentationMode: false,
  minimalMode: false,
  visibleModules: {
    skills: true,
    assessment: true,
    opportunities: true,
    businessBuilder: true,
    roadmap: true,
    projects: true,
    goneInsights: true
  },
  isDemoDataSet: true
};
