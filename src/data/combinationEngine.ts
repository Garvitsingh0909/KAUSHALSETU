/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — COMBINATION ENGINE & KNOWLEDGE MATRIX (PHASE 6)
 * Precomputed structured combination matrix across Tier 1, 2, 3, and Cross-Domain.
 * Combination relevance scoring, auto-fill generator, validation pipeline, and graph queries.
 */

import { SkillNode, CombinationRecord, CombinationTier, ValidationState, RecordOrigin, Phase6TestCase, FinancialAssumptionTemplate, ProjectTemplate, RecordValidationReport } from './knowledgeBaseTypes';
import { COMPREHENSIVE_SKILLS_DB } from './comprehensiveSkills';
import { COMPREHENSIVE_OPPORTUNITIES_DB, REUSABLE_ROADMAP_TEMPLATES, COMPREHENSIVE_PROJECTS_DB } from './comprehensiveOpportunities';

// ==========================================
// PRECOMPUTED CORE COMBINATION MATRIX
// ==========================================

export const PRECOMPUTED_COMBINATIONS: CombinationRecord[] = [
  // ------------------------------------------
  // TIER 1: SINGLE SKILLS (Exemplary Anchor Records)
  // ------------------------------------------
  {
    id: 'combo_single_photography',
    tier: 'Tier 1',
    skillIds: ['photography'],
    skillNames: ['Photography & Lighting'],
    title: 'Visual Photography & Framing Foundation',
    category: 'Creative',
    applications: ['Tabletop Product Shots', 'Event Coverage', 'Portrait Sessions', 'Campus Documentation'],
    problems: [
      'Amateur blurry photos hurting visual appeal',
      'Poor lighting making products look unappetizing',
      'Lack of visual memory documentation for school events'
    ],
    targetCustomers: ['Neighborhood home bakers', 'Local artisans', 'School clubs', 'Families seeking portraits'],
    solutions: ['Provide high-clarity tabletop shots using natural light reflectors and clean backgrounds.'],
    opportunityIds: ['product_photography_service'],
    opportunityTitles: ['Product Photography & Digital Catalog Service'],
    additionalSkills: ['photo_editing', 'marketing', 'client_handling', 'pricing'],
    suggestedProjectIds: ['proj_tabletop_photo_lookbook'],
    suggestedProjects: [COMPREHENSIVE_PROJECTS_DB[0]],
    entrepreneurialPathway: 'Freelance Visual Photography Service',
    financialTemplate: {
      templateName: 'Photography Micro-Service Template',
      origin: 'Illustrative',
      startupCosts: [
        { item: 'White Foam Board & Card Reflectors', amount: 150, isEssential: true },
        { item: 'Mini Tabletop Tripod / Phone Mount', amount: 350, isEssential: true },
        { item: 'LED Clip Fill Light (Optional)', amount: 600, isEssential: false }
      ],
      fixedMonthlyOverhead: [
        { item: 'Cloud Storage & Portfolio Hosting', amount: 120 },
        { item: 'Equipment Maintenance Reserve', amount: 200 }
      ],
      variableCostPerUnit: 50, // Travel / electricity per session
      suggestedPriceRange: { min: 400, recommended: 750, max: 1500 },
      typicalCustomerVolume: 6,
      estimatedBreakEvenUnits: 1,
      unitDefinition: '5-Product Photo Shoot Session',
      financialGuidanceNote: 'Illustrative pricing grounded in local artisan affordability; breaks even on the very first paid client.'
    },
    roadmapTemplateId: 'roadmap_creative_freelance',
    explanation: 'Photography enables capturing visual reality with sharp composition. Adding Photo Editing and Marketing transforms this skill into a high-demand commercial service.',
    origin: 'Curated',
    validationStatus: 'Validated',
    createdAt: '2026-01-01',
    updatedAt: '2026-03-01',
    version: 1,
    relevanceScore: 100
  },

  // ------------------------------------------
  // TIER 2: TWO-SKILL COMBINATIONS
  // ------------------------------------------
  {
    id: 'combo_photography_marketing',
    tier: 'Tier 2',
    skillIds: ['photography', 'marketing'],
    skillNames: ['Photography & Lighting', 'Marketing & Audience Outreach'],
    title: 'Commercial Visual Content & Brand Promotion',
    category: 'Creative-Entrepreneurial',
    applications: ['High-Converting E-Commerce Product Catalogs', 'Social Media Promo Launch Bundles', 'Visual Brand Identity Lookbooks', 'Local Merchant Spotlight Campaigns'],
    problems: [
      'Local artisan products have high craftsmanship but zero online visibility',
      'Generic text ads fail to generate consumer interest without compelling visual imagery',
      'Small business owners lack time to create synchronized photo and promotional campaigns'
    ],
    targetCustomers: ['Handmade jewelry & craft artisans', 'Neighborhood boutique confectioners', 'Independent cafes', 'Local apparel boutiques'],
    solutions: [
      'Deliver a bundled visual marketing package combining 5 clean product photos with targeted social media story ads designed to convert local buyers.'
    ],
    opportunityIds: ['product_photography_service', 'freelance_content_creation'],
    opportunityTitles: ['Product Photography & Digital Catalog Service', 'Social Media Content & Video Marketing Agency'],
    additionalSkills: ['photo_editing', 'communication', 'pricing', 'client_handling'],
    suggestedProjectIds: ['proj_tabletop_photo_lookbook'],
    suggestedProjects: [COMPREHENSIVE_PROJECTS_DB[0]],
    entrepreneurialPathway: 'Freelance Commercial Content Creator / Micro-Agency',
    financialTemplate: {
      templateName: 'Commercial Visual Package Template',
      origin: 'Illustrative',
      startupCosts: [
        { item: 'White Backdrop & Lighting Diffusers', amount: 300, isEssential: true },
        { item: 'Smartphone Tripod Stand', amount: 400, isEssential: true }
      ],
      fixedMonthlyOverhead: [
        { item: 'Canva / Asset Template Tools', amount: 250 },
        { item: 'Promotional Sample Prints', amount: 150 }
      ],
      variableCostPerUnit: 80,
      suggestedPriceRange: { min: 800, recommended: 1500, max: 3000 },
      typicalCustomerVolume: 4,
      estimatedBreakEvenUnits: 1,
      unitDefinition: 'Turnkey Visual Promo Package',
      financialGuidanceNote: 'Illustrative model showing bundling photos with promotional copy generates 2x higher revenue than raw photography alone.'
    },
    roadmapTemplateId: 'roadmap_creative_freelance',
    explanation: 'Combining Photography with Marketing bridges the gap between artistic creation and commercial conversion. You do not just provide images—you solve the merchant’s core need for customer revenue.',
    origin: 'Curated',
    validationStatus: 'Validated',
    createdAt: '2026-01-01',
    updatedAt: '2026-03-01',
    version: 1,
    relevanceScore: 98
  },
  {
    id: 'combo_coding_graphic_design',
    tier: 'Tier 2',
    skillIds: ['coding', 'graphic_design'],
    skillNames: ['Coding & Web Development', 'Graphic Design'],
    title: 'Creative UI/UX & Web Experience Studio',
    category: 'Technical-Creative',
    applications: ['Responsive Business Landing Pages', 'Interactive Web Portals', 'Custom Digital Product Catalogs', 'Mobile App User Interfaces'],
    problems: [
      'Small enterprises are trapped between ugly DIY templates or unaffordable ₹30,000+ digital agency quotes',
      'Designers struggle with code while coders build unappealing, clunky user interfaces',
      'High bounce rates on local business sites due to slow loading speeds and poor visual hierarchy'
    ],
    targetCustomers: ['Local retail boutiques', 'Student-led clubs and events', 'EdTech tutors and clinics', 'Community non-profits'],
    solutions: [
      'Engineer accessible, high-speed single-page web experiences pairing custom visual branding with responsive modern code.'
    ],
    opportunityIds: ['coding_and_design_experience_studio'],
    opportunityTitles: ['Digital UI/UX & Web Experience Studio'],
    additionalSkills: ['ui_ux_design', 'communication', 'pricing', 'project_management'],
    suggestedProjectIds: ['proj_responsive_storefront_redesign'],
    suggestedProjects: [COMPREHENSIVE_PROJECTS_DB[1]],
    entrepreneurialPathway: 'Digital Web & UI Design Agency',
    financialTemplate: {
      templateName: 'Web Experience Studio Template',
      origin: 'Illustrative',
      startupCosts: [
        { item: 'Domain Registration for Portfolio', amount: 800, isEssential: true },
        { item: 'Free Code & Design Tool Suite Setup', amount: 0, isEssential: true }
      ],
      fixedMonthlyOverhead: [
        { item: 'Cloud Hosting & SSL Certificate', amount: 350 }
      ],
      variableCostPerUnit: 100,
      suggestedPriceRange: { min: 2000, recommended: 4500, max: 9000 },
      typicalCustomerVolume: 2,
      estimatedBreakEvenUnits: 1,
      unitDefinition: 'Turnkey Responsive 1-Page Website',
      financialGuidanceNote: 'Illustrative model reflecting that modern single-page web projects have near-zero marginal software cost, allowing high profit margins.'
    },
    roadmapTemplateId: 'roadmap_creative_freelance',
    explanation: 'Coding provides structural functionality while Graphic Design delivers visual balance. Together, they enable you to build complete digital storefronts without relying on external subcontractors.',
    origin: 'Curated',
    validationStatus: 'Validated',
    createdAt: '2026-01-01',
    updatedAt: '2026-03-01',
    version: 1,
    relevanceScore: 99
  },
  {
    id: 'combo_electronics_agriculture',
    tier: 'Tier 2',
    skillIds: ['electronics', 'agriculture'],
    skillNames: ['Electronics & Circuits', 'Agriculture & Hydroponics'],
    title: 'Smart AgriTech & Precision Irrigation Solutions',
    category: 'Technical-Practical',
    applications: ['Automated Drip Irrigation Systems', 'Soil Moisture & Nutrient Telemetry', 'Suburban Greenhouse Climate Controllers', 'Smart Solar Crop Drying Monitors'],
    problems: [
      'Urban and suburban farmers waste thousands of liters of water through manual guess-based watering',
      'Commercial automated irrigation controllers cost upwards of ₹20,000, pricing out schools and hobby farmers',
      'Rooftop and school garden crops wither during vacation periods when manual caretakers are absent'
    ],
    targetCustomers: ['Suburban rooftop gardeners', 'School biology labs and garden clubs', 'Local polyhouse organic farmers', 'Apartment green resident committees'],
    solutions: [
      'Assemble low-cost microcontroller sensor units (ESP32/Arduino) that trigger mini solenoid valves only when soil moisture drops below calibrated thresholds.'
    ],
    opportunityIds: ['smart_agritech_iot', 'urban_hydroponics_enterprise'],
    opportunityTitles: ['Smart AgriTech & Environmental IoT Solutions', 'Urban Hydroponic Microgreens & Herb Cultivation'],
    additionalSkills: ['iot_systems', 'coding', 'problem_solving', 'pricing'],
    suggestedProjectIds: ['proj_automated_irrigation_rig'],
    suggestedProjects: [COMPREHENSIVE_PROJECTS_DB[2]],
    entrepreneurialPathway: 'AgriTech Micro-Enterprise / Hardware Solutions Provider',
    financialTemplate: {
      templateName: 'AgriTech Hardware Unit Template',
      origin: 'Illustrative',
      startupCosts: [
        { item: 'Microcontroller, Sensor & Relay Development Kit', amount: 1200, isEssential: true },
        { item: 'Soldering Iron & Wire Prep Kit', amount: 500, isEssential: true },
        { item: 'Waterproof Prototype Enclosure Box', amount: 250, isEssential: true }
      ],
      fixedMonthlyOverhead: [
        { item: 'Workshop Bench Space / Tool Wear', amount: 200 }
      ],
      variableCostPerUnit: 650, // Microcontroller + soil probe + 5V valve
      suggestedPriceRange: { min: 1400, recommended: 2200, max: 3500 },
      typicalCustomerVolume: 3,
      estimatedBreakEvenUnits: 2,
      unitDefinition: 'Installed Smart Irrigation Controller Unit',
      financialGuidanceNote: 'Illustrative unit economics showing a 3x hardware markup covering labor, testing, and 6-month maintenance support.'
    },
    roadmapTemplateId: 'roadmap_hardware_prototype',
    explanation: 'Electronics brings sensor telemetry and automated control to Agriculture, solving real-world water scarcity and crop loss while opening high-value AgriTech entrepreneurship.',
    origin: 'Curated',
    validationStatus: 'Validated',
    createdAt: '2026-01-01',
    updatedAt: '2026-03-01',
    version: 1,
    relevanceScore: 97,
    crossDomainTag: 'Vocational + Technology'
  },
  {
    id: 'combo_pricing_financial_literacy',
    tier: 'Tier 2',
    skillIds: ['pricing', 'financial_literacy'],
    skillNames: ['Pricing Strategy & Unit Economics', 'Financial Literacy & Bookkeeping'],
    title: 'Venture Unit Economics & Cash Flow Advisory',
    category: 'Entrepreneurial',
    applications: ['Break-Even Sensitivity Modeling', 'Contribution Margin Auditing', '3-Tier Service Rate Packaging', 'Cash Flow & Inventory Budgeting'],
    problems: [
      'Over 60% of student and micro-enterprises undercharge and operate at hidden financial losses',
      'Solo creators run out of cash to purchase next-month raw materials due to poor cash reserves',
      'Unstructured freelance quoting leads to customer pushback and unpaid revisions'
    ],
    targetCustomers: ['Student enterprise exhibition creators', 'Home-based bakers & handicraft makers', 'Freelance designers and photographers', 'School club treasurers'],
    solutions: [
      'Build automated unit economics spreadsheets that audit fixed vs variable costs, establish healthy profit margins, and calculate exact break-even client volume.'
    ],
    opportunityIds: ['pricing_and_cost_consultancy'],
    opportunityTitles: ['Venture Unit Economics & Pricing Calibration Advisory'],
    additionalSkills: ['negotiation', 'problem_solving', 'communication', 'market_research'],
    suggestedProjectIds: ['proj_unit_economics_pricing_sheet'],
    suggestedProjects: [COMPREHENSIVE_PROJECTS_DB[3]],
    entrepreneurialPathway: 'Financial Advisory Micro-Service for Student & Artisan Ventures',
    financialTemplate: {
      templateName: 'Financial Calibration Service Template',
      origin: 'Illustrative',
      startupCosts: [
        { item: 'Spreadsheet Template Repository Design', amount: 200, isEssential: true }
      ],
      fixedMonthlyOverhead: [
        { item: 'Cloud Storage & Financial Tools', amount: 150 }
      ],
      variableCostPerUnit: 50,
      suggestedPriceRange: { min: 500, recommended: 1200, max: 2500 },
      typicalCustomerVolume: 3,
      estimatedBreakEvenUnits: 1,
      unitDefinition: 'Venture Cost Audit & Break-Even Model Package',
      financialGuidanceNote: 'Illustrative pricing showing low-overhead advisory generates instant cash surplus while protecting peers from bankruptcy.'
    },
    roadmapTemplateId: 'roadmap_service_consulting',
    explanation: 'Pricing and Financial Literacy form the economic backbone of every venture. Without them, even the most talented technical or creative builders fail financially.',
    origin: 'Curated',
    validationStatus: 'Validated',
    createdAt: '2026-01-01',
    updatedAt: '2026-03-01',
    version: 1,
    relevanceScore: 98
  },
  {
    id: 'combo_digital_literacy_teaching',
    tier: 'Tier 2',
    skillIds: ['digital_literacy', 'teaching'],
    skillNames: ['Digital Literacy & Computer Operations', 'Teaching & Mentoring'],
    title: 'Community Digital Empowerment & Senior Mentorship',
    category: 'Communication-Technical',
    applications: ['Senior Citizen Smartphone Safety Workshops', 'Artisan UPI & Online Onboarding', 'Classroom Digital Tool Tutoring', 'Government Portal Assistance'],
    problems: [
      'Elderly citizens feel anxious about online banking scams and smartphone interfaces',
      'Traditional artisans are locked out of digital commerce because they cannot navigate portal forms',
      'Junior students struggle with digital file hygiene and cloud productivity tools'
    ],
    targetCustomers: ['Senior citizens and retirement communities', 'Neighborhood self-help artisan groups', 'Junior school pupils', 'Community center members'],
    solutions: [
      'Conduct patient, large-print illustrated 1-on-1 and small-group coaching sessions teaching digital independence safely.'
    ],
    opportunityIds: ['community_digital_empowerment', 'peer_tutoring_network'],
    opportunityTitles: ['Senior Citizen & Artisan Digital Literacy Drive', 'Peer-to-Peer Academic & Skill Tutoring Network'],
    additionalSkills: ['communication', 'public_speaking', 'graphic_design', 'writing'],
    suggestedProjectIds: ['proj_senior_digital_safety_guide'],
    suggestedProjects: [COMPREHENSIVE_PROJECTS_DB[4]],
    entrepreneurialPathway: 'Community Social Venture / Digital Literacy Academy',
    financialTemplate: {
      templateName: 'Community Workshop Model Template',
      origin: 'Illustrative',
      startupCosts: [
        { item: 'Large-Print Color Handbook Printing (20 copies)', amount: 400, isEssential: true },
        { item: 'Workshop Badges & Stationary', amount: 150, isEssential: true }
      ],
      fixedMonthlyOverhead: [
        { item: 'Community Hall Cleaning Donation', amount: 200 }
      ],
      variableCostPerUnit: 30,
      suggestedPriceRange: { min: 200, recommended: 400, max: 800 },
      typicalCustomerVolume: 8,
      estimatedBreakEvenUnits: 2,
      unitDefinition: '1-Month Guided Smartphone Mastery Cohort Seat',
      financialGuidanceNote: 'Illustrative social enterprise model that sustains materials while remaining accessible to pensioners and artisans.'
    },
    roadmapTemplateId: 'roadmap_community_service',
    explanation: 'Teaching translates digital literacy into community impact. You become a bridge over the digital divide, turning intimidation into empowerment.',
    origin: 'Curated',
    validationStatus: 'Validated',
    createdAt: '2026-01-01',
    updatedAt: '2026-03-01',
    version: 1,
    relevanceScore: 94
  },
  {
    id: 'combo_tailoring_graphic_design',
    tier: 'Tier 2',
    skillIds: ['tailoring', 'graphic_design'],
    skillNames: ['Tailoring & Fabric Craft', 'Graphic Design'],
    title: 'Upcycled Sustainable Apparel & Custom Craft Studio',
    category: 'Creative-Practical',
    applications: ['Upcycled Denim Laptop Sleeves', 'Screen-Printed Reusable Canvas Totes', 'Custom Event Lanyards & Badges', 'Sustainable Fashion Alterations'],
    problems: [
      'Discarded denim jeans and fabric scraps pollute municipal landfills',
      'Generic corporate merchandise is made of cheap plastic and thrown out after 1 day',
      'Lack of stylish, durable upcycled accessories customized for young students'
    ],
    targetCustomers: ['Eco-conscious youth and students', 'School festival and club organizers', 'Local boutique gift shops', 'Green NGO initiatives'],
    solutions: [
      'Handcraft durable everyday lifestyle accessories from upcycled textiles featuring original screen-printed graphic art.'
    ],
    opportunityIds: ['sustainable_craft_studio'],
    opportunityTitles: ['Upcycled Sustainable Craft & Apparel Studio'],
    additionalSkills: ['marketing', 'photography', 'pricing', 'woodworking'],
    suggestedProjectIds: ['proj_upcycled_denim_laptop_sleeve'],
    suggestedProjects: [COMPREHENSIVE_PROJECTS_DB[5]],
    entrepreneurialPathway: 'Sustainable Artisan Product Studio',
    financialTemplate: {
      templateName: 'Upcycled Craft Studio Template',
      origin: 'Illustrative',
      startupCosts: [
        { item: 'Heavy-Duty Fabric Scissors & Rotary Cutter', amount: 350, isEssential: true },
        { item: 'Screen Printing Starter Ink & Mesh Frame', amount: 650, isEssential: true },
        { item: 'Zippers, Buckles & Thread Pack', amount: 300, isEssential: true }
      ],
      fixedMonthlyOverhead: [
        { item: 'Sewing Machine Maintenance', amount: 150 }
      ],
      variableCostPerUnit: 120, // Free upcycled jeans + lining fabric + zipper
      suggestedPriceRange: { min: 350, recommended: 650, max: 1200 },
      typicalCustomerVolume: 6,
      estimatedBreakEvenUnits: 3,
      unitDefinition: 'Upcycled Custom Laptop Sleeve Unit',
      financialGuidanceNote: 'Illustrative product margin model showing upcycled raw materials yield 75%+ gross margins.'
    },
    roadmapTemplateId: 'roadmap_vocational_production',
    explanation: 'Tailoring provides physical manufacturing while Graphic Design adds visual identity. Together, they create premium eco-friendly merchandise that commands strong retail demand.',
    origin: 'Curated',
    validationStatus: 'Validated',
    createdAt: '2026-01-01',
    updatedAt: '2026-03-01',
    version: 1,
    relevanceScore: 93
  },

  // ------------------------------------------
  // TIER 3: THREE-SKILL COMBINATIONS
  // ------------------------------------------
  {
    id: 'combo_photography_marketing_communication',
    tier: 'Tier 3',
    skillIds: ['photography', 'marketing', 'communication'],
    skillNames: ['Photography & Lighting', 'Marketing & Audience Outreach', 'Communication & Dialogue'],
    title: 'Full-Service Commercial Media & Client Campaign Agency',
    category: 'Creative-Communication-Entrepreneurial',
    applications: ['Turnkey E-Commerce Product Launch Bundles', 'Brand Storytelling & Merchant Profiling', 'Neighborhood Retail Marketing Campaigns', 'Social Media Retainer Packages'],
    problems: [
      'Small merchants cannot coordinate separate photographers, copywriters, and marketers',
      'Unclear communication leads to disappointing visual campaigns that do not reflect the brand',
      'Artisans lack confidence in pitching and launching their products to new demographics'
    ],
    targetCustomers: ['Neighborhood boutique brands', 'Local culinary artisans and cafes', 'Specialty craft creators', 'Direct-to-consumer student ventures'],
    solutions: [
      'Deliver an end-to-end commercial package: conduct an intake discovery meeting, shoot high-resolution product visuals, write promotional hooks, and deliver a ready-to-run marketing campaign.'
    ],
    opportunityIds: ['product_photography_service', 'freelance_content_creation'],
    opportunityTitles: ['Product Photography & Digital Catalog Service', 'Social Media Content & Video Marketing Agency'],
    additionalSkills: ['pricing', 'client_handling', 'video_editing', 'financial_literacy'],
    suggestedProjectIds: ['proj_tabletop_photo_lookbook'],
    suggestedProjects: [COMPREHENSIVE_PROJECTS_DB[0]],
    entrepreneurialPathway: 'Full-Service Boutique Creative Agency',
    financialTemplate: {
      templateName: 'Full Agency Retainer Template',
      origin: 'Illustrative',
      startupCosts: [
        { item: 'Lighting & Tabletop Props Kit', amount: 500, isEssential: true },
        { item: 'Portfolio Deck & Agreement Printing', amount: 200, isEssential: true }
      ],
      fixedMonthlyOverhead: [
        { item: 'Software Subscriptions & Cloud Storage', amount: 350 }
      ],
      variableCostPerUnit: 150,
      suggestedPriceRange: { min: 1500, recommended: 3000, max: 6000 },
      typicalCustomerVolume: 3,
      estimatedBreakEvenUnits: 1,
      unitDefinition: 'Complete Brand Launch Campaign Package',
      financialGuidanceNote: 'Illustrative model showing that combining dialogue, visual craft, and marketing generates 4x client retention.'
    },
    roadmapTemplateId: 'roadmap_creative_freelance',
    explanation: 'Photography creates the visual assets, Marketing frames the buyer value, and Communication ensures seamless client collaboration and confident pitch delivery.',
    origin: 'Curated',
    validationStatus: 'Validated',
    createdAt: '2026-01-01',
    updatedAt: '2026-03-01',
    version: 1,
    relevanceScore: 99
  },
  {
    id: 'combo_marketing_communication_pricing',
    tier: 'Tier 3',
    skillIds: ['marketing', 'communication', 'pricing'],
    skillNames: ['Marketing & Audience Outreach', 'Communication & Dialogue', 'Pricing Strategy & Unit Economics'],
    title: 'Consultative Commercial Strategy & Client Acquisition Hub',
    category: 'Entrepreneurial-Communication',
    applications: ['Consultative Lead Generation Campaigns', 'High-Converting Proposal & Rate Structuring', 'Tiered Value Proposition Design', 'Customer Discovery & Retention Strategy'],
    problems: [
      'Enterprises market products without understanding unit margins, leading to bankrupting discounts',
      'Sales pitches fail because they talk about features rather than addressing customer pain points',
      'Freelancers give verbal prices that clients easily negotiate down to unprofitable rates'
    ],
    targetCustomers: ['Student enterprise founders', 'Local service providers and tutors', 'Artisanal micro-businesses', 'School event sponsorship leads'],
    solutions: [
      'Design targeted marketing outreach grounded in airtight unit economics and delivered through confident, consultative client discovery.'
    ],
    opportunityIds: ['pricing_and_cost_consultancy', 'market_research_service'],
    opportunityTitles: ['Venture Unit Economics & Pricing Calibration Advisory', 'Community Market Research & Consumer Discovery Service'],
    additionalSkills: ['financial_literacy', 'sales', 'negotiation', 'leadership'],
    suggestedProjectIds: ['proj_unit_economics_pricing_sheet'],
    suggestedProjects: [COMPREHENSIVE_PROJECTS_DB[3]],
    entrepreneurialPathway: 'Commercial Growth & Strategy Consultancy',
    financialTemplate: {
      templateName: 'Commercial Advisory Retainer Template',
      origin: 'Illustrative',
      startupCosts: [
        { item: 'Consulting Methodology Playbook', amount: 250, isEssential: true }
      ],
      fixedMonthlyOverhead: [
        { item: 'Client CRM & Analytical Tools', amount: 200 }
      ],
      variableCostPerUnit: 60,
      suggestedPriceRange: { min: 1200, recommended: 2500, max: 5000 },
      typicalCustomerVolume: 3,
      estimatedBreakEvenUnits: 1,
      unitDefinition: 'Strategy & Pricing Calibration Engagement',
      financialGuidanceNote: 'Illustrative advisory template demonstrating pure value-based pricing with near-zero marginal software cost.'
    },
    roadmapTemplateId: 'roadmap_service_consulting',
    explanation: 'Marketing brings the prospective customer, Communication builds mutual trust, and Pricing ensures that every completed engagement is financially sustainable.',
    origin: 'Curated',
    validationStatus: 'Validated',
    createdAt: '2026-01-01',
    updatedAt: '2026-03-01',
    version: 1,
    relevanceScore: 97
  }
];

// ==========================================
// VALIDATION & COVERAGE ENGINE
// ==========================================

export function validateSkillRecord(skill: Partial<SkillNode>): RecordValidationReport {
  const missing: string[] = [];
  const warnings: string[] = [];

  if (!skill.id) missing.push('id');
  if (!skill.name) missing.push('name');
  if (!skill.category) missing.push('category');
  if (!skill.description) missing.push('description');
  if (!skill.applications || skill.applications.length === 0) missing.push('applications');
  if (!skill.problemsSolved || skill.problemsSolved.length === 0) missing.push('problemsSolved');
  if (!skill.targetUsers || skill.targetUsers.length === 0) missing.push('targetUsers');
  if (!skill.nextSkills || skill.nextSkills.length === 0) warnings.push('nextSkills (empty/unconnected)');

  return {
    isValid: missing.length === 0,
    recordId: skill.id || 'unknown_skill',
    recordType: 'Skill',
    missingFields: missing,
    warnings,
    remediationApplied: false
  };
}

export function validateOpportunityRecord(opp: any): RecordValidationReport {
  const missing: string[] = [];
  const warnings: string[] = [];

  if (!opp.id) missing.push('id');
  if (!opp.title) missing.push('title');
  if (!opp.description && !opp.solution) missing.push('description/solution');
  if (!opp.requiredSkills || opp.requiredSkills.length === 0) missing.push('requiredSkills');
  if (!opp.problems || opp.problems.length === 0) missing.push('problems');
  if (!opp.targetUsers && !opp.targetAudience) warnings.push('targetUsers/audience');
  if (!opp.deliverables || opp.deliverables.length === 0) warnings.push('deliverables');

  return {
    isValid: missing.length === 0,
    recordId: opp.id || 'unknown_opportunity',
    recordType: 'Opportunity',
    missingFields: missing,
    warnings,
    remediationApplied: false
  };
}

export function validateProjectRecord(proj: Partial<ProjectTemplate>): RecordValidationReport {
  const missing: string[] = [];
  const warnings: string[] = [];

  if (!proj.id) missing.push('id');
  if (!proj.name) missing.push('name');
  if (!proj.problemSolved) missing.push('problemSolved');
  if (!proj.deliverables || proj.deliverables.length === 0) missing.push('deliverables');
  if (!proj.skillsPractised || proj.skillsPractised.length === 0) missing.push('skillsPractised');

  return {
    isValid: missing.length === 0,
    recordId: proj.id || 'unknown_project',
    recordType: 'Project',
    missingFields: missing,
    warnings,
    remediationApplied: false
  };
}

export function validateCombinationDetailed(rec: Partial<CombinationRecord>): RecordValidationReport {
  const missing: string[] = [];
  const warnings: string[] = [];

  if (!rec.id) missing.push('id');
  if (!rec.skillIds || rec.skillIds.length === 0) missing.push('skillIds');
  if (!rec.title) missing.push('title');
  if (!rec.applications || rec.applications.length === 0) missing.push('applications');
  if (!rec.problems || rec.problems.length === 0) missing.push('problems');
  if (!rec.targetCustomers || rec.targetCustomers.length === 0) missing.push('targetCustomers');
  if (!rec.solutions || rec.solutions.length === 0) missing.push('solutions');
  if (!rec.opportunityIds || rec.opportunityIds.length === 0) missing.push('opportunityIds');
  if (!rec.additionalSkills || rec.additionalSkills.length === 0) missing.push('additionalSkills');
  if (!rec.entrepreneurialPathway) missing.push('entrepreneurialPathway');
  if (!rec.financialTemplate || !rec.financialTemplate.suggestedPriceRange) missing.push('financialTemplate');
  if (!rec.roadmapTemplateId) missing.push('roadmapTemplateId');
  if (!rec.explanation) missing.push('explanation');

  return {
    isValid: missing.length === 0,
    recordId: rec.id || 'unknown_combination',
    recordType: 'Combination',
    missingFields: missing,
    warnings,
    remediationApplied: false
  };
}

export function validateCombinationRecord(rec: Partial<CombinationRecord>): { isValid: boolean; errors: string[] } {
  const detail = validateCombinationDetailed(rec);
  return {
    isValid: detail.isValid,
    errors: detail.missingFields
  };
}

/**
 * Ensures a combination has required fields populated, remediating any missing values
 * while updating validation status to Incomplete/Candidate and logging remediation notes.
 */
export function remediateCombinationRecord(
  rec: Partial<CombinationRecord>,
  report: RecordValidationReport,
  allSkills: SkillNode[] = COMPREHENSIVE_SKILLS_DB
): { record: CombinationRecord; report: RecordValidationReport } {
  const remediationNotes: string[] = [];
  const skillNames = rec.skillNames || (rec.skillIds || []).map(id => allSkills.find(s => s.id === id)?.name || id);
  const primaryName = skillNames[0] || 'Core Skill';

  // Remediate applications if missing
  let applications = rec.applications && rec.applications.length > 0 ? rec.applications : [];
  if (applications.length === 0) {
    applications = [
      `Applied ${primaryName} Client Delivery`,
      `Practical ${primaryName} Solution Package`,
      `Local Community Milestone for ${skillNames.join(' & ')}`
    ];
    remediationNotes.push('Auto-populated fallback applications based on skill profiles.');
  }

  // Remediate problems if missing
  let problems = rec.problems && rec.problems.length > 0 ? rec.problems : [];
  if (problems.length === 0) {
    problems = [
      `Lack of accessible, structured ${primaryName} services in local area`,
      `Difficulty transforming raw ${skillNames.join(' & ')} practice into verifiable customer deliverables`
    ];
    remediationNotes.push('Auto-populated fallback problem statements.');
  }

  // Remediate targetCustomers if missing
  let targetCustomers = rec.targetCustomers && rec.targetCustomers.length > 0 ? rec.targetCustomers : [];
  if (targetCustomers.length === 0) {
    targetCustomers = ['Local neighborhood merchants', 'Community initiatives & campus clubs', 'Independent creators'];
    remediationNotes.push('Auto-populated standard target customer segments.');
  }

  // Remediate solutions if missing
  let solutions = rec.solutions && rec.solutions.length > 0 ? rec.solutions : [];
  if (solutions.length === 0) {
    solutions = [`Structured end-to-end service deliverable solving verified pain points with ${skillNames.join(' & ')}.`];
    remediationNotes.push('Auto-populated baseline solution.');
  }

  // Remediate additional skills
  let additionalSkills = rec.additionalSkills && rec.additionalSkills.length > 0 ? rec.additionalSkills : [];
  if (additionalSkills.length === 0) {
    additionalSkills = ['communication', 'pricing', 'marketing'];
    remediationNotes.push('Auto-populated complementary baseline skills.');
  }

  // Remediate financial template
  let financialTemplate = rec.financialTemplate;
  if (!financialTemplate || !financialTemplate.suggestedPriceRange) {
    financialTemplate = {
      templateName: `${rec.title || primaryName} Remediation Financial Template`,
      origin: 'Illustrative',
      startupCosts: [{ item: 'Essential Equipment Setup', amount: 400, isEssential: true }],
      fixedMonthlyOverhead: [{ item: 'Digital Tools & Portfolio', amount: 150 }],
      variableCostPerUnit: 60,
      suggestedPriceRange: { min: 500, recommended: 1000, max: 2000 },
      typicalCustomerVolume: 4,
      estimatedBreakEvenUnits: 1,
      unitDefinition: 'Standard Client Package',
      financialGuidanceNote: 'Remediated fallback financial model.'
    };
    remediationNotes.push('Auto-populated fallback financial template.');
  }

  const remediatedRecord: CombinationRecord = {
    id: rec.id || `combo_${(rec.skillIds || ['skill']).join('_')}`,
    tier: rec.tier || 'Tier 2',
    skillIds: rec.skillIds || ['general_skill'],
    skillNames: skillNames.length > 0 ? skillNames : ['General Practical Skill'],
    title: rec.title || `${skillNames.join(' & ')} Practical Micro-Enterprise`,
    category: rec.category || 'General',
    applications,
    problems,
    targetCustomers,
    solutions,
    opportunityIds: rec.opportunityIds && rec.opportunityIds.length > 0 ? rec.opportunityIds : ['product_photography_service'],
    opportunityTitles: rec.opportunityTitles && rec.opportunityTitles.length > 0 ? rec.opportunityTitles : ['General Service Opportunity'],
    additionalSkills,
    suggestedProjectIds: rec.suggestedProjectIds && rec.suggestedProjectIds.length > 0 ? rec.suggestedProjectIds : ['proj_default'],
    suggestedProjects: rec.suggestedProjects && rec.suggestedProjects.length > 0 ? rec.suggestedProjects : [COMPREHENSIVE_PROJECTS_DB[0]],
    entrepreneurialPathway: rec.entrepreneurialPathway || 'Freelance Service Provider',
    financialTemplate,
    roadmapTemplateId: rec.roadmapTemplateId || 'roadmap_creative_freelance',
    explanation: rec.explanation || `Intersects ${skillNames.join(' and ')} to address local consumer needs with verifiable milestones.`,
    origin: rec.origin || 'System Generated',
    validationStatus: report.missingFields.length > 0 ? 'Incomplete' : (rec.validationStatus || 'Validated'),
    validationNotes: [...(rec.validationNotes || []), ...report.missingFields.map(f => `Missing ${f}`), ...remediationNotes],
    createdAt: rec.createdAt || new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0],
    version: (rec.version || 1) + 1,
    relevanceScore: rec.relevanceScore || 85
  };

  const updatedReport: RecordValidationReport = {
    ...report,
    remediationApplied: remediationNotes.length > 0,
    remediationNotes
  };

  return {
    record: remediatedRecord,
    report: updatedReport
  };
}

// ==========================================
// AUTO-FILL PIPELINE: GENERATE MISSING DATA
// ==========================================

export function generateMissingCombinationRecord(
  skillIds: string[],
  allSkills: SkillNode[] = COMPREHENSIVE_SKILLS_DB,
  allOpps = COMPREHENSIVE_OPPORTUNITIES_DB
): CombinationRecord {
  const matchedSkills = skillIds
    .map(id => allSkills.find(s => s.id === id))
    .filter((s): s is SkillNode => Boolean(s));

  const count = matchedSkills.length;
  const skillNames = matchedSkills.map(s => s.name);
  const primaryCategory = matchedSkills[0]?.category || 'Technical';
  const secondaryCategory = matchedSkills[1]?.category;

  const categoryLabel = secondaryCategory && secondaryCategory !== primaryCategory
    ? `${primaryCategory}-${secondaryCategory}`
    : primaryCategory;

  let tier: CombinationTier = 'Tier 2';
  if (count === 1) tier = 'Tier 1';
  else if (count === 2) tier = 'Tier 2';
  else if (count === 3) tier = 'Tier 3';
  else tier = 'Tier 4';

  const comboId = `combo_${skillIds.slice().sort().join('_')}`;

  // Aggregate applications, problems, users, and next skills
  const appSet = new Set<string>();
  const probSet = new Set<string>();
  const userSet = new Set<string>();
  const nextSkillSet = new Set<string>();

  matchedSkills.forEach(s => {
    (s.applications || []).forEach(a => appSet.add(a));
    (s.problemsSolved || []).forEach(p => probSet.add(p));
    (s.targetUsers || []).forEach(u => userSet.add(u));
    (s.nextSkills || []).forEach(n => {
      if (!skillIds.includes(n)) nextSkillSet.add(n);
    });
  });

  // Find best matching opportunities
  const matchingOpps = allOpps.filter(opp => 
    opp.requiredSkills.some(rs => skillIds.includes(rs)) ||
    opp.preferredSkills.some(ps => skillIds.includes(ps))
  );

  const oppIds = matchingOpps.length > 0
    ? matchingOpps.slice(0, 3).map(o => o.id)
    : ['product_photography_service'];

  const oppTitles = matchingOpps.length > 0
    ? matchingOpps.slice(0, 3).map(o => o.title)
    : ['Product Photography & Digital Catalog Service'];

  // Calculate relevance score based on synergy
  let relevance = 75;
  if (count === 2) {
    if (primaryCategory !== secondaryCategory) relevance += 15; // Cross-domain bonus
    else relevance += 10;
  } else if (count === 3) {
    relevance = 88;
  }

  const title = count === 1
    ? `${skillNames[0]} Practical Foundation`
    : count === 2
    ? `Integrated ${skillNames[0]} & ${skillNames[1]} Pathway`
    : `Multi-Disciplinary ${skillNames[0]}, ${skillNames[1]} & ${skillNames[2]} Venture`;

  const solutionSummary = `Bridge the strengths of ${skillNames.join(' and ')} to deliver turnkey, reliable solutions for local community and commercial clients.`;

  const pathway = count === 1
    ? `Specialized ${skillNames[0]} Service Provider`
    : count === 2
    ? `Interdisciplinary Micro-Enterprise (${skillNames[0]} + ${skillNames[1]})`
    : `Full-Service Collaborative Venture Hub`;

  // Select appropriate roadmap template
  let roadmapId = 'roadmap_creative_freelance';
  if (primaryCategory === 'Technical' || secondaryCategory === 'Technical') {
    roadmapId = 'roadmap_hardware_prototype';
  } else if (primaryCategory === 'Practical' || secondaryCategory === 'Practical') {
    roadmapId = 'roadmap_vocational_production';
  } else if (primaryCategory === 'Entrepreneurial' || secondaryCategory === 'Entrepreneurial') {
    roadmapId = 'roadmap_service_consulting';
  }

  // Pre-generate connected project
  const genProject: ProjectTemplate = {
    id: `proj_${comboId}`,
    name: `${skillNames.join(' & ')} Practical Project`,
    tier,
    targetSkillIds: skillIds,
    problemSolved: Array.from(probSet)[0] || 'Solving practical local community requirement.',
    solutionSummary,
    difficulty: count > 2 ? 'Intermediate' : 'Beginner',
    deliverables: [
      `1 Verified Sample Deliverable for ${skillNames[0]}`,
      `1 Structured Process or Product Test Document`,
      `1 Final Presentation Lookbook or Working Demonstration`
    ],
    skillsPractised: skillNames,
    connectedOpportunityId: oppIds[0],
    suggestedDuration: '1 Week'
  };

  const financialTemplate: FinancialAssumptionTemplate = {
    templateName: `${title} Financial Template`,
    origin: 'Illustrative',
    startupCosts: [
      { item: 'Essential Tools & Workstation Setup', amount: 500, isEssential: true },
      { item: 'Initial Demonstration Materials', amount: 300, isEssential: true }
    ],
    fixedMonthlyOverhead: [
      { item: 'Maintenance & Cloud Digital Tools', amount: 200 }
    ],
    variableCostPerUnit: 80,
    suggestedPriceRange: { min: 600, recommended: 1200, max: 2500 },
    typicalCustomerVolume: 4,
    estimatedBreakEvenUnits: 1,
    unitDefinition: 'Standard Deliverable Milestone',
    financialGuidanceNote: 'System-generated illustrative estimate based on regional student micro-service standards.'
  };

  const explanation = `Your capabilities in ${skillNames.join(' and ')} create a coherent foundation for solving real problems in ${Array.from(userSet).slice(0, 2).join(' and ')}. Focus on completing an initial verified project to ground your skills in tangible evidence.`;

  const newRecord: CombinationRecord = {
    id: comboId,
    tier,
    skillIds,
    skillNames,
    title,
    category: categoryLabel,
    applications: Array.from(appSet).slice(0, 4),
    problems: Array.from(probSet).slice(0, 3),
    targetCustomers: Array.from(userSet).slice(0, 3),
    solutions: [solutionSummary],
    opportunityIds: oppIds,
    opportunityTitles: oppTitles,
    additionalSkills: Array.from(nextSkillSet).slice(0, 4),
    suggestedProjectIds: [genProject.id],
    suggestedProjects: [genProject],
    entrepreneurialPathway: pathway,
    financialTemplate,
    roadmapTemplateId: roadmapId,
    explanation,
    origin: 'System Generated',
    validationStatus: 'Candidate',
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0],
    version: 1,
    relevanceScore: relevance
  };

  // Run validation
  const val = validateCombinationRecord(newRecord);
  if (val.isValid) {
    newRecord.validationStatus = 'Validated';
  } else {
    newRecord.validationStatus = 'Candidate';
    newRecord.validationNotes = val.errors;
  }

  return newRecord;
}

// ==========================================
// PHASE 6 TEST CASES REPOSITORY
// ==========================================

export const PHASE_6_TEST_CASES: Phase6TestCase[] = [
  {
    id: 'tc_1_single_skill',
    name: '1. Single Skill Test (Photography)',
    testType: 'SINGLE_SKILL',
    inputSkillIds: ['photography'],
    inputSkillNames: ['Photography & Lighting'],
    expectedResult: {
      combinationExists: true,
      hasApplications: true,
      hasProblems: true,
      hasCustomers: true,
      hasSolutions: true,
      hasOpportunities: true,
      hasAdditionalSkills: true,
      hasProjects: true,
      hasRoadmap: true,
      hasGoneExplanation: true
    }
  },
  {
    id: 'tc_2_two_skills',
    name: '2. Two Skills Test (Photography + Marketing)',
    testType: 'TWO_SKILLS',
    inputSkillIds: ['photography', 'marketing'],
    inputSkillNames: ['Photography & Lighting', 'Marketing & Audience Outreach'],
    expectedResult: {
      combinationExists: true,
      hasApplications: true,
      hasProblems: true,
      hasCustomers: true,
      hasSolutions: true,
      hasOpportunities: true,
      hasAdditionalSkills: true,
      hasProjects: true,
      hasRoadmap: true,
      hasGoneExplanation: true
    }
  },
  {
    id: 'tc_3_three_skills',
    name: '3. Three Skills Test (Photography + Marketing + Communication)',
    testType: 'THREE_SKILLS',
    inputSkillIds: ['photography', 'marketing', 'communication'],
    inputSkillNames: ['Photography & Lighting', 'Marketing & Audience Outreach', 'Communication & Dialogue'],
    expectedResult: {
      combinationExists: true,
      hasApplications: true,
      hasProblems: true,
      hasCustomers: true,
      hasSolutions: true,
      hasOpportunities: true,
      hasAdditionalSkills: true,
      hasProjects: true,
      hasRoadmap: true,
      hasGoneExplanation: true
    }
  },
  {
    id: 'tc_4_technical',
    name: '4. Technical Test (Coding + Design)',
    testType: 'TECHNICAL',
    inputSkillIds: ['coding', 'graphic_design'],
    inputSkillNames: ['Coding & Web Development', 'Graphic Design'],
    expectedResult: {
      combinationExists: true,
      hasApplications: true,
      hasProblems: true,
      hasCustomers: true,
      hasSolutions: true,
      hasOpportunities: true,
      hasAdditionalSkills: true,
      hasProjects: true,
      hasRoadmap: true,
      hasGoneExplanation: true
    }
  },
  {
    id: 'tc_5_vocational',
    name: '5. Vocational Test (Agriculture + Technology / IoT)',
    testType: 'VOCATIONAL',
    inputSkillIds: ['agriculture', 'electronics'],
    inputSkillNames: ['Agriculture & Hydroponics', 'Electronics & Circuits'],
    expectedResult: {
      combinationExists: true,
      hasApplications: true,
      hasProblems: true,
      hasCustomers: true,
      hasSolutions: true,
      hasOpportunities: true,
      hasAdditionalSkills: true,
      hasProjects: true,
      hasRoadmap: true,
      hasGoneExplanation: true
    }
  },
  {
    id: 'tc_6_entrepreneurial',
    name: '6. Entrepreneurial Test (Marketing + Communication + Pricing/Budgeting)',
    testType: 'ENTREPRENEURIAL',
    inputSkillIds: ['marketing', 'communication', 'pricing'],
    inputSkillNames: ['Marketing & Audience Outreach', 'Communication & Dialogue', 'Pricing Strategy & Unit Economics'],
    expectedResult: {
      combinationExists: true,
      hasApplications: true,
      hasProblems: true,
      hasCustomers: true,
      hasSolutions: true,
      hasOpportunities: true,
      hasAdditionalSkills: true,
      hasProjects: true,
      hasRoadmap: true,
      hasGoneExplanation: true
    }
  },
  {
    id: 'tc_7_cross_domain',
    name: '7. Cross-Domain Test (Electronics + Agriculture)',
    testType: 'CROSS_DOMAIN',
    inputSkillIds: ['electronics', 'agriculture'],
    inputSkillNames: ['Electronics & Circuits', 'Agriculture & Hydroponics'],
    expectedResult: {
      combinationExists: true,
      hasApplications: true,
      hasProblems: true,
      hasCustomers: true,
      hasSolutions: true,
      hasOpportunities: true,
      hasAdditionalSkills: true,
      hasProjects: true,
      hasRoadmap: true,
      hasGoneExplanation: true
    }
  },
  {
    id: 'tc_8_extreme_unmapped',
    name: '8. Extreme / Unmapped Input Test (Auto-Fill & Knowledge Gap Protocol)',
    testType: 'EXTREME_UNMAPPED',
    inputSkillIds: ['cooking', 'coding'],
    inputSkillNames: ['Cooking & Culinary Arts', 'Coding & Web Development'],
    expectedResult: {
      combinationExists: false,
      hasApplications: true,
      hasProblems: true,
      hasCustomers: true,
      hasSolutions: true,
      hasOpportunities: true,
      hasAdditionalSkills: true,
      hasProjects: true,
      hasRoadmap: true,
      hasGoneExplanation: true,
      isUnmappedGap: true
    }
  }
];
