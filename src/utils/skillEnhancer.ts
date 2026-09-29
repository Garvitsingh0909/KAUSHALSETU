import { Skill, SkillCategory } from '../data/skills';

export function enhanceSkillProfile(input: { id?: string; name: string; category?: SkillCategory }): Skill {
  const name = input.name.trim();
  const lower = name.toLowerCase();
  const safeId = input.id || lower.replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '') || 'enhanced_skill';

  // 1. ART / FINE ARTS / PAINTING / SKETCHING / DRAWING
  if (lower.includes('art') || lower.includes('paint') || lower.includes('sketch') || lower.includes('draw') || lower.includes('canvas')) {
    return {
      id: safeId,
      name: name.length > 2 && !name.toLowerCase().includes('fine') ? `Fine Arts & ${name}` : name,
      category: 'Creative',
      description: `Mastery of visual composition, proportion, color harmony, and tactile medium execution (acrylics, watercolor, graphite, mixed media) to produce evocative original artworks, commissioned commercial visual assets, and atmospheric environmental murals.`,
      applications: [
        'Custom Framed Portrait, Architectural Sketch & Keepsake Commissions',
        'Commercial Hand-Painted Wall Murals & Aesthetic Backdrops for Local Cafes',
        'Limited-Edition Illustrated Art Prints, Greeting Cards & Merchandise Lines',
        'Interactive Hands-On Fine Art & Youth Sketching Workshops for Community Centers'
      ],
      problemsSolved: [
        'Cold, sterile commercial retail spaces and homes devoid of authentic human artistic character',
        'Exorbitant agency pricing for custom artistic decor and architectural drawings',
        'Mass-produced factory prints displacing genuine local handcrafted artisan culture'
      ],
      opportunities: [
        'Fine Arts & Custom Canvas Mural Studio',
        'Bespoke Portrait & Commemorative Keepsake Artist',
        'Artisan Print, Greeting Card & Custom Stationery Micro-Brand',
        'Community Art Workshop Facilitator & Youth Sketching Mentor'
      ],
      nextSkills: [
        'Digital Illustration & Drawing',
        'Pricing Strategy & Unit Economics',
        'Photography & Lighting',
        'Client Handling & Discovery'
      ],
      estimatedRevenue: {
        perProject: '₹3,500 – ₹12,000',
        monthlyPotential: '₹20,000 – ₹48,000',
        pricingModel: 'Commission per piece + material markup'
      }
    };
  }

  // 2. AUDIO / PODCAST / MUSIC
  if (lower.includes('audio') || lower.includes('music') || lower.includes('podcast') || lower.includes('sound')) {
    return {
      id: safeId,
      name: name,
      category: 'Creative',
      description: `Precision acoustic recording, multi-track vocal editing, equalization, audio restoration, and broadcast-ready mastering for podcasts, voiceovers, and digital media.`,
      applications: [
        'Educational & Interview Podcast Audio Post-Production',
        'Voiceover Clean-Up & Noise Reduction for Explainer Videos',
        'Custom Sonic Branding Jingles & Ambient Soundscapes',
        'Audiobook Chapter Mastering & Dynamic Volume Leveling'
      ],
      problemsSolved: [
        'Echoey unlistenable phone recordings ruining audience retention',
        'Distracting background hums in online course videos and audio lessons',
        'Lack of royalty-free localized background audio for student media projects'
      ],
      opportunities: [
        'Podcast Audio Post-Production & Sound Studio',
        'Freelance Vocal Clean-Up & Mastering Specialist',
        'Sonic Branding & Acoustic Jingle Creator',
        'Voiceover Audio Production Engineer'
      ],
      nextSkills: ['Video Production & Editing', 'Client Handling & Discovery', 'Content Writing & Social Storytelling', 'Pricing Strategy & Unit Economics'],
      estimatedRevenue: {
        perProject: '₹2,500 – ₹8,000',
        monthlyPotential: '₹18,000 – ₹42,000',
        pricingModel: 'Per episode / audio minute'
      }
    };
  }

  // 3. AI / AUTOMATION / MACHINE LEARNING / LLM
  if (lower.includes('ai') || lower.includes('prompt') || lower.includes('gpt') || lower.includes('llm') || lower.includes('machine learning')) {
    return {
      id: safeId,
      name: name,
      category: 'Technical',
      description: `Architecting structured prompt workflows, multi-turn AI reasoning chains, and integrating generative AI tools into small business operations to maximize daily output safely.`,
      applications: [
        'Automated Customer FAQ & Lead Capture Prompt Workflows',
        'Batch E-Commerce Product Catalog Copy Generation',
        'Document Summarization & Regulatory Fact Extraction Pipelines',
        'Voice-to-Task Assistants for Solo Entrepreneurs'
      ],
      problemsSolved: [
        'Hours wasted daily on repetitive manual message drafting',
        'Inability of traditional business owners to harness generative AI tools effectively',
        'High software consultancy costs for simple digital workflows'
      ],
      opportunities: [
        'AI-Powered Business Workflow Automation Studio',
        'Generative Content Operations Specialist',
        'Micro-Business AI Adoption Consultant',
        'Custom Prompt Workflow Architect'
      ],
      nextSkills: ['Coding & Web Development', 'Automation & Scripting', 'Data Analysis & Statistics', 'Pricing Strategy & Unit Economics'],
      estimatedRevenue: {
        perProject: '₹4,000 – ₹12,000',
        monthlyPotential: '₹25,000 – ₹55,000',
        pricingModel: 'Setup Fee + Monthly Workflow Retainer'
      }
    };
  }

  // 4. CODING / WEB / SOFTWARE
  if (lower.includes('code') || lower.includes('web') || lower.includes('software') || lower.includes('python') || lower.includes('frontend') || lower.includes('backend')) {
    return {
      id: safeId,
      name: name,
      category: 'Technical',
      description: `Writing clean, responsive code, deploying interactive web portals, and implementing database automations tailored for grassroots community businesses.`,
      applications: [
        'Mobile-Responsive Business Landing Pages & Catalogs',
        'Interactive Student Club Portals & Booking Systems',
        'Custom Google Sheets & Webhook Data Integrations',
        'Secure Digital Payment & WhatsApp Order Gateways'
      ],
      problemsSolved: [
        'Unresponsive, slow-loading websites driving away customers',
        'High agency retainers ($2,000+) pricing out local shops',
        'Manual bookkeeping and order tracking prone to human error'
      ],
      opportunities: [
        'Digital UI/UX & Web Experience Studio',
        'Local Merchant E-Commerce Onboarding Specialist',
        'Automated Digital Workflow Developer',
        'Campus Tech Maintenance & Portal Lead'
      ],
      nextSkills: ['UI/UX & Interaction Design', 'Project Management & Milestone Tracking', 'Pricing Strategy & Unit Economics', 'Client Handling & Discovery'],
      estimatedRevenue: {
        perProject: '₹4,000 – ₹15,000',
        monthlyPotential: '₹25,000 – ₹60,000',
        pricingModel: 'Milestone / Sprint Contract'
      }
    };
  }

  // 5. BAKING / CULINARY / COOKING
  if (lower.includes('bake') || lower.includes('cake') || lower.includes('cook') || lower.includes('culinary') || lower.includes('pastry') || lower.includes('food')) {
    return {
      id: safeId,
      name: name,
      category: 'Practical',
      description: `Precision dough fermentation, artisan recipe development, hygienic temperature control, batch nutrition planning, and customer-first confectionery presentation.`,
      applications: [
        'Custom Celebration Cakes & Confectionery Gift Hampers',
        'Artisan Sourdough, Ragi & Multi-Grain Breads',
        'Preservative-Free Healthy Student Snack Tiffin Boxes',
        'Festive Treat Pre-Order Pop-Ups & Tasting Demonstrations'
      ],
      problemsSolved: [
        'Supermarket factory treats loaded with chemical emulsifiers and artificial sweeteners',
        'Lack of customized dietary-compliant treats for celebrations',
        'High commercial bakery markups for basic customized cakes'
      ],
      opportunities: [
        'Artisanal Home Bakery & Celebration Treats',
        'Healthy Student Tiffin & Meal Prep Service',
        'Custom Festive Confectionery Hampers',
        'Youth Baking & Culinary Workshop Host'
      ],
      nextSkills: ['Pricing Strategy & Unit Economics', 'Marketing & Audience Outreach', 'Photography & Lighting', 'Financial Literacy & Bookkeeping'],
      estimatedRevenue: {
        perProject: '₹1,500 – ₹5,000',
        monthlyPotential: '₹18,000 – ₹45,000',
        pricingModel: 'Per custom order / weekly subscription'
      }
    };
  }

  // 6. DEFAULT SOPHISTICATED FALLBACK
  let category: SkillCategory = 'Practical';
  if (lower.includes('market') || lower.includes('sale') || lower.includes('finance') || lower.includes('business') || lower.includes('lead') || lower.includes('venture')) {
    category = 'Entrepreneurial';
  } else if (lower.includes('speak') || lower.includes('writ') || lower.includes('story') || lower.includes('pitch') || lower.includes('teach') || lower.includes('dialogue')) {
    category = 'Communication';
  } else if (lower.includes('design') || lower.includes('video') || lower.includes('photo') || lower.includes('visual') || lower.includes('animat')) {
    category = 'Creative';
  } else if (lower.includes('tech') || lower.includes('data') || lower.includes('robot') || lower.includes('iot') || lower.includes('electron')) {
    category = 'Technical';
  }

  return {
    id: safeId,
    name: name,
    category,
    description: `Applied capability in ${name} structured for high-clarity execution, measurable real-world client value, and commercial unit economics.`,
    applications: [
      `Turnkey Client Service Packages utilizing ${name}`,
      `Educational School Showcase & Community Demonstration Booths`,
      `Standard Operating Procedures (SOPs) & Deliverable Templates for ${name}`,
      `Peer Mentoring & Collaborative Micro-Workshops`
    ],
    problemsSolved: [
      `Absence of standardized quality execution in ${name} for local community projects`,
      `Excessive commercial agency costs that shut out small businesses and non-profits`,
      `Unclear project scoping and delayed deliverables in collaborative initiatives`
    ],
    opportunities: [
      `${name} Micro-Service Specialist`,
      `Freelance Community Project Lead in ${name}`,
      `Digital Workflow & Deliverables Consultant`,
      `Vocational Workshop Facilitator & Mentor`
    ],
    nextSkills: [
      'Pricing Strategy & Unit Economics',
      'Client Handling & Discovery',
      'Marketing & Audience Outreach',
      'Financial Literacy & Bookkeeping'
    ],
    estimatedRevenue: {
      perProject: '₹2,500 – ₹7,500',
      monthlyPotential: '₹18,000 – ₹40,000',
      pricingModel: 'Deliverable-based project fee'
    }
  };
}
