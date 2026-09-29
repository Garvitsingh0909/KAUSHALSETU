/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — ENTREPRENEURIAL ASSESSMENT QUESTION BANKS & RUBRICS
 * Covers: problem_solving, leadership, marketing, pricing, financial_literacy, sales, project_management, market_research
 */

import { AssessmentProfile } from '../assessmentTypes';

export const ENTREPRENEURIAL_ASSESSMENTS: AssessmentProfile[] = [
  // 1. Problem Solving & System Design
  {
    skillId: 'problem_solving',
    skillName: 'Problem Solving & System Design',
    category: 'Entrepreneurial',
    version: 1,
    published: true,
    lastUpdated: '2026-03-01',
    commonMistakes: [
      {
        mistake: 'Jumping directly to implement solutions before isolating the true root cause using 5-Whys or Fishbone diagrams.',
        guidance: 'Always conduct a structured root-cause analysis before proposing fixes.'
      }
    ],
    recommendedNextSkills: ['project_management', 'data_analysis', 'communication'],
    recommendedProjects: ['5-Whys Canteen Queue Optimization', 'Design Thinking Empathy Map for First-Time App Users', 'Registration Process Re-engineering Blueprint'],
    practicalTask: {
      id: 'task_ps_5whys_blueprint',
      skillId: 'problem_solving',
      title: 'Conduct a 5-Whys Root Cause Analysis & Design a Countermeasure System',
      instructions: 'Analyze a chronic operational problem (e.g., 40% of students arrive 15 minutes late to the first morning period) using the 5-Whys methodology, propose a systemic structural countermeasure, and design a verification metric.',
      starterTemplate: `# Problem-Solving & Root Cause Analysis Case: Morning Class Tardiness
Problem Statement: 40% of students in Block B arrive 15 minutes late to Period 1.

1. The 5-Whys Diagnostic Chain:
   - Why 1: Why are students late to Block B? -> Because they get stuck in the 2nd-floor hallway bottleneck.
   - Why 2: Why is there a hallway bottleneck? -> Because 300 students all try to access locker bays at 7:55 AM.
   - Why 3: Why do all students access lockers at 7:55 AM? -> Because school rules forbid bringing backpacks into morning homeroom.
   - Why 4: Why do homeroom rules forbid backpacks? -> Because cluttered aisles failed fire safety inspection in 2023.
   - Why 5 (ROOT CAUSE): The current desk layout lacks under-seat bag hooks, creating a false choice between fire safety and hallway gridlock.

2. Systemic Countermeasure (Eliminate Root Cause, Not Symptoms):
   - Structural Intervention: Install ₹40 heavy-duty under-desk steel hooks in all Block B homerooms.
   - Policy Change: Permit bags inside homeroom suspended under desks; keep lockers for sports gear only.

3. Measurement & Verification KPI:
   - Target: Reduce Period 1 tardiness from 40% to < 5% within 10 school days.`,
      expectedOutput: 'Rigorous 5-Whys chain uncovering structural root cause with low-cost, high-impact countermeasure.',
      totalRubricPoints: 20,
      timeEstimateMinutes: 15,
      demonstrationOptions: ['text', 'file', 'link'],
      rubric: [
        {
          id: 'crit_ps_rootcause',
          name: 'Root-Cause Rigor (5-Whys Chain)',
          maxPoints: 5,
          description: 'Drills past superficial symptoms to expose underlying structural/systemic flaws.',
          levelDescriptors: {
            5: 'Deep, watertight logical progression linking symptoms to fundamental systemic causes.',
            3: 'Good 5-whys with minor jump in logic.',
            1: 'Circular reasoning or treating symptoms as root cause.'
          }
        },
        {
          id: 'crit_ps_countermeasure',
          name: 'Systemic Countermeasure Design',
          maxPoints: 5,
          description: 'Designs elegant structural solutions rather than relying on "reminding people to try harder".',
          levelDescriptors: {
            5: 'Poka-yoke (mistake-proofing) structural solution that makes failure impossible.',
            3: 'Effective policy solution.',
            1: 'Ineffective reminder/punishment approach.'
          }
        },
        {
          id: 'crit_ps_metrics',
          name: 'Verification Metrics & Feedback Loops',
          maxPoints: 5,
          description: 'Defines quantifiable baseline and target success metrics.',
          levelDescriptors: {
            5: 'Precise quantitative metrics with automated feedback monitoring.',
            3: 'Clear target metric.',
            1: 'Vague, unmeasurable goal.'
          }
        },
        {
          id: 'crit_ps_feasibility',
          name: 'Resource Efficiency & Feasibility',
          maxPoints: 5,
          description: 'Proposes realistic, low-cost interventions respecting existing constraints.',
          levelDescriptors: {
            5: 'High-leverage, low-cost execution respecting institutional reality.',
            3: 'Feasible solution.',
            1: 'Unrealistic, overly expensive proposal.'
          }
        }
      ]
    },
    questions: [
      {
        id: 'q_ps_01',
        skillId: 'problem_solving',
        difficulty: 'Foundation',
        type: 'multiple_choice',
        competency: 'Root Cause Analysis',
        question: 'In Toyota Lean Manufacturing and System Design, what is the primary purpose of the "5-Whys" technique?',
        options: [
          'To peel away surface symptoms and discover the underlying root cause of a defect by asking "why" iteratively.',
          'To interrogate employees until someone takes the blame.',
          'To delay fixing a problem for 5 days.',
          'To write a 5-page essay.'
        ],
        correctAnswer: 'To peel away surface symptoms and discover the underlying root cause of a defect by asking "why" iteratively.',
        explanation: 'Asking "why" repeatedly drills past human error and superficial symptoms to find the broken process or system design responsible for the issue.',
        validationStatus: 'Validated',
        version: 1
      }
    ]
  },

  // 2. Team Leadership & Coordination
  {
    skillId: 'leadership',
    skillName: 'Team Leadership & Coordination',
    category: 'Entrepreneurial',
    version: 1,
    published: true,
    lastUpdated: '2026-03-01',
    commonMistakes: [
      {
        mistake: 'Micromanaging tasks or, conversely, delegating without clear milestones and accountability frameworks (RACI).',
        guidance: 'Define clear ownership using RACI (Responsible, Accountable, Consulted, Informed) and hold 15-minute weekly standups.'
      }
    ],
    recommendedNextSkills: ['communication', 'project_management', 'public_speaking'],
    recommendedProjects: ['RACI Matrix for School Exhibition Team', 'Agile Daily Standup Protocol', 'Volunteer Recognition & Motivation Framework'],
    practicalTask: {
      id: 'task_lead_raci_standup',
      skillId: 'leadership',
      title: 'Build a Team Responsibility Matrix (RACI) & Sprint Delegation Plan',
      instructions: 'Develop a RACI matrix and a 15-minute weekly team coordination agenda for a 4-person student team building a smart recycling bin for the CBSE National Science Exhibition.',
      starterTemplate: `# Team Leadership Framework: Smart Recycling Bin Project
Team Members: 4 Students (Hardware Lead, Software Lead, Design Lead, Project Manager)

1. RACI Responsibility Matrix:
   - Task 1: Ultrasonic Sensor & Arduino Wiring -> R: Hardware Lead | A: Hardware Lead | C: Software Lead | I: Project Manager
   - Task 2: Cloud Dashboard API -> R: Software Lead | A: Software Lead | C: Project Manager | I: Hardware Lead
   - Task 3: 3D-Printed Chassis & Poster Design -> R: Design Lead | A: Design Lead | C: Hardware Lead | I: Team
   - Task 4: Budget, Submission & Stage Pitch -> R: Project Manager | A: Project Manager | C: Team | I: School Mentor

2. 15-Minute Agile Standup Meeting Structure:
   - What did you accomplish since last standup? (2 mins each)
   - What will you deliver before the next milestone? (2 mins each)
   - What blockers or dependencies are slowing you down? (Action logged by PM immediately)

3. Psychological Safety & Peer Recognition Mechanism:
   - "Unsung Hero" weekly callout acknowledging behind-the-scenes troubleshooting.`,
      expectedOutput: 'Comprehensive RACI matrix eliminating role ambiguity, paired with time-boxed standup protocols.',
      totalRubricPoints: 20,
      timeEstimateMinutes: 15,
      demonstrationOptions: ['text', 'file', 'link'],
      rubric: [
        {
          id: 'crit_lead_raci',
          name: 'RACI Matrix Clarity & Ownership',
          maxPoints: 5,
          description: 'Explicitly defines single Accountable owner per deliverable to prevent dropped balls.',
          levelDescriptors: {
            5: 'Pristine RACI matrix with zero overlap and clear single-point accountability.',
            3: 'Good task delegation with minor ambiguity.',
            1: 'Vague delegation where everyone or no one is responsible.'
          }
        },
        {
          id: 'crit_lead_coordination',
          name: 'Agile Cadence & Standup Governance',
          maxPoints: 5,
          description: 'Structured time-boxed meetings focusing on blockers and deliverable commitments.',
          levelDescriptors: {
            5: 'High-velocity 15-minute agile standup protocol resolving dependencies.',
            3: 'Good meeting format.',
            1: 'Unstructured rambling meetings.'
          }
        },
        {
          id: 'crit_lead_safety',
          name: 'Psychological Safety & Motivation',
          maxPoints: 5,
          description: 'Fosters team trust, celebrates peer contributions, and handles mistakes constructively.',
          levelDescriptors: {
            5: 'Inspiring, empathetic leadership promoting continuous learning and psychological safety.',
            3: 'Supportive leadership.',
            1: 'Blame-oriented or authoritarian posture.'
          }
        },
        {
          id: 'crit_lead_risk',
          name: 'Proactive Blocker Removal',
          maxPoints: 5,
          description: 'Anticipates friction points and acts proactively to clear team bottlenecks.',
          levelDescriptors: {
            5: 'Anticipatory leadership clearing roadblocks before they derail deadlines.',
            3: 'Addresses blockers when raised.',
            1: 'Ignores team blockers.'
          }
        }
      ]
    },
    questions: [
      {
        id: 'q_ld_01',
        skillId: 'leadership',
        difficulty: 'Foundation',
        type: 'multiple_choice',
        competency: 'Role Clarity (RACI)',
        question: 'In a RACI responsibility matrix, what is the golden rule regarding the "A" (Accountable) role for any given deliverable?',
        options: [
          'There MUST be exactly ONE person Accountable per task (if multiple people are accountable, no one is accountable).',
          'Everyone in the company must be Accountable.',
          'Accountable means you are fired if the project is late.',
          'Accountable people do not need to do any work.'
        ],
        correctAnswer: 'There MUST be exactly ONE person Accountable per task (if multiple people are accountable, no one is accountable).',
        explanation: 'Singular accountability ensures clear ownership and decision-making authority, eliminating finger-pointing when deliverables face obstacles.',
        validationStatus: 'Validated',
        version: 1
      }
    ]
  },

  // 3. Marketing & Audience Outreach
  {
    skillId: 'marketing',
    skillName: 'Marketing & Audience Outreach',
    category: 'Entrepreneurial',
    version: 1,
    published: true,
    lastUpdated: '2026-03-01',
    commonMistakes: [
      {
        mistake: 'Marketing to "everyone" with generic messaging instead of defining a specific, granular target persona.',
        guidance: 'Create a detailed Buyer Persona with specific pains, preferred channels, and willingness-to-pay.'
      }
    ],
    recommendedNextSkills: ['content_creation', 'graphic_design', 'pricing'],
    recommendedProjects: ['Target Persona Profile for Local Bakery', 'Multi-Channel Outreach Plan for Science Expo', 'A/B Test Flyer Conversion Report'],
    practicalTask: {
      id: 'task_mkt_persona_campaign',
      skillId: 'marketing',
      title: 'Design a Buyer Persona & Multi-Channel Launch Campaign Strategy',
      instructions: 'Create a Target Customer Persona for a student-led organic microgreens delivery service and design a 3-stage marketing funnel (Awareness -> Consideration -> Conversion) with concrete KPIs and channel tactics.',
      starterTemplate: `# Marketing Strategy: "GreenSprout" Organic Microgreens
Target Market: Health-Conscious Urban Families & Fitness Enthusiasts

1. Ideal Buyer Persona ("Nutrition-Conscious Neha"):
   - Demographics: Age 32-45, Working Parent, shops at organic markets.
   - Core Pain Point: Wants fresh, chemical-free greens for family salads but grocery store greens wilt in 2 days.
   - Value Proposition: Harvested on the morning of delivery; 40x higher nutrient density than mature greens.

2. Three-Stage Marketing Funnel:
   - Top-of-Funnel (Awareness): 30-second recipe reels on Instagram showing "10-Second Salad Upgrades" + Free tasting samples at local morning yoga club.
   - Middle-of-Funnel (Consideration): 1-page WhatsApp PDF guide: "Microgreens vs Regular Spinach: Nutritional Comparison Chart".
   - Bottom-of-Funnel (Conversion): "First Week Trial Pack (3 trays for ₹199)" with subscription discount.

3. Key Performance Indicators (KPIs):
   - Sample-to-Order Conversion Rate Target: > 25%
   - Customer Acquisition Cost (CAC): < ₹40 per subscriber.`,
      expectedOutput: 'Detailed customer persona with mapped funnel stages, concrete channel tactics, and measurable conversion metrics.',
      totalRubricPoints: 20,
      timeEstimateMinutes: 15,
      demonstrationOptions: ['text', 'file', 'link'],
      rubric: [
        {
          id: 'crit_mkt_persona',
          name: 'Persona Granularity & Pain Point Depth',
          maxPoints: 5,
          description: 'Identifies specific emotional drivers, habits, and obstacles of target buyers.',
          levelDescriptors: {
            5: 'Deeply grounded, authentic customer persona with concrete behavioral insights.',
            3: 'Good persona with basic demographics.',
            1: 'Generic "everyone" target audience.'
          }
        },
        {
          id: 'crit_mkt_funnel',
          name: 'Full-Funnel Strategy (Awareness to Conversion)',
          maxPoints: 5,
          description: 'Designs coherent journey from cold attention to paid subscription.',
          levelDescriptors: {
            5: 'Seamless, frictionless funnel with tailored content at each touchpoint.',
            3: 'Good funnel with minor conversion gaps.',
            1: 'Single disjointed advertisement with no follow-up path.'
          }
        },
        {
          id: 'crit_mkt_valueprop',
          name: 'Unique Value Proposition (UVP) & Differentiation',
          maxPoints: 5,
          description: 'Articulates why customers should choose this offering over alternatives.',
          levelDescriptors: {
            5: 'Irresistible, sharp UVP highlighted across all messaging.',
            3: 'Clear value proposition.',
            1: 'Vague generic slogans.'
          }
        },
        {
          id: 'crit_mkt_cac',
          name: 'Customer Acquisition Economics & KPIs',
          maxPoints: 5,
          description: 'Calculates realistic conversion rates and tracks CAC vs Lifetime Value.',
          levelDescriptors: {
            5: 'Data-driven marketing plan with measurable ROI and low-cost growth loops.',
            3: 'Clear KPIs defined.',
            1: 'No metrics or unrealistic conversion assumptions.'
          }
        }
      ]
    },
    questions: [
      {
        id: 'q_mkt_01',
        skillId: 'marketing',
        difficulty: 'Foundation',
        type: 'multiple_choice',
        competency: 'Marketing Funnel Concept',
        question: 'In marketing, what is the fundamental difference between the "Top-of-Funnel" (TOFU) and "Bottom-of-Funnel" (BOFU)?',
        options: [
          'TOFU focuses on building broad awareness and educating people about a problem, while BOFU focuses on converting qualified leads into paying customers.',
          'TOFU is for tall people and BOFU is for short people.',
          'TOFU is only for TV ads.',
          'BOFU is free and TOFU is expensive.'
        ],
        correctAnswer: 'TOFU focuses on building broad awareness and educating people about a problem, while BOFU focuses on converting qualified leads into paying customers.',
        explanation: 'Marketing funnels guide prospective customers through distinct stages: broad awareness -> deep consideration -> final purchase decision.',
        validationStatus: 'Validated',
        version: 1
      }
    ]
  },

  // 4. Pricing Strategy & Unit Economics
  {
    skillId: 'pricing',
    skillName: 'Pricing Strategy & Unit Economics',
    category: 'Entrepreneurial',
    version: 1,
    published: true,
    lastUpdated: '2026-03-01',
    commonMistakes: [
      {
        mistake: 'Pricing services based only on direct material costs while ignoring overhead, labor time, and profit margins.',
        guidance: 'Always calculate: Price = (Direct Materials + Labor + Overhead) / (1 - Target Margin%).'
      }
    ],
    recommendedNextSkills: ['financial_literacy', 'negotiation', 'market_research'],
    recommendedProjects: ['Unit Economics Calculator for Photography Studio', '3-Tier Service Package Matrix', 'Break-Even Volume Sensitivity Chart'],
    practicalTask: {
      id: 'task_price_uniteconomics_matrix',
      skillId: 'pricing',
      title: 'Calculate Complete Unit Economics, Contribution Margin & 3-Tier Pricing',
      instructions: 'Calculate the Cost of Goods Sold (COGS), Fixed Overhead, Contribution Margin, and Break-Even Customer Volume for a student graphic design service, then construct a 3-Tier Pricing Matrix (Starter, Standard, Pro).',
      starterTemplate: `# Unit Economics & Tiered Pricing Model: Graphic Design Studio

1. Unit Cost Breakdown (Per Standard Logo & Brand Kit):
   - Software Subscription Allocation (Figma/Adobe): ₹200 per project
   - Font & Asset Licensing: ₹300 per project
   - Designer Labor (8 Hours @ ₹250/hr): ₹2,000
   - Total Variable Cost per Unit (COGS): ₹2,500

2. Fixed Monthly Overhead:
   - Portfolio Website Hosting + Internet: ₹1,500 / month

3. 3-Tier Pricing Matrix:
   - Tier 1 (Starter - Quick Logo): Price ₹2,999 | Margin: 35% | Deliverable: 1 Logo concept + PNG/SVG files
   - Tier 2 (Standard - Brand Identity): Price ₹5,999 | Margin: 58% | Deliverable: 3 Concepts, Color Palette, Typography & Social Kit
   - Tier 3 (Pro - Complete Business Launch): Price ₹11,999 | Margin: 72% | Deliverable: Full Guidelines, Stationery, 10 Social Templates + Priority 48hr turnaround

4. Break-Even Analysis (at Standard Tier ₹5,999):
   - Contribution Margin per unit = ₹5,999 - ₹2,500 = ₹3,499
   - Break-even units = ₹1,500 fixed cost / ₹3,499 = 0.43 projects (profitable on 1st project!).`,
      expectedOutput: 'Detailed unit economic breakdown with contribution margins, break-even math, and tiered value anchors.',
      totalRubricPoints: 20,
      timeEstimateMinutes: 15,
      demonstrationOptions: ['text', 'file', 'link'],
      rubric: [
        {
          id: 'crit_price_cogs',
          name: 'COGS & Variable Cost Accuracy',
          maxPoints: 5,
          description: 'Calculates direct materials, labor hours, and operational expenses accurately.',
          levelDescriptors: {
            5: 'Comprehensive cost modeling including labor valuation and amortized asset wear.',
            3: 'Good cost calculation with minor overhead omission.',
            1: 'Under-estimates costs by ignoring labor or overhead.'
          }
        },
        {
          id: 'crit_price_margins',
          name: 'Contribution Margin & Break-Even Math',
          maxPoints: 5,
          description: 'Correctly applies Contribution Margin = (Price - Variable Cost) and Break-Even formulas.',
          levelDescriptors: {
            5: 'Flawless financial calculations with break-even volume sensitivities.',
            3: 'Correct formulas with minor math slip.',
            1: 'Broken financial formulas.'
          }
        },
        {
          id: 'crit_price_tiers',
          name: '3-Tier Value Packaging & Anchoring',
          maxPoints: 5,
          description: 'Structures Starter, Standard, Pro tiers with clear decoy anchoring and margin expansion.',
          levelDescriptors: {
            5: 'Masterful behavioral pricing tiers driving customers naturally to highest-value middle/pro tier.',
            3: 'Clear 3 tiers with distinct features.',
            1: 'Arbitrary prices without clear feature differentiation.'
          }
        },
        {
          id: 'crit_price_strategy',
          name: 'Market Positioning & Value Perception',
          maxPoints: 5,
          description: 'Aligns price points with perceived client ROI rather than low-ball bidding.',
          levelDescriptors: {
            5: 'Value-based pricing capturing fair share of client economic upside.',
            3: 'Competitive market pricing.',
            1: 'Race-to-the-bottom pricing resulting in operational losses.'
          }
        }
      ]
    },
    questions: [
      {
        id: 'q_prc_01',
        skillId: 'pricing',
        difficulty: 'Foundation',
        type: 'multiple_choice',
        competency: 'Break-Even Formula',
        question: 'If your monthly fixed rent/tools cost is ₹6,000, your product sells for ₹500, and it costs ₹200 in raw materials to make each unit, how many units must you sell each month to break even?',
        options: [
          '20 units (Contribution Margin = ₹300; ₹6,000 / ₹300 = 20)',
          '12 units',
          '30 units',
          '100 units'
        ],
        correctAnswer: '20 units (Contribution Margin = ₹300; ₹6,000 / ₹300 = 20)',
        explanation: 'Break-Even Quantity = Fixed Costs / (Selling Price - Variable Cost per unit) = ₹6,000 / (₹500 - ₹200) = 20 units.',
        validationStatus: 'Validated',
        version: 1
      }
    ]
  },

  // 5. Financial Literacy & Bookkeeping
  {
    skillId: 'financial_literacy',
    skillName: 'Financial Literacy & Bookkeeping',
    category: 'Entrepreneurial',
    version: 1,
    published: true,
    lastUpdated: '2026-03-01',
    commonMistakes: [
      {
        mistake: 'Mixing personal pocket money with business sales revenue in a single bank account or cash wallet.',
        guidance: 'Maintain strict separation between personal savings and venture operating cash.'
      },
      {
        mistake: 'Assuming that "Revenue" equals "Profit", leading to premature spending before covering operational debts.',
        guidance: 'Always calculate Net Profit = Revenue - All Expenses - Reserves.'
      }
    ],
    recommendedNextSkills: ['pricing', 'data_analysis', 'project_management'],
    recommendedProjects: ['Venture Cash-Flow Spreadsheet', '1-Month Micro-Bakery P&L Statement', 'Emergency Reserve Allocation Model'],
    practicalTask: {
      id: 'task_fin_cashflow_statement',
      skillId: 'financial_literacy',
      title: 'Build a Monthly Cash-Flow Ledger & Profit and Loss (P&L) Statement',
      instructions: 'Draft a 1-month double-entry cash flow ledger and Net Profit summary for a student-run event photography service that completed 4 shoots. Calculate Gross Revenue, Total Direct Expenses, Gross Profit, Overhead, and Net Profit.',
      starterTemplate: `# Monthly Profit & Loss Statement (P&L)
Venture: FocusCraft Media | Month: October 2026

1. Revenue (Inflows):
   - Shoot #1 (School Annual Day): ₹4,500
   - Shoot #2 (Bakery Product Catalog): ₹3,000
   - Shoot #3 (Birthday Party): ₹2,500
   - Shoot #4 (Sports Day): ₹4,000
   - TOTAL GROSS REVENUE: ₹14,000

2. Cost of Goods Sold / Direct Job Expenses:
   - Assistant Labor Fees: ₹2,400
   - Transport & Travel: ₹800
   - Cloud Gallery Client Delivery Subscriptions: ₹600
   - TOTAL DIRECT EXPENSES: ₹3,800

3. GROSS PROFIT = Revenue - Direct Expenses = ₹10,200 (Gross Margin: 72.8%)

4. Operating Overhead & Reserves:
   - Equipment Maintenance / Sinking Fund Reserve: ₹1,500
   - Marketing Flyers & Ads: ₹700
   - TOTAL OPERATING OVERHEAD: ₹2,200

5. NET PROFIT = Gross Profit - Overhead = ₹8,000 (Net Margin: 57.1%)
   - Retained Earnings for Venture Reinvestment (40%): ₹3,200
   - Founder Dividend / Labor Payout (60%): ₹4,800`,
      expectedOutput: 'Structured P&L statement accurately distinguishing between Revenue, COGS, Gross Profit, Operating Overhead, and Net Profit.',
      totalRubricPoints: 20,
      timeEstimateMinutes: 15,
      demonstrationOptions: ['text', 'file', 'link'],
      rubric: [
        {
          id: 'crit_fin_revenue_profit',
          name: 'Revenue vs Profit Differentiation',
          maxPoints: 5,
          description: 'Clearly distinguishes Gross Revenue from Net Profit after all expenses.',
          levelDescriptors: {
            5: 'Flawless accounting separation between Revenue, Gross Profit, and Net Income.',
            3: 'Correct calculations with minor expense misclassification.',
            1: 'Confuses cash inflow with pure profit.'
          }
        },
        {
          id: 'crit_fin_reserves',
          name: 'Reinvestment & Sinking Fund Reserves',
          maxPoints: 5,
          description: 'Allocates reserves for future equipment replacement and unforeseen emergencies.',
          levelDescriptors: {
            5: 'Prudent reserve planning protecting long-term venture solvency.',
            3: 'Includes basic reserve.',
            1: 'Zero reserves allocated (100% extracted as cash).'
          }
        },
        {
          id: 'crit_fin_ledger_integrity',
          name: 'Bookkeeping Ledger Structure',
          maxPoints: 5,
          description: 'Maintains chronological receipts, clean categories, and balanced sums.',
          levelDescriptors: {
            5: 'Clean double-entry ledger structure with balanced audit trail.',
            3: 'Readable single-entry ledger.',
            1: 'Disorganized receipts with missing numbers.'
          }
        },
        {
          id: 'crit_fin_tax_banking',
          name: 'Compliance & Banking Separation',
          maxPoints: 5,
          description: 'Maintains dedicated business ledger and understands tax fundamentals.',
          levelDescriptors: {
            5: 'Professional financial discipline ready for audit.',
            3: 'Good financial discipline.',
            1: 'Muddled personal and business finances.'
          }
        }
      ]
    },
    questions: [
      {
        id: 'q_fin_01',
        skillId: 'financial_literacy',
        difficulty: 'Foundation',
        type: 'multiple_choice',
        competency: 'Revenue vs Net Profit',
        question: 'A student makes and sells 50 customized phone cases for ₹200 each, generating ₹10,000 in total sales. The blank cases and printing ink cost ₹6,000, and postal courier fees were ₹1,500. What is their actual Net Profit?',
        options: [
          '₹2,500 (Net Profit = ₹10,000 - ₹6,000 - ₹1,500)',
          '₹10,000',
          '₹4,000',
          '₹7,500'
        ],
        correctAnswer: '₹2,500 (Net Profit = ₹10,000 - ₹6,000 - ₹1,500)',
        explanation: 'Net Profit is the residual money left strictly after subtracting all direct production costs and operating expenses from total revenue.',
        validationStatus: 'Validated',
        version: 1
      },
      {
        id: 'q_fin_02',
        skillId: 'financial_literacy',
        difficulty: 'Intermediate',
        type: 'scenario',
        competency: 'Cash Flow vs Profit',
        scenarioContext: 'A bakery business shows a "paper profit" of ₹50,000 on its monthly ledger, but cannot pay its flour supplier tomorrow because its bank account has only ₹800.',
        question: 'What is the root cause of this frequent small business crisis?',
        options: [
          'Accounts Receivable delay (customers were allowed to buy on credit and have not paid cash yet, creating a cash-flow crunch).',
          'The bank lost the money.',
          'Profit automatically pays bills instantly.',
          'Flour is too heavy.'
        ],
        correctAnswer: 'Accounts Receivable delay (customers were allowed to buy on credit and have not paid cash yet, creating a cash-flow crunch).',
        explanation: 'A business can be profitable on paper but go bankrupt due to cash-flow timing gaps when customer payments are delayed while vendor bills are due immediately.',
        validationStatus: 'Validated',
        version: 1
      }
    ]
  },

  // 6. Sales & Customer Relations
  {
    skillId: 'sales',
    skillName: 'Sales & Customer Relations',
    category: 'Entrepreneurial',
    version: 1,
    published: true,
    lastUpdated: '2026-03-01',
    commonMistakes: [
      {
        mistake: 'Pushing features aggressively instead of listening to customer pain points and matching relevant solutions.',
        guidance: 'Use consultative selling: ask 70% of the time, pitch your solution 30% of the time.'
      }
    ],
    recommendedNextSkills: ['communication', 'client_handling', 'negotiation'],
    recommendedProjects: ['Consultative Discovery Sales Script for Retailers', 'Customer Retention Follow-up Cadence', 'Exhibition Stall Engagement Playbook'],
    practicalTask: {
      id: 'task_sales_consultative_script',
      skillId: 'sales',
      title: 'Draft a Consultative Discovery Sales Script & Objection Handling Matrix',
      instructions: 'Write a consultative sales conversation script for pitching an automated WhatsApp billing and notification tool to a local grocery store owner, including responses to the 3 most common objections (e.g., "I already have a paper notebook", "Too expensive", "I am not good with computers").',
      starterTemplate: `# Consultative Sales Script: Local Grocery Automation
Prospect: Mr. Gupta (Owner of Neighborhood Provision Store)

1. Rapport & Diagnostic Opening:
   - "Namaste Gupta ji! I noticed you were personally writing out 40 credit ledger bills by hand during the evening rush yesterday. How many hours do you usually spend reconciling that register at night?"

2. Pain Magnification & Solution Framing:
   - "When customers forget their monthly credit balance, having to call them one by one takes over 5 hours every Sunday. What if every purchase sent an automatic instant WhatsApp receipt with your store's name, so there is zero dispute at month-end?"

3. Objection Handling Matrix:
   - Objection 1: "My paper notebook has worked fine for 20 years."
     -> Response: "Paper is great until water spills on it or a page tears. This tool works alongside your paper—you just tap 2 buttons on your phone and you have a lifetime backup."
   - Objection 2: "I am not tech-savvy."
     -> Response: "If you know how to send a WhatsApp message to your family, you already know 100% of how to use this. Let me show you in 30 seconds."
   - Objection 3: "It's too expensive."
     -> Response: "At ₹199/month, saving just one forgotten ₹500 credit bill pays for the entire year."

4. Frictionless Trial Close:
   - "Can we set up a 7-day free trial on your phone right now? If it doesn't save you 30 minutes every evening, we'll uninstall it—no cost at all."`,
      expectedOutput: 'Empathetic consultative sales script addressing real psychological objections with low-friction trial closes.',
      totalRubricPoints: 20,
      timeEstimateMinutes: 15,
      demonstrationOptions: ['text', 'file', 'link'],
      rubric: [
        {
          id: 'crit_sales_consultative',
          name: 'Consultative Diagnostic Discovery',
          maxPoints: 5,
          description: 'Focuses on understanding buyer pain points before presenting product features.',
          levelDescriptors: {
            5: 'Deep consultative listening uncovering high-impact business friction.',
            3: 'Good discovery questions.',
            1: 'Aggressive scripted feature dumping.'
          }
        },
        {
          id: 'crit_sales_objections',
          name: 'Objection Handling & Empathy',
          maxPoints: 5,
          description: 'Validates prospect concerns and reframes objections around ROI and ease of use.',
          levelDescriptors: {
            5: 'Masterful, empathetic reframing that removes buyer fear and friction.',
            3: 'Addresses objections cleanly.',
            1: 'Argues defensively with prospect.'
          }
        },
        {
          id: 'crit_sales_closing',
          name: 'Closing Technique & Friction Reduction',
          maxPoints: 5,
          description: 'Proposes low-risk trial steps that make saying "yes" effortless.',
          levelDescriptors: {
            5: 'Low-friction closing with clear next steps and zero pressure.',
            3: 'Clear closing ask.',
            1: 'Pushy high-pressure sales pitch.'
          }
        },
        {
          id: 'crit_sales_ethics',
          name: 'Integrity & Value Alignment',
          maxPoints: 5,
          description: 'Represents capabilities honestly without over-promising or misleading.',
          levelDescriptors: {
            5: 'High-integrity communication building long-term merchant trust.',
            3: 'Honest presentation.',
            1: 'Makes false claims to force a sale.'
          }
        }
      ]
    },
    questions: [
      {
        id: 'q_sal_01',
        skillId: 'sales',
        difficulty: 'Foundation',
        type: 'multiple_choice',
        competency: 'Consultative Selling',
        question: 'What is the most effective approach during the first 5 minutes of a consultative sales discovery meeting?',
        options: [
          'Ask open-ended questions about the client\'s current operational challenges and listen actively without interrupting.',
          'Talk non-stop about your company\'s history for 20 minutes.',
          'Demand that the client sign a contract immediately.',
          'Offer a 90% discount before they even ask.'
        ],
        correctAnswer: 'Ask open-ended questions about the client\'s current operational challenges and listen actively without interrupting.',
        explanation: 'Consultative selling requires diagnosing the customer\'s specific pain points before prescribing a tailored solution.',
        validationStatus: 'Validated',
        version: 1
      }
    ]
  },

  // 7. Project Management & Milestone Tracking
  {
    skillId: 'project_management',
    skillName: 'Project Management & Milestone Tracking',
    category: 'Entrepreneurial',
    version: 1,
    published: true,
    lastUpdated: '2026-03-01',
    commonMistakes: [
      {
        mistake: 'Failing to identify the "Critical Path" (the sequence of dependent tasks that determines the shortest possible project completion date).',
        guidance: 'Map task dependencies early to identify which delays directly impact the final launch deadline.'
      }
    ],
    recommendedNextSkills: ['leadership', 'problem_solving', 'financial_literacy'],
    recommendedProjects: ['6-Week Project Milestone Gantt', 'Kanban Board for 3-Person Team', 'Risk Mitigation Matrix for Live Exhibition Demo'],
    practicalTask: {
      id: 'task_pm_gantt_risk_plan',
      skillId: 'project_management',
      title: 'Build a 6-Week Project Schedule with Critical Path & Risk Matrix',
      instructions: 'Develop a 6-week project schedule, Work Breakdown Structure (WBS), and Risk Mitigation Matrix for a school team building a smart drone for agricultural crop monitoring.',
      starterTemplate: `# Project Management Plan: Agri-Drone Prototype
Project Timeline: 6 Weeks | Budget: ₹15,000 | Team Size: 3 Members

1. Work Breakdown Structure (WBS) & Milestones:
   - Week 1: Component Procurement & Drone Frame Assembly
   - Week 2: Flight Controller Calibration & Motor Test (MILESTONE 1: Hover Test)
   - Week 3: Camera Mount & Edge AI Detection Script Integration
   - Week 4: Field Testing on Farm Site (MILESTONE 2: Autonomous Flight Pass)
   - Week 5: Bug Fixes, Exhibition Display Poster & Presentation Rehearsal
   - Week 6: National Expo Demonstration (FINAL LAUNCH)

2. Critical Path Dependencies:
   - Flight Controller Calibration MUST complete before Field Testing can begin. A 3-day delay in Week 2 directly pushes Week 4 field trials.

3. Risk Mitigation Matrix:
   - Risk 1: Drone motor crashes during field test -> Mitigation: Pre-order 2 spare arms and propellers in initial Week 1 budget.
   - Risk 2: Rain on outdoor test day -> Mitigation: Book indoor sports hall as backup flight zone.
   - Risk 3: Teammate falls ill before expo -> Mitigation: Cross-train PM on camera script demo.`,
      expectedOutput: 'Detailed WBS schedule with identified critical path dependencies and proactive risk mitigation strategies.',
      totalRubricPoints: 20,
      timeEstimateMinutes: 15,
      demonstrationOptions: ['text', 'file', 'link'],
      rubric: [
        {
          id: 'crit_pm_wbs',
          name: 'Work Breakdown Structure (WBS) & Milestones',
          maxPoints: 5,
          description: 'Decomposes complex projects into realistic, time-boxed weekly deliverables.',
          levelDescriptors: {
            5: 'Exemplary WBS with clear gate criteria for each weekly milestone.',
            3: 'Good weekly plan with minor vagueness.',
            1: 'Unrealistic schedule with missing milestone gates.'
          }
        },
        {
          id: 'crit_pm_criticalpath',
          name: 'Critical Path & Dependency Mapping',
          maxPoints: 5,
          description: 'Identifies sequential dependencies and buffers to prevent project delays.',
          levelDescriptors: {
            5: 'Precise dependency mapping with calculated float/buffer times.',
            3: 'Identifies major dependencies.',
            1: 'Treats all tasks as independent and simultaneous.'
          }
        },
        {
          id: 'crit_pm_risk',
          name: 'Risk Assessment & Contingency Planning',
          maxPoints: 5,
          description: 'Proactively identifies failure modes with actionable contingency plans.',
          levelDescriptors: {
            5: 'Comprehensive risk matrix with pre-funded backup options.',
            3: 'Identifies standard risks.',
            1: 'No risk planning (assumes everything goes 100% smoothly).'
          }
        },
        {
          id: 'crit_pm_budget',
          name: 'Resource & Scope Management',
          maxPoints: 5,
          description: 'Balances time, cost, and scope constraints (the Iron Triangle).',
          levelDescriptors: {
            5: 'Tight budget control with clear MVP scope boundaries.',
            3: 'Adequate resource allocation.',
            1: 'Uncontrolled scope creep.'
          }
        }
      ]
    },
    questions: [
      {
        id: 'q_pm_01',
        skillId: 'project_management',
        difficulty: 'Foundation',
        type: 'multiple_choice',
        competency: 'Critical Path Method',
        question: 'In project management, what is the "Critical Path"?',
        options: [
          'The longest sequence of dependent tasks that directly determines the minimum time required to complete the entire project.',
          'The most dangerous path through a construction site.',
          'The road the project manager takes to work.',
          'A list of tasks you can skip.'
        ],
        correctAnswer: 'The longest sequence of dependent tasks that directly determines the minimum time required to complete the entire project.',
        explanation: 'Any delay to a task on the critical path directly pushes back the final project completion date, so these tasks require closest monitoring.',
        validationStatus: 'Validated',
        version: 1
      }
    ]
  },

  // 8. Market Research & Customer Discovery
  {
    skillId: 'market_research',
    skillName: 'Market Research & Customer Discovery',
    category: 'Entrepreneurial',
    version: 1,
    published: true,
    lastUpdated: '2026-03-01',
    commonMistakes: [
      {
        mistake: 'Surveying only close friends and family who give biased, overly positive feedback.',
        guidance: 'Gather data from at least 30 arm\'s-length potential buyers in the target demographic.'
      }
    ],
    recommendedNextSkills: ['data_analysis', 'interviewing', 'pricing'],
    recommendedProjects: ['Competitor Pricing Matrix for 5 Local Tuition Centers', '100-Respondent Student Needs Survey', 'Neighborhood Market Gap Audit'],
    practicalTask: {
      id: 'task_mr_competitor_matrix',
      skillId: 'market_research',
      title: 'Conduct Competitor Benchmarking & Unmet Niche Gap Analysis',
      instructions: 'Construct a competitor benchmarking matrix analyzing 3 local competitors in an educational tutoring or handicraft market across Pricing, Strengths, Weaknesses, and Customer Complaints, then identify an underserved market gap.',
      starterTemplate: `# Competitor Benchmarking & Gap Audit: Local Math Tutoring
Target Market: Class 9-10 CBSE Board Exam Students

1. Competitor Benchmark Matrix:
   - Competitor A (Large Commercial Coaching Center):
     * Price: ₹2,500/month | Batch Size: 45 students (High crowd)
     * Strengths: Brand reputation, printed booklets.
     * Weaknesses / Customer Complaints: Zero personal attention; shy students left behind.
   - Competitor B (Home Private Tutor):
     * Price: ₹5,000/month | Batch Size: 1-on-1
     * Strengths: Individual focus.
     * Weaknesses: Very expensive; rigid schedule.
   - Competitor C (Online Video App):
     * Price: ₹800/month | Batch Size: Unlimited
     * Strengths: Cheap, high-quality animations.
     * Weaknesses: Zero accountability; 85% student dropout rate.

2. Underserved Market Gap (White Space Opportunity):
   - Opportunity: Micro-cohort peer study groups (3-4 students max) with weekly live doubt-clearing and student mentors.
   - Target Price: ₹1,499/month (Fills the sweet spot between expensive 1-on-1 and impersonal mass coaching).

3. Validation Experiment: Run a 3-student 2-week trial cohort to measure retention and test willingness-to-pay.`,
      expectedOutput: 'Thorough competitor audit uncovering clear market white-space with low-cost validation test.',
      totalRubricPoints: 20,
      timeEstimateMinutes: 15,
      demonstrationOptions: ['text', 'file', 'link'],
      rubric: [
        {
          id: 'crit_mr_matrix',
          name: 'Competitor Benchmark Depth',
          maxPoints: 5,
          description: 'Analyzes competitors objectively across pricing, delivery, strengths, and weaknesses.',
          levelDescriptors: {
            5: 'Comprehensive, rigorous competitor profiling based on real market data.',
            3: 'Good competitor matrix with standard points.',
            1: 'Superficial or biased competitor assessment.'
          }
        },
        {
          id: 'crit_mr_gap',
          name: 'White-Space Gap Identification',
          maxPoints: 5,
          description: 'Identifies genuine unmet customer needs not addressed by existing players.',
          levelDescriptors: {
            5: 'Sharp, defensible niche gap with clear differentiation.',
            3: 'Identifies viable gap.',
            1: 'Proposes an undifferentiated clone in an oversaturated market.'
          }
        },
        {
          id: 'crit_mr_validation',
          name: 'Validation Experiment Design',
          maxPoints: 5,
          description: 'Designs low-cost hypothesis tests to measure real customer demand.',
          levelDescriptors: {
            5: 'Lean validation experiment measuring real willingness-to-pay.',
            3: 'Basic survey test.',
            1: 'No validation testing.'
          }
        },
        {
          id: 'crit_mr_insight',
          name: 'Actionable Strategic Synthesis',
          maxPoints: 5,
          description: 'Translates research findings into clear product positioning.',
          levelDescriptors: {
            5: 'Compelling strategic positioning report with grounded evidence.',
            3: 'Clear recommendations.',
            1: 'Vague conclusions.'
          }
        }
      ]
    },
    questions: [
      {
        id: 'q_mr_01',
        skillId: 'market_research',
        difficulty: 'Foundation',
        type: 'multiple_choice',
        competency: 'Market Research Bias',
        question: 'Why is it dangerous to rely solely on asking close friends and family if they like your new business idea?',
        options: [
          'Friends and family have "Confirmation Bias" and will say yes to avoid hurting your feelings, creating false confidence.',
          'Friends are not allowed to be customers.',
          'Family members never buy things.',
          'Surveys only work on strangers with computers.'
        ],
        correctAnswer: 'Friends and family have "Confirmation Bias" and will say yes to avoid hurting your feelings, creating false confidence.',
        explanation: 'True demand validation requires testing with unbiased prospects who have no personal loyalty and evaluate your offering strictly on value.',
        validationStatus: 'Validated',
        version: 1
      }
    ]
  }
];
