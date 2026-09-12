import { Proficiency, Skill, SKILLS_DB } from './skills';
import { UserSkill } from '../context/ProfileContext';

export type OpportunityCategory = 'Service' | 'Product' | 'Entrepreneurship' | 'Community' | 'Technology' | 'Career Pathway';
export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface ProblemProfile {
  overview: string;
  keyChallenges: string[];
  urgency: string;
  marketGap: string;
}

export interface UserSegment {
  segment: string;
  description: string;
  painPoint: string;
  whyTheyCare: string;
}

export interface UsersProfile {
  primaryAudience: string;
  audienceSegments: UserSegment[];
  realWorldContext: string;
  outreachStrategy: string;
}

export interface DeliverableItem {
  name: string;
  description: string;
}

export interface SolutionProfile {
  summary: string;
  coreDeliverables: DeliverableItem[];
  howItWorks: string;
  economicValue: string;
  skillIntegration: string;
}

export interface RoadmapStep {
  phase: string;
  title: string;
  action: string;
  duration: string;
}

export interface FirstStepProfile {
  immediateAction: string;
  roadmap: RoadmapStep[];
  requiredResources: string[];
  validationMilestone: string;
  riskMitigation: string;
}

export interface Opportunity {
  id: string;
  title: string;
  category: OpportunityCategory;
  requiredSkills: string[]; // Array of skill IDs
  preferredSkills: string[]; // Array of skill IDs
  applications: string[];
  problems: string[];
  targetUsers: string[];
  solution: string;
  nextSkills: string[];
  firstStep: string;
  opportunityType: string; // e.g. "Freelance", "Micro-enterprise"
  difficulty: DifficultyLevel;

  // Expanded full-page profile sections
  problemProfile?: ProblemProfile;
  usersProfile?: UsersProfile;
  solutionProfile?: SolutionProfile;
  firstStepProfile?: FirstStepProfile;
}

export interface MatchResult {
  score: number;
  label: 'Strong Match' | 'Good Match' | 'Developing Match';
  matchedRequired: string[];
  matchedPreferred: string[];
  missingRequired: string[];
  missingPreferred: string[];
  explanation: string;
}

export const OPPORTUNITIES_DB: Opportunity[] = [
  {
    id: 'coding_and_design_experience_studio',
    title: 'Digital UI/UX & Web Experience Studio',
    category: 'Technology',
    requiredSkills: ['coding', 'graphic_design'],
    preferredSkills: ['communication', 'marketing'],
    applications: ['Interactive Web Portals', 'Mobile App Prototypes', 'E-commerce Redesigns', 'Design Systems'],
    problems: [
      'Small businesses and non-profits have clunky, outdated websites that repel customers',
      'Engineers struggle with aesthetics while graphic designers struggle with responsive web code',
      'High bounce rates due to poor visual hierarchy and slow, unresponsive user interfaces'
    ],
    targetUsers: ['Local boutiques & specialty shops', 'EdTech creators', 'Student-led startups'],
    solution: 'Bridge visual aesthetics with functional code to build lightning-fast, high-converting digital storefronts and interactive web experiences.',
    nextSkills: ['Product Management', 'Search Engine Optimization', 'Conversion Rate Optimization', 'Client Contracts'],
    firstStep: 'Identify a local business or school club with an unresponsive website and build a high-fidelity 1-page mobile-friendly prototype using Figma and code.',
    opportunityType: 'Digital Agency / Freelance',
    difficulty: 'Intermediate',
    problemProfile: {
      overview: 'In modern markets, a business without an intuitive digital presence loses 70% of potential young customers. Most small enterprises are trapped between hiring expensive digital agencies or using generic templates that look identical to competitors.',
      keyChallenges: [
        'Disconnect between design and implementation: static mockups rarely account for responsive layout constraints.',
        'High development agency fees ($2,000+) pricing out micro-businesses and community initiatives.',
        'Poor accessibility and performance: slow-loading pages that fail basic mobile usability tests.'
      ],
      urgency: 'Consumer commerce has moved mobile-first. Businesses failing to offer clean, instant digital interactions lose foot-traffic and customer loyalty within seconds.',
      marketGap: 'Most freelancers either only design in graphics tools or only write backend code. A student proficient in both Coding and Design can deliver turnkey, ready-to-deploy web assets at an accessible price point.'
    },
    usersProfile: {
      primaryAudience: 'Local independent business owners, artisan creators, and educational community initiatives.',
      audienceSegments: [
        {
          segment: 'Local Retail & Cafes',
          description: 'Independent stores needing digital menus, ordering links, and responsive showcase pages.',
          painPoint: 'Lost foot-traffic to franchises due to lack of an updated mobile presence.',
          whyTheyCare: 'Increases customer retention and provides instant mobile menu access.'
        },
        {
          segment: 'Student Innovators & Hackathon Teams',
          description: 'Peer innovators needing impressive, presentation-ready product landing pages for expos and investors.',
          painPoint: 'Strong ideas presented in poorly formatted slides and raw text.',
          whyTheyCare: 'Transforms technical logic into visually compelling pitches that win awards.'
        },
        {
          segment: 'Community Non-Profits',
          description: 'Grassroots charity or social programs needing clean donation portals and volunteer signups.',
          painPoint: 'Zero budget for expensive commercial web agency contracts.',
          whyTheyCare: 'Allows seamless volunteer onboarding and community engagement.'
        }
      ],
      realWorldContext: 'Accessible in your local neighborhood commercial street, school entrepreneurial fairs, or regional chamber of commerce listings.',
      outreachStrategy: 'Conduct a polite "Digital Audit" of 3 local neighborhood business websites. Create a 30-second screen-recording showing how their home page looks on mobile versus your redesigned prototype, then deliver it in person or via email.'
    },
    solutionProfile: {
      summary: 'A unified digital development service that designs custom typography, layouts, and brand color palettes, then directly implements them as clean, responsive, accessible web code.',
      coreDeliverables: [
        { name: 'Mobile-Optimized Single Page Site', description: 'Fast-loading, SEO-ready landing page tailored for smartphone viewports.' },
        { name: 'Brand Style Guide & UI Kit', description: 'Reusable typography scale, color tokens, and button components for consistent future assets.' },
        { name: 'Interactive Customer Actions', description: 'Click-to-call, WhatsApp inquiry button, and embedded Google Maps directory routing.' }
      ],
      howItWorks: 'Step 1: Rapid discovery session to gather client brand goals. Step 2: Wireframe and visual mockup in design tools. Step 3: Implement directly in clean HTML/CSS/Tailwind and deploy to a free high-performance CDN like Vercel or GitHub Pages.',
      economicValue: 'Freelance rate of ₹3,000 – ₹10,000 per business showcase page with virtually ₹0 hosting overhead using modern serverless platforms. High profit margin and strong portfolio building.',
      skillIntegration: 'Coding provides structural logic, responsiveness, and interactivity; Graphic Design ensures color harmony, contrast, typography hierarchy, and visual credibility.'
    },
    firstStepProfile: {
      immediateAction: 'Audit the websites of 3 neighborhood stores. Create a 1-page modern redesign concept for one of them in Figma or direct code.',
      roadmap: [
        { phase: 'Phase 1', title: 'Portfolio Asset', action: 'Build and host a demo landing page showcasing your own skills or a mock local bakery.', duration: 'Days 1–3' },
        { phase: 'Phase 2', title: 'Local Outreach', action: 'Visit 2 shop owners with your tablet or phone to show how their mobile presence could look.', duration: 'Days 4–7' },
        { phase: 'Phase 3', title: 'Pilot Delivery', action: 'Deliver the first website completely free in exchange for a glowing testimonial and referral.', duration: 'Week 2' },
        { phase: 'Phase 4', title: 'Commercial Launch', action: 'Standardize your pricing tiers (Basic Web Card, Full Showcase, Maintenance) and pitch 5 paid clients.', duration: 'Weeks 3–4' }
      ],
      requiredResources: ['Free Figma account', 'Visual Studio Code / Web browser', 'Free hosting on Vercel / GitHub Pages', 'Unsplash for royalty-free photography'],
      validationMilestone: 'Securing your first real shop owner who agrees to publish the new website URL on their Instagram or Google Business profile.',
      riskMitigation: 'Avoid endless client scope creep by agreeing in writing on exactly 3 pages or sections before beginning coding.'
    }
  },
  {
    id: 'electronics_entrepreneurship_iot_venture',
    title: 'Smart Hardware & IoT Micro-Enterprise',
    category: 'Entrepreneurship',
    requiredSkills: ['electronics', 'financial_literacy'],
    preferredSkills: ['leadership', 'marketing', 'coding'],
    applications: ['Low-Cost Automation Units', 'Energy Monitoring Plugs', 'School Lab Refurbishment', 'Custom Sensor Kits'],
    problems: [
      'Commercial smart-automation hardware is exorbitantly priced for local schools and small enterprises',
      'Electronic waste is discarded instead of being repaired or repurposed with smart microcontroller circuits',
      'Small business facilities waste electrical energy running fans, lighting, or pumps unattended'
    ],
    targetUsers: ['School science laboratories', 'Local greenhouse growers', 'Independent workshops & garages'],
    solution: 'Design, assemble, and market affordable microcontroller-driven monitoring and automated control units with transparent unit economics.',
    nextSkills: ['PCB Design (KiCad)', 'Embedded C/C++', 'Supply Chain Sourcing', 'Pricing & Margin Analysis'],
    firstStep: 'Calculate the Bill of Materials (BOM) cost for a basic ESP32 automated temperature/relay switch and price it with a 40% gross profit margin.',
    opportunityType: 'Hardware Micro-Enterprise',
    difficulty: 'Advanced',
    problemProfile: {
      overview: 'While consumer smart-home gadgets exist, small workshops, suburban greenhouses, and educational labs find commercial industrial IoT sensors out of reach. Simultaneously, young makers build circuits that remain on breadboards because they lack the business and financial models to commercialize them.',
      keyChallenges: [
        'Astronomical markups: Commercial industrial timers and climate controllers cost 5x–10x their raw component costs.',
        'Lack of financial and cost-accounting discipline among hobbyist hardware inventors.',
        'Fragile breadboard prototypes failing in real-world dust and vibration environments without proper enclosures.'
      ],
      urgency: 'Energy conservation and smart automation are urgent sustainability priorities under NEP 2020 and global climate targets. Affordable local hardware solves immediate utility bills.',
      marketGap: 'Big tech companies ignore micro-scale custom installations (e.g. automating a 200 sq ft neighborhood nursery or a school lab exhaust). A student entrepreneur can manufacture 5–10 custom units locally.'
    },
    usersProfile: {
      primaryAudience: 'School lab administrators, small nursery owners, and neighborhood fabrication workshops.',
      audienceSegments: [
        {
          segment: 'Educational Institutions',
          description: 'Science and computer labs seeking hands-on IoT demonstration stations without spending tens of thousands.',
          painPoint: 'Lab equipment budgets are capped; commercial kits are locked in proprietary ecosystems.',
          whyTheyCare: 'Provides students with real hardware experiences at a fraction of commercial cost.'
        },
        {
          segment: 'Urban Plant Nurseries & Greenhouses',
          description: 'Local plant vendors needing automated misting and soil-moisture alert bells.',
          painPoint: 'Plant mortality due to missed manual watering schedules on hot afternoons.',
          whyTheyCare: 'Directly prevents inventory loss and saves hours of manual labor daily.'
        },
        {
          segment: 'Neighborhood Repair Workshops',
          description: 'Carpentry and mechanical shops wanting auto-cutoff switches on high-power machinery.',
          painPoint: 'Spike in electricity bills and machinery overheating risks.',
          whyTheyCare: 'Direct financial ROI through reduced power consumption and prolonged machine lifespan.'
        }
      ],
      realWorldContext: 'Local vocational institutes, agricultural supply markets, maker spaces, and school science departments.',
      outreachStrategy: 'Demonstrate a live bench prototype measuring ambient temperature and switching an AC light or water pump. Show the client the exact monthly electricity or labor savings on a clear spreadsheet.'
    },
    solutionProfile: {
      summary: 'Produce modular, low-cost microcontroller devices (using ESP8266/ESP32 or Arduino) housed in 3D-printed or standardized electrical project boxes, sold with clear installation guidance and basic warranty.',
      coreDeliverables: [
        { name: 'Pre-calibrated Sensor Controller Box', description: 'Sturdy, enclosed hardware module with status LEDs and robust terminal screw blocks.' },
        { name: 'Unit Economics & Payback Sheet', description: 'Financial literacy calculation showing the customer how the unit pays for itself in 60 days.' },
        { name: 'Quick-Start Setup Poster', description: 'Laminated visual diagram enabling anyone to plug in the sensor without technical training.' }
      ],
      howItWorks: 'Sensors detect physical thresholds (soil dryness, ambient heat, motion). Microcontroller logic triggers a safe relay switch to toggle equipment. Feedback is displayed on a small LCD or phone web dashboard.',
      economicValue: 'Component BOM: ₹450 (microcontroller, relay, sensor, box). Sale price: ₹1,200. Gross profit: ₹750 per unit (62.5% margin). Financial literacy applied to cash flow, component inventory, and reinvestment.',
      skillIntegration: 'Electronics provides sensor interfacing, soldering, and circuit safety; Financial Literacy guides component sourcing, break-even analysis, profit margins, and cash collection.'
    },
    firstStepProfile: {
      immediateAction: 'Draft a Bill of Materials (BOM) spreadsheet for a single automated soil-watering or auto-fan relay unit, listing part costs from local electronic markets.',
      roadmap: [
        { phase: 'Phase 1', title: 'Proof of Concept', action: 'Assemble 1 functional relay circuit on a perfboard and test continuous run for 48 hours.', duration: 'Week 1' },
        { phase: 'Phase 2', title: 'Financial Modeling', action: 'Calculate minimum viable batch size (5 units), factoring shipping, wire, and solder costs.', duration: 'Week 2' },
        { phase: 'Phase 3', title: 'Field Testing', action: 'Install 1 pilot unit at a friendly nursery or school greenhouse and log performance for 7 days.', duration: 'Week 3' },
        { phase: 'Phase 4', title: 'Micro-Batch Sale', action: 'Assemble 3 commercial units, package them with setup guides, and close your first 2 paying customers.', duration: 'Week 4' }
      ],
      requiredResources: ['Soldering iron & solder wire', 'ESP32 / Arduino Uno clone', 'Multimeter', 'Google Sheets for cost tracking'],
      validationMilestone: 'Customer paying a 50% advance deposit for a 3-unit batch after viewing your working prototype demonstration.',
      riskMitigation: 'Strictly adhere to low-voltage DC logic or optoisolated commercial relay modules to eliminate high-voltage AC shock hazards.'
    }
  },
  {
    id: 'local_business_digital_design',
    title: 'Local Business Digital Design Service',
    category: 'Service',
    requiredSkills: ['graphic_design', 'communication'],
    preferredSkills: ['photography', 'marketing'],
    applications: ['Posters & Menus', 'Social Media Graphics', 'Branding Material'],
    problems: [
      'Small businesses struggle with professional visual presentation',
      'Lack of time and tools to create consistent marketing materials',
      'Inconsistent visual branding across physical menus and social platforms'
    ],
    targetUsers: ['Local cafes/restaurants', 'Independent retail shops', 'Community organizations'],
    solution: 'Provide a subscription or one-off digital design service creating consistent, professional visual content for neighborhood businesses.',
    nextSkills: ['Marketing', 'Client Management', 'Pricing Strategy'],
    firstStep: 'Identify 3 local businesses with outdated menus or social media, and redesign one asset for them as a free portfolio piece.',
    opportunityType: 'Freelance Service',
    difficulty: 'Beginner',
    problemProfile: {
      overview: 'Local brick-and-mortar stores face heavy competition from national chains. While chains have dedicated creative agencies, neighborhood businesses use blurry smartphone photos and inconsistent fonts, eroding consumer trust.',
      keyChallenges: [
        'Shopkeepers work 12-hour days and have zero time to learn graphic design tools.',
        'High agency minimums ($500/month) prevent local stores from getting regular visual assets.',
        'Poorly formatted print files: pixelated banners and unreadable menus that damage customer experience.'
      ],
      urgency: 'Local retail is increasingly driven by Instagram discoverability and Google Maps ratings where photo quality dictates visits.',
      marketGap: 'High-end design studios reject small jobs like redesigning a tea stall menu or bakery flyer. A proactive student designer can serve this hyper-local market.'
    },
    usersProfile: {
      primaryAudience: 'Neighborhood cafe owners, boutique bakers, and family-owned retail stores.',
      audienceSegments: [
        {
          segment: 'Neighborhood Cafes & Bakeries',
          description: 'Eateries introducing weekly specials and seasonal drinks.',
          painPoint: 'Handwritten chalkboards look messy and fail to showcase ingredient appeal.',
          whyTheyCare: 'Clear, appetizing visual menus increase average order value by 20%.'
        },
        {
          segment: 'Fitness Gyms & Yoga Studios',
          description: 'Community studios needing class timetable posters and membership flyers.',
          painPoint: 'Cluttered photocopied sheets that members throw away.',
          whyTheyCare: 'Clean timetables lead to higher membership signups.'
        },
        {
          segment: 'Local Tutors & Music Academies',
          description: 'Private educators announcing new enrollment batches.',
          painPoint: 'Zero digital graphics to share in neighborhood WhatsApp groups.',
          whyTheyCare: 'Well-designed WhatsApp flyers spread virally among parent groups.'
        }
      ],
      realWorldContext: 'Local high street, neighborhood marketplace, and community WhatsApp groups.',
      outreachStrategy: 'Walk into a cafe during non-peak hours (3 PM to 5 PM). Compliment their food, show a redesigned sample menu on your phone, and offer to print a sample for them.'
    },
    solutionProfile: {
      summary: 'A monthly "Visual Refresh" package for neighborhood shops providing 4 ready-to-share social media promo cards and 1 high-resolution printable poster or menu.',
      coreDeliverables: [
        { name: 'Print-Ready Vector Menu / Flyer', description: 'Clean layout with optical hierarchy, sharp typography, and calibrated margins.' },
        { name: 'Weekly WhatsApp / Instagram Promo Tiles', description: 'Square (1:1) and Story (9:16) format graphics ready for one-tap sharing.' },
        { name: 'Basic Photo Touch-up Pack', description: 'Color-corrected and background-cleaned product photos of their best-selling items.' }
      ],
      howItWorks: 'Photograph their signature products with good natural lighting. Create clean templates in Canva or Figma. Deliver files via Google Drive with clear instructions on printing and posting.',
      economicValue: 'Charge ₹1,500 – ₹3,000 per month per shop. 4 retainers provide steady pocket revenue with 4–6 hours of weekly creative work.',
      skillIntegration: 'Graphic Design ensures visual balance and typography legibility; Communication allows active listening to understand the shopkeepers story and customer demographics.'
    },
    firstStepProfile: {
      immediateAction: 'Redesign the menu of your favorite neighborhood cafe as a self-initiated concept project and export a crisp PDF.',
      roadmap: [
        { phase: 'Phase 1', title: 'Specimen Creation', action: 'Create 2 mock menu templates for a coffee shop and a boutique store.', duration: 'Day 1–2' },
        { phase: 'Phase 2', title: 'Store Visit', action: 'Show the specimen to the cafe manager and offer a free sample design for their upcoming weekend special.', duration: 'Day 3' },
        { phase: 'Phase 3', title: 'First Delivery', action: 'Deliver the graphics within 24 hours to prove reliability and professionalism.', duration: 'Day 4' },
        { phase: 'Phase 4', title: 'Retainer Offer', action: 'Offer a 3-month monthly maintenance package at a discounted early-adopter rate.', duration: 'Week 2' }
      ],
      requiredResources: ['Canva / Figma (free tier)', 'Smartphone camera with clean lens', 'Google Drive folder'],
      validationMilestone: 'The shop owner posting your designed graphic on their official WhatsApp status or displaying your printed poster at the counter.',
      riskMitigation: 'Always collect text content and price lists from the owner in writing to avoid typos on printed materials.'
    }
  },
  {
    id: 'educational_tech_tutor',
    title: 'STEM & Tech Peer Tutor',
    category: 'Community',
    requiredSkills: ['coding', 'teaching'],
    preferredSkills: ['problem_solving', 'communication'],
    applications: ['After-school coding clubs', 'One-on-one tutoring', 'Tech workshops'],
    problems: [
      'Students falling behind in computer science curriculum due to theoretical teaching methods',
      'High anxiety and fear of syntax errors among beginner learners',
      'Commercial coding bootcamps charging predatory fees with zero individual mentorship'
    ],
    targetUsers: ['Middle school students (Grades 6-8)', 'Peers struggling with Python/CS', 'Homeschooling parents'],
    solution: 'Deliver relatable, project-based peer tutoring that breaks abstract coding logic into tangible games and mini-projects.',
    nextSkills: ['Curriculum Design', 'Public Speaking', 'Patience', 'Gamification'],
    firstStep: 'Create a 1-page beginner cheat-sheet on Python variables and loops using a gaming analogy, and test it with a friend.',
    opportunityType: 'Service / Mentorship',
    difficulty: 'Intermediate',
    problemProfile: {
      overview: 'With the National Education Policy (NEP 2020) mandating coding from Grade 6, millions of students are suddenly exposed to programming. However, traditional classrooms often teach coding through rote syntax memorization on paper, turning students away from STEM.',
      keyChallenges: [
        'Classroom teachers cannot provide 1-on-1 debugging attention to 40 students simultaneously.',
        'Students get stuck on single missing semicolons or indentation errors, leading to frustration and quitting.',
        'Online video tutorials lack interactive feedback when a student encounters a unique environment error.'
      ],
      urgency: 'Early negative experiences with programming create lifelong "math/tech aversion". Peer tutoring removes the intimidation factor.',
      marketGap: 'Adult professional tutors charge high hourly rates and use corporate terminology. A student peer understands the exact school syllabus, exam pain points, and adolescent learning psychology.'
    },
    usersProfile: {
      primaryAudience: 'Middle schoolers (Grades 6 to 9) and their parents looking for trustworthy, approachable academic support.',
      audienceSegments: [
        {
          segment: 'Middle School Students',
          description: 'Students encountering Python or block coding for the first time.',
          painPoint: 'Boring textbook exercises that feel unrelated to making real games or apps.',
          whyTheyCare: 'They learn how to build games they can actually play and share with friends.'
        },
        {
          segment: 'Concerned Parents',
          description: 'Parents who want their children to be digitally literate but cannot code themselves.',
          painPoint: 'Expensive corporate EdTech packages ($500+) that lock them into inflexible subscriptions.',
          whyTheyCare: 'Reliable, affordable tutoring with tangible weekly progress updates.'
        }
      ],
      realWorldContext: 'School computer labs, housing society study rooms, and Google Meet weekend sessions.',
      outreachStrategy: 'Host a free 45-minute Saturday workshop titled "Build Your First Flappy Bird Game in 30 Minutes" for 5 younger students in your apartment complex or school.'
    },
    solutionProfile: {
      summary: 'A 4-week micro-course titled "Zero to Game Maker", where students learn fundamental computational concepts (loops, variables, conditionals) by creating interactive mini-games.',
      coreDeliverables: [
        { name: 'Interactive Project Worksheets', description: 'Visual, color-coded code guides with fill-in-the-blank debugging exercises.' },
        { name: 'Playable Portfolio Project', description: 'Every student finishes the module with a hosted game they can show parents.' },
        { name: 'Weekly Parent Progress Notes', description: 'Bullet points explaining the conceptual skills mastered in simple language.' }
      ],
      howItWorks: 'Weekly 1-hour sessions: 15 mins concept breakdown, 30 mins paired coding, 15 mins creative modification and student showcases.',
      economicValue: 'Charge ₹500 – ₹1,000 per student per month for a small batch of 4 students. Generates ₹2,000 – ₹4,000 monthly while sharpening your own technical depth.',
      skillIntegration: 'Coding ensures you understand technical architecture and debugging; Teaching enables you to empathize with confusion and scaffold concepts intuitively.'
    },
    firstStepProfile: {
      immediateAction: 'Draft a 1-page visual guide titled "Learn Variables Like Storage Boxes" and test explaining it to a sibling or classmate.',
      roadmap: [
        { phase: 'Phase 1', title: 'Curriculum Plan', action: 'Write down 4 weekly session themes based on building simple games.', duration: 'Week 1' },
        { phase: 'Phase 2', title: 'Free Trial Class', action: 'Invite 3 peers or younger neighbors for a free 40-minute interactive workshop.', duration: 'Week 2' },
        { phase: 'Phase 3', title: 'Feedback & Iteration', action: 'Collect feedback from the students and their parents to refine pace and worksheets.', duration: 'Week 3' },
        { phase: 'Phase 4', title: 'Paid Batch', action: 'Open enrollment for a paid 4-week cohort capped at 4 students.', duration: 'Week 4' }
      ],
      requiredResources: ['Replit / Scratch / Python IDLE (free)', 'Google Meet or Zoom (free)', 'Google Docs for worksheets'],
      validationMilestone: 'A student independently explaining how a `while` loop works and sharing their completed mini-game link.',
      riskMitigation: 'Keep batch sizes small (max 4 students) so no student gets left behind during live debugging.'
    }
  },
  {
    id: 'automated_greenhouse_prototype',
    title: 'Smart Agriculture Prototyper',
    category: 'Technology',
    requiredSkills: ['electronics', 'agriculture'],
    preferredSkills: ['coding', 'problem_solving'],
    applications: ['Automated Irrigation', 'Soil Moisture Monitoring', 'Urban Farming Tech'],
    problems: [
      'Water waste and plant loss due to manual, erratic watering schedules',
      'Lack of affordable climate monitoring tools for small-scale urban and terrace farmers',
      'High cost and complexity of commercial agricultural automation systems'
    ],
    targetUsers: ['Urban rooftop gardeners', 'School agriculture clubs', 'Local plant nurseries'],
    solution: 'Build low-cost, open-source automated watering and soil monitoring systems using microcontrollers.',
    nextSkills: ['Data Analysis', 'IoT Engineering', 'Business Management'],
    firstStep: 'Build a single Arduino or ESP32 soil moisture sensor circuit and test it on a potted houseplant.',
    opportunityType: 'Product Prototyping',
    difficulty: 'Advanced',
    problemProfile: {
      overview: 'Urban agriculture and terrace gardening are booming across Indian cities. However, terrace plants suffer high mortality rates during summer heatwaves when homeowners travel or forget daily watering routines.',
      keyChallenges: [
        'Overwatering causes root rot; underwatering withers crops during midday heat spikes.',
        'Imported drip irrigation timers lack moisture sensing and waste water during rainy days.',
        'Terrace farmers have no historical logs of soil moisture or temperature trends.'
      ],
      urgency: 'Urban water scarcity makes precision irrigation essential. Automated conservation protects scarce resources and boosts crop yield.',
      marketGap: 'Commercial AgriTech focuses on multi-acre rural farms with high budgets. Compact, affordable kits for 10–50 terrace pots are non-existent.'
    },
    usersProfile: {
      primaryAudience: 'Terrace gardeners, urban organic vegetable growers, and school green clubs.',
      audienceSegments: [
        {
          segment: 'Urban Organic Growers',
          description: 'Families growing vegetables on terraces who travel frequently for work or holidays.',
          painPoint: 'Returning from vacation to find thousands of rupees of organic vegetables dead.',
          whyTheyCare: 'Guarantees plant survival with zero daily intervention.'
        },
        {
          segment: 'School Botany / Green Clubs',
          description: 'Schools with eco-gardens that wither over summer vacations.',
          painPoint: 'No staff available to water school gardens during the 2-month summer break.',
          whyTheyCare: 'Maintains school gardens year-round and serves as an educational STEM exhibit.'
        }
      ],
      realWorldContext: 'Residential housing societies, terrace garden exhibitions, and horticultural societies.',
      outreachStrategy: 'Present a living demo at a local society gardening meetup: a potted tomato plant that automatically triggers a water pump when dry.'
    },
    solutionProfile: {
      summary: 'A plug-and-play capacitive soil moisture controller attached to a 12V mini-pump that irrigates plants only when soil dryness drops below a customizable threshold.',
      coreDeliverables: [
        { name: 'Autonomous Smart Irrigation Box', description: 'Weatherproof controller box with capacitive moisture probe and 12V submersible pump.' },
        { name: 'Water Conservation Guide', description: 'Calculations showing 40% reduction in water usage compared to flood watering.' },
        { name: 'Expansion Tubing Kit', description: 'Drip emitters and manifold to water up to 8 pots simultaneously.' }
      ],
      howItWorks: 'The capacitive probe measures soil dielectric permittivity. When dry, microcontroller triggers the relay for 15 seconds, pauses to allow absorption, and verifies moisture before stopping.',
      economicValue: 'Kit manufacturing cost: ₹650. Sale price: ₹1,500. Profit: ₹850 per unit. Opportunity for recurring maintenance and expansion tubing sales.',
      skillIntegration: 'Electronics handles the microcontroller logic, sensors, and safe pump switching; Agriculture ensures knowledge of plant root depth, soil field capacity, and watering schedules.'
    },
    firstStepProfile: {
      immediateAction: 'Connect an analog soil moisture sensor to an Arduino/ESP32 on a breadboard and print moisture values to the serial monitor.',
      roadmap: [
        { phase: 'Phase 1', title: 'Bench Prototype', action: 'Verify moisture sensor readings between completely dry soil and saturated soil.', duration: 'Days 1–3' },
        { phase: 'Phase 2', title: 'Pump Control', action: 'Integrate a relay and 5V/12V mini-pump to auto-pump water from a bucket into the pot.', duration: 'Days 4–7' },
        { phase: 'Phase 3', title: '1-Week Stress Test', action: 'Run the system unattended on a home plant for 7 consecutive days and calibrate trigger points.', duration: 'Week 2' },
        { phase: 'Phase 4', title: 'Field Showcase', action: 'Demonstrate the setup to a neighbor with terrace plants and secure your first prototype order.', duration: 'Week 3' }
      ],
      requiredResources: ['Arduino / ESP32', 'Capacitive soil moisture sensor', '5V relay module', '5V USB mini water pump and silicon tubing'],
      validationMilestone: 'The system keeping a sensitive herb or tomato plant healthy for 14 continuous days with zero manual watering.',
      riskMitigation: 'Use capacitive sensors instead of cheap resistive forks to prevent probe corrosion in wet soil.'
    }
  },
  {
    id: 'community_event_organizer',
    title: 'Community Tech & Skill Expo Organizer',
    category: 'Entrepreneurship',
    requiredSkills: ['leadership', 'communication'],
    preferredSkills: ['marketing', 'financial_literacy'],
    applications: ['Student Hackathons', 'Skill-Sharing Workshops', 'Local Maker Meetups'],
    problems: [
      'Students work on brilliant technical projects in isolation with nowhere to present them',
      'Local schools lack inter-school peer collaboration networks',
      'Young innovators lack opportunities to practice pitching ideas to community judges and mentors'
    ],
    targetUsers: ['High school student innovators', 'Parent-teacher associations', 'Local educational sponsors'],
    solution: 'Plan, finance, and execute high-energy community showcase events and hackathons that connect student talent with mentors and local sponsors.',
    nextSkills: ['Event Logistics', 'Sponsorship Pitching', 'Public Relations', 'Budget Management'],
    firstStep: 'Draft a 1-page event prospectus for a 3-hour weekend "Student Project Showcase" including a simple sponsor proposal.',
    opportunityType: 'Community Enterprise',
    difficulty: 'Intermediate',
    problemProfile: {
      overview: 'Curiosity and innovation thrive on recognition. While large metropolitan centers host well-funded hackathons, tier-2 cities and suburban neighborhoods have almost zero grassroots platforms for school students to exhibit inventions.',
      keyChallenges: [
        'Organizers struggle to secure venue permissions and community sponsor support.',
        'Events often collapse due to poor timeline management and uncommunicated schedules.',
        'High entry fees in commercial competitions exclude deserving grassroots student creators.'
      ],
      urgency: 'Student creators need real-world validation to sustain their entrepreneurial drive beyond standard classroom tests.',
      marketGap: 'Commercial conference organizers charge lakhs and cater strictly to university graduates or funded startups. Grassroots student expos can be run on modest budgets with immense community impact.'
    },
    usersProfile: {
      primaryAudience: 'Student builders, STEM educators, and local community business sponsors.',
      audienceSegments: [
        {
          segment: 'Student Innovators',
          description: 'Students who build hardware, write code, or craft designs but have no stage to share them.',
          painPoint: 'Feelings of isolation and lack of recognition from peers.',
          whyTheyCare: 'Provides a safe, celebratory stage to win certificates, gain feedback, and meet collaborators.'
        },
        {
          segment: 'Local Sponsors (Stationery, Bakeries, Tech Shops)',
          description: 'Local businesses looking for positive community goodwill and foot-traffic.',
          painPoint: 'Spending money on unmeasurable paper flyers with zero community engagement.',
          whyTheyCare: 'Direct visibility and brand association with student youth innovation.'
        }
      ],
      realWorldContext: 'School auditoriums, community clubhouses, public libraries, and residential society common halls.',
      outreachStrategy: 'Pitch your school principal or housing society committee for free weekend hall access, promising an educational exhibition that honors student talent.'
    },
    solutionProfile: {
      summary: 'An end-to-end event execution playbook: concept curation, participant registration, schedule management, judge rubric creation, and local sponsorship acquisition.',
      coreDeliverables: [
        { name: 'Event Pitch Deck & Sponsorship Tiers', description: 'Transparent proposal detailing attendee reach, banner placement, and prize sponsorship.' },
        { name: 'Participant Registration & Evaluation Rubric', description: 'Structured Google Form and objective evaluation criteria for fair judging.' },
        { name: 'Press & Social Media Summary Pack', description: 'High-res photos and press release for local newspapers and school newsletters.' }
      ],
      howItWorks: 'Step 1: Secure free venue. Step 2: Pitch 3 local sponsors for ₹2,000 each to cover snacks and certificates. Step 3: Open registrations for 15 student teams. Step 4: Host a vibrant 3-hour demo day.',
      economicValue: 'Sponsorship revenue ₹6,000 – ₹10,000. Expenses: ₹4,000 (prizes, printing, snacks). Surplus: ₹2,000 – ₹6,000 plus massive community leadership authority.',
      skillIntegration: 'Leadership orchestrates team roles, schedules, and venue coordination; Communication secures sponsorships, keeps participants energized, and hosts the live stage.'
    },
    firstStepProfile: {
      immediateAction: 'Draft a 1-page proposal for a "Mini Science & Tech Showcase" outlining date, 3 categories, and venue requirements.',
      roadmap: [
        { phase: 'Phase 1', title: 'Concept Deck', action: 'Define event theme, rules, and rubric in a clean 2-page document.', duration: 'Days 1–3' },
        { phase: 'Phase 2', title: 'Venue & Permission', action: 'Secure permission from school administration or society board for Saturday morning.', duration: 'Days 4–7' },
        { phase: 'Phase 3', title: 'Sponsor & Registrations', action: 'Approach a local bookstore for gift-voucher prizes; circulate signup form.', duration: 'Week 2' },
        { phase: 'Phase 4', title: 'Event Execution', action: 'Run the event, take photos, distribute certificates, and send thank-you notes to sponsors.', duration: 'Week 3' }
      ],
      requiredResources: ['Google Forms & Sheets', 'Canva for certificate and banner design', 'School or community hall', 'Volunteer team of 3 peers'],
      validationMilestone: '10 teams registered and 1 local sponsor committing prize vouchers or refreshments in writing.',
      riskMitigation: 'Have a backup presentation laptop and pre-printed master schedules in case Wi-Fi or project displays stutter.'
    }
  },
  {
    id: 'financial_literacy_content',
    title: 'Youth Financial Literacy Creator & Coach',
    category: 'Product',
    requiredSkills: ['financial_literacy', 'writing'],
    preferredSkills: ['video_editing', 'graphic_design'],
    applications: ['Personal Finance Guides', 'Youth Budgeting Newsletters', 'Bite-Sized Financial Comics'],
    problems: [
      'Widespread financial illiteracy among teenagers and young adults leading to early debt traps',
      'Finance education is filled with dry, impenetrable Wall Street jargon',
      'Young people lack actionable habits for budgeting allowances, tracking expenses, and understanding compound growth'
    ],
    targetUsers: ['High school students', 'College freshmen', 'Young first-time earners'],
    solution: 'Produce highly engaging, jargon-free guides, expense trackers, and newsletters that transform money management into an empowering habit.',
    nextSkills: ['SEO & Audience Growth', 'Digital Product Packaging', 'Copywriting', 'Interactive Spreadsheet Design'],
    firstStep: 'Design a clean "Student Allowance & Savings Tracker" spreadsheet and write a 500-word explanatory guide on the 50/30/20 rule.',
    opportunityType: 'Digital Product / Content',
    difficulty: 'Beginner',
    problemProfile: {
      overview: 'Schools teach calculus and trigonometry but rarely teach how to calculate simple vs compound interest, how credit cards trap users, or how to budget a monthly allowance. This creates young adults who make costly financial errors within their first year of independence.',
      keyChallenges: [
        'Finance textbooks are filled with formal banking jargon that alienates teenage readers.',
        'Online finance influencers often push speculative crypto schemes rather than sound fundamentals.',
        'Students feel embarrassed asking basic questions about how bank accounts, UPI limits, or tax brackets function.'
      ],
      urgency: 'Establishing healthy financial habits before age 18 prevents predatory debt cycles and builds long-term wealth compounding.',
      marketGap: 'Most finance newsletters target adult investors with stock market portfolios. Clean, friendly guides tailored to pocket money, student discounts, and first freelance earnings are rare.'
    },
    usersProfile: {
      primaryAudience: 'High school and college students seeking clear, non-judgmental guidance on managing money.',
      audienceSegments: [
        {
          segment: 'Teenagers with Allowances',
          description: 'Students who run out of pocket money halfway through the month.',
          painPoint: 'No visibility into where their money went and constant financial friction with parents.',
          whyTheyCare: 'Learn how to save for gadgets or trips without depriving themselves of weekend fun.'
        },
        {
          segment: 'Early Freelancers & Interns',
          description: 'Peers receiving their first stipends or freelance payments.',
          painPoint: 'Confusion on invoicing, bank deposits, and how much to save vs spend.',
          whyTheyCare: 'Empowers them to manage their hard-earned money like young professionals.'
        }
      ],
      realWorldContext: 'School noticeboards, student Substack/Medium blogs, Instagram carousels, and WhatsApp youth groups.',
      outreachStrategy: 'Share your free Student Budgeting Google Sheet template in school study groups; ask classmates what money topic confuses them most.'
    },
    solutionProfile: {
      summary: 'A curated weekly digital dispatch and downloadable mini-toolkit called "Pocket Smarts", breaking down 1 real-world financial concept per week with relatable analogies and downloadable tools.',
      coreDeliverables: [
        { name: 'The Student Budgeting Spreadsheet (Google Sheets)', description: 'Pre-formatted expense tracker with visual pie charts and auto-calculating savings goals.' },
        { name: 'Pocket Money Guidebook (PDF)', description: 'Illustrated 10-page guide covering budgeting, compound interest, and digital payment safety.' },
        { name: 'Weekly 3-Minute Digest', description: 'Short email explaining concepts like inflation, opportunity cost, and emergency funds.' }
      ],
      howItWorks: 'Distribute the spreadsheet for free to build trust. Offer a premium 30-page workbook or a live 1-hour workshop on "How to Manage Your First ₹10,000" for a modest fee.',
      economicValue: 'Digital products have 99% profit margins with ₹0 manufacturing cost. 50 downloads at ₹99 generates ₹4,950 passive educational income.',
      skillIntegration: 'Financial Literacy supplies the principles of budgeting, risk management, and compound value; Writing translates complex economic equations into clear, engaging prose.'
    },
    firstStepProfile: {
      immediateAction: 'Create a Google Sheet with 3 tabs (Income, Expenses, Savings Goal) and write a 1-page guide on how to use it.',
      roadmap: [
        { phase: 'Phase 1', title: 'Tool Creation', action: 'Build and formula-test your student expense tracking spreadsheet.', duration: 'Days 1–2' },
        { phase: 'Phase 2', title: 'Peer Review', action: 'Give the sheet to 3 friends and observe where they get confused when entering data.', duration: 'Days 3–4' },
        { phase: 'Phase 3', title: 'Public Sharing', action: 'Write a blog post or social carousel titled "How I Saved 40% of My Pocket Money This Term".', duration: 'Week 2' },
        { phase: 'Phase 4', title: 'Mini Masterclass', action: 'Offer a 30-minute peer workshop during lunch or after school on financial basics.', duration: 'Week 3' }
      ],
      requiredResources: ['Google Sheets (free)', 'Substack / Medium for publishing (free)', 'Canva for header graphics (free)'],
      validationMilestone: '15 students actively making a copy of your budget spreadsheet and using it for 2 consecutive weeks.',
      riskMitigation: 'Clearly include a disclaimer that you are sharing educational literacy concepts, not licensed financial investment advice.'
    }
  },
  {
    id: 'product_photography_service',
    title: 'Product Photography Service',
    category: 'Service',
    requiredSkills: ['photography', 'photo_editing', 'communication'],
    preferredSkills: ['marketing', 'pricing', 'client_handling'],
    applications: ['Local Bakery & Craft Catalogs', 'E-commerce Marketplace Photos', 'Social Media Product Spotlights', 'Packaging Imagery'],
    problems: [
      'Local artisan vendors and small shops have delicious or beautiful products but take blurry smartphone photos',
      'High e-commerce studio photography minimums (₹5,000+ per session) price out micro-entrepreneurs',
      'Inconsistent lighting and distracting backgrounds degrade customer trust on digital catalogs'
    ],
    targetUsers: ['Independent home bakers', 'Handcrafted jewelry makers', 'Neighborhood retail shops', 'Student-led product teams'],
    solution: 'Provide a localized, accessible product photography service capturing sharp, clean, color-calibrated product shots with tailored digital delivery.',
    nextSkills: ['Marketing', 'Client Handling', 'Pricing & Margin Analysis', 'Studio Lighting'],
    firstStep: 'Create a 5-photo specimen portfolio featuring everyday household objects or a local shop product using natural window lighting and white poster-board backdrop.',
    opportunityType: 'Freelance Service',
    difficulty: 'Intermediate',
    problemProfile: {
      overview: 'Local artisan businesses and neighborhood retail stores in India are rapidly joining digital marketplaces like ONDC, Instagram, and WhatsApp Business. However, over 80% struggle with low sales because their product photographs look blurry, unappetizing, or poorly lit.',
      keyChallenges: [
        'Lack of dedicated lighting equipment and backdrop staging among small sellers.',
        'High agency minimums ($150–$300) that micro-bakers or craftspeople cannot justify.',
        'Unclear project scoping leading to endless free photo re-shoots.'
      ],
      urgency: 'Online purchase decisions are 90% visual. Clear, clean product photography directly increases customer conversion and order value.',
      marketGap: 'Commercial advertising studios target large consumer brands. A student photographer equipped with a smartphone or entry DSLR, lightbox, and basic retouching tools can profitably serve neighborhood vendors.'
    },
    usersProfile: {
      primaryAudience: 'Local independent bakers, handmade soap and craft artisans, and neighborhood boutique retailers.',
      audienceSegments: [
        {
          segment: 'Home Bakers & Confectioners',
          description: 'Passionate bakers producing custom cakes and pastries who need appetizing social media showcase photos.',
          painPoint: 'Cakes photographed under yellow kitchen lights looking unappealing on Instagram.',
          whyTheyCare: 'Mouth-watering photos increase weekend order inquiries by 50%.'
        },
        {
          segment: 'Handmade Craft & Jewelry Sellers',
          description: 'Artisans selling handcrafted earrings, pottery, and textiles.',
          painPoint: 'Macro details and textures are lost in low-resolution mobile snaps.',
          whyTheyCare: 'Accurate color and texture representation eliminates customer return disputes.'
        },
        {
          segment: 'Local Retail Merchants',
          description: 'Specialty grocery or spice shop owners creating digital WhatsApp catalogs.',
          painPoint: 'Packaging photos have harsh glare from overhead tube lights.',
          whyTheyCare: 'Provides a polished digital catalog that competes with major delivery apps.'
        }
      ],
      realWorldContext: 'Neighborhood shopping lanes, school maker fairs, local farmer markets, and community WhatsApp groups.',
      outreachStrategy: 'Visit a local home baker or retail shop with a sample 5-photo lookbook on your phone. Offer to shoot their top 3 bestsellers for free in exchange for a review and permission to use them in your portfolio.'
    },
    solutionProfile: {
      summary: 'A structured 5-shot or 10-shot product photography package: includes natural/softbox lighting setup, background cleanup, color grading, and delivery in both high-res and mobile-ready square formats.',
      coreDeliverables: [
        { name: '5 High-Resolution Product Hero Shots', description: 'Clean white/lifestyle background shots highlighting texture and branding.' },
        { name: '10 Social Media Ready Crops (1:1 and 9:16)', description: 'Optimized crops for Instagram feed, WhatsApp catalog, and stories.' },
        { name: 'Basic Usage & Lighting Spec Sheet', description: 'Guide on how the client can take matching supplementary photos on their own phone.' }
      ],
      howItWorks: 'Step 1: 15-minute briefing on product dimensions and client branding. Step 2: 1-hour shoot session using natural light and reflector boards. Step 3: Color calibration in Lightroom or Snapseed. Step 4: Secure Google Drive delivery.',
      economicValue: 'Package price ₹500 – ₹1,500 per 5-product session. Material cost is near ₹0. A student doing 4 sessions a month earns ₹2,000 – ₹6,000 while building commercial creative evidence.',
      skillIntegration: 'Photography captures composition, focus, and lighting; Photo Editing delivers clean white backgrounds and punchy colors; Communication establishes rapport and decodes what the merchant truly wants.'
    },
    firstStepProfile: {
      immediateAction: 'Set up a clean photo station near a daylight window with 2 sheets of white cardstock, and photograph 3 contrasting household items (e.g. coffee mug, watch, pastry).',
      roadmap: [
        { phase: 'Stage 1 — Foundation', title: 'Lighting & Composition Study', action: 'Learn the rule of thirds, soft directional window light, and reflector card techniques.', duration: 'Days 1–2' },
        { phase: 'Stage 2 — Practice', title: '5-Object Trial Shoot', action: 'Photograph 5 diverse objects (matte, reflective, textured) and retouch them.', duration: 'Days 3–4' },
        { phase: 'Stage 3 — Portfolio', title: 'Curate Specimen Portfolio', action: 'Assemble your 5 best shots into a clean PDF or digital folder lookbook.', duration: 'Days 5–6' },
        { phase: 'Stage 4 — Communication', title: 'Client Pitch & Dialogue', action: 'Draft a friendly 3-sentence outreach message and practice pitching to a family friend or peer.', duration: 'Day 7' },
        { phase: 'Stage 5 — Test', title: 'Pilot Local Shoot', action: 'Conduct a pro-bono test shoot for a neighborhood baker or school club event.', duration: 'Week 2' },
        { phase: 'Stage 6 — Reflect', title: 'Process Review & Pricing', action: 'Log turnaround time, client satisfaction, and calibrate your pricing per session.', duration: 'Week 2–3' }
      ],
      requiredResources: ['Smartphone camera or entry DSLR', '2 sheets of white/black poster board for backdrops', 'Free Snapseed / Lightroom Mobile app', 'Google Drive for client delivery'],
      validationMilestone: 'The first client posting your photo on their business status or online storefront.',
      riskMitigation: 'Always clarify before the shoot how many items will be photographed to prevent clients bringing 30 items for a 5-item package.'
    }
  }
];

export function calculateMatch(userSkills: UserSkill[], opp: Opportunity, allSkillsDB: Skill[]): MatchResult {
  const userSkillIds = userSkills.map(us => us.skillId);
  
  const matchedRequired = opp.requiredSkills.filter(id => userSkillIds.includes(id));
  const missingRequired = opp.requiredSkills.filter(id => !userSkillIds.includes(id));
  
  const matchedPreferred = opp.preferredSkills.filter(id => userSkillIds.includes(id));
  const missingPreferred = opp.preferredSkills.filter(id => !userSkillIds.includes(id));
  
  let score = 0;
  
  // Base score from required skills
  const requiredWeight = 70;
  const preferredWeight = 30;
  
  const requiredScore = opp.requiredSkills.length > 0 
    ? (matchedRequired.length / opp.requiredSkills.length) * requiredWeight 
    : requiredWeight;
    
  const preferredScore = opp.preferredSkills.length > 0
    ? (matchedPreferred.length / opp.preferredSkills.length) * preferredWeight
    : preferredWeight;
    
  score = requiredScore + preferredScore;
  
  // Proficiency Boost (Add up to 15 bonus points for high proficiency in matched required skills)
  let proficiencyBonus = 0;
  const weightMap: Record<string, number> = { 'Advanced': 1.0, 'Strong': 0.8, 'Intermediate': 0.5, 'Developing': 0.2, 'Beginner': 0 };
  
  matchedRequired.forEach(skillId => {
    const us = userSkills.find(s => s.skillId === skillId);
    if (us) {
      proficiencyBonus += weightMap[us.proficiency] * (15 / opp.requiredSkills.length);
    }
  });
  
  score = Math.min(100, Math.round(score + proficiencyBonus));
  
  let label: 'Strong Match' | 'Good Match' | 'Developing Match' = 'Developing Match';
  if (score >= 80) label = 'Strong Match';
  else if (score >= 50) label = 'Good Match';
  
  const reqNames = matchedRequired.map(id => allSkillsDB.find(s => s.id === id)?.name || id);
  const prefNames = matchedPreferred.map(id => allSkillsDB.find(s => s.id === id)?.name || id);
  const missingReqNames = missingRequired.map(id => allSkillsDB.find(s => s.id === id)?.name || id);
  
  let explanation = '';
  if (matchedRequired.length === 0) {
    explanation = `This opportunity requires foundational skills like ${missingReqNames.join(' and ')} that you are currently developing.`;
  } else if (missingRequired.length > 0) {
    explanation = `You have a great start with ${reqNames.join(', ')}. To fully unlock this pathway, focus on developing ${missingReqNames.join(', ')}.`;
  } else {
    explanation = `Excellent match! You possess the core requirements (${reqNames.join(', ')}). `;
    if (matchedPreferred.length > 0) {
      explanation += `Your additional skills in ${prefNames.join(', ')} give you a unique competitive advantage.`;
    }
  }

  return {
    score,
    label,
    matchedRequired,
    matchedPreferred,
    missingRequired,
    missingPreferred,
    explanation
  };
}

export const OPPORTUNITIES = OPPORTUNITIES_DB;

