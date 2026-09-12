export type SkillCategory =
  | 'Technical'
  | 'Creative'
  | 'Communication'
  | 'Practical'
  | 'Entrepreneurial';

export type Proficiency = 'Beginner' | 'Developing' | 'Intermediate' | 'Strong' | 'Advanced';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  applications: string[];
  problemsSolved: string[];
  opportunities: string[];
  nextSkills: string[];
}

export const SKILLS_DB: Skill[] = [
  {
    id: 'coding',
    name: 'Coding & Programming',
    category: 'Technical',
    description: 'Writing instructions for computers to solve problems and create software.',
    applications: ['Web Development', 'App Creation', 'Automating Tasks', 'Data Analysis'],
    problemsSolved: ['Manual repetitive tasks', 'Lack of digital presence', 'Inefficient processes'],
    opportunities: ['Software Developer', 'Freelance Web Designer', 'Tech Consultant', 'Open Source Contributor'],
    nextSkills: ['System Design', 'UI/UX Design', 'Project Management', 'Cybersecurity']
  },
  {
    id: 'graphic_design',
    name: 'Graphic Design',
    category: 'Creative',
    description: 'Creating visual content to communicate messages effectively.',
    applications: ['Posters & Flyers', 'Brand Identity', 'Social Media Graphics', 'UI Design'],
    problemsSolved: ['Poor visual communication', 'Weak branding', 'Unclear information presentation'],
    opportunities: ['Freelance Designer', 'Marketing Assistant', 'Content Creator', 'Art Director'],
    nextSkills: ['Marketing', 'Copywriting', 'Client Management', 'Video Editing']
  },
  {
    id: 'photography',
    name: 'Photography',
    category: 'Creative',
    description: 'Capturing light to create images that tell stories or document reality.',
    applications: ['Product Photography', 'Event Coverage', 'Social Media Content', 'Photojournalism'],
    problemsSolved: ['Lack of visual documentation', 'Poor product presentation', 'Unengaging social media'],
    opportunities: ['Freelance Photographer', 'Content Creator', 'Event Media Specialist', 'Local Business Promoter'],
    nextSkills: ['Photo Editing', 'Marketing', 'Lighting Setup', 'Client Handling']
  },
  {
    id: 'public_speaking',
    name: 'Public Speaking',
    category: 'Communication',
    description: 'Delivering structured speeches or presentations to live audiences.',
    applications: ['School Assemblies', 'Pitching Ideas', 'Event Hosting', 'Debating'],
    problemsSolved: ['Unclear messaging', 'Lack of audience engagement', 'Poor idea advocacy'],
    opportunities: ['Event MC', 'Sales Representative', 'Spokesperson', 'Trainer/Educator'],
    nextSkills: ['Script Writing', 'Body Language', 'Debate', 'Negotiation']
  },
  {
    id: 'writing',
    name: 'Writing',
    category: 'Communication',
    description: 'Expressing ideas clearly and persuasively through text.',
    applications: ['Blogging', 'Copywriting', 'Report Writing', 'Scripting'],
    problemsSolved: ['Miscommunication', 'Lack of documentation', 'Poor marketing copy'],
    opportunities: ['Freelance Writer', 'Content Marketer', 'Journalist', 'Technical Writer'],
    nextSkills: ['SEO', 'Editing', 'Research', 'Public Speaking']
  },
  {
    id: 'electronics',
    name: 'Electronics & Circuits',
    category: 'Technical',
    description: 'Designing and building physical electronic circuits and systems.',
    applications: ['Hardware Repair', 'IoT Projects', 'Custom Gadgets', 'Automation'],
    problemsSolved: ['Broken devices', 'Lack of automation', 'Expensive smart home solutions'],
    opportunities: ['Hardware Technician', 'IoT Developer', 'Prototype Engineer', 'Electronics Repair Business'],
    nextSkills: ['Programming (C/C++)', '3D Printing', 'Product Design', 'Entrepreneurship']
  },
  {
    id: 'robotics',
    name: 'Robotics',
    category: 'Technical',
    description: 'Designing, constructing, and operating automated machines.',
    applications: ['Automation', 'Competition Bots', 'Smart Systems', 'Manufacturing'],
    problemsSolved: ['Dangerous manual labor', 'Inefficient physical processes', 'Complex physical tasks'],
    opportunities: ['Robotics Engineer', 'Automation Consultant', 'STEM Educator', 'Prototyper'],
    nextSkills: ['Machine Learning', 'Mechanical Engineering', 'Advanced Mathematics', 'Coding']
  },
  {
    id: 'marketing',
    name: 'Marketing',
    category: 'Entrepreneurial',
    description: 'Understanding audiences and promoting products, services, or ideas.',
    applications: ['Social Media Campaigns', 'Brand Awareness', 'Market Research', 'Sales Strategy'],
    problemsSolved: ['Low product visibility', 'Misunderstanding target audiences', 'Weak sales'],
    opportunities: ['Social Media Manager', 'Brand Consultant', 'Marketing Coordinator', 'Growth Hacker'],
    nextSkills: ['Data Analysis', 'Graphic Design', 'Copywriting', 'Psychology']
  },
  {
    id: 'teaching',
    name: 'Teaching & Mentoring',
    category: 'Communication',
    description: 'Guiding others to acquire new knowledge, skills, or values.',
    applications: ['Tutoring', 'Creating Courses', 'Workshop Facilitation', 'Peer Mentoring'],
    problemsSolved: ['Knowledge gaps', 'Steep learning curves', 'Lack of guidance'],
    opportunities: ['Private Tutor', 'Online Course Creator', 'Workshop Lead', 'Corporate Trainer'],
    nextSkills: ['Curriculum Design', 'Public Speaking', 'Patience', 'Empathy']
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    category: 'Technical',
    description: 'The abstract science of number, quantity, and space.',
    applications: ['Data Analysis', 'Budgeting', 'Algorithm Design', 'Physics Simulation'],
    problemsSolved: ['Unoptimized processes', 'Financial mismanagement', 'Complex calculations'],
    opportunities: ['Data Analyst', 'Financial Planner', 'Actuary', 'Software Engineer'],
    nextSkills: ['Coding', 'Statistics', 'Financial Literacy', 'Problem Solving']
  },
  {
    id: 'video_editing',
    name: 'Video Editing',
    category: 'Creative',
    description: 'Manipulating and arranging video shots to create a cohesive story.',
    applications: ['YouTube Content', 'Short Films', 'Marketing Ads', 'Event Videos'],
    problemsSolved: ['Unengaging raw footage', 'Poor storytelling', 'Lack of visual media'],
    opportunities: ['Freelance Video Editor', 'Content Creator', 'Filmmaker', 'Media Specialist'],
    nextSkills: ['Sound Design', 'Motion Graphics', 'Storyboarding', 'Directing']
  },
  {
    id: 'agriculture',
    name: 'Agriculture & Farming',
    category: 'Practical',
    description: 'Cultivating plants and livestock for food, fuel, or materials.',
    applications: ['Urban Farming', 'Hydroponics', 'Sustainable Food', 'Landscaping'],
    problemsSolved: ['Food insecurity', 'Unsustainable practices', 'Lack of local produce'],
    opportunities: ['Urban Farmer', 'AgriTech Consultant', 'Sustainable Landscaper', 'Produce Supplier'],
    nextSkills: ['Business Management', 'Biology', 'IoT / Electronics', 'Marketing']
  },
  {
    id: 'cooking',
    name: 'Cooking & Culinary',
    category: 'Practical',
    description: 'The practice or skill of preparing food by combining, mixing, and heating ingredients.',
    applications: ['Catering', 'Recipe Development', 'Food Blogging', 'Meal Prep'],
    problemsSolved: ['Unhealthy eating habits', 'Lack of time for meals', 'Poor event food options'],
    opportunities: ['Personal Chef', 'Catering Business Owner', 'Food Content Creator', 'Menu Consultant'],
    nextSkills: ['Nutrition', 'Budgeting', 'Marketing', 'Photography']
  },
  {
    id: 'repair',
    name: 'Repair & Maintenance',
    category: 'Practical',
    description: 'Fixing or maintaining physical objects, machines, or structures.',
    applications: ['Device Repair', 'Bicycle Maintenance', 'Furniture Restoration', 'Home DIY'],
    problemsSolved: ['E-waste', 'Broken essentials', 'Expensive replacement costs'],
    opportunities: ['Repair Technician', 'Upcycling Artist', 'Maintenance Consultant', 'Workshop Owner'],
    nextSkills: ['Customer Service', 'Electronics', 'Problem Solving', 'Inventory Management']
  },
  {
    id: 'leadership',
    name: 'Leadership',
    category: 'Entrepreneurial',
    description: 'Motivating and directing a group of people to achieve a common goal.',
    applications: ['Project Management', 'Event Organization', 'Team Building', 'Student Council'],
    problemsSolved: ['Lack of direction', 'Disorganized teams', 'Low morale'],
    opportunities: ['Project Manager', 'Event Organizer', 'Team Lead', 'Non-profit Founder'],
    nextSkills: ['Conflict Resolution', 'Public Speaking', 'Empathy', 'Strategic Planning']
  },
  {
    id: 'problem_solving',
    name: 'Problem Solving',
    category: 'Entrepreneurial',
    description: 'The process of finding solutions to difficult or complex issues.',
    applications: ['Consulting', 'Process Optimization', 'Mediation', 'Innovation'],
    problemsSolved: ['Inefficient systems', 'Recurring conflicts', 'Stagnant growth'],
    opportunities: ['Business Consultant', 'Operations Manager', 'Product Manager', 'Strategist'],
    nextSkills: ['Data Analysis', 'Design Thinking', 'Communication', 'Research']
  },
  {
    id: 'financial_literacy',
    name: 'Financial Literacy',
    category: 'Entrepreneurial',
    description: 'Understanding and effectively using various financial skills.',
    applications: ['Budgeting', 'Investing', 'Pricing Services', 'Fundraising'],
    problemsSolved: ['Poor money management', 'Underpricing services', 'Lack of capital'],
    opportunities: ['Financial Advisor', 'Startup Founder', 'Investment Analyst', 'Accountant'],
    nextSkills: ['Mathematics', 'Economics', 'Negotiation', 'Risk Management']
  },
  {
    id: 'communication',
    name: 'Communication & Dialogue',
    category: 'Communication',
    description: 'Articulating value, listening actively, and presenting ideas clearly to audiences and clients.',
    applications: ['Client Meetings', 'Project Pitches', 'Interviews', 'Team Coordination'],
    problemsSolved: ['Misaligned project expectations', 'Unclear value propositions', 'Weak customer rapport'],
    opportunities: ['Client Representative', 'Project Presenter', 'Consultant', 'Team Coordinator'],
    nextSkills: ['Negotiation', 'Public Speaking', 'Conflict Resolution', 'Client Handling']
  },
  {
    id: 'photo_editing',
    name: 'Photo Editing & Retouching',
    category: 'Creative',
    description: 'Enhancing and color-calibrating photographic images using digital tools.',
    applications: ['Commercial Product Shots', 'Catalog Cleanup', 'Social Media Polish', 'Event Albums'],
    problemsSolved: ['Dull lighting in raw photos', 'Distracting photo backgrounds', 'Inconsistent catalog aesthetics'],
    opportunities: ['Retoucher', 'Digital Image Specialist', 'Catalog Media Producer', 'E-commerce Editor'],
    nextSkills: ['Color Theory', 'Graphic Design', 'Batch Processing', 'Client Handling']
  },
  {
    id: 'pricing',
    name: 'Pricing & Cost Estimation',
    category: 'Entrepreneurial',
    description: 'Estimating materials, labor, and overhead to establish profitable, competitive prices.',
    applications: ['Service Quotations', 'Product Cost Breakdown', 'Break-even Analysis', 'Tiered Packages'],
    problemsSolved: ['Underpricing student work', 'Unexpected operating losses', 'Customer pushback on vague quotes'],
    opportunities: ['Cost Estimator', 'Venture Strategist', 'Freelance Quoting Specialist', 'Finance Lead'],
    nextSkills: ['Negotiation', 'Contract Design', 'Financial Literacy', 'Market Research']
  },
  {
    id: 'client_handling',
    name: 'Client Handling & Requirements',
    category: 'Communication',
    description: 'Managing client briefings, scoping deliverables, and setting clear project boundaries.',
    applications: ['Brief Scoping', 'Feedback Reviews', 'Delivery Handover', 'Relationship Building'],
    problemsSolved: ['Scope creep', 'Vague client revisions', 'Unmet customer expectations'],
    opportunities: ['Account Executive', 'Client Success Specialist', 'Freelance Manager', 'Project Lead'],
    nextSkills: ['Contract Terms', 'Conflict Resolution', 'Active Listening', 'Pricing']
  }
];

export interface CombinedOpportunity {
  skillIds: string[];
  title: string;
  description: string;
  applications: string[];
  nextSkills: string[];
}

const HARDCODED_COMBINATIONS: CombinedOpportunity[] = [
  {
    skillIds: ['photography', 'marketing'],
    title: 'Freelance Brand Content Creator',
    description: 'Combine visual storytelling with strategic promotion to help local businesses establish their identity.',
    applications: ['Commercial Photography', 'Social Media Management', 'Ad Creation'],
    nextSkills: ['Client Negotiation', 'Copywriting', 'Analytics']
  },
  {
    skillIds: ['coding', 'graphic_design'],
    title: 'Creative UI/UX Technologist',
    description: 'Bridge the gap between aesthetics and functionality by designing and building beautiful digital interfaces.',
    applications: ['Web Design', 'App Prototyping', 'Interactive Media'],
    nextSkills: ['User Psychology', 'Advanced CSS', 'Product Management']
  },
  {
    skillIds: ['electronics', 'agriculture'],
    title: 'AgriTech Solutions Innovator',
    description: 'Apply hardware and sensors to solve real-world farming and sustainability challenges.',
    applications: ['Automated Irrigation', 'Soil Monitoring Systems', 'Smart Greenhouses'],
    nextSkills: ['Data Analysis', 'Biology', 'Coding']
  },
  {
    skillIds: ['writing', 'teaching'],
    title: 'Educational Content Developer',
    description: 'Translate complex ideas into accessible written courses, guides, and curriculums.',
    applications: ['Course Creation', 'Textbook Authorship', 'Study Guide Design'],
    nextSkills: ['Instructional Design', 'SEO', 'Public Speaking']
  },
  {
    skillIds: ['cooking', 'financial_literacy'],
    title: 'Culinary Entrepreneur',
    description: 'Turn a passion for food into a viable, profitable business model.',
    applications: ['Catering Business', 'Food Truck Management', 'Recipe Costing'],
    nextSkills: ['Marketing', 'Supply Chain Management', 'Leadership']
  },
  {
    skillIds: ['robotics', 'problem_solving'],
    title: 'Automation Architect',
    description: 'Identify inefficiencies and deploy automated mechanical solutions to streamline operations.',
    applications: ['Manufacturing Optimization', 'Logistics Automation', 'Custom Tech Solutions'],
    nextSkills: ['System Design', 'Project Management', 'Coding']
  }
];

export function getCombination(selectedSkills: Skill[]): CombinedOpportunity | null {
  const validSkills = (selectedSkills || []).filter(s => s && s.id && s.name);
  if (validSkills.length < 2) return null;
  
  const skillIds = validSkills.map(s => s.id);
  
  // Try to find exact match in hardcoded list
  for (const combo of HARDCODED_COMBINATIONS) {
    const isMatch = combo.skillIds.every(id => skillIds.includes(id)) && combo.skillIds.length === skillIds.length;
    if (isMatch) return combo;
  }
  
  // Algorithmic fallback
  const skillNames = validSkills.map(s => s.name);
  const title = `Interdisciplinary Specialist: ${skillNames.join(' + ')}`;
  
  // Combine top applications
  const allApps = new Set<string>();
  validSkills.forEach(s => (s.applications || []).slice(0, 2).forEach(app => allApps.add(app)));
  
  // Combine next skills
  const allNext = new Set<string>();
  validSkills.forEach(s => (s.nextSkills || []).slice(0, 2).forEach(ns => allNext.add(ns)));
  
  return {
    skillIds: skillIds,
    title,
    description: `A unique pathway created by merging the capabilities of ${skillNames[0]} with the strengths of ${skillNames[1]}. This opens up innovative opportunities that neither skill could achieve alone.`,
    applications: Array.from(allApps).slice(0, 4),
    nextSkills: Array.from(allNext).slice(0, 4)
  };
}
