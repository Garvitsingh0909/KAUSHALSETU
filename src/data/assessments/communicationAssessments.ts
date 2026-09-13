/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — COMMUNICATION ASSESSMENT QUESTION BANKS & RUBRICS
 * Covers: public_speaking, teaching, writing, communication, client_handling, negotiation, interviewing
 */

import { AssessmentProfile } from '../assessmentTypes';

export const COMMUNICATION_ASSESSMENTS: AssessmentProfile[] = [
  // 1. Public Speaking & Presenting
  {
    skillId: 'public_speaking',
    skillName: 'Public Speaking & Presenting',
    category: 'Communication',
    version: 1,
    published: true,
    lastUpdated: '2026-03-01',
    commonMistakes: [
      {
        mistake: 'Reading word-for-word from crowded slide bullet points while turning away from the audience.',
        guidance: 'Use minimal visual anchor slides with large figures and maintain continuous eye contact.'
      },
      {
        mistake: 'Speaking at a rapid, unvaried cadence without deliberate pauses.',
        guidance: 'Incorporate 2-second pauses after key takeaways to let concepts settle.'
      }
    ],
    recommendedNextSkills: ['leadership', 'communication', 'teaching'],
    recommendedProjects: ['3-Minute Climate Action Pitch', 'Science Expo Live Demo Script', 'Morning Assembly Keynote'],
    practicalTask: {
      id: 'task_speak_pitch_script',
      skillId: 'public_speaking',
      title: 'Structure & Deliver a 3-Minute Persuasive Pitch with Hook and Call to Action',
      instructions: 'Draft the full 3-minute spoken presentation outline for a student proposal requesting school funding for a solar-powered study lamp initiative. Include timing breakdown, opening hook, physical gesture cues, and memorable closing statement.',
      starterTemplate: `## Presentation Outline: Solar Study Lamps for Rural Evening Classes
Target Audience: School Principal & Parent-Teacher Association Board
Time Limit: 3 Minutes (180 Seconds)

1. Hook & Framing (0:00 - 0:30):
   - Spoken Hook: "Imagine trying to solve quadratic equations with the toxic fumes of a kerosene lamp burning 10 inches from your eyes..."
   - Physical & Vocal Cues: [Pause 2 seconds, slow deliberate tempo, direct eye contact with center row]

2. Problem & Demonstration (0:30 - 1:30):
   - Contrast data: 42 students in our partner village lose 3 hours of homework time every power cut.
   - Physical prop action: [Hold up working solar 3D-printed prototype lamp, click switch on]

3. Solution & Feasibility (1:30 - 2:30):
   - Budget & fabrication: ₹350 per lamp using recycled 18650 cells.
   - Timeline: 15 lamps built in 2 weeks during vocational club hours.

4. Unambiguous Call to Action (2:30 - 3:00):
   - Closing ask: "We are not asking for a donation; we are asking for seed investment of ₹5,250 to light 15 study desks. Thank you."`,
      expectedOutput: 'Structured pitch incorporating vocal variety cues, precise time allocations, and persuasive rhetoric.',
      totalRubricPoints: 20,
      timeEstimateMinutes: 15,
      demonstrationOptions: ['text', 'file', 'link'],
      rubric: [
        {
          id: 'crit_speak_hook',
          name: 'Hook & Audience Engagement',
          maxPoints: 5,
          description: 'Opens with compelling story, question, or startling fact that commands attention.',
          levelDescriptors: {
            5: 'Immediate emotional connection with crisp delivery and zero filler words.',
            3: 'Decent opening statement with minor hesitation.',
            1: 'Generic greeting or monotone start.'
          }
        },
        {
          id: 'crit_speak_structure',
          name: 'Clarity of Narrative Structure',
          maxPoints: 5,
          description: 'Follows logical progression (Problem -> Solution -> Evidence -> Call to Action).',
          levelDescriptors: {
            5: 'Effortless narrative transitions with disciplined timekeeping.',
            3: 'Logical structure with slight pacing rush.',
            1: 'Disorganized thoughts jumping between unrelated points.'
          }
        },
        {
          id: 'crit_speak_vocal',
          name: 'Vocal Variety & Non-Verbal Control',
          maxPoints: 5,
          description: 'Uses deliberate pauses, volume modulation, pitch inflection, and eye contact cues.',
          levelDescriptors: {
            5: 'Dynamic pacing with strategic silence and purposeful stance.',
            3: 'Audible voice with occasional nervous pacing.',
            1: 'Monotone robotic voice or reading from notes.'
          }
        },
        {
          id: 'crit_speak_cta',
          name: 'Persuasive Call to Action',
          maxPoints: 5,
          description: 'Concludes with clear, actionable, and inspiring next step for audience.',
          levelDescriptors: {
            5: 'Memorable, unambiguous closing ask that spurs immediate commitment.',
            3: 'Clear conclusion.',
            1: 'Trail off into awkward silence or vague ending.'
          }
        }
      ]
    },
    questions: [
      {
        id: 'q_spk_01',
        skillId: 'public_speaking',
        difficulty: 'Foundation',
        type: 'multiple_choice',
        competency: 'Vocal Delivery Techniques',
        question: 'When a speaker feels nervous on stage and notices their heart racing, what is the most effective physical technique to regain composure?',
        options: [
          'Plant feet firmly shoulder-width apart, take a slow deep diaphragmatic breath, and pause before speaking the first word.',
          'Start talking as fast as possible to finish early.',
          'Stare down at the floor throughout the speech.',
          'Apologize to the audience for being scared.'
        ],
        correctAnswer: 'Plant feet firmly shoulder-width apart, take a slow deep diaphragmatic breath, and pause before speaking the first word.',
        explanation: 'Grounding the physical stance and activating diaphragmatic breathing triggers the parasympathetic nervous system, lowering heart rate and vocal tremor.',
        validationStatus: 'Validated',
        version: 1
      },
      {
        id: 'q_spk_02',
        skillId: 'public_speaking',
        difficulty: 'Intermediate',
        type: 'scenario',
        competency: 'Slide Design for Presentations',
        scenarioContext: 'A student is presenting a project to judges and has 6 slides, each containing 8 bullet points with full paragraphs of text.',
        question: 'Why does this presentation slide style severely harm audience comprehension?',
        options: [
          'The human brain cannot read dense text and listen to a speaker simultaneously (Cognitive Load Split-Attention Effect).',
          'Slide text is bad for projector bulbs.',
          'Judges are not allowed to read words.',
          'Slides must only ever contain videos.'
        ],
        correctAnswer: 'The human brain cannot read dense text and listen to a speaker simultaneously (Cognitive Load Split-Attention Effect).',
        explanation: 'When slides contain paragraphs, the audience reads ahead and stops listening to the spoken voice. Slides should act as visual anchors, not teleprompters.',
        validationStatus: 'Validated',
        version: 1
      }
    ]
  },

  // 2. Teaching & Mentoring
  {
    skillId: 'teaching',
    skillName: 'Teaching & Mentoring',
    category: 'Communication',
    version: 1,
    published: true,
    lastUpdated: '2026-03-01',
    commonMistakes: [
      {
        mistake: 'Assuming the learner understands a prerequisite concept without conducting a diagnostic check.',
        guidance: 'Always check prior knowledge with a quick 60-second diagnostic question before introducing new material.'
      }
    ],
    recommendedNextSkills: ['public_speaking', 'communication', 'problem_solving'],
    recommendedProjects: ['Peer Tutoring Lesson Plan', 'Hands-on Math Manipulatives Guide', 'Micro-Workshop on Fractions'],
    practicalTask: {
      id: 'task_teach_lesson_scaffold',
      skillId: 'teaching',
      title: 'Design a Scaffolding 15-Minute Micro-Lesson Plan',
      instructions: 'Create a lesson plan using the "I Do, We Do, You Do" framework to teach a younger student how to balance a simple chemical equation or calculate percentages. Include a misconception check and an exit ticket.',
      starterTemplate: `# Micro-Lesson Plan: Demystifying Percentages
Topic: Calculating 10%, 20%, and 15% in mental math
Target Learner: Grade 7 Student struggling with fractions

1. Diagnostic Check (2 mins):
   - Question: "If you have 100 marbles and give away 25, what percent did you give away?"
   - Identifying misconception: Check if they understand percent means "per 100".

2. Scaffolding Progression (10 mins):
   - "I DO" (Teacher Model): Moving decimal point 1 place left to find 10% of ₹450 = ₹45.
   - "WE DO" (Guided Practice): Together finding 10% of ₹800, then doubling it to get 20%.
   - "YOU DO" (Independent Application): Student calculates 15% of ₹200 (10% + half of 10%).

3. Exit Ticket & Verification (3 mins):
   - Quick independent challenge: Calculate 20% discount on a ₹350 book.`,
      expectedOutput: 'Clear scaffolding progression with explicit check for understanding and formative assessment.',
      totalRubricPoints: 20,
      timeEstimateMinutes: 15,
      demonstrationOptions: ['text', 'file', 'link'],
      rubric: [
        {
          id: 'crit_teach_scaffold',
          name: 'Pedagogical Scaffolding ("I Do, We Do, You Do")',
          maxPoints: 5,
          description: 'Breaks complex tasks into progressive cognitive steps.',
          levelDescriptors: {
            5: 'Seamless gradual release of responsibility with rich formative feedback.',
            3: 'Good 3-step lesson with minor pacing rush.',
            1: 'Lecture-only with zero guided practice.'
          }
        },
        {
          id: 'crit_teach_misconceptions',
          name: 'Anticipation of Misconceptions',
          maxPoints: 5,
          description: 'Identifies common learner stumbling blocks and provides intuitive counter-examples.',
          levelDescriptors: {
            5: 'Proactively addresses deep misconceptions with concrete physical analogies.',
            3: 'Identifies surface mistakes.',
            1: 'Ignores learner confusion.'
          }
        },
        {
          id: 'crit_teach_empathy',
          name: 'Encouragement & Inclusive Tone',
          maxPoints: 5,
          description: 'Creates a psychologically safe environment where making mistakes is celebrated as learning.',
          levelDescriptors: {
            5: 'Warm, empowering dialogue promoting growth mindset.',
            3: 'Polite and patient instruction.',
            1: 'Impatient or condescending tone.'
          }
        },
        {
          id: 'crit_teach_assessment',
          name: 'Formative Assessment & Exit Ticket',
          maxPoints: 5,
          description: 'Measures objective mastery before concluding session.',
          levelDescriptors: {
            5: 'Clear diagnostic exit challenge measuring true independent transfer.',
            3: 'Basic check for understanding.',
            1: 'No verification of learning.'
          }
        }
      ]
    },
    questions: [
      {
        id: 'q_tch_01',
        skillId: 'teaching',
        difficulty: 'Foundation',
        type: 'multiple_choice',
        competency: 'Pedagogical Frameworks',
        question: 'In modern pedagogy, what does the "Gradual Release of Responsibility" model consist of?',
        options: [
          'I Do (Teacher models) -> We Do (Guided practice together) -> You Do (Independent student application)',
          'Read textbook alone -> Take final exam -> Get graded',
          'Teacher lectures for 60 minutes while students copy notes',
          'Let students teach the class without preparation'
        ],
        correctAnswer: 'I Do (Teacher models) -> We Do (Guided practice together) -> You Do (Independent student application)',
        explanation: 'Gradual release builds confidence and competence by starting with expert demonstration, moving to collaborative problem-solving, and culminating in independent mastery.',
        validationStatus: 'Validated',
        version: 1
      }
    ]
  },

  // 3. Technical & Persuasive Writing
  {
    skillId: 'writing',
    skillName: 'Technical & Persuasive Writing',
    category: 'Communication',
    version: 1,
    published: true,
    lastUpdated: '2026-03-01',
    commonMistakes: [
      {
        mistake: 'Using passive voice and bureaucratic jargon that obscures who is doing what.',
        guidance: 'Write in active voice with strong action verbs and concrete nouns.'
      }
    ],
    recommendedNextSkills: ['communication', 'project_management', 'marketing'],
    recommendedProjects: ['SOP Manual for School Lab Equipment', 'Grant Application for Science Club', 'Press Release for Tech Fair'],
    practicalTask: {
      id: 'task_write_technical_sop',
      skillId: 'writing',
      title: 'Write a Standard Operating Procedure (SOP) with Safety Protocols',
      instructions: 'Write a 1-page clear, unambiguous SOP for safely operating a high-temperature 3D printer or chemical titration setup in a school laboratory, including emergency shutdown procedures.',
      starterTemplate: `# STANDARD OPERATING PROCEDURE (SOP-LAB-04)
Title: Operation & Safe Handling of FDM 3D Printers
Department: Vocational Maker Lab | Revision: 2.1

1. Purpose & Scope:
   - To establish strict safety guidelines for heating nozzles (240°C) and handling moving mechanical gantries.

2. Required Personal Protective Equipment (PPE):
   - Safety glasses (ANSI Z87.1 approved)
   - Heat-resistant silicone gloves when clearing jammed nozzles

3. Pre-Operation Checklist:
   - [ ] Build plate is clean and leveled.
   - [ ] Filament path is clear of tangles.

4. Step-by-Step Operating Sequence:
   - Step 1: Power on via main breaker switch.
   - Step 2: Load verified G-code file via SD card.
   - Step 3: Monitor first layer adhesion for initial 3 minutes. Never leave unattended during layer 1.

5. Emergency Shutdown Procedure:
   - In case of fire or thermal runaway: Press RED EMERGENCY STOP button located on top-right chassis. Disconnect wall plug immediately.`,
      expectedOutput: 'Clear, structured SOP with imperative action verbs, numbered steps, and prominent safety callouts.',
      totalRubricPoints: 20,
      timeEstimateMinutes: 15,
      demonstrationOptions: ['text', 'file', 'link'],
      rubric: [
        {
          id: 'crit_write_clarity',
          name: 'Clarity & Precision of Instructions',
          maxPoints: 5,
          description: 'Uses active voice and direct imperative verbs with zero ambiguity.',
          levelDescriptors: {
            5: 'Impeccably clear instructions that anyone can follow without confusion.',
            3: 'Good clarity with minor wordiness.',
            1: 'Vague or confusing text.'
          }
        },
        {
          id: 'crit_write_safety',
          name: 'Safety & Emergency Emphasis',
          maxPoints: 5,
          description: 'Highlights critical hazards and gives immediate emergency shutdown steps.',
          levelDescriptors: {
            5: 'Prominent safety callouts with clear hazard mitigation protocols.',
            3: 'Standard safety notes included.',
            1: 'Omission of essential safety warnings.'
          }
        },
        {
          id: 'crit_write_format',
          name: 'Formatting & Information Architecture',
          maxPoints: 5,
          description: 'Uses numbered lists, bold text, checkboxes, and visual hierarchy.',
          levelDescriptors: {
            5: 'Professional technical document formatting with standardized numbering.',
            3: 'Clean structure with minor layout flaws.',
            1: 'Unformatted block of text.'
          }
        },
        {
          id: 'crit_write_conciseness',
          name: 'Conciseness & Plain Language',
          maxPoints: 5,
          description: 'Eliminates unnecessary filler words without sacrificing rigor.',
          levelDescriptors: {
            5: 'Crisp, high-density writing with zero unnecessary fluff.',
            3: 'Readable with slight repetition.',
            1: 'Wordy and repetitive.'
          }
        }
      ]
    },
    questions: [
      {
        id: 'q_wri_01',
        skillId: 'writing',
        difficulty: 'Foundation',
        type: 'multiple_choice',
        competency: 'Active vs Passive Voice',
        question: 'Which of the following sentences is written in the strongest, clearest active voice for a technical manual?',
        options: [
          'Press the red button to initiate emergency shutdown.',
          'The red button should be pressed by the operator when emergency shutdown is initiated.',
          'An emergency shutdown initiation is caused by the pressing of the red button.',
          'There should be pressing of the red button during emergencies.'
        ],
        correctAnswer: 'Press the red button to initiate emergency shutdown.',
        explanation: 'Active voice with imperative verbs ("Press the red button") is direct, unambiguous, and immediately understandable in high-stakes situations.',
        validationStatus: 'Validated',
        version: 1
      }
    ]
  },

  // 4. Communication & Dialogue
  {
    skillId: 'communication',
    skillName: 'Communication & Dialogue',
    category: 'Communication',
    version: 1,
    published: true,
    lastUpdated: '2026-03-01',
    commonMistakes: [
      {
        mistake: 'Listening only to prepare your reply rather than truly understanding the other person\'s perspective.',
        guidance: 'Practice active listening: paraphrase what the speaker said before offering your viewpoint.'
      }
    ],
    recommendedNextSkills: ['negotiation', 'leadership', 'client_handling'],
    recommendedProjects: ['Inter-Team Conflict Mediation Script', 'Cross-Department Alignment Memo', 'Community Feedback Forum Protocol'],
    practicalTask: {
      id: 'task_comm_active_listening',
      skillId: 'communication',
      title: 'Craft an Active Listening & Conflict De-escalation Dialogue',
      instructions: 'Write a realistic dialogue demonstrating conflict de-escalation between two student project teammates arguing over unequal workload. Demonstrate reflective listening, validation of emotions, and collaborative re-scoping.',
      starterTemplate: `# De-escalation Dialogue: Workload Dispute
Context: Rahul is angry because Priya missed a milestone deadline for the science exhibition.

1. Rahul\'s Initial Outburst:
   "You never do your share! I stayed up till 2 AM finishing the poster while you were offline!"

2. Priya\'s De-escalating Response (Active Listening & Empathy):
   "Rahul, I hear how exhausted and frustrated you are, and you are right that leaving you with the poster at 2 AM was unfair. I had an unexpected family emergency, but I should have texted you earlier so you weren't stranded."

3. Collaborative Problem-Solving & RACI Realignment:
   - "Let's look at the remaining 4 tasks together and re-divide them right now based on our exact available hours this weekend."

4. Agreed Ground Rules:
   - 24-hour advance heads-up if anyone cannot meet a deadline.`,
      expectedOutput: 'Authentic empathetic response that validates emotions without becoming defensive, leading to a constructive solution.',
      totalRubricPoints: 20,
      timeEstimateMinutes: 15,
      demonstrationOptions: ['text', 'file', 'link'],
      rubric: [
        {
          id: 'crit_comm_empathy',
          name: 'Active Listening & Emotion Validation',
          maxPoints: 5,
          description: 'Acknowledges feelings and reflects content without defensiveness.',
          levelDescriptors: {
            5: 'Masterful non-violent communication with genuine empathy.',
            3: 'Calm response with minor defensiveness.',
            1: 'Escalates argument with counter-attacks.'
          }
        },
        {
          id: 'crit_comm_clarity',
          name: 'Clarity & Constructive Framing',
          maxPoints: 5,
          description: 'Shifts focus from blaming past faults to solving future steps.',
          levelDescriptors: {
            5: 'Constructive forward-looking problem solving.',
            3: 'Agrees to cooperate.',
            1: 'Dwells on complaints without solutions.'
          }
        },
        {
          id: 'crit_comm_respect',
          name: 'Tone & Professional Respect',
          maxPoints: 5,
          description: 'Maintains dignity and mutual respect under interpersonal pressure.',
          levelDescriptors: {
            5: 'Exemplary emotional composure and respectful vocabulary.',
            3: 'Polite tone.',
            1: 'Sarcastic or dismissive.'
          }
        },
        {
          id: 'crit_comm_agreement',
          name: 'Concrete Resolution & Ground Rules',
          maxPoints: 5,
          description: 'Establishes clear verifiable agreements to prevent future friction.',
          levelDescriptors: {
            5: 'Clear mutual commitments with concrete communication protocols.',
            3: 'General agreement to do better.',
            1: 'No concrete resolution.'
          }
        }
      ]
    },
    questions: [
      {
        id: 'q_com_01',
        skillId: 'communication',
        difficulty: 'Foundation',
        type: 'multiple_choice',
        competency: 'Active Listening',
        question: 'What is the core practice of "Active Listening" during a difficult conversation?',
        options: [
          'Paraphrasing the speaker\'s core point and feelings to ensure accurate understanding before offering solutions or counterpoints.',
          'Nodding your head while thinking about what to cook for dinner.',
          'Interrupting immediately when you spot a factual error.',
          'Recording the conversation secretly.'
        ],
        correctAnswer: 'Paraphrasing the speaker\'s core point and feelings to ensure accurate understanding before offering solutions or counterpoints.',
        explanation: 'Active listening confirms comprehension and lowers emotional tension by showing the speaker that their message has been genuinely received.',
        validationStatus: 'Validated',
        version: 1
      }
    ]
  },

  // 5. Client Handling & Discovery
  {
    skillId: 'client_handling',
    skillName: 'Client Handling & Discovery',
    category: 'Communication',
    version: 1,
    published: true,
    lastUpdated: '2026-03-01',
    commonMistakes: [
      {
        mistake: 'Saying "yes" to every client request without assessing timeline or budget boundaries (scope creep).',
        guidance: 'Always scope deliverables formally in a written Statement of Work (SOW).'
      }
    ],
    recommendedNextSkills: ['negotiation', 'pricing', 'project_management'],
    recommendedProjects: ['Freelance Web Client Discovery Questionnaire', 'Unhappy Client Resolution Protocol', 'Milestone Sign-off Template'],
    practicalTask: {
      id: 'task_client_discovery_call',
      skillId: 'client_handling',
      title: 'Conduct a Client Discovery & Scope Definition Framework',
      instructions: 'Draft a 5-question consultative discovery questionnaire for a local bakery owner seeking a website, followed by a formal Statement of Work (SOW) outline with milestone boundaries.',
      starterTemplate: `# Client Discovery & SOW Framework: Artisan Bakery Website
Client: Honey & Flour Bakery (Local Shop Owner)

1. Consultative Discovery Questions:
   - Q1 (Goal): "What is the single biggest business bottleneck this website needs to solve (e.g. phone call overload vs online cake orders)?"
   - Q2 (Audience): "Who is your primary customer: office workers buying lunch or parents ordering custom birthday cakes?"
   - Q3 (Asset Readiness): "Do you already have high-resolution photos and menu pricing finalized?"
   - Q4 (Timeline & Constraints): "What is your hard launch deadline (e.g. Festival season)?"
   - Q5 (Budget): "What budget range have you allocated for development and monthly hosting?"

2. Scope of Work (SOW) Boundaries:
   - Included: 3-page responsive site (Home, Menu, Contact/WhatsApp ordering button).
   - NOT Included (Out of Scope): Automated credit card payment gateway integration (deferred to Phase 2).

3. Revision Policy: 2 rounds of design revisions included prior to final sign-off.`,
      expectedOutput: 'Structured discovery questions extracting business constraints and clear scope boundary definitions.',
      totalRubricPoints: 20,
      timeEstimateMinutes: 15,
      demonstrationOptions: ['text', 'file', 'link'],
      rubric: [
        {
          id: 'crit_client_discovery',
          name: 'Consultative Discovery Depth',
          maxPoints: 5,
          description: 'Asks open-ended questions uncovering underlying business root problems.',
          levelDescriptors: {
            5: 'Deep diagnostic questions uncovering constraints, budget, and metrics.',
            3: 'Basic questions covering surface features.',
            1: 'Superficial questions missing critical constraints.'
          }
        },
        {
          id: 'crit_client_scope',
          name: 'Scope Boundary & SOW Precision',
          maxPoints: 5,
          description: 'Explicitly defines what is included AND what is out-of-scope.',
          levelDescriptors: {
            5: 'Watertight SOW preventing scope creep with clear revision limits.',
            3: 'Clear deliverables with minor out-of-scope ambiguity.',
            1: 'Vague scope that invites unpaid extra work.'
          }
        },
        {
          id: 'crit_client_professionalism',
          name: 'Professional Demeanor & Empathy',
          maxPoints: 5,
          description: 'Builds trust and frames technical details in accessible business terms.',
          levelDescriptors: {
            5: 'Consultative partner mindset focusing on client ROI.',
            3: 'Polite vendor tone.',
            1: 'Overly technical jargon or transactional attitude.'
          }
        },
        {
          id: 'crit_client_milestones',
          name: 'Milestone & Approval Governance',
          maxPoints: 5,
          description: 'Defines transparent sign-off stages and payment milestones.',
          levelDescriptors: {
            5: 'Clear milestone gates (50% upfront, 50% on verified launch).',
            3: 'Basic timeline.',
            1: 'No milestone milestones.'
          }
        }
      ]
    },
    questions: [
      {
        id: 'q_cln_01',
        skillId: 'client_handling',
        difficulty: 'Foundation',
        type: 'multiple_choice',
        competency: 'Scope Management',
        question: 'What is the most effective way to prevent "Scope Creep" when working with freelance clients?',
        options: [
          'Document a written Statement of Work (SOW) specifying exact deliverables, revision limits, and a paid change-order policy for new requests.',
          'Refuse to speak to the client after starting.',
          'Do all extra requested tasks for free forever.',
          'Charge double without telling the client.'
        ],
        correctAnswer: 'Document a written Statement of Work (SOW) specifying exact deliverables, revision limits, and a paid change-order policy for new requests.',
        explanation: 'A clear SOW sets expectations upfront. When a client requests extra features, you can politely quote them as a Phase 2 add-on without conflict.',
        validationStatus: 'Validated',
        version: 1
      }
    ]
  },

  // 6. Negotiation & Deal Structuring
  {
    skillId: 'negotiation',
    skillName: 'Negotiation & Deal Structuring',
    category: 'Communication',
    version: 1,
    published: true,
    lastUpdated: '2026-03-01',
    commonMistakes: [
      {
        mistake: 'Entering a negotiation without knowing your BATNA (Best Alternative to a Negotiated Agreement).',
        guidance: 'Always calculate your walk-away threshold and backup options before discussing terms.'
      }
    ],
    recommendedNextSkills: ['pricing', 'sales', 'financial_literacy'],
    recommendedProjects: ['Bulk Raw Material Supplier Negotiation', 'Sponsorship Package Pitch', 'Equipment Lease Agreement Framework'],
    practicalTask: {
      id: 'task_nego_batna_matrix',
      skillId: 'negotiation',
      title: 'Formulate a Negotiation Strategy with BATNA and Trade-Off Matrix',
      instructions: 'Develop a negotiation plan for renting a venue space for a school charity exhibition. Define your Target Price, Reservation Price (Walk-away limit), BATNA, and 3 non-monetary trade-off variables.',
      starterTemplate: `# Negotiation Strategy: Exhibition Venue Rental
Counterpart: Community Hall Manager

1. Quantitative Price Parameters:
   - Target Price: ₹4,000 for weekend hall access
   - Reservation Price (Walk-Away Maximum): ₹6,500
   - BATNA (Best Alternative): Hosting the expo in the school open courtyard under rented tents for ₹3,000.

2. Non-Monetary Trade-Off Variables (Give-and-Take):
   - Variable 1 (Marketing): Offer banner placement and prominent mention on 500 exhibition flyers.
   - Variable 2 (Cleaning): Offer that our student volunteer team handles 100% of post-event hall cleanup.
   - Variable 3 (Timing): Shift event timing from prime evening to Sunday morning (off-peak hours).

3. Win-Win Dialogue Script:
   "We understand your weekend peak rate is ₹8,000. If we take the Sunday morning off-peak slot and provide full post-event cleaning, could we agree on ₹4,500 plus promotional banner rights?"`,
      expectedOutput: 'Structured negotiation framework with verified BATNA and high-value non-monetary trade-offs.',
      totalRubricPoints: 20,
      timeEstimateMinutes: 15,
      demonstrationOptions: ['text', 'file', 'link'],
      rubric: [
        {
          id: 'crit_nego_batna',
          name: 'BATNA & Walk-Away Clarity',
          maxPoints: 5,
          description: 'Clearly defines alternatives and realistic reservation price limits.',
          levelDescriptors: {
            5: 'Robust, independent BATNA and mathematically grounded reservation price.',
            3: 'Clear reservation price with basic backup plan.',
            1: 'No BATNA identified.'
          }
        },
        {
          id: 'crit_nego_tradeoffs',
          name: 'Non-Monetary Trade-Offs (Value Creation)',
          maxPoints: 5,
          description: 'Discovers low-cost/high-value trade-offs that expand the pie for both parties.',
          levelDescriptors: {
            5: 'Inventive integrative bargaining expanding mutual value.',
            3: 'Standard trade-offs offered.',
            1: 'Purely adversarial haggling over single price point.'
          }
        },
        {
          id: 'crit_nego_winwin',
          name: 'Integrative Framing & Tone',
          maxPoints: 5,
          description: 'Maintains collaborative problem-solving tone rather than hostile confrontation.',
          levelDescriptors: {
            5: 'Exemplary relationship-building while defending core interests.',
            3: 'Professional tone.',
            1: 'Aggressive or submissive posture.'
          }
        },
        {
          id: 'crit_nego_contingency',
          name: 'Concession Strategy & Deadlock Protocol',
          maxPoints: 5,
          description: 'Plans gradual diminishing concessions and deadlock exit triggers.',
          levelDescriptors: {
            5: 'Disciplined concession pacing (never conceding without receiving value in return).',
            3: 'Basic concession awareness.',
            1: 'Instant surrender of price or deadlock.'
          }
        }
      ]
    },
    questions: [
      {
        id: 'q_neg_01',
        skillId: 'negotiation',
        difficulty: 'Foundation',
        type: 'multiple_choice',
        competency: 'Negotiation Fundamentals (BATNA)',
        question: 'In principled negotiation (Fisher & Ury), what does BATNA stand for?',
        options: [
          'Best Alternative to a Negotiated Agreement',
          'Budget Allocated to New Assets',
          'Basic Agreement Timing Network Action',
          'Breakdown Analysis Towards Net Assets'
        ],
        correctAnswer: 'Best Alternative to a Negotiated Agreement',
        explanation: 'Your BATNA is your plan B if discussions collapse. A strong BATNA provides the confidence to walk away from bad deals.',
        validationStatus: 'Validated',
        version: 1
      }
    ]
  },

  // 7. Interviewing & Qualitative Research
  {
    skillId: 'interviewing',
    skillName: 'Interviewing & Qualitative Research',
    category: 'Communication',
    version: 1,
    published: true,
    lastUpdated: '2026-03-01',
    commonMistakes: [
      {
        mistake: 'Asking leading questions (e.g. "Don\'t you think our app is amazing?") that bias the interviewee.',
        guidance: 'Ask open-ended behavioral questions (e.g. "Walk me through the last time you tried to solve this...").'
      }
    ],
    recommendedNextSkills: ['market_research', 'communication', 'problem_solving'],
    recommendedProjects: ['10-Student Study Stress Interview Report', 'Local Artisan Heritage Audio Archive', 'Canteen Food Preference Discovery'],
    practicalTask: {
      id: 'task_interview_protocol_guide',
      skillId: 'interviewing',
      title: 'Design an Unbiased User Research Interview Guide & Synthesis Note',
      instructions: 'Create a 5-question user research interview script to understand why students struggle to manage homework time. Follow "The Mom Test" principles: ask about past behaviors rather than hypothetical future promises.',
      starterTemplate: `# User Interview Protocol: Homework Time Management
Target Participant: 9th-10th Grade Student | Duration: 15 Mins

1. Rapport Building & Informed Consent (2 mins):
   - "Thank you for joining. There are no right or wrong answers—we are just learning about your daily routine. Is it okay if I take written notes?"

2. Past-Behavioral Questions (The Mom Test):
   - Q1: "Walk me through yesterday evening from when school ended to when you went to sleep."
   - Q2: "What was the most frustrating task or assignment you worked on this week?"
   - Q3: "When you got stuck or distracted yesterday, what specifically triggered it?"
   - Q4: "What have you already tried in the past to manage your study schedule? How did it work?"
   - Q5: "If you could eliminate one repetitive chore from your study hours, what would it be?"

3. Synthesis Framework (Post-Interview Clustering):
   - Direct Quotes Observed:
   - Emotional Pain Points:
   - Current Workarounds Used:`,
      expectedOutput: 'Neutral, non-leading interview protocol focusing on concrete past behaviors and structured synthesis.',
      totalRubricPoints: 20,
      timeEstimateMinutes: 15,
      demonstrationOptions: ['text', 'file', 'link'],
      rubric: [
        {
          id: 'crit_inter_nonleading',
          name: 'Non-Leading Question Framing',
          maxPoints: 5,
          description: 'Avoids biased questions, leading prompts, or hypothetical speculation.',
          levelDescriptors: {
            5: 'Pristine neutral framing uncovering factual past behaviors.',
            3: 'Good questions with minor hypothetical phrasing.',
            1: 'Heavily biased leading questions.'
          }
        },
        {
          id: 'crit_inter_probing',
          name: 'Active Probing & Follow-Up Technique',
          maxPoints: 5,
          description: 'Uses "Tell me more about that" and "Why was that hard?" to dig past surface answers.',
          levelDescriptors: {
            5: 'Deep empathetic probing that discovers root psychological motivations.',
            3: 'Standard follow-ups.',
            1: 'Rushes through checklist without listening.'
          }
        },
        {
          id: 'crit_inter_synthesis',
          name: 'Qualitative Data Synthesis & Clustering',
          maxPoints: 5,
          description: 'Organizes notes into pain points, workarounds, and verbatim quotes.',
          levelDescriptors: {
            5: 'Structured thematic clustering with grounded evidence.',
            3: 'Decent summary.',
            1: 'Disorganized subjective opinions.'
          }
        },
        {
          id: 'crit_inter_ethics',
          name: 'Research Ethics & Consent',
          maxPoints: 5,
          description: 'Secures clear informed consent and respects participant privacy.',
          levelDescriptors: {
            5: 'Exemplary ethics, anonymization, and psychological safety.',
            3: 'Basic consent asked.',
            1: 'Disregards privacy or consent.'
          }
        }
      ]
    },
    questions: [
      {
        id: 'q_int_01',
        skillId: 'interviewing',
        difficulty: 'Foundation',
        type: 'multiple_choice',
        competency: 'User Research Methodology',
        question: 'According to customer research best practices (e.g. "The Mom Test"), why should you avoid asking "Would you buy a product that does X?"',
        options: [
          'People want to be polite and will lie about hypothetical future actions; instead, ask about their actual past behavior and how they solve the problem today.',
          'Interviewees hate products.',
          'It is illegal to mention money in interviews.',
          'Because only surveys can measure buying intent.'
        ],
        correctAnswer: 'People want to be polite and will lie about hypothetical future actions; instead, ask about their actual past behavior and how they solve the problem today.',
        explanation: 'Hypothetical questions yield optimistic false positives. True demand is proven by investigating how people currently spend time or money solving the problem.',
        validationStatus: 'Validated',
        version: 1
      }
    ]
  }
];
