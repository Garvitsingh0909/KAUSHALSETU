/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * KAUSHAL SETU — COMPREHENSIVE OPPORTUNITIES, ROADMAPS & FINANCIAL TEMPLATES (PHASE 6)
 */

import { Opportunity } from './opportunities';
import { RoadmapTemplate, ProjectTemplate, FinancialAssumptionTemplate } from './knowledgeBaseTypes';

export const COMPREHENSIVE_OPPORTUNITIES_DB: Opportunity[] = [
  {
    id: 'product_photography_service',
    title: 'Product Photography & Digital Catalog Service',
    category: 'Service',
    requiredSkills: ['photography', 'photo_editing'],
    preferredSkills: ['marketing', 'client_handling', 'pricing'],
    applications: ['E-Commerce Clean White Cataloging', 'Social Media Product Lookbooks', 'Local Artisan Packaging Showcases', 'Restaurant Food Menus'],
    problems: [
      'Local handmade artisans and home bakers have delicious/quality goods but take blurry, dim smartphone photos that repel online customers.',
      'Small sellers cannot afford professional ₹15,000+ studio agency rates for simple 5-item catalogs.',
      'Inconsistent image backgrounds make digital shopfronts look disorganized and unverified.'
    ],
    targetUsers: ['Handmade artisan jewelers', 'Neighborhood home bakers & cloud kitchens', 'Local boutique apparel shops', 'E-commerce marketplace sellers'],
    solution: 'Provide a structured, affordable 5-item product photoshoot with clean white-backdrop editing, natural window lighting, and ready-to-upload web formats.',
    nextSkills: ['pricing', 'client_handling', 'marketing', 'financial_literacy'],
    firstStep: 'Pick 3 contrasting household objects (mug, plant, watch), photograph them by a window using a white card reflector, and edit to pure white backgrounds.',
    opportunityType: 'Freelance Micro-Service',
    difficulty: 'Beginner',
    problemProfile: {
      overview: 'Over 70% of online purchase decisions are guided directly by photo sharpness and color realism. Small suburban merchants lose thousands in revenue due to poor smartphone photography.',
      keyChallenges: [
        'Dark shadows and distorted perspectives in amateur phone shots.',
        'High cost of commercial studio gear discouraging young creators.',
        'Difficulty in organizing batch files with proper naming and sizing.'
      ],
      urgency: 'Online shopping on local WhatsApp catalogs and Instagram storefronts has grown exponentially.',
      marketGap: 'High-end commercial photo agencies charge excessive minimums, leaving a massive underserved market for student creators offering clean, fast ₹500–₹1,500 packages.'
    },
    usersProfile: {
      primaryAudience: 'Local micro-enterprises and home entrepreneurs seeking attractive digital visuals.',
      audienceSegments: [
        {
          segment: 'Home Bakers & Confectioners',
          description: 'Passionate dessert makers selling custom cakes on Instagram.',
          painPoint: 'Cakes melt or look unappetizing under yellow kitchen bulb lights.',
          whyTheyCare: 'Clean mouth-watering photos drive direct holiday orders.'
        },
        {
          segment: 'Handicraft Artisans & Potters',
          description: 'Traditional makers crafting pottery, candles, or fabric goods.',
          painPoint: 'Hard to show fine texture, glaze, and craftsmanship on screen.',
          whyTheyCare: 'High-resolution detail shots justify premium price points.'
        }
      ],
      realWorldContext: 'Every neighborhood market has at least 15–20 small merchants currently building WhatsApp catalogs or Instagram shops.',
      outreachStrategy: 'Offer a 1-item free sample photo to a local baker to showcase the dramatic before-and-after difference.'
    },
    solutionProfile: {
      summary: 'Turnkey mobile photography service delivering 5 edited product shots + 2 Instagram promotional story graphics within 48 hours.',
      coreDeliverables: [
        { name: '5 High-Res Product Photos', description: 'Color-calibrated with transparent or pure white backdrops.' },
        { name: '2 Social Media Story Tiles', description: 'Ready-to-post graphics with price and ordering details.' },
        { name: '1-Page Photo Care Guide', description: 'Tips for merchant on storing and uploading high-res images.' }
      ],
      howItWorks: 'Student visits merchant or receives items $\rightarrow$ shoots in controlled natural light $\rightarrow$ edits in free software $\rightarrow$ delivers via cloud link.',
      economicValue: 'Merchant gains professional credibility and up to 30% higher order conversion.',
      skillIntegration: 'Combines camera control (Photography), color grading (Photo Editing), and customer discovery (Communication/Client Handling).'
    },
    firstStepProfile: {
      immediateAction: 'Assemble a 5-photo specimen lookbook using everyday items to demonstrate lighting and retouching quality.',
      roadmap: [
        { phase: 'Stage 1 — Foundation', title: 'Lighting & White Balance Mastery', action: 'Practise tabletop natural window lighting with homemade foam board reflectors.', duration: '2 Days' },
        { phase: 'Stage 2 — Practice', title: 'Batch Retouching & Cleanup', action: 'Process 10 sample photos in a free photo editor to achieve consistent contrast.', duration: '3 Days' },
        { phase: 'Stage 3 — Portfolio', title: 'Specimen Lookbook Assembly', action: 'Create a 1-page PDF or online album showcasing 3 before-and-after comparisons.', duration: '2 Days' },
        { phase: 'Stage 4 — Communication', title: 'Neighborhood Merchant Outreach', action: 'Present lookbook to a local home baker and agree on a sample shoot.', duration: '3 Days' },
        { phase: 'Stage 5 — Test', title: 'Execute First Paid Pilot', action: 'Deliver 5 finished photos for ₹500 and collect written client feedback.', duration: '3 Days' },
        { phase: 'Stage 6 — Reflect', title: 'Unit Economics & Pricing Iteration', action: 'Calculate time spent vs income to refine hourly rates and packages.', duration: '1 Day' }
      ],
      requiredResources: ['Smartphone with decent camera or entry DSLR', 'White foam core boards (₹80)', 'Free photo editor (Snapseed/Canva/Lightroom Mobile)', 'USB transfer cable'],
      validationMilestone: 'Receive 1 paid order or verified testimonial from a local merchant praising image quality.',
      riskMitigation: 'Always clarify deliverable quantities and revisions in advance to prevent unpaid scope creep.'
    }
  },
  {
    id: 'coding_and_design_experience_studio',
    title: 'Digital UI/UX & Web Experience Studio',
    category: 'Technology',
    requiredSkills: ['coding', 'graphic_design'],
    preferredSkills: ['ui_ux_design', 'communication', 'marketing', 'pricing'],
    applications: ['Interactive Web Portals', 'Mobile App Prototypes', 'E-commerce Storefronts', 'Custom Club Dashboards'],
    problems: [
      'Small businesses have clunky, outdated websites that fail on mobile phones.',
      'Developers struggle with visual aesthetics, while graphic designers struggle with code.',
      'High bounce rates due to poor visual hierarchy and slow-loading web pages.'
    ],
    targetUsers: ['Local boutiques & specialty shops', 'EdTech creators & tutors', 'Student-led startups & school clubs', 'Community non-profits'],
    solution: 'Bridge graphic design aesthetics with clean modern web code to create responsive, fast-loading digital web experiences.',
    nextSkills: ['project_management', 'pricing', 'client_handling', 'data_analysis'],
    firstStep: 'Identify a local club or shop with an unreadable mobile website and build a high-fidelity 1-page responsive redesign in code.',
    opportunityType: 'Digital Agency / Freelance',
    difficulty: 'Intermediate'
  },
  {
    id: 'smart_agritech_iot',
    title: 'Smart AgriTech & Environmental IoT Solutions',
    category: 'Technology',
    requiredSkills: ['electronics', 'agriculture'],
    preferredSkills: ['iot_systems', 'coding', 'problem_solving', 'pricing'],
    applications: ['Automated Drip Irrigation Systems', 'Soil Moisture & Nutrient Telemetry', 'Suburban Greenhouse Climate Monitors', 'School Compost Temperature Alerts'],
    problems: [
      'Urban gardeners and small farms waste thousands of liters of water through manual over-irrigation.',
      'Commercial agricultural telemetry systems cost upwards of ₹25,000, pricing out schools and hobby farmers.',
      'Plants wither during hot vacation periods when nobody is available to water school gardens.'
    ],
    targetUsers: ['Suburban rooftop gardeners', 'School biology labs & garden clubs', 'Local organic polyhouse farmers', 'Apartment community green clubs'],
    solution: 'Deploy affordable microcontroller sensors (ESP32/Arduino) with automated solenoid valves to water crops precisely when soil moisture drops below threshold.',
    nextSkills: ['3d_modeling', 'financial_literacy', 'marketing', 'sales'],
    firstStep: 'Assemble a single-pot soil moisture sensor connected to an LED indicator and relay-driven mini 5V water pump on a breadboard.',
    opportunityType: 'Hardware Micro-Enterprise',
    difficulty: 'Intermediate'
  },
  {
    id: 'healthy_tiffin_culinary',
    title: 'Nutritious Student Tiffin & Meal Prep Venture',
    category: 'Product',
    requiredSkills: ['cooking', 'financial_literacy'],
    preferredSkills: ['food_processing', 'pricing', 'marketing', 'tailoring'],
    applications: ['Subscription Healthy Student Lunchboxes', 'Nutritious Energy Snack Packs', 'Low-Calorie Study Session Treats', 'Millets-Based Breakfast Kits'],
    problems: [
      'School canteens serve deep-fried, preservative-heavy junk food causing mid-day lethargy.',
      'Working parents lack time in morning rush to prepare wholesome, balanced lunches.',
      'Home food businesses fail financially due to hidden grocery spoilage and poor ingredient costing.'
    ],
    targetUsers: ['Busy working parents', 'Health-conscious high school students', 'Teachers wanting clean meals', 'School athletic teams'],
    solution: 'Cook balanced, delicious seasonal meal boxes with transparent nutritional facts and precise recipe cost accounting to ensure healthy margins.',
    nextSkills: ['food_processing', 'marketing', 'leadership', 'client_handling'],
    firstStep: 'Formulate a 3-item healthy snack recipe (e.g. roasted millet energy bites), calculate exact batch ingredient costs, and conduct a 5-person taste test.',
    opportunityType: 'Culinary Micro-Enterprise',
    difficulty: 'Beginner'
  },
  {
    id: 'peer_tutoring_network',
    title: 'Peer-to-Peer Academic & Skill Tutoring Network',
    category: 'Service',
    requiredSkills: ['teaching', 'communication'],
    preferredSkills: ['public_speaking', 'leadership', 'problem_solving', 'pricing'],
    applications: ['After-School Homework Help Circles', 'Practical STEM Skill Mini-Bootcamps', 'Exam Preparation Study Sprints', 'Foundation Math & Science Coaching'],
    problems: [
      'Commercial coaching centers charge exorbitant fees and move too fast for struggling students.',
      'Students feel shy asking questions to adult school teachers.',
      'High-performing senior students lack structured platforms to monetize their academic strengths.'
    ],
    targetUsers: ['Junior school students (Grades 6–9)', 'Anxious parents seeking patient guidance', 'Classroom teachers needing remedial support for peers'],
    solution: 'Establish a structured 1-on-1 and small-group peer mentoring hub using bite-sized conceptual diagrams and interactive practice drills.',
    nextSkills: ['pricing', 'marketing', 'project_management', 'writing'],
    firstStep: 'Draft a 1-page visual study worksheet on a notoriously tricky topic (like Quadratic Equations or Optics) and tutor 1 classmate successfully.',
    opportunityType: 'Community Service Venture',
    difficulty: 'Beginner'
  },
  {
    id: 'sustainable_craft_studio',
    title: 'Upcycled Sustainable Craft & Apparel Studio',
    category: 'Product',
    requiredSkills: ['tailoring', 'graphic_design'],
    preferredSkills: ['woodworking', 'marketing', 'photography', 'pricing'],
    applications: ['Upcycled Denim School Bags & Organizers', 'Screen-Printed Reusable Canvas Totes', 'Wooden Desk Storage from Pallets', 'Eco-Friendly Event Lanyards & Badges'],
    problems: [
      'Textile and wood waste overflowing in city landfills.',
      'Plastic conference merchandise thrown away after a single day.',
      'Lack of stylish, durable upcycled accessories tailored for young students.'
    ],
    targetUsers: ['Eco-conscious youth & students', 'School festival event organizers', 'Local boutique gift shops', 'Green NGO campaigns'],
    solution: 'Transform discarded jeans, fabric scraps, and pallet wood into stylish, durable everyday utility items with custom screen-printed graphics.',
    nextSkills: ['photography', 'pricing', 'financial_literacy', 'sales'],
    firstStep: 'Source 2 discarded pairs of denim jeans, cut patterns, and sew a sturdy multi-pocket laptop sleeve or tote bag with reinforced seams.',
    opportunityType: 'Product Artisan Studio',
    difficulty: 'Intermediate'
  },
  {
    id: 'freelance_content_creation',
    title: 'Social Media Content & Video Marketing Agency',
    category: 'Service',
    requiredSkills: ['video_editing', 'marketing'],
    preferredSkills: ['content_creation', 'graphic_design', 'communication', 'pricing'],
    applications: ['Instagram Reels for Local Shops', 'Short-Form Video Advertisements', 'Educational Video Summaries', 'Event Showcase Montages'],
    problems: [
      'Local neighborhood businesses have no time to record and edit social media videos.',
      'Traditional media agencies demand ₹30,000/month retainers out of reach for family businesses.',
      'Boring static photo posts receive low engagement on social algorithms.'
    ],
    targetUsers: ['Neighborhood gyms & yoga studios', 'Independent bookshops and cafes', 'Local vocational tutors', 'School event committees'],
    solution: 'Offer a monthly 4-video package including shooting, editing, trending music synchronization, and caption writing tailored for local footfall.',
    nextSkills: ['public_speaking', 'client_handling', 'pricing', 'leadership'],
    firstStep: 'Record and edit a 45-second high-energy promotional video for a local cafe or school sports club using free mobile editing tools.',
    opportunityType: 'Creative Media Agency',
    difficulty: 'Intermediate'
  },
  {
    id: 'electronics_repair_bench',
    title: 'Community Device Diagnostic & Repair Bench',
    category: 'Service',
    requiredSkills: ['electronics', 'repair'],
    preferredSkills: ['electrical_work', 'problem_solving', 'client_handling', 'pricing'],
    applications: ['Smartphone Screen & Battery Swaps', 'Audio Cable & Headphone Jack Soldering', 'Classroom Physics Equipment Maintenance', 'Home Appliance Fault Diagnosis'],
    problems: [
      'Consumers discard repairable electronics due to expensive official replacement quotes.',
      'Massive accumulation of toxic electronic waste in residential areas.',
      'Long turnaround times and lack of transparent diagnostic explanations at repair shops.'
    ],
    targetUsers: ['Classmates with cracked phones or faulty cables', 'School physics & computer lab supervisors', 'Local households with malfunctioning gadgets'],
    solution: 'Operate a transparent, low-cost diagnostic and soldering repair station for common gadget failures with honest part pricing.',
    nextSkills: ['pricing', 'financial_literacy', 'client_handling', '3d_modeling'],
    firstStep: 'Set up a safe soldering workstation, diagnose 3 broken household items (e.g. loose headphones, broken desk fan), and successfully fix at least 2.',
    opportunityType: 'Vocational Repair Service',
    difficulty: 'Intermediate'
  },
  {
    id: 'community_digital_empowerment',
    title: 'Senior Citizen & Artisan Digital Literacy Drive',
    category: 'Community',
    requiredSkills: ['digital_literacy', 'teaching'],
    preferredSkills: ['communication', 'public_speaking', 'graphic_design', 'problem_solving'],
    applications: ['Smartphone Banking & UPI Safety Workshops', 'Artisan Online Store Onboarding', 'Cloud Photo Organizing for Retirees', 'Government Welfare Portal Assistance'],
    problems: [
      'Senior citizens feel isolated and fearful of online banking scams.',
      'Traditional craftsmen cannot list their wares on digital marketplaces.',
      'Government welfare portals are confusing for non-digital natives.'
    ],
    targetUsers: ['Elderly grandparents & retirees', 'Local self-help artisan groups', 'Community center members', 'Neighborhood market vendors'],
    solution: 'Deliver gentle, step-by-step interactive workshops with large-print illustrated guides teaching smartphone confidence and safety.',
    nextSkills: ['writing', 'leadership', 'marketing', 'project_management'],
    firstStep: 'Create a 4-page illustrated large-font booklet on "How to Safely Send and Receive UPI Payments Without Getting Scammed".',
    opportunityType: 'Social Community Initiative',
    difficulty: 'Beginner'
  },
  {
    id: 'local_business_analytics',
    title: 'Local Retail Inventory & Footfall Analytics Service',
    category: 'Service',
    requiredSkills: ['data_analysis', 'problem_solving'],
    preferredSkills: ['coding', 'automation_tools', 'marketing', 'pricing'],
    applications: ['Weekly Sales Peak Hour Heatmaps', 'Inventory Stockout Prediction Sheets', 'Customer Repeat Purchase Trackers', 'Supplier Price Comparison Audits'],
    problems: [
      'Small shopkeepers order excess inventory that expires or ties up cash.',
      'Merchants have no idea which days of the week generate their highest profits.',
      'Spreadsheets are messy, manually updated, and rarely analyzed.'
    ],
    targetUsers: ['Local grocery shopkeepers (Kirana stores)', 'Stationery and book store owners', 'Pharmacy and medical supply stores', 'Clothing retailers'],
    solution: 'Clean historical sales receipts and build a simple visual 1-page dashboard highlighting top 10 sellers, peak buying hours, and reorder warnings.',
    nextSkills: ['communication', 'financial_literacy', 'client_handling', 'pricing'],
    firstStep: 'Collect 1 month of anonymized sales receipts from a friendly shopkeeper and plot an Excel/Sheets chart showing peak sales hours and slow days.',
    opportunityType: 'Business Consulting Micro-Service',
    difficulty: 'Intermediate'
  },
  {
    id: 'mobile_micro_app_studio',
    title: 'Custom Mobile Micro-App Studio',
    category: 'Technology',
    requiredSkills: ['app_development', 'ui_ux_design'],
    preferredSkills: ['coding', 'pricing', 'client_handling', 'project_management'],
    applications: ['Neighborhood Delivery Tracking Apps', 'School Event Schedule & Voting Apps', 'Offline Field Survey Collector Apps', 'Community Sports League Leaderboards'],
    problems: [
      'Generic web forms fail in poor internet connectivity zones.',
      'School events lack interactive real-time mobile voting and schedules.',
      'Off-the-shelf commercial app development costs upwards of ₹50,000.'
    ],
    targetUsers: ['School sports and cultural fest organizers', 'Local community marathon leads', 'Small residential associations', 'Student clubs'],
    solution: 'Build lightweight, responsive PWA and hybrid mobile micro-apps with offline caching and clean interfaces within 1-week turnaround.',
    nextSkills: ['marketing', 'financial_literacy', 'problem_solving', 'leadership'],
    firstStep: 'Build a responsive mobile app prototype for the upcoming school exhibition schedule with search and offline bookmarking.',
    opportunityType: 'Technology Venture',
    difficulty: 'Advanced'
  },
  {
    id: 'food_preservation_microenterprise',
    title: 'Artisanal Food Preservation & Value-Add Microenterprise',
    category: 'Product',
    requiredSkills: ['food_processing', 'cooking'],
    preferredSkills: ['agriculture', 'marketing', 'graphic_design', 'pricing'],
    applications: ['Dehydrated Fruit & Veggie Healthy Snacks', 'Small-Batch Fermented Pickles & Salsas', 'Vacuum-Sealed Custom Spice Blends', 'Artisanal Herbal Tea Mixes'],
    problems: [
      'Local farms suffer severe post-harvest losses during harvest glut seasons.',
      'Commercial packaged foods contain artificial sodium benzoate preservatives.',
      'Lack of premium packaged organic gifts from local agricultural regions.'
    ],
    targetUsers: ['Urban health food shoppers', 'Corporate gift hamper buyers', 'Farmers market visitors', 'Specialty organic grocery stores'],
    solution: 'Process excess seasonal farm produce using hygienic dehydration and airtight glass packaging with nutritional certification testing.',
    nextSkills: ['pricing', 'financial_literacy', 'sales', 'tailoring'],
    firstStep: 'Dehydrate 2 kg of seasonal ripe fruit (apples/bananas) using a safe solar dehydrator or oven method and design a sample jar label.',
    opportunityType: 'Culinary Product Venture',
    difficulty: 'Intermediate'
  },
  {
    id: 'grant_writing_consultancy',
    title: 'Youth Initiative Grant Writing & Project Documentation Service',
    category: 'Service',
    requiredSkills: ['writing', 'market_research'],
    preferredSkills: ['problem_solving', 'communication', 'public_speaking', 'project_management'],
    applications: ['Science Fair Sponsorship Proposals', 'CSR Grant Application Drafts for School Labs', 'Crowdfunding Campaign Storyboards', 'Environmental Impact Case Studies'],
    problems: [
      'Brilliant grassroots school clubs lack funding because proposal documents are poorly written.',
      'Corporate CSR departments receive disorganized funding requests with no clear metrics.',
      'Lack of structured documentation proving community project impact.'
    ],
    targetUsers: ['School science & robotics clubs', 'Local environmental NGOs', 'Community tree-planting drives', 'Student innovators seeking seed grants'],
    solution: 'Research matching funding opportunities, draft structured impact proposals with clear milestones and budget justifications, and format professional presentations.',
    nextSkills: ['negotiation', 'financial_literacy', 'leadership', 'pricing'],
    firstStep: 'Write a compelling 2-page sponsorship proposal for your school STEM club requesting ₹10,000 for electronic components from a local sponsor.',
    opportunityType: 'Consulting Service',
    difficulty: 'Intermediate'
  },
  {
    id: 'podcast_media_agency',
    title: 'Educational Podcast Production & Audio Media Hub',
    category: 'Service',
    requiredSkills: ['public_speaking', 'video_editing'],
    preferredSkills: ['interviewing', 'content_creation', 'marketing', 'pricing'],
    applications: ['School Community Audio Podcasts', 'Local History Interview Series', 'Audio Summaries of Academic Books', 'Teacher Lecture Audio Enhancement'],
    problems: [
      'Students spend hours commuting with no accessible, entertaining audio educational resources.',
      'Fascinating life stories of neighborhood elders are lost without oral audio recording.',
      'School teachers have raw audio recordings with heavy background noise.'
    ],
    targetUsers: ['School alumni associations', 'History & literature departments', 'Community storytellers', 'Local independent authors'],
    solution: 'Record high-clarity voice interviews, remove background hiss, add intro/outro musical scores, and publish episodes to Spotify and YouTube.',
    nextSkills: ['communication', 'client_handling', 'graphic_design', 'sales'],
    firstStep: 'Conduct and edit a 10-minute audio interview with an inspiring teacher or vocational mentor, complete with noise reduction and music.',
    opportunityType: 'Media Production Agency',
    difficulty: 'Intermediate'
  },
  {
    id: 'pricing_and_cost_consultancy',
    title: 'Venture Unit Economics & Pricing Calibration Advisory',
    category: 'Service',
    requiredSkills: ['pricing', 'financial_literacy'],
    preferredSkills: ['negotiation', 'data_analysis', 'problem_solving', 'communication'],
    applications: ['Student Venture Cost Auditing', 'Break-Even Customer Sensitivity Modeling', 'Tiered Quotation Rate Sheets', 'Supplier Material Sourcing Comparisons'],
    problems: [
      'Over 60% of student businesses fail because they forget to account for travel, wear-and-tear, and time.',
      'Freelancers give random unbacked quotes and lose client credibility.',
      'Micro-entrepreneurs have no idea what their break-even customer volume is.'
    ],
    targetUsers: ['Student exhibition enterprise creators', 'Home-based bakers and artisans', 'Freelance graphic designers & photographers', 'School event treasurers'],
    solution: 'Audit a venture’s direct and indirect expenses, calculate contribution margins, and build an automated pricing calculator ensuring positive cash flow.',
    nextSkills: ['market_research', 'client_handling', 'leadership', 'project_management'],
    firstStep: 'Take 1 active student project (e.g. handmade soap or photography), list all 5 hidden expenses, and calculate the exact price needed to profit.',
    opportunityType: 'Financial Advisory Micro-Service',
    difficulty: 'Intermediate'
  },
  {
    id: 'school_tech_maintenance',
    title: 'Campus Tech Infrastructure & Hardware Maintenance Desk',
    category: 'Service',
    requiredSkills: ['coding', 'electronics'],
    preferredSkills: ['repair', 'electrical_work', 'problem_solving', 'digital_literacy'],
    applications: ['Computer Lab Operating System Maintenance', 'Projector & Audio System Troubleshooting', 'Robotics Kit Inventory Diagnostics', 'School Wi-Fi & Network Cable Testing'],
    problems: [
      'School computer labs experience downtime waiting weeks for external technicians.',
      'Damaged VGA/HDMI cables and audio feedback disrupt important school assemblies.',
      'Valuable robotics and electronics kits sit broken in storage cupboards.'
    ],
    targetUsers: ['School IT department supervisors', 'Physics and science laboratory teachers', 'Auditorium event managers', 'Classroom teachers'],
    solution: 'Establish a student-led fast-response hardware and software maintenance desk to perform weekly preventive audits and quick fixes.',
    nextSkills: ['client_handling', 'project_management', 'pricing', 'leadership'],
    firstStep: 'Conduct a preventive audit of 5 classroom computers or lab microscopes, document existing faults in a spreadsheet, and fix 2 minor issues.',
    opportunityType: 'School Campus Service',
    difficulty: 'Intermediate'
  },
  {
    id: 'organic_waste_composting',
    title: 'Community Organic Waste Composting & Soil Enrichment',
    category: 'Community',
    requiredSkills: ['agriculture', 'gardening_landscaping'],
    preferredSkills: ['leadership', 'problem_solving', 'marketing', 'woodworking'],
    applications: ['School Canteen Food Waste Aerobic Bins', 'Residential Apartment Bokashi Composting', 'Nutrient-Rich Organic Potting Mix Bags', 'Worm Farm Vermicompost Harvesting'],
    problems: [
      'Canteen food scraps rot in municipal garbage dumps emitting methane gas.',
      'Apartment gardeners buy expensive chemical fertilizers that degrade soil biology.',
      'Lack of organized segregated organic waste management in schools.'
    ],
    targetUsers: ['School environmental committees', 'Apartment green resident associations', 'Balcony garden hobbyists', 'Local organic nurseries'],
    solution: 'Design and manage odor-free aerobic compost tumblers converting school lunch waste into premium black compost for sale to local gardeners.',
    nextSkills: ['pricing', 'financial_literacy', 'public_speaking', 'project_management'],
    firstStep: 'Construct a simple 20-liter aerated compost test bucket using dry leaves and canteen fruit peels, tracking temperature and moisture for 2 weeks.',
    opportunityType: 'Eco-Enterprise Initiative',
    difficulty: 'Beginner'
  },
  {
    id: 'market_research_service',
    title: 'Community Market Research & Consumer Discovery Service',
    category: 'Service',
    requiredSkills: ['market_research', 'interviewing'],
    preferredSkills: ['data_analysis', 'communication', 'writing', 'marketing'],
    applications: ['Neighborhood Competitor Pricing Audits', 'Student Consumer Buying Habit Surveys', 'Product Concept Pre-Launch Feedback Panels', 'Local Retail Foot-Traffic Studies'],
    problems: [
      'Creators spend months building products without knowing if customers will buy them.',
      'Small business owners have no time to survey neighborhood shoppers.',
      'Large research agency reports are generic and cost hundreds of thousands of rupees.'
    ],
    targetUsers: ['New student business founders', 'Neighborhood retail shopkeepers planning expansion', 'School innovation incubator programs', 'Local product artisans'],
    solution: 'Conduct 20 targeted in-person qualitative interviews and 100 online survey responses to produce an actionable 3-page market demand report.',
    nextSkills: ['pricing', 'problem_solving', 'client_handling', 'public_speaking'],
    firstStep: 'Formulate a 5-question consumer survey about after-school snack preferences, gather 25 responses, and present findings in a 1-page chart.',
    opportunityType: 'Research Consulting Service',
    difficulty: 'Intermediate'
  },
  {
    id: 'urban_hydroponics_enterprise',
    title: 'Urban Hydroponic Microgreens & Herb Cultivation',
    category: 'Product',
    requiredSkills: ['agriculture', 'iot_systems'],
    preferredSkills: ['electronics', 'problem_solving', 'marketing', 'pricing'],
    applications: ['Vertical NFT Hydroponic Lettuce Towers', 'Microgreens Fresh Culinary Trays', 'Automated Nutrient Dosing Controllers', 'Rooftop Fresh Salad Subscriptions'],
    problems: [
      'Pesticide contamination in commercial green leafy vegetables.',
      'Severe lack of arable land in congested urban neighborhoods.',
      'High price of exotic culinary herbs (basil, rosemary, bok choy) in local markets.'
    ],
    targetUsers: ['Health-conscious families', 'Local boutique cafe chefs', 'Urban apartment dwellers with balconies', 'School culinary programs'],
    solution: 'Grow pesticide-free, nutrient-dense herbs and microgreens using 90% less water in a compact 2-meter vertical hydroponic setup.',
    nextSkills: ['financial_literacy', 'sales', 'packaging', 'tailoring'],
    firstStep: 'Build a small 1-tray hydroponic or microgreen setup on a windowsill, grow 1 batch of mustard/radish microgreens, and measure harvest yield in 10 days.',
    opportunityType: 'Agri-Product Enterprise',
    difficulty: 'Intermediate'
  }
];

// Reusable Precomputed Roadmap Templates
export const REUSABLE_ROADMAP_TEMPLATES: RoadmapTemplate[] = [
  {
    id: 'roadmap_creative_freelance',
    title: 'Creative Freelance & Client Service Pathway',
    pathwayType: 'freelance',
    targetSkillIds: ['photography', 'graphic_design', 'video_editing', 'photo_editing'],
    origin: 'Curated',
    steps: [
      {
        phaseId: 'foundation',
        title: 'Master Technical Fundamentals & Tools',
        action: 'Practise core software shortcuts, lighting/framing rules, and batch file organization.',
        purpose: 'Build consistent muscle memory so execution is swift and professional.',
        expectedOutput: '3 deliberate technical practice exercises completed.',
        suggestedDurationDays: 3
      },
      {
        phaseId: 'practice',
        title: 'Execute Unconstrained Practice Exercises',
        action: 'Produce 5 high-fidelity specimen deliverables across diverse mock client briefs.',
        purpose: 'Test versatility and identify personal stylistic strengths.',
        expectedOutput: '5 raw and edited comparative showcase specimens.',
        suggestedDurationDays: 4
      },
      {
        phaseId: 'portfolio',
        title: 'Curate a 1-Page Tangible Portfolio',
        action: 'Assemble your top 3 project cases with before/after proofs in an accessible digital PDF or web link.',
        purpose: 'Provide unquestionable visual evidence of capability before speaking to clients.',
        expectedOutput: 'Shareable 1-page visual portfolio lookbook.',
        suggestedDurationDays: 3
      },
      {
        phaseId: 'communication',
        title: 'Conduct Client Discovery & Intake Scoping',
        action: 'Draft standard briefing questions and role-play client intake with a peer or mentor.',
        purpose: 'Prevent scope creep and clarify client turnaround expectations in writing.',
        expectedOutput: '1-page Client Scoping Agreement template.',
        suggestedDurationDays: 2
      },
      {
        phaseId: 'test',
        title: 'Deliver a Real-World Pilot Assignment',
        action: 'Complete a live pilot project for a neighborhood merchant or school club with formal feedback.',
        purpose: 'Validate end-to-end delivery under real-world constraints and deadlines.',
        expectedOutput: 'Finished client deliverable and signed testimonial.',
        suggestedDurationDays: 4
      },
      {
        phaseId: 'reflect',
        title: 'Unit Economics & Process Refinement',
        action: 'Calculate hourly return, review client revision notes, and calibrate pricing tiers.',
        purpose: 'Ensure future commissions yield sustainable profit margins.',
        expectedOutput: 'Refined 3-tier pricing matrix and updated workflow checklist.',
        suggestedDurationDays: 1
      }
    ]
  },
  {
    id: 'roadmap_hardware_prototype',
    title: 'Physical Prototype & Hardware Engineering Pathway',
    pathwayType: 'tech_venture',
    targetSkillIds: ['electronics', 'robotics', 'iot_systems', '3d_modeling'],
    origin: 'Curated',
    steps: [
      {
        phaseId: 'foundation',
        title: 'Schematic Design & Component Sizing',
        action: 'Draw circuit schematics, calculate voltage/current requirements, and review component datasheets.',
        purpose: 'Prevent blown components and verify electrical compatibility before assembling.',
        expectedOutput: 'Verified circuit diagram and Bill of Materials (BOM) cost sheet.',
        suggestedDurationDays: 3
      },
      {
        phaseId: 'practice',
        title: 'Breadboard Prototyping & Signal Verification',
        action: 'Wire the circuit on a breadboard, flash microcontroller firmware, and verify sensor readings.',
        purpose: 'Isolate wiring and logic bugs quickly without permanent soldering.',
        expectedOutput: 'Functional breadboard prototype with live telemetry logs.',
        suggestedDurationDays: 4
      },
      {
        phaseId: 'portfolio',
        title: 'Soldering & Physical Enclosure Assembly',
        action: 'Transfer circuit to a perfboard, solder clean joints, and mount inside a safe enclosure.',
        purpose: 'Elevate fragile exposed wires into a robust, portable physical demonstrator.',
        expectedOutput: 'Enclosed hardware prototype suitable for live demonstration.',
        suggestedDurationDays: 4
      },
      {
        phaseId: 'communication',
        title: 'Technical Demonstration & User Manual',
        action: 'Write a 1-page operating manual and prepare a 2-minute live demo explaining user benefits.',
        purpose: 'Enable non-technical judges and users to operate the device safely.',
        expectedOutput: 'User manual and rehearsed 2-minute pitch.',
        suggestedDurationDays: 2
      },
      {
        phaseId: 'test',
        title: '48-Hour Continuous Stress Test in Real Field',
        action: 'Deploy prototype in an actual school garden, lab, or shop for 48 uninterrupted hours.',
        purpose: 'Identify environmental vulnerabilities (heat, moisture, power drops) under live conditions.',
        expectedOutput: '48-hour reliability test log with zero unhandled failures.',
        suggestedDurationDays: 3
      },
      {
        phaseId: 'reflect',
        title: 'Manufacturing Cost Breakdown & Scaling Plan',
        action: 'Calculate volume fabrication cost (10 units vs 100 units) and plan version 2 improvements.',
        purpose: 'Evaluate economic feasibility for micro-scale manufacturing.',
        expectedOutput: 'Cost-down analysis and iteration roadmap.',
        suggestedDurationDays: 2
      }
    ]
  },
  {
    id: 'roadmap_vocational_production',
    title: 'Batch Production & Vocational Micro-Enterprise Pathway',
    pathwayType: 'product',
    targetSkillIds: ['agriculture', 'cooking', 'tailoring', 'woodworking', 'food_processing'],
    origin: 'Curated',
    steps: [
      {
        phaseId: 'foundation',
        title: 'Raw Material Sourcing & Sanitation Protocol',
        action: 'Identify quality raw material suppliers, calculate bulk discounts, and establish hygiene standards.',
        purpose: 'Ensure safety, material consistency, and low initial input costs.',
        expectedOutput: 'Approved supplier list and Standard Sanitation Checklist.',
        suggestedDurationDays: 2
      },
      {
        phaseId: 'practice',
        title: 'Standardized Recipe / Pattern Batch Testing',
        action: 'Produce 3 small batches, measuring exact yield, prep time, and ingredient waste.',
        purpose: 'Standardize quality so every item meets the exact same high standard.',
        expectedOutput: 'Standardized production formula sheet with exact unit costs.',
        suggestedDurationDays: 4
      },
      {
        phaseId: 'portfolio',
        title: 'Packaging, Labeling & Shelf-Life Proof',
        action: 'Package 5 finished units with custom designed labels, nutritional/material specs, and pricing.',
        purpose: 'Transform raw output into retail-ready consumer products.',
        expectedOutput: '5 retail-ready packaged specimen units.',
        suggestedDurationDays: 3
      },
      {
        phaseId: 'communication',
        title: 'Consumer Taste / Usability Panel Review',
        action: 'Conduct blind sampling or trial with 10 peer consumers and record structured rating forms.',
        purpose: 'Gather unbiased feedback on taste, durability, and perceived value.',
        expectedOutput: '10-person survey response summary.',
        suggestedDurationDays: 2
      },
      {
        phaseId: 'test',
        title: 'Exhibition / Stall Pop-Up Sales Test',
        action: 'Sell 10 units at a school exhibition or community pop-up, tracking cash receipts.',
        purpose: 'Test real willingness-to-pay and discover cash-handling logistics.',
        expectedOutput: 'Total sales revenue record and customer purchase feedback.',
        suggestedDurationDays: 2
      },
      {
        phaseId: 'reflect',
        title: 'Profit-and-Loss Audit & Margin Optimization',
        action: 'Calculate total revenue minus ingredients, packaging, and stall fees to find net profit.',
        purpose: 'Verify actual venture profitability before committing larger capital.',
        expectedOutput: '1-Page Profit & Loss statement with net margin percentage.',
        suggestedDurationDays: 1
      }
    ]
  },
  {
    id: 'roadmap_service_consulting',
    title: 'Professional Consulting & Advisory Service Pathway',
    pathwayType: 'service',
    targetSkillIds: ['problem_solving', 'pricing', 'financial_literacy', 'market_research', 'data_analysis', 'writing'],
    origin: 'Curated',
    steps: [
      {
        phaseId: 'foundation',
        title: 'Methodology Framework & Diagnostic Templates',
        action: 'Build reusable audit worksheets, data models, and structured inquiry rubrics.',
        purpose: 'Standardize your consulting methodology for repeatable excellence.',
        expectedOutput: 'Diagnostic audit checklist and calculations template.',
        suggestedDurationDays: 3
      },
      {
        phaseId: 'practice',
        title: 'Simulated Case Study Analysis',
        action: 'Run a complete mock audit on a sample business scenario and generate recommendations.',
        purpose: 'Test your analytical speed and clarity of insight.',
        expectedOutput: 'Completed mock audit case report with actionable recommendations.',
        suggestedDurationDays: 3
      },
      {
        phaseId: 'portfolio',
        title: 'Executive Summary & Specimen Deliverable',
        action: 'Format findings into an elegant 2-page executive summary with charts and financial impact.',
        purpose: 'Demonstrate professional business acumen to potential clients.',
        expectedOutput: '2-page executive report sample.',
        suggestedDurationDays: 2
      },
      {
        phaseId: 'communication',
        title: 'Stakeholder Presentation & Q&A Rehearsal',
        action: 'Present findings verbally in 5 minutes, defending assumptions and answering pushback.',
        purpose: 'Build poise and confidence when presenting to senior clients or judges.',
        expectedOutput: 'Recorded 5-minute presentation defense.',
        suggestedDurationDays: 2
      },
      {
        phaseId: 'test',
        title: 'Live Pro-Bono Client Engagement',
        action: 'Perform a real diagnostic audit for a local business, student startup, or school department.',
        purpose: 'Provide real measurable value and obtain a formal recommendation letter.',
        expectedOutput: 'Client-approved recommendation roadmap and feedback letter.',
        suggestedDurationDays: 4
      },
      {
        phaseId: 'reflect',
        title: 'Value-Based Pricing & Service Package Design',
        action: 'Package your consulting offerings into defined scopes (e.g. 1-Day Audit vs Full Strategy).',
        purpose: 'Transition from hourly billing to value-based package pricing.',
        expectedOutput: 'Standardized Consulting Service Menu with tiered pricing.',
        suggestedDurationDays: 1
      }
    ]
  }
];

// Reusable Precomputed Project Library
export const COMPREHENSIVE_PROJECTS_DB: ProjectTemplate[] = [
  {
    id: 'proj_tabletop_photo_lookbook',
    name: '5-Item Tabletop Product Lookbook',
    tier: 'Tier 2',
    targetSkillIds: ['photography', 'photo_editing'],
    problemSolved: 'Local craft makers have quality products but poor photos on digital storefronts.',
    solutionSummary: 'Shoot 5 diverse items under natural window light and edit to pure white or uniform aesthetic backgrounds.',
    difficulty: 'Beginner',
    deliverables: [
      '5 High-Resolution Color-Corrected Photos',
      '2 Social Media Story Graphics (1080x1920)',
      '1 Before-and-After Lighting Comparison Sheet'
    ],
    skillsPractised: ['Lighting Control', 'Framing', 'Background Removal', 'Color Grading'],
    connectedOpportunityId: 'product_photography_service',
    suggestedDuration: '4 Days'
  },
  {
    id: 'proj_responsive_storefront_redesign',
    name: 'Responsive Local Business Storefront Redesign',
    tier: 'Tier 2',
    targetSkillIds: ['coding', 'graphic_design'],
    problemSolved: 'Neighborhood stores lose customers because their current site is broken on mobile phones.',
    solutionSummary: 'Build a lightning-fast responsive 1-page digital menu and catalog with modern typography.',
    difficulty: 'Intermediate',
    deliverables: [
      'Figma High-Fidelity Mobile & Desktop Mockups',
      'Fully Responsive HTML/React Single Page Code',
      'Lighthouse Performance & Accessibility Audit Score > 90'
    ],
    skillsPractised: ['Semantic HTML/CSS', 'Visual Hierarchy', 'Responsive Layouts', 'Typography'],
    connectedOpportunityId: 'coding_and_design_experience_studio',
    suggestedDuration: '1 Week'
  },
  {
    id: 'proj_automated_irrigation_rig',
    name: 'Smart Soil Moisture Automated Drip Rig',
    tier: 'Tier 2',
    targetSkillIds: ['electronics', 'agriculture'],
    problemSolved: 'School rooftop plants dry out over weekends and holidays due to manual watering.',
    solutionSummary: 'Microcontroller rig measuring analog soil moisture and triggering a 5V mini-pump automatically.',
    difficulty: 'Intermediate',
    deliverables: [
      'Assembled Breadboard Circuit with Capacitive Moisture Sensor',
      'Calibrated Arduino/ESP32 Firmware with Hysteresis Logic',
      'Enclosed Working Demonstration Rig with 500ml Reservoir'
    ],
    skillsPractised: ['Sensor Calibration', 'Relay Switching', 'Soldering', 'Soil Science'],
    connectedOpportunityId: 'smart_agritech_iot',
    suggestedDuration: '1 Week'
  },
  {
    id: 'proj_unit_economics_pricing_sheet',
    name: 'Venture Unit Economics & Break-Even Model',
    tier: 'Tier 2',
    targetSkillIds: ['pricing', 'financial_literacy'],
    problemSolved: 'Student micro-enterprises underprice their work and run out of capital to buy supplies.',
    solutionSummary: 'Build an automated financial model calculating contribution margin, fixed overhead, and break-even units.',
    difficulty: 'Beginner',
    deliverables: [
      'Automated Google Sheets Unit Economics Model',
      '3-Tier Customer Quotation Template',
      'Sensitivity Matrix (±20% Price vs Volume)'
    ],
    skillsPractised: ['Cost Accounting', 'Contribution Margin', 'Break-Even Analysis', 'Spreadsheet Formulas'],
    connectedOpportunityId: 'pricing_and_cost_consultancy',
    suggestedDuration: '3 Days'
  },
  {
    id: 'proj_senior_digital_safety_guide',
    name: 'Senior Citizen Smartphone Banking Safety Guide',
    tier: 'Tier 2',
    targetSkillIds: ['digital_literacy', 'teaching'],
    problemSolved: 'Elderly citizens feel anxious using mobile payment apps and worry about fraud.',
    solutionSummary: 'Create a friendly large-font illustrated step-by-step guidebook and conduct a 1-on-1 tutoring session.',
    difficulty: 'Beginner',
    deliverables: [
      '4-Page Illustrated Large-Font PDF Booklet',
      'Step-by-Step UPI Safety Checklist (Never share OTP)',
      '1 Recorded 20-Minute Guided Coaching Session'
    ],
    skillsPractised: ['Curriculum Design', 'Empathetic Communication', 'Graphic Layout', 'Digital Security'],
    connectedOpportunityId: 'community_digital_empowerment',
    suggestedDuration: '5 Days'
  },
  {
    id: 'proj_upcycled_denim_laptop_sleeve',
    name: 'Upcycled Denim Multi-Pocket Laptop Sleeve',
    tier: 'Tier 2',
    targetSkillIds: ['tailoring', 'graphic_design'],
    problemSolved: 'Discarded jeans end up in landfills while students pay high prices for synthetic laptop cases.',
    solutionSummary: 'Sew a reinforced, padded laptop sleeve with accessory pockets from 2 pairs of old jeans.',
    difficulty: 'Intermediate',
    deliverables: [
      'Hand-Drafted Paper Sewing Pattern with Seam Allowances',
      'Finished Upcycled Denim Padded Sleeve with Zipper',
      'Screen-Printed Custom Geometric Logo Patch'
    ],
    skillsPractised: ['Pattern Drafting', 'Machine Stitching', 'Padding Installation', 'Material Upcycling'],
    connectedOpportunityId: 'sustainable_craft_studio',
    suggestedDuration: '5 Days'
  }
];
