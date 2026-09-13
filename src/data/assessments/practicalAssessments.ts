/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — PRACTICAL ASSESSMENT QUESTION BANKS & RUBRICS
 * Covers: agriculture (organic_farming), cooking, repair, electrical_work, tailoring, woodworking, food_processing, gardening_landscaping
 */

import { AssessmentProfile } from '../assessmentTypes';

export const PRACTICAL_ASSESSMENTS: AssessmentProfile[] = [
  // 1. Agriculture & Hydroponics (Organic Farming)
  {
    skillId: 'agriculture',
    skillName: 'Agriculture & Hydroponics',
    category: 'Practical',
    version: 1,
    published: true,
    lastUpdated: '2026-03-01',
    commonMistakes: [
      {
        mistake: 'Over-watering crops and ignoring soil drainage, causing root rot and anaerobic soil conditions.',
        guidance: 'Check soil moisture at 2-inch depth and incorporate organic matter for balanced drainage.'
      },
      {
        mistake: 'Spraying organic neem oil under direct scorching midday sunlight, burning delicate plant leaves.',
        guidance: 'Apply organic foliar sprays strictly during early morning or dusk.'
      }
    ],
    recommendedNextSkills: ['food_processing', 'gardening_landscaping', 'pricing'],
    recommendedProjects: ['Balcony Microgreens Nursery', 'Jeevamrit Organic Bio-Fertilizer Batch', 'Classroom Drip Herb Bed'],
    practicalTask: {
      id: 'task_agri_jeevamrit_prep',
      skillId: 'agriculture',
      title: 'Formulate an Organic Bio-Fertilizer (Jeevamrit) Batch & Application Schedule',
      instructions: 'Document the exact ingredients, fermentation timeline, bacterial aeration procedure, dilution ratio (1:10), and crop application cycle for a 200-liter batch of Jeevamrit organic bio-enhancer.',
      starterTemplate: `# Organic Formulation Protocol: Jeevamrit Microbial Inoculant
Batch Volume: 200 Liters | Fermentation Time: 48 - 72 Hours

1. Raw Material Inputs:
   - Fresh Indigenous Cow Dung: 10 kg
   - Fresh Cow Urine: 5 - 10 Liters
   - Organic Jaggery / Cane Sugar: 2 kg (Energy source for beneficial microbes)
   - Pulse Flour (Besan/Gram): 2 kg (Protein source for bacterial multiplication)
   - Virgin Forest / Undisturbed Soil: Handful (50g) (Native microbial culture)
   - Clean Water: 200 Liters (Chlorine-free)

2. Fermentation & Aeration Protocol:
   - Mix thoroughly in shaded plastic barrel (avoid metal).
   - Stir clockwise 2-3 minutes twice daily to aerate aerobic microbes.
   - Cover with breathable jute gunny sack.

3. Dilution & Application Instructions:
   - Dilution ratio with irrigation water: 1:10 (20L Jeevamrit in 200L water per acre/bed).
   - Application frequency: Every 15-21 days at root rhizosphere or early morning foliar spray.`,
      expectedOutput: 'Detailed, scientifically accurate formulation balancing microbial inputs, aeration cycles, and safe dilution ratios.',
      totalRubricPoints: 20,
      timeEstimateMinutes: 15,
      demonstrationOptions: ['text', 'file', 'link'],
      rubric: [
        {
          id: 'crit_agri_formulation',
          name: 'Ingredient Ratios & Microbial Biology',
          maxPoints: 5,
          description: 'Specifies exact inputs for bacterial proliferation (dung, urine, jaggery, pulse flour, virgin soil).',
          levelDescriptors: {
            5: 'Exact biological balancing with scientific rationale for each constituent.',
            3: 'Correct ingredients with minor ratio discrepancy.',
            1: 'Missing key ingredients or using chlorinated water.'
          }
        },
        {
          id: 'crit_agri_fermentation',
          name: 'Fermentation & Aeration Protocols',
          maxPoints: 5,
          description: 'Applies correct aeration schedule and shading to foster aerobic microbial growth.',
          levelDescriptors: {
            5: 'Detailed aerobic maintenance protocol preventing anaerobic foul odors.',
            3: 'Basic stirring instructions.',
            1: 'Incorrect anaerobic storage causing spoilage.'
          }
        },
        {
          id: 'crit_agri_application',
          name: 'Dilution & Field Application Timing',
          maxPoints: 5,
          description: 'Ensures correct dilution (1:10) and morning/evening application.',
          levelDescriptors: {
            5: 'Optimal field application schedule preventing foliage burn.',
            3: 'Correct dilution with basic timing.',
            1: 'Concentrated undiluted application burning roots.'
          }
        },
        {
          id: 'crit_agri_safety',
          name: 'Safety & Environmental Hygiene',
          maxPoints: 5,
          description: 'Practices personal hygiene and safe container storage away from direct sunlight.',
          levelDescriptors: {
            5: 'Exemplary farm safety and clean material handling.',
            3: 'Standard safety observed.',
            1: 'Unsafe handling or contamination risks.'
          }
        }
      ]
    },
    questions: [
      {
        id: 'q_agr_01',
        skillId: 'agriculture',
        difficulty: 'Foundation',
        type: 'multiple_choice',
        competency: 'Soil Health Fundamentals',
        question: 'What is the primary role of earthworms and organic humus in fertile agricultural soil?',
        options: [
          'They aerate the soil, decompose organic matter into bio-available plant nutrients, and improve soil water retention.',
          'They eat plant roots and kill crops.',
          'They turn soil into concrete.',
          'They decrease soil nitrogen.'
        ],
        correctAnswer: 'They aerate the soil, decompose organic matter into bio-available plant nutrients, and improve soil water retention.',
        explanation: 'Earthworms create macro-pore channels that allow air and water infiltration while their castings enrich the soil with microbial life and nutrients.',
        validationStatus: 'Validated',
        version: 1
      },
      {
        id: 'q_agr_02',
        skillId: 'agriculture',
        difficulty: 'Developing',
        type: 'true_false',
        competency: 'Foliar Spray Application',
        question: 'Foliar organic sprays (like neem oil solution) should be sprayed during peak midday afternoon sun (12 PM - 2 PM) for maximum effectiveness.',
        options: ['True', 'False'],
        correctAnswer: 'False',
        explanation: 'Spraying in strong midday sun causes droplets to act as miniature magnifying lenses that scorch leaves, and causes beneficial volatile oils to evaporate too quickly.',
        validationStatus: 'Validated',
        version: 1
      }
    ]
  },

  // 2. Cooking & Culinary Arts
  {
    skillId: 'cooking',
    skillName: 'Cooking & Culinary Arts',
    category: 'Practical',
    version: 1,
    published: true,
    lastUpdated: '2026-03-01',
    commonMistakes: [
      {
        mistake: 'Using the same cutting board for raw poultry and ready-to-eat salad vegetables without sanitizing (cross-contamination).',
        guidance: 'Use separate color-coded cutting boards (e.g. green for veg, red for meat).'
      }
    ],
    recommendedNextSkills: ['food_processing', 'pricing', 'marketing'],
    recommendedProjects: ['Balanced Tiffin Recipe Booklet', 'Low-Cost Nutritious Millets Snack', 'Hygiene Standard Guide for Food Stall'],
    practicalTask: {
      id: 'task_cook_recipe_standard',
      skillId: 'cooking',
      title: 'Standardize a Nutritious Recipe with HACCP Food Safety Protocols',
      instructions: 'Standardize a recipe for a balanced nutritious lunch meal (e.g. Mixed Vegetable Millet Khichdi). Include exact ingredient measurements (grams/ml), cooking sequence, critical control temperature points (HACCP), and plating presentation.',
      starterTemplate: `# Standardized Culinary Recipe Card: Wholesome Millet & Lentil Khichdi
Yield: 4 Servings | Preparation Time: 15 Mins | Cooking Time: 25 Mins

1. Ingredient Mise en Place (Exact Weights):
   - Foxtail Millet (Kangni): 150g (Washed and soaked 30 mins)
   - Split Yellow Moong Dal: 100g (Washed)
   - Diced Carrots, Green Peas, Spinach: 200g
   - Cold-Pressed Mustard Oil / Ghee: 15 ml
   - Cumin Seeds, Turmeric, Ginger-Garlic Paste: 15g
   - Water: 750 ml | Rock Salt: 8g

2. Step-by-Step Cooking Sequence:
   - Step 1: Temper cumin and ginger-garlic paste in hot oil until aromatic (1-2 mins).
   - Step 2: Sauté mixed vegetables for 3 mins to retain crisp vitamins.
   - Step 3: Add soaked millet, dal, water, turmeric, and salt.
   - Step 4: Pressure cook for 3 whistles; let steam release naturally.

3. Food Safety & Temperature Critical Control Points (HACCP):
   - Hot Holding Temp: Maintain at >60°C (140°F) until serving.
   - Cross-contamination check: Separate dedicated board used for vegetables.`,
      expectedOutput: 'Standardized recipe card with precise weights, nutritional balance, and HACCP safety temperatures.',
      totalRubricPoints: 20,
      timeEstimateMinutes: 15,
      demonstrationOptions: ['text', 'file', 'link'],
      rubric: [
        {
          id: 'crit_cook_weights',
          name: 'Mise en Place & Precise Scaling',
          maxPoints: 5,
          description: 'Uses standardized metric weights and proper culinary preparation.',
          levelDescriptors: {
            5: 'Exact metric measurements with thorough prep techniques.',
            3: 'Good ingredient list with minor volumetric vagueness.',
            1: 'Vague pinch/dash measurements.'
          }
        },
        {
          id: 'crit_cook_haccp',
          name: 'Food Hygiene & HACCP Temperature Safety',
          maxPoints: 5,
          description: 'Identifies temperature danger zone (5°C - 60°C) and cross-contamination prevention.',
          levelDescriptors: {
            5: 'Watertight HACCP hygiene protocols and safe hot-holding standards.',
            3: 'Good basic cleanliness.',
            1: 'Ignoring food safety temperatures or cross-contamination hazards.'
          }
        },
        {
          id: 'crit_cook_nutrition',
          name: 'Nutritional Balance & Flavor Harmony',
          maxPoints: 5,
          description: 'Balances macronutrients (carbs, proteins, healthy fats, fiber) and seasoning.',
          levelDescriptors: {
            5: 'Exceptional nutritional density, colorful presentation, and balanced flavor.',
            3: 'Nutritious meal with standard seasoning.',
            1: 'Unbalanced, greasy, or bland formulation.'
          }
        },
        {
          id: 'crit_cook_efficiency',
          name: 'Culinary Workflow & Time Management',
          maxPoints: 5,
          description: 'Organizes kitchen workflow efficiently with minimal waste.',
          levelDescriptors: {
            5: 'Streamlined multi-tasking workflow with zero food waste.',
            3: 'Adequate workflow.',
            1: 'Disorganized kitchen execution.'
          }
        }
      ]
    },
    questions: [
      {
        id: 'q_ck_01',
        skillId: 'cooking',
        difficulty: 'Foundation',
        type: 'multiple_choice',
        competency: 'Food Safety - Temperature Danger Zone',
        question: 'What is the international "Temperature Danger Zone" where foodborne bacteria multiply most rapidly?',
        options: [
          'Between 5°C and 60°C (41°F - 140°F)',
          'Below -18°C',
          'Above 100°C',
          'Between 75°C and 90°C'
        ],
        correctAnswer: 'Between 5°C and 60°C (41°F - 140°F)',
        explanation: 'Perishable cooked food left between 5°C and 60°C for more than 2 hours enters the danger zone where pathogenic bacteria (Salmonella, E. coli) double every 20 minutes.',
        validationStatus: 'Validated',
        version: 1
      }
    ]
  },

  // 3. Device & Hardware Repair
  {
    skillId: 'repair',
    skillName: 'Device & Hardware Repair',
    category: 'Practical',
    version: 1,
    published: true,
    lastUpdated: '2026-03-01',
    commonMistakes: [
      {
        mistake: 'Using mismatched screwdriver bits, stripping screw heads permanently into device housings.',
        guidance: 'Always use precision bits matching the exact drive type (Torx, Pentalobe, JIS, Phillips #000).'
      }
    ],
    recommendedNextSkills: ['electronics', 'electrical_work', 'problem_solving'],
    recommendedProjects: ['Desk Fan Re-wiring & Bearing Lube', 'Smartphone Battery Replacement Guide', 'Classroom Projector Filter Cleaning'],
    practicalTask: {
      id: 'task_repair_diagnostic_flow',
      skillId: 'repair',
      title: 'Design a Systematic Troubleshooting Flowchart for a Dead Appliance',
      instructions: 'Document a step-by-step diagnostic tree for a household electric kettle or mixer grinder that fails to turn on: power cord continuity check, thermal fuse testing with multimeter, switch contacts inspection, and safe reassembly.',
      starterTemplate: `# Diagnostic Repair Log: Electric Kettle No Power Failure
Model: 1500W Cordless Electric Kettle | Tools: DMM Multimeter, Screwdriver Set

1. Safety First Protocol:
   - Disconnect 230V AC mains wall plug before disassembly.
   - Inspect physical power cord for burns, cuts, or pinched wires.

2. Multimeter Continuity Diagnostic Tree:
   - Step A: Test 3-pin plug to kettle base connector contacts (Resistance < 0.5 Ohms = PASS).
   - Step B: Test Kettle Base Switch continuity in ON position (PASS / FAIL).
   - Step C: Test Thermal Cut-Off / Overheat Bimetallic Fuse on heating element (0 Ohms = PASS; Open Loop "OL" = BLOWN FUSE).

3. Root Cause Discovery & Replacement:
   - Defective Component: Thermal fuse blown due to dry boiling.
   - Replacement part rating: 10A 250V 120°C Thermal Cutoff Fuse.

4. Post-Repair Safety & Functional Test:
   - Earth ground continuity test to metal kettle body (> 1 Megohm insulation).
   - Boil test with 500ml water to verify automatic steam switch trip.`,
      expectedOutput: 'Systematic electrical diagnostic procedure with safety insulation checks and thermal fuse verification.',
      totalRubricPoints: 20,
      timeEstimateMinutes: 15,
      demonstrationOptions: ['text', 'file', 'link'],
      rubric: [
        {
          id: 'crit_rep_safety',
          name: 'Mains Safety & Discharge Isolation',
          maxPoints: 5,
          description: 'Isolates high-voltage mains and verifies capacitors are discharged before touch.',
          levelDescriptors: {
            5: 'Exemplary safety isolation, ESD protection, and ground fault insulation testing.',
            3: 'Standard safety steps taken.',
            1: 'Dangerous live-circuit testing without safety protocols.'
          }
        },
        {
          id: 'crit_rep_diagnostic',
          name: 'Systematic Root-Cause Elimination',
          maxPoints: 5,
          description: 'Tests continuity logically from plug -> switch -> fuse -> heating element.',
          levelDescriptors: {
            5: 'Flawless logical elimination using multimeter continuity and resistance ranges.',
            3: 'Finds fault but tests haphazardly.',
            1: 'Random component swapping without diagnosis.'
          }
        },
        {
          id: 'crit_rep_technique',
          name: 'Tool Handling & Precision Disassembly',
          maxPoints: 5,
          description: 'Uses correct bit drivers, labels screw locations, and preserves plastic clips.',
          levelDescriptors: {
            5: 'Clean disassembly with screw organizers; zero damage to chassis clips.',
            3: 'Good disassembly with minor clip strain.',
            1: 'Stripped screws or broken chassis housings.'
          }
        },
        {
          id: 'crit_rep_verification',
          name: 'Post-Repair Quality & Safety Verification',
          maxPoints: 5,
          description: 'Verifies chassis ground safety and runs controlled test cycle.',
          levelDescriptors: {
            5: 'Full safety audit and long-run thermal verification.',
            3: 'Basic on/off test.',
            1: 'Delivers appliance without testing.'
          }
        }
      ]
    },
    questions: [
      {
        id: 'q_rep_01',
        skillId: 'repair',
        difficulty: 'Foundation',
        type: 'multiple_choice',
        competency: 'Multimeter Testing',
        question: 'When testing a thermal fuse or power switch with a digital multimeter in Continuity/Beep mode, what does a loud continuous beep indicate?',
        options: [
          'The circuit path is intact (closed loop with near-zero resistance) and current can flow.',
          'The fuse is blown and broken.',
          'The multimeter battery is empty.',
          'The device has caught fire.'
        ],
        correctAnswer: 'The circuit path is intact (closed loop with near-zero resistance) and current can flow.',
        explanation: 'Continuity mode beeps when resistance between probes is near 0 ohms, confirming that the switch contacts are closed or the fuse is intact.',
        validationStatus: 'Validated',
        version: 1
      }
    ]
  },

  // 4. Electrical Work & Safety Maintenance
  {
    skillId: 'electrical_work',
    skillName: 'Electrical Work & Safety Maintenance',
    category: 'Practical',
    version: 1,
    published: true,
    lastUpdated: '2026-03-01',
    commonMistakes: [
      {
        mistake: 'Failing to test with a certified non-contact voltage detector after switching off the breaker (assuming circuit is dead).',
        guidance: 'Always follow "Test-Before-Touch" with a verified voltage tester on known live source first.'
      }
    ],
    recommendedNextSkills: ['repair', 'electronics', 'woodworking'],
    recommendedProjects: ['Classroom Extension Cord Rig with ELCB', 'Solar Inverter Battery Wiring', 'Energy Audit Checklist'],
    practicalTask: {
      id: 'task_elec_work_safety_box',
      skillId: 'electrical_work',
      title: 'Wire a Heavy-Duty 3-Pin Extension Socket with MCB & Earth Verification',
      instructions: 'Document the wiring schematic and safe installation procedure for a heavy-duty workshop distribution box: Live (Brown/Red), Neutral (Blue/Black), and Earth (Green/Yellow), including an MCB (Miniature Circuit Breaker) and Earth Continuity test.',
      starterTemplate: `# Electrical Installation Protocol: Workshop Distribution Box
Rated Load: 16A 230V AC | Safety Devices: 16A Type-C MCB, Indicator Lamp

1. Standard Wire Color Coding & Gauge:
   - Phase / Live: 2.5 sq mm Red/Brown -> Routed through MCB input terminal first.
   - Neutral: 2.5 sq mm Black/Blue -> Direct to socket N terminal.
   - Protective Earth (PE): 2.5 sq mm Green-Yellow -> Connected to top brass Earth terminal.

2. Step-by-Step Installation Procedure:
   - Step 1: Lockout/Tagout (LOTO) incoming mains supply.
   - Step 2: Strip wire ends 10mm cleanly without nicking copper strands.
   - Step 3: Insert into screw terminals and torque securely (loose connections cause resistive heating).

3. Safety Verification Checklist:
   - [ ] Non-contact voltage tester confirms ZERO voltage prior to connection.
   - [ ] Multimeter test between Socket Earth pin and metal enclosure: < 0.1 Ohm.
   - [ ] No exposed copper strands protruding outside terminal blocks.`,
      expectedOutput: 'Professional electrical procedure adhering to national electrical safety codes and proper earthing.',
      totalRubricPoints: 20,
      timeEstimateMinutes: 15,
      demonstrationOptions: ['text', 'file', 'link'],
      rubric: [
        {
          id: 'crit_ew_safety_loto',
          name: 'Lockout/Tagout (LOTO) & Test-Before-Touch',
          maxPoints: 5,
          description: 'Follows rigorous safety isolation and voltage verification protocols.',
          levelDescriptors: {
            5: 'Impeccable LOTO protocol and verified tester check.',
            3: 'Standard safety disconnect.',
            1: 'Works on live circuits without isolation.'
          }
        },
        {
          id: 'crit_ew_color_code',
          name: 'Wire Gauging & Standard Color Codes',
          maxPoints: 5,
          description: 'Uses correct wire cross-section (2.5 sq mm) and color conventions (L, N, PE).',
          levelDescriptors: {
            5: 'Correct cable sizing calculated for 16A thermal load and standard color coding.',
            3: 'Correct color coding with slight gauge vagueness.',
            1: 'Mismatched colors or undersized fire-hazard wiring.'
          }
        },
        {
          id: 'crit_ew_earthing',
          name: 'Protective Earthing & Ground Fault Safety',
          maxPoints: 5,
          description: 'Connects and verifies low-resistance path to ground for human shock protection.',
          levelDescriptors: {
            5: 'Watertight earthing with verified ground loop impedance.',
            3: 'Connected earth wire.',
            1: 'Earth wire omitted or floating.'
          }
        },
        {
          id: 'crit_ew_craftsmanship',
          name: 'Terminal Torque & Neat Workmanship',
          maxPoints: 5,
          description: 'Secure mechanical connections without loose stray strands or exposed copper.',
          levelDescriptors: {
            5: 'Pristine cable routing, clean terminal ferrules, and proper torque.',
            3: 'Clean connections with minor wire bend strain.',
            1: 'Frayed strands or loose terminal screws.'
          }
        }
      ]
    },
    questions: [
      {
        id: 'q_ew_01',
        skillId: 'electrical_work',
        difficulty: 'Foundation',
        type: 'multiple_choice',
        competency: 'Earthing & Shock Prevention',
        question: 'Why is the Earth pin on a standard 3-pin plug physically longer and thicker than the Live and Neutral pins?',
        options: [
          'So the appliance connects to ground FIRST before live power connects, and disconnects from ground LAST when pulled out, protecting humans from shocks.',
          'To make the plug heavier.',
          'To use up extra brass in manufacturing.',
          'So it looks better on the wall.'
        ],
        correctAnswer: 'So the appliance connects to ground FIRST before live power connects, and disconnects from ground LAST when pulled out, protecting humans from shocks.',
        explanation: 'The longer earth pin guarantees that if an internal fault exists, the metal chassis is grounded before live current enters, instantly tripping the breaker instead of electrocuting the user.',
        validationStatus: 'Validated',
        version: 1
      }
    ]
  },

  // 5. Tailoring & Fabric Craft
  {
    skillId: 'tailoring',
    skillName: 'Tailoring & Fabric Craft',
    category: 'Practical',
    version: 1,
    published: true,
    lastUpdated: '2026-03-01',
    commonMistakes: [
      {
        mistake: 'Cutting fabric across the bias without accounting for grainline, causing garments to stretch and twist.',
        guidance: 'Always align pattern pieces parallel to the fabric selvedge grainline.'
      }
    ],
    recommendedNextSkills: ['graphic_design', 'pricing', 'marketing'],
    recommendedProjects: ['Upcycled Denim Tote Bag', 'Fitted School Lab Coat', 'Fabric Waste Patchwork Quilt'],
    practicalTask: {
      id: 'task_tailor_tote_pattern',
      skillId: 'tailoring',
      title: 'Draft Pattern & Construction Sequence for Reinforced Canvas Tote Bag',
      instructions: 'Create a cutting pattern layout and step-by-step sewing construction guide for a heavy-duty reusable tote bag with boxed corner bottoms (8cm depth) and reinforced "X-box" stitched shoulder handles.',
      starterTemplate: `# Tailoring Construction Guide: Heavy Canvas Utility Tote
Finished Dimensions: 40cm (H) x 35cm (W) x 8cm (Depth)
Fabric: 350 GSM Cotton Duck Canvas | Thread: Polyester Tex 40 Heavy Duty

1. Pattern Cutting Pieces (with 1.5cm Seam Allowance):
   - Bag Body: 2 panels of 44cm x 38cm
   - Handles: 2 strips of 65cm x 8cm (Folded 4-ply to 2cm width)
   - Bottom Box Cutout: 4cm x 4cm squares removed from bottom corners

2. Sewing Assembly Sequence:
   - Step 1: Edge finish panels with serger/overlock or French seam to prevent fraying.
   - Step 2: Assemble handles with double topstitch 2mm from edges.
   - Step 3: Stitch side and bottom seams at 1.5cm seam allowance with backstitch locking.
   - Step 4: Pinch bottom corner cutouts perpendicular to create 8cm boxed base.
   - Step 5: Fold top hem 3cm inward, insert handles, and sew reinforced "X-box" square stitches.`,
      expectedOutput: 'Pattern specification with correct seam allowances, boxed bottom geometry, and stress-point reinforcement.',
      totalRubricPoints: 20,
      timeEstimateMinutes: 15,
      demonstrationOptions: ['text', 'file', 'link'],
      rubric: [
        {
          id: 'crit_tailor_pattern',
          name: 'Pattern Geometry & Seam Allowances',
          maxPoints: 5,
          description: 'Accurate dimensions with calculated seam allowances and grainline alignment.',
          levelDescriptors: {
            5: 'Exact mathematical pattern draft with grainline markings and boxed corner geometry.',
            3: 'Good pattern with minor seam allowance omission.',
            1: 'Incorrect pattern pieces that fail to fit together.'
          }
        },
        {
          id: 'crit_tailor_stitching',
          name: 'Stitch Quality & Tension Control',
          maxPoints: 5,
          description: 'Even stitch length (3mm), balanced upper/lower thread tension, and straight seams.',
          levelDescriptors: {
            5: 'Pristine straight topstitching with balanced thread tension and secure backstitching.',
            3: 'Clean stitching with minor wobbles.',
            1: 'Puckered seams, loose thread loops, or skipped stitches.'
          }
        },
        {
          id: 'crit_tailor_reinforce',
          name: 'Structural Reinforcement (Stress Points)',
          maxPoints: 5,
          description: 'Applies X-box stitching and bar tacks on handles to support heavy loads (>10kg).',
          levelDescriptors: {
            5: 'Heavy-duty X-box reinforcement engineered for high tensile load.',
            3: 'Basic double stitching.',
            1: 'Single weak stitch prone to tearing.'
          }
        },
        {
          id: 'crit_tailor_finishing',
          name: 'Edge Finishing & Cleanliness',
          maxPoints: 5,
          description: 'Encloses raw edges (French seams / overlock) with no loose threads.',
          levelDescriptors: {
            5: 'Pristine interior finish with zero exposed fraying edges.',
            3: 'Clean edges with minor untrimmed threads.',
            1: 'Raw fraying edges inside bag.'
          }
        }
      ]
    },
    questions: [
      {
        id: 'q_tl_01',
        skillId: 'tailoring',
        difficulty: 'Foundation',
        type: 'multiple_choice',
        competency: 'Fabric Grainline',
        question: 'Why is it critical to align pattern pieces with the lengthwise "grainline" (warp threads parallel to selvedge) when cutting fabric?',
        options: [
          'Lengthwise grain has the least stretch and highest tensile strength, ensuring garments hang straight without twisting or sagging.',
          'To make the fabric change color.',
          'Because sewing needles can only sew vertically.',
          'It uses less electricity on the sewing machine.'
        ],
        correctAnswer: 'Lengthwise grain has the least stretch and highest tensile strength, ensuring garments hang straight without twisting or sagging.',
        explanation: 'Warp threads under tension on the loom are strong and stable. Cutting garments off-grain causes asymmetric twisting after washing.',
        validationStatus: 'Validated',
        version: 1
      }
    ]
  },

  // 6. Woodworking & Carpentry
  {
    skillId: 'woodworking',
    skillName: 'Woodworking & Carpentry',
    category: 'Practical',
    version: 1,
    published: true,
    lastUpdated: '2026-03-01',
    commonMistakes: [
      {
        mistake: 'Failing to account for the "kerf" (width of saw blade material removed, ~3mm) when marking multiple cuts on a board.',
        guidance: 'Always mark individual cut lines and cut on the waste side of the pencil line.'
      }
    ],
    recommendedNextSkills: ['3d_modeling', 'repair', 'pricing'],
    recommendedProjects: ['Modular Classroom Book Caddy', 'Sturdy Step Stool', 'Bird Nesting Box'],
    practicalTask: {
      id: 'task_wood_stool_cutlist',
      skillId: 'woodworking',
      title: 'Draft a Cut-List, Joinery Plan & Sanding Schedule for a Wooden Step Stool',
      instructions: 'Produce a timber cut-list, pocket hole / mortise joinery specifications, safety equipment checklist, and progressive sanding grit sequence (80 -> 120 -> 220) for a solid pine step stool supporting 100kg.',
      starterTemplate: `# Woodworking Build Plan: Solid Pine Step Stool
Dimensions: 400mm (L) x 250mm (W) x 300mm (H) | Material: Pine Board (19mm thickness)

1. Precise Cut-List (Dimensions in mm):
   - Top Step Seat: 1 pc @ 400 x 250 x 19mm
   - Side Legs (A-frame 10° splay): 2 pcs @ 290 x 220 x 19mm
   - Center Stretcher / Apron: 1 pc @ 340 x 80 x 19mm

2. Joinery & Fastening Method:
   - Leg to Top: Pocket hole screws (32mm coarse thread) with PVA wood glue (clamp pressure 2 hours).
   - Stretcher: Dado slot or dowel reinforcement to prevent racking forces.

3. Finishing & Sanding Schedule:
   - Step A: 80 Grit (remove mill marks and level joints).
   - Step B: 120 Grit (smooth surface grain).
   - Step C: 220 Grit (final silky finish before natural beeswax/oil seal).`,
      expectedOutput: 'Comprehensive timber cut-list with structural bracing and progressive sanding protocol.',
      totalRubricPoints: 20,
      timeEstimateMinutes: 15,
      demonstrationOptions: ['text', 'file', 'link'],
      rubric: [
        {
          id: 'crit_wood_cutlist',
          name: 'Cut-List & Kerf Allowance',
          maxPoints: 5,
          description: 'Calculates accurate timber dimensions accounting for saw blade kerf and grain direction.',
          levelDescriptors: {
            5: 'Exact cut-list with grain direction indicated and minimal board waste.',
            3: 'Good cut-list with minor dimension omission.',
            1: 'Inaccurate dimensions that fail to assemble.'
          }
        },
        {
          id: 'crit_wood_joinery',
          name: 'Joinery Strength & Racking Resistance',
          maxPoints: 5,
          description: 'Designs strong joints (dowels/pocket holes/dados) braced against lateral racking.',
          levelDescriptors: {
            5: 'Engineered structural joints capable of supporting >100kg safely.',
            3: 'Adequate joints with standard screws.',
            1: 'Weak butt-joints with no mechanical reinforcement.'
          }
        },
        {
          id: 'crit_wood_safety',
          name: 'Workshop Tool Safety & PPE',
          maxPoints: 5,
          description: 'Mandates eye protection, dust mask, push sticks for saws, and clamp safety.',
          levelDescriptors: {
            5: 'Exemplary workshop safety discipline with zero hazard shortcuts.',
            3: 'Standard safety gear used.',
            1: 'Dangerous tool operation without eye/hand safety.'
          }
        },
        {
          id: 'crit_wood_finishing',
          name: 'Surface Preparation & Finishing',
          maxPoints: 5,
          description: 'Applies progressive grit sanding and protective non-toxic sealants.',
          levelDescriptors: {
            5: 'Pristine surface prep with zero cross-grain scratches and smooth seal.',
            3: 'Clean finish with minor swirl marks.',
            1: 'Rough, splintered wood with uneven finish.'
          }
        }
      ]
    },
    questions: [
      {
        id: 'q_wd_01',
        skillId: 'woodworking',
        difficulty: 'Foundation',
        type: 'multiple_choice',
        competency: 'Sanding & Surface Finishing',
        question: 'When hand-sanding solid natural wood before applying varnish or oil, why MUST you always sand in the direction of the wood grain rather than across it?',
        options: [
          'Sanding across the grain tears the wood fibers and leaves visible scratch marks that absorb stain unevenly.',
          'Sanding with the grain makes the wood softer.',
          'The sandpaper will explode if used sideways.',
          'To make the wood waterproof.'
        ],
        correctAnswer: 'Sanding across the grain tears the wood fibers and leaves visible scratch marks that absorb stain unevenly.',
        explanation: 'Abrasive sandpaper grains cut microscopic gouges into the wood. Following the grain direction hides these micro-grooves inside the natural cell structure.',
        validationStatus: 'Validated',
        version: 1
      }
    ]
  },

  // 7. Food Preservation & Packaging
  {
    skillId: 'food_processing',
    skillName: 'Food Preservation & Packaging',
    category: 'Practical',
    version: 1,
    published: true,
    lastUpdated: '2026-03-01',
    commonMistakes: [
      {
        mistake: 'Canning low-acid vegetables in a simple boiling water bath instead of a pressure canner (risk of fatal Clostridium botulinum).',
        guidance: 'Always use pressure canning (>121°C) for low-acid foods (pH > 4.6).'
      }
    ],
    recommendedNextSkills: ['cooking', 'agriculture', 'pricing'],
    recommendedProjects: ['Solar Dehydrated Tomato Powder', 'Probiotic Fermented Vegetable Pickles', 'Hermetic Grain Storage Guide'],
    practicalTask: {
      id: 'task_food_preserv_dehydration',
      skillId: 'food_processing',
      title: 'Standardize a Solar Food Dehydration & Hermetic Packaging SOP',
      instructions: 'Document the process parameters for dehydrating seasonal fruits or tomatoes: slice thickness (4-6mm), blanching/anti-browning treatment, target moisture content (<10%), and moisture-barrier packaging with oxygen absorbers.',
      starterTemplate: `# Food Preservation Standard: Solar Dried Tomato Flakes
Raw Material: Ripe Roma Tomatoes | Shelf Life Target: 12 Months

1. Raw Material Grading & Preparation:
   - Wash in 50 ppm chlorinated water sanitizing rinse.
   - Core and slice into uniform 5mm rounds (uniform slices ensure synchronized drying).

2. Pre-Treatment (Color & Nutrient Preservation):
   - Dip for 2 minutes in 1% ascorbic acid / citric acid solution to prevent enzymatic browning.

3. Solar Tunnel Drying Parameters:
   - Operating Temperature: 55°C - 60°C (Never exceed 65°C to preserve Vitamin C).
   - Target Final Moisture Content: < 8% (Crisp texture; no moisture squeeze).
   - Water Activity (aw): < 0.60 (Inhibits mold, yeast, and bacterial growth).

4. Hermetic Packaging:
   - Packaging Material: 100-micron Food-grade Foil Mylar pouch.
   - Oxygen Absorber: 50cc sachet inserted before impulse heat sealing.`,
      expectedOutput: 'Detailed preservation protocol tracking slice thickness, temperature limits, water activity, and barrier packaging.',
      totalRubricPoints: 20,
      timeEstimateMinutes: 15,
      demonstrationOptions: ['text', 'file', 'link'],
      rubric: [
        {
          id: 'crit_fp_science',
          name: 'Food Preservation Science (Water Activity & pH)',
          maxPoints: 5,
          description: 'Understands water activity (aw < 0.6) and pH barriers to inhibit spoilage microbes.',
          levelDescriptors: {
            5: 'Deep microbiological understanding of water activity, pH hurdles, and enzymatic inhibition.',
            3: 'Good parameters with basic moisture awareness.',
            1: 'Inadequate drying parameters risking mold growth.'
          }
        },
        {
          id: 'crit_fp_hygiene',
          name: 'Sanitization & Pre-Treatment Protocols',
          maxPoints: 5,
          description: 'Applies food sanitization and anti-browning pre-treatments correctly.',
          levelDescriptors: {
            5: 'Rigorous sanitization and nutrient-preserving pre-treatments.',
            3: 'Standard washing.',
            1: 'Contaminated handling.'
          }
        },
        {
          id: 'crit_fp_packaging',
          name: 'Hermetic Barrier Packaging & Sealing',
          maxPoints: 5,
          description: 'Selects moisture-barrier materials and applies oxygen absorbers/heat seals.',
          levelDescriptors: {
            5: 'Optimal barrier packaging ensuring >12 month shelf stability without preservatives.',
            3: 'Standard sealed bags.',
            1: 'Permeable packaging causing rapid rehydration.'
          }
        },
        {
          id: 'crit_fp_labeling',
          name: 'FSSAI Standards & Batch Labeling',
          maxPoints: 5,
          description: 'Complies with labeling standards: batch code, packaging date, expiry, ingredients, allergen info.',
          levelDescriptors: {
            5: 'Complete professional compliance label with nutrition and batch tracking.',
            3: 'Basic label.',
            1: 'Missing mandatory batch/date info.'
          }
        }
      ]
    },
    questions: [
      {
        id: 'q_fp_01',
        skillId: 'food_processing',
        difficulty: 'Foundation',
        type: 'multiple_choice',
        competency: 'Food Microbiology (Water Activity)',
        question: 'Why does reducing food moisture to a Water Activity (aw) below 0.60 preserve food for months without chemical preservatives?',
        options: [
          'Because bacteria, yeasts, and molds require available free water to metabolize and multiply; below 0.60 aw, microbial growth is completely halted.',
          'Because dry food weighs less.',
          'Because oxygen cannot touch dry food.',
          'Because salt turns into sugar.'
        ],
        correctAnswer: 'Because bacteria, yeasts, and molds require available free water to metabolize and multiply; below 0.60 aw, microbial growth is completely halted.',
        explanation: 'Water activity measures unbound water available for microorganisms. Below 0.60 aw, no microbial pathogen can reproduce, ensuring ambient shelf-stability.',
        validationStatus: 'Validated',
        version: 1
      }
    ]
  },

  // 8. Urban Landscaping & Horticulture
  {
    skillId: 'gardening_landscaping',
    skillName: 'Urban Landscaping & Horticulture',
    category: 'Practical',
    version: 1,
    published: true,
    lastUpdated: '2026-03-01',
    commonMistakes: [
      {
        mistake: 'Using heavy garden clay soil in lightweight rooftop container boxes, causing soil compaction and drainage blockage.',
        guidance: 'Formulate container potting mix with cocopeat (40%), compost (40%), and perlite/pumice (20%).'
      }
    ],
    recommendedNextSkills: ['agriculture', 'woodworking', 'pricing'],
    recommendedProjects: ['Balcony Air-Purifying Plant Corner', 'Recycled Bottle Drip Green Wall', 'School Pollinator Habitat Garden'],
    practicalTask: {
      id: 'task_garden_potting_drip',
      skillId: 'gardening_landscaping',
      title: 'Design an Urban Balcony Vertical Garden & Gravity Drip Irrigation System',
      instructions: 'Formulate a potting mix recipe for container gardening, select 4 native indoor/semi-shade plants, and sketch a gravity-fed micro-drip irrigation system using recycled 20L water cans.',
      starterTemplate: `# Urban Garden Design: Balcony Vertical Green Wall
Location: South-Facing Balcony (3-4 Hours Direct Sunlight) | Space: 2m x 1.5m Wall

1. Lightweight Aerated Potting Mix Formula (By Volume):
   - Washed Cocopeat: 40% (Moisture retention & lightweight structure)
   - Aged Vermicompost: 40% (Organic macro & micronutrients)
   - Perlite / Rice Husk: 20% (Drainage aeration preventing root compaction)
   - Neem Cake Powder: 50g per 10L pot (Natural anti-fungal & root pest repellent)

2. Plant Species Selection (Air-Purifying & Native Resilience):
   - 1. Money Plant (Epipremnum aureum) - Hardy trailing vine.
   - 2. Snake Plant (Sansevieria trifasciata) - High nighttime oxygen output.
   - 3. Spider Plant (Chlorophytum comosum) - Toxin absorption.
   - 4. Holy Basil / Tulsi (Ocimum tenuiflorum) - Pollinator attraction.

3. Gravity Drip Irrigation Blueprint:
   - Elevated 20L dispenser reservoir 1.5m above highest pot tier.
   - 4mm micro-tubing with adjustable 2L/hr pressure-compensating dripper stakes.`,
      expectedOutput: 'Complete horticultural specification with potting ratios, plant light tolerances, and gravity drip plumbing.',
      totalRubricPoints: 20,
      timeEstimateMinutes: 15,
      demonstrationOptions: ['text', 'file', 'link'],
      rubric: [
        {
          id: 'crit_gard_soil',
          name: 'Potting Medium Formulation & Aeration',
          maxPoints: 5,
          description: 'Calculates lightweight, moisture-retentive, and well-draining soil mix.',
          levelDescriptors: {
            5: 'Optimal ratio with organic nutrient buffering and anti-fungal neem cake.',
            3: 'Good potting mix with standard soil and compost.',
            1: 'Heavy clay soil prone to waterlogging.'
          }
        },
        {
          id: 'crit_gard_plants',
          name: 'Plant Selection & Sunlight Zonation',
          maxPoints: 5,
          description: 'Matches species to exact lux/sunlight exposure and local climatic hardiness.',
          levelDescriptors: {
            5: 'Expert botanical selection matching shade tolerances and air-purification goals.',
            3: 'Hardy plants chosen.',
            1: 'Selecting high-sun crops for dark shade balconies.'
          }
        },
        {
          id: 'crit_gard_irrigation',
          name: 'Micro-Irrigation & Water Conservation',
          maxPoints: 5,
          description: 'Designs efficient drip irrigation saving >70% water compared to hose watering.',
          levelDescriptors: {
            5: 'Gravity micro-drip plumbing with flow regulators and overflow drainage catchments.',
            3: 'Basic drip setup.',
            1: 'No irrigation planning.'
          }
        },
        {
          id: 'crit_gard_maintenance',
          name: 'Integrated Pest Management (IPM)',
          maxPoints: 5,
          description: 'Organic pest prevention (neem spray, companion planting, pruning hygiene).',
          levelDescriptors: {
            5: 'Comprehensive organic IPM calendar preventing mealybugs and aphids.',
            3: 'Standard care guidelines.',
            1: 'Recommending toxic synthetic chemical pesticides for indoor home spaces.'
          }
        }
      ]
    },
    questions: [
      {
        id: 'q_gd_01',
        skillId: 'gardening_landscaping',
        difficulty: 'Foundation',
        type: 'multiple_choice',
        competency: 'Container Soil Physics',
        question: 'Why is adding Perlite, Pumice, or Rice Husk essential in container potting mixes for balcony gardens?',
        options: [
          'It creates permanent microscopic air pockets that prevent soil compaction and ensure plant roots receive oxygen.',
          'It changes plant leaf colors.',
          'To make the pot heavier so it never moves.',
          'Because plants eat perlite.'
        ],
        correctAnswer: 'It creates permanent microscopic air pockets that prevent soil compaction and ensure plant roots receive oxygen.',
        explanation: 'Plant roots require oxygen for cellular respiration. Without aerating amendments, frequent watering packs fine soil particles tightly, suffocating roots.',
        validationStatus: 'Validated',
        version: 1
      }
    ]
  }
];
