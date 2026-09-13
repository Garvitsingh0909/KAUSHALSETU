/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — TECHNICAL ASSESSMENT QUESTION BANKS & RUBRICS
 * Covers: coding, app_development, electronics, robotics, iot_systems, data_analysis, digital_literacy, automation_tools
 */

import { AssessmentProfile } from '../assessmentTypes';

export const TECHNICAL_ASSESSMENTS: AssessmentProfile[] = [
  // 1. Coding & Web Development
  {
    skillId: 'coding',
    skillName: 'Coding & Web Development',
    category: 'Technical',
    version: 1,
    published: true,
    lastUpdated: '2026-03-01',
    commonMistakes: [
      {
        mistake: 'Using inline styles instead of utility/semantic CSS classes, causing maintenance debt.',
        guidance: 'Group styling in reusable classes or responsive layout rules.'
      },
      {
        mistake: 'Hardcoding dimensions without mobile viewport testing.',
        guidance: 'Always test layouts with flexbox, grid, and relative units (rem, %, vw).'
      },
      {
        mistake: 'Ignoring asynchronous state updates leading to race conditions.',
        guidance: 'Use async/await with robust try/catch blocks and loading indicators.'
      }
    ],
    recommendedNextSkills: ['ui_ux_design', 'data_analysis', 'project_management'],
    recommendedProjects: ['Local Business Price Catalog', 'Club Event RSVP Portal', 'Automated Attendance Tracker'],
    practicalTask: {
      id: 'task_coding_web_portal',
      skillId: 'coding',
      title: 'Build a Responsive Product Filter Function & Component',
      instructions: 'Write a JavaScript/TypeScript filter function that accepts an array of inventory items and filters them by category and maximum price, then returns the sorted results by price ascending.',
      starterTemplate: `// Implement the filterAndSortInventory function
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
}

export function filterAndSortInventory(
  products: Product[],
  targetCategory: string,
  maxPrice: number
): Product[] {
  // TODO: Filter products by targetCategory AND price <= maxPrice
  // TODO: Sort the filtered list in ascending order of price
  return [];
}`,
      expectedOutput: 'Function filters out non-matching categories and items above maxPrice, returning a newly sorted array without mutating the original.',
      totalRubricPoints: 20,
      timeEstimateMinutes: 15,
      demonstrationOptions: ['text', 'link', 'file'],
      rubric: [
        {
          id: 'code_logic',
          name: 'Logic & Functional Correctness',
          maxPoints: 5,
          description: 'Correctly applies filtering logic for category and price boundaries without runtime exceptions.',
          levelDescriptors: {
            5: 'Flawless filtering with edge case checks (empty lists, case sensitivity).',
            3: 'Correct filtering on normal inputs but fails edge cases.',
            1: 'Broken or incomplete condition logic.'
          }
        },
        {
          id: 'code_immutability',
          name: 'Immutability & Pure Functions',
          maxPoints: 5,
          description: 'Avoids mutating the original products input array during sorting.',
          levelDescriptors: {
            5: 'Creates a defensive copy ([...filtered]) before sorting.',
            3: 'Sorts correctly but mutates intermediate array.',
            1: 'Directly mutates input parameters.'
          }
        },
        {
          id: 'code_readability',
          name: 'Code Structure & Type Safety',
          maxPoints: 5,
          description: 'Uses clear variable naming, consistent formatting, and appropriate typing.',
          levelDescriptors: {
            5: 'Clean functional chaining (.filter().sort()) with explicit types.',
            3: 'Adequate structure with readable variable names.',
            1: 'Messy indentation or unreadable code structure.'
          }
        },
        {
          id: 'code_efficiency',
          name: 'Algorithmic Efficiency',
          maxPoints: 5,
          description: 'Operates in O(N log N) time complexity without redundant nested iterations.',
          levelDescriptors: {
            5: 'Optimal single pass filter followed by standard quicksort/timsort.',
            3: 'Slightly redundant passes but acceptable performance.',
            1: 'High complexity or infinite loop hazard.'
          }
        }
      ]
    },
    questions: [
      {
        id: 'q_code_01',
        skillId: 'coding',
        difficulty: 'Foundation',
        type: 'multiple_choice',
        competency: 'HTML & Semantic Markup',
        question: 'Which HTML element is most semantically appropriate for a navigation container holding main site links?',
        options: ['<div class="navigation">', '<nav>', '<section role="links">', '<header>'],
        correctAnswer: '<nav>',
        explanation: 'The <nav> element represents a section of a page whose purpose is to provide navigation links, improving accessibility for screen readers and SEO crawlers.',
        validationStatus: 'Validated',
        version: 1
      },
      {
        id: 'q_code_02',
        skillId: 'coding',
        difficulty: 'Foundation',
        type: 'true_false',
        competency: 'CSS Box Model',
        question: 'Setting "box-sizing: border-box" ensures that padding and border widths are included in the element\'s total specified width and height.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'With border-box, the width and height properties include content, padding, and border, making responsive layout calculations predictable.',
        validationStatus: 'Validated',
        version: 1
      },
      {
        id: 'q_code_03',
        skillId: 'coding',
        difficulty: 'Developing',
        type: 'scenario',
        competency: 'JavaScript Array Manipulation',
        scenarioContext: 'You have a list of student scores [45, 82, 91, 60, 74] and need to extract only scores >= 75 in descending order.',
        question: 'Which method sequence accomplishes this immutably and cleanest in modern JavaScript?',
        options: [
          'scores.filter(s => s >= 75).sort((a, b) => b - a)',
          'scores.map(s => s >= 75).reverse()',
          'scores.forEach(s => s > 75 ? scores.pop() : null)',
          'scores.find(s => s >= 75)'
        ],
        correctAnswer: 'scores.filter(s => s >= 75).sort((a, b) => b - a)',
        explanation: 'filter(s => s >= 75) extracts the qualifying numbers into a new array, and .sort((a, b) => b - a) orders them descending from highest to lowest.',
        validationStatus: 'Validated',
        version: 1
      },
      {
        id: 'q_code_04',
        skillId: 'coding',
        difficulty: 'Developing',
        type: 'ordering',
        competency: 'Web Request Lifecycle',
        question: 'Order the chronological steps that occur when a user submits a contact form on a website:',
        options: [
          'User clicks submit button',
          'Client-side validation checks required inputs',
          'Fetch/POST HTTP request dispatched to server endpoint',
          'Server parses JSON payload and validates data',
          'UI displays success notification banner to user'
        ],
        correctAnswer: [0, 1, 2, 3, 4],
        explanation: 'Execution flows from client trigger -> client validation -> HTTP network transmission -> backend verification -> client UI confirmation.',
        validationStatus: 'Validated',
        version: 1
      },
      {
        id: 'q_code_05',
        skillId: 'coding',
        difficulty: 'Intermediate',
        type: 'multiple_choice',
        competency: 'Asynchronous Programming',
        question: 'What is the risk of calling an asynchronous API inside a loop without await or Promise.all?',
        options: [
          'Requests fire concurrently without order guarantees and can trigger unhandled promise rejections or rate limits.',
          'The browser immediately reloads the page.',
          'JavaScript switches permanently to synchronous blocking execution.',
          'The CSS layout breaks on older browsers.'
        ],
        correctAnswer: 'Requests fire concurrently without order guarantees and can trigger unhandled promise rejections or rate limits.',
        explanation: 'Uncontrolled concurrent requests can overwhelm network sockets, exceed API rate limits, and resolve in arbitrary order.',
        validationStatus: 'Validated',
        version: 1
      },
      {
        id: 'q_code_06',
        skillId: 'coding',
        difficulty: 'Intermediate',
        type: 'multi_select',
        competency: 'Web Performance Optimization',
        question: 'Which of the following techniques directly improve initial webpage load time? (Select all that apply)',
        options: [
          'Compressing and lazy-loading heavy images',
          'Minifying JavaScript and CSS bundles',
          'Adding inline synchronous scripts inside <head> without defer/async',
          'Enabling browser caching for static assets'
        ],
        correctAnswer: [
          'Compressing and lazy-loading heavy images',
          'Minifying JavaScript and CSS bundles',
          'Enabling browser caching for static assets'
        ],
        explanation: 'Image compression, asset minification, and browser caching reduce byte payloads, while synchronous scripts in <head> block the rendering pipeline.',
        validationStatus: 'Validated',
        version: 1
      },
      {
        id: 'q_code_07',
        skillId: 'coding',
        difficulty: 'Strong',
        type: 'scenario',
        competency: 'State Management & Race Conditions',
        scenarioContext: 'A user rapidly types in a live search box ("a", "ap", "app", "appl", "apple"). The network request for "app" takes 600ms, while "apple" takes 100ms.',
        question: 'What architectural safeguard prevents the stale "app" results from overriding the "apple" results?',
        options: [
          'Using an AbortController to cancel superseded fetch requests (or checking a request sequence ID before setting state).',
          'Increasing the font size of the search box.',
          'Converting all GET requests to synchronous XMLHttpRequests.',
          'Disabling the backspace key on user keyboards.'
        ],
        correctAnswer: 'Using an AbortController to cancel superseded fetch requests (or checking a request sequence ID before setting state).',
        explanation: 'AbortController aborts pending out-of-date HTTP requests, eliminating race conditions in fast-typing search interfaces.',
        validationStatus: 'Validated',
        version: 1
      },
      {
        id: 'q_code_08',
        skillId: 'coding',
        difficulty: 'Advanced',
        type: 'multiple_choice',
        competency: 'System Architecture & Memory Management',
        question: 'In a single-page application with persistent WebSocket subscriptions, failing to unsubscribe on component unmount causes which serious issue?',
        options: [
          'Memory leaks and ghost event handlers retaining detached DOM nodes in heap memory.',
          'The server automatically restarts.',
          'The CSS styles are erased from disk.',
          'The user\'s browser battery is instantly depleted.'
        ],
        correctAnswer: 'Memory leaks and ghost event handlers retaining detached DOM nodes in heap memory.',
        explanation: 'Uncollected listeners keep references to component instances and DOM trees, causing heap size to balloon and degrading app responsiveness.',
        validationStatus: 'Validated',
        version: 1
      }
    ]
  },

  // 2. Mobile App Development
  {
    skillId: 'app_development',
    skillName: 'Mobile App Development',
    category: 'Technical',
    version: 1,
    published: true,
    lastUpdated: '2026-03-01',
    commonMistakes: [
      {
        mistake: 'Assuming permanent high-speed internet connectivity in mobile environments.',
        guidance: 'Design offline-first caching and optimistic UI updates.'
      },
      {
        mistake: 'Ignoring safe-area insets on notched screens, causing buttons to overlap status bars.',
        guidance: 'Wrap screens with SafeAreaView / SafeAreaInsets components.'
      }
    ],
    recommendedNextSkills: ['ui_ux_design', 'coding', 'client_handling'],
    recommendedProjects: ['Offline Bus Route App', 'Merchant Loyalty Stamp Card', 'Volunteer Task Sync'],
    practicalTask: {
      id: 'task_app_dev_offline_cache',
      skillId: 'app_development',
      title: 'Design an Offline Data Sync Mechanism for Mobile Form',
      instructions: 'Draft the data model and storage synchronization logic for a mobile field survey form that saves entries to local storage when offline and synchronizes them when connectivity resumes.',
      starterTemplate: `// Mobile Offline Data Sync Architecture
interface FormSubmission {
  id: string;
  data: Record<string, any>;
  status: 'pending_sync' | 'synced' | 'failed';
  createdAt: string;
}

export class OfflineSyncManager {
  async saveOffline(data: any): Promise<void> {
    // TODO: Save to local persistent storage (AsyncStorage/IndexedDB)
  }

  async syncPendingQueue(): Promise<number> {
    // TODO: Iterate over pending items and post to backend
    return 0;
  }
}`,
      expectedOutput: 'Robust sync queue with error retry, duplicate suppression, and persistent local storage.',
      totalRubricPoints: 20,
      timeEstimateMinutes: 20,
      demonstrationOptions: ['text', 'link', 'file'],
      rubric: [
        {
          id: 'crit_offline_handling',
          name: 'Offline State Architecture',
          maxPoints: 5,
          description: 'Gracefully handles disconnected state and local queue persistence.',
          levelDescriptors: {
            5: 'Complete offline queue with network listener and optimistic state.',
            3: 'Basic local storage saving without retry queue.',
            1: 'Fails to persist data when offline.'
          }
        },
        {
          id: 'crit_sync_robustness',
          name: 'Conflict & Duplicate Prevention',
          maxPoints: 5,
          description: 'Generates unique client UUIDs to prevent duplicated submissions on network reconnect.',
          levelDescriptors: {
            5: 'Idempotent sync keys with robust retry backoff.',
            3: 'Basic sync but duplicate risk on packet drop.',
            1: 'No deduplication mechanism.'
          }
        },
        {
          id: 'crit_user_feedback',
          name: 'Mobile UX & Connectivity Indicators',
          maxPoints: 5,
          description: 'Provides clear visual cues when operating in offline/syncing modes.',
          levelDescriptors: {
            5: 'Clear non-intrusive status badges and sync progress bars.',
            3: 'Basic alert messages.',
            1: 'Silent failures with no user notification.'
          }
        },
        {
          id: 'crit_code_cleanliness',
          name: 'Code Modularity & Typing',
          maxPoints: 5,
          description: 'Clean separation between UI components, storage engine, and network client.',
          levelDescriptors: {
            5: 'Modular service layer with typed interfaces.',
            3: 'Monolithic code with basic types.',
            1: 'Unstructured script.'
          }
        }
      ]
    },
    questions: [
      {
        id: 'q_app_01',
        skillId: 'app_development',
        difficulty: 'Foundation',
        type: 'multiple_choice',
        competency: 'Mobile Screen Ergonomics',
        question: 'What is the recommended minimum touch target size for primary action buttons on mobile screens?',
        options: ['44 x 44 to 48 x 48 dp/pixels', '10 x 10 pixels', '100 x 100 pixels', '5 x 5 pixels'],
        correctAnswer: '44 x 44 to 48 x 48 dp/pixels',
        explanation: 'Both Apple HIG and Google Material Design recommend minimum 44-48dp touch targets to prevent accidental missed taps by finger thumbs.',
        validationStatus: 'Validated',
        version: 1
      },
      {
        id: 'q_app_02',
        skillId: 'app_development',
        difficulty: 'Developing',
        type: 'true_false',
        competency: 'App Lifecycle',
        question: 'When a mobile app is backgrounded by the operating system, heavy background CPU computations should be paused to preserve device battery.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'Modern mobile OSs (iOS/Android) throttle or kill background processes to optimize battery life and memory performance.',
        validationStatus: 'Validated',
        version: 1
      },
      {
        id: 'q_app_03',
        skillId: 'app_development',
        difficulty: 'Intermediate',
        type: 'scenario',
        competency: 'Offline State Management',
        scenarioContext: 'A user submits an order while driving through a tunnel with no network connection.',
        question: 'What is the standard "Optimistic UI" mobile pattern for this interaction?',
        options: [
          'Instantly reflect the order as placed in the UI, write the payload to a local offline queue, and sync quietly when connectivity returns.',
          'Show a fatal full-screen error modal and erase the user\'s form inputs.',
          'Freeze the app screen until connection is restored.',
          'Force the phone into airplane mode.'
        ],
        correctAnswer: 'Instantly reflect the order as placed in the UI, write the payload to a local offline queue, and sync quietly when connectivity returns.',
        explanation: 'Optimistic UI provides zero perceived latency while an offline queue guarantees eventual consistency without losing user data.',
        validationStatus: 'Validated',
        version: 1
      },
      {
        id: 'q_app_04',
        skillId: 'app_development',
        difficulty: 'Strong',
        type: 'multi_select',
        competency: 'Mobile Performance Profiling',
        question: 'Which factors contribute to UI jank (dropped frames below 60fps) in mobile applications? (Select all that apply)',
        options: [
          'Performing heavy JSON parsing or encryption synchronously on the main UI thread',
          'Rendering huge unbounded lists without item virtualization/recycling',
          'Loading uncompressed multi-megabyte image assets directly into memory',
          'Using vector SVG icons instead of raster bitmaps'
        ],
        correctAnswer: [
          'Performing heavy JSON parsing or encryption synchronously on the main UI thread',
          'Rendering huge unbounded lists without item virtualization/recycling',
          'Loading uncompressed multi-megabyte image assets directly into memory'
        ],
        explanation: 'Blocking the main thread and unvirtualized list allocations cause frame drops and memory spikes on mobile hardware.',
        validationStatus: 'Validated',
        version: 1
      }
    ]
  },

  // 3. Electronics & Circuits
  {
    skillId: 'electronics',
    skillName: 'Electronics & Circuits',
    category: 'Technical',
    version: 1,
    published: true,
    lastUpdated: '2026-03-01',
    commonMistakes: [
      {
        mistake: 'Connecting LEDs directly to power rails without current-limiting series resistors.',
        guidance: 'Always calculate R = (Vsupply - Vf) / If to prevent thermal runaway.'
      },
      {
        mistake: 'Omitting pull-up or pull-down resistors on digital input pins.',
        guidance: 'Floating pins pick up ambient EMI and oscillate randomly between 0 and 1.'
      }
    ],
    recommendedNextSkills: ['coding', 'iot_systems', 'repair'],
    recommendedProjects: ['Plant Soil Moisture Monitor', 'Touchless Sanitizer Dispenser', 'Low-Cost Audio Amp'],
    practicalTask: {
      id: 'task_electronics_led_circuit',
      skillId: 'electronics',
      title: 'Calculate Resistor & Draw Schematic for Sensor Triggered Circuit',
      instructions: 'Design a schematic for an automatic light-activated circuit using a 5V supply, an LDR (Light Dependent Resistor), a transistor (NPN 2N2222) switch, and a high-brightness LED (Vf=2.2V, 20mA). Calculate the exact series resistor for the LED.',
      starterTemplate: `// Electronics Design Submission: LDR Light Trigger
Supply Voltage: 5.0 V
LED Forward Voltage (Vf): 2.2 V
LED Target Current (If): 20 mA (0.02 A)

1. Resistor Calculation:
   - Voltage drop across resistor Vr = Vsupply - Vf = ___ V
   - Resistor value R = Vr / If = ___ Ohms
   - Standard E12 resistor choice: ___ Ohms

2. Circuit Schematic Description / Pinout Connections:
   - LDR and Voltage Divider Configuration:
   - Transistor Base, Collector, Emitter wiring:

3. Verification & Safety Checks:
   - Power dissipation P = I^2 * R = ___ Watts (Is 1/4W resistor safe?)`,
      expectedOutput: 'Correct calculation (R = 140 Ohms -> standard 150 Ohm), safe power rating, and correct NPN transistor bias configuration.',
      totalRubricPoints: 20,
      timeEstimateMinutes: 15,
      demonstrationOptions: ['text', 'link', 'file'],
      rubric: [
        {
          id: 'crit_elec_math',
          name: 'Ohm\'s Law & Power Calculations',
          maxPoints: 5,
          description: 'Calculates resistor values and power ratings accurately with correct units.',
          levelDescriptors: {
            5: 'Exact calculations with standard component value selection and power safety margin.',
            3: 'Correct formula with minor rounding or standard-value oversight.',
            1: 'Incorrect formula application.'
          }
        },
        {
          id: 'crit_elec_schematic',
          name: 'Circuit Topology & Component Selection',
          maxPoints: 5,
          description: 'Correctly configures transistor switching and sensor divider network.',
          levelDescriptors: {
            5: 'Flawless circuit logic with flyback diode/pull-down safety.',
            3: 'Functional circuit with minor missing pull-down.',
            1: 'Incorrect transistor biasing that damages components.'
          }
        },
        {
          id: 'crit_elec_safety',
          name: 'Safety & Component Protection',
          maxPoints: 5,
          description: 'Protects components from overcurrent, reverse polarity, and thermal runaway.',
          levelDescriptors: {
            5: 'Rigorous safety limits applied across all nodes.',
            3: 'Standard safety checks conducted.',
            1: 'Dangerous short circuit or overcurrent hazard.'
          }
        },
        {
          id: 'crit_elec_doc',
          name: 'Schematic Documentation & Clarity',
          maxPoints: 5,
          description: 'Clearly labels pinouts, polarities (+/-), and component designators.',
          levelDescriptors: {
            5: 'Professional schematic clarity with standardized symbols.',
            3: 'Readable sketch with minor label ambiguity.',
            1: 'Illegible or confusing wiring description.'
          }
        }
      ]
    },
    questions: [
      {
        id: 'q_elec_01',
        skillId: 'electronics',
        difficulty: 'Foundation',
        type: 'multiple_choice',
        competency: 'Ohm\'s Law',
        question: 'If a 12V power supply drives a 60-ohm resistor, what is the resulting current flowing through the circuit?',
        options: ['0.2 A (200 mA)', '5.0 A', '720 A', '0.05 A'],
        correctAnswer: '0.2 A (200 mA)',
        explanation: 'By Ohm\'s law: I = V / R = 12V / 60 ohms = 0.2 Amperes (200 mA).',
        validationStatus: 'Validated',
        version: 1
      },
      {
        id: 'q_elec_02',
        skillId: 'electronics',
        difficulty: 'Foundation',
        type: 'true_false',
        competency: 'Multimeter Usage',
        question: 'When measuring electric current with a digital multimeter in Amps mode, the meter leads must be connected in series with the circuit branch.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'Ammeters have near-zero internal resistance and must be in series; placing an ammeter in parallel across voltage creates a direct short circuit and blows the internal fuse.',
        validationStatus: 'Validated',
        version: 1
      },
      {
        id: 'q_elec_03',
        skillId: 'electronics',
        difficulty: 'Developing',
        type: 'multiple_choice',
        competency: 'Semiconductor Switching',
        question: 'What is the primary function of a flyback diode placed anti-parallel across an inductive DC relay coil?',
        options: [
          'To dissipate high-voltage inductive spikes when the coil is switched off, protecting the driving transistor.',
          'To increase the brightness of the relay status light.',
          'To invert the DC power into alternating current.',
          'To charge an auxiliary battery.'
        ],
        correctAnswer: 'To dissipate high-voltage inductive spikes when the coil is switched off, protecting the driving transistor.',
        explanation: 'When current to an inductor collapses, it produces a reverse EMF voltage spike (L * di/dt) that can exceed 100V. The flyback diode safely clamps this spike.',
        validationStatus: 'Validated',
        version: 1
      },
      {
        id: 'q_elec_04',
        skillId: 'electronics',
        difficulty: 'Intermediate',
        type: 'scenario',
        competency: 'Digital Pin Noise & Floating Inputs',
        scenarioContext: 'An Arduino pushbutton input randomly triggers false button presses whenever nearby AC appliances turn on.',
        question: 'What is the root cause and standard hardware fix?',
        options: [
          'The input pin is floating without a pull-up or pull-down resistor; enable the internal INPUT_PULLUP resistor or add an external 10k resistor.',
          'The Arduino CPU frequency is too high; replace the crystal oscillator.',
          'The pushbutton is installed upside down.',
          'The USB cable is too long.'
        ],
        correctAnswer: 'The input pin is floating without a pull-up or pull-down resistor; enable the internal INPUT_PULLUP resistor or add an external 10k resistor.',
        explanation: 'High-impedance floating input pins act as antennas picking up electromagnetic noise. A pull-up/pull-down ties the pin to a known logic level when the switch is open.',
        validationStatus: 'Validated',
        version: 1
      }
    ]
  },

  // 4. Robotics & Automation
  {
    skillId: 'robotics',
    skillName: 'Robotics & Automation',
    category: 'Technical',
    version: 1,
    published: true,
    lastUpdated: '2026-03-01',
    commonMistakes: [
      {
        mistake: 'Powering high-torque servo motors directly from a microcontroller 5V regulator pin.',
        guidance: 'Always power motors from an external dedicated power supply with shared common ground.'
      }
    ],
    recommendedNextSkills: ['electronics', 'coding', '3d_modeling'],
    recommendedProjects: ['Warehouse Transporter Mockup', 'Classroom Bell Timer Rig', '2-Axis Solar Tracker'],
    practicalTask: {
      id: 'task_robotics_pid_logic',
      skillId: 'robotics',
      title: 'Design an Obstacle Avoidance & Navigation State Machine',
      instructions: 'Write the control logic / state machine pseudocode for a two-wheeled differential drive rover equipped with an ultrasonic sensor. Handle Forward, Slowdown, Turn-Right, and Reverse-Escape states.',
      starterTemplate: `// Differential Drive Obstacle Avoidance State Machine
enum RoverState { FORWARD, SLOWDOWN, TURN_RIGHT, ESCAPE_REVERSE }

class RoverController {
  private state: RoverState = RoverState.FORWARD;

  update(distanceCm: number): { leftMotorSpeed: number; rightMotorSpeed: number } {
    // TODO: Implement state transition and motor control logic
    // Distance > 30cm: Full Forward
    // Distance 15-30cm: Slowdown
    // Distance 8-15cm: Turn Right
    // Distance < 8cm: Reverse Escape
    return { leftMotorSpeed: 0, rightMotorSpeed: 0 };
  }
}`,
      expectedOutput: 'Clear finite state machine preventing rover collisions and deadlock loops.',
      totalRubricPoints: 20,
      timeEstimateMinutes: 15,
      demonstrationOptions: ['text', 'link', 'file'],
      rubric: [
        {
          id: 'crit_fsm_logic',
          name: 'State Machine Completeness',
          maxPoints: 5,
          description: 'Implements all required states without undefined or trapped transitions.',
          levelDescriptors: {
            5: 'Flawless deterministic FSM with hysterisis preventing rapid jitter.',
            3: 'Basic conditional logic without state encapsulation.',
            1: 'Broken state transitions causing collisions.'
          }
        },
        {
          id: 'crit_motor_control',
          name: 'Differential Motor Dynamics',
          maxPoints: 5,
          description: 'Calculates correct left/right PWM motor speeds for turns and maneuvers.',
          levelDescriptors: {
            5: 'Smooth progressive speed curves.',
            3: 'Abrupt on/off motor switching.',
            1: 'Incorrect turn polarity (turns toward obstacle).'
          }
        },
        {
          id: 'crit_fail_safe',
          name: 'Deadlock & Trap Recovery',
          maxPoints: 5,
          description: 'Detects if the robot is stuck in a corner and executes escape routine.',
          levelDescriptors: {
            5: 'Timeout watchdog with multi-point reverse maneuver.',
            3: 'Basic reverse only.',
            1: 'Stalls indefinitely in corners.'
          }
        },
        {
          id: 'crit_doc',
          name: 'Logic Readability & Modularity',
          maxPoints: 5,
          description: 'Clean pseudocode with well-documented threshold constants.',
          levelDescriptors: {
            5: 'Self-documenting code with clear parameterization.',
            3: 'Readable script with magic numbers.',
            1: 'Messy logic.'
          }
        }
      ]
    },
    questions: [
      {
        id: 'q_rob_01',
        skillId: 'robotics',
        difficulty: 'Foundation',
        type: 'multiple_choice',
        competency: 'Motor Drivers & H-Bridges',
        question: 'What is the primary role of an H-Bridge motor driver (e.g., L298N, TB6612FNG) in a robotic chassis?',
        options: [
          'To control both the rotational direction (polarity) and speed (PWM) of DC motors using low-power logic signals.',
          'To measure the temperature of the wheels.',
          'To step down AC grid power to DC.',
          'To act as a radio receiver for Bluetooth.'
        ],
        correctAnswer: 'To control both the rotational direction (polarity) and speed (PWM) of DC motors using low-power logic signals.',
        explanation: 'Microcontroller pins cannot output the high current (>1A) needed for DC motors. An H-Bridge switches high motor current in forward/reverse via small logic pins.',
        validationStatus: 'Validated',
        version: 1
      },
      {
        id: 'q_rob_02',
        skillId: 'robotics',
        difficulty: 'Intermediate',
        type: 'scenario',
        competency: 'Closed-Loop Control (PID)',
        scenarioContext: 'A robotic arm moves to target angles but continuously oscillates back and forth around the setpoint without settling.',
        question: 'In a PID (Proportional-Integral-Derivative) controller, which tuning adjustment helps dampen this oscillation?',
        options: [
          'Increase the Derivative (D) gain and/or reduce the Proportional (P) gain.',
          'Increase the Proportional (P) gain to maximum.',
          'Set Integral (I) gain to infinity.',
          'Turn off all sensors.'
        ],
        correctAnswer: 'Increase the Derivative (D) gain and/or reduce the Proportional (P) gain.',
        explanation: 'Derivative gain predicts future error based on rate of change and provides mathematical damping against overshoot and oscillations.',
        validationStatus: 'Validated',
        version: 1
      }
    ]
  },

  // 5. IoT & Embedded Systems
  {
    skillId: 'iot_systems',
    skillName: 'IoT & Embedded Systems',
    category: 'Technical',
    version: 1,
    published: true,
    lastUpdated: '2026-03-01',
    commonMistakes: [
      {
        mistake: 'Using unencrypted HTTP for transmitting telemetry data over public Wi-Fi networks.',
        guidance: 'Enforce MQTT over TLS (MQTTS port 8883) or HTTPS endpoints.'
      }
    ],
    recommendedNextSkills: ['electronics', 'coding', 'data_analysis'],
    recommendedProjects: ['Greenhouse Environmental Monitor', 'Water Tank SMS Alert', 'Rooftop Solar Telemetry'],
    practicalTask: {
      id: 'task_iot_telemetry_payload',
      skillId: 'iot_systems',
      title: 'Design Lightweight JSON Telemetry Payload & MQTT Topic Structure',
      instructions: 'Design an MQTT topic hierarchy and compact JSON payload for an agricultural sensor beacon reporting temperature, soil moisture, battery voltage, and device uptime every 60 seconds.',
      starterTemplate: `// IoT Architecture Specification
// 1. MQTT Topic Architecture:
// Topic Template: sensors/<device_id>/telemetry
// Status Topic: sensors/<device_id>/status (LWT - Last Will & Testament)

// 2. Compact JSON Telemetry Payload:
{
  "dev_id": "agr_node_001",
  "ts": 1741849200,
  "temp_c": 24.5,
  "soil_pct": 68,
  "batt_v": 3.92,
  "uptime_s": 86400
}

// 3. Deep-Sleep Power Optimization Strategy:
// - Time awake vs sleep ratio:
// - Wi-Fi connection handshake optimization:`,
      expectedOutput: 'Compact, bandwidth-efficient MQTT hierarchy with Last Will and Testament (LWT) disconnect detection.',
      totalRubricPoints: 20,
      timeEstimateMinutes: 15,
      demonstrationOptions: ['text', 'link', 'file'],
      rubric: [
        {
          id: 'crit_iot_protocol',
          name: 'MQTT Topic Hierarchy & Design',
          maxPoints: 5,
          description: 'Follows standard hierarchical topic conventions with clear namespace scoping.',
          levelDescriptors: {
            5: 'Hierarchical, extensible topic taxonomy with LWT and command subscriptions.',
            3: 'Flat topic structure with basic publish/subscribe.',
            1: 'Chaotic topic naming without structure.'
          }
        },
        {
          id: 'crit_iot_payload',
          name: 'Payload Optimization & Data Types',
          maxPoints: 5,
          description: 'Minimizes byte overhead for cellular/LPWAN IoT transmission constraints.',
          levelDescriptors: {
            5: 'Compact, typed JSON or binary packet with timestamp and device ID.',
            3: 'Standard JSON with slight redundancy.',
            1: 'Overly bloated payload wasting bandwidth.'
          }
        },
        {
          id: 'crit_iot_power',
          name: 'Power & Sleep Management',
          maxPoints: 5,
          description: 'Applies deep sleep cycles and fast Wi-Fi connection caching.',
          levelDescriptors: {
            5: 'Calculates battery endurance based on deep-sleep current vs active burst current.',
            3: 'Mentions deep sleep without current calculations.',
            1: 'Continuous full-power transmission draining battery in hours.'
          }
        },
        {
          id: 'crit_iot_security',
          name: 'Security & Device Identity',
          maxPoints: 5,
          description: 'Includes authentication tokens, TLS encryption, and secure provisioning.',
          levelDescriptors: {
            5: 'TLS encryption, unique device secrets, and token rotation.',
            3: 'Basic password authentication.',
            1: 'Unencrypted plaintext communication.'
          }
        }
      ]
    },
    questions: [
      {
        id: 'q_iot_01',
        skillId: 'iot_systems',
        difficulty: 'Foundation',
        type: 'multiple_choice',
        competency: 'IoT Protocols',
        question: 'Why is MQTT preferred over HTTP for battery-powered remote IoT sensors?',
        options: [
          'MQTT is a lightweight publish/subscribe protocol with tiny packet headers (2 bytes minimum) and low bandwidth overhead.',
          'MQTT can only operate without internet.',
          'HTTP is illegal on microcontrollers.',
          'MQTT produces higher resolution video.'
        ],
        correctAnswer: 'MQTT is a lightweight publish/subscribe protocol with tiny packet headers (2 bytes minimum) and low bandwidth overhead.',
        explanation: 'HTTP headers add hundreds of bytes of overhead per request. MQTT\'s compact binary header and persistent TCP connection drastically reduce radio transmission time and battery drain.',
        validationStatus: 'Validated',
        version: 1
      },
      {
        id: 'q_iot_02',
        skillId: 'iot_systems',
        difficulty: 'Intermediate',
        type: 'scenario',
        competency: 'Reliability & Device Outage Detection',
        scenarioContext: 'A solar-powered remote weather station loses power abruptly when a storm damages its solar cable.',
        question: 'Which built-in MQTT feature allows the cloud broker to notify subscribers immediately that the device went offline?',
        options: [
          'Last Will and Testament (LWT) message configured on initial connect.',
          'Sending an email from the dead microcontroller.',
          'Increasing the MQTT Quality of Service to 3.',
          'Pinging Google DNS every millisecond.'
        ],
        correctAnswer: 'Last Will and Testament (LWT) message configured on initial connect.',
        explanation: 'When a client connects, it registers an LWT topic/payload with the broker. If the connection drops ungracefully without a DISCONNECT packet, the broker automatically publishes the LWT message.',
        validationStatus: 'Validated',
        version: 1
      }
    ]
  },

  // 6. Data Analysis & Statistics
  {
    skillId: 'data_analysis',
    skillName: 'Data Analysis & Statistics',
    category: 'Technical',
    version: 1,
    published: true,
    lastUpdated: '2026-03-01',
    commonMistakes: [
      {
        mistake: 'Confusing correlation with causation when presenting exploratory data.',
        guidance: 'Always explicitly state confounding variables and sample limitations.'
      }
    ],
    recommendedNextSkills: ['problem_solving', 'communication', 'marketing'],
    recommendedProjects: ['Market Footfall Report', 'School Canteen Waste Audit', 'Study Habits Correlation'],
    practicalTask: {
      id: 'task_data_analysis_summary',
      skillId: 'data_analysis',
      title: 'Analyze Survey Dataset & Synthesize Actionable Insights',
      instructions: 'Given a dataset of customer satisfaction ratings (1-5) and delivery times (mins), calculate mean, median, standard deviation, identify outliers, and draft a 3-point recommendation for operations.',
      starterTemplate: `# Data Analysis Brief: Delivery Performance Audit
Dataset: [18, 22, 24, 25, 26, 28, 30, 31, 35, 78] (Delivery mins)

1. Descriptive Statistics:
   - Sample Size (N): 10
   - Mean: ___ mins
   - Median: ___ mins
   - Identified Outlier(s): ___ mins (Explanation of why it skews mean)

2. Variance & Distribution:
   - Why median is a more robust central measure here than mean:

3. Three Actionable Operational Recommendations:
   - 1.
   - 2.
   - 3.`,
      expectedOutput: 'Correct calculation (Mean=31.7, Median=27), outlier detection (78 mins), and data-driven recommendations.',
      totalRubricPoints: 20,
      timeEstimateMinutes: 15,
      demonstrationOptions: ['text', 'link', 'file'],
      rubric: [
        {
          id: 'crit_data_math',
          name: 'Statistical Calculation Accuracy',
          maxPoints: 5,
          description: 'Calculates central tendencies and variance correctly.',
          levelDescriptors: {
            5: 'Exact mean, median, IQR/standard deviation with outlier justification.',
            3: 'Correct mean and median with minor calculation inaccuracy.',
            1: 'Incorrect statistical formulas.'
          }
        },
        {
          id: 'crit_data_outliers',
          name: 'Outlier & Skewness Diagnosis',
          maxPoints: 5,
          description: 'Explains impact of skewed data points on decision metrics.',
          levelDescriptors: {
            5: 'Deep understanding of parametric vs non-parametric metrics.',
            3: 'Identifies outlier without deep explanation.',
            1: 'Fails to detect extreme outlier.'
          }
        },
        {
          id: 'crit_data_insights',
          name: 'Actionable Business Insights',
          maxPoints: 5,
          description: 'Translates numbers into practical operational improvements.',
          levelDescriptors: {
            5: 'High-impact, realistic recommendations tied directly to data evidence.',
            3: 'Generic recommendations.',
            1: 'Irrelevant or speculative conclusions.'
          }
        },
        {
          id: 'crit_data_presentation',
          name: 'Clarity of Visual/Written Reporting',
          maxPoints: 5,
          description: 'Structured, executive-ready presentation of data findings.',
          levelDescriptors: {
            5: 'Clean executive summary with visual table structure.',
            3: 'Understandable summary.',
            1: 'Disorganized output.'
          }
        }
      ]
    },
    questions: [
      {
        id: 'q_data_01',
        skillId: 'data_analysis',
        difficulty: 'Foundation',
        type: 'multiple_choice',
        competency: 'Central Tendency Measures',
        question: 'When analyzing a salary dataset with extreme high-income outliers (e.g., tech CEOs in a local town), which metric best represents the "typical" resident salary?',
        options: ['Median', 'Mean', 'Standard Deviation', 'Range'],
        correctAnswer: 'Median',
        explanation: 'The median represents the 50th percentile and is resistant to extreme outliers, whereas the mean is heavily skewed upward by extreme values.',
        validationStatus: 'Validated',
        version: 1
      },
      {
        id: 'q_data_02',
        skillId: 'data_analysis',
        difficulty: 'Intermediate',
        type: 'scenario',
        competency: 'A/B Testing & Significance',
        scenarioContext: 'An e-commerce button redesign yields 120 clicks out of 1000 visitors (12%) compared to old design\'s 100 clicks out of 1000 (10%).',
        question: 'Before declaring the new design the permanent winner, what statistical concept must be verified?',
        options: [
          'Statistical significance (p-value < 0.05 / confidence interval) to confirm the 2% gain was not random sampling noise.',
          'Checking if the new button color matches the CEO\'s car.',
          'Running the test for exactly 10 seconds.',
          'Deleting all old database backups.'
        ],
        correctAnswer: 'Statistical significance (p-value < 0.05 / confidence interval) to confirm the 2% gain was not random sampling noise.',
        explanation: 'Sample variances can produce false positives. Hypothesis testing checks whether the observed conversion lift is statistically significant.',
        validationStatus: 'Validated',
        version: 1
      }
    ]
  },

  // 7. Digital Literacy & Computer Operations
  {
    skillId: 'digital_literacy',
    skillName: 'Digital Literacy & Computer Operations',
    category: 'Technical',
    version: 1,
    published: true,
    lastUpdated: '2026-03-01',
    commonMistakes: [
      {
        mistake: 'Using the same simple password across multiple accounts without 2-factor authentication.',
        guidance: 'Adopt password managers and hardware/app-based 2FA.'
      }
    ],
    recommendedNextSkills: ['communication', 'teaching', 'graphic_design'],
    recommendedProjects: ['Senior Citizen Banking Guide', 'Artisan UPI Setup Drive', 'Digitized School Archive'],
    practicalTask: {
      id: 'task_dig_lit_security',
      skillId: 'digital_literacy',
      title: 'Create a Community Cybersecurity & Digital Safety Checklist',
      instructions: 'Draft a 1-page practical digital hygiene guide for elders and small shop owners covering strong password creation, phishing email identification, and safe UPI/digital payments.',
      starterTemplate: `# Community Digital Safety Guide
Target Audience: Senior Citizens & First-Time Digital Payers

1. Strong Password & Authentication Rules:
   - Rule 1: Passphrase technique vs simple words
   - Rule 2: Two-Factor Authentication (2FA) setup

2. How to Spot a Phishing/Fraud Message (3 Red Flags):
   - Red Flag 1:
   - Red Flag 2:
   - Red Flag 3:

3. Safe UPI & Online Payment Rules:
   - Golden Rule: You NEVER enter UPI PIN to RECEIVE money.
   - Verifying merchant receiver names before confirming.`,
      expectedOutput: 'Accessible, jargon-free digital safety guide with high actionable value.',
      totalRubricPoints: 20,
      timeEstimateMinutes: 15,
      demonstrationOptions: ['text', 'link', 'file'],
      rubric: [
        {
          id: 'crit_dl_clarity',
          name: 'Clarity & Accessibility',
          maxPoints: 5,
          description: 'Uses empathetic, jargon-free language suitable for beginners.',
          levelDescriptors: {
            5: 'Clear, reassuring explanations with practical analogies.',
            3: 'Understandable with minor technical jargon.',
            1: 'Confusing or overly technical.'
          }
        },
        {
          id: 'crit_dl_accuracy',
          name: 'Security Principles Accuracy',
          maxPoints: 5,
          description: 'Provides accurate guidance on phishing, 2FA, and payments.',
          levelDescriptors: {
            5: 'Accurate and up-to-date with modern threat models.',
            3: 'Correct basic tips.',
            1: 'Contains inaccurate security advice.'
          }
        },
        {
          id: 'crit_dl_actionable',
          name: 'Practical Actionability',
          maxPoints: 5,
          description: 'Gives concrete steps the reader can execute immediately.',
          levelDescriptors: {
            5: 'Checklist-style steps with visual cues.',
            3: 'Helpful general guidance.',
            1: 'Vague advice without steps.'
          }
        },
        {
          id: 'crit_dl_presentation',
          name: 'Layout & Structure',
          maxPoints: 5,
          description: 'Organized with clear headings, bullet points, and warning callouts.',
          levelDescriptors: {
            5: 'Exemplary visual hierarchy and scannability.',
            3: 'Adequate structure.',
            1: 'Wall of unformatted text.'
          }
        }
      ]
    },
    questions: [
      {
        id: 'q_dl_01',
        skillId: 'digital_literacy',
        difficulty: 'Foundation',
        type: 'multiple_choice',
        competency: 'Digital Payments Security',
        question: 'When receiving money from someone via UPI (Google Pay, PhonePe, Paytm), when do you need to enter your UPI PIN?',
        options: [
          'NEVER. You only enter your UPI PIN when SENDING money or checking account balance.',
          'Every time you receive more than ₹500.',
          'Whenever the sender requests you to authorize receipt.',
          'Whenever your phone is on Wi-Fi.'
        ],
        correctAnswer: 'NEVER. You only enter your UPI PIN when SENDING money or checking account balance.',
        explanation: 'Entering a UPI PIN authorizes a debit (withdrawal) from your bank account. Receiving funds is automatic and never requires a PIN.',
        validationStatus: 'Validated',
        version: 1
      },
      {
        id: 'q_dl_02',
        skillId: 'digital_literacy',
        difficulty: 'Developing',
        type: 'scenario',
        competency: 'Phishing Recognition',
        scenarioContext: 'You receive an urgent SMS: "Your Electricity will be disconnected tonight at 9:30 PM! Call Electricity Officer Sharma immediately at 98765-XXXXX to verify your bill."',
        question: 'What is the most secure and appropriate reaction?',
        options: [
          'Recognize this as a classic urgency phishing scam; do NOT call the unknown mobile number, and check bill status only on the official utility portal/app.',
          'Call the number immediately and share your debit card details.',
          'Send your Aadhaar card copy to the phone number.',
          'Forward the message to 10 WhatsApp groups.'
        ],
        correctAnswer: 'Recognize this as a classic urgency phishing scam; do NOT call the unknown mobile number, and check bill status only on the official utility portal/app.',
        explanation: 'Scammers use artificial urgency and threats of disconnection to panic victims into calling unofficial phone numbers and installing remote control apps.',
        validationStatus: 'Validated',
        version: 1
      }
    ]
  },

  // 8. Automation & Scripting
  {
    skillId: 'automation_tools',
    skillName: 'Automation & Scripting',
    category: 'Technical',
    version: 1,
    published: true,
    lastUpdated: '2026-03-01',
    commonMistakes: [
      {
        mistake: 'Running automated batch update scripts directly against production databases without dry-run testing.',
        guidance: 'Always execute dry-runs with logging before applying destructive writes.'
      }
    ],
    recommendedNextSkills: ['coding', 'problem_solving', 'project_management'],
    recommendedProjects: ['Fee Reminder & Invoice Dispatcher', 'Weather & Price Sync Script', 'Batch Image Resizer'],
    practicalTask: {
      id: 'task_auto_workflow_design',
      skillId: 'automation_tools',
      title: 'Design an Automated Notification & Data Backup Pipeline',
      instructions: 'Design an automated multi-step workflow script (or no-code trigger pipeline) that monitors a Google Sheet for new client signups, validates input fields, formats a welcome email, and logs status to a backup archive.',
      starterTemplate: `# Automated Pipeline Architecture
1. Trigger Event:
   - On Form Submission / New Row appended to Spreadsheet

2. Processing & Validation Pipeline:
   - Step A: Verify email format and check for duplicates
   - Step B: Generate PDF receipt from template
   - Step C: Dispatch email via SMTP/SendGrid
   - Step D: Update spreadsheet row status to "DISPATCHED" with timestamp

3. Error Handling & Retry Logic:
   - What happens if the email API times out?
   - Alert notification to administrator:`,
      expectedOutput: 'Resilient workflow design with idempotency, validation checks, and failure alerting.',
      totalRubricPoints: 20,
      timeEstimateMinutes: 15,
      demonstrationOptions: ['text', 'link', 'file'],
      rubric: [
        {
          id: 'crit_auto_logic',
          name: 'Workflow & Trigger Architecture',
          maxPoints: 5,
          description: 'Clear sequence from trigger to execution with data validation.',
          levelDescriptors: {
            5: 'Complete end-to-end pipeline with modular steps.',
            3: 'Basic workflow missing validation steps.',
            1: 'Incomplete trigger logic.'
          }
        },
        {
          id: 'crit_auto_error',
          name: 'Error Handling & Idempotency',
          maxPoints: 5,
          description: 'Prevents infinite loop triggers or duplicated duplicate emails.',
          levelDescriptors: {
            5: 'Robust state tracking with retry backoff and error alerts.',
            3: 'Basic try/catch without retry.',
            1: 'No error recovery.'
          }
        },
        {
          id: 'crit_auto_security',
          name: 'Credential Security & Rate Limits',
          maxPoints: 5,
          description: 'Stores API secrets securely and respects rate limits.',
          levelDescriptors: {
            5: 'Environment variables used; batching applied to avoid rate limits.',
            3: 'Basic secrets handling.',
            1: 'Hardcoded API secrets.'
          }
        },
        {
          id: 'crit_auto_doc',
          name: 'Documentation & Maintainability',
          maxPoints: 5,
          description: 'Clear documentation so another team member can manage the script.',
          levelDescriptors: {
            5: 'Crisp setup guide with configuration variables.',
            3: 'Readable comments.',
            1: 'Uncommented script.'
          }
        }
      ]
    },
    questions: [
      {
        id: 'q_auto_01',
        skillId: 'automation_tools',
        difficulty: 'Foundation',
        type: 'multiple_choice',
        competency: 'Trigger Types',
        question: 'In workflow automation (e.g., Zapier, Make, n8n, Python cron), what is a "Webhook"?',
        options: [
          'An HTTP callback that sends real-time data from an application to another as soon as an event occurs.',
          'A physical cable connecting two hard drives.',
          'A fishing tool for underwater servers.',
          'A password-reset button.'
        ],
        correctAnswer: 'An HTTP callback that sends real-time data from an application to another as soon as an event occurs.',
        explanation: 'Webhooks allow instant push notifications between cloud systems without needing continuous battery-draining polling loops.',
        validationStatus: 'Validated',
        version: 1
      },
      {
        id: 'q_auto_02',
        skillId: 'automation_tools',
        difficulty: 'Intermediate',
        type: 'scenario',
        competency: 'Idempotency in Automation',
        scenarioContext: 'An automated billing script crashes midway through processing 100 invoices. You restart the script.',
        question: 'What architectural design guarantees that clients who already received invoices are NOT billed a second time?',
        options: [
          'Idempotency keys and status flags (checking "if (invoice.status === \'PROCESSED\') skip;").',
          'Running the script faster.',
          'Turning off the computer monitor.',
          'Sending apologies to all clients in advance.'
        ],
        correctAnswer: 'Idempotency keys and status flags (checking "if (invoice.status === \'PROCESSED\') skip;").',
        explanation: 'Idempotency guarantees that executing an operation multiple times produces the exact same result as executing it once, preventing duplicate charges.',
        validationStatus: 'Validated',
        version: 1
      }
    ]
  }
];
